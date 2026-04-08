import { HUMAN_TAG_GROUPS, UNUSUAL_TAG_GROUPS } from "../data/options.js";

function joinOrFallback(values, fallback) {
  return values.length ? values.join("、") : fallback;
}

function byKey(groups, key) {
  return groups.find((item) => item.key === key);
}

function buildBoundaryLine(values) {
  return values.length ? values.join("、") : "不过度控制、不情绪勒索、尊重边界、尊重拒绝";
}

function buildLongTermLine(value, pageType) {
  if (value) return value;
  return pageType === "unusual"
    ? "请补上一两个能反复展开的话题、秘密、任务或关系变化，让角色后面一直有内容可聊。"
    : "请补上一两个能反复展开的日常话题、相处习惯或长期变化，让角色后面一直有内容可聊。";
}

function buildRiskLine(value, pageType) {
  if (value) return value;
  return pageType === "unusual"
    ? "请补清能力代价、失控风险或必须承担的后果，不能只有强大没有代价。"
    : "请补清关系里的难点、现实压力或不容易处理的地方，不能只有顺利没有阻力。";
}

function buildHumanBrief(state) {
  const nameLine = state.fixedName ? `固定角色名：${state.fixedName}` : "角色名：请你自行命名，但要自然、好记、适合中文聊天角色。";
  return [
    `角色：${state.genderChoice}，成年人，年龄建议 ${state.ageRange}。`,
    `互动方向：${state.humanDirectionChoice}。性别与关系设定独立，不互相限制。`,
    state.coreConcept ? `角色核心一句话：${state.coreConcept}` : "角色核心一句话：请先提炼一句能概括角色感觉、吸引点和相处氛围的话。",
    `长期有得聊的点：${buildLongTermLine(state.longTermPoint, "human")}`,
    `关系里的难点：${buildRiskLine(state.riskNote, "human")}`,
    `关系模式：${state.relationshipMode}。请明确谁更主动、谁更克制，以及关系推进速度。`,
    `说话风格：${state.chatStyleMode}。请确保最终说话感觉稳定，不要忽冷忽热。`,
    `边界与禁区：${buildBoundaryLine(state.boundaryTags)}。这些内容必须一直遵守，不要踩线。`,
    nameLine,
    `角色定位标签：${joinOrFallback(state.roleTags, byKey(HUMAN_TAG_GROUPS, "roleTags").fallback)}。`,
    `核心特质标签：${joinOrFallback(state.traitTags, byKey(HUMAN_TAG_GROUPS, "traitTags").fallback)}。`,
    `聊天氛围标签：${joinOrFallback(state.sceneTags, byKey(HUMAN_TAG_GROUPS, "sceneTags").fallback)}。`,
    `用户感受目标：${joinOrFallback(state.feelingTags, byKey(HUMAN_TAG_GROUPS, "feelingTags").fallback)}。`,
    state.styleTags.length ? `风格加成：${state.styleTags.join("、")}。` : "",
    state.extraPrompt ? `额外偏好：${state.extraPrompt}` : "",
    state.avoidPrompt ? `明确避开：${state.avoidPrompt}。` : ""
  ].filter(Boolean).join("\n");
}

function buildUnusualBrief(state) {
  const nameLine = state.fixedName ? `固定角色名：${state.fixedName}` : "角色名：请你自行命名，但要自然、好记、适合中文聊天与世界观设定。";
  return [
    `角色：${state.genderChoice}，可为非人、异种、超自然存在或架空世界身份。外观年龄建议 ${state.ageRange}。`,
    `互动方向：${state.unusualDirectionChoice}。即使设定非传统，也要保留长期互动的关系推进。`,
    state.coreConcept ? `角色核心一句话：${state.coreConcept}` : "角色核心一句话：请先提炼一句能概括角色感觉、设定亮点和相处氛围的话。",
    `长期有得聊的点：${buildLongTermLine(state.longTermPoint, "unusual")}`,
    `能力代价或风险：${buildRiskLine(state.riskNote, "unusual")}`,
    `关系模式：${state.relationshipMode}。请明确谁更主动、谁更克制，以及关系推进速度。`,
    `说话风格：${state.chatStyleMode}。请确保最终说话感觉稳定，同时保留角色本身的特色。`,
    `边界与禁区：${buildBoundaryLine(state.boundaryTags)}。这些内容必须一直遵守，不要踩线。`,
    nameLine,
    `世界观标签：${joinOrFallback(state.worldTags, byKey(UNUSUAL_TAG_GROUPS, "worldTags").fallback)}。`,
    `物种设定标签：${joinOrFallback(state.speciesTags, byKey(UNUSUAL_TAG_GROUPS, "speciesTags").fallback)}。`,
    `身份阵营标签：${joinOrFallback(state.identityTags, byKey(UNUSUAL_TAG_GROUPS, "identityTags").fallback)}。`,
    `能力特征标签：${joinOrFallback(state.powerTags, byKey(UNUSUAL_TAG_GROUPS, "powerTags").fallback)}。`,
    `互动场景标签：${joinOrFallback(state.unusualSceneTags, byKey(UNUSUAL_TAG_GROUPS, "unusualSceneTags").fallback)}。`,
    `用户感受目标：${joinOrFallback(state.unusualFeelingTags, byKey(UNUSUAL_TAG_GROUPS, "unusualFeelingTags").fallback)}。`,
    state.unusualStyleTags.length ? `风格加成：${state.unusualStyleTags.join("、")}。` : "",
    state.extraPrompt ? `额外偏好：${state.extraPrompt}` : "",
    state.avoidPrompt ? `明确避开：${state.avoidPrompt}。` : ""
  ].filter(Boolean).join("\n");
}

function buildHumanPlainPrompt(state, profile) {
  return `你是一名很擅长设计 AI 聊天角色的人，能写出适合长期聊天、有人味、有吸引力的成年角色。

任务：
根据条件完成 1 个完整、可信、可长期互动的角色设定，并整理成可直接给 AI 使用的人设文本。

本次详细程度：${state.richnessLevel}
本次目标：${profile.promptGoal}

要求：
1. 目标用户是刚成年的女性用户。
2. 角色要同时具备安全感、安慰人的能力、生活感、分寸感和持续聊天能力。
3. 恋爱向可以有心动感和偏爱感，但不要油腻、压迫、病态。
4. 不要机械拼标签，要先形成统一的角色感觉再展开。
5. 角色必须像真实存在的人，不能只是空泛标签集合。
6. 条件再少也要主动补齐内容，至少包含：现实身份、成长经历、当前生活状态、情绪触发点、关系边界、脆弱面、反差面、能持续聊下去的点、关系里的难点。
7. 必须优先参考“角色核心一句话、长期有得聊的点、关系里的难点、关系模式、说话风格、边界与禁区”，把它们当成全文最重要的要求。
8. 每个部分都写具体，不要只写几个词，不要反复重复同一意思。
9. 输出内容要符合当前详细程度，不要压成几句摘要。

请按这个结构输出：
- 角色名
- 一句话介绍（20-40字）
- 角色最核心的感觉（不少于${profile.coreMin}字）
- 成长与经历（不少于${profile.growthMin}字）
- 当前生活状态（不少于${profile.currentMin}字）
- 性格层次（至少 6 点，需包含优点、缺点、脆弱点、反差感、原则边界、情绪触发点）
- 长期保持聊天的原因（不少于${profile.hookMin}字，要明确后续还能聊什么）
- 关系里的难点（不少于${profile.boundaryMin}字，要写清现实阻力或相处难点）
- 与用户的关系设计（不少于${profile.relationMin}字，明确关系模式与推进逻辑）
- 平时怎么相处、关系怎么推进（不少于${profile.paceMin}字）
- 高频聊天场景（至少 ${profile.sceneCount} 个，要具体）
- 说话方式和常说的话（不少于${profile.styleMin}字，必须对齐说话风格）
- 怎么安慰人（不少于${profile.comfortMin}字）
- 不能碰的点（不少于${profile.boundaryMin}字，必须严格遵守边界与禁区）
- 最终可直接使用的人设文本（不少于${profile.finalMin}字，直接输出完整正文，不要提纲）

已知条件：
${buildHumanBrief(state)}`;
}

function buildUnusualPlainPrompt(state, profile) {
  return `你是一名很擅长设计幻想系 AI 角色的人，能写出非传统、非人或架空世界中的聊天角色，既有亮点，也适合长期聊天。

任务：
根据条件完成 1 个完整、可信、可长期互动的非传统角色设定，并整理成可直接给 AI 使用的人设文本。

本次详细程度：${state.richnessLevel}
本次目标：${profile.promptGoal}

要求：
1. 可以是非人角色、异种生命、超自然存在、机械生命、古代身份、玄幻人物、赛博朋克角色或架空世界人物。
2. 设定可以不现实，但必须自洽，不能只堆奇幻名词。
3. 必须写清所处世界、身份来历、能力表现、能力代价或限制、角色的危险点和克制点。
4. 即使是背景很强的角色，也必须保留聊天感、生活感、关系推进感和长期互动能力。
5. 恋爱向可以有心动感、偏爱感、占有欲或禁忌感，但不要病态、压迫、失控伤害用户。
6. 不要机械拼标签，要先形成统一的角色感觉，再让世界观服务于人物。
7. 必须优先参考“角色核心一句话、长期有得聊的点、能力代价或风险、关系模式、说话风格、边界与禁区”，把它们当成全文最重要的要求。
8. 输出内容要符合当前详细程度，不要压成几句背景简介。
9. 至少补齐：物种特点、世界规则、身份立场、能力与限制、情绪触发点、关系禁忌、和人相处时哪里不像普通人。

请按这个结构输出：
- 角色名
- 一句话介绍（20-40字）
- 角色最核心的感觉（不少于${profile.coreMin}字）
- 物种和身份（不少于${profile.currentMin}字）
- 所处世界和时代背景（不少于${profile.growthMin}字）
- 能力与限制（不少于${profile.currentMin}字）
- 成长与经历（不少于${profile.growthMin}字）
- 性格层次（至少 6 点，需包含优点、缺点、危险面、克制面、脆弱点、原则边界）
- 长期保持聊天的原因（不少于${profile.hookMin}字，要明确后续还能聊什么）
- 能力代价或风险（不少于${profile.boundaryMin}字，要写清后果、代价或失控点）
- 与用户的关系设计（不少于${profile.relationMin}字，明确关系模式与推进逻辑）
- 平时怎么相处、关系怎么推进（不少于${profile.paceMin}字）
- 高频互动场景（至少 ${profile.sceneCount} 个，要具体）
- 说话方式和常说的话（不少于${profile.styleMin}字，必须对齐说话风格）
- 怎么安慰人（不少于${profile.comfortMin}字）
- 不能碰的点（不少于${profile.boundaryMin}字，必须严格遵守边界与禁区）
- 最终可直接使用的人设文本（不少于${profile.finalMin}字，直接输出完整正文，不要提纲）

已知条件：
${buildUnusualBrief(state)}`;
}

function buildHumanJsonPrompt(state, profile) {
  return `你很擅长整理角色设定，能先把角色写完整，再整理成可直接导入的联系人 JSON，既保证结构正确，也保证人物真实、有聊天感。

任务：
根据条件完成 1 个完整角色设定，并整理成 1 份可直接使用的“叙说联系人导入 JSON”。

本次详细程度：${state.richnessLevel}
本次目标：${profile.promptGoal}

要求：
1. 只输出合法 JSON，根结构必须是 {"contacts":[{...}]}，且只含 1 个联系人。
2. personality、persona、background、expressionStyle、description 各写各的内容，不互相重复。
3. 整体像真实聊天联系人，不要像模板说明书。
4. 恋爱向可以有心动感和偏爱感，但不要油腻、压迫、病态。
5. 不要机械拼标签，要先形成统一的角色感觉再写各项内容。
6. 条件不多也要主动补齐内容，尤其是经历、现状、关系逻辑、分寸感、能持续聊下去的点和关系里的难点。
7. 角色核心一句话、长期有得聊的点、关系里的难点、关系模式、说话风格、边界与禁区是最重要的要求，必须稳定写进长内容里。
8. 关键长内容不能空泛，输出密度必须符合当前详细程度。

每一项怎么写：
1. 长字段长度：personality ${profile.jsonPersonality}；persona ${profile.jsonPersona}；background ${profile.jsonBackground}；expressionStyle ${profile.jsonExpressionStyle}；description ${profile.jsonDescription}。
2. personality 写相处方式、情绪承接、分寸感、偏爱感，并明确关系模式；persona 写关系设定、常见相处场景、吸引点、角色核心一句话和长期有得聊的点；background 写成长经历、形成原因、当下状态和关系里的难点；expressionStyle 写语气、长短、节奏、常用表达、安慰方式、主动性，并严格对齐说话风格；description 写联系人简介的人味和生活状态。
3. openingLine 20-40字，要像真人第一次发来的消息；catchphrase 要有角色平时会说话的感觉；personalityTraits 填 4-6 个短词；hobbies 填 3-5 个真实爱好。
4. 禁止输出与边界与禁区相冲突的行为倾向。

按下面结构直接生成，固定值按示例输出：
{
  "contacts": [
    {
      "id": "英文或拼音 id，小写，无空格",
      "name": "自然顺口的角色名",
      "pinyin": "name 对应的普通话拼音，小写，空格分词",
      "avatar": "/assets/image/user.png",
      "unreadCount": 0,
      "isAi": true,
      "personality": "${profile.jsonPersonality}",
      "signature": "短签名",
      "region": "自然地区标签",
      "remark": "",
      "status": "短状态",
      "patDesc": "拍一拍文案",
      "wechatId": "自然账号",
      "age": "成年年龄或年龄段",
      "gender": "男性填 male，女性填 female，必须和角色性别一致",
      "constellation": "匹配星座",
      "mbti": "匹配 MBTI",
      "occupation": "职业或身份",
      "relationship": "关系设定",
      "personalityTraits": ["4-6 个短词"],
      "hobbies": ["3-5 个真实爱好"],
      "description": "${profile.jsonDescription}",
      "catchphrase": "常说的话",
      "openingLine": "20-40字自然消息",
      "persona": "${profile.jsonPersona}",
      "background": "${profile.jsonBackground}",
      "expressionStyle": "${profile.jsonExpressionStyle}",
      "language": "普通话",
      "translateToChinese": false,
      "chatMode": "online",
      "sentenceRange": "按风格填写，如 2-4句",
      "replyLimit": 3,
      "maxContextMessages": 30,
      "memorySummaryThreshold": 30,
      "allowRichActions": true,
      "socialPostLimit": 3
    }
  ]
}

已知条件：
${buildHumanBrief(state)}

请直接输出最终 JSON。`;
}

function buildUnusualJsonPrompt(state, profile) {
  return `你很擅长整理幻想角色设定，能先把非传统角色写完整，再整理成可直接导入的联系人 JSON，同时保证结构正确、设定自洽、人物有聊天感。

任务：
根据条件完成 1 个完整的非传统角色设定，并整理成 1 份可直接使用的“叙说联系人导入 JSON”。

本次详细程度：${state.richnessLevel}
本次目标：${profile.promptGoal}

要求：
1. 只输出合法 JSON，根结构必须是 {"contacts":[{...}]}，且只含 1 个联系人。
2. 允许角色是非人、异种、神性存在、古代人物、玄幻角色、赛博朋克角色、架空世界角色。
3. personality、persona、background、expressionStyle、description 各写各的内容，不互相重复。
4. 设定必须自洽，写清物种特性、世界规则、身份位置、能力与限制。
5. 整体仍要像“能聊天的联系人”，不能像百科词条。
6. 恋爱向可以有宿命感、危险感、禁忌感，但不要病态、压迫、伤害用户。
7. 角色核心一句话、长期有得聊的点、能力代价或风险、关系模式、说话风格、边界与禁区是最重要的要求，必须稳定写进长内容里。
8. 关键长内容不能空泛，输出密度必须符合当前详细程度。

每一项怎么写：
1. 长字段长度：personality ${profile.jsonPersonality}；persona ${profile.jsonPersona}；background ${profile.jsonBackground}；expressionStyle ${profile.jsonExpressionStyle}；description ${profile.jsonDescription}。
2. personality 写非传统身份下的相处方式、情绪承接、克制感、分寸感、偏爱感，并明确关系模式；persona 写关系设定、角色亮点、陪伴场景、角色核心一句话和长期有得聊的点；background 写世界观、身份来历、关键经历、能力代价或风险；expressionStyle 写语气、长短、是否保留不像普通人的感觉或时代感、主动性、安慰方式，并严格对齐说话风格；description 写角色感觉、气场和生活痕迹。
3. openingLine 20-40字，要像第一次发来的自然消息；catchphrase 要有角色平时会说话的感觉；personalityTraits 填 4-6 个短词；hobbies 填 3-5 个习惯或设定内行为。
4. 禁止输出与边界与禁区相冲突的行为倾向。

按下面结构直接生成，固定值按示例输出：
{
  "contacts": [
    {
      "id": "英文或拼音 id，小写，无空格",
      "name": "自然顺口的角色名",
      "pinyin": "name 对应的普通话拼音，小写，空格分词",
      "avatar": "/assets/image/user.png",
      "unreadCount": 0,
      "isAi": true,
      "personality": "${profile.jsonPersonality}",
      "signature": "短签名，可轻带角色特色",
      "region": "自然地区或势力标签",
      "remark": "",
      "status": "短状态",
      "patDesc": "拍一拍文案",
      "wechatId": "自然账号",
      "age": "成年年龄、年龄段或外观年龄",
      "gender": "男性填 male，女性填 female，必须和角色性别一致",
      "constellation": "匹配星座或接近的气质类型",
      "mbti": "匹配 MBTI 或接近的交流气质",
      "occupation": "职业、身份或阵营位置",
      "relationship": "关系设定",
      "personalityTraits": ["4-6 个短词"],
      "hobbies": ["3-5 个习惯或设定内行为"],
      "description": "${profile.jsonDescription}",
      "catchphrase": "常说的话",
      "openingLine": "20-40字自然消息",
      "persona": "${profile.jsonPersona}",
      "background": "${profile.jsonBackground}",
      "expressionStyle": "${profile.jsonExpressionStyle}",
      "language": "普通话",
      "translateToChinese": false,
      "chatMode": "online",
      "sentenceRange": "按风格填写，如 2-4句",
      "replyLimit": 3,
      "maxContextMessages": 30,
      "memorySummaryThreshold": 30,
      "allowRichActions": true,
      "socialPostLimit": 3
    }
  ]
}

已知条件：
${buildUnusualBrief(state)}

请直接输出最终 JSON。`;
}

export function buildPrompt(state, profile, jsonMode) {
  if (state.pageType === "unusual") {
    return jsonMode ? buildUnusualJsonPrompt(state, profile) : buildUnusualPlainPrompt(state, profile);
  }
  return jsonMode ? buildHumanJsonPrompt(state, profile) : buildHumanPlainPrompt(state, profile);
}
