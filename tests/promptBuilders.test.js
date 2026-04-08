import test from "node:test";
import assert from "node:assert/strict";
import { RICHNESS_PROFILES } from "../src/data/promptProfiles.js";
import { buildPrompt } from "../src/utils/promptBuilders.js";

function createState(overrides = {}) {
  return {
    pageType: "human",
    currentStep: 0,
    genderChoice: "男性",
    humanDirectionChoice: "恋爱陪伴",
    unusualDirectionChoice: "宿命纠缠",
    richnessLevel: "超丰满",
    coreConcept: "表面克制冷静，实际会很认真地接住情绪。",
    relationshipMode: "慢热陪伴",
    chatStyleMode: "自然说话",
    longTermPoint: "一起把琐碎日常过成值得期待的习惯。",
    riskNote: "他不擅长主动求助，容易把压力自己吞下去。",
    boundaryTags: ["不过度控制", "尊重拒绝"],
    roleTags: ["陪伴者"],
    traitTags: ["温柔", "稳定"],
    sceneTags: ["深夜谈心"],
    feelingTags: ["安全感"],
    styleTags: ["自然口语化"],
    worldTags: ["异能都市"],
    speciesTags: ["灵体"],
    identityTags: ["守夜人"],
    powerTags: ["精神链接"],
    unusualSceneTags: ["任务通讯"],
    unusualFeelingTags: ["危险里的偏爱"],
    unusualStyleTags: ["危险但可靠"],
    fixedName: "",
    ageRange: "24-28岁",
    extraPrompt: "",
    avoidPrompt: "",
    jsonMode: true,
    ...overrides
  };
}

function assertJsonPromptIsStrict(prompt) {
  const bannedSnippets = [
    '"personalityTraits": ["4-6 个短词"]',
    '"hobbies": ["3-5 个真实爱好"]',
    '"hobbies": ["3-5 个习惯或设定内行为"]',
    '"openingLine": "20-40字自然消息"',
    '"sentenceRange": "按风格填写，如 2-4句"',
    '"personalityTraits": ["温柔", "克制"',
    '"sentenceRange": "2-4句"',
    "请直接输出最终 JSON。",
    "已知条件："
  ];

  bannedSnippets.forEach((snippet) => {
    assert.equal(prompt.includes(snippet), false, `提示词仍包含问题示例：${snippet}`);
  });

  assert.match(prompt, /最终回复只能是 JSON 本体/);
  assert.match(prompt, /禁止输出任何 JSON 之外的内容/);
  assert.match(prompt, /不能写占位提示词/);
  assert.match(prompt, /sentenceRange 必须是 JSON 对象/);
  assert.match(prompt, /"sentenceRange": \{\s*"min": 2,\s*"max": 4\s*\}/);
  assert.match(prompt, /"personalityTraits": "/);
  assert.match(prompt, /"hobbies": "/);
  assert.match(prompt, /pinyin 必须参考导入样例填写为单个大写英文字母/);
  assert.match(prompt, /replyLimit 建议 120-150/);
  assert.match(prompt, /socialPostLimit 建议 1-2/);
  assert.match(prompt, /用户需求：/);
}

test("普通角色 JSON 提示词不再包含说明性占位值", () => {
  const prompt = buildPrompt(createState({ pageType: "human" }), RICHNESS_PROFILES["超丰满"], true);
  assertJsonPromptIsStrict(prompt);
});

test("非传统角色 JSON 提示词不再包含说明性占位值", () => {
  const prompt = buildPrompt(createState({ pageType: "unusual" }), RICHNESS_PROFILES["超丰满"], true);
  assertJsonPromptIsStrict(prompt);
});

test("空白文本需求不会被默认说明句污染", () => {
  const prompt = buildPrompt(
    createState({
      pageType: "human",
      coreConcept: "",
      longTermPoint: "",
      riskNote: "",
      fixedName: "",
      roleTags: [],
      traitTags: [],
      sceneTags: [],
      feelingTags: [],
      styleTags: []
    }),
    RICHNESS_PROFILES["超丰满"],
    true
  );

  const bannedHints = [
    "请先提炼一句能概括角色感觉",
    "请补上一两个",
    "请补清关系里的难点",
    "请你自行命名",
    "角色定位标签：请从",
    "核心特质标签：温柔、稳定、会接情绪、很有分寸",
    "请明确谁更主动",
    "请确保最终说话感觉稳定",
    "这些内容必须一直遵守"
  ];

  bannedHints.forEach((snippet) => {
    assert.equal(prompt.includes(snippet), false, `空白需求仍被默认提示污染：${snippet}`);
  });
});

test("普通文本提示词使用用户需求标题", () => {
  const prompt = buildPrompt(createState({ pageType: "human" }), RICHNESS_PROFILES["超丰满"], false);

  assert.match(prompt, /用户需求：/);
  assert.equal(prompt.includes("已知条件："), false);
});

test("普通文本模式空白输入不会出现默认说明句", () => {
  const prompt = buildPrompt(
    createState({
      pageType: "unusual",
      coreConcept: "",
      longTermPoint: "",
      riskNote: "",
      fixedName: "",
      worldTags: [],
      speciesTags: [],
      identityTags: [],
      powerTags: [],
      unusualSceneTags: [],
      unusualFeelingTags: [],
      unusualStyleTags: []
    }),
    RICHNESS_PROFILES["超丰满"],
    false
  );

  const bannedHints = [
    "请先提炼一句能概括角色感觉",
    "请补上一两个",
    "请补清能力代价",
    "请你自行命名",
    "世界观标签：请",
    "物种设定标签：请"
  ];

  bannedHints.forEach((snippet) => {
    assert.equal(prompt.includes(snippet), false, `普通文本模式仍被默认提示污染：${snippet}`);
  });
});
