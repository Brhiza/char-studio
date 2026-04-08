function joinIfAny(values) {
  return values.length ? values.join("、") : "";
}

function buildBoundaryLine(values) {
  return values.length ? values.join("、") : "";
}

function buildLongTermLine(value) {
  if (value) return value;
  return "";
}

function buildRiskLine(value) {
  if (value) return value;
  return "";
}

function buildJsonHardRules() {
  return `JSON 输出铁律：
1. 你的回复必须从半角字符 { 开始，并以半角字符 } 结束。
2. 只能输出 1 个合法 JSON 对象，禁止输出任何 JSON 之外的内容。
3. 禁止输出：说明文字、开场白、结尾、备注、注释、序号、标题、Markdown 代码块、\`\`\`json。
4. 所有字段都必须直接填写“最终内容”，不能写占位提示词，不能写“示例”“例如”“按风格填写”“待补充”“4-6 个短词”“3-5 个真实爱好”“20-40字自然消息”这类说明文字。
5. 所有字符串字段都必须是可直接使用的真实值；数组中的每一项也必须是真实值，不能是要求说明。
6. 严格使用 JSON 语法：双引号、逗号、方括号、花括号都要正确；不要使用单引号，不要写注释，不要省略引号。
7. 如果你拿不准内容，也只能输出符合要求的 JSON，不能解释原因。`;
}

function buildHumanJsonExample() {
  return `{
  "contacts": [
    {
      "id": "linxi",
      "name": "林汐",
      "pinyin": "L",
      "avatar": "/assets/image/user.png",
      "unreadCount": 0,
      "isAi": true,
      "personality": "温柔克制，擅长先接住情绪再表达观点，相处时有边界感，也会稳定给回应和偏爱。",
      "signature": "今天也别太为难自己",
      "region": "杭州",
      "remark": "",
      "status": "忙完会回你",
      "patDesc": "轻轻碰了碰你的肩",
      "wechatId": "linxi_daily",
      "age": "24",
      "gender": "female",
      "constellation": "巨蟹座",
      "mbti": "ISFJ",
      "occupation": "品牌插画师",
      "relationship": "慢热陪伴型暧昧对象",
      "personalityTraits": "温柔、克制、细腻、会倾听、有分寸",
      "hobbies": "做饭、散步、拍照、看展",
      "description": "生活节奏安静但不冷淡，能认真接住情绪，也会把平凡日子过出温度。",
      "catchphrase": "你慢慢说，我在听。",
      "openingLine": "刚忙完准备回家，路上看到一家新开的面包店，突然想问你今天过得怎么样。",
      "persona": "她像一个会认真记住你情绪起伏的人，靠近得不冒犯，关心也不悬空，适合慢慢建立稳定依赖。",
      "background": "她大学学的是视觉传达，毕业后留在城市做插画相关工作。早些年习惯自己扛事，所以看起来独立克制，但其实很在意关系里的回应质量。她不喜欢情绪拉扯，更相信稳定陪伴和一点点积累出来的信任。",
      "expressionStyle": "说话偏自然口语，句子不会太长，语气柔和但不黏腻。会先回应你的情绪，再补自己的看法，安慰人时不说空话，常用具体的小事让人落地。",
      "language": "普通话",
      "translateToChinese": false,
      "chatMode": "online",
      "sentenceRange": {
        "min": 2,
        "max": 4
      },
      "replyLimit": 120,
      "maxContextMessages": 30,
      "memorySummaryThreshold": 30,
      "allowRichActions": true,
      "socialPostLimit": 1
    }
  ]
}`;
}

function buildUnusualJsonExample() {
  return `{
  "contacts": [
    {
      "id": "yezhou",
      "name": "夜舟",
      "pinyin": "Y",
      "avatar": "/assets/image/user.png",
      "unreadCount": 0,
      "isAi": true,
      "personality": "表面冷静疏离，实际很会观察人的情绪变化，保护欲强但克制，不会用力量压人，更倾向安静守着。",
      "signature": "风停之前，我都在",
      "region": "雾港主城",
      "remark": "",
      "status": "巡夜中",
      "patDesc": "指尖轻敲了敲你的额头",
      "wechatId": "yezhou_watch",
      "age": "外观26",
      "gender": "male",
      "constellation": "天蝎座",
      "mbti": "INTJ",
      "occupation": "守夜人",
      "relationship": "危险中逐渐建立信任的同行者",
      "personalityTraits": "冷静、克制、敏锐、护短、可靠",
      "hobbies": "夜巡、整理旧档案、听雨、收集旧地图",
      "description": "带着一点非人的疏离感，但会在关键时刻把偏爱落到实处，让人觉得危险又可靠。",
      "catchphrase": "别慌，我还在这。",
      "openingLine": "今晚风向不太对，你先别一个人乱跑。要是害怕，就回我一句，我去接你。",
      "persona": "他像活在城市暗面的守夜人，知道很多不能公开的秘密，却愿意把少见的耐心留给你，关系推进慢但很稳。",
      "background": "他出身于负责处理异常事件的旧组织，长期在城市边缘巡查失控现象。能力和精神感知有关，越频繁使用越容易被噪声侵蚀，所以他习惯少说、多看、快判断。也正因为长期见过失控和背叛，他对关系始终谨慎，但一旦认定谁，就会把保护做得很具体。",
      "expressionStyle": "说话简短，节奏稳，常带一点观察后的提醒感。会保留轻微不像普通人的冷感，但不会故作玄虚。安慰人时偏直接处理问题，再补一句低声的安抚。",
      "language": "普通话",
      "translateToChinese": false,
      "chatMode": "online",
      "sentenceRange": {
        "min": 2,
        "max": 4
      },
      "replyLimit": 120,
      "maxContextMessages": 30,
      "memorySummaryThreshold": 30,
      "allowRichActions": true,
      "socialPostLimit": 1
    }
  ]
}`;
}

function buildHumanBrief(state) {
  return [
    `角色：${state.genderChoice}，成年人，年龄建议 ${state.ageRange}。`,
    `互动方向：${state.humanDirectionChoice}。`,
    state.coreConcept ? `角色核心一句话：${state.coreConcept}` : "",
    state.longTermPoint ? `长期有得聊的点：${buildLongTermLine(state.longTermPoint)}` : "",
    state.riskNote ? `关系里的难点：${buildRiskLine(state.riskNote)}` : "",
    `关系模式：${state.relationshipMode}。`,
    `说话风格：${state.chatStyleMode}。`,
    state.boundaryTags.length ? `边界与禁区：${buildBoundaryLine(state.boundaryTags)}。` : "",
    state.fixedName ? `固定角色名：${state.fixedName}` : "",
    state.roleTags.length ? `角色定位标签：${joinIfAny(state.roleTags)}。` : "",
    state.traitTags.length ? `核心特质标签：${joinIfAny(state.traitTags)}。` : "",
    state.sceneTags.length ? `聊天氛围标签：${joinIfAny(state.sceneTags)}。` : "",
    state.feelingTags.length ? `用户感受目标：${joinIfAny(state.feelingTags)}。` : "",
    state.styleTags.length ? `风格加成：${state.styleTags.join("、")}。` : "",
    state.extraPrompt ? `额外偏好：${state.extraPrompt}` : "",
    state.avoidPrompt ? `明确避开：${state.avoidPrompt}。` : ""
  ].filter(Boolean).join("\n");
}

function buildUnusualBrief(state) {
  return [
    `角色：${state.genderChoice}，可为非人、异种、超自然存在或架空世界身份。外观年龄建议 ${state.ageRange}。`,
    `互动方向：${state.unusualDirectionChoice}。`,
    state.coreConcept ? `角色核心一句话：${state.coreConcept}` : "",
    state.longTermPoint ? `长期有得聊的点：${buildLongTermLine(state.longTermPoint)}` : "",
    state.riskNote ? `能力代价或风险：${buildRiskLine(state.riskNote)}` : "",
    `关系模式：${state.relationshipMode}。`,
    `说话风格：${state.chatStyleMode}。`,
    state.boundaryTags.length ? `边界与禁区：${buildBoundaryLine(state.boundaryTags)}。` : "",
    state.fixedName ? `固定角色名：${state.fixedName}` : "",
    state.worldTags.length ? `世界观标签：${joinIfAny(state.worldTags)}。` : "",
    state.speciesTags.length ? `物种设定标签：${joinIfAny(state.speciesTags)}。` : "",
    state.identityTags.length ? `身份阵营标签：${joinIfAny(state.identityTags)}。` : "",
    state.powerTags.length ? `能力特征标签：${joinIfAny(state.powerTags)}。` : "",
    state.unusualSceneTags.length ? `互动场景标签：${joinIfAny(state.unusualSceneTags)}。` : "",
    state.unusualFeelingTags.length ? `用户感受目标：${joinIfAny(state.unusualFeelingTags)}。` : "",
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

用户需求：
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

用户需求：
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

${buildJsonHardRules()}

每一项怎么写：
1. 长字段长度：personality ${profile.jsonPersonality}；persona ${profile.jsonPersona}；background ${profile.jsonBackground}；expressionStyle ${profile.jsonExpressionStyle}；description ${profile.jsonDescription}。
2. personality 写相处方式、情绪承接、分寸感、偏爱感，并明确关系模式；persona 写关系设定、常见相处场景、吸引点、角色核心一句话和长期有得聊的点；background 写成长经历、形成原因、当下状态和关系里的难点；expressionStyle 写语气、长短、节奏、常用表达、安慰方式、主动性，并严格对齐说话风格；description 写联系人简介的人味和生活状态。
3. openingLine 20-40字，要像真人第一次发来的消息；catchphrase 要有角色平时会说话的感觉；personalityTraits 必须是 1 个字符串，用中文顿号或顿号风格分隔 4-6 个短词；hobbies 必须是 1 个字符串，用中文顿号或顿号风格分隔 3-5 个真实爱好。
4. sentenceRange 必须是 JSON 对象，格式固定为 {"min": 数字, "max": 数字}；min 和 max 都只能是纯数字，不能带“句”“字”等单位，不能写成字符串。
5. 固定字段必须保持如下取值：avatar="/assets/image/user.png"、unreadCount=0、isAi=true、remark=""、language="普通话"、translateToChinese=false、chatMode="online"、maxContextMessages=30、memorySummaryThreshold=30、allowRichActions=true。
6. pinyin 必须参考导入样例填写为单个大写英文字母，例如 L、Y、G；不要写完整拼音，不要写带空格拼音。
7. region 对现实角色优先写成“中国·城市”格式，例如“中国·上海”“中国·杭州”。
8. wechatId 建议使用小写英文或拼音字母，可带数字，不要带空格和中文。
9. age 必须是字符串，优先填写纯数字年龄，例如 "23"；只有非传统角色才允许类似 "外观26"。
10. replyLimit、socialPostLimit 必须是数字，不要带单位，不要写成字符串；replyLimit 建议 120-150，socialPostLimit 建议 1-2。
11. 禁止输出与边界与禁区相冲突的行为倾向。

字段结构与数据类型参考下面示例。示例值只是演示格式，你必须改写成符合本次设定的最终内容，不能照抄示例值：
${buildHumanJsonExample()}

用户需求：
${buildHumanBrief(state)}

再次强调：最终回复只能是 JSON 本体，不能有任何其他文字。`;
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

${buildJsonHardRules()}

每一项怎么写：
1. 长字段长度：personality ${profile.jsonPersonality}；persona ${profile.jsonPersona}；background ${profile.jsonBackground}；expressionStyle ${profile.jsonExpressionStyle}；description ${profile.jsonDescription}。
2. personality 写非传统身份下的相处方式、情绪承接、克制感、分寸感、偏爱感，并明确关系模式；persona 写关系设定、角色亮点、陪伴场景、角色核心一句话和长期有得聊的点；background 写世界观、身份来历、关键经历、能力代价或风险；expressionStyle 写语气、长短、是否保留不像普通人的感觉或时代感、主动性、安慰方式，并严格对齐说话风格；description 写角色感觉、气场和生活痕迹。
3. openingLine 20-40字，要像第一次发来的自然消息；catchphrase 要有角色平时会说话的感觉；personalityTraits 必须是 1 个字符串，用中文顿号或顿号风格分隔 4-6 个短词；hobbies 必须是 1 个字符串，用中文顿号或顿号风格分隔 3-5 个习惯或设定内行为。
4. sentenceRange 必须是 JSON 对象，格式固定为 {"min": 数字, "max": 数字}；min 和 max 都只能是纯数字，不能带“句”“字”等单位，不能写成字符串。
5. 固定字段必须保持如下取值：avatar="/assets/image/user.png"、unreadCount=0、isAi=true、remark=""、language="普通话"、translateToChinese=false、chatMode="online"、maxContextMessages=30、memorySummaryThreshold=30、allowRichActions=true。
6. pinyin 必须参考导入样例填写为单个大写英文字母，例如 Y、L、G；不要写完整拼音，不要写带空格拼音。
7. region 可以写地区、主城、势力或世界内地点标签，必须是最终值，不能写说明文字。
8. wechatId 建议使用小写英文或拼音字母，可带数字，不要带空格和中文。
9. age 必须是字符串，可写纯数字年龄、年龄段或外观年龄，例如 "26"、"24-26"、"外观26"。
10. replyLimit、socialPostLimit 必须是数字，不要带单位，不要写成字符串；replyLimit 建议 120-150，socialPostLimit 建议 1-2。
11. 禁止输出与边界与禁区相冲突的行为倾向。

字段结构与数据类型参考下面示例。示例值只是演示格式，你必须改写成符合本次设定的最终内容，不能照抄示例值：
${buildUnusualJsonExample()}

用户需求：
${buildUnusualBrief(state)}

再次强调：最终回复只能是 JSON 本体，不能有任何其他文字。`;
}

export function buildPrompt(state, profile, jsonMode) {
  if (state.pageType === "unusual") {
    return jsonMode ? buildUnusualJsonPrompt(state, profile) : buildUnusualPlainPrompt(state, profile);
  }
  return jsonMode ? buildHumanJsonPrompt(state, profile) : buildHumanPlainPrompt(state, profile);
}
