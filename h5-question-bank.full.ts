import type { QuestionBankConfig } from './h5-question-bank.types';

/**
 * 全量题库配置（80题）
 * 由题库配置 JSON 固化为 TypeScript，便于前端直接导入。
 */

export const fullQuestionBankConfig = {
  "meta": {
    "title": "一年级思维题 H5 题库配置 v1",
    "locale": "zh-CN",
    "version": "1.0.0",
    "generatedAt": "2026-03-22T08:45:29Z",
    "generatedFrom": "题库母表_v1_YMO_WMO一年级_H5分层.md",
    "questionCount": 80,
    "storyPackCount": 12,
    "paperCount": 4,
    "notes": [
      "本配置按 H5 训练模块重组，不按原试卷顺序排列。",
      "question.asset.imageKey 可直接作为前端素材命名基准，例如 36Y-19.png。",
      "interaction 为前端可识别的交互类型码，interactionLabel 保留原中文描述。",
      "模块 H 不重复生成题目实体，作为 storyChannels 对既有题目的二次包装引用。"
    ]
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
      "questionCount": 18,
      "subtypes": [
        {
          "name": "交替加减",
          "key": "alternating_add_sub",
          "count": 1
        },
        {
          "name": "凑整消项",
          "key": "make_ten_cancel",
          "count": 1
        },
        {
          "name": "切割次数",
          "key": "cut_count",
          "count": 1
        },
        {
          "name": "单位换算",
          "key": "unit_conversion",
          "count": 1
        },
        {
          "name": "同项抵消",
          "key": "same_term_cancel",
          "count": 1
        },
        {
          "name": "基础口算",
          "key": "basic_mental_math",
          "count": 1
        },
        {
          "name": "奇数求和",
          "key": "odd_sum",
          "count": 1
        },
        {
          "name": "抵消凑整",
          "key": "cancel_and_make_ten",
          "count": 1
        },
        {
          "name": "抵消简算",
          "key": "cancel_simplify",
          "count": 1
        },
        {
          "name": "新运算",
          "key": "custom_operation",
          "count": 1
        },
        {
          "name": "日期计算",
          "key": "date_calculation",
          "count": 1
        },
        {
          "name": "破十法",
          "key": "break_ten_method",
          "count": 1
        },
        {
          "name": "连减重组",
          "key": "subtraction_reorder",
          "count": 1
        },
        {
          "name": "连加连减",
          "key": "mixed_add_sub",
          "count": 1
        },
        {
          "name": "逆推计算",
          "key": "reverse_calculation",
          "count": 1
        },
        {
          "name": "逆运算",
          "key": "inverse_operation",
          "count": 1
        },
        {
          "name": "配对巧算",
          "key": "pairing_mental_math",
          "count": 1
        },
        {
          "name": "重组巧算",
          "key": "reorder_calculation",
          "count": 1
        }
      ],
      "interactionTypes": [
        "drag_blank",
        "single_choice",
        "text_input"
      ]
    },
    {
      "id": "B",
      "key": "patterns",
      "name": "规律 / 递推 / 系统规则",
      "roomName": "找规律",
      "priority": 1,
      "questionCount": 15,
      "subtypes": [
        {
          "name": "双序列规律",
          "key": "double_sequence_pattern",
          "count": 2
        },
        {
          "name": "三角数",
          "key": "triangular_number",
          "count": 1
        },
        {
          "name": "交错数列",
          "key": "alternating_sequence",
          "count": 1
        },
        {
          "name": "动态规则",
          "key": "dynamic_rule",
          "count": 1
        },
        {
          "name": "周期递推",
          "key": "periodic_recursion",
          "count": 1
        },
        {
          "name": "图形规律",
          "key": "shape_pattern",
          "count": 1
        },
        {
          "name": "图形递推",
          "key": "shape_recursion",
          "count": 1
        },
        {
          "name": "图示规则",
          "key": "visual_rule",
          "count": 1
        },
        {
          "name": "数轴递推",
          "key": "number_line_recursion",
          "count": 1
        },
        {
          "name": "相邻和数列",
          "key": "adjacent_sum_sequence",
          "count": 1
        },
        {
          "name": "空间递推",
          "key": "spatial_recursion",
          "count": 1
        },
        {
          "name": "规则系统",
          "key": "rule_system",
          "count": 1
        },
        {
          "name": "进位规则",
          "key": "carry_rule",
          "count": 1
        },
        {
          "name": "递推楼梯",
          "key": "stair_recursion",
          "count": 1
        }
      ],
      "interactionTypes": [
        "animation_demo",
        "click_count",
        "drag_drop",
        "drag_shape",
        "fill_blank",
        "number_line_tap",
        "single_choice",
        "step_animation",
        "text_input"
      ]
    },
    {
      "id": "C",
      "key": "counting_and_construct",
      "name": "枚举计数 / 组合 / 最值",
      "roomName": "排列组合屋",
      "priority": 1,
      "questionCount": 12,
      "subtypes": [
        {
          "name": "枚举计数",
          "key": "enumeration_count",
          "count": 2
        },
        {
          "name": "位置计数",
          "key": "position_count",
          "count": 1
        },
        {
          "name": "区间计数",
          "key": "interval_count",
          "count": 1
        },
        {
          "name": "数感计数",
          "key": "number_sense_count",
          "count": 1
        },
        {
          "name": "最值构造",
          "key": "extreme_value_construction",
          "count": 1
        },
        {
          "name": "最大数构造",
          "key": "maximum_number_construction",
          "count": 1
        },
        {
          "name": "最小数构造",
          "key": "minimum_number_construction",
          "count": 1
        },
        {
          "name": "枚举构造",
          "key": "enumeration_construction",
          "count": 1
        },
        {
          "name": "组合计数",
          "key": "combination_count",
          "count": 1
        },
        {
          "name": "配对计数",
          "key": "pair_count",
          "count": 1
        },
        {
          "name": "队列总数",
          "key": "queue_total",
          "count": 1
        }
      ],
      "interactionTypes": [
        "custom",
        "drag_cards",
        "single_choice",
        "tap_connect",
        "text_input"
      ]
    },
    {
      "id": "D",
      "key": "equivalence_and_balance",
      "name": "等量代换 / 和差关系 / 平衡",
      "roomName": "配平高手",
      "priority": 1,
      "questionCount": 12,
      "subtypes": [
        {
          "name": "和差关系",
          "key": "sum_difference_relation",
          "count": 2
        },
        {
          "name": "图形代换",
          "key": "shape_substitution",
          "count": 2
        },
        {
          "name": "二元代换",
          "key": "two_variable_substitution",
          "count": 1
        },
        {
          "name": "差的一半",
          "key": "half_the_difference",
          "count": 1
        },
        {
          "name": "年龄关系",
          "key": "age_relation",
          "count": 1
        },
        {
          "name": "移动平衡",
          "key": "move_balance",
          "count": 1
        },
        {
          "name": "竖式代换",
          "key": "vertical_substitution",
          "count": 1
        },
        {
          "name": "等价兑换",
          "key": "equivalent_exchange",
          "count": 1
        },
        {
          "name": "等量增加",
          "key": "equal_increment",
          "count": 1
        },
        {
          "name": "至少多1",
          "key": "at_least_plus_one",
          "count": 1
        }
      ],
      "interactionTypes": [
        "balance_animation",
        "custom",
        "drag_number_grid",
        "fill_blank",
        "formula_substitute",
        "single_choice",
        "text_input"
      ]
    },
    {
      "id": "E",
      "key": "plane_geometry_counting",
      "name": "平面图形数数 / 覆盖 / 补图",
      "roomName": "图形工程师",
      "priority": 3,
      "questionCount": 7,
      "subtypes": [
        {
          "name": "数点",
          "key": "count_points",
          "count": 2
        },
        {
          "name": "平面补块",
          "key": "plane_fill_tiles",
          "count": 1
        },
        {
          "name": "平面覆盖",
          "key": "plane_covering",
          "count": 1
        },
        {
          "name": "数正方形",
          "key": "count_squares",
          "count": 1
        },
        {
          "name": "数线段",
          "key": "count_segments",
          "count": 1
        },
        {
          "name": "缺口补图",
          "key": "fill_missing_shape",
          "count": 1
        }
      ],
      "interactionTypes": [
        "click_highlight",
        "custom",
        "double_fill",
        "drag_tiles",
        "single_choice"
      ]
    },
    {
      "id": "F",
      "key": "spatial_reasoning",
      "name": "立体空间 / 遮挡 / 展开图 / 位置",
      "roomName": "空间大师",
      "priority": 2,
      "questionCount": 9,
      "subtypes": [
        {
          "name": "对面判断",
          "key": "opposite_face",
          "count": 2
        },
        {
          "name": "堆叠计数",
          "key": "stacked_cube_count",
          "count": 1
        },
        {
          "name": "展开图判断",
          "key": "net_recognition",
          "count": 1
        },
        {
          "name": "折叠切分",
          "key": "fold_and_cut",
          "count": 1
        },
        {
          "name": "方位位置",
          "key": "spatial_position",
          "count": 1
        },
        {
          "name": "立体基础",
          "key": "solid_basics",
          "count": 1
        },
        {
          "name": "覆盖与对称",
          "key": "overlay_symmetry",
          "count": 1
        },
        {
          "name": "遮挡计数",
          "key": "hidden_block_count",
          "count": 1
        }
      ],
      "interactionTypes": [
        "animation_demo",
        "multi_choice",
        "observe_3d",
        "rotate_cube",
        "single_choice",
        "text_input"
      ]
    },
    {
      "id": "G",
      "key": "logic_puzzles",
      "name": "逻辑填数 / 等和图 / 符号填空 / 综合推理",
      "roomName": "逻辑神探",
      "priority": 2,
      "questionCount": 7,
      "subtypes": [
        {
          "name": "区域等和",
          "key": "regional_equal_sum",
          "count": 1
        },
        {
          "name": "填符号",
          "key": "fill_operators",
          "count": 1
        },
        {
          "name": "最优化填符号",
          "key": "optimize_operators",
          "count": 1
        },
        {
          "name": "等和三角",
          "key": "equal_sum_triangle",
          "count": 1
        },
        {
          "name": "等和图",
          "key": "equal_sum_graph",
          "count": 1
        },
        {
          "name": "等和填数",
          "key": "equal_sum_fill",
          "count": 1
        },
        {
          "name": "逻辑填数",
          "key": "logic_grid_fill",
          "count": 1
        }
      ],
      "interactionTypes": [
        "drag_number_grid",
        "drag_number_regions",
        "drag_number_slots",
        "drag_symbol",
        "single_choice"
      ]
    }
  ],
  "subtypes": [
    {
      "key": "alternating_add_sub",
      "name": "交替加减",
      "questionCount": 1,
      "skills": [
        "观察",
        "数感",
        "运算顺序"
      ],
      "moduleId": "A",
      "moduleKey": "mental_math"
    },
    {
      "key": "make_ten_cancel",
      "name": "凑整消项",
      "questionCount": 1,
      "skills": [
        "数感",
        "凑整",
        "消项"
      ],
      "moduleId": "A",
      "moduleKey": "mental_math"
    },
    {
      "key": "cut_count",
      "name": "切割次数",
      "questionCount": 1,
      "skills": [
        "操作计数",
        "规律"
      ],
      "moduleId": "A",
      "moduleKey": "mental_math"
    },
    {
      "key": "unit_conversion",
      "name": "单位换算",
      "questionCount": 1,
      "skills": [
        "等价换算",
        "数感"
      ],
      "moduleId": "A",
      "moduleKey": "mental_math"
    },
    {
      "key": "same_term_cancel",
      "name": "同项抵消",
      "questionCount": 1,
      "skills": [
        "数感",
        "消项"
      ],
      "moduleId": "A",
      "moduleKey": "mental_math"
    },
    {
      "key": "basic_mental_math",
      "name": "基础口算",
      "questionCount": 1,
      "skills": [
        "口算",
        "数感"
      ],
      "moduleId": "A",
      "moduleKey": "mental_math"
    },
    {
      "key": "odd_sum",
      "name": "奇数求和",
      "questionCount": 1,
      "skills": [
        "配对",
        "数感",
        "求和"
      ],
      "moduleId": "A",
      "moduleKey": "mental_math"
    },
    {
      "key": "cancel_and_make_ten",
      "name": "抵消凑整",
      "questionCount": 1,
      "skills": [
        "凑整",
        "消项",
        "数感"
      ],
      "moduleId": "A",
      "moduleKey": "mental_math"
    },
    {
      "key": "cancel_simplify",
      "name": "抵消简算",
      "questionCount": 1,
      "skills": [
        "代换",
        "简算"
      ],
      "moduleId": "A",
      "moduleKey": "mental_math"
    },
    {
      "key": "custom_operation",
      "name": "新运算",
      "questionCount": 1,
      "skills": [
        "规则理解",
        "代入"
      ],
      "moduleId": "A",
      "moduleKey": "mental_math"
    },
    {
      "key": "date_calculation",
      "name": "日期计算",
      "questionCount": 1,
      "skills": [
        "日期",
        "顺推"
      ],
      "moduleId": "A",
      "moduleKey": "mental_math"
    },
    {
      "key": "break_ten_method",
      "name": "破十法",
      "questionCount": 1,
      "skills": [
        "拆分",
        "破十法",
        "数感"
      ],
      "moduleId": "A",
      "moduleKey": "mental_math"
    },
    {
      "key": "subtraction_reorder",
      "name": "连减重组",
      "questionCount": 1,
      "skills": [
        "重组",
        "数感",
        "逆向观察"
      ],
      "moduleId": "A",
      "moduleKey": "mental_math"
    },
    {
      "key": "mixed_add_sub",
      "name": "连加连减",
      "questionCount": 1,
      "skills": [
        "连加连减",
        "数感"
      ],
      "moduleId": "A",
      "moduleKey": "mental_math"
    },
    {
      "key": "reverse_calculation",
      "name": "逆推计算",
      "questionCount": 1,
      "skills": [
        "逆推",
        "位值"
      ],
      "moduleId": "A",
      "moduleKey": "mental_math"
    },
    {
      "key": "inverse_operation",
      "name": "逆运算",
      "questionCount": 1,
      "skills": [
        "逆推",
        "运算关系"
      ],
      "moduleId": "A",
      "moduleKey": "mental_math"
    },
    {
      "key": "pairing_mental_math",
      "name": "配对巧算",
      "questionCount": 1,
      "skills": [
        "配对",
        "奇偶",
        "数感"
      ],
      "moduleId": "A",
      "moduleKey": "mental_math"
    },
    {
      "key": "reorder_calculation",
      "name": "重组巧算",
      "questionCount": 1,
      "skills": [
        "重组",
        "凑整",
        "数感"
      ],
      "moduleId": "A",
      "moduleKey": "mental_math"
    },
    {
      "key": "double_sequence_pattern",
      "name": "双序列规律",
      "questionCount": 2,
      "skills": [
        "双序列",
        "规律"
      ],
      "moduleId": "B",
      "moduleKey": "patterns"
    },
    {
      "key": "triangular_number",
      "name": "三角数",
      "questionCount": 1,
      "skills": [
        "递推",
        "图形数"
      ],
      "moduleId": "B",
      "moduleKey": "patterns"
    },
    {
      "key": "alternating_sequence",
      "name": "交错数列",
      "questionCount": 1,
      "skills": [
        "规律",
        "拆列观察"
      ],
      "moduleId": "B",
      "moduleKey": "patterns"
    },
    {
      "key": "dynamic_rule",
      "name": "动态规则",
      "questionCount": 1,
      "skills": [
        "动态观察",
        "机械推理"
      ],
      "moduleId": "B",
      "moduleKey": "patterns"
    },
    {
      "key": "periodic_recursion",
      "name": "周期递推",
      "questionCount": 1,
      "skills": [
        "周期",
        "递推"
      ],
      "moduleId": "B",
      "moduleKey": "patterns"
    },
    {
      "key": "shape_pattern",
      "name": "图形规律",
      "questionCount": 1,
      "skills": [
        "观察",
        "规律"
      ],
      "moduleId": "B",
      "moduleKey": "patterns"
    },
    {
      "key": "shape_recursion",
      "name": "图形递推",
      "questionCount": 1,
      "skills": [
        "规律",
        "图形观察"
      ],
      "moduleId": "B",
      "moduleKey": "patterns"
    },
    {
      "key": "visual_rule",
      "name": "图示规则",
      "questionCount": 1,
      "skills": [
        "读图",
        "规则迁移"
      ],
      "moduleId": "B",
      "moduleKey": "patterns"
    },
    {
      "key": "number_line_recursion",
      "name": "数轴递推",
      "questionCount": 1,
      "skills": [
        "数轴",
        "步长"
      ],
      "moduleId": "B",
      "moduleKey": "patterns"
    },
    {
      "key": "adjacent_sum_sequence",
      "name": "相邻和数列",
      "questionCount": 1,
      "skills": [
        "递推",
        "相邻关系"
      ],
      "moduleId": "B",
      "moduleKey": "patterns"
    },
    {
      "key": "spatial_recursion",
      "name": "空间递推",
      "questionCount": 1,
      "skills": [
        "空间",
        "递推"
      ],
      "moduleId": "B",
      "moduleKey": "patterns"
    },
    {
      "key": "rule_system",
      "name": "规则系统",
      "questionCount": 1,
      "skills": [
        "系统规则",
        "推理"
      ],
      "moduleId": "B",
      "moduleKey": "patterns"
    },
    {
      "key": "carry_rule",
      "name": "进位规则",
      "questionCount": 1,
      "skills": [
        "进位",
        "规则"
      ],
      "moduleId": "B",
      "moduleKey": "patterns"
    },
    {
      "key": "stair_recursion",
      "name": "递推楼梯",
      "questionCount": 1,
      "skills": [
        "递推",
        "分步计算"
      ],
      "moduleId": "B",
      "moduleKey": "patterns"
    },
    {
      "key": "enumeration_count",
      "name": "枚举计数",
      "questionCount": 2,
      "skills": [
        "枚举",
        "去重"
      ],
      "moduleId": "C",
      "moduleKey": "counting_and_construct"
    },
    {
      "key": "position_count",
      "name": "位置计数",
      "questionCount": 1,
      "skills": [
        "位置",
        "计数"
      ],
      "moduleId": "C",
      "moduleKey": "counting_and_construct"
    },
    {
      "key": "interval_count",
      "name": "区间计数",
      "questionCount": 1,
      "skills": [
        "区间",
        "数感"
      ],
      "moduleId": "C",
      "moduleKey": "counting_and_construct"
    },
    {
      "key": "number_sense_count",
      "name": "数感计数",
      "questionCount": 1,
      "skills": [
        "数感",
        "计数"
      ],
      "moduleId": "C",
      "moduleKey": "counting_and_construct"
    },
    {
      "key": "extreme_value_construction",
      "name": "最值构造",
      "questionCount": 1,
      "skills": [
        "最值",
        "构造"
      ],
      "moduleId": "C",
      "moduleKey": "counting_and_construct"
    },
    {
      "key": "maximum_number_construction",
      "name": "最大数构造",
      "questionCount": 1,
      "skills": [
        "数位",
        "最大值"
      ],
      "moduleId": "C",
      "moduleKey": "counting_and_construct"
    },
    {
      "key": "minimum_number_construction",
      "name": "最小数构造",
      "questionCount": 1,
      "skills": [
        "数位",
        "最小值"
      ],
      "moduleId": "C",
      "moduleKey": "counting_and_construct"
    },
    {
      "key": "enumeration_construction",
      "name": "枚举构造",
      "questionCount": 1,
      "skills": [
        "枚举",
        "构造"
      ],
      "moduleId": "C",
      "moduleKey": "counting_and_construct"
    },
    {
      "key": "combination_count",
      "name": "组合计数",
      "questionCount": 1,
      "skills": [
        "组合",
        "分类"
      ],
      "moduleId": "C",
      "moduleKey": "counting_and_construct"
    },
    {
      "key": "pair_count",
      "name": "配对计数",
      "questionCount": 1,
      "skills": [
        "配对",
        "去重"
      ],
      "moduleId": "C",
      "moduleKey": "counting_and_construct"
    },
    {
      "key": "queue_total",
      "name": "队列总数",
      "questionCount": 1,
      "skills": [
        "排队",
        "总数"
      ],
      "moduleId": "C",
      "moduleKey": "counting_and_construct"
    },
    {
      "key": "sum_difference_relation",
      "name": "和差关系",
      "questionCount": 2,
      "skills": [
        "和差",
        "比较"
      ],
      "moduleId": "D",
      "moduleKey": "equivalence_and_balance"
    },
    {
      "key": "shape_substitution",
      "name": "图形代换",
      "questionCount": 2,
      "skills": [
        "代换",
        "等量关系"
      ],
      "moduleId": "D",
      "moduleKey": "equivalence_and_balance"
    },
    {
      "key": "two_variable_substitution",
      "name": "二元代换",
      "questionCount": 1,
      "skills": [
        "代换",
        "消元"
      ],
      "moduleId": "D",
      "moduleKey": "equivalence_and_balance"
    },
    {
      "key": "half_the_difference",
      "name": "差的一半",
      "questionCount": 1,
      "skills": [
        "和差",
        "平衡"
      ],
      "moduleId": "D",
      "moduleKey": "equivalence_and_balance"
    },
    {
      "key": "age_relation",
      "name": "年龄关系",
      "questionCount": 1,
      "skills": [
        "年龄",
        "差量"
      ],
      "moduleId": "D",
      "moduleKey": "equivalence_and_balance"
    },
    {
      "key": "move_balance",
      "name": "移动平衡",
      "questionCount": 1,
      "skills": [
        "平衡",
        "差的一半"
      ],
      "moduleId": "D",
      "moduleKey": "equivalence_and_balance"
    },
    {
      "key": "vertical_substitution",
      "name": "竖式代换",
      "questionCount": 1,
      "skills": [
        "竖式",
        "代换"
      ],
      "moduleId": "D",
      "moduleKey": "equivalence_and_balance"
    },
    {
      "key": "equivalent_exchange",
      "name": "等价兑换",
      "questionCount": 1,
      "skills": [
        "等价",
        "链式代换"
      ],
      "moduleId": "D",
      "moduleKey": "equivalence_and_balance"
    },
    {
      "key": "equal_increment",
      "name": "等量增加",
      "questionCount": 1,
      "skills": [
        "平衡",
        "等量变化"
      ],
      "moduleId": "D",
      "moduleKey": "equivalence_and_balance"
    },
    {
      "key": "at_least_plus_one",
      "name": "至少多1",
      "questionCount": 1,
      "skills": [
        "比较",
        "至少"
      ],
      "moduleId": "D",
      "moduleKey": "equivalence_and_balance"
    },
    {
      "key": "count_points",
      "name": "数点",
      "questionCount": 2,
      "skills": [
        "观察",
        "计数"
      ],
      "moduleId": "E",
      "moduleKey": "plane_geometry_counting"
    },
    {
      "key": "plane_fill_tiles",
      "name": "平面补块",
      "questionCount": 1,
      "skills": [
        "覆盖",
        "补块"
      ],
      "moduleId": "E",
      "moduleKey": "plane_geometry_counting"
    },
    {
      "key": "plane_covering",
      "name": "平面覆盖",
      "questionCount": 1,
      "skills": [
        "覆盖",
        "双色图案"
      ],
      "moduleId": "E",
      "moduleKey": "plane_geometry_counting"
    },
    {
      "key": "count_squares",
      "name": "数正方形",
      "questionCount": 1,
      "skills": [
        "分类计数",
        "平面图形"
      ],
      "moduleId": "E",
      "moduleKey": "plane_geometry_counting"
    },
    {
      "key": "count_segments",
      "name": "数线段",
      "questionCount": 1,
      "skills": [
        "分类计数",
        "图形观察"
      ],
      "moduleId": "E",
      "moduleKey": "plane_geometry_counting"
    },
    {
      "key": "fill_missing_shape",
      "name": "缺口补图",
      "questionCount": 1,
      "skills": [
        "补图",
        "图形观察"
      ],
      "moduleId": "E",
      "moduleKey": "plane_geometry_counting"
    },
    {
      "key": "opposite_face",
      "name": "对面判断",
      "questionCount": 2,
      "skills": [
        "空间想象",
        "相对面"
      ],
      "moduleId": "F",
      "moduleKey": "spatial_reasoning"
    },
    {
      "key": "stacked_cube_count",
      "name": "堆叠计数",
      "questionCount": 1,
      "skills": [
        "空间",
        "分层计数"
      ],
      "moduleId": "F",
      "moduleKey": "spatial_reasoning"
    },
    {
      "key": "net_recognition",
      "name": "展开图判断",
      "questionCount": 1,
      "skills": [
        "空间想象",
        "展开图"
      ],
      "moduleId": "F",
      "moduleKey": "spatial_reasoning"
    },
    {
      "key": "fold_and_cut",
      "name": "折叠切分",
      "questionCount": 1,
      "skills": [
        "折叠",
        "切分"
      ],
      "moduleId": "F",
      "moduleKey": "spatial_reasoning"
    },
    {
      "key": "spatial_position",
      "name": "方位位置",
      "questionCount": 1,
      "skills": [
        "方位",
        "空间认知"
      ],
      "moduleId": "F",
      "moduleKey": "spatial_reasoning"
    },
    {
      "key": "solid_basics",
      "name": "立体基础",
      "questionCount": 1,
      "skills": [
        "立体认知",
        "几何基础"
      ],
      "moduleId": "F",
      "moduleKey": "spatial_reasoning"
    },
    {
      "key": "overlay_symmetry",
      "name": "覆盖与对称",
      "questionCount": 1,
      "skills": [
        "覆盖",
        "对称"
      ],
      "moduleId": "F",
      "moduleKey": "spatial_reasoning"
    },
    {
      "key": "hidden_block_count",
      "name": "遮挡计数",
      "questionCount": 1,
      "skills": [
        "空间",
        "遮挡"
      ],
      "moduleId": "F",
      "moduleKey": "spatial_reasoning"
    },
    {
      "key": "regional_equal_sum",
      "name": "区域等和",
      "questionCount": 1,
      "skills": [
        "区域约束",
        "等和"
      ],
      "moduleId": "G",
      "moduleKey": "logic_puzzles"
    },
    {
      "key": "fill_operators",
      "name": "填符号",
      "questionCount": 1,
      "skills": [
        "试填",
        "符号推理"
      ],
      "moduleId": "G",
      "moduleKey": "logic_puzzles"
    },
    {
      "key": "optimize_operators",
      "name": "最优化填符号",
      "questionCount": 1,
      "skills": [
        "最优化",
        "符号推理"
      ],
      "moduleId": "G",
      "moduleKey": "logic_puzzles"
    },
    {
      "key": "equal_sum_triangle",
      "name": "等和三角",
      "questionCount": 1,
      "skills": [
        "等和",
        "结构观察"
      ],
      "moduleId": "G",
      "moduleKey": "logic_puzzles"
    },
    {
      "key": "equal_sum_graph",
      "name": "等和图",
      "questionCount": 1,
      "skills": [
        "等和",
        "试填"
      ],
      "moduleId": "G",
      "moduleKey": "logic_puzzles"
    },
    {
      "key": "equal_sum_fill",
      "name": "等和填数",
      "questionCount": 1,
      "skills": [
        "等和",
        "填数"
      ],
      "moduleId": "G",
      "moduleKey": "logic_puzzles"
    },
    {
      "key": "logic_grid_fill",
      "name": "逻辑填数",
      "questionCount": 1,
      "skills": [
        "排除法",
        "约束推理",
        "数感"
      ],
      "moduleId": "G",
      "moduleKey": "logic_puzzles"
    }
  ],
  "developmentPriority": {
    "phase1ModuleIds": [
      "A",
      "B",
      "C",
      "D"
    ],
    "phase2ModuleIds": [
      "F",
      "G"
    ],
    "phase3ModuleIds": [
      "E"
    ],
    "highFrequencySubtypes": [
      "同项抵消/凑整",
      "双序列找规律",
      "图示规则迁移",
      "握手/配对计数",
      "组数与最值构造",
      "差的一半/移物平衡",
      "图形代换",
      "数点/数线段/数正方形",
      "小正方体遮挡计数",
      "正方体对面判断",
      "等和三角/等和图",
      "填符号使结果最大或使等式成立"
    ],
    "levelRoadmap": [
      {
        "range": "Lv1-Lv2",
        "focus": [
          "基础口算",
          "基础规律",
          "基础枚举"
        ]
      },
      {
        "range": "Lv3-Lv4",
        "focus": [
          "图示规律",
          "图形代换",
          "数点/数方块"
        ]
      },
      {
        "range": "Lv5-Lv6",
        "focus": [
          "展开图",
          "遮挡计数",
          "等和三角"
        ]
      },
      {
        "range": "Lv7-Lv8",
        "focus": [
          "符号填空",
          "复杂逻辑填数",
          "机制动态题（齿轮/数码管）"
        ]
      }
    ],
    "top20PlayableQuestionIds": [
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
    ]
  },
  "uiPresets": {
    "roomNames": [
      "快算王",
      "找规律",
      "排列组合屋",
      "配平高手",
      "图形工程师",
      "空间大师",
      "逻辑神探"
    ],
    "storyChannelName": "生活故事场",
    "defaultTheme": "闯关",
    "suggestedPlayModes": [
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
    ]
  },
  "storyChannels": [
    {
      "questionId": "34W-2",
      "storyTheme": "学校课堂",
      "title": "记蔬菜至少超过同学"
    },
    {
      "questionId": "34W-5",
      "storyTheme": "森林故事",
      "title": "兔子拔胡萝卜"
    },
    {
      "questionId": "34W-9",
      "storyTheme": "生活日历",
      "title": "网购鞋子到货日期"
    },
    {
      "questionId": "34W-10",
      "storyTheme": "动画电视",
      "title": "追剧漏看集数"
    },
    {
      "questionId": "34W-13",
      "storyTheme": "古代商店",
      "title": "贝币换算"
    },
    {
      "questionId": "34W-14",
      "storyTheme": "小工坊",
      "title": "剪布做汉服"
    },
    {
      "questionId": "34W-16",
      "storyTheme": "餐厅配菜",
      "title": "点餐一荤一素"
    },
    {
      "questionId": "34W-17",
      "storyTheme": "家庭年龄",
      "title": "爷爷、爸爸、妙妙年龄"
    },
    {
      "questionId": "35Y-12",
      "storyTheme": "小实验",
      "title": "油桶加油"
    },
    {
      "questionId": "35Y-15",
      "storyTheme": "水果商店",
      "title": "西瓜苹果糖果兑换"
    },
    {
      "questionId": "36Y-13",
      "storyTheme": "水果超市",
      "title": "南瓜香蕉橘子价格"
    },
    {
      "questionId": "36Y-15",
      "storyTheme": "校园排队",
      "title": "一排站队人数"
    }
  ],
  "questions": [
    {
      "id": "34W-4",
      "paper": "34W",
      "paperMeta": {
        "name": "34届WMO一年级初测",
        "org": "WMO",
        "grade": "一年级",
        "stage": "初测"
      },
      "qid": 4,
      "title": "31减一位数，十位个位交换后逆推正确结果",
      "moduleId": "A",
      "moduleKey": "mental_math",
      "moduleName": "快算巧算 / 逆运算",
      "roomName": "快算王",
      "subtype": "逆推计算",
      "subtypeKey": "reverse_calculation",
      "difficulty": 2,
      "difficultyLabel": "基础",
      "interactionLabel": [
        "单选",
        "输入"
      ],
      "interaction": [
        "single_choice",
        "text_input"
      ],
      "theme": "闯关",
      "skills": [
        "逆推",
        "位值"
      ],
      "tags": [
        "34W",
        "A",
        "mental_math",
        "reverse_calculation",
        "difficulty_2"
      ],
      "asset": {
        "promptText": "31减一位数，十位个位交换后逆推正确结果",
        "imageKey": "34W-4",
        "audioKey": null
      },
      "status": "ready_for_content_entry"
    },
    {
      "id": "34W-9",
      "paper": "34W",
      "paperMeta": {
        "name": "34届WMO一年级初测",
        "org": "WMO",
        "grade": "一年级",
        "stage": "初测"
      },
      "qid": 9,
      "title": "11月11日后三天是几号",
      "moduleId": "A",
      "moduleKey": "mental_math",
      "moduleName": "快算巧算 / 逆运算",
      "roomName": "快算王",
      "subtype": "日期计算",
      "subtypeKey": "date_calculation",
      "difficulty": 1,
      "difficultyLabel": "入门",
      "interactionLabel": [
        "单选"
      ],
      "interaction": [
        "single_choice"
      ],
      "theme": "闯关",
      "skills": [
        "日期",
        "顺推"
      ],
      "tags": [
        "34W",
        "A",
        "mental_math",
        "date_calculation",
        "difficulty_1"
      ],
      "asset": {
        "promptText": "11月11日后三天是几号",
        "imageKey": "34W-9",
        "audioKey": null
      },
      "status": "ready_for_content_entry"
    },
    {
      "id": "34W-13",
      "paper": "34W",
      "paperMeta": {
        "name": "34届WMO一年级初测",
        "org": "WMO",
        "grade": "一年级",
        "stage": "初测"
      },
      "qid": 13,
      "title": "贝币、串、朋换算",
      "moduleId": "A",
      "moduleKey": "mental_math",
      "moduleName": "快算巧算 / 逆运算",
      "roomName": "快算王",
      "subtype": "单位换算",
      "subtypeKey": "unit_conversion",
      "difficulty": 1,
      "difficultyLabel": "入门",
      "interactionLabel": [
        "单选"
      ],
      "interaction": [
        "single_choice"
      ],
      "theme": "闯关",
      "skills": [
        "等价换算",
        "数感"
      ],
      "tags": [
        "34W",
        "A",
        "mental_math",
        "unit_conversion",
        "difficulty_1"
      ],
      "asset": {
        "promptText": "贝币、串、朋换算",
        "imageKey": "34W-13",
        "audioKey": null
      },
      "status": "ready_for_content_entry"
    },
    {
      "id": "34W-14",
      "paper": "34W",
      "paperMeta": {
        "name": "34届WMO一年级初测",
        "org": "WMO",
        "grade": "一年级",
        "stage": "初测"
      },
      "qid": 14,
      "title": "剪成5小块需要几次、几分钟",
      "moduleId": "A",
      "moduleKey": "mental_math",
      "moduleName": "快算巧算 / 逆运算",
      "roomName": "快算王",
      "subtype": "切割次数",
      "subtypeKey": "cut_count",
      "difficulty": 2,
      "difficultyLabel": "基础",
      "interactionLabel": [
        "单选"
      ],
      "interaction": [
        "single_choice"
      ],
      "theme": "闯关",
      "skills": [
        "操作计数",
        "规律"
      ],
      "tags": [
        "34W",
        "A",
        "mental_math",
        "cut_count",
        "difficulty_2"
      ],
      "asset": {
        "promptText": "剪成5小块需要几次、几分钟",
        "imageKey": "34W-14",
        "audioKey": null
      },
      "status": "ready_for_content_entry"
    },
    {
      "id": "34Y-1",
      "paper": "34Y",
      "paperMeta": {
        "name": "34届YMO一年级初赛",
        "org": "YMO",
        "grade": "一年级",
        "stage": "初赛"
      },
      "qid": 1,
      "title": "128+100-28",
      "moduleId": "A",
      "moduleKey": "mental_math",
      "moduleName": "快算巧算 / 逆运算",
      "roomName": "快算王",
      "subtype": "凑整消项",
      "subtypeKey": "make_ten_cancel",
      "difficulty": 1,
      "difficultyLabel": "入门",
      "interactionLabel": [
        "直接输入"
      ],
      "interaction": [
        "text_input"
      ],
      "theme": "闯关",
      "skills": [
        "数感",
        "凑整",
        "消项"
      ],
      "tags": [
        "34Y",
        "A",
        "mental_math",
        "make_ten_cancel",
        "difficulty_1"
      ],
      "asset": {
        "promptText": "128+100-28",
        "imageKey": "34Y-1",
        "audioKey": null
      },
      "status": "ready_for_content_entry"
    },
    {
      "id": "34Y-2",
      "paper": "34Y",
      "paperMeta": {
        "name": "34届YMO一年级初赛",
        "org": "YMO",
        "grade": "一年级",
        "stage": "初赛"
      },
      "qid": 2,
      "title": "8+45+12-45",
      "moduleId": "A",
      "moduleKey": "mental_math",
      "moduleName": "快算巧算 / 逆运算",
      "roomName": "快算王",
      "subtype": "同项抵消",
      "subtypeKey": "same_term_cancel",
      "difficulty": 1,
      "difficultyLabel": "入门",
      "interactionLabel": [
        "直接输入"
      ],
      "interaction": [
        "text_input"
      ],
      "theme": "闯关",
      "skills": [
        "数感",
        "消项"
      ],
      "tags": [
        "34Y",
        "A",
        "mental_math",
        "same_term_cancel",
        "difficulty_1"
      ],
      "asset": {
        "promptText": "8+45+12-45",
        "imageKey": "34Y-2",
        "audioKey": null
      },
      "status": "ready_for_content_entry"
    },
    {
      "id": "34Y-3",
      "paper": "34Y",
      "paperMeta": {
        "name": "34届YMO一年级初赛",
        "org": "YMO",
        "grade": "一年级",
        "stage": "初赛"
      },
      "qid": 3,
      "title": "20-19+18-17",
      "moduleId": "A",
      "moduleKey": "mental_math",
      "moduleName": "快算巧算 / 逆运算",
      "roomName": "快算王",
      "subtype": "连加连减",
      "subtypeKey": "mixed_add_sub",
      "difficulty": 1,
      "difficultyLabel": "入门",
      "interactionLabel": [
        "直接输入"
      ],
      "interaction": [
        "text_input"
      ],
      "theme": "闯关",
      "skills": [
        "连加连减",
        "数感"
      ],
      "tags": [
        "34Y",
        "A",
        "mental_math",
        "mixed_add_sub",
        "difficulty_1"
      ],
      "asset": {
        "promptText": "20-19+18-17",
        "imageKey": "34Y-3",
        "audioKey": null
      },
      "status": "ready_for_content_entry"
    },
    {
      "id": "34Y-4",
      "paper": "34Y",
      "paperMeta": {
        "name": "34届YMO一年级初赛",
        "org": "YMO",
        "grade": "一年级",
        "stage": "初赛"
      },
      "qid": 4,
      "title": "2+18",
      "moduleId": "A",
      "moduleKey": "mental_math",
      "moduleName": "快算巧算 / 逆运算",
      "roomName": "快算王",
      "subtype": "基础口算",
      "subtypeKey": "basic_mental_math",
      "difficulty": 1,
      "difficultyLabel": "入门",
      "interactionLabel": [
        "直接输入"
      ],
      "interaction": [
        "text_input"
      ],
      "theme": "闯关",
      "skills": [
        "口算",
        "数感"
      ],
      "tags": [
        "34Y",
        "A",
        "mental_math",
        "basic_mental_math",
        "difficulty_1"
      ],
      "asset": {
        "promptText": "2+18",
        "imageKey": "34Y-4",
        "audioKey": null
      },
      "status": "ready_for_content_entry"
    },
    {
      "id": "35Y-1",
      "paper": "35Y",
      "paperMeta": {
        "name": "35届YMO一年级初赛",
        "org": "YMO",
        "grade": "一年级",
        "stage": "初赛"
      },
      "qid": 1,
      "title": "9-8+7-6+5-4",
      "moduleId": "A",
      "moduleKey": "mental_math",
      "moduleName": "快算巧算 / 逆运算",
      "roomName": "快算王",
      "subtype": "交替加减",
      "subtypeKey": "alternating_add_sub",
      "difficulty": 1,
      "difficultyLabel": "入门",
      "interactionLabel": [
        "直接输入"
      ],
      "interaction": [
        "text_input"
      ],
      "theme": "闯关",
      "skills": [
        "观察",
        "数感",
        "运算顺序"
      ],
      "tags": [
        "35Y",
        "A",
        "mental_math",
        "alternating_add_sub",
        "difficulty_1"
      ],
      "asset": {
        "promptText": "9-8+7-6+5-4",
        "imageKey": "35Y-1",
        "audioKey": null
      },
      "status": "ready_for_content_entry"
    },
    {
      "id": "35Y-2",
      "paper": "35Y",
      "paperMeta": {
        "name": "35届YMO一年级初赛",
        "org": "YMO",
        "grade": "一年级",
        "stage": "初赛"
      },
      "qid": 2,
      "title": "1+3+5+…+21",
      "moduleId": "A",
      "moduleKey": "mental_math",
      "moduleName": "快算巧算 / 逆运算",
      "roomName": "快算王",
      "subtype": "奇数求和",
      "subtypeKey": "odd_sum",
      "difficulty": 2,
      "difficultyLabel": "基础",
      "interactionLabel": [
        "直接输入"
      ],
      "interaction": [
        "text_input"
      ],
      "theme": "闯关",
      "skills": [
        "配对",
        "数感",
        "求和"
      ],
      "tags": [
        "35Y",
        "A",
        "mental_math",
        "odd_sum",
        "difficulty_2"
      ],
      "asset": {
        "promptText": "1+3+5+…+21",
        "imageKey": "35Y-2",
        "audioKey": null
      },
      "status": "ready_for_content_entry"
    },
    {
      "id": "35Y-3",
      "paper": "35Y",
      "paperMeta": {
        "name": "35届YMO一年级初赛",
        "org": "YMO",
        "grade": "一年级",
        "stage": "初赛"
      },
      "qid": 3,
      "title": "1+2+4+9+6+8",
      "moduleId": "A",
      "moduleKey": "mental_math",
      "moduleName": "快算巧算 / 逆运算",
      "roomName": "快算王",
      "subtype": "重组巧算",
      "subtypeKey": "reorder_calculation",
      "difficulty": 1,
      "difficultyLabel": "入门",
      "interactionLabel": [
        "直接输入"
      ],
      "interaction": [
        "text_input"
      ],
      "theme": "闯关",
      "skills": [
        "重组",
        "凑整",
        "数感"
      ],
      "tags": [
        "35Y",
        "A",
        "mental_math",
        "reorder_calculation",
        "difficulty_1"
      ],
      "asset": {
        "promptText": "1+2+4+9+6+8",
        "imageKey": "35Y-3",
        "audioKey": null
      },
      "status": "ready_for_content_entry"
    },
    {
      "id": "35Y-4",
      "paper": "35Y",
      "paperMeta": {
        "name": "35届YMO一年级初赛",
        "org": "YMO",
        "grade": "一年级",
        "stage": "初赛"
      },
      "qid": 4,
      "title": "987-99-1-2-98-45-55",
      "moduleId": "A",
      "moduleKey": "mental_math",
      "moduleName": "快算巧算 / 逆运算",
      "roomName": "快算王",
      "subtype": "连减重组",
      "subtypeKey": "subtraction_reorder",
      "difficulty": 2,
      "difficultyLabel": "基础",
      "interactionLabel": [
        "直接输入"
      ],
      "interaction": [
        "text_input"
      ],
      "theme": "闯关",
      "skills": [
        "重组",
        "数感",
        "逆向观察"
      ],
      "tags": [
        "35Y",
        "A",
        "mental_math",
        "subtraction_reorder",
        "difficulty_2"
      ],
      "asset": {
        "promptText": "987-99-1-2-98-45-55",
        "imageKey": "35Y-4",
        "audioKey": null
      },
      "status": "ready_for_content_entry"
    },
    {
      "id": "35Y-16",
      "paper": "35Y",
      "paperMeta": {
        "name": "35届YMO一年级初赛",
        "org": "YMO",
        "grade": "一年级",
        "stage": "初赛"
      },
      "qid": 16,
      "title": "一个数先减5再加18得100",
      "moduleId": "A",
      "moduleKey": "mental_math",
      "moduleName": "快算巧算 / 逆运算",
      "roomName": "快算王",
      "subtype": "逆运算",
      "subtypeKey": "inverse_operation",
      "difficulty": 1,
      "difficultyLabel": "入门",
      "interactionLabel": [
        "直接输入"
      ],
      "interaction": [
        "text_input"
      ],
      "theme": "闯关",
      "skills": [
        "逆推",
        "运算关系"
      ],
      "tags": [
        "35Y",
        "A",
        "mental_math",
        "inverse_operation",
        "difficulty_1"
      ],
      "asset": {
        "promptText": "一个数先减5再加18得100",
        "imageKey": "35Y-16",
        "audioKey": null
      },
      "status": "ready_for_content_entry"
    },
    {
      "id": "35Y-19",
      "paper": "35Y",
      "paperMeta": {
        "name": "35届YMO一年级初赛",
        "org": "YMO",
        "grade": "一年级",
        "stage": "初赛"
      },
      "qid": 19,
      "title": "自定义运算 a△b=a+b-1",
      "moduleId": "A",
      "moduleKey": "mental_math",
      "moduleName": "快算巧算 / 逆运算",
      "roomName": "快算王",
      "subtype": "新运算",
      "subtypeKey": "custom_operation",
      "difficulty": 1,
      "difficultyLabel": "入门",
      "interactionLabel": [
        "单题输入"
      ],
      "interaction": [
        "text_input"
      ],
      "theme": "闯关",
      "skills": [
        "规则理解",
        "代入"
      ],
      "tags": [
        "35Y",
        "A",
        "mental_math",
        "custom_operation",
        "difficulty_1"
      ],
      "asset": {
        "promptText": "自定义运算 a△b=a+b-1",
        "imageKey": "35Y-19",
        "audioKey": null
      },
      "status": "ready_for_content_entry"
    },
    {
      "id": "36Y-1",
      "paper": "36Y",
      "paperMeta": {
        "name": "36届YMO一年级初赛",
        "org": "YMO",
        "grade": "一年级",
        "stage": "初赛"
      },
      "qid": 1,
      "title": "37+18-37+82",
      "moduleId": "A",
      "moduleKey": "mental_math",
      "moduleName": "快算巧算 / 逆运算",
      "roomName": "快算王",
      "subtype": "抵消凑整",
      "subtypeKey": "cancel_and_make_ten",
      "difficulty": 1,
      "difficultyLabel": "入门",
      "interactionLabel": [
        "直接输入"
      ],
      "interaction": [
        "text_input"
      ],
      "theme": "闯关",
      "skills": [
        "凑整",
        "消项",
        "数感"
      ],
      "tags": [
        "36Y",
        "A",
        "mental_math",
        "cancel_and_make_ten",
        "difficulty_1"
      ],
      "asset": {
        "promptText": "37+18-37+82",
        "imageKey": "36Y-1",
        "audioKey": null
      },
      "status": "ready_for_content_entry"
    },
    {
      "id": "36Y-3",
      "paper": "36Y",
      "paperMeta": {
        "name": "36届YMO一年级初赛",
        "org": "YMO",
        "grade": "一年级",
        "stage": "初赛"
      },
      "qid": 3,
      "title": "16-9=( )-9+6",
      "moduleId": "A",
      "moduleKey": "mental_math",
      "moduleName": "快算巧算 / 逆运算",
      "roomName": "快算王",
      "subtype": "破十法",
      "subtypeKey": "break_ten_method",
      "difficulty": 1,
      "difficultyLabel": "入门",
      "interactionLabel": [
        "填空拖拽"
      ],
      "interaction": [
        "drag_blank",
        "text_input"
      ],
      "theme": "闯关",
      "skills": [
        "拆分",
        "破十法",
        "数感"
      ],
      "tags": [
        "36Y",
        "A",
        "mental_math",
        "break_ten_method",
        "difficulty_1"
      ],
      "asset": {
        "promptText": "16-9=( )-9+6",
        "imageKey": "36Y-3",
        "audioKey": null
      },
      "status": "ready_for_content_entry"
    },
    {
      "id": "36Y-13",
      "paper": "36Y",
      "paperMeta": {
        "name": "36届YMO一年级初赛",
        "org": "YMO",
        "grade": "一年级",
        "stage": "初赛"
      },
      "qid": 13,
      "title": "南瓜香蕉橘子价格代换",
      "moduleId": "A",
      "moduleKey": "mental_math",
      "moduleName": "快算巧算 / 逆运算",
      "roomName": "快算王",
      "subtype": "抵消简算",
      "subtypeKey": "cancel_simplify",
      "difficulty": 1,
      "difficultyLabel": "入门",
      "interactionLabel": [
        "直接输入"
      ],
      "interaction": [
        "text_input"
      ],
      "theme": "闯关",
      "skills": [
        "代换",
        "简算"
      ],
      "tags": [
        "36Y",
        "A",
        "mental_math",
        "cancel_simplify",
        "difficulty_1"
      ],
      "asset": {
        "promptText": "南瓜香蕉橘子价格代换",
        "imageKey": "36Y-13",
        "audioKey": null
      },
      "status": "ready_for_content_entry"
    },
    {
      "id": "36Y-17",
      "paper": "36Y",
      "paperMeta": {
        "name": "36届YMO一年级初赛",
        "org": "YMO",
        "grade": "一年级",
        "stage": "初赛"
      },
      "qid": 17,
      "title": "偶数和减奇数和",
      "moduleId": "A",
      "moduleKey": "mental_math",
      "moduleName": "快算巧算 / 逆运算",
      "roomName": "快算王",
      "subtype": "配对巧算",
      "subtypeKey": "pairing_mental_math",
      "difficulty": 2,
      "difficultyLabel": "基础",
      "interactionLabel": [
        "直接输入"
      ],
      "interaction": [
        "text_input"
      ],
      "theme": "闯关",
      "skills": [
        "配对",
        "奇偶",
        "数感"
      ],
      "tags": [
        "36Y",
        "A",
        "mental_math",
        "pairing_mental_math",
        "difficulty_2"
      ],
      "asset": {
        "promptText": "偶数和减奇数和",
        "imageKey": "36Y-17",
        "audioKey": null
      },
      "status": "ready_for_content_entry"
    },
    {
      "id": "34W-6",
      "paper": "34W",
      "paperMeta": {
        "name": "34届WMO一年级初测",
        "org": "WMO",
        "grade": "一年级",
        "stage": "初测"
      },
      "qid": 6,
      "title": "损坏数码管下，1到30不能正确显示多少层",
      "moduleId": "B",
      "moduleKey": "patterns",
      "moduleName": "规律 / 递推 / 系统规则",
      "roomName": "找规律",
      "subtype": "规则系统",
      "subtypeKey": "rule_system",
      "difficulty": 4,
      "difficultyLabel": "挑战",
      "interactionLabel": [
        "单选"
      ],
      "interaction": [
        "single_choice"
      ],
      "theme": "闯关",
      "skills": [
        "系统规则",
        "推理"
      ],
      "tags": [
        "34W",
        "B",
        "patterns",
        "rule_system",
        "difficulty_4"
      ],
      "asset": {
        "promptText": "损坏数码管下，1到30不能正确显示多少层",
        "imageKey": "34W-6",
        "audioKey": null
      },
      "status": "ready_for_content_entry"
    },
    {
      "id": "34W-8",
      "paper": "34W",
      "paperMeta": {
        "name": "34届WMO一年级初测",
        "org": "WMO",
        "grade": "一年级",
        "stage": "初测"
      },
      "qid": 8,
      "title": "图形规律选择问号处",
      "moduleId": "B",
      "moduleKey": "patterns",
      "moduleName": "规律 / 递推 / 系统规则",
      "roomName": "找规律",
      "subtype": "图形规律",
      "subtypeKey": "shape_pattern",
      "difficulty": 2,
      "difficultyLabel": "基础",
      "interactionLabel": [
        "单选"
      ],
      "interaction": [
        "single_choice"
      ],
      "theme": "闯关",
      "skills": [
        "观察",
        "规律"
      ],
      "tags": [
        "34W",
        "B",
        "patterns",
        "shape_pattern",
        "difficulty_2"
      ],
      "asset": {
        "promptText": "图形规律选择问号处",
        "imageKey": "34W-8",
        "audioKey": null
      },
      "status": "ready_for_content_entry"
    },
    {
      "id": "34W-15",
      "paper": "34W",
      "paperMeta": {
        "name": "34届WMO一年级初测",
        "org": "WMO",
        "grade": "一年级",
        "stage": "初测"
      },
      "qid": 15,
      "title": "结绳计数，满七进一",
      "moduleId": "B",
      "moduleKey": "patterns",
      "moduleName": "规律 / 递推 / 系统规则",
      "roomName": "找规律",
      "subtype": "进位规则",
      "subtypeKey": "carry_rule",
      "difficulty": 3,
      "difficultyLabel": "进阶",
      "interactionLabel": [
        "单选"
      ],
      "interaction": [
        "single_choice"
      ],
      "theme": "闯关",
      "skills": [
        "进位",
        "规则"
      ],
      "tags": [
        "34W",
        "B",
        "patterns",
        "carry_rule",
        "difficulty_3"
      ],
      "asset": {
        "promptText": "结绳计数，满七进一",
        "imageKey": "34W-15",
        "audioKey": null
      },
      "status": "ready_for_content_entry"
    },
    {
      "id": "34W-18",
      "paper": "34W",
      "paperMeta": {
        "name": "34届WMO一年级初测",
        "org": "WMO",
        "grade": "一年级",
        "stage": "初测"
      },
      "qid": 18,
      "title": "1个、2个正方体可见正方形数，推3个、4个",
      "moduleId": "B",
      "moduleKey": "patterns",
      "moduleName": "规律 / 递推 / 系统规则",
      "roomName": "找规律",
      "subtype": "空间递推",
      "subtypeKey": "spatial_recursion",
      "difficulty": 2,
      "difficultyLabel": "基础",
      "interactionLabel": [
        "填空",
        "动画"
      ],
      "interaction": [
        "fill_blank",
        "step_animation"
      ],
      "theme": "闯关",
      "skills": [
        "空间",
        "递推"
      ],
      "tags": [
        "34W",
        "B",
        "patterns",
        "spatial_recursion",
        "difficulty_2"
      ],
      "asset": {
        "promptText": "1个、2个正方体可见正方形数，推3个、4个",
        "imageKey": "34W-18",
        "audioKey": null
      },
      "status": "ready_for_content_entry"
    },
    {
      "id": "34W-20",
      "paper": "34W",
      "paperMeta": {
        "name": "34届WMO一年级初测",
        "org": "WMO",
        "grade": "一年级",
        "stage": "初测"
      },
      "qid": 20,
      "title": "齿轮转动后哪个方块先碰到",
      "moduleId": "B",
      "moduleKey": "patterns",
      "moduleName": "规律 / 递推 / 系统规则",
      "roomName": "找规律",
      "subtype": "动态规则",
      "subtypeKey": "dynamic_rule",
      "difficulty": 4,
      "difficultyLabel": "挑战",
      "interactionLabel": [
        "动画单选"
      ],
      "interaction": [
        "animation_demo",
        "single_choice"
      ],
      "theme": "闯关",
      "skills": [
        "动态观察",
        "机械推理"
      ],
      "tags": [
        "34W",
        "B",
        "patterns",
        "dynamic_rule",
        "difficulty_4"
      ],
      "asset": {
        "promptText": "齿轮转动后哪个方块先碰到",
        "imageKey": "34W-20",
        "audioKey": null
      },
      "status": "ready_for_content_entry"
    },
    {
      "id": "34Y-7",
      "paper": "34Y",
      "paperMeta": {
        "name": "34届YMO一年级初赛",
        "org": "YMO",
        "grade": "一年级",
        "stage": "初赛"
      },
      "qid": 7,
      "title": "1,4,3,9,5,16,7,( ),9,36,11",
      "moduleId": "B",
      "moduleKey": "patterns",
      "moduleName": "规律 / 递推 / 系统规则",
      "roomName": "找规律",
      "subtype": "交错数列",
      "subtypeKey": "alternating_sequence",
      "difficulty": 2,
      "difficultyLabel": "基础",
      "interactionLabel": [
        "填空"
      ],
      "interaction": [
        "fill_blank"
      ],
      "theme": "闯关",
      "skills": [
        "规律",
        "拆列观察"
      ],
      "tags": [
        "34Y",
        "B",
        "patterns",
        "alternating_sequence",
        "difficulty_2"
      ],
      "asset": {
        "promptText": "1,4,3,9,5,16,7,( ),9,36,11",
        "imageKey": "34Y-7",
        "audioKey": null
      },
      "status": "ready_for_content_entry"
    },
    {
      "id": "34Y-10",
      "paper": "34Y",
      "paperMeta": {
        "name": "34届YMO一年级初赛",
        "org": "YMO",
        "grade": "一年级",
        "stage": "初赛"
      },
      "qid": 10,
      "title": "火柴房子第10个图有几根火柴",
      "moduleId": "B",
      "moduleKey": "patterns",
      "moduleName": "规律 / 递推 / 系统规则",
      "roomName": "找规律",
      "subtype": "图形递推",
      "subtypeKey": "shape_recursion",
      "difficulty": 3,
      "difficultyLabel": "进阶",
      "interactionLabel": [
        "点击计数",
        "输入"
      ],
      "interaction": [
        "click_count",
        "text_input"
      ],
      "theme": "闯关",
      "skills": [
        "规律",
        "图形观察"
      ],
      "tags": [
        "34Y",
        "B",
        "patterns",
        "shape_recursion",
        "difficulty_3"
      ],
      "asset": {
        "promptText": "火柴房子第10个图有几根火柴",
        "imageKey": "34Y-10",
        "audioKey": null
      },
      "status": "ready_for_content_entry"
    },
    {
      "id": "34Y-19",
      "paper": "34Y",
      "paperMeta": {
        "name": "34届YMO一年级初赛",
        "org": "YMO",
        "grade": "一年级",
        "stage": "初赛"
      },
      "qid": 19,
      "title": "蚂蚁爬井，第5天爬4米到井口",
      "moduleId": "B",
      "moduleKey": "patterns",
      "moduleName": "规律 / 递推 / 系统规则",
      "roomName": "找规律",
      "subtype": "周期递推",
      "subtypeKey": "periodic_recursion",
      "difficulty": 3,
      "difficultyLabel": "进阶",
      "interactionLabel": [
        "分步动画"
      ],
      "interaction": [
        "step_animation"
      ],
      "theme": "闯关",
      "skills": [
        "周期",
        "递推"
      ],
      "tags": [
        "34Y",
        "B",
        "patterns",
        "periodic_recursion",
        "difficulty_3"
      ],
      "asset": {
        "promptText": "蚂蚁爬井，第5天爬4米到井口",
        "imageKey": "34Y-19",
        "audioKey": null
      },
      "status": "ready_for_content_entry"
    },
    {
      "id": "35Y-5",
      "paper": "35Y",
      "paperMeta": {
        "name": "35届YMO一年级初赛",
        "org": "YMO",
        "grade": "一年级",
        "stage": "初赛"
      },
      "qid": 5,
      "title": "蚂蚱从0开始每次跳4格，第3次落点",
      "moduleId": "B",
      "moduleKey": "patterns",
      "moduleName": "规律 / 递推 / 系统规则",
      "roomName": "找规律",
      "subtype": "数轴递推",
      "subtypeKey": "number_line_recursion",
      "difficulty": 1,
      "difficultyLabel": "入门",
      "interactionLabel": [
        "数轴点击"
      ],
      "interaction": [
        "number_line_tap"
      ],
      "theme": "闯关",
      "skills": [
        "数轴",
        "步长"
      ],
      "tags": [
        "35Y",
        "B",
        "patterns",
        "number_line_recursion",
        "difficulty_1"
      ],
      "asset": {
        "promptText": "蚂蚱从0开始每次跳4格，第3次落点",
        "imageKey": "35Y-5",
        "audioKey": null
      },
      "status": "ready_for_content_entry"
    },
    {
      "id": "35Y-6",
      "paper": "35Y",
      "paperMeta": {
        "name": "35届YMO一年级初赛",
        "org": "YMO",
        "grade": "一年级",
        "stage": "初赛"
      },
      "qid": 6,
      "title": "19,8,16,4,13,2,10,1,( )",
      "moduleId": "B",
      "moduleKey": "patterns",
      "moduleName": "规律 / 递推 / 系统规则",
      "roomName": "找规律",
      "subtype": "双序列规律",
      "subtypeKey": "double_sequence_pattern",
      "difficulty": 2,
      "difficultyLabel": "基础",
      "interactionLabel": [
        "填空"
      ],
      "interaction": [
        "fill_blank"
      ],
      "theme": "闯关",
      "skills": [
        "双序列",
        "规律"
      ],
      "tags": [
        "35Y",
        "B",
        "patterns",
        "double_sequence_pattern",
        "difficulty_2"
      ],
      "asset": {
        "promptText": "19,8,16,4,13,2,10,1,( )",
        "imageKey": "35Y-6",
        "audioKey": null
      },
      "status": "ready_for_content_entry"
    },
    {
      "id": "35Y-8",
      "paper": "35Y",
      "paperMeta": {
        "name": "35届YMO一年级初赛",
        "org": "YMO",
        "grade": "一年级",
        "stage": "初赛"
      },
      "qid": 8,
      "title": "正方形中小球个数1,3,6,10,…第8个",
      "moduleId": "B",
      "moduleKey": "patterns",
      "moduleName": "规律 / 递推 / 系统规则",
      "roomName": "找规律",
      "subtype": "三角数",
      "subtypeKey": "triangular_number",
      "difficulty": 2,
      "difficultyLabel": "基础",
      "interactionLabel": [
        "图形补空"
      ],
      "interaction": [
        "drag_shape"
      ],
      "theme": "闯关",
      "skills": [
        "递推",
        "图形数"
      ],
      "tags": [
        "35Y",
        "B",
        "patterns",
        "triangular_number",
        "difficulty_2"
      ],
      "asset": {
        "promptText": "正方形中小球个数1,3,6,10,…第8个",
        "imageKey": "35Y-8",
        "audioKey": null
      },
      "status": "ready_for_content_entry"
    },
    {
      "id": "35Y-14",
      "paper": "35Y",
      "paperMeta": {
        "name": "35届YMO一年级初赛",
        "org": "YMO",
        "grade": "一年级",
        "stage": "初赛"
      },
      "qid": 14,
      "title": "89,55,34,21,13,( )",
      "moduleId": "B",
      "moduleKey": "patterns",
      "moduleName": "规律 / 递推 / 系统规则",
      "roomName": "找规律",
      "subtype": "相邻和数列",
      "subtypeKey": "adjacent_sum_sequence",
      "difficulty": 2,
      "difficultyLabel": "基础",
      "interactionLabel": [
        "填空"
      ],
      "interaction": [
        "fill_blank"
      ],
      "theme": "闯关",
      "skills": [
        "递推",
        "相邻关系"
      ],
      "tags": [
        "35Y",
        "B",
        "patterns",
        "adjacent_sum_sequence",
        "difficulty_2"
      ],
      "asset": {
        "promptText": "89,55,34,21,13,( )",
        "imageKey": "35Y-14",
        "audioKey": null
      },
      "status": "ready_for_content_entry"
    },
    {
      "id": "36Y-2",
      "paper": "36Y",
      "paperMeta": {
        "name": "36届YMO一年级初赛",
        "org": "YMO",
        "grade": "一年级",
        "stage": "初赛"
      },
      "qid": 2,
      "title": "3,20,6,18,9,16,12,14,( ),12",
      "moduleId": "B",
      "moduleKey": "patterns",
      "moduleName": "规律 / 递推 / 系统规则",
      "roomName": "找规律",
      "subtype": "双序列规律",
      "subtypeKey": "double_sequence_pattern",
      "difficulty": 2,
      "difficultyLabel": "基础",
      "interactionLabel": [
        "填空"
      ],
      "interaction": [
        "fill_blank"
      ],
      "theme": "闯关",
      "skills": [
        "双序列",
        "规律"
      ],
      "tags": [
        "36Y",
        "B",
        "patterns",
        "double_sequence_pattern",
        "difficulty_2"
      ],
      "asset": {
        "promptText": "3,20,6,18,9,16,12,14,( ),12",
        "imageKey": "36Y-2",
        "audioKey": null
      },
      "status": "ready_for_content_entry"
    },
    {
      "id": "36Y-5",
      "paper": "36Y",
      "paperMeta": {
        "name": "36届YMO一年级初赛",
        "org": "YMO",
        "grade": "一年级",
        "stage": "初赛"
      },
      "qid": 5,
      "title": "根据前两个图示推断第三个问号",
      "moduleId": "B",
      "moduleKey": "patterns",
      "moduleName": "规律 / 递推 / 系统规则",
      "roomName": "找规律",
      "subtype": "图示规则",
      "subtypeKey": "visual_rule",
      "difficulty": 2,
      "difficultyLabel": "基础",
      "interactionLabel": [
        "拖拽",
        "选择"
      ],
      "interaction": [
        "drag_drop",
        "single_choice"
      ],
      "theme": "闯关",
      "skills": [
        "读图",
        "规则迁移"
      ],
      "tags": [
        "36Y",
        "B",
        "patterns",
        "visual_rule",
        "difficulty_2"
      ],
      "asset": {
        "promptText": "根据前两个图示推断第三个问号",
        "imageKey": "36Y-5",
        "audioKey": null
      },
      "status": "ready_for_content_entry"
    },
    {
      "id": "36Y-6",
      "paper": "36Y",
      "paperMeta": {
        "name": "36届YMO一年级初赛",
        "org": "YMO",
        "grade": "一年级",
        "stage": "初赛"
      },
      "qid": 6,
      "title": "楼梯从下往上算到最上面",
      "moduleId": "B",
      "moduleKey": "patterns",
      "moduleName": "规律 / 递推 / 系统规则",
      "roomName": "找规律",
      "subtype": "递推楼梯",
      "subtypeKey": "stair_recursion",
      "difficulty": 2,
      "difficultyLabel": "基础",
      "interactionLabel": [
        "动画递推"
      ],
      "interaction": [
        "step_animation"
      ],
      "theme": "闯关",
      "skills": [
        "递推",
        "分步计算"
      ],
      "tags": [
        "36Y",
        "B",
        "patterns",
        "stair_recursion",
        "difficulty_2"
      ],
      "asset": {
        "promptText": "楼梯从下往上算到最上面",
        "imageKey": "36Y-6",
        "audioKey": null
      },
      "status": "ready_for_content_entry"
    },
    {
      "id": "34W-7",
      "paper": "34W",
      "paperMeta": {
        "name": "34届WMO一年级初测",
        "org": "WMO",
        "grade": "一年级",
        "stage": "初测"
      },
      "qid": 7,
      "title": "脸谱左右可站的位置共有几种",
      "moduleId": "C",
      "moduleKey": "counting_and_construct",
      "moduleName": "枚举计数 / 组合 / 最值",
      "roomName": "排列组合屋",
      "subtype": "位置计数",
      "subtypeKey": "position_count",
      "difficulty": 2,
      "difficultyLabel": "基础",
      "interactionLabel": [
        "单选"
      ],
      "interaction": [
        "single_choice"
      ],
      "theme": "闯关",
      "skills": [
        "位置",
        "计数"
      ],
      "tags": [
        "34W",
        "C",
        "counting_and_construct",
        "position_count",
        "difficulty_2"
      ],
      "asset": {
        "promptText": "脸谱左右可站的位置共有几种",
        "imageKey": "34W-7",
        "audioKey": null
      },
      "status": "ready_for_content_entry"
    },
    {
      "id": "34W-10",
      "paper": "34W",
      "paperMeta": {
        "name": "34届WMO一年级初测",
        "org": "WMO",
        "grade": "一年级",
        "stage": "初测"
      },
      "qid": 10,
      "title": "从第5集直接跳到第16集，中间没看几集",
      "moduleId": "C",
      "moduleKey": "counting_and_construct",
      "moduleName": "枚举计数 / 组合 / 最值",
      "roomName": "排列组合屋",
      "subtype": "区间计数",
      "subtypeKey": "interval_count",
      "difficulty": 1,
      "difficultyLabel": "入门",
      "interactionLabel": [
        "单选"
      ],
      "interaction": [
        "single_choice"
      ],
      "theme": "闯关",
      "skills": [
        "区间",
        "数感"
      ],
      "tags": [
        "34W",
        "C",
        "counting_and_construct",
        "interval_count",
        "difficulty_1"
      ],
      "asset": {
        "promptText": "从第5集直接跳到第16集，中间没看几集",
        "imageKey": "34W-10",
        "audioKey": null
      },
      "status": "ready_for_content_entry"
    },
    {
      "id": "34W-16",
      "paper": "34W",
      "paperMeta": {
        "name": "34届WMO一年级初测",
        "org": "WMO",
        "grade": "一年级",
        "stage": "初测"
      },
      "qid": 16,
      "title": "一荤一素有几种选法",
      "moduleId": "C",
      "moduleKey": "counting_and_construct",
      "moduleName": "枚举计数 / 组合 / 最值",
      "roomName": "排列组合屋",
      "subtype": "组合计数",
      "subtypeKey": "combination_count",
      "difficulty": 2,
      "difficultyLabel": "基础",
      "interactionLabel": [
        "单选",
        "拖拽"
      ],
      "interaction": [
        "single_choice",
        "custom"
      ],
      "theme": "闯关",
      "skills": [
        "组合",
        "分类"
      ],
      "tags": [
        "34W",
        "C",
        "counting_and_construct",
        "combination_count",
        "difficulty_2"
      ],
      "asset": {
        "promptText": "一荤一素有几种选法",
        "imageKey": "34W-16",
        "audioKey": null
      },
      "status": "ready_for_content_entry"
    },
    {
      "id": "34Y-9",
      "paper": "34Y",
      "paperMeta": {
        "name": "34届YMO一年级初赛",
        "org": "YMO",
        "grade": "一年级",
        "stage": "初赛"
      },
      "qid": 9,
      "title": "十位和个位和为8的两位数有多少个",
      "moduleId": "C",
      "moduleKey": "counting_and_construct",
      "moduleName": "枚举计数 / 组合 / 最值",
      "roomName": "排列组合屋",
      "subtype": "枚举计数",
      "subtypeKey": "enumeration_count",
      "difficulty": 2,
      "difficultyLabel": "基础",
      "interactionLabel": [
        "直接输入"
      ],
      "interaction": [
        "text_input"
      ],
      "theme": "闯关",
      "skills": [
        "枚举",
        "去重"
      ],
      "tags": [
        "34Y",
        "C",
        "counting_and_construct",
        "enumeration_count",
        "difficulty_2"
      ],
      "asset": {
        "promptText": "十位和个位和为8的两位数有多少个",
        "imageKey": "34Y-9",
        "audioKey": null
      },
      "status": "ready_for_content_entry"
    },
    {
      "id": "34Y-11",
      "paper": "34Y",
      "paperMeta": {
        "name": "34届YMO一年级初赛",
        "org": "YMO",
        "grade": "一年级",
        "stage": "初赛"
      },
      "qid": 11,
      "title": "1、4、5、8组成两个两位数，差最小",
      "moduleId": "C",
      "moduleKey": "counting_and_construct",
      "moduleName": "枚举计数 / 组合 / 最值",
      "roomName": "排列组合屋",
      "subtype": "最值构造",
      "subtypeKey": "extreme_value_construction",
      "difficulty": 3,
      "difficultyLabel": "进阶",
      "interactionLabel": [
        "拖卡片"
      ],
      "interaction": [
        "drag_cards"
      ],
      "theme": "闯关",
      "skills": [
        "最值",
        "构造"
      ],
      "tags": [
        "34Y",
        "C",
        "counting_and_construct",
        "extreme_value_construction",
        "difficulty_3"
      ],
      "asset": {
        "promptText": "1、4、5、8组成两个两位数，差最小",
        "imageKey": "34Y-11",
        "audioKey": null
      },
      "status": "ready_for_content_entry"
    },
    {
      "id": "34Y-13",
      "paper": "34Y",
      "paperMeta": {
        "name": "34届YMO一年级初赛",
        "org": "YMO",
        "grade": "一年级",
        "stage": "初赛"
      },
      "qid": 13,
      "title": "小于20的自然数有几个",
      "moduleId": "C",
      "moduleKey": "counting_and_construct",
      "moduleName": "枚举计数 / 组合 / 最值",
      "roomName": "排列组合屋",
      "subtype": "数感计数",
      "subtypeKey": "number_sense_count",
      "difficulty": 1,
      "difficultyLabel": "入门",
      "interactionLabel": [
        "直接输入"
      ],
      "interaction": [
        "text_input"
      ],
      "theme": "闯关",
      "skills": [
        "数感",
        "计数"
      ],
      "tags": [
        "34Y",
        "C",
        "counting_and_construct",
        "number_sense_count",
        "difficulty_1"
      ],
      "asset": {
        "promptText": "小于20的自然数有几个",
        "imageKey": "34Y-13",
        "audioKey": null
      },
      "status": "ready_for_content_entry"
    },
    {
      "id": "34Y-16",
      "paper": "34Y",
      "paperMeta": {
        "name": "34届YMO一年级初赛",
        "org": "YMO",
        "grade": "一年级",
        "stage": "初赛"
      },
      "qid": 16,
      "title": "0、1、2、3组成无重复三位数个数",
      "moduleId": "C",
      "moduleKey": "counting_and_construct",
      "moduleName": "枚举计数 / 组合 / 最值",
      "roomName": "排列组合屋",
      "subtype": "枚举构造",
      "subtypeKey": "enumeration_construction",
      "difficulty": 2,
      "difficultyLabel": "基础",
      "interactionLabel": [
        "拖卡片"
      ],
      "interaction": [
        "drag_cards"
      ],
      "theme": "闯关",
      "skills": [
        "枚举",
        "构造"
      ],
      "tags": [
        "34Y",
        "C",
        "counting_and_construct",
        "enumeration_construction",
        "difficulty_2"
      ],
      "asset": {
        "promptText": "0、1、2、3组成无重复三位数个数",
        "imageKey": "34Y-16",
        "audioKey": null
      },
      "status": "ready_for_content_entry"
    },
    {
      "id": "35Y-10",
      "paper": "35Y",
      "paperMeta": {
        "name": "35届YMO一年级初赛",
        "org": "YMO",
        "grade": "一年级",
        "stage": "初赛"
      },
      "qid": 10,
      "title": "0、1、2、3、4组成最小无重复三位数",
      "moduleId": "C",
      "moduleKey": "counting_and_construct",
      "moduleName": "枚举计数 / 组合 / 最值",
      "roomName": "排列组合屋",
      "subtype": "最小数构造",
      "subtypeKey": "minimum_number_construction",
      "difficulty": 1,
      "difficultyLabel": "入门",
      "interactionLabel": [
        "拖卡片"
      ],
      "interaction": [
        "drag_cards"
      ],
      "theme": "闯关",
      "skills": [
        "数位",
        "最小值"
      ],
      "tags": [
        "35Y",
        "C",
        "counting_and_construct",
        "minimum_number_construction",
        "difficulty_1"
      ],
      "asset": {
        "promptText": "0、1、2、3、4组成最小无重复三位数",
        "imageKey": "35Y-10",
        "audioKey": null
      },
      "status": "ready_for_content_entry"
    },
    {
      "id": "35Y-20",
      "paper": "35Y",
      "paperMeta": {
        "name": "35届YMO一年级初赛",
        "org": "YMO",
        "grade": "一年级",
        "stage": "初赛"
      },
      "qid": 20,
      "title": "各位不同且数字和30的最大自然数",
      "moduleId": "C",
      "moduleKey": "counting_and_construct",
      "moduleName": "枚举计数 / 组合 / 最值",
      "roomName": "排列组合屋",
      "subtype": "最大数构造",
      "subtypeKey": "maximum_number_construction",
      "difficulty": 3,
      "difficultyLabel": "进阶",
      "interactionLabel": [
        "拖卡片"
      ],
      "interaction": [
        "drag_cards"
      ],
      "theme": "闯关",
      "skills": [
        "数位",
        "最大值"
      ],
      "tags": [
        "35Y",
        "C",
        "counting_and_construct",
        "maximum_number_construction",
        "difficulty_3"
      ],
      "asset": {
        "promptText": "各位不同且数字和30的最大自然数",
        "imageKey": "35Y-20",
        "audioKey": null
      },
      "status": "ready_for_content_entry"
    },
    {
      "id": "36Y-8",
      "paper": "36Y",
      "paperMeta": {
        "name": "36届YMO一年级初赛",
        "org": "YMO",
        "grade": "一年级",
        "stage": "初赛"
      },
      "qid": 8,
      "title": "五人握手，一共握几次",
      "moduleId": "C",
      "moduleKey": "counting_and_construct",
      "moduleName": "枚举计数 / 组合 / 最值",
      "roomName": "排列组合屋",
      "subtype": "配对计数",
      "subtypeKey": "pair_count",
      "difficulty": 2,
      "difficultyLabel": "基础",
      "interactionLabel": [
        "点击连线"
      ],
      "interaction": [
        "tap_connect"
      ],
      "theme": "闯关",
      "skills": [
        "配对",
        "去重"
      ],
      "tags": [
        "36Y",
        "C",
        "counting_and_construct",
        "pair_count",
        "difficulty_2"
      ],
      "asset": {
        "promptText": "五人握手，一共握几次",
        "imageKey": "36Y-8",
        "audioKey": null
      },
      "status": "ready_for_content_entry"
    },
    {
      "id": "36Y-14",
      "paper": "36Y",
      "paperMeta": {
        "name": "36届YMO一年级初赛",
        "org": "YMO",
        "grade": "一年级",
        "stage": "初赛"
      },
      "qid": 14,
      "title": "1、2、3、4组成两位数，共有多少个",
      "moduleId": "C",
      "moduleKey": "counting_and_construct",
      "moduleName": "枚举计数 / 组合 / 最值",
      "roomName": "排列组合屋",
      "subtype": "枚举计数",
      "subtypeKey": "enumeration_count",
      "difficulty": 1,
      "difficultyLabel": "入门",
      "interactionLabel": [
        "拖卡片"
      ],
      "interaction": [
        "drag_cards"
      ],
      "theme": "闯关",
      "skills": [
        "枚举",
        "去重"
      ],
      "tags": [
        "36Y",
        "C",
        "counting_and_construct",
        "enumeration_count",
        "difficulty_1"
      ],
      "asset": {
        "promptText": "1、2、3、4组成两位数，共有多少个",
        "imageKey": "36Y-14",
        "audioKey": null
      },
      "status": "ready_for_content_entry"
    },
    {
      "id": "36Y-15",
      "paper": "36Y",
      "paperMeta": {
        "name": "36届YMO一年级初赛",
        "org": "YMO",
        "grade": "一年级",
        "stage": "初赛"
      },
      "qid": 15,
      "title": "站成一排，左10右9，总人数",
      "moduleId": "C",
      "moduleKey": "counting_and_construct",
      "moduleName": "枚举计数 / 组合 / 最值",
      "roomName": "排列组合屋",
      "subtype": "队列总数",
      "subtypeKey": "queue_total",
      "difficulty": 1,
      "difficultyLabel": "入门",
      "interactionLabel": [
        "直接输入"
      ],
      "interaction": [
        "text_input"
      ],
      "theme": "闯关",
      "skills": [
        "排队",
        "总数"
      ],
      "tags": [
        "36Y",
        "C",
        "counting_and_construct",
        "queue_total",
        "difficulty_1"
      ],
      "asset": {
        "promptText": "站成一排，左10右9，总人数",
        "imageKey": "36Y-15",
        "audioKey": null
      },
      "status": "ready_for_content_entry"
    },
    {
      "id": "34W-2",
      "paper": "34W",
      "paperMeta": {
        "name": "34届WMO一年级初测",
        "org": "WMO",
        "grade": "一年级",
        "stage": "初测"
      },
      "qid": 2,
      "title": "至少再记住几种蔬菜才能超过对方",
      "moduleId": "D",
      "moduleKey": "equivalence_and_balance",
      "moduleName": "等量代换 / 和差关系 / 平衡",
      "roomName": "配平高手",
      "subtype": "至少多1",
      "subtypeKey": "at_least_plus_one",
      "difficulty": 1,
      "difficultyLabel": "入门",
      "interactionLabel": [
        "单选"
      ],
      "interaction": [
        "single_choice"
      ],
      "theme": "闯关",
      "skills": [
        "比较",
        "至少"
      ],
      "tags": [
        "34W",
        "D",
        "equivalence_and_balance",
        "at_least_plus_one",
        "difficulty_1"
      ],
      "asset": {
        "promptText": "至少再记住几种蔬菜才能超过对方",
        "imageKey": "34W-2",
        "audioKey": null
      },
      "status": "ready_for_content_entry"
    },
    {
      "id": "34W-5",
      "paper": "34W",
      "paperMeta": {
        "name": "34届WMO一年级初测",
        "org": "WMO",
        "grade": "一年级",
        "stage": "初测"
      },
      "qid": 5,
      "title": "白兔灰兔胡萝卜对话求原数量",
      "moduleId": "D",
      "moduleKey": "equivalence_and_balance",
      "moduleName": "等量代换 / 和差关系 / 平衡",
      "roomName": "配平高手",
      "subtype": "和差关系",
      "subtypeKey": "sum_difference_relation",
      "difficulty": 2,
      "difficultyLabel": "基础",
      "interactionLabel": [
        "单选"
      ],
      "interaction": [
        "single_choice"
      ],
      "theme": "闯关",
      "skills": [
        "和差",
        "比较"
      ],
      "tags": [
        "34W",
        "D",
        "equivalence_and_balance",
        "sum_difference_relation",
        "difficulty_2"
      ],
      "asset": {
        "promptText": "白兔灰兔胡萝卜对话求原数量",
        "imageKey": "34W-5",
        "audioKey": null
      },
      "status": "ready_for_content_entry"
    },
    {
      "id": "34W-17",
      "paper": "34W",
      "paperMeta": {
        "name": "34届WMO一年级初测",
        "org": "WMO",
        "grade": "一年级",
        "stage": "初测"
      },
      "qid": 17,
      "title": "爷爷70岁时爸爸和妙妙各几岁",
      "moduleId": "D",
      "moduleKey": "equivalence_and_balance",
      "moduleName": "等量代换 / 和差关系 / 平衡",
      "roomName": "配平高手",
      "subtype": "年龄关系",
      "subtypeKey": "age_relation",
      "difficulty": 2,
      "difficultyLabel": "基础",
      "interactionLabel": [
        "填空"
      ],
      "interaction": [
        "fill_blank"
      ],
      "theme": "闯关",
      "skills": [
        "年龄",
        "差量"
      ],
      "tags": [
        "34W",
        "D",
        "equivalence_and_balance",
        "age_relation",
        "difficulty_2"
      ],
      "asset": {
        "promptText": "爷爷70岁时爸爸和妙妙各几岁",
        "imageKey": "34W-17",
        "audioKey": null
      },
      "status": "ready_for_content_entry"
    },
    {
      "id": "34Y-6",
      "paper": "34Y",
      "paperMeta": {
        "name": "34届YMO一年级初赛",
        "org": "YMO",
        "grade": "一年级",
        "stage": "初赛"
      },
      "qid": 6,
      "title": "两层书架，第一层12本，比第二层多4本，求总数",
      "moduleId": "D",
      "moduleKey": "equivalence_and_balance",
      "moduleName": "等量代换 / 和差关系 / 平衡",
      "roomName": "配平高手",
      "subtype": "和差关系",
      "subtypeKey": "sum_difference_relation",
      "difficulty": 2,
      "difficultyLabel": "基础",
      "interactionLabel": [
        "直接输入"
      ],
      "interaction": [
        "text_input"
      ],
      "theme": "闯关",
      "skills": [
        "和差",
        "比较"
      ],
      "tags": [
        "34Y",
        "D",
        "equivalence_and_balance",
        "sum_difference_relation",
        "difficulty_2"
      ],
      "asset": {
        "promptText": "两层书架，第一层12本，比第二层多4本，求总数",
        "imageKey": "34Y-6",
        "audioKey": null
      },
      "status": "ready_for_content_entry"
    },
    {
      "id": "34Y-8",
      "paper": "34Y",
      "paperMeta": {
        "name": "34届YMO一年级初赛",
        "org": "YMO",
        "grade": "一年级",
        "stage": "初赛"
      },
      "qid": 8,
      "title": "三角形和正方形代表数，求差值",
      "moduleId": "D",
      "moduleKey": "equivalence_and_balance",
      "moduleName": "等量代换 / 和差关系 / 平衡",
      "roomName": "配平高手",
      "subtype": "图形代换",
      "subtypeKey": "shape_substitution",
      "difficulty": 2,
      "difficultyLabel": "基础",
      "interactionLabel": [
        "代换输入"
      ],
      "interaction": [
        "text_input",
        "formula_substitute"
      ],
      "theme": "闯关",
      "skills": [
        "代换",
        "等量关系"
      ],
      "tags": [
        "34Y",
        "D",
        "equivalence_and_balance",
        "shape_substitution",
        "difficulty_2"
      ],
      "asset": {
        "promptText": "三角形和正方形代表数，求差值",
        "imageKey": "34Y-8",
        "audioKey": null
      },
      "status": "ready_for_content_entry"
    },
    {
      "id": "34Y-17",
      "paper": "34Y",
      "paperMeta": {
        "name": "34届YMO一年级初赛",
        "org": "YMO",
        "grade": "一年级",
        "stage": "初赛"
      },
      "qid": 17,
      "title": "两箱苹果共40个，移5个后相等，求原来第一箱",
      "moduleId": "D",
      "moduleKey": "equivalence_and_balance",
      "moduleName": "等量代换 / 和差关系 / 平衡",
      "roomName": "配平高手",
      "subtype": "移动平衡",
      "subtypeKey": "move_balance",
      "difficulty": 3,
      "difficultyLabel": "进阶",
      "interactionLabel": [
        "动画平衡"
      ],
      "interaction": [
        "balance_animation",
        "text_input"
      ],
      "theme": "闯关",
      "skills": [
        "平衡",
        "差的一半"
      ],
      "tags": [
        "34Y",
        "D",
        "equivalence_and_balance",
        "move_balance",
        "difficulty_3"
      ],
      "asset": {
        "promptText": "两箱苹果共40个，移5个后相等，求原来第一箱",
        "imageKey": "34Y-17",
        "audioKey": null
      },
      "status": "ready_for_content_entry"
    },
    {
      "id": "35Y-9",
      "paper": "35Y",
      "paperMeta": {
        "name": "35届YMO一年级初赛",
        "org": "YMO",
        "grade": "一年级",
        "stage": "初赛"
      },
      "qid": 9,
      "title": "星形代换求值",
      "moduleId": "D",
      "moduleKey": "equivalence_and_balance",
      "moduleName": "等量代换 / 和差关系 / 平衡",
      "roomName": "配平高手",
      "subtype": "图形代换",
      "subtypeKey": "shape_substitution",
      "difficulty": 2,
      "difficultyLabel": "基础",
      "interactionLabel": [
        "代换输入"
      ],
      "interaction": [
        "text_input",
        "formula_substitute"
      ],
      "theme": "闯关",
      "skills": [
        "代换",
        "等量关系"
      ],
      "tags": [
        "35Y",
        "D",
        "equivalence_and_balance",
        "shape_substitution",
        "difficulty_2"
      ],
      "asset": {
        "promptText": "星形代换求值",
        "imageKey": "35Y-9",
        "audioKey": null
      },
      "status": "ready_for_content_entry"
    },
    {
      "id": "35Y-12",
      "paper": "35Y",
      "paperMeta": {
        "name": "35届YMO一年级初赛",
        "org": "YMO",
        "grade": "一年级",
        "stage": "初赛"
      },
      "qid": 12,
      "title": "两油桶共20千克，分别加同样多后变14和18，求原大桶",
      "moduleId": "D",
      "moduleKey": "equivalence_and_balance",
      "moduleName": "等量代换 / 和差关系 / 平衡",
      "roomName": "配平高手",
      "subtype": "等量增加",
      "subtypeKey": "equal_increment",
      "difficulty": 3,
      "difficultyLabel": "进阶",
      "interactionLabel": [
        "动画平衡"
      ],
      "interaction": [
        "balance_animation",
        "text_input"
      ],
      "theme": "闯关",
      "skills": [
        "平衡",
        "等量变化"
      ],
      "tags": [
        "35Y",
        "D",
        "equivalence_and_balance",
        "equal_increment",
        "difficulty_3"
      ],
      "asset": {
        "promptText": "两油桶共20千克，分别加同样多后变14和18，求原大桶",
        "imageKey": "35Y-12",
        "audioKey": null
      },
      "status": "ready_for_content_entry"
    },
    {
      "id": "35Y-15",
      "paper": "35Y",
      "paperMeta": {
        "name": "35届YMO一年级初赛",
        "org": "YMO",
        "grade": "一年级",
        "stage": "初赛"
      },
      "qid": 15,
      "title": "2个西瓜换10苹果，1苹果换3糖，求1西瓜换几糖",
      "moduleId": "D",
      "moduleKey": "equivalence_and_balance",
      "moduleName": "等量代换 / 和差关系 / 平衡",
      "roomName": "配平高手",
      "subtype": "等价兑换",
      "subtypeKey": "equivalent_exchange",
      "difficulty": 2,
      "difficultyLabel": "基础",
      "interactionLabel": [
        "链式代换"
      ],
      "interaction": [
        "custom"
      ],
      "theme": "闯关",
      "skills": [
        "等价",
        "链式代换"
      ],
      "tags": [
        "35Y",
        "D",
        "equivalence_and_balance",
        "equivalent_exchange",
        "difficulty_2"
      ],
      "asset": {
        "promptText": "2个西瓜换10苹果，1苹果换3糖，求1西瓜换几糖",
        "imageKey": "35Y-15",
        "audioKey": null
      },
      "status": "ready_for_content_entry"
    },
    {
      "id": "36Y-9",
      "paper": "36Y",
      "paperMeta": {
        "name": "36届YMO一年级初赛",
        "org": "YMO",
        "grade": "一年级",
        "stage": "初赛"
      },
      "qid": 9,
      "title": "图形竖式，不同图形代表不同数字",
      "moduleId": "D",
      "moduleKey": "equivalence_and_balance",
      "moduleName": "等量代换 / 和差关系 / 平衡",
      "roomName": "配平高手",
      "subtype": "竖式代换",
      "subtypeKey": "vertical_substitution",
      "difficulty": 3,
      "difficultyLabel": "进阶",
      "interactionLabel": [
        "拖数字入格"
      ],
      "interaction": [
        "drag_number_grid"
      ],
      "theme": "闯关",
      "skills": [
        "竖式",
        "代换"
      ],
      "tags": [
        "36Y",
        "D",
        "equivalence_and_balance",
        "vertical_substitution",
        "difficulty_3"
      ],
      "asset": {
        "promptText": "图形竖式，不同图形代表不同数字",
        "imageKey": "36Y-9",
        "audioKey": null
      },
      "status": "ready_for_content_entry"
    },
    {
      "id": "36Y-11",
      "paper": "36Y",
      "paperMeta": {
        "name": "36届YMO一年级初赛",
        "org": "YMO",
        "grade": "一年级",
        "stage": "初赛"
      },
      "qid": 11,
      "title": "从第一行移几个星到第二行后一样多",
      "moduleId": "D",
      "moduleKey": "equivalence_and_balance",
      "moduleName": "等量代换 / 和差关系 / 平衡",
      "roomName": "配平高手",
      "subtype": "差的一半",
      "subtypeKey": "half_the_difference",
      "difficulty": 2,
      "difficultyLabel": "基础",
      "interactionLabel": [
        "动画平衡"
      ],
      "interaction": [
        "balance_animation",
        "text_input"
      ],
      "theme": "闯关",
      "skills": [
        "和差",
        "平衡"
      ],
      "tags": [
        "36Y",
        "D",
        "equivalence_and_balance",
        "half_the_difference",
        "difficulty_2"
      ],
      "asset": {
        "promptText": "从第一行移几个星到第二行后一样多",
        "imageKey": "36Y-11",
        "audioKey": null
      },
      "status": "ready_for_content_entry"
    },
    {
      "id": "36Y-18",
      "paper": "36Y",
      "paperMeta": {
        "name": "36届YMO一年级初赛",
        "org": "YMO",
        "grade": "一年级",
        "stage": "初赛"
      },
      "qid": 18,
      "title": "▲+■=10，且2▲+3■=26，求▲",
      "moduleId": "D",
      "moduleKey": "equivalence_and_balance",
      "moduleName": "等量代换 / 和差关系 / 平衡",
      "roomName": "配平高手",
      "subtype": "二元代换",
      "subtypeKey": "two_variable_substitution",
      "difficulty": 3,
      "difficultyLabel": "进阶",
      "interactionLabel": [
        "代换输入"
      ],
      "interaction": [
        "text_input",
        "formula_substitute"
      ],
      "theme": "闯关",
      "skills": [
        "代换",
        "消元"
      ],
      "tags": [
        "36Y",
        "D",
        "equivalence_and_balance",
        "two_variable_substitution",
        "difficulty_3"
      ],
      "asset": {
        "promptText": "▲+■=10，且2▲+3■=26，求▲",
        "imageKey": "36Y-18",
        "audioKey": null
      },
      "status": "ready_for_content_entry"
    },
    {
      "id": "34W-3",
      "paper": "34W",
      "paperMeta": {
        "name": "34届WMO一年级初测",
        "org": "WMO",
        "grade": "一年级",
        "stage": "初测"
      },
      "qid": 3,
      "title": "修补墙面还要买多少块",
      "moduleId": "E",
      "moduleKey": "plane_geometry_counting",
      "moduleName": "平面图形数数 / 覆盖 / 补图",
      "roomName": "图形工程师",
      "subtype": "平面补块",
      "subtypeKey": "plane_fill_tiles",
      "difficulty": 2,
      "difficultyLabel": "基础",
      "interactionLabel": [
        "单选",
        "拖拽"
      ],
      "interaction": [
        "single_choice",
        "custom"
      ],
      "theme": "闯关",
      "skills": [
        "覆盖",
        "补块"
      ],
      "tags": [
        "34W",
        "E",
        "plane_geometry_counting",
        "plane_fill_tiles",
        "difficulty_2"
      ],
      "asset": {
        "promptText": "修补墙面还要买多少块",
        "imageKey": "34W-3",
        "audioKey": null
      },
      "status": "ready_for_content_entry"
    },
    {
      "id": "34W-19",
      "paper": "34W",
      "paperMeta": {
        "name": "34届WMO一年级初测",
        "org": "WMO",
        "grade": "一年级",
        "stage": "初测"
      },
      "qid": 19,
      "title": "地面铺砖，还需补几块黑砖与白砖",
      "moduleId": "E",
      "moduleKey": "plane_geometry_counting",
      "moduleName": "平面图形数数 / 覆盖 / 补图",
      "roomName": "图形工程师",
      "subtype": "平面覆盖",
      "subtypeKey": "plane_covering",
      "difficulty": 3,
      "difficultyLabel": "进阶",
      "interactionLabel": [
        "双填空",
        "点击"
      ],
      "interaction": [
        "double_fill",
        "click_highlight"
      ],
      "theme": "闯关",
      "skills": [
        "覆盖",
        "双色图案"
      ],
      "tags": [
        "34W",
        "E",
        "plane_geometry_counting",
        "plane_covering",
        "difficulty_3"
      ],
      "asset": {
        "promptText": "地面铺砖，还需补几块黑砖与白砖",
        "imageKey": "34W-19",
        "audioKey": null
      },
      "status": "ready_for_content_entry"
    },
    {
      "id": "34Y-12",
      "paper": "34Y",
      "paperMeta": {
        "name": "34届YMO一年级初赛",
        "org": "YMO",
        "grade": "一年级",
        "stage": "初赛"
      },
      "qid": 12,
      "title": "数点阵图一共有多少个点",
      "moduleId": "E",
      "moduleKey": "plane_geometry_counting",
      "moduleName": "平面图形数数 / 覆盖 / 补图",
      "roomName": "图形工程师",
      "subtype": "数点",
      "subtypeKey": "count_points",
      "difficulty": 2,
      "difficultyLabel": "基础",
      "interactionLabel": [
        "点击高亮"
      ],
      "interaction": [
        "click_highlight"
      ],
      "theme": "闯关",
      "skills": [
        "观察",
        "计数"
      ],
      "tags": [
        "34Y",
        "E",
        "plane_geometry_counting",
        "count_points",
        "difficulty_2"
      ],
      "asset": {
        "promptText": "数点阵图一共有多少个点",
        "imageKey": "34Y-12",
        "audioKey": null
      },
      "status": "ready_for_content_entry"
    },
    {
      "id": "34Y-14",
      "paper": "34Y",
      "paperMeta": {
        "name": "34届YMO一年级初赛",
        "org": "YMO",
        "grade": "一年级",
        "stage": "初赛"
      },
      "qid": 14,
      "title": "六边形边框图中间缺多少个六边形",
      "moduleId": "E",
      "moduleKey": "plane_geometry_counting",
      "moduleName": "平面图形数数 / 覆盖 / 补图",
      "roomName": "图形工程师",
      "subtype": "缺口补图",
      "subtypeKey": "fill_missing_shape",
      "difficulty": 3,
      "difficultyLabel": "进阶",
      "interactionLabel": [
        "拖拽补块"
      ],
      "interaction": [
        "drag_tiles"
      ],
      "theme": "闯关",
      "skills": [
        "补图",
        "图形观察"
      ],
      "tags": [
        "34Y",
        "E",
        "plane_geometry_counting",
        "fill_missing_shape",
        "difficulty_3"
      ],
      "asset": {
        "promptText": "六边形边框图中间缺多少个六边形",
        "imageKey": "34Y-14",
        "audioKey": null
      },
      "status": "ready_for_content_entry"
    },
    {
      "id": "35Y-17",
      "paper": "35Y",
      "paperMeta": {
        "name": "35届YMO一年级初赛",
        "org": "YMO",
        "grade": "一年级",
        "stage": "初赛"
      },
      "qid": 17,
      "title": "复合方框图中共有多少条线段",
      "moduleId": "E",
      "moduleKey": "plane_geometry_counting",
      "moduleName": "平面图形数数 / 覆盖 / 补图",
      "roomName": "图形工程师",
      "subtype": "数线段",
      "subtypeKey": "count_segments",
      "difficulty": 3,
      "difficultyLabel": "进阶",
      "interactionLabel": [
        "点击高亮"
      ],
      "interaction": [
        "click_highlight"
      ],
      "theme": "闯关",
      "skills": [
        "分类计数",
        "图形观察"
      ],
      "tags": [
        "35Y",
        "E",
        "plane_geometry_counting",
        "count_segments",
        "difficulty_3"
      ],
      "asset": {
        "promptText": "复合方框图中共有多少条线段",
        "imageKey": "35Y-17",
        "audioKey": null
      },
      "status": "ready_for_content_entry"
    },
    {
      "id": "36Y-4",
      "paper": "36Y",
      "paperMeta": {
        "name": "36届YMO一年级初赛",
        "org": "YMO",
        "grade": "一年级",
        "stage": "初赛"
      },
      "qid": 4,
      "title": "数灰色圆点",
      "moduleId": "E",
      "moduleKey": "plane_geometry_counting",
      "moduleName": "平面图形数数 / 覆盖 / 补图",
      "roomName": "图形工程师",
      "subtype": "数点",
      "subtypeKey": "count_points",
      "difficulty": 1,
      "difficultyLabel": "入门",
      "interactionLabel": [
        "点击高亮"
      ],
      "interaction": [
        "click_highlight"
      ],
      "theme": "闯关",
      "skills": [
        "观察",
        "计数"
      ],
      "tags": [
        "36Y",
        "E",
        "plane_geometry_counting",
        "count_points",
        "difficulty_1"
      ],
      "asset": {
        "promptText": "数灰色圆点",
        "imageKey": "36Y-4",
        "audioKey": null
      },
      "status": "ready_for_content_entry"
    },
    {
      "id": "36Y-10",
      "paper": "36Y",
      "paperMeta": {
        "name": "36届YMO一年级初赛",
        "org": "YMO",
        "grade": "一年级",
        "stage": "初赛"
      },
      "qid": 10,
      "title": "方格图中共有多少个正方形",
      "moduleId": "E",
      "moduleKey": "plane_geometry_counting",
      "moduleName": "平面图形数数 / 覆盖 / 补图",
      "roomName": "图形工程师",
      "subtype": "数正方形",
      "subtypeKey": "count_squares",
      "difficulty": 3,
      "difficultyLabel": "进阶",
      "interactionLabel": [
        "点击高亮"
      ],
      "interaction": [
        "click_highlight"
      ],
      "theme": "闯关",
      "skills": [
        "分类计数",
        "平面图形"
      ],
      "tags": [
        "36Y",
        "E",
        "plane_geometry_counting",
        "count_squares",
        "difficulty_3"
      ],
      "asset": {
        "promptText": "方格图中共有多少个正方形",
        "imageKey": "36Y-10",
        "audioKey": null
      },
      "status": "ready_for_content_entry"
    },
    {
      "id": "34W-1",
      "paper": "34W",
      "paperMeta": {
        "name": "34届WMO一年级初测",
        "org": "WMO",
        "grade": "一年级",
        "stage": "初测"
      },
      "qid": 1,
      "title": "中药柜11号抽屉正下方是几号",
      "moduleId": "F",
      "moduleKey": "spatial_reasoning",
      "moduleName": "立体空间 / 遮挡 / 展开图 / 位置",
      "roomName": "空间大师",
      "subtype": "方位位置",
      "subtypeKey": "spatial_position",
      "difficulty": 1,
      "difficultyLabel": "入门",
      "interactionLabel": [
        "单选"
      ],
      "interaction": [
        "single_choice"
      ],
      "theme": "闯关",
      "skills": [
        "方位",
        "空间认知"
      ],
      "tags": [
        "34W",
        "F",
        "spatial_reasoning",
        "spatial_position",
        "difficulty_1"
      ],
      "asset": {
        "promptText": "中药柜11号抽屉正下方是几号",
        "imageKey": "34W-1",
        "audioKey": null
      },
      "status": "ready_for_content_entry"
    },
    {
      "id": "34W-11",
      "paper": "34W",
      "paperMeta": {
        "name": "34届WMO一年级初测",
        "org": "WMO",
        "grade": "一年级",
        "stage": "初测"
      },
      "qid": 11,
      "title": "两张卡片叠放/翻转后能看到的最小数",
      "moduleId": "F",
      "moduleKey": "spatial_reasoning",
      "moduleName": "立体空间 / 遮挡 / 展开图 / 位置",
      "roomName": "空间大师",
      "subtype": "覆盖与对称",
      "subtypeKey": "overlay_symmetry",
      "difficulty": 4,
      "difficultyLabel": "挑战",
      "interactionLabel": [
        "单选"
      ],
      "interaction": [
        "single_choice"
      ],
      "theme": "闯关",
      "skills": [
        "覆盖",
        "对称"
      ],
      "tags": [
        "34W",
        "F",
        "spatial_reasoning",
        "overlay_symmetry",
        "difficulty_4"
      ],
      "asset": {
        "promptText": "两张卡片叠放/翻转后能看到的最小数",
        "imageKey": "34W-11",
        "audioKey": null
      },
      "status": "ready_for_content_entry"
    },
    {
      "id": "34Y-15",
      "paper": "34Y",
      "paperMeta": {
        "name": "34届YMO一年级初赛",
        "org": "YMO",
        "grade": "一年级",
        "stage": "初赛"
      },
      "qid": 15,
      "title": "立体方块堆中看不到的小正方体有几个",
      "moduleId": "F",
      "moduleKey": "spatial_reasoning",
      "moduleName": "立体空间 / 遮挡 / 展开图 / 位置",
      "roomName": "空间大师",
      "subtype": "遮挡计数",
      "subtypeKey": "hidden_block_count",
      "difficulty": 3,
      "difficultyLabel": "进阶",
      "interactionLabel": [
        "3D观察"
      ],
      "interaction": [
        "observe_3d"
      ],
      "theme": "闯关",
      "skills": [
        "空间",
        "遮挡"
      ],
      "tags": [
        "34Y",
        "F",
        "spatial_reasoning",
        "hidden_block_count",
        "difficulty_3"
      ],
      "asset": {
        "promptText": "立体方块堆中看不到的小正方体有几个",
        "imageKey": "34Y-15",
        "audioKey": null
      },
      "status": "ready_for_content_entry"
    },
    {
      "id": "35Y-7",
      "paper": "35Y",
      "paperMeta": {
        "name": "35届YMO一年级初赛",
        "org": "YMO",
        "grade": "一年级",
        "stage": "初赛"
      },
      "qid": 7,
      "title": "绳子对折两次再中间剪断，最长一段多长",
      "moduleId": "F",
      "moduleKey": "spatial_reasoning",
      "moduleName": "立体空间 / 遮挡 / 展开图 / 位置",
      "roomName": "空间大师",
      "subtype": "折叠切分",
      "subtypeKey": "fold_and_cut",
      "difficulty": 3,
      "difficultyLabel": "进阶",
      "interactionLabel": [
        "动画演示"
      ],
      "interaction": [
        "animation_demo"
      ],
      "theme": "闯关",
      "skills": [
        "折叠",
        "切分"
      ],
      "tags": [
        "35Y",
        "F",
        "spatial_reasoning",
        "fold_and_cut",
        "difficulty_3"
      ],
      "asset": {
        "promptText": "绳子对折两次再中间剪断，最长一段多长",
        "imageKey": "35Y-7",
        "audioKey": null
      },
      "status": "ready_for_content_entry"
    },
    {
      "id": "35Y-13",
      "paper": "35Y",
      "paperMeta": {
        "name": "35届YMO一年级初赛",
        "org": "YMO",
        "grade": "一年级",
        "stage": "初赛"
      },
      "qid": 13,
      "title": "5个图里有几个是正方体展开图",
      "moduleId": "F",
      "moduleKey": "spatial_reasoning",
      "moduleName": "立体空间 / 遮挡 / 展开图 / 位置",
      "roomName": "空间大师",
      "subtype": "展开图判断",
      "subtypeKey": "net_recognition",
      "difficulty": 4,
      "difficultyLabel": "挑战",
      "interactionLabel": [
        "单选",
        "多选"
      ],
      "interaction": [
        "single_choice",
        "multi_choice"
      ],
      "theme": "闯关",
      "skills": [
        "空间想象",
        "展开图"
      ],
      "tags": [
        "35Y",
        "F",
        "spatial_reasoning",
        "net_recognition",
        "difficulty_4"
      ],
      "asset": {
        "promptText": "5个图里有几个是正方体展开图",
        "imageKey": "35Y-13",
        "audioKey": null
      },
      "status": "ready_for_content_entry"
    },
    {
      "id": "35Y-18",
      "paper": "35Y",
      "paperMeta": {
        "name": "35届YMO一年级初赛",
        "org": "YMO",
        "grade": "一年级",
        "stage": "初赛"
      },
      "qid": 18,
      "title": "同一正方体不同摆法，2的对面是谁",
      "moduleId": "F",
      "moduleKey": "spatial_reasoning",
      "moduleName": "立体空间 / 遮挡 / 展开图 / 位置",
      "roomName": "空间大师",
      "subtype": "对面判断",
      "subtypeKey": "opposite_face",
      "difficulty": 3,
      "difficultyLabel": "进阶",
      "interactionLabel": [
        "立方体旋转"
      ],
      "interaction": [
        "rotate_cube"
      ],
      "theme": "闯关",
      "skills": [
        "空间想象",
        "相对面"
      ],
      "tags": [
        "35Y",
        "F",
        "spatial_reasoning",
        "opposite_face",
        "difficulty_3"
      ],
      "asset": {
        "promptText": "同一正方体不同摆法，2的对面是谁",
        "imageKey": "35Y-18",
        "audioKey": null
      },
      "status": "ready_for_content_entry"
    },
    {
      "id": "36Y-7",
      "paper": "36Y",
      "paperMeta": {
        "name": "36届YMO一年级初赛",
        "org": "YMO",
        "grade": "一年级",
        "stage": "初赛"
      },
      "qid": 7,
      "title": "六面不同颜色的小正方体，蓝色对面是什么色",
      "moduleId": "F",
      "moduleKey": "spatial_reasoning",
      "moduleName": "立体空间 / 遮挡 / 展开图 / 位置",
      "roomName": "空间大师",
      "subtype": "对面判断",
      "subtypeKey": "opposite_face",
      "difficulty": 3,
      "difficultyLabel": "进阶",
      "interactionLabel": [
        "立方体旋转"
      ],
      "interaction": [
        "rotate_cube"
      ],
      "theme": "闯关",
      "skills": [
        "空间想象",
        "相对面"
      ],
      "tags": [
        "36Y",
        "F",
        "spatial_reasoning",
        "opposite_face",
        "difficulty_3"
      ],
      "asset": {
        "promptText": "六面不同颜色的小正方体，蓝色对面是什么色",
        "imageKey": "36Y-7",
        "audioKey": null
      },
      "status": "ready_for_content_entry"
    },
    {
      "id": "36Y-12",
      "paper": "36Y",
      "paperMeta": {
        "name": "36届YMO一年级初赛",
        "org": "YMO",
        "grade": "一年级",
        "stage": "初赛"
      },
      "qid": 12,
      "title": "正方体面、顶点、棱，求A+B-C",
      "moduleId": "F",
      "moduleKey": "spatial_reasoning",
      "moduleName": "立体空间 / 遮挡 / 展开图 / 位置",
      "roomName": "空间大师",
      "subtype": "立体基础",
      "subtypeKey": "solid_basics",
      "difficulty": 1,
      "difficultyLabel": "入门",
      "interactionLabel": [
        "直接输入"
      ],
      "interaction": [
        "text_input"
      ],
      "theme": "闯关",
      "skills": [
        "立体认知",
        "几何基础"
      ],
      "tags": [
        "36Y",
        "F",
        "spatial_reasoning",
        "solid_basics",
        "difficulty_1"
      ],
      "asset": {
        "promptText": "正方体面、顶点、棱，求A+B-C",
        "imageKey": "36Y-12",
        "audioKey": null
      },
      "status": "ready_for_content_entry"
    },
    {
      "id": "36Y-16",
      "paper": "36Y",
      "paperMeta": {
        "name": "36届YMO一年级初赛",
        "org": "YMO",
        "grade": "一年级",
        "stage": "初赛"
      },
      "qid": 16,
      "title": "两个立体图共有多少个小正方体",
      "moduleId": "F",
      "moduleKey": "spatial_reasoning",
      "moduleName": "立体空间 / 遮挡 / 展开图 / 位置",
      "roomName": "空间大师",
      "subtype": "堆叠计数",
      "subtypeKey": "stacked_cube_count",
      "difficulty": 3,
      "difficultyLabel": "进阶",
      "interactionLabel": [
        "3D观察"
      ],
      "interaction": [
        "observe_3d"
      ],
      "theme": "闯关",
      "skills": [
        "空间",
        "分层计数"
      ],
      "tags": [
        "36Y",
        "F",
        "spatial_reasoning",
        "stacked_cube_count",
        "difficulty_3"
      ],
      "asset": {
        "promptText": "两个立体图共有多少个小正方体",
        "imageKey": "36Y-16",
        "audioKey": null
      },
      "status": "ready_for_content_entry"
    },
    {
      "id": "34W-12",
      "paper": "34W",
      "paperMeta": {
        "name": "34届WMO一年级初测",
        "org": "WMO",
        "grade": "一年级",
        "stage": "初测"
      },
      "qid": 12,
      "title": "洛书图中★处填什么",
      "moduleId": "G",
      "moduleKey": "logic_puzzles",
      "moduleName": "逻辑填数 / 等和图 / 符号填空 / 综合推理",
      "roomName": "逻辑神探",
      "subtype": "等和填数",
      "subtypeKey": "equal_sum_fill",
      "difficulty": 3,
      "difficultyLabel": "进阶",
      "interactionLabel": [
        "单选"
      ],
      "interaction": [
        "single_choice"
      ],
      "theme": "闯关",
      "skills": [
        "等和",
        "填数"
      ],
      "tags": [
        "34W",
        "G",
        "logic_puzzles",
        "equal_sum_fill",
        "difficulty_3"
      ],
      "asset": {
        "promptText": "洛书图中★处填什么",
        "imageKey": "34W-12",
        "audioKey": null
      },
      "status": "ready_for_content_entry"
    },
    {
      "id": "34Y-5",
      "paper": "34Y",
      "paperMeta": {
        "name": "34届YMO一年级初赛",
        "org": "YMO",
        "grade": "一年级",
        "stage": "初赛"
      },
      "qid": 5,
      "title": "在若干空里填“+”或“-”，使等式成立并统计方法数",
      "moduleId": "G",
      "moduleKey": "logic_puzzles",
      "moduleName": "逻辑填数 / 等和图 / 符号填空 / 综合推理",
      "roomName": "逻辑神探",
      "subtype": "填符号",
      "subtypeKey": "fill_operators",
      "difficulty": 4,
      "difficultyLabel": "挑战",
      "interactionLabel": [
        "拖符号"
      ],
      "interaction": [
        "drag_symbol"
      ],
      "theme": "闯关",
      "skills": [
        "试填",
        "符号推理"
      ],
      "tags": [
        "34Y",
        "G",
        "logic_puzzles",
        "fill_operators",
        "difficulty_4"
      ],
      "asset": {
        "promptText": "在若干空里填“+”或“-”，使等式成立并统计方法数",
        "imageKey": "34Y-5",
        "audioKey": null
      },
      "status": "ready_for_content_entry"
    },
    {
      "id": "34Y-18",
      "paper": "34Y",
      "paperMeta": {
        "name": "34届YMO一年级初赛",
        "org": "YMO",
        "grade": "一年级",
        "stage": "初赛"
      },
      "qid": 18,
      "title": "20到26填入Y形圆圈，使每条线三数和相等，问中心有几种填法",
      "moduleId": "G",
      "moduleKey": "logic_puzzles",
      "moduleName": "逻辑填数 / 等和图 / 符号填空 / 综合推理",
      "roomName": "逻辑神探",
      "subtype": "等和图",
      "subtypeKey": "equal_sum_graph",
      "difficulty": 4,
      "difficultyLabel": "挑战",
      "interactionLabel": [
        "拖数字入位"
      ],
      "interaction": [
        "drag_number_slots"
      ],
      "theme": "闯关",
      "skills": [
        "等和",
        "试填"
      ],
      "tags": [
        "34Y",
        "G",
        "logic_puzzles",
        "equal_sum_graph",
        "difficulty_4"
      ],
      "asset": {
        "promptText": "20到26填入Y形圆圈，使每条线三数和相等，问中心有几种填法",
        "imageKey": "34Y-18",
        "audioKey": null
      },
      "status": "ready_for_content_entry"
    },
    {
      "id": "34Y-20",
      "paper": "34Y",
      "paperMeta": {
        "name": "34届YMO一年级初赛",
        "org": "YMO",
        "grade": "一年级",
        "stage": "初赛"
      },
      "qid": 20,
      "title": "1、2、4、6填入三圆重叠图，使每个圆内四数和相等，求中心",
      "moduleId": "G",
      "moduleKey": "logic_puzzles",
      "moduleName": "逻辑填数 / 等和图 / 符号填空 / 综合推理",
      "roomName": "逻辑神探",
      "subtype": "区域等和",
      "subtypeKey": "regional_equal_sum",
      "difficulty": 4,
      "difficultyLabel": "挑战",
      "interactionLabel": [
        "拖数字入区"
      ],
      "interaction": [
        "drag_number_regions"
      ],
      "theme": "闯关",
      "skills": [
        "区域约束",
        "等和"
      ],
      "tags": [
        "34Y",
        "G",
        "logic_puzzles",
        "regional_equal_sum",
        "difficulty_4"
      ],
      "asset": {
        "promptText": "1、2、4、6填入三圆重叠图，使每个圆内四数和相等，求中心",
        "imageKey": "34Y-20",
        "audioKey": null
      },
      "status": "ready_for_content_entry"
    },
    {
      "id": "35Y-11",
      "paper": "35Y",
      "paperMeta": {
        "name": "35届YMO一年级初赛",
        "org": "YMO",
        "grade": "一年级",
        "stage": "初赛"
      },
      "qid": 11,
      "title": "在式子空格填“+”或“-”使结果尽可能大",
      "moduleId": "G",
      "moduleKey": "logic_puzzles",
      "moduleName": "逻辑填数 / 等和图 / 符号填空 / 综合推理",
      "roomName": "逻辑神探",
      "subtype": "最优化填符号",
      "subtypeKey": "optimize_operators",
      "difficulty": 3,
      "difficultyLabel": "进阶",
      "interactionLabel": [
        "拖符号"
      ],
      "interaction": [
        "drag_symbol"
      ],
      "theme": "闯关",
      "skills": [
        "最优化",
        "符号推理"
      ],
      "tags": [
        "35Y",
        "G",
        "logic_puzzles",
        "optimize_operators",
        "difficulty_3"
      ],
      "asset": {
        "promptText": "在式子空格填“+”或“-”使结果尽可能大",
        "imageKey": "35Y-11",
        "audioKey": null
      },
      "status": "ready_for_content_entry"
    },
    {
      "id": "36Y-19",
      "paper": "36Y",
      "paperMeta": {
        "name": "36届YMO一年级初赛",
        "org": "YMO",
        "grade": "一年级",
        "stage": "初赛"
      },
      "qid": 19,
      "title": "4×4填1-4，每行每列不重复且满足粗框和",
      "moduleId": "G",
      "moduleKey": "logic_puzzles",
      "moduleName": "逻辑填数 / 等和图 / 符号填空 / 综合推理",
      "roomName": "逻辑神探",
      "subtype": "逻辑填数",
      "subtypeKey": "logic_grid_fill",
      "difficulty": 5,
      "difficultyLabel": "高阶",
      "interactionLabel": [
        "拖数字入格"
      ],
      "interaction": [
        "drag_number_grid"
      ],
      "theme": "闯关",
      "skills": [
        "排除法",
        "约束推理",
        "数感"
      ],
      "tags": [
        "36Y",
        "G",
        "logic_puzzles",
        "logic_grid_fill",
        "difficulty_5"
      ],
      "asset": {
        "promptText": "4×4填1-4，每行每列不重复且满足粗框和",
        "imageKey": "36Y-19",
        "audioKey": null
      },
      "status": "ready_for_content_entry"
    },
    {
      "id": "36Y-20",
      "paper": "36Y",
      "paperMeta": {
        "name": "36届YMO一年级初赛",
        "org": "YMO",
        "grade": "一年级",
        "stage": "初赛"
      },
      "qid": 20,
      "title": "三角形空圈填11、12、13，使每条线和相等",
      "moduleId": "G",
      "moduleKey": "logic_puzzles",
      "moduleName": "逻辑填数 / 等和图 / 符号填空 / 综合推理",
      "roomName": "逻辑神探",
      "subtype": "等和三角",
      "subtypeKey": "equal_sum_triangle",
      "difficulty": 3,
      "difficultyLabel": "进阶",
      "interactionLabel": [
        "拖数字入位"
      ],
      "interaction": [
        "drag_number_slots"
      ],
      "theme": "闯关",
      "skills": [
        "等和",
        "结构观察"
      ],
      "tags": [
        "36Y",
        "G",
        "logic_puzzles",
        "equal_sum_triangle",
        "difficulty_3"
      ],
      "asset": {
        "promptText": "三角形空圈填11、12、13，使每条线和相等",
        "imageKey": "36Y-20",
        "audioKey": null
      },
      "status": "ready_for_content_entry"
    }
  ]
} as unknown as QuestionBankConfig;
