export function normalizeValues(value) {
  if (Array.isArray(value)) return value.filter(Boolean);
  return value ? [value] : [];
}

function canUseProfileSuggestions(pageType, targetKey, matchedSourceKeys, profileScore, directMatchCount) {
  if (targetKey === "worldTags") {
    return false;
  }

  if (pageType === "unusual") {
    if (targetKey === "speciesTags") {
      return matchedSourceKeys.includes("worldTags");
    }

    if (targetKey === "identityTags") {
      return matchedSourceKeys.includes("worldTags") || matchedSourceKeys.includes("speciesTags");
    }

    if (targetKey === "powerTags") {
      return (
        matchedSourceKeys.includes("worldTags")
        || matchedSourceKeys.includes("speciesTags")
        || matchedSourceKeys.includes("identityTags")
      );
    }
  }

  if (directMatchCount > 0) {
    return true;
  }

  return profileScore >= 2;
}

export function collectContextSuggestions({
  pageType,
  targetKey,
  state,
  flowOrder,
  rules,
  profiles
}) {
  const targetIndex = flowOrder.indexOf(targetKey);
  const sourceKeys = targetIndex > 0 ? flowOrder.slice(0, targetIndex) : [];
  const scored = new Map();
  let directMatchCount = 0;

  const pushScored = (values, score, reasonOrder) => {
    values.forEach((value, index) => {
      const normalized = typeof value === "string" ? value.trim() : "";
      if (!normalized) return;

      const current = scored.get(normalized) || {
        value: normalized,
        score: 0,
        bestOrder: Number.MAX_SAFE_INTEGER
      };

      current.score += score;
      current.bestOrder = Math.min(current.bestOrder, reasonOrder + index / 100);
      scored.set(normalized, current);
    });
  };

  sourceKeys.forEach((sourceKey) => {
    const sourceIndex = flowOrder.indexOf(sourceKey);
    const sourceWeight = Math.max(2, sourceIndex + 1);

    normalizeValues(state[sourceKey]).forEach((value) => {
      const ruleSuggestions = rules[sourceKey]?.[value]?.[targetKey];
      if (Array.isArray(ruleSuggestions)) {
        directMatchCount += 1;
        pushScored(ruleSuggestions, 10 + sourceWeight, sourceIndex);
      }
    });
  });

  const scoredProfiles = profiles
    .map((profile) => {
      let score = 0;
      const matchedSourceKeys = [];

      sourceKeys.forEach((sourceKey) => {
        const profileValues = profile.picks[sourceKey];
        if (!Array.isArray(profileValues) || !profileValues.length) return;

        const selectedValues = normalizeValues(state[sourceKey]);
        if (selectedValues.some((value) => profileValues.includes(value))) {
          score += 1;
          matchedSourceKeys.push(sourceKey);
        }
      });

      return { profile, score, matchedSourceKeys };
    })
    .filter((item) => item.score > 0)
    .filter((item) => canUseProfileSuggestions(
      pageType,
      targetKey,
      item.matchedSourceKeys,
      item.score,
      directMatchCount
    ))
    .sort((left, right) => right.score - left.score)
    .slice(0, 4);

  scoredProfiles.forEach(({ profile }) => {
    const profileSuggestions = profile.picks[targetKey];
    if (Array.isArray(profileSuggestions)) {
      pushScored(profileSuggestions, 6, targetIndex + 0.5);
    }
  });

  return [...scored.values()]
    .sort((left, right) => (
      right.score - left.score || left.bestOrder - right.bestOrder || left.value.localeCompare(right.value, "zh-Hans-CN")
    ))
    .map((item) => item.value);
}
