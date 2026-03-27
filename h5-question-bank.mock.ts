/**
 * H5 一年级思维训练题库 mock 数据
 *
 * 说明：
 * 1. 这不是新的题库源文件，而是给示例页面直接使用的页面层 mock。
 * 2. 题目的正式题面、答案、讲解、图片热区等内容，后续可以继续扩展到 CMS 或静态 JSON。
 * 3. 这里的 page mock 已经和“题库配置_v1_YMO_WMO一年级_H5.json”当前模块结构对齐。
 */

import type {
  HomePageData,
  ModuleLobbyData,
  ModuleId,
  QuestionPlayPageData,
  ResultPageData,
  WrongBookPageData,
} from './h5-question-bank.types';

export const mockQuestionBankSummary = {
  "meta": {
    "title": "一年级思维题 H5 题库配置 v1",
    "version": "1.0.0",
    "questionCount": 80,
    "paperCount": 4
  },
  "papers": [
    {
      "code": "34Y",
      "name": "34届YMO一年级初赛",
      "org": "YMO",
      "grade": "一年级",
      "stage": "初赛"
    },
    {
      "code": "35Y",
      "name": "35届YMO一年级初赛",
      "org": "YMO",
      "grade": "一年级",
      "stage": "初赛"
    },
    {
      "code": "36Y",
      "name": "36届YMO一年级初赛",
      "org": "YMO",
      "grade": "一年级",
      "stage": "初赛"
    },
    {
      "code": "34W",
      "name": "34届WMO一年级初测",
      "org": "WMO",
      "grade": "一年级",
      "stage": "初测"
    }
  ],
  "modules": [
    {
      "id": "A",
      "key": "mental_math",
      "name": "快算巧算 / 逆运算",
      "roomName": "快算王",
      "priority": 1,
      "questionCount": 18
    },
    {
      "id": "B",
      "key": "patterns",
      "name": "规律 / 递推 / 系统规则",
      "roomName": "找规律",
      "priority": 1,
      "questionCount": 15
    },
    {
      "id": "C",
      "key": "counting_and_construct",
      "name": "枚举计数 / 组合 / 最值",
      "roomName": "排列组合屋",
      "priority": 1,
      "questionCount": 12
    },
    {
      "id": "D",
      "key": "equivalence_and_balance",
      "name": "等量代换 / 和差关系 / 平衡",
      "roomName": "配平高手",
      "priority": 1,
      "questionCount": 12
    },
    {
      "id": "E",
      "key": "plane_geometry_counting",
      "name": "平面图形数数 / 覆盖 / 补图",
      "roomName": "图形工程师",
      "priority": 3,
      "questionCount": 7
    },
    {
      "id": "F",
      "key": "spatial_reasoning",
      "name": "立体空间 / 遮挡 / 展开图 / 位置",
      "roomName": "空间大师",
      "priority": 2,
      "questionCount": 9
    },
    {
      "id": "G",
      "key": "logic_puzzles",
      "name": "逻辑填数 / 等和图 / 符号填空 / 综合推理",
      "roomName": "逻辑神探",
      "priority": 2,
      "questionCount": 7
    }
  ]
} as const;

export const mockHomePageData: HomePageData = {
  "appTitle": "一年级思维训练乐园",
  "version": "1.0.0",
  "heroTitle": "7 大房间，80 道母题，支持快答 / 拖拽 / 数图 / 立体观察",
  "heroSubtitle": "先做高频题型，再做空间和逻辑，适合大屏 H5 反复练习。",
  "defaultTheme": "闯关",
  "roomCards": [
    {
      "moduleId": "A",
      "moduleKey": "mental_math",
      "roomName": "快算王",
      "title": "快算巧算 / 逆运算",
      "subtitle": "18题 / 18个子题型",
      "priority": 1,
      "questionCount": 18,
      "difficultySpan": [
        1,
        2
      ],
      "dominantInteractions": [
        "text_input",
        "single_choice",
        "drag_blank"
      ],
      "featuredQuestionIds": [
        "35Y-2",
        "34W-4",
        "35Y-4"
      ],
      "featuredSkills": [
        "数感",
        "凑整",
        "消项",
        "逆推"
      ]
    },
    {
      "moduleId": "B",
      "moduleKey": "patterns",
      "roomName": "找规律",
      "title": "规律 / 递推 / 系统规则",
      "subtitle": "15题 / 14个子题型",
      "priority": 1,
      "questionCount": 15,
      "difficultySpan": [
        1,
        4
      ],
      "dominantInteractions": [
        "single_choice",
        "fill_blank",
        "step_animation"
      ],
      "featuredQuestionIds": [
        "34W-6",
        "34W-20",
        "34Y-10"
      ],
      "featuredSkills": [
        "规律",
        "递推",
        "双序列",
        "系统规则"
      ]
    },
    {
      "moduleId": "C",
      "moduleKey": "counting_and_construct",
      "roomName": "排列组合屋",
      "title": "枚举计数 / 组合 / 最值",
      "subtitle": "12题 / 11个子题型",
      "priority": 1,
      "questionCount": 12,
      "difficultySpan": [
        1,
        3
      ],
      "dominantInteractions": [
        "drag_cards",
        "single_choice",
        "text_input"
      ],
      "featuredQuestionIds": [
        "34Y-11",
        "35Y-20",
        "34W-7"
      ],
      "featuredSkills": [
        "枚举",
        "去重",
        "计数",
        "数感"
      ]
    },
    {
      "moduleId": "D",
      "moduleKey": "equivalence_and_balance",
      "roomName": "配平高手",
      "title": "等量代换 / 和差关系 / 平衡",
      "subtitle": "12题 / 10个子题型",
      "priority": 1,
      "questionCount": 12,
      "difficultySpan": [
        1,
        3
      ],
      "dominantInteractions": [
        "text_input",
        "formula_substitute",
        "balance_animation"
      ],
      "featuredQuestionIds": [
        "36Y-9",
        "35Y-12",
        "34Y-17"
      ],
      "featuredSkills": [
        "代换",
        "比较",
        "和差",
        "平衡"
      ]
    },
    {
      "moduleId": "E",
      "moduleKey": "plane_geometry_counting",
      "roomName": "图形工程师",
      "title": "平面图形数数 / 覆盖 / 补图",
      "subtitle": "7题 / 6个子题型",
      "priority": 3,
      "questionCount": 7,
      "difficultySpan": [
        1,
        3
      ],
      "dominantInteractions": [
        "click_highlight",
        "single_choice",
        "custom"
      ],
      "featuredQuestionIds": [
        "36Y-10",
        "34Y-14",
        "35Y-17"
      ],
      "featuredSkills": [
        "覆盖",
        "观察",
        "计数",
        "图形观察"
      ]
    },
    {
      "moduleId": "F",
      "moduleKey": "spatial_reasoning",
      "roomName": "空间大师",
      "title": "立体空间 / 遮挡 / 展开图 / 位置",
      "subtitle": "9题 / 8个子题型",
      "priority": 2,
      "questionCount": 9,
      "difficultySpan": [
        1,
        4
      ],
      "dominantInteractions": [
        "single_choice",
        "observe_3d",
        "rotate_cube"
      ],
      "featuredQuestionIds": [
        "34W-11",
        "35Y-13",
        "35Y-7"
      ],
      "featuredSkills": [
        "空间想象",
        "空间",
        "相对面",
        "方位"
      ]
    },
    {
      "moduleId": "G",
      "moduleKey": "logic_puzzles",
      "roomName": "逻辑神探",
      "title": "逻辑填数 / 等和图 / 符号填空 / 综合推理",
      "subtitle": "7题 / 7个子题型",
      "priority": 2,
      "questionCount": 7,
      "difficultySpan": [
        3,
        5
      ],
      "dominantInteractions": [
        "drag_symbol",
        "drag_number_slots",
        "single_choice"
      ],
      "featuredQuestionIds": [
        "36Y-19",
        "34Y-5",
        "34Y-18"
      ],
      "featuredSkills": [
        "等和",
        "试填",
        "符号推理",
        "填数"
      ]
    }
  ],
  "playModes": [
    {
      "key": "topic_campaign",
      "name": "专题闯关"
    },
    {
      "key": "speed_run",
      "name": "10秒快答"
    },
    {
      "key": "drag_and_drop",
      "name": "拖拽填空"
    },
    {
      "key": "click_count",
      "name": "点击计数"
    },
    {
      "key": "spatial_observer",
      "name": "立体观察"
    }
  ],
  "quickStartSets": [
    {
      "key": "phase1_core",
      "title": "第一阶段核心房间",
      "description": "先完成快算、规律、枚举、配平四个核心模块。",
      "questionIds": [
        "34Y-5",
        "34Y-10",
        "34Y-15",
        "34Y-18",
        "34Y-20",
        "35Y-8",
        "35Y-11",
        "35Y-13"
      ],
      "moduleIds": [
        "A",
        "B",
        "C",
        "D"
      ]
    },
    {
      "key": "top20_demo",
      "title": "Top20 可玩题首发包",
      "description": "适合首版 H5 演示的高优先级题目集合。",
      "questionIds": [
        "34Y-5",
        "34Y-10",
        "34Y-15",
        "34Y-18",
        "34Y-20",
        "35Y-8",
        "35Y-11",
        "35Y-13",
        "35Y-17",
        "35Y-18",
        "36Y-5",
        "36Y-6",
        "36Y-9",
        "36Y-16",
        "36Y-19",
        "36Y-20",
        "34W-6",
        "34W-11",
        "34W-12",
        "34W-18",
        "34W-19",
        "34W-20"
      ],
      "moduleIds": [
        "B",
        "D",
        "E",
        "F",
        "G"
      ]
    },
    {
      "key": "logic_and_space",
      "title": "空间 + 逻辑挑战包",
      "description": "适合大屏展示效果较强的旋转观察与拖拽填数题。",
      "questionIds": [
        "35Y-18",
        "36Y-16",
        "36Y-19",
        "36Y-20",
        "34W-20"
      ],
      "moduleIds": [
        "F",
        "G",
        "B"
      ]
    }
  ],
  "dailyRecommendedQuestionIds": [
    "34Y-5",
    "34Y-10",
    "34Y-15",
    "34Y-18",
    "34Y-20",
    "35Y-8"
  ]
};

export const mockModuleLobbyMap: Record<ModuleId, ModuleLobbyData> = {
  "A": {
    "moduleId": "A",
    "moduleKey": "mental_math",
    "roomName": "快算王",
    "moduleName": "快算巧算 / 逆运算",
    "questionCount": 18,
    "recommendedQuestionIds": [
      "35Y-2",
      "34W-4",
      "35Y-4",
      "34W-14",
      "36Y-17"
    ],
    "subtypeBadges": [
      {
        "key": "alternating_add_sub",
        "name": "交替加减",
        "count": 1,
        "skills": [
          "观察",
          "数感",
          "运算顺序"
        ]
      },
      {
        "key": "make_ten_cancel",
        "name": "凑整消项",
        "count": 1,
        "skills": [
          "数感",
          "凑整",
          "消项"
        ]
      },
      {
        "key": "cut_count",
        "name": "切割次数",
        "count": 1,
        "skills": [
          "操作计数",
          "规律"
        ]
      },
      {
        "key": "unit_conversion",
        "name": "单位换算",
        "count": 1,
        "skills": [
          "等价换算",
          "数感"
        ]
      },
      {
        "key": "same_term_cancel",
        "name": "同项抵消",
        "count": 1,
        "skills": [
          "数感",
          "消项"
        ]
      },
      {
        "key": "basic_mental_math",
        "name": "基础口算",
        "count": 1,
        "skills": [
          "口算",
          "数感"
        ]
      },
      {
        "key": "odd_sum",
        "name": "奇数求和",
        "count": 1,
        "skills": [
          "配对",
          "数感",
          "求和"
        ]
      },
      {
        "key": "cancel_and_make_ten",
        "name": "抵消凑整",
        "count": 1,
        "skills": [
          "凑整",
          "消项",
          "数感"
        ]
      }
    ],
    "allowedInteractions": [
      "drag_blank",
      "single_choice",
      "text_input"
    ],
    "recommendedModes": [
      "topic_campaign",
      "speed_run"
    ]
  },
  "B": {
    "moduleId": "B",
    "moduleKey": "patterns",
    "roomName": "找规律",
    "moduleName": "规律 / 递推 / 系统规则",
    "questionCount": 15,
    "recommendedQuestionIds": [
      "34W-6",
      "34W-20",
      "34Y-10",
      "34W-15",
      "34Y-19"
    ],
    "subtypeBadges": [
      {
        "key": "double_sequence_pattern",
        "name": "双序列规律",
        "count": 2,
        "skills": [
          "双序列",
          "规律"
        ]
      },
      {
        "key": "triangular_number",
        "name": "三角数",
        "count": 1,
        "skills": [
          "递推",
          "图形数"
        ]
      },
      {
        "key": "alternating_sequence",
        "name": "交错数列",
        "count": 1,
        "skills": [
          "规律",
          "拆列观察"
        ]
      },
      {
        "key": "dynamic_rule",
        "name": "动态规则",
        "count": 1,
        "skills": [
          "动态观察",
          "机械推理"
        ]
      },
      {
        "key": "periodic_recursion",
        "name": "周期递推",
        "count": 1,
        "skills": [
          "周期",
          "递推"
        ]
      },
      {
        "key": "shape_pattern",
        "name": "图形规律",
        "count": 1,
        "skills": [
          "观察",
          "规律"
        ]
      },
      {
        "key": "shape_recursion",
        "name": "图形递推",
        "count": 1,
        "skills": [
          "规律",
          "图形观察"
        ]
      },
      {
        "key": "visual_rule",
        "name": "图示规则",
        "count": 1,
        "skills": [
          "读图",
          "规则迁移"
        ]
      }
    ],
    "allowedInteractions": [
      "animation_demo",
      "click_count",
      "drag_drop",
      "drag_shape",
      "fill_blank",
      "number_line_tap"
    ],
    "recommendedModes": [
      "topic_campaign",
      "speed_run"
    ]
  },
  "C": {
    "moduleId": "C",
    "moduleKey": "counting_and_construct",
    "roomName": "排列组合屋",
    "moduleName": "枚举计数 / 组合 / 最值",
    "questionCount": 12,
    "recommendedQuestionIds": [
      "34Y-11",
      "35Y-20",
      "34W-7",
      "36Y-8",
      "34Y-9"
    ],
    "subtypeBadges": [
      {
        "key": "enumeration_count",
        "name": "枚举计数",
        "count": 2,
        "skills": [
          "枚举",
          "去重"
        ]
      },
      {
        "key": "position_count",
        "name": "位置计数",
        "count": 1,
        "skills": [
          "位置",
          "计数"
        ]
      },
      {
        "key": "interval_count",
        "name": "区间计数",
        "count": 1,
        "skills": [
          "区间",
          "数感"
        ]
      },
      {
        "key": "number_sense_count",
        "name": "数感计数",
        "count": 1,
        "skills": [
          "数感",
          "计数"
        ]
      },
      {
        "key": "extreme_value_construction",
        "name": "最值构造",
        "count": 1,
        "skills": [
          "最值",
          "构造"
        ]
      },
      {
        "key": "maximum_number_construction",
        "name": "最大数构造",
        "count": 1,
        "skills": [
          "数位",
          "最大值"
        ]
      },
      {
        "key": "minimum_number_construction",
        "name": "最小数构造",
        "count": 1,
        "skills": [
          "数位",
          "最小值"
        ]
      },
      {
        "key": "enumeration_construction",
        "name": "枚举构造",
        "count": 1,
        "skills": [
          "枚举",
          "构造"
        ]
      }
    ],
    "allowedInteractions": [
      "custom",
      "drag_cards",
      "single_choice",
      "tap_connect",
      "text_input"
    ],
    "recommendedModes": [
      "topic_campaign",
      "drag_and_drop"
    ]
  },
  "D": {
    "moduleId": "D",
    "moduleKey": "equivalence_and_balance",
    "roomName": "配平高手",
    "moduleName": "等量代换 / 和差关系 / 平衡",
    "questionCount": 12,
    "recommendedQuestionIds": [
      "36Y-9",
      "35Y-12",
      "34Y-17",
      "36Y-18",
      "34W-5"
    ],
    "subtypeBadges": [
      {
        "key": "sum_difference_relation",
        "name": "和差关系",
        "count": 2,
        "skills": [
          "和差",
          "比较"
        ]
      },
      {
        "key": "shape_substitution",
        "name": "图形代换",
        "count": 2,
        "skills": [
          "代换",
          "等量关系"
        ]
      },
      {
        "key": "two_variable_substitution",
        "name": "二元代换",
        "count": 1,
        "skills": [
          "代换",
          "消元"
        ]
      },
      {
        "key": "half_the_difference",
        "name": "差的一半",
        "count": 1,
        "skills": [
          "和差",
          "平衡"
        ]
      },
      {
        "key": "age_relation",
        "name": "年龄关系",
        "count": 1,
        "skills": [
          "年龄",
          "差量"
        ]
      },
      {
        "key": "move_balance",
        "name": "移动平衡",
        "count": 1,
        "skills": [
          "平衡",
          "差的一半"
        ]
      },
      {
        "key": "vertical_substitution",
        "name": "竖式代换",
        "count": 1,
        "skills": [
          "竖式",
          "代换"
        ]
      },
      {
        "key": "equivalent_exchange",
        "name": "等价兑换",
        "count": 1,
        "skills": [
          "等价",
          "链式代换"
        ]
      }
    ],
    "allowedInteractions": [
      "balance_animation",
      "custom",
      "drag_number_grid",
      "fill_blank",
      "formula_substitute",
      "single_choice"
    ],
    "recommendedModes": [
      "topic_campaign",
      "drag_and_drop"
    ]
  },
  "E": {
    "moduleId": "E",
    "moduleKey": "plane_geometry_counting",
    "roomName": "图形工程师",
    "moduleName": "平面图形数数 / 覆盖 / 补图",
    "questionCount": 7,
    "recommendedQuestionIds": [
      "36Y-10",
      "34Y-14",
      "35Y-17",
      "34W-19",
      "34W-3"
    ],
    "subtypeBadges": [
      {
        "key": "count_points",
        "name": "数点",
        "count": 2,
        "skills": [
          "观察",
          "计数"
        ]
      },
      {
        "key": "plane_fill_tiles",
        "name": "平面补块",
        "count": 1,
        "skills": [
          "覆盖",
          "补块"
        ]
      },
      {
        "key": "plane_covering",
        "name": "平面覆盖",
        "count": 1,
        "skills": [
          "覆盖",
          "双色图案"
        ]
      },
      {
        "key": "count_squares",
        "name": "数正方形",
        "count": 1,
        "skills": [
          "分类计数",
          "平面图形"
        ]
      },
      {
        "key": "count_segments",
        "name": "数线段",
        "count": 1,
        "skills": [
          "分类计数",
          "图形观察"
        ]
      },
      {
        "key": "fill_missing_shape",
        "name": "缺口补图",
        "count": 1,
        "skills": [
          "补图",
          "图形观察"
        ]
      }
    ],
    "allowedInteractions": [
      "click_highlight",
      "custom",
      "double_fill",
      "drag_tiles",
      "single_choice"
    ],
    "recommendedModes": [
      "topic_campaign",
      "click_count"
    ]
  },
  "F": {
    "moduleId": "F",
    "moduleKey": "spatial_reasoning",
    "roomName": "空间大师",
    "moduleName": "立体空间 / 遮挡 / 展开图 / 位置",
    "questionCount": 9,
    "recommendedQuestionIds": [
      "34W-11",
      "35Y-13",
      "35Y-7",
      "36Y-7",
      "34Y-15"
    ],
    "subtypeBadges": [
      {
        "key": "opposite_face",
        "name": "对面判断",
        "count": 2,
        "skills": [
          "空间想象",
          "相对面"
        ]
      },
      {
        "key": "stacked_cube_count",
        "name": "堆叠计数",
        "count": 1,
        "skills": [
          "空间",
          "分层计数"
        ]
      },
      {
        "key": "net_recognition",
        "name": "展开图判断",
        "count": 1,
        "skills": [
          "空间想象",
          "展开图"
        ]
      },
      {
        "key": "fold_and_cut",
        "name": "折叠切分",
        "count": 1,
        "skills": [
          "折叠",
          "切分"
        ]
      },
      {
        "key": "spatial_position",
        "name": "方位位置",
        "count": 1,
        "skills": [
          "方位",
          "空间认知"
        ]
      },
      {
        "key": "solid_basics",
        "name": "立体基础",
        "count": 1,
        "skills": [
          "立体认知",
          "几何基础"
        ]
      },
      {
        "key": "overlay_symmetry",
        "name": "覆盖与对称",
        "count": 1,
        "skills": [
          "覆盖",
          "对称"
        ]
      },
      {
        "key": "hidden_block_count",
        "name": "遮挡计数",
        "count": 1,
        "skills": [
          "空间",
          "遮挡"
        ]
      }
    ],
    "allowedInteractions": [
      "animation_demo",
      "multi_choice",
      "observe_3d",
      "rotate_cube",
      "single_choice",
      "text_input"
    ],
    "recommendedModes": [
      "topic_campaign",
      "spatial_observer"
    ]
  },
  "G": {
    "moduleId": "G",
    "moduleKey": "logic_puzzles",
    "roomName": "逻辑神探",
    "moduleName": "逻辑填数 / 等和图 / 符号填空 / 综合推理",
    "questionCount": 7,
    "recommendedQuestionIds": [
      "36Y-19",
      "34Y-5",
      "34Y-18",
      "34Y-20",
      "35Y-11"
    ],
    "subtypeBadges": [
      {
        "key": "regional_equal_sum",
        "name": "区域等和",
        "count": 1,
        "skills": [
          "区域约束",
          "等和"
        ]
      },
      {
        "key": "fill_operators",
        "name": "填符号",
        "count": 1,
        "skills": [
          "试填",
          "符号推理"
        ]
      },
      {
        "key": "optimize_operators",
        "name": "最优化填符号",
        "count": 1,
        "skills": [
          "最优化",
          "符号推理"
        ]
      },
      {
        "key": "equal_sum_triangle",
        "name": "等和三角",
        "count": 1,
        "skills": [
          "等和",
          "结构观察"
        ]
      },
      {
        "key": "equal_sum_graph",
        "name": "等和图",
        "count": 1,
        "skills": [
          "等和",
          "试填"
        ]
      },
      {
        "key": "equal_sum_fill",
        "name": "等和填数",
        "count": 1,
        "skills": [
          "等和",
          "填数"
        ]
      },
      {
        "key": "logic_grid_fill",
        "name": "逻辑填数",
        "count": 1,
        "skills": [
          "排除法",
          "约束推理",
          "数感"
        ]
      }
    ],
    "allowedInteractions": [
      "drag_number_grid",
      "drag_number_regions",
      "drag_number_slots",
      "drag_symbol",
      "single_choice"
    ],
    "recommendedModes": [
      "topic_campaign",
      "drag_and_drop"
    ]
  }
};

export const mockPlayPageExamples: QuestionPlayPageData[] = [
  {
    "mode": "speed_run",
    "progress": {
      "sessionId": "demo-speed-001",
      "currentIndex": 1,
      "total": 10,
      "correct": 0,
      "stars": 0,
      "combo": 0,
      "elapsedSeconds": 3
    },
    "question": {
      "questionId": "36Y-1",
      "roomName": "快算王",
      "moduleName": "快算巧算 / 逆运算",
      "title": "37+18-37+82",
      "promptText": "请快速算出：37 + 18 - 37 + 82 = ?",
      "difficulty": 1,
      "difficultyLabel": "入门",
      "skills": [
        "凑整",
        "消项",
        "数感"
      ],
      "imageKey": "36Y-1",
      "primaryInteraction": "text_input",
      "secondaryInteractions": [],
      "widget": {
        "kind": "text_input",
        "placeholder": "请输入答案",
        "keyboard": "number",
        "answerFormat": "integer"
      }
    },
    "previousQuestionIds": [],
    "nextQuestionId": "35Y-16"
  },
  {
    "mode": "topic_campaign",
    "progress": {
      "sessionId": "demo-pattern-001",
      "currentIndex": 2,
      "total": 8,
      "correct": 1,
      "stars": 1,
      "combo": 1,
      "elapsedSeconds": 18
    },
    "question": {
      "questionId": "36Y-5",
      "roomName": "找规律",
      "moduleName": "规律 / 递推 / 系统规则",
      "title": "根据前两个图示推断第三个问号",
      "promptText": "观察前两个图示的变化规则，再判断第三个问号应该选哪一个。",
      "difficulty": 2,
      "difficultyLabel": "基础",
      "skills": [
        "读图",
        "规则迁移"
      ],
      "imageKey": "36Y-5",
      "primaryInteraction": "single_choice",
      "secondaryInteractions": [
        "drag_drop"
      ],
      "widget": {
        "kind": "single_choice",
        "options": [
          {
            "id": "A",
            "label": "A",
            "value": "A"
          },
          {
            "id": "B",
            "label": "B",
            "value": "B"
          },
          {
            "id": "C",
            "label": "C",
            "value": "C"
          },
          {
            "id": "D",
            "label": "D",
            "value": "D"
          }
        ]
      }
    },
    "previousQuestionIds": [
      "36Y-2"
    ],
    "nextQuestionId": "34W-6"
  },
  {
    "mode": "click_count",
    "progress": {
      "sessionId": "demo-plane-001",
      "currentIndex": 4,
      "total": 6,
      "correct": 3,
      "stars": 3,
      "combo": 2,
      "elapsedSeconds": 41
    },
    "question": {
      "questionId": "36Y-10",
      "roomName": "图形工程师",
      "moduleName": "平面图形数数 / 覆盖 / 补图",
      "title": "方格图中共有多少个正方形",
      "promptText": "把你找到的正方形逐个点亮，全部点完再提交。",
      "difficulty": 3,
      "difficultyLabel": "进阶",
      "skills": [
        "分类计数",
        "平面图形"
      ],
      "imageKey": "36Y-10",
      "primaryInteraction": "click_highlight",
      "secondaryInteractions": [],
      "widget": {
        "kind": "click_highlight",
        "targetHint": "先数小正方形，再数大正方形。",
        "minSelectable": 1
      }
    },
    "previousQuestionIds": [
      "36Y-4",
      "34Y-12",
      "35Y-17"
    ],
    "nextQuestionId": "34W-19"
  },
  {
    "mode": "spatial_observer",
    "progress": {
      "sessionId": "demo-space-001",
      "currentIndex": 3,
      "total": 5,
      "correct": 2,
      "stars": 2,
      "combo": 0,
      "elapsedSeconds": 27
    },
    "question": {
      "questionId": "35Y-18",
      "roomName": "空间大师",
      "moduleName": "立体空间 / 遮挡 / 展开图 / 位置",
      "title": "同一正方体不同摆法，2的对面是谁",
      "promptText": "拖动立方体观察不同方向，判断数字 2 的对面是哪一个面。",
      "difficulty": 3,
      "difficultyLabel": "进阶",
      "skills": [
        "空间想象",
        "相对面"
      ],
      "imageKey": "35Y-18",
      "primaryInteraction": "rotate_cube",
      "secondaryInteractions": [],
      "widget": {
        "kind": "rotate_cube",
        "targetHint": "先找与 2 相邻的面，再排除。",
        "options": [
          {
            "id": "1",
            "label": "1",
            "value": 1
          },
          {
            "id": "3",
            "label": "3",
            "value": 3
          },
          {
            "id": "4",
            "label": "4",
            "value": 4
          },
          {
            "id": "6",
            "label": "6",
            "value": 6
          }
        ]
      }
    },
    "previousQuestionIds": [
      "36Y-7",
      "34W-18"
    ],
    "nextQuestionId": "36Y-16"
  },
  {
    "mode": "drag_and_drop",
    "progress": {
      "sessionId": "demo-logic-001",
      "currentIndex": 5,
      "total": 8,
      "correct": 4,
      "stars": 4,
      "combo": 1,
      "elapsedSeconds": 56
    },
    "question": {
      "questionId": "36Y-19",
      "roomName": "逻辑神探",
      "moduleName": "逻辑填数 / 等和图 / 符号填空 / 综合推理",
      "title": "4×4填1-4，每行每列不重复且满足粗框和",
      "promptText": "把 1、2、3、4 拖进方格。每行每列都不能重复，还要满足粗框的和。",
      "difficulty": 5,
      "difficultyLabel": "高阶",
      "skills": [
        "排除法",
        "约束推理",
        "数感"
      ],
      "imageKey": "36Y-19",
      "primaryInteraction": "drag_number_grid",
      "secondaryInteractions": [],
      "widget": {
        "kind": "drag_number_grid",
        "tokens": [
          {
            "id": "n1",
            "label": "1",
            "value": 1
          },
          {
            "id": "n2",
            "label": "2",
            "value": 2
          },
          {
            "id": "n3",
            "label": "3",
            "value": 3
          },
          {
            "id": "n4",
            "label": "4",
            "value": 4
          }
        ],
        "cells": [
          {
            "id": "r1c1",
            "row": 1,
            "col": 1
          },
          {
            "id": "r1c2",
            "row": 1,
            "col": 2
          },
          {
            "id": "r1c3",
            "row": 1,
            "col": 3
          },
          {
            "id": "r1c4",
            "row": 1,
            "col": 4
          },
          {
            "id": "r2c1",
            "row": 2,
            "col": 1
          },
          {
            "id": "r2c2",
            "row": 2,
            "col": 2,
            "presetValue": 1,
            "locked": true
          },
          {
            "id": "r2c3",
            "row": 2,
            "col": 3
          },
          {
            "id": "r2c4",
            "row": 2,
            "col": 4
          },
          {
            "id": "r3c1",
            "row": 3,
            "col": 1
          },
          {
            "id": "r3c2",
            "row": 3,
            "col": 2
          },
          {
            "id": "r3c3",
            "row": 3,
            "col": 3
          },
          {
            "id": "r3c4",
            "row": 3,
            "col": 4
          },
          {
            "id": "r4c1",
            "row": 4,
            "col": 1
          },
          {
            "id": "r4c2",
            "row": 4,
            "col": 2
          },
          {
            "id": "r4c3",
            "row": 4,
            "col": 3
          },
          {
            "id": "r4c4",
            "row": 4,
            "col": 4
          }
        ]
      }
    },
    "previousQuestionIds": [
      "36Y-20",
      "34Y-18",
      "34Y-20",
      "35Y-11"
    ],
    "nextQuestionId": "34W-12"
  },
  {
    "mode": "topic_campaign",
    "progress": {
      "sessionId": "demo-dynamic-001",
      "currentIndex": 6,
      "total": 6,
      "correct": 5,
      "stars": 5,
      "combo": 3,
      "elapsedSeconds": 49
    },
    "question": {
      "questionId": "34W-20",
      "roomName": "找规律",
      "moduleName": "规律 / 递推 / 系统规则",
      "title": "齿轮转动后哪个方块先碰到",
      "promptText": "先看动画播放，再判断哪个方块会最先碰到目标。",
      "difficulty": 4,
      "difficultyLabel": "挑战",
      "skills": [
        "动态观察",
        "机械推理"
      ],
      "imageKey": "34W-20",
      "primaryInteraction": "animation_demo",
      "secondaryInteractions": [
        "single_choice"
      ],
      "widget": {
        "kind": "animation_demo",
        "targetHint": "重点观察齿轮转向和接触顺序。",
        "options": [
          {
            "id": "A",
            "label": "红色方块",
            "value": "red"
          },
          {
            "id": "B",
            "label": "蓝色方块",
            "value": "blue"
          },
          {
            "id": "C",
            "label": "黄色方块",
            "value": "yellow"
          },
          {
            "id": "D",
            "label": "绿色方块",
            "value": "green"
          }
        ]
      }
    },
    "previousQuestionIds": [
      "34W-6",
      "34W-12",
      "34W-18",
      "34W-19",
      "36Y-6"
    ],
    "nextQuestionId": undefined
  }
];

export const mockResultPageData: ResultPageData = {
  "sessionId": "demo-logic-001",
  "mode": "drag_and_drop",
  "total": 8,
  "correct": 6,
  "accuracy": 0.75,
  "totalStars": 9,
  "totalSeconds": 113,
  "newlyUnlockedBadge": "逻辑神探·见习侦探",
  "questionSummaries": [
    {
      "questionId": "36Y-20",
      "title": "三角形空圈填11、12、13，使每条线和相等",
      "moduleId": "G",
      "difficulty": 3,
      "correct": true,
      "timeSpentSeconds": 11
    },
    {
      "questionId": "34Y-18",
      "title": "20到26填入Y形圆圈，使每条线三数和相等，问中心有几种填法",
      "moduleId": "G",
      "difficulty": 4,
      "correct": false,
      "timeSpentSeconds": 19
    },
    {
      "questionId": "36Y-19",
      "title": "4×4填1-4，每行每列不重复且满足粗框和",
      "moduleId": "G",
      "difficulty": 5,
      "correct": true,
      "timeSpentSeconds": 31
    },
    {
      "questionId": "34W-12",
      "title": "洛书图中★处填什么",
      "moduleId": "G",
      "difficulty": 3,
      "correct": true,
      "timeSpentSeconds": 16
    }
  ],
  "recommendedRetryQuestionIds": [
    "34Y-18",
    "34Y-20",
    "35Y-11"
  ]
};

export const mockWrongBookPageData: WrongBookPageData = {
  "totalWrongQuestions": 6,
  "groupedByModule": {
    "A": [
      {
        "questionId": "35Y-4",
        "title": "987-99-1-2-98-45-55",
        "moduleId": "A",
        "moduleName": "快算巧算 / 逆运算",
        "subtypeKey": "subtraction_reorder",
        "wrongCount": 2,
        "lastSeenAt": "2026-03-22T08:00:00Z",
        "recommendedMode": "speed_run"
      }
    ],
    "B": [
      {
        "questionId": "34W-20",
        "title": "齿轮转动后哪个方块先碰到",
        "moduleId": "B",
        "moduleName": "规律 / 递推 / 系统规则",
        "subtypeKey": "dynamic_rule",
        "wrongCount": 1,
        "lastSeenAt": "2026-03-22T08:02:00Z",
        "recommendedMode": "topic_campaign"
      }
    ],
    "C": [],
    "D": [
      {
        "questionId": "36Y-18",
        "title": "▲+■=10，且2▲+3■=26，求▲",
        "moduleId": "D",
        "moduleName": "等量代换 / 和差关系 / 平衡",
        "subtypeKey": "two_variable_substitution",
        "wrongCount": 2,
        "lastSeenAt": "2026-03-22T08:04:00Z",
        "recommendedMode": "drag_and_drop"
      }
    ],
    "E": [],
    "F": [
      {
        "questionId": "35Y-18",
        "title": "同一正方体不同摆法，2的对面是谁",
        "moduleId": "F",
        "moduleName": "立体空间 / 遮挡 / 展开图 / 位置",
        "subtypeKey": "opposite_face",
        "wrongCount": 1,
        "lastSeenAt": "2026-03-22T08:06:00Z",
        "recommendedMode": "spatial_observer"
      }
    ],
    "G": [
      {
        "questionId": "34Y-18",
        "title": "20到26填入Y形圆圈，使每条线三数和相等，问中心有几种填法",
        "moduleId": "G",
        "moduleName": "逻辑填数 / 等和图 / 符号填空 / 综合推理",
        "subtypeKey": "equal_sum_graph",
        "wrongCount": 3,
        "lastSeenAt": "2026-03-22T08:08:00Z",
        "recommendedMode": "drag_and_drop"
      },
      {
        "questionId": "36Y-19",
        "title": "4×4填1-4，每行每列不重复且满足粗框和",
        "moduleId": "G",
        "moduleName": "逻辑填数 / 等和图 / 符号填空 / 综合推理",
        "subtypeKey": "logic_grid_fill",
        "wrongCount": 2,
        "lastSeenAt": "2026-03-22T08:09:00Z",
        "recommendedMode": "drag_and_drop"
      }
    ]
  },
  "dailyRetryQuestionIds": [
    "34Y-18",
    "36Y-19",
    "35Y-18",
    "34W-20"
  ]
};

/**
 * 示例：首屏可直接展示的推荐入口
 */
export const mockLandingQuickAccess = [
  { key: 'today', title: '今日推荐', questionIds: mockHomePageData.dailyRecommendedQuestionIds },
  { key: 'top20', title: 'Top20 首发包', questionIds: mockHomePageData.quickStartSets[1].questionIds },
  { key: 'logic', title: '逻辑冲刺', questionIds: mockHomePageData.quickStartSets[2].questionIds },
] as const;
