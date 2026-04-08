<script setup>
import { computed, reactive, ref, watch } from "vue";
import ChoiceChipGroup from "./components/ChoiceChipGroup.vue";
import StepCard from "./components/StepCard.vue";
import {
  BOUNDARY_TAG_OPTIONS,
  CHAT_STYLE_MODE_OPTIONS,
  GENDER_OPTIONS,
  HUMAN_CONTEXT_RULES,
  HUMAN_DIRECTIONS,
  HUMAN_FLOW_ORDER,
  HUMAN_REALNESS_CHECKS,
  HUMAN_REALNESS_OPTIONS,
  HUMAN_SMART_PROFILES,
  HUMAN_TAG_GROUPS,
  PAGE_OPTIONS,
  RELATIONSHIP_MODE_OPTIONS,
  RICHNESS_OPTIONS,
  UNUSUAL_CONTEXT_RULES,
  UNUSUAL_DIRECTIONS,
  UNUSUAL_FLOW_ORDER,
  UNUSUAL_REALNESS_CHECKS,
  UNUSUAL_REALNESS_OPTIONS,
  UNUSUAL_SMART_PROFILES,
  UNUSUAL_TAG_GROUPS
} from "./data/options.js";
import { RICHNESS_PROFILES } from "./data/promptProfiles.js";
import { buildPrompt } from "./utils/promptBuilders.js";
import { collectContextSuggestions, normalizeValues } from "./utils/suggestionEngine.js";

const STORAGE_KEY = "persona_prompt_picker_v4";
const CUSTOM_OPTIONS_KEY = "persona_prompt_picker_custom_options_v1";
const NON_PERSISTED_STATE_KEYS = ["longTermPoint", "riskNote"];

const CUSTOM_OPTION_FIELDS = [
  "genderChoice",
  "humanDirectionChoice",
  "unusualDirectionChoice",
  "richnessLevel",
  "relationshipMode",
  "chatStyleMode",
  "boundaryTags",
  ...HUMAN_TAG_GROUPS.map((group) => group.key),
  ...UNUSUAL_TAG_GROUPS.map((group) => group.key)
];

function createEmptyState() {
  return {
    pageType: "human",
    currentStep: 0,
    genderChoice: "男性",
    humanDirectionChoice: "恋爱陪伴",
    unusualDirectionChoice: "宿命纠缠",
    richnessLevel: "丰满",
    coreConcept: "",
    relationshipMode: "慢热陪伴",
    chatStyleMode: "自然说话",
    longTermPoint: "",
    riskNote: "",
    boundaryTags: [],
    roleTags: [],
    traitTags: [],
    sceneTags: [],
    feelingTags: [],
    styleTags: [],
    worldTags: [],
    speciesTags: [],
    identityTags: [],
    powerTags: [],
    unusualSceneTags: [],
    unusualFeelingTags: [],
    unusualStyleTags: [],
    fixedName: "",
    ageRange: "18-24岁",
    extraPrompt: "",
    avoidPrompt: "",
    jsonMode: true
  };
}

function loadState() {
  const fallback = createEmptyState();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw);
    NON_PERSISTED_STATE_KEYS.forEach((key) => {
      delete parsed[key];
    });
    return { ...fallback, ...parsed };
  } catch (error) {
    return fallback;
  }
}

function buildStoredState(source) {
  const next = { ...source };
  NON_PERSISTED_STATE_KEYS.forEach((key) => {
    delete next[key];
  });
  return next;
}

function createEmptyCustomOptions() {
  return CUSTOM_OPTION_FIELDS.reduce((accumulator, key) => {
    accumulator[key] = [];
    return accumulator;
  }, {});
}

function loadCustomOptions() {
  const fallback = createEmptyCustomOptions();
  try {
    const raw = localStorage.getItem(CUSTOM_OPTIONS_KEY);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw);
    return CUSTOM_OPTION_FIELDS.reduce((accumulator, key) => {
      accumulator[key] = Array.isArray(parsed?.[key]) ? parsed[key] : [];
      return accumulator;
    }, { ...fallback });
  } catch (error) {
    return fallback;
  }
}

function mergeOptions(baseOptions = [], extraOptions = [], currentValue = []) {
  const merged = [];
  const seen = new Set();
  const append = (value) => {
    const normalized = typeof value === "string" ? value.trim() : "";
    if (!normalized || seen.has(normalized)) return;
    seen.add(normalized);
    merged.push(normalized);
  };

  baseOptions.forEach(append);
  extraOptions.forEach(append);
  (Array.isArray(currentValue) ? currentValue : [currentValue]).forEach(append);

  return merged;
}

function buildContextualOptions(baseOptions, contextualOptions, extraOptions, currentValue, minVisible = 12) {
  if (!contextualOptions.length) {
    return mergeOptions(baseOptions, extraOptions, currentValue);
  }

  const merged = mergeOptions(contextualOptions, extraOptions, currentValue);
  const targetCount = Math.min(minVisible, baseOptions.length);
  if (merged.length >= targetCount) {
    return merged;
  }

  const padded = [...merged];
  baseOptions.forEach((option) => {
    if (padded.length >= targetCount || padded.includes(option)) return;
    padded.push(option);
  });
  return padded;
}

function getRecommendedLimit(pageType, key) {
  if (key === "speciesTags") return 2;
  if (key === "worldTags") return 2;
  if (key === "identityTags") return 2;
  if (key === "roleTags") return 3;
  if (key === "powerTags") return 3;
  if (key === "traitTags") return 4;
  return 6;
}

function getSelectionSoftLimit(pageType, key) {
  if (pageType === "unusual") {
    if (key === "worldTags") return 2;
    if (key === "speciesTags") return 1;
    if (key === "identityTags") return 2;
    if (key === "powerTags") return 3;
    return 4;
  }

  if (key === "roleTags") return 2;
  if (key === "traitTags") return 4;
  return 4;
}

function getBaseOptionsByKey(key) {
  if (key === "genderChoice") return GENDER_OPTIONS;
  if (key === "humanDirectionChoice") return HUMAN_DIRECTIONS;
  if (key === "unusualDirectionChoice") return UNUSUAL_DIRECTIONS;
  if (key === "richnessLevel") return RICHNESS_OPTIONS;
  if (key === "relationshipMode") return RELATIONSHIP_MODE_OPTIONS;
  if (key === "chatStyleMode") return CHAT_STYLE_MODE_OPTIONS;
  if (key === "boundaryTags") return BOUNDARY_TAG_OPTIONS;

  const humanGroup = HUMAN_TAG_GROUPS.find((group) => group.key === key);
  if (humanGroup) return humanGroup.options;

  const unusualGroup = UNUSUAL_TAG_GROUPS.find((group) => group.key === key);
  if (unusualGroup) return unusualGroup.options;

  return [];
}

function getFlowOrder(pageType) {
  return pageType === "unusual" ? UNUSUAL_FLOW_ORDER : HUMAN_FLOW_ORDER;
}

function getContextRules(pageType) {
  return pageType === "unusual" ? UNUSUAL_CONTEXT_RULES : HUMAN_CONTEXT_RULES;
}

function getRealnessOptions(pageType, key) {
  const source = pageType === "unusual" ? UNUSUAL_REALNESS_OPTIONS : HUMAN_REALNESS_OPTIONS;
  return source[key] || [];
}

function getRealnessChecks(pageType) {
  return pageType === "unusual" ? UNUSUAL_REALNESS_CHECKS : HUMAN_REALNESS_CHECKS;
}

function getSmartProfiles(pageType) {
  return pageType === "unusual" ? UNUSUAL_SMART_PROFILES : HUMAN_SMART_PROFILES;
}

const state = reactive(loadState());
const customOptions = reactive(loadCustomOptions());
const statusText = ref("");
const isEditMode = ref(false);

const activeDirection = computed({
  get() {
    return state.pageType === "unusual" ? state.unusualDirectionChoice : state.humanDirectionChoice;
  },
  set(value) {
    if (state.pageType === "unusual") {
      state.unusualDirectionChoice = value;
    } else {
      state.humanDirectionChoice = value;
    }
  }
});
const currentDirectionKey = computed(() => (
  state.pageType === "unusual" ? "unusualDirectionChoice" : "humanDirectionChoice"
));
const genderOptions = computed(() => mergeOptions(GENDER_OPTIONS, customOptions.genderChoice, state.genderChoice));
const richnessOptions = computed(() => mergeOptions(RICHNESS_OPTIONS, customOptions.richnessLevel, state.richnessLevel));
const currentDirectionOptions = computed(() => mergeOptions(
  state.pageType === "unusual" ? UNUSUAL_DIRECTIONS : HUMAN_DIRECTIONS,
  customOptions[currentDirectionKey.value],
  activeDirection.value
));
const boundaryTagOptions = computed(() => mergeOptions(
  BOUNDARY_TAG_OPTIONS,
  customOptions.boundaryTags,
  state.boundaryTags
));
const riskLabel = computed(() => (
  state.pageType === "unusual" ? "能力代价或风险" : "关系里的难点"
));
const riskPlaceholder = computed(() => (
  state.pageType === "unusual"
    ? "例如：每次动用能力都会付出代价，情绪失控时也可能伤到身边的人。"
    : "例如：工作很忙，不擅长立刻表达情绪，越在意越容易嘴硬。"
));

const richnessProfile = computed(() => RICHNESS_PROFILES[state.richnessLevel] || RICHNESS_PROFILES.丰满);
const promptText = computed(() => buildPrompt(state, richnessProfile.value, state.jsonMode));
const statsText = computed(() => {
  const trimmed = promptText.value.trim();
  if (!trimmed) return "结果统计：0 字，0 行。";
  return `结果统计：约 ${trimmed.length} 字，${trimmed.split("\n").length} 行。`;
});

const steps = computed(() => {
  const base = [
    {
      key: "route",
      type: "route",
      title: "角色类型",
      desc: ""
    },
    {
      key: "basic",
      type: "basic",
      title: "基础信息",
      desc: ""
    },
    {
      key: "structure",
      type: "structure",
      title: "角色补充",
      desc: ""
    },
    {
      key: "relationship",
      type: "relationship",
      title: "关系与边界",
      desc: ""
    },
    ...(
      state.pageType === "unusual"
        ? UNUSUAL_TAG_GROUPS.map((group) => ({
          key: group.key,
          type: "tags",
          title: group.title,
          desc: "",
          group
        }))
        : HUMAN_TAG_GROUPS.map((group) => ({
          key: group.key,
          type: "tags",
          title: group.title,
          desc: "",
          group
        }))
    ),
    {
      key: "preferences",
      type: "preferences",
      title: "额外要求",
      desc: ""
    },
    {
      key: "preview",
      type: "preview",
      title: "结果",
      desc: ""
    }
  ];

  return base.map((item, index) => ({
    ...item,
    step: String(index + 1).padStart(2, "0")
  }));
});

function getSuggestions(targetKey) {
  return collectContextSuggestions({
    pageType: state.pageType,
    targetKey,
    state,
    flowOrder: getFlowOrder(state.pageType),
    rules: getContextRules(state.pageType),
    profiles: getSmartProfiles(state.pageType)
  });
}

const relationshipModeSuggestions = computed(() => getSuggestions("relationshipMode"));
const relationshipModeOptions = computed(() => buildContextualOptions(
  RELATIONSHIP_MODE_OPTIONS,
  relationshipModeSuggestions.value,
  customOptions.relationshipMode,
  state.relationshipMode,
  5
));
const chatStyleModeSuggestions = computed(() => getSuggestions("chatStyleMode"));
const chatStyleModeOptions = computed(() => buildContextualOptions(
  CHAT_STYLE_MODE_OPTIONS,
  chatStyleModeSuggestions.value,
  customOptions.chatStyleMode,
  state.chatStyleMode,
  5
));

function clampStep(index) {
  return Math.max(0, Math.min(index, steps.value.length - 1));
}

const currentStepMeta = computed(() => steps.value[clampStep(state.currentStep)] || steps.value[0]);
const currentTagGroup = computed(() => currentStepMeta.value?.group || null);
const currentTagSuggestions = computed(() => (
  currentTagGroup.value ? getSuggestions(currentTagGroup.value.key) : []
));
const currentTagRealnessOptions = computed(() => (
  currentTagGroup.value ? getRealnessOptions(state.pageType, currentTagGroup.value.key) : []
));
const currentRecommendedTagOptions = computed(() => (
  currentTagGroup.value
    ? currentTagSuggestions.value.slice(0, getRecommendedLimit(state.pageType, currentTagGroup.value.key))
    : []
));
const currentOtherTagOptions = computed(() => {
  if (!currentTagGroup.value) return [];
  return mergeOptions(
    currentTagGroup.value.options,
    currentTagRealnessOptions.value,
    customOptions[currentTagGroup.value.key],
    state[currentTagGroup.value.key]
  ).filter((item) => !currentRecommendedTagOptions.value.includes(item));
});
const isPreviewStep = computed(() => currentStepMeta.value?.type === "preview");
const shouldShowEditButton = computed(() => (
  currentStepMeta.value?.type === "basic"
  || currentStepMeta.value?.type === "structure"
  || currentStepMeta.value?.type === "relationship"
  || currentStepMeta.value?.type === "tags"
));
const stepProgressPercent = computed(() => `${((state.currentStep + 1) / steps.value.length) * 100}%`);
const isLastStep = computed(() => state.currentStep >= steps.value.length - 1);
const nextButtonText = computed(() => {
  if (isLastStep.value) {
    return "已到最后一步";
  }
  if (state.currentStep === steps.value.length - 2) {
    return "查看提示词";
  }
  return "下一步";
});
const leftButtonText = computed(() => (state.currentStep === 0 ? "随机灵感" : "上一步"));

const associationAudit = computed(() => {
  const groups = state.pageType === "unusual" ? UNUSUAL_TAG_GROUPS : HUMAN_TAG_GROUPS;
  const relationIssues = [];
  let checkedCount = 0;
  const realnessIssues = [];

  groups.forEach((group) => {
    const selected = normalizeValues(state[group.key]);
    if (!selected.length) return;

     const softLimit = getSelectionSoftLimit(state.pageType, group.key);
    if (selected.length > softLimit) {
      relationIssues.push(`${group.title}当前选得有点多了。为了让生成更稳，建议先收成 ${softLimit} 个左右的主标签。`);
    }

    const suggestions = getSuggestions(group.key);
    if (!suggestions.length) return;

    checkedCount += 1;
    if (!selected.some((item) => suggestions.includes(item))) {
      relationIssues.push(`${group.title}这一组和前面方向有一点分散。如果你想更统一，可以补 1 到 2 个更贴合的标签；不改也可以。`);
    }
  });

  getRealnessChecks(state.pageType).forEach((check) => {
    const matchedByTags = (check.tagKeys || []).some((key) => (
      normalizeValues(state[key]).some((item) => check.options.includes(item))
    ));
    const matchedByText = (check.textKeys || []).some((key) => (
      typeof state[key] === "string" && state[key].trim()
    ));

    if (!matchedByTags && !matchedByText) {
      realnessIssues.push(`${check.title}：${check.message}`);
    }
  });

  if (!checkedCount) {
    return {
      summary: "当前可检查的信息还不多，系统会继续根据你的选择做提醒，但不会强制纠正。",
      groups: []
    };
  }

  const groupsForView = [
    relationIssues.length ? { title: "关联性提醒", items: relationIssues } : null,
    realnessIssues.length ? { title: "真实感提醒", items: realnessIssues } : null
  ].filter(Boolean);

  if (!groupsForView.length) {
    return {
      summary: "当前已选标签的关联性不错，整体方向比较统一，也没有被系统强行收成单一模板。",
      groups: []
    };
  }

  return {
    summary: "系统发现有几处可以再斟酌，但这里只做提醒，不会强制你改。",
    groups: groupsForView
  };
});

watch(
  () => JSON.stringify(buildStoredState(state)),
  (value) => {
    localStorage.setItem(STORAGE_KEY, value);
  },
  { immediate: true }
);

watch(
  () => JSON.stringify(customOptions),
  (value) => {
    localStorage.setItem(CUSTOM_OPTIONS_KEY, value);
  },
  { immediate: true }
);

watch(
  () => steps.value.length,
  () => {
    state.currentStep = clampStep(state.currentStep);
  },
  { immediate: true }
);

function setStep(index) {
  state.currentStep = clampStep(index);
}

function goPrev() {
  setStep(state.currentStep - 1);
}

function goNext() {
  setStep(state.currentStep + 1);
}

function handleLeftAction() {
  if (state.currentStep === 0) {
    randomize(true);
    return;
  }
  goPrev();
}

function updatePageType(nextPage) {
  state.pageType = nextPage;
  statusText.value = nextPage === "unusual" ? "已切换到非传统角色。" : "已切换到普通人类角色。";
}

function updateMulti(key, nextValue) {
  state[key] = nextValue;
}

function addCustomOption(key, label) {
  const normalized = typeof label === "string" ? label.trim() : "";
  if (!normalized) return;

  const next = mergeOptions([], customOptions[key], normalized);
  customOptions[key] = next;
  statusText.value = `已添加自定义标签：${normalized}`;
}

function removeCustomOption(key, label) {
  const normalized = typeof label === "string" ? label.trim() : "";
  if (!normalized) return;

  customOptions[key] = customOptions[key].filter((item) => item !== normalized);

  if (Array.isArray(state[key])) {
    state[key] = state[key].filter((item) => item !== normalized);
  } else if (state[key] === normalized) {
    const fallbackOptions = mergeOptions(getBaseOptionsByKey(key), customOptions[key]);
    state[key] = fallbackOptions[0] || "";
  }

  statusText.value = `已删除自定义标签：${normalized}`;
}

function randomPick(options, min, max) {
  const list = [...options];
  for (let index = list.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [list[index], list[randomIndex]] = [list[randomIndex], list[index]];
  }
  const count = min + Math.floor(Math.random() * (max - min + 1));
  return list.slice(0, count);
}

function jumpToPreview() {
  const previewIndex = steps.value.findIndex((item) => item.type === "preview");
  if (previewIndex >= 0) {
    setStep(previewIndex);
  }
}

function randomize(shouldJumpToPreview = false) {
  state.pageType = Math.random() > 0.5 ? "human" : "unusual";
  state.genderChoice = Math.random() > 0.5 ? "男性" : "女性";
  state.richnessLevel = RICHNESS_OPTIONS[Math.floor(Math.random() * RICHNESS_OPTIONS.length)];
  state.relationshipMode = RELATIONSHIP_MODE_OPTIONS[Math.floor(Math.random() * RELATIONSHIP_MODE_OPTIONS.length)];
  state.chatStyleMode = CHAT_STYLE_MODE_OPTIONS[Math.floor(Math.random() * CHAT_STYLE_MODE_OPTIONS.length)];
  state.boundaryTags = randomPick(BOUNDARY_TAG_OPTIONS, 2, 4);
  state.ageRange = ["18-24岁", "22-28岁", "24-30岁", "25-32岁"][Math.floor(Math.random() * 4)];

  if (state.pageType === "human") {
    state.humanDirectionChoice = HUMAN_DIRECTIONS[Math.floor(Math.random() * HUMAN_DIRECTIONS.length)];
    state.roleTags = randomPick(HUMAN_TAG_GROUPS[0].options, 2, 4);
    state.traitTags = randomPick(HUMAN_TAG_GROUPS[1].options, 3, 5);
    state.sceneTags = randomPick(HUMAN_TAG_GROUPS[2].options, 2, 4);
    state.feelingTags = randomPick(HUMAN_TAG_GROUPS[3].options, 2, 4);
    state.styleTags = randomPick(HUMAN_TAG_GROUPS[4].options, 2, 4);
  } else {
    state.unusualDirectionChoice = UNUSUAL_DIRECTIONS[Math.floor(Math.random() * UNUSUAL_DIRECTIONS.length)];
    state.worldTags = randomPick(UNUSUAL_TAG_GROUPS[0].options, 1, 3);
    state.speciesTags = randomPick(UNUSUAL_TAG_GROUPS[1].options, 1, 3);
    state.identityTags = randomPick(UNUSUAL_TAG_GROUPS[2].options, 2, 4);
    state.powerTags = randomPick(UNUSUAL_TAG_GROUPS[3].options, 2, 4);
    state.unusualSceneTags = randomPick(UNUSUAL_TAG_GROUPS[4].options, 2, 4);
    state.unusualFeelingTags = randomPick(UNUSUAL_TAG_GROUPS[5].options, 2, 4);
    state.unusualStyleTags = randomPick(UNUSUAL_TAG_GROUPS[6].options, 2, 4);
  }

  statusText.value = "已生成一组随机灵感。";

  if (shouldJumpToPreview) {
    jumpToPreview();
  }
}

async function copyPrompt() {
  try {
    await navigator.clipboard.writeText(promptText.value);
    statusText.value = "提示词已复制。";
  } catch (error) {
    statusText.value = "复制失败，请手动复制右侧内容。";
  }
}

async function sharePrompt() {
  try {
    if (navigator.share) {
      await navigator.share({
        title: "角色提示词生成器",
        text: promptText.value
      });
      statusText.value = "提示词已发起分享。";
      return;
    }

    await navigator.clipboard.writeText(promptText.value);
    statusText.value = "当前环境不支持直接分享，已复制提示词。";
  } catch (error) {
    statusText.value = "分享失败，请稍后重试。";
  }
}

function restartFlow() {
  Object.assign(state, createEmptyState());
  statusText.value = "已重新开始。";
}
</script>

<template>
  <div class="app-shell">
    <section class="main-layout">
      <div class="guide-column">
        <div class="guide-stage">
          <StepCard
            v-if="currentStepMeta"
            :step="currentStepMeta.step"
            :title="currentStepMeta.title"
            :desc="currentStepMeta.desc"
            :footer-visible="!isPreviewStep"
            :class="{
              'step-card-active': true,
              'first-step-card': currentStepMeta.type === 'route',
              'tag-step-card': currentStepMeta.type === 'tags',
              'preview-step-card': currentStepMeta.type === 'preview'
            }"
          >
            <template #actions>
              <button
                v-if="shouldShowEditButton"
                class="secondary-btn edit-toggle-btn"
                type="button"
                :aria-pressed="isEditMode"
                @click="isEditMode = !isEditMode"
              >
                {{ isEditMode ? "完成" : "编辑" }}
              </button>
            </template>

            <template v-if="currentStepMeta.type === 'preview'" #header>
              <div class="preview-finish-header">
                <div class="preview-finish-copy">
                  <div class="step-copy">
                    <h2>你的角色提示词</h2>
                  </div>
                </div>
              </div>
            </template>

            <template v-if="currentStepMeta.type === 'route'" #header>
              <div class="card-intro route-intro">
                <div class="site-intro">
                  <span class="site-kicker">叙说</span>
                  <h1 class="site-title">角色提示词生成器</h1>
                  <p class="site-note">帮你整理角色信息，生成可直接复制的提示词。</p>
                </div>
                <div class="route-subhead">
                  <span class="route-label">开始设置</span>
                  <h2>选择角色类型</h2>
                </div>
              </div>
            </template>

            <template v-if="currentStepMeta.type === 'route'">
              <div class="route-grid">
                <button
                  v-for="item in PAGE_OPTIONS"
                  :key="item.value"
                  class="route-card"
                  :class="{ active: state.pageType === item.value }"
                  type="button"
                  @click="updatePageType(item.value)"
                >
                  <strong>{{ item.title }}</strong>
                  <span>{{ item.desc }}</span>
                </button>
              </div>
            </template>

            <template v-else-if="currentStepMeta.type === 'basic'">
              <div class="card-grid two-cols">
                <div class="field-block">
                  <span class="field-title">角色性别</span>
                  <ChoiceChipGroup
                    v-model="state.genderChoice"
                    :options="genderOptions"
                    :custom-options="customOptions.genderChoice"
                    :edit-mode="isEditMode"
                    addable
                    input-placeholder="输入新的性别标签"
                    @add-option="addCustomOption('genderChoice', $event)"
                    @remove-option="removeCustomOption('genderChoice', $event)"
                  />
                </div>
                <div class="field-block">
                  <span class="field-title">互动方向</span>
                  <ChoiceChipGroup
                    v-model="activeDirection"
                    :options="currentDirectionOptions"
                    :custom-options="customOptions[currentDirectionKey]"
                    :edit-mode="isEditMode"
                    addable
                    input-placeholder="输入新的互动方向"
                    @add-option="addCustomOption(currentDirectionKey, $event)"
                    @remove-option="removeCustomOption(currentDirectionKey, $event)"
                  />
                </div>
              </div>

              <div class="card-grid two-cols compact-gap">
                <label class="text-field">
                  <span>固定角色名</span>
                  <input v-model.trim="state.fixedName" type="text" placeholder="可空，留空则让 AI 自行命名">
                </label>
                <label class="text-field">
                  <span>年龄范围</span>
                  <input v-model.trim="state.ageRange" type="text" placeholder="例如：18-24岁">
                </label>
              </div>

              <div class="field-block">
                  <span class="field-title">内容多少</span>
                  <ChoiceChipGroup
                    v-model="state.richnessLevel"
                    :options="richnessOptions"
                    :custom-options="customOptions.richnessLevel"
                    :edit-mode="isEditMode"
                    addable
                    input-placeholder="输入新的内容档位"
                    @add-option="addCustomOption('richnessLevel', $event)"
                    @remove-option="removeCustomOption('richnessLevel', $event)"
                  />
              </div>
            </template>

            <template v-else-if="currentStepMeta.type === 'structure'">
              <div class="card-grid">
                <label class="text-field">
                  <span>角色核心一句话</span>
                  <input
                    v-model.trim="state.coreConcept"
                    type="text"
                    placeholder="例如：表面冷淡，但会认真接住情绪的慢热守护者。"
                  >
                </label>
              </div>

              <div class="card-grid two-cols">
                <label class="text-field">
                  <span>长期有得聊的点</span>
                  <textarea
                    v-model.trim="state.longTermPoint"
                    placeholder="例如：会记住你说过的小事，过几天也会主动问后续。"
                  />
                </label>
                <label class="text-field">
                  <span>{{ riskLabel }}</span>
                  <textarea
                    v-model.trim="state.riskNote"
                    :placeholder="riskPlaceholder"
                  />
                </label>
              </div>
            </template>

            <template v-else-if="currentStepMeta.type === 'relationship'">
              <div class="card-grid two-cols">
                <div class="field-block">
                  <span class="field-title">关系模式</span>
                  <ChoiceChipGroup
                    v-model="state.relationshipMode"
                    :options="relationshipModeOptions"
                    :custom-options="customOptions.relationshipMode"
                    :edit-mode="isEditMode"
                    addable
                    input-placeholder="输入新的关系模式"
                    @add-option="addCustomOption('relationshipMode', $event)"
                    @remove-option="removeCustomOption('relationshipMode', $event)"
                  />
                </div>
                <div class="field-block">
                  <span class="field-title">说话风格</span>
                  <ChoiceChipGroup
                    v-model="state.chatStyleMode"
                    :options="chatStyleModeOptions"
                    :custom-options="customOptions.chatStyleMode"
                    :edit-mode="isEditMode"
                    addable
                    input-placeholder="输入新的聊天风格"
                    @add-option="addCustomOption('chatStyleMode', $event)"
                    @remove-option="removeCustomOption('chatStyleMode', $event)"
                  />
                </div>
              </div>

              <div class="field-block">
                <span class="field-title">边界与禁区</span>
                <ChoiceChipGroup
                  :model-value="state.boundaryTags"
                  :options="boundaryTagOptions"
                  :custom-options="customOptions.boundaryTags"
                  :edit-mode="isEditMode"
                  multiple
                  addable
                  input-placeholder="输入新的边界标签"
                  @update:model-value="updateMulti('boundaryTags', $event)"
                  @add-option="addCustomOption('boundaryTags', $event)"
                  @remove-option="removeCustomOption('boundaryTags', $event)"
                />
              </div>
            </template>

            <template v-else-if="currentStepMeta.type === 'tags' && currentTagGroup">
              <div class="tag-step-body">
                <section v-if="currentRecommendedTagOptions.length" class="tag-section">
                  <div class="tag-section-head">
                    <strong>智能推荐</strong>
                  </div>
                  <ChoiceChipGroup
                    :model-value="state[currentTagGroup.key]"
                    :options="currentRecommendedTagOptions"
                    :custom-options="[]"
                    :edit-mode="false"
                    multiple
                    @update:model-value="updateMulti(currentTagGroup.key, $event)"
                  />
                </section>

                <section class="tag-section">
                  <div class="tag-section-head">
                    <strong>其他标签</strong>
                  </div>
                  <ChoiceChipGroup
                    :model-value="state[currentTagGroup.key]"
                    :options="currentOtherTagOptions"
                    :custom-options="customOptions[currentTagGroup.key]"
                    :edit-mode="isEditMode"
                    multiple
                    addable
                    input-placeholder="输入新的标签"
                    @update:model-value="updateMulti(currentTagGroup.key, $event)"
                    @add-option="addCustomOption(currentTagGroup.key, $event)"
                    @remove-option="removeCustomOption(currentTagGroup.key, $event)"
                  />
                </section>
              </div>
            </template>

            <template v-else-if="currentStepMeta.type === 'preferences'">
              <div class="card-grid">
                <label class="text-field">
                  <span>额外偏好</span>
                  <textarea
                    v-model.trim="state.extraPrompt"
                    placeholder="例如：希望更有生活感，可以有一点成熟照顾感。"
                  />
                </label>
                <label class="text-field">
                  <span>明确避开</span>
                  <textarea
                    v-model.trim="state.avoidPrompt"
                    placeholder="例如：不要太模板化，不要太悬浮。"
                  />
                </label>
              </div>
            </template>

            <template v-else-if="currentStepMeta.type === 'preview'">
              <div class="preview-top preview-card-top">
                <div class="preview-summary">
                  <p>{{ state.jsonMode ? "叙说格式提示词" : "普通文本提示词" }}</p>
                  <span>{{ statsText }}</span>
                </div>
              </div>

              <section class="recommend-card audit-card">
                <div class="recommend-head">
                  <h3>关联检查</h3>
                  <p>{{ associationAudit.summary }}</p>
                </div>
                <div v-if="associationAudit.groups.length" class="audit-groups">
                  <section v-for="group in associationAudit.groups" :key="group.title" class="audit-group">
                    <strong>{{ group.title }}</strong>
                    <div class="audit-list">
                      <p v-for="item in group.items" :key="item">{{ item }}</p>
                    </div>
                  </section>
                </div>
              </section>

              <div class="preview-format-toggle">
                <label class="mode-toggle">
                  <input v-model="state.jsonMode" type="checkbox">
                  <span>使用叙说格式</span>
                </label>
              </div>

              <div class="preview-actions">
                <button class="secondary-btn copy-btn" type="button" @click="copyPrompt">复制提示词</button>
                <button class="primary-btn share-btn" type="button" @click="sharePrompt">分享提示词</button>
              </div>

              <textarea class="preview-textarea mobile-preview-textarea" :value="promptText" readonly />

              <div class="preview-meta">
                <span>{{ statusText || "当前已经生成完成，可以直接复制或分享。" }}</span>
              </div>

              <div class="preview-bottom-actions">
                <button class="secondary-btn" type="button" @click="restartFlow">重新开始</button>
              </div>
            </template>

            <template v-if="!isPreviewStep" #footer>
              <section class="wizard-footer">
                <div class="wizard-progress-bar">
                  <div class="wizard-progress-fill" :style="{ width: stepProgressPercent }" />
                </div>
                <div class="mobile-nav-actions">
                  <button class="secondary-btn" type="button" @click="handleLeftAction">{{ leftButtonText }}</button>
                  <button class="primary-btn" type="button" :disabled="isLastStep" @click="goNext">{{ nextButtonText }}</button>
                </div>
              </section>
            </template>
          </StepCard>
        </div>
      </div>
    </section>
  </div>
</template>
