export const PAGE_OPTIONS = [
  {
    value: "human",
    title: "普通人类角色",
    desc: "现实聊天里会出现的人类角色，重点是生活感、关系推进和长期陪伴。"
  },
  {
    value: "unusual",
    title: "非传统角色",
    desc: "用于非人、古代、玄幻、赛博朋克、架空等设定，重点是世界观完整、身份有反差。"
  }
];

export const GENDER_OPTIONS = ["男性", "女性"];
export const RICHNESS_OPTIONS = ["简洁", "标准", "丰满", "超丰满"];
export const RELATIONSHIP_MODE_OPTIONS = ["慢热陪伴", "稳定守护", "朋友慢慢靠近", "暧昧拉扯", "回应很快很偏爱", "克制但偏爱"];
export const CHAT_STYLE_MODE_OPTIONS = ["自然说话", "温柔安慰", "成熟稳定", "主动热聊", "轻松幽默", "克制留白"];
export const BOUNDARY_TAG_OPTIONS = ["不说教", "不过度控制", "不病娇", "不冷暴力", "不高压试探", "不贬低打击", "不越界亲密", "不油腻撩拨", "不训斥命令", "不情绪勒索", "尊重拒绝", "尊重隐私", "不过度黏人"];

export const HUMAN_DIRECTIONS = ["恋爱陪伴", "暧昧拉扯", "朋友陪伴", "知己聊天", "治愈守护"];
export const UNUSUAL_DIRECTIONS = ["宿命纠缠", "禁忌同行", "高危守护", "师徒拉扯", "敌对转暧昧"];

export const HUMAN_TAG_GROUPS = [
  {
    key: "roleTags",
    title: "角色身份",
    fallback: "请从陪伴感、守护感、知己感中自行平衡设计",
    options: ["恋爱对象", "暧昧对象", "知己", "军师", "守护者", "陪伴者", "共谋者", "倾听者", "事业型", "治愈型", "清醒系", "强者型", "文艺感", "热闹感", "反差感", "分寸感", "年上照顾型", "同频搭子", "口是心非型", "可靠后盾型", "冷淡外热内型", "慢热陪伴型", "成熟引导型", "嘴硬心软型"]
  },
  {
    key: "traitTags",
    title: "性格特点",
    fallback: "温柔、稳定、会接情绪、很有分寸",
    options: ["温柔", "细腻", "会接情绪", "很能理解人", "很有分寸", "会夸人", "稳定", "轻微毒舌", "行动力强", "有生活感", "直球", "神秘", "幽默", "耐心", "克制", "保护欲强", "清醒理智", "嘴硬心软", "轻微占有欲", "迟钝但认真", "不紧绷", "有少年感", "有成熟感", "擅长倾听"]
  },
  {
    key: "sceneTags",
    title: "聊天场景",
    fallback: "日常陪伴、深夜谈心、低落安慰",
    options: ["深夜谈心", "日常碎碎念", "学业压力", "社交内耗", "恋爱烦恼", "成长焦虑", "夸夸鼓励", "低落安慰", "行动督促", "轻松热闹", "早安晚安", "吃饭监督", "生病照顾", "通勤陪聊", "失眠陪伴", "考试复盘", "职场吐槽", "周末宅家", "一起追剧", "旅行闲聊", "节日仪式感", "吵架后和好", "情绪崩溃接住", "分享欲很强的日常"]
  },
  {
    key: "feelingTags",
    title: "你想要的感觉",
    fallback: "安全感、被理解、适合长期聊天",
    options: ["安全感", "被理解", "被偏爱", "被撑腰", "被鼓励", "被温柔接住", "有边界但不冷淡", "适合长期聊天", "被认真记住", "被稳定回应", "被默默照顾", "被真诚尊重", "有心动感", "有熟人感", "有归属感", "有被惦记的感觉"]
  },
  {
    key: "styleTags",
    title: "补充感觉",
    fallback: "",
    options: ["真实生活感", "轻微反差", "高频互动", "慢热升温", "克制偏爱", "很会安慰人", "有点文艺", "朋友感更强", "有恋爱拉扯", "会主动开话题", "自然口语化", "带一点幽默", "成熟克制", "暧昧拉扯感", "回应很及时", "像真人微信聊天", "细水长流", "偏日常", "会记细节", "轻微醋意", "松弛不端着", "说话有画面"]
  }
];

export const UNUSUAL_TAG_GROUPS = [
  {
    key: "worldTags",
    title: "世界观",
    fallback: "古代、玄幻、赛博朋克、架空都市中任选并自洽融合",
    options: ["古代", "仙侠", "玄幻", "修真", "架空王朝", "江湖", "宫廷权谋", "末世废土", "赛博朋克", "星际航行", "未来都市", "蒸汽朋克", "克苏鲁边缘", "架空学院", "神话复苏", "异能都市", "悬疑志怪", "时间循环", "平行世界", "高塔试炼"]
  },
  {
    key: "speciesTags",
    title: "物种身份",
    fallback: "可从妖族、机械体、神性存在、异种生命中自行补齐",
    options: ["妖族", "狐妖", "龙族", "凤凰", "鲛人", "吸血鬼", "狼人", "精灵", "恶魔", "天使", "神明", "半机械人", "仿生人", "AI意识体", "实验体", "哨兵", "向导", "异种", "灵体", "不死人", "傀儡师造物", "虫族高阶体", "星际外来种"]
  },
  {
    key: "identityTags",
    title: "身份立场",
    fallback: "请补齐一个有冲突感的身份和立场",
    options: ["冷宫旧臣", "王侯世子", "仙门师尊", "魔域君主", "宗门天才", "赏金猎人", "雇佣兵", "黑客", "公司高层", "地下医生", "机械师", "档案管理员", "星舰舰长", "流亡王族", "禁术研究者", "异管局成员", "神殿执灯者", "图书馆守密人", "审判官", "守夜人", "荒野领主", "实验室观察体"]
  },
  {
    key: "powerTags",
    title: "能力特点",
    fallback: "请设计有表现力且有代价或限制的能力",
    options: ["读心", "预知", "精神链接", "高速自愈", "拟态伪装", "操控火焰", "控水", "梦境入侵", "机械义体强化", "数据入侵", "召唤契灵", "时间回溯片段", "空间折叠", "治愈术", "结界", "共感反噬", "寿命代价", "禁术后遗症", "失控风险", "双重人格封印", "记忆缺失", "血契绑定"]
  },
  {
    key: "unusualSceneTags",
    title: "互动场景",
    fallback: "危机共处、任务通讯、秘密共谋、夜晚陪伴",
    options: ["夜巡归来", "密室共谋", "并肩作战", "疗伤包扎", "任务通讯", "宫墙密谈", "灯下抄卷", "秘境探路", "星舰值夜", "赛博街区潜行", "精神海共振", "危机撤离", "血月失控", "雨夜躲藏", "身份暴露后对峙", "世界崩塌前陪伴", "异能训练", "禁区散步", "祭典夜晚", "破案追踪"]
  },
  {
    key: "unusualFeelingTags",
    title: "你想要的感觉",
    fallback: "危险里的偏爱、异世界归属感、命运纠缠感",
    options: ["危险里的偏爱", "命中注定感", "被特别选择", "被守护但不失自由", "陌生世界里的依靠", "心动与敬畏并存", "克制又上头", "克制拉扯感", "并肩活下去的信任", "被非人存在认真对待", "强烈陪伴感", "秘密共担感", "命运绑在一起", "浪漫又悬疑", "疏离感下的温柔", "异世界归属感"]
  },
  {
    key: "unusualStyleTags",
    title: "补充感觉",
    fallback: "",
    options: ["不像普通人", "古风说话感", "赛博冷感", "危险里的浪漫", "命运拉扯", "克制压着情绪", "权力斗争感", "神性与人性并存", "危险但可靠", "背景信息很多", "夜晚氛围重", "说话压迫感强", "仪式感强", "诡异温柔", "高智商过招", "有点疯", "冷艳感", "末世残酷感", "未来科技感", "像传说里的人"]
  }
];

export const HUMAN_FLOW_ORDER = [
  "humanDirectionChoice",
  "relationshipMode",
  "chatStyleMode",
  "roleTags",
  "traitTags",
  "sceneTags",
  "feelingTags",
  "styleTags"
];

export const UNUSUAL_FLOW_ORDER = [
  "unusualDirectionChoice",
  "relationshipMode",
  "chatStyleMode",
  "worldTags",
  "speciesTags",
  "identityTags",
  "powerTags",
  "unusualSceneTags",
  "unusualFeelingTags",
  "unusualStyleTags"
];

export const HUMAN_CONTEXT_RULES = {
  humanDirectionChoice: {
    恋爱陪伴: {
      relationshipMode: ["慢热陪伴", "稳定守护", "回应很快很偏爱"],
      chatStyleMode: ["自然说话", "温柔安慰", "成熟稳定"],
      roleTags: ["恋爱对象", "守护者", "陪伴者", "年上照顾型", "可靠后盾型", "慢热陪伴型"],
      traitTags: ["温柔", "稳定", "很能理解人", "保护欲强", "有生活感", "擅长倾听"],
      sceneTags: ["早安晚安", "失眠陪伴", "低落安慰", "日常碎碎念", "生病照顾", "吃饭监督"],
      feelingTags: ["安全感", "被偏爱", "被默默照顾", "被稳定回应", "有归属感"],
      styleTags: ["细水长流", "像真人微信聊天", "很会安慰人", "会记细节", "偏日常"]
    },
    暧昧拉扯: {
      relationshipMode: ["暧昧拉扯", "克制但偏爱", "朋友慢慢靠近"],
      chatStyleMode: ["克制留白", "自然说话", "轻松幽默"],
      roleTags: ["暧昧对象", "口是心非型", "冷淡外热内型", "嘴硬心软型"],
      traitTags: ["克制", "嘴硬心软", "神秘", "轻微毒舌", "直球"],
      sceneTags: ["深夜谈心", "吵架后和好", "通勤陪聊", "分享欲很强的日常"],
      feelingTags: ["有心动感", "被惦记的感觉", "有熟人感", "被认真记住"],
      styleTags: ["暧昧拉扯感", "轻微反差", "轻微醋意", "说话有画面", "会记细节"]
    },
    朋友陪伴: {
      relationshipMode: ["朋友慢慢靠近", "慢热陪伴"],
      chatStyleMode: ["自然说话", "轻松幽默", "主动热聊"],
      roleTags: ["知己", "陪伴者", "同频搭子", "倾听者"],
      traitTags: ["幽默", "有生活感", "耐心", "擅长倾听"],
      sceneTags: ["日常碎碎念", "一起追剧", "旅行闲聊", "周末宅家"],
      feelingTags: ["被理解", "有熟人感", "适合长期聊天"],
      styleTags: ["朋友感更强", "高频互动", "偏日常", "带一点幽默"]
    },
    知己聊天: {
      relationshipMode: ["朋友慢慢靠近", "慢热陪伴"],
      chatStyleMode: ["成熟稳定", "自然说话", "温柔安慰"],
      roleTags: ["知己", "军师", "倾听者", "清醒系"],
      traitTags: ["清醒理智", "很能理解人", "擅长倾听", "耐心"],
      sceneTags: ["成长焦虑", "恋爱烦恼", "职场吐槽", "考试复盘", "社交内耗"],
      feelingTags: ["被理解", "被撑腰", "被鼓励", "被真诚尊重"],
      styleTags: ["会主动开话题", "很会安慰人", "像真人微信聊天", "细水长流"]
    },
    治愈守护: {
      relationshipMode: ["稳定守护", "慢热陪伴"],
      chatStyleMode: ["温柔安慰", "成熟稳定", "自然说话"],
      roleTags: ["守护者", "治愈型", "陪伴者", "可靠后盾型"],
      traitTags: ["温柔", "稳定", "保护欲强", "很有分寸"],
      sceneTags: ["低落安慰", "失眠陪伴", "生病照顾", "情绪崩溃接住"],
      feelingTags: ["安全感", "被温柔接住", "被默默照顾", "被稳定回应"],
      styleTags: ["很会安慰人", "细水长流", "成熟克制", "像真人微信聊天"]
    }
  },
  relationshipMode: {
    慢热陪伴: {
      traitTags: ["耐心", "稳定", "很有分寸"],
      sceneTags: ["日常碎碎念", "早安晚安", "失眠陪伴"],
      feelingTags: ["有熟人感", "被稳定回应"],
      styleTags: ["慢热升温", "细水长流", "会记细节"]
    },
    稳定守护: {
      traitTags: ["温柔", "保护欲强", "稳定"],
      sceneTags: ["生病照顾", "低落安慰", "吃饭监督"],
      feelingTags: ["安全感", "被默默照顾", "被撑腰"],
      styleTags: ["成熟克制", "很会安慰人", "像真人微信聊天"]
    },
    朋友慢慢靠近: {
      traitTags: ["幽默", "耐心", "有生活感"],
      sceneTags: ["日常碎碎念", "一起追剧", "旅行闲聊"],
      feelingTags: ["有熟人感", "被理解", "适合长期聊天"],
      styleTags: ["朋友感更强", "高频互动", "偏日常"]
    },
    暧昧拉扯: {
      traitTags: ["克制", "嘴硬心软", "神秘"],
      sceneTags: ["深夜谈心", "吵架后和好", "通勤陪聊"],
      feelingTags: ["有心动感", "被惦记的感觉", "被认真记住"],
      styleTags: ["暧昧拉扯感", "轻微反差", "轻微醋意"]
    },
    回应很快很偏爱: {
      traitTags: ["温柔", "行动力强", "会夸人"],
      sceneTags: ["早安晚安", "日常碎碎念", "分享欲很强的日常"],
      feelingTags: ["被偏爱", "被认真记住", "被稳定回应"],
      styleTags: ["高频互动", "回应很及时", "会记细节"]
    },
    克制但偏爱: {
      traitTags: ["克制", "嘴硬心软", "清醒理智"],
      sceneTags: ["深夜谈心", "吵架后和好", "失眠陪伴"],
      feelingTags: ["有心动感", "被惦记的感觉", "被真诚尊重"],
      styleTags: ["成熟克制", "暧昧拉扯感", "说话有画面"]
    }
  },
  chatStyleMode: {
    自然说话: {
      traitTags: ["有生活感", "擅长倾听", "耐心"],
      sceneTags: ["日常碎碎念", "通勤陪聊", "一起追剧"],
      styleTags: ["像真人微信聊天", "偏日常", "细水长流"]
    },
    温柔安慰: {
      traitTags: ["温柔", "很能理解人", "耐心"],
      sceneTags: ["低落安慰", "失眠陪伴", "情绪崩溃接住"],
      feelingTags: ["被温柔接住", "安全感", "被理解"],
      styleTags: ["很会安慰人", "细水长流", "成熟克制"]
    },
    成熟稳定: {
      traitTags: ["稳定", "清醒理智", "很有分寸"],
      sceneTags: ["职场吐槽", "成长焦虑", "恋爱烦恼"],
      feelingTags: ["被撑腰", "被真诚尊重", "被稳定回应"],
      styleTags: ["成熟克制", "像真人微信聊天", "会记细节"]
    },
    主动热聊: {
      traitTags: ["幽默", "行动力强", "会夸人"],
      sceneTags: ["日常碎碎念", "分享欲很强的日常", "早安晚安"],
      feelingTags: ["被认真记住", "适合长期聊天", "有归属感"],
      styleTags: ["高频互动", "会主动开话题", "回应很及时"]
    },
    轻松幽默: {
      traitTags: ["幽默", "轻微毒舌", "有生活感"],
      sceneTags: ["轻松热闹", "一起追剧", "周末宅家"],
      feelingTags: ["有熟人感", "被理解", "适合长期聊天"],
      styleTags: ["带一点幽默", "朋友感更强", "偏日常"]
    },
    克制留白: {
      traitTags: ["克制", "神秘", "嘴硬心软"],
      sceneTags: ["深夜谈心", "吵架后和好", "通勤陪聊"],
      feelingTags: ["有心动感", "被惦记的感觉", "被认真记住"],
      styleTags: ["暧昧拉扯感", "轻微反差", "说话有画面"]
    }
  },
  roleTags: {
    守护者: {
      traitTags: ["保护欲强", "稳定", "温柔"],
      sceneTags: ["生病照顾", "低落安慰", "失眠陪伴"],
      feelingTags: ["安全感", "被默默照顾", "被撑腰"]
    },
    知己: {
      traitTags: ["清醒理智", "很能理解人", "擅长倾听"],
      sceneTags: ["成长焦虑", "恋爱烦恼", "职场吐槽"],
      feelingTags: ["被理解", "被真诚尊重", "被鼓励"]
    },
    军师: {
      traitTags: ["清醒理智", "行动力强", "很有分寸"],
      sceneTags: ["考试复盘", "职场吐槽", "行动督促"],
      feelingTags: ["被撑腰", "被鼓励", "被理解"]
    },
    暧昧对象: {
      traitTags: ["嘴硬心软", "克制", "神秘"],
      sceneTags: ["深夜谈心", "吵架后和好", "通勤陪聊"],
      feelingTags: ["有心动感", "被惦记的感觉", "被认真记住"]
    },
    年上照顾型: {
      traitTags: ["有成熟感", "稳定", "很有分寸"],
      sceneTags: ["吃饭监督", "生病照顾", "低落安慰"],
      feelingTags: ["安全感", "被默默照顾", "被真诚尊重"]
    },
    嘴硬心软型: {
      traitTags: ["嘴硬心软", "轻微毒舌", "克制"],
      sceneTags: ["吵架后和好", "深夜谈心", "通勤陪聊"],
      feelingTags: ["有心动感", "被惦记的感觉", "被认真记住"]
    }
  }
};

export const UNUSUAL_CONTEXT_RULES = {
  unusualDirectionChoice: {
    宿命纠缠: {
      relationshipMode: ["克制但偏爱", "暧昧拉扯"],
      chatStyleMode: ["克制留白", "成熟稳定"],
      unusualSceneTags: ["夜巡归来", "世界崩塌前陪伴", "秘境探路"],
      unusualFeelingTags: ["命中注定感", "命运绑在一起", "心动与敬畏并存"],
      unusualStyleTags: ["命运拉扯", "像传说里的人", "诡异温柔"]
    },
    禁忌同行: {
      relationshipMode: ["克制但偏爱", "暧昧拉扯"],
      chatStyleMode: ["克制留白", "自然说话"],
      unusualSceneTags: ["密室共谋", "禁区散步", "身份暴露后对峙"],
      unusualFeelingTags: ["秘密共担感", "克制拉扯感", "浪漫又悬疑"],
      unusualStyleTags: ["危险里的浪漫", "权力斗争感", "夜晚氛围重"]
    },
    高危守护: {
      relationshipMode: ["稳定守护", "克制但偏爱"],
      chatStyleMode: ["成熟稳定", "温柔安慰"],
      unusualSceneTags: ["危机撤离", "疗伤包扎", "夜巡归来"],
      unusualFeelingTags: ["危险里的偏爱", "被守护但不失自由", "强烈陪伴感"],
      unusualStyleTags: ["危险但可靠", "夜晚氛围重", "危险里的浪漫"]
    },
    师徒拉扯: {
      relationshipMode: ["克制但偏爱", "慢热陪伴"],
      chatStyleMode: ["成熟稳定", "克制留白"],
      unusualSceneTags: ["灯下抄卷", "异能训练", "秘境探路"],
      unusualFeelingTags: ["心动与敬畏并存", "克制拉扯感", "被特别选择"],
      unusualStyleTags: ["古风说话感", "克制压着情绪", "像传说里的人"]
    },
    敌对转暧昧: {
      relationshipMode: ["暧昧拉扯", "克制但偏爱"],
      chatStyleMode: ["克制留白", "轻松幽默"],
      unusualSceneTags: ["身份暴露后对峙", "并肩作战", "危机撤离"],
      unusualFeelingTags: ["克制拉扯感", "危险里的偏爱", "浪漫又悬疑"],
      unusualStyleTags: ["危险里的浪漫", "说话压迫感强", "高智商过招"]
    }
  },
  relationshipMode: {
    慢热陪伴: {
      unusualSceneTags: ["夜巡归来", "灯下抄卷", "祭典夜晚"],
      unusualFeelingTags: ["强烈陪伴感", "异世界归属感"],
      unusualStyleTags: ["夜晚氛围重", "古风说话感"]
    },
    稳定守护: {
      unusualSceneTags: ["疗伤包扎", "危机撤离", "夜巡归来"],
      unusualFeelingTags: ["危险里的偏爱", "被守护但不失自由", "强烈陪伴感"],
      unusualStyleTags: ["危险但可靠", "夜晚氛围重", "成熟稳定"]
    },
    朋友慢慢靠近: {
      unusualSceneTags: ["任务通讯", "祭典夜晚", "禁区散步"],
      unusualFeelingTags: ["异世界归属感", "强烈陪伴感", "被特别选择"],
      unusualStyleTags: ["古风说话感", "未来科技感", "夜晚氛围重"]
    },
    暧昧拉扯: {
      unusualSceneTags: ["密室共谋", "身份暴露后对峙", "并肩作战"],
      unusualFeelingTags: ["克制拉扯感", "浪漫又悬疑", "危险里的偏爱"],
      unusualStyleTags: ["危险里的浪漫", "说话压迫感强", "高智商过招"]
    },
    回应很快很偏爱: {
      unusualSceneTags: ["任务通讯", "夜巡归来", "世界崩塌前陪伴"],
      unusualFeelingTags: ["被特别选择", "强烈陪伴感", "被守护但不失自由"],
      unusualStyleTags: ["危险但可靠", "未来科技感", "夜晚氛围重"]
    },
    克制但偏爱: {
      unusualSceneTags: ["密室共谋", "灯下抄卷", "身份暴露后对峙"],
      unusualFeelingTags: ["克制拉扯感", "心动与敬畏并存", "浪漫又悬疑"],
      unusualStyleTags: ["克制压着情绪", "诡异温柔", "命运拉扯"]
    }
  },
  chatStyleMode: {
    自然说话: {
      unusualSceneTags: ["任务通讯", "禁区散步", "世界崩塌前陪伴"],
      unusualStyleTags: ["未来科技感", "危险但可靠", "夜晚氛围重"]
    },
    温柔安慰: {
      unusualSceneTags: ["疗伤包扎", "夜巡归来", "世界崩塌前陪伴"],
      unusualFeelingTags: ["强烈陪伴感", "被守护但不失自由", "异世界归属感"],
      unusualStyleTags: ["诡异温柔", "危险但可靠", "夜晚氛围重"]
    },
    成熟稳定: {
      unusualSceneTags: ["灯下抄卷", "任务通讯", "并肩作战"],
      unusualFeelingTags: ["心动与敬畏并存", "被特别选择", "强烈陪伴感"],
      unusualStyleTags: ["高智商过招", "古风说话感", "未来科技感"]
    },
    主动热聊: {
      unusualSceneTags: ["任务通讯", "祭典夜晚", "世界崩塌前陪伴"],
      unusualFeelingTags: ["强烈陪伴感", "被特别选择", "异世界归属感"],
      unusualStyleTags: ["未来科技感", "危险但可靠", "夜晚氛围重"]
    },
    轻松幽默: {
      unusualSceneTags: ["禁区散步", "祭典夜晚", "并肩作战"],
      unusualFeelingTags: ["异世界归属感", "强烈陪伴感", "被特别选择"],
      unusualStyleTags: ["危险里的浪漫", "未来科技感", "有点疯"]
    },
    克制留白: {
      unusualSceneTags: ["身份暴露后对峙", "密室共谋", "灯下抄卷"],
      unusualFeelingTags: ["克制拉扯感", "心动与敬畏并存", "浪漫又悬疑"],
      unusualStyleTags: ["克制压着情绪", "诡异温柔", "命运拉扯"]
    }
  },
  speciesTags: {
    龙族: {
      worldTags: ["仙侠", "玄幻"],
      identityTags: ["仙门师尊", "荒野领主"],
      unusualFeelingTags: ["命中注定感", "心动与敬畏并存"],
      unusualStyleTags: ["像传说里的人", "命运拉扯"]
    },
    狐妖: {
      worldTags: ["仙侠", "玄幻"],
      unusualSceneTags: ["祭典夜晚", "禁区散步"],
      unusualFeelingTags: ["克制拉扯感", "命中注定感"],
      unusualStyleTags: ["诡异温柔", "像传说里的人"]
    },
    凤凰: {
      worldTags: ["仙侠", "玄幻"],
      unusualSceneTags: ["夜巡归来", "世界崩塌前陪伴"],
      unusualFeelingTags: ["被特别选择", "心动与敬畏并存"],
      unusualStyleTags: ["像传说里的人", "命运拉扯"]
    },
    仿生人: {
      worldTags: ["赛博朋克", "星际航行"],
      identityTags: ["机械师", "档案管理员"],
      unusualFeelingTags: ["被非人存在认真对待", "强烈陪伴感"],
      unusualStyleTags: ["未来科技感", "赛博冷感"]
    },
    半机械人: {
      worldTags: ["赛博朋克", "星际航行"],
      powerTags: ["机械义体强化", "数据入侵"],
      unusualFeelingTags: ["危险里的偏爱", "强烈陪伴感"],
      unusualStyleTags: ["赛博冷感", "未来科技感"]
    },
    神明: {
      worldTags: ["仙侠", "玄幻", "神话复苏"],
      identityTags: ["神殿执灯者", "审判官"],
      unusualFeelingTags: ["心动与敬畏并存", "被特别选择"],
      unusualStyleTags: ["神性与人性并存", "像传说里的人"]
    }
  },
  identityTags: {
    黑客: {
      worldTags: ["赛博朋克"],
      powerTags: ["数据入侵", "精神链接"],
      unusualSceneTags: ["任务通讯", "赛博街区潜行"],
      unusualStyleTags: ["赛博冷感", "未来科技感"]
    },
    机械师: {
      worldTags: ["赛博朋克", "星际航行"],
      powerTags: ["机械义体强化", "拟态伪装"],
      unusualSceneTags: ["任务通讯", "危机撤离"],
      unusualStyleTags: ["赛博冷感", "未来科技感"]
    },
    王侯世子: {
      worldTags: ["古代", "宫廷权谋"],
      unusualSceneTags: ["宫墙密谈", "祭典夜晚"],
      unusualFeelingTags: ["心动与敬畏并存", "克制拉扯感"],
      unusualStyleTags: ["古风说话感", "权力斗争感"]
    },
    冷宫旧臣: {
      worldTags: ["古代", "宫廷权谋"],
      unusualSceneTags: ["宫墙密谈", "灯下抄卷"],
      unusualFeelingTags: ["浪漫又悬疑", "克制拉扯感"],
      unusualStyleTags: ["古风说话感", "权力斗争感"]
    },
    仙门师尊: {
      worldTags: ["仙侠"],
      unusualSceneTags: ["异能训练", "秘境探路"],
      unusualFeelingTags: ["心动与敬畏并存", "被特别选择"],
      unusualStyleTags: ["像传说里的人", "克制压着情绪"]
    },
    星舰舰长: {
      worldTags: ["星际航行"],
      unusualSceneTags: ["星舰值夜", "任务通讯"],
      unusualFeelingTags: ["强烈陪伴感", "异世界归属感"],
      unusualStyleTags: ["未来科技感", "危险但可靠"]
    }
  },
  powerTags: {
    数据入侵: {
      worldTags: ["赛博朋克"],
      identityTags: ["黑客", "机械师"],
      unusualSceneTags: ["赛博街区潜行", "任务通讯"],
      unusualStyleTags: ["赛博冷感", "未来科技感"]
    },
    机械义体强化: {
      worldTags: ["赛博朋克", "星际航行"],
      identityTags: ["机械师", "雇佣兵"],
      unusualFeelingTags: ["危险里的偏爱", "强烈陪伴感"],
      unusualStyleTags: ["赛博冷感", "危险但可靠"]
    },
    召唤契灵: {
      worldTags: ["仙侠", "玄幻"],
      unusualSceneTags: ["秘境探路", "异能训练"],
      unusualStyleTags: ["像传说里的人", "命运拉扯"]
    },
    结界: {
      worldTags: ["仙侠", "玄幻"],
      unusualSceneTags: ["夜巡归来", "秘境探路"],
      unusualFeelingTags: ["被守护但不失自由", "心动与敬畏并存"],
      unusualStyleTags: ["神性与人性并存", "像传说里的人"]
    },
    共感反噬: {
      worldTags: ["玄幻", "末世废土"],
      unusualFeelingTags: ["危险里的偏爱", "浪漫又悬疑"],
      unusualStyleTags: ["诡异温柔", "危险里的浪漫"]
    },
    失控风险: {
      worldTags: ["玄幻", "末世废土"],
      unusualSceneTags: ["血月失控", "危机撤离"],
      unusualFeelingTags: ["危险里的偏爱", "克制拉扯感"],
      unusualStyleTags: ["危险里的浪漫", "夜晚氛围重"]
    }
  }
};

export const HUMAN_REALNESS_OPTIONS = {
  roleTags: ["口是心非型", "冷淡外热内型", "嘴硬心软型"],
  traitTags: ["轻微毒舌", "克制", "嘴硬心软", "轻微占有欲", "迟钝但认真", "不紧绷"],
  sceneTags: ["成长焦虑", "恋爱烦恼", "职场吐槽", "吵架后和好"],
  feelingTags: ["有边界但不冷淡", "被真诚尊重", "有熟人感"],
  styleTags: ["轻微反差", "慢热升温", "成熟克制", "轻微醋意", "暧昧拉扯感"]
};

export const UNUSUAL_REALNESS_OPTIONS = {
  identityTags: ["流亡王族", "冷宫旧臣", "实验室观察体", "禁术研究者"],
  powerTags: ["共感反噬", "寿命代价", "禁术后遗症", "失控风险", "记忆缺失"],
  unusualSceneTags: ["身份暴露后对峙", "危机撤离", "血月失控", "世界崩塌前陪伴"],
  unusualFeelingTags: ["克制拉扯感", "浪漫又悬疑", "危险里的偏爱"],
  unusualStyleTags: ["诡异温柔", "有点疯", "克制压着情绪", "说话压迫感强"]
};

export const HUMAN_REALNESS_CHECKS = [
  {
    id: "human_flaw",
    title: "人物自己的小毛病",
    tagKeys: ["roleTags", "traitTags", "styleTags"],
    options: ["口是心非型", "冷淡外热内型", "嘴硬心软型", "轻微毒舌", "克制", "嘴硬心软", "轻微占有欲", "迟钝但认真", "不紧绷", "轻微反差", "成熟克制"],
    message: "可以补一点嘴硬、迟钝、轻微毒舌、反差感这类小毛病，角色会更像真人。"
  },
  {
    id: "human_relation_friction",
    title: "关系里的阻力",
    tagKeys: ["sceneTags", "styleTags"],
    textKeys: ["riskNote"],
    options: ["吵架后和好", "恋爱烦恼", "暧昧拉扯感", "轻微醋意", "慢热升温"],
    message: "可以补一点关系里的阻力，比如误会、嘴硬、节奏不一致，或者现实里不那么顺。"
  },
  {
    id: "human_daily_pressure",
    title: "现实里的压力",
    tagKeys: ["sceneTags"],
    options: ["学业压力", "社交内耗", "成长焦虑", "职场吐槽", "恋爱烦恼"],
    message: "可以补一点现实压力或生活牵扯，这样角色不容易显得过于悬空。"
  }
];

export const UNUSUAL_REALNESS_CHECKS = [
  {
    id: "unusual_cost",
    title: "能力代价和后果",
    tagKeys: ["powerTags"],
    textKeys: ["riskNote"],
    options: ["共感反噬", "寿命代价", "禁术后遗症", "失控风险", "记忆缺失"],
    message: "可以补一点能力代价、后遗症或失控后果，别让角色只有强没有代价。"
  },
  {
    id: "unusual_burden",
    title: "身份上的包袱",
    tagKeys: ["identityTags"],
    options: ["流亡王族", "冷宫旧臣", "实验室观察体", "禁术研究者", "守夜人", "审判官"],
    message: "可以补一点身份上的负担、旧伤或立场压力，角色会更立得住。"
  },
  {
    id: "unusual_unstable",
    title: "危险或失控时刻",
    tagKeys: ["unusualSceneTags", "unusualStyleTags", "unusualFeelingTags"],
    options: ["身份暴露后对峙", "危机撤离", "血月失控", "世界崩塌前陪伴", "诡异温柔", "有点疯", "说话压迫感强", "浪漫又悬疑", "危险里的偏爱"],
    message: "可以补一点危险时刻、失控边缘或不稳定感，非传统角色会更有真实压力。"
  }
];

export const HUMAN_SMART_PROFILES = [
  {
    id: "human_guardian_romance",
    picks: {
      humanDirectionChoice: ["恋爱陪伴", "治愈守护"],
      relationshipMode: ["慢热陪伴", "稳定守护"],
      chatStyleMode: ["自然说话", "温柔安慰", "成熟稳定"],
      roleTags: ["恋爱对象", "守护者", "陪伴者", "可靠后盾型", "年上照顾型"],
      traitTags: ["温柔", "稳定", "保护欲强", "很能理解人", "擅长倾听"],
      sceneTags: ["早安晚安", "低落安慰", "失眠陪伴", "生病照顾", "吃饭监督"],
      feelingTags: ["安全感", "被偏爱", "被温柔接住", "被默默照顾", "有归属感"],
      styleTags: ["细水长流", "很会安慰人", "像真人微信聊天", "会记细节", "偏日常"]
    }
  },
  {
    id: "human_ambiguous_pull",
    picks: {
      humanDirectionChoice: ["暧昧拉扯"],
      relationshipMode: ["暧昧拉扯", "克制但偏爱"],
      chatStyleMode: ["克制留白", "自然说话", "轻松幽默"],
      roleTags: ["暧昧对象", "口是心非型", "冷淡外热内型", "嘴硬心软型"],
      traitTags: ["克制", "嘴硬心软", "神秘", "轻微毒舌", "轻微占有欲"],
      sceneTags: ["深夜谈心", "吵架后和好", "通勤陪聊", "分享欲很强的日常"],
      feelingTags: ["有心动感", "被惦记的感觉", "被认真记住", "有熟人感"],
      styleTags: ["暧昧拉扯感", "轻微反差", "轻微醋意", "说话有画面", "慢热升温"]
    }
  },
  {
    id: "human_close_friend",
    picks: {
      humanDirectionChoice: ["朋友陪伴", "知己聊天"],
      relationshipMode: ["朋友慢慢靠近", "慢热陪伴"],
      chatStyleMode: ["自然说话", "轻松幽默", "主动热聊"],
      roleTags: ["知己", "军师", "倾听者", "同频搭子"],
      traitTags: ["幽默", "耐心", "有生活感", "擅长倾听", "清醒理智"],
      sceneTags: ["日常碎碎念", "一起追剧", "旅行闲聊", "职场吐槽", "成长焦虑"],
      feelingTags: ["被理解", "有熟人感", "适合长期聊天", "被鼓励", "被真诚尊重"],
      styleTags: ["朋友感更强", "高频互动", "带一点幽默", "偏日常", "会主动开话题"]
    }
  },
  {
    id: "human_gentle_support",
    picks: {
      humanDirectionChoice: ["治愈守护", "知己聊天"],
      relationshipMode: ["稳定守护", "慢热陪伴"],
      chatStyleMode: ["温柔安慰", "成熟稳定"],
      roleTags: ["治愈型", "守护者", "倾听者", "可靠后盾型"],
      traitTags: ["温柔", "稳定", "很有分寸", "很能理解人", "耐心"],
      sceneTags: ["低落安慰", "情绪崩溃接住", "失眠陪伴", "生病照顾", "成长焦虑"],
      feelingTags: ["被温柔接住", "安全感", "被理解", "被撑腰", "被稳定回应"],
      styleTags: ["很会安慰人", "成熟克制", "细水长流", "像真人微信聊天"]
    }
  },
  {
    id: "human_real_life_pressure",
    picks: {
      humanDirectionChoice: ["朋友陪伴", "知己聊天", "暧昧拉扯"],
      relationshipMode: ["朋友慢慢靠近", "克制但偏爱", "暧昧拉扯"],
      chatStyleMode: ["自然说话", "成熟稳定", "克制留白"],
      roleTags: ["知己", "嘴硬心软型", "冷淡外热内型"],
      traitTags: ["轻微毒舌", "克制", "迟钝但认真", "不紧绷"],
      sceneTags: ["学业压力", "社交内耗", "职场吐槽", "恋爱烦恼", "吵架后和好"],
      feelingTags: ["有边界但不冷淡", "被真诚尊重", "有熟人感"],
      styleTags: ["轻微反差", "成熟克制", "慢热升温", "暧昧拉扯感"]
    }
  }
];

export const UNUSUAL_SMART_PROFILES = [
  {
    id: "unusual_cyber_guard",
    picks: {
      unusualDirectionChoice: ["高危守护", "禁忌同行"],
      relationshipMode: ["稳定守护", "克制但偏爱"],
      chatStyleMode: ["成熟稳定", "自然说话"],
      worldTags: ["赛博朋克", "未来都市", "星际航行"],
      speciesTags: ["仿生人", "半机械人", "AI意识体"],
      identityTags: ["黑客", "机械师", "地下医生", "星舰舰长"],
      powerTags: ["数据入侵", "机械义体强化", "精神链接", "记忆缺失"],
      unusualSceneTags: ["任务通讯", "赛博街区潜行", "危机撤离", "星舰值夜"],
      unusualFeelingTags: ["危险里的偏爱", "秘密共担感", "强烈陪伴感", "被守护但不失自由"],
      unusualStyleTags: ["赛博冷感", "未来科技感", "危险但可靠", "高智商过招"]
    }
  },
  {
    id: "unusual_ancient_power",
    picks: {
      unusualDirectionChoice: ["师徒拉扯", "宿命纠缠"],
      relationshipMode: ["克制但偏爱", "慢热陪伴"],
      chatStyleMode: ["成熟稳定", "克制留白"],
      worldTags: ["古代", "宫廷权谋", "架空王朝"],
      speciesTags: ["神明", "灵体"],
      identityTags: ["王侯世子", "冷宫旧臣", "审判官", "守夜人"],
      powerTags: ["预知", "结界", "时间回溯片段"],
      unusualSceneTags: ["宫墙密谈", "灯下抄卷", "祭典夜晚", "身份暴露后对峙"],
      unusualFeelingTags: ["心动与敬畏并存", "克制拉扯感", "浪漫又悬疑"],
      unusualStyleTags: ["古风说话感", "权力斗争感", "克制压着情绪", "仪式感强"]
    }
  },
  {
    id: "unusual_xianxia_fate",
    picks: {
      unusualDirectionChoice: ["宿命纠缠", "师徒拉扯"],
      relationshipMode: ["克制但偏爱", "慢热陪伴"],
      chatStyleMode: ["克制留白", "成熟稳定"],
      worldTags: ["仙侠", "玄幻", "修真"],
      speciesTags: ["龙族", "狐妖", "凤凰", "神明"],
      identityTags: ["仙门师尊", "宗门天才", "禁术研究者", "神殿执灯者"],
      powerTags: ["召唤契灵", "结界", "治愈术", "寿命代价"],
      unusualSceneTags: ["秘境探路", "异能训练", "夜巡归来", "世界崩塌前陪伴"],
      unusualFeelingTags: ["命中注定感", "被特别选择", "心动与敬畏并存", "命运绑在一起"],
      unusualStyleTags: ["命运拉扯", "神性与人性并存", "像传说里的人", "诡异温柔"]
    }
  },
  {
    id: "unusual_apocalypse_survival",
    picks: {
      unusualDirectionChoice: ["高危守护", "敌对转暧昧"],
      relationshipMode: ["稳定守护", "暧昧拉扯"],
      chatStyleMode: ["自然说话", "轻松幽默", "成熟稳定"],
      worldTags: ["末世废土", "异能都市"],
      speciesTags: ["异种", "实验体", "半机械人"],
      identityTags: ["赏金猎人", "雇佣兵", "荒野领主", "地下医生"],
      powerTags: ["高速自愈", "失控风险", "共感反噬", "记忆缺失"],
      unusualSceneTags: ["危机撤离", "疗伤包扎", "雨夜躲藏", "血月失控"],
      unusualFeelingTags: ["并肩活下去的信任", "陌生世界里的依靠", "危险里的偏爱"],
      unusualStyleTags: ["末世残酷感", "危险里的浪漫", "危险但可靠", "有点疯"]
    }
  },
  {
    id: "unusual_conspiracy_pull",
    picks: {
      unusualDirectionChoice: ["禁忌同行", "敌对转暧昧"],
      relationshipMode: ["暧昧拉扯", "克制但偏爱"],
      chatStyleMode: ["克制留白", "轻松幽默"],
      worldTags: ["宫廷权谋", "悬疑志怪", "赛博朋克", "平行世界"],
      speciesTags: ["恶魔", "灵体", "仿生人"],
      identityTags: ["图书馆守密人", "审判官", "黑客", "异管局成员"],
      powerTags: ["读心", "梦境入侵", "数据入侵", "双重人格封印"],
      unusualSceneTags: ["密室共谋", "身份暴露后对峙", "任务通讯", "破案追踪"],
      unusualFeelingTags: ["秘密共担感", "浪漫又悬疑", "克制拉扯感", "危险里的偏爱"],
      unusualStyleTags: ["高智商过招", "说话压迫感强", "诡异温柔", "危险里的浪漫"]
    }
  },
  {
    id: "unusual_cosmic_companion",
    picks: {
      unusualDirectionChoice: ["宿命纠缠", "高危守护"],
      relationshipMode: ["慢热陪伴", "稳定守护"],
      chatStyleMode: ["自然说话", "温柔安慰", "成熟稳定"],
      worldTags: ["星际航行", "未来都市", "平行世界"],
      speciesTags: ["星际外来种", "仿生人", "天使"],
      identityTags: ["星舰舰长", "档案管理员", "流亡王族"],
      powerTags: ["精神链接", "空间折叠", "记忆缺失", "预知"],
      unusualSceneTags: ["星舰值夜", "任务通讯", "世界崩塌前陪伴", "禁区散步"],
      unusualFeelingTags: ["异世界归属感", "强烈陪伴感", "被特别选择", "心动与敬畏并存"],
      unusualStyleTags: ["未来科技感", "夜晚氛围重", "危险但可靠", "像传说里的人"]
    }
  }
];
