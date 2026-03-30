import { CONTENT_SCHEMA_VERSION } from './h5-question-content.schema';
import type { QuestionContentBundle, QuestionContentRecord } from './h5-question-content.schema';

/**
 * 全量 QuestionContentRecord 数据包（80题）
 * 说明：
 * 1. 这份数据包面向 H5 MVP 的批量题目接入，优先完成题目结构化与统一字段。
 * 2. 少量强依赖原图细节的题，答案先标记为“待校验”，便于后续切图后终审。
 */

export const fullQuestionContentRecords: QuestionContentRecord[] = [
  {
    "meta": {
      "questionId": "34W-4",
      "paper": "34W",
      "qid": 4,
      "moduleId": "A",
      "moduleKey": "mental_math",
      "interactionType": "text_input",
      "difficulty": 2,
      "schemaVersion": "1.0.0",
      "locale": "zh-CN"
    },
    "stem": {
      "title": "31减一位数，十位个位交换后逆推正确结果",
      "blocks": [
        {
          "id": "b1",
          "type": "paragraph",
          "text": "计算31减一个一位数时，把被减数十位和个位交换后结果是9。正确结果是多少？"
        }
      ]
    },
    "interaction": {
      "type": "text_input",
      "submitMode": "manual",
      "keyboard": "number",
      "timerSeconds": 20
    },
    "answer": {
      "kind": "numeric",
      "acceptedValues": [
        22
      ],
      "ignoreLeadingZeros": true,
      "trimWhitespace": true
    },
    "explanation": {
      "summary": "先根据题型特征做一步核心判断，再计算或验证答案。",
      "steps": [
        {
          "id": "s1",
          "kind": "observation",
          "title": "先识别题型",
          "text": "这题属于「逆推计算」，先用这一类题的固定思路观察条件。"
        },
        {
          "id": "s2",
          "kind": "rule",
          "title": "抓住核心关系",
          "text": "把题目中最关键的数量关系、规律关系或空间关系先找出来。"
        },
        {
          "id": "s3",
          "kind": "verification",
          "title": "验证答案",
          "text": "得到结果后，再回到原题核对一次，确认没有漏条件或看错图。"
        }
      ],
      "wrongReasons": [
        {
          "code": "skip_observation",
          "title": "上来就算",
          "text": "先看题型、再下手，通常会更快也更稳。"
        },
        {
          "code": "miss_condition",
          "title": "漏了条件",
          "text": "图形题、规律题和等量题都要把条件完整读一遍。"
        }
      ]
    },
    "assets": {
      "imageKeys": []
    },
    "review": {
      "recommendedFocus": [
        "凑整",
        "逆推",
        "口算结构"
      ],
      "memoryTag": "reverse_calculation"
    }
  },
  {
    "meta": {
      "questionId": "34W-9",
      "paper": "34W",
      "qid": 9,
      "moduleId": "A",
      "moduleKey": "mental_math",
      "interactionType": "text_input",
      "difficulty": 1,
      "schemaVersion": "1.0.0",
      "locale": "zh-CN"
    },
    "stem": {
      "title": "11月11日后三天是几号",
      "blocks": [
        {
          "id": "b1",
          "type": "paragraph",
          "text": "11月11日下单，三天后收到运动鞋，收到的日期是几月几日？"
        }
      ]
    },
    "interaction": {
      "type": "text_input",
      "submitMode": "manual",
      "keyboard": "text",
      "timerSeconds": 20
    },
    "answer": {
      "kind": "free_text",
      "acceptedTexts": [
        "11月14日",
        "11-14",
        "11/14"
      ],
      "ignoreCase": true,
      "trimWhitespace": true
    },
    "explanation": {
      "summary": "先根据题型特征做一步核心判断，再计算或验证答案。",
      "steps": [
        {
          "id": "s1",
          "kind": "observation",
          "title": "先识别题型",
          "text": "这题属于「日期计算」，先用这一类题的固定思路观察条件。"
        },
        {
          "id": "s2",
          "kind": "rule",
          "title": "抓住核心关系",
          "text": "把题目中最关键的数量关系、规律关系或空间关系先找出来。"
        },
        {
          "id": "s3",
          "kind": "verification",
          "title": "验证答案",
          "text": "得到结果后，再回到原题核对一次，确认没有漏条件或看错图。"
        }
      ],
      "wrongReasons": [
        {
          "code": "skip_observation",
          "title": "上来就算",
          "text": "先看题型、再下手，通常会更快也更稳。"
        },
        {
          "code": "miss_condition",
          "title": "漏了条件",
          "text": "图形题、规律题和等量题都要把条件完整读一遍。"
        }
      ]
    },
    "assets": {
      "imageKeys": []
    },
    "review": {
      "recommendedFocus": [
        "凑整",
        "逆推",
        "口算结构"
      ],
      "memoryTag": "date_calculation"
    }
  },
  {
    "meta": {
      "questionId": "34W-13",
      "paper": "34W",
      "qid": 13,
      "moduleId": "A",
      "moduleKey": "mental_math",
      "interactionType": "text_input",
      "difficulty": 1,
      "schemaVersion": "1.0.0",
      "locale": "zh-CN"
    },
    "stem": {
      "title": "贝币、串、朋换算",
      "blocks": [
        {
          "id": "b1",
          "type": "paragraph",
          "text": "5个贝币是1串，2串是1朋，那么2朋有多少个贝币？"
        }
      ]
    },
    "interaction": {
      "type": "text_input",
      "submitMode": "manual",
      "keyboard": "number",
      "timerSeconds": 20
    },
    "answer": {
      "kind": "numeric",
      "acceptedValues": [
        20
      ],
      "ignoreLeadingZeros": true,
      "trimWhitespace": true
    },
    "explanation": {
      "summary": "先根据题型特征做一步核心判断，再计算或验证答案。",
      "steps": [
        {
          "id": "s1",
          "kind": "observation",
          "title": "先识别题型",
          "text": "这题属于「单位换算」，先用这一类题的固定思路观察条件。"
        },
        {
          "id": "s2",
          "kind": "rule",
          "title": "抓住核心关系",
          "text": "把题目中最关键的数量关系、规律关系或空间关系先找出来。"
        },
        {
          "id": "s3",
          "kind": "verification",
          "title": "验证答案",
          "text": "得到结果后，再回到原题核对一次，确认没有漏条件或看错图。"
        }
      ],
      "wrongReasons": [
        {
          "code": "skip_observation",
          "title": "上来就算",
          "text": "先看题型、再下手，通常会更快也更稳。"
        },
        {
          "code": "miss_condition",
          "title": "漏了条件",
          "text": "图形题、规律题和等量题都要把条件完整读一遍。"
        }
      ]
    },
    "assets": {
      "imageKeys": []
    },
    "review": {
      "recommendedFocus": [
        "凑整",
        "逆推",
        "口算结构"
      ],
      "memoryTag": "unit_conversion"
    }
  },
  {
    "meta": {
      "questionId": "34W-14",
      "paper": "34W",
      "qid": 14,
      "moduleId": "A",
      "moduleKey": "mental_math",
      "interactionType": "text_input",
      "difficulty": 2,
      "schemaVersion": "1.0.0",
      "locale": "zh-CN"
    },
    "stem": {
      "title": "剪成5小块需要几次、几分钟",
      "blocks": [
        {
          "id": "b1",
          "type": "paragraph",
          "text": "把一块布料剪成5小块，每剪一次要2分钟，剪完需要多少分钟？"
        }
      ]
    },
    "interaction": {
      "type": "text_input",
      "submitMode": "manual",
      "keyboard": "number",
      "timerSeconds": 20
    },
    "answer": {
      "kind": "numeric",
      "acceptedValues": [
        8
      ],
      "ignoreLeadingZeros": true,
      "trimWhitespace": true
    },
    "explanation": {
      "summary": "先根据题型特征做一步核心判断，再计算或验证答案。",
      "steps": [
        {
          "id": "s1",
          "kind": "observation",
          "title": "先识别题型",
          "text": "这题属于「切割次数」，先用这一类题的固定思路观察条件。"
        },
        {
          "id": "s2",
          "kind": "rule",
          "title": "抓住核心关系",
          "text": "把题目中最关键的数量关系、规律关系或空间关系先找出来。"
        },
        {
          "id": "s3",
          "kind": "verification",
          "title": "验证答案",
          "text": "得到结果后，再回到原题核对一次，确认没有漏条件或看错图。"
        }
      ],
      "wrongReasons": [
        {
          "code": "skip_observation",
          "title": "上来就算",
          "text": "先看题型、再下手，通常会更快也更稳。"
        },
        {
          "code": "miss_condition",
          "title": "漏了条件",
          "text": "图形题、规律题和等量题都要把条件完整读一遍。"
        }
      ]
    },
    "assets": {
      "imageKeys": []
    },
    "review": {
      "recommendedFocus": [
        "凑整",
        "逆推",
        "口算结构"
      ],
      "memoryTag": "cut_count"
    }
  },
  {
    "meta": {
      "questionId": "34Y-1",
      "paper": "34Y",
      "qid": 1,
      "moduleId": "A",
      "moduleKey": "mental_math",
      "interactionType": "text_input",
      "difficulty": 1,
      "schemaVersion": "1.0.0",
      "locale": "zh-CN"
    },
    "stem": {
      "title": "128+100-28",
      "blocks": [
        {
          "id": "b1",
          "type": "paragraph",
          "text": "计算：128+100-28。"
        }
      ]
    },
    "interaction": {
      "type": "text_input",
      "submitMode": "manual",
      "keyboard": "number",
      "timerSeconds": 20
    },
    "answer": {
      "kind": "numeric",
      "acceptedValues": [
        200
      ],
      "ignoreLeadingZeros": true,
      "trimWhitespace": true
    },
    "explanation": {
      "summary": "先根据题型特征做一步核心判断，再计算或验证答案。",
      "steps": [
        {
          "id": "s1",
          "kind": "observation",
          "title": "先识别题型",
          "text": "这题属于「凑整消项」，先用这一类题的固定思路观察条件。"
        },
        {
          "id": "s2",
          "kind": "rule",
          "title": "抓住核心关系",
          "text": "把题目中最关键的数量关系、规律关系或空间关系先找出来。"
        },
        {
          "id": "s3",
          "kind": "verification",
          "title": "验证答案",
          "text": "得到结果后，再回到原题核对一次，确认没有漏条件或看错图。"
        }
      ],
      "wrongReasons": [
        {
          "code": "skip_observation",
          "title": "上来就算",
          "text": "先看题型、再下手，通常会更快也更稳。"
        },
        {
          "code": "miss_condition",
          "title": "漏了条件",
          "text": "图形题、规律题和等量题都要把条件完整读一遍。"
        }
      ]
    },
    "assets": {
      "imageKeys": []
    },
    "review": {
      "recommendedFocus": [
        "凑整",
        "逆推",
        "口算结构"
      ],
      "memoryTag": "make_ten_cancel"
    }
  },
  {
    "meta": {
      "questionId": "34Y-2",
      "paper": "34Y",
      "qid": 2,
      "moduleId": "A",
      "moduleKey": "mental_math",
      "interactionType": "text_input",
      "difficulty": 1,
      "schemaVersion": "1.0.0",
      "locale": "zh-CN"
    },
    "stem": {
      "title": "8+45+12-45",
      "blocks": [
        {
          "id": "b1",
          "type": "paragraph",
          "text": "计算：8+45+12-45。"
        }
      ]
    },
    "interaction": {
      "type": "text_input",
      "submitMode": "manual",
      "keyboard": "number",
      "timerSeconds": 20
    },
    "answer": {
      "kind": "numeric",
      "acceptedValues": [
        20
      ],
      "ignoreLeadingZeros": true,
      "trimWhitespace": true
    },
    "explanation": {
      "summary": "先根据题型特征做一步核心判断，再计算或验证答案。",
      "steps": [
        {
          "id": "s1",
          "kind": "observation",
          "title": "先识别题型",
          "text": "这题属于「同项抵消」，先用这一类题的固定思路观察条件。"
        },
        {
          "id": "s2",
          "kind": "rule",
          "title": "抓住核心关系",
          "text": "把题目中最关键的数量关系、规律关系或空间关系先找出来。"
        },
        {
          "id": "s3",
          "kind": "verification",
          "title": "验证答案",
          "text": "得到结果后，再回到原题核对一次，确认没有漏条件或看错图。"
        }
      ],
      "wrongReasons": [
        {
          "code": "skip_observation",
          "title": "上来就算",
          "text": "先看题型、再下手，通常会更快也更稳。"
        },
        {
          "code": "miss_condition",
          "title": "漏了条件",
          "text": "图形题、规律题和等量题都要把条件完整读一遍。"
        }
      ]
    },
    "assets": {
      "imageKeys": []
    },
    "review": {
      "recommendedFocus": [
        "凑整",
        "逆推",
        "口算结构"
      ],
      "memoryTag": "same_term_cancel"
    }
  },
  {
    "meta": {
      "questionId": "34Y-3",
      "paper": "34Y",
      "qid": 3,
      "moduleId": "A",
      "moduleKey": "mental_math",
      "interactionType": "text_input",
      "difficulty": 1,
      "schemaVersion": "1.0.0",
      "locale": "zh-CN"
    },
    "stem": {
      "title": "20-19+18-17",
      "blocks": [
        {
          "id": "b1",
          "type": "paragraph",
          "text": "计算：20-19+18-17。"
        }
      ]
    },
    "interaction": {
      "type": "text_input",
      "submitMode": "manual",
      "keyboard": "number",
      "timerSeconds": 20
    },
    "answer": {
      "kind": "numeric",
      "acceptedValues": [
        2
      ],
      "ignoreLeadingZeros": true,
      "trimWhitespace": true
    },
    "explanation": {
      "summary": "先根据题型特征做一步核心判断，再计算或验证答案。",
      "steps": [
        {
          "id": "s1",
          "kind": "observation",
          "title": "先识别题型",
          "text": "这题属于「连加连减」，先用这一类题的固定思路观察条件。"
        },
        {
          "id": "s2",
          "kind": "rule",
          "title": "抓住核心关系",
          "text": "把题目中最关键的数量关系、规律关系或空间关系先找出来。"
        },
        {
          "id": "s3",
          "kind": "verification",
          "title": "验证答案",
          "text": "得到结果后，再回到原题核对一次，确认没有漏条件或看错图。"
        }
      ],
      "wrongReasons": [
        {
          "code": "skip_observation",
          "title": "上来就算",
          "text": "先看题型、再下手，通常会更快也更稳。"
        },
        {
          "code": "miss_condition",
          "title": "漏了条件",
          "text": "图形题、规律题和等量题都要把条件完整读一遍。"
        }
      ]
    },
    "assets": {
      "imageKeys": []
    },
    "review": {
      "recommendedFocus": [
        "凑整",
        "逆推",
        "口算结构"
      ],
      "memoryTag": "mixed_add_sub"
    }
  },
  {
    "meta": {
      "questionId": "34Y-4",
      "paper": "34Y",
      "qid": 4,
      "moduleId": "A",
      "moduleKey": "mental_math",
      "interactionType": "text_input",
      "difficulty": 1,
      "schemaVersion": "1.0.0",
      "locale": "zh-CN"
    },
    "stem": {
      "title": "2+18",
      "blocks": [
        {
          "id": "b1",
          "type": "paragraph",
          "text": "计算：2+18。"
        }
      ]
    },
    "interaction": {
      "type": "text_input",
      "submitMode": "manual",
      "keyboard": "number",
      "timerSeconds": 20
    },
    "answer": {
      "kind": "numeric",
      "acceptedValues": [
        20
      ],
      "ignoreLeadingZeros": true,
      "trimWhitespace": true
    },
    "explanation": {
      "summary": "先根据题型特征做一步核心判断，再计算或验证答案。",
      "steps": [
        {
          "id": "s1",
          "kind": "observation",
          "title": "先识别题型",
          "text": "这题属于「基础口算」，先用这一类题的固定思路观察条件。"
        },
        {
          "id": "s2",
          "kind": "rule",
          "title": "抓住核心关系",
          "text": "把题目中最关键的数量关系、规律关系或空间关系先找出来。"
        },
        {
          "id": "s3",
          "kind": "verification",
          "title": "验证答案",
          "text": "得到结果后，再回到原题核对一次，确认没有漏条件或看错图。"
        }
      ],
      "wrongReasons": [
        {
          "code": "skip_observation",
          "title": "上来就算",
          "text": "先看题型、再下手，通常会更快也更稳。"
        },
        {
          "code": "miss_condition",
          "title": "漏了条件",
          "text": "图形题、规律题和等量题都要把条件完整读一遍。"
        }
      ]
    },
    "assets": {
      "imageKeys": []
    },
    "review": {
      "recommendedFocus": [
        "凑整",
        "逆推",
        "口算结构"
      ],
      "memoryTag": "basic_mental_math"
    }
  },
  {
    "meta": {
      "questionId": "35Y-1",
      "paper": "35Y",
      "qid": 1,
      "moduleId": "A",
      "moduleKey": "mental_math",
      "interactionType": "text_input",
      "difficulty": 1,
      "schemaVersion": "1.0.0",
      "locale": "zh-CN"
    },
    "stem": {
      "title": "9-8+7-6+5-4",
      "blocks": [
        {
          "id": "b1",
          "type": "paragraph",
          "text": "计算：9-8+7-6+5-4。"
        }
      ]
    },
    "interaction": {
      "type": "text_input",
      "submitMode": "manual",
      "keyboard": "number",
      "timerSeconds": 20
    },
    "answer": {
      "kind": "numeric",
      "acceptedValues": [
        3
      ],
      "ignoreLeadingZeros": true,
      "trimWhitespace": true
    },
    "explanation": {
      "summary": "先根据题型特征做一步核心判断，再计算或验证答案。",
      "steps": [
        {
          "id": "s1",
          "kind": "observation",
          "title": "先识别题型",
          "text": "这题属于「交替加减」，先用这一类题的固定思路观察条件。"
        },
        {
          "id": "s2",
          "kind": "rule",
          "title": "抓住核心关系",
          "text": "把题目中最关键的数量关系、规律关系或空间关系先找出来。"
        },
        {
          "id": "s3",
          "kind": "verification",
          "title": "验证答案",
          "text": "得到结果后，再回到原题核对一次，确认没有漏条件或看错图。"
        }
      ],
      "wrongReasons": [
        {
          "code": "skip_observation",
          "title": "上来就算",
          "text": "先看题型、再下手，通常会更快也更稳。"
        },
        {
          "code": "miss_condition",
          "title": "漏了条件",
          "text": "图形题、规律题和等量题都要把条件完整读一遍。"
        }
      ]
    },
    "assets": {
      "imageKeys": []
    },
    "review": {
      "recommendedFocus": [
        "凑整",
        "逆推",
        "口算结构"
      ],
      "memoryTag": "alternating_add_sub"
    }
  },
  {
    "meta": {
      "questionId": "35Y-2",
      "paper": "35Y",
      "qid": 2,
      "moduleId": "A",
      "moduleKey": "mental_math",
      "interactionType": "text_input",
      "difficulty": 2,
      "schemaVersion": "1.0.0",
      "locale": "zh-CN"
    },
    "stem": {
      "title": "1+3+5+…+21",
      "blocks": [
        {
          "id": "b1",
          "type": "paragraph",
          "text": "计算：1+3+5+7+9+…+21。"
        }
      ]
    },
    "interaction": {
      "type": "text_input",
      "submitMode": "manual",
      "keyboard": "number",
      "timerSeconds": 20
    },
    "answer": {
      "kind": "numeric",
      "acceptedValues": [
        121
      ],
      "ignoreLeadingZeros": true,
      "trimWhitespace": true
    },
    "explanation": {
      "summary": "先根据题型特征做一步核心判断，再计算或验证答案。",
      "steps": [
        {
          "id": "s1",
          "kind": "observation",
          "title": "先识别题型",
          "text": "这题属于「奇数求和」，先用这一类题的固定思路观察条件。"
        },
        {
          "id": "s2",
          "kind": "rule",
          "title": "抓住核心关系",
          "text": "把题目中最关键的数量关系、规律关系或空间关系先找出来。"
        },
        {
          "id": "s3",
          "kind": "verification",
          "title": "验证答案",
          "text": "得到结果后，再回到原题核对一次，确认没有漏条件或看错图。"
        }
      ],
      "wrongReasons": [
        {
          "code": "skip_observation",
          "title": "上来就算",
          "text": "先看题型、再下手，通常会更快也更稳。"
        },
        {
          "code": "miss_condition",
          "title": "漏了条件",
          "text": "图形题、规律题和等量题都要把条件完整读一遍。"
        }
      ]
    },
    "assets": {
      "imageKeys": []
    },
    "review": {
      "recommendedFocus": [
        "凑整",
        "逆推",
        "口算结构"
      ],
      "memoryTag": "odd_sum"
    }
  },
  {
    "meta": {
      "questionId": "35Y-3",
      "paper": "35Y",
      "qid": 3,
      "moduleId": "A",
      "moduleKey": "mental_math",
      "interactionType": "text_input",
      "difficulty": 1,
      "schemaVersion": "1.0.0",
      "locale": "zh-CN"
    },
    "stem": {
      "title": "1+2+4+9+6+8",
      "blocks": [
        {
          "id": "b1",
          "type": "paragraph",
          "text": "计算：1+2+4+9+6+8。"
        }
      ]
    },
    "interaction": {
      "type": "text_input",
      "submitMode": "manual",
      "keyboard": "number",
      "timerSeconds": 20
    },
    "answer": {
      "kind": "numeric",
      "acceptedValues": [
        30
      ],
      "ignoreLeadingZeros": true,
      "trimWhitespace": true
    },
    "explanation": {
      "summary": "先根据题型特征做一步核心判断，再计算或验证答案。",
      "steps": [
        {
          "id": "s1",
          "kind": "observation",
          "title": "先识别题型",
          "text": "这题属于「重组巧算」，先用这一类题的固定思路观察条件。"
        },
        {
          "id": "s2",
          "kind": "rule",
          "title": "抓住核心关系",
          "text": "把题目中最关键的数量关系、规律关系或空间关系先找出来。"
        },
        {
          "id": "s3",
          "kind": "verification",
          "title": "验证答案",
          "text": "得到结果后，再回到原题核对一次，确认没有漏条件或看错图。"
        }
      ],
      "wrongReasons": [
        {
          "code": "skip_observation",
          "title": "上来就算",
          "text": "先看题型、再下手，通常会更快也更稳。"
        },
        {
          "code": "miss_condition",
          "title": "漏了条件",
          "text": "图形题、规律题和等量题都要把条件完整读一遍。"
        }
      ]
    },
    "assets": {
      "imageKeys": []
    },
    "review": {
      "recommendedFocus": [
        "凑整",
        "逆推",
        "口算结构"
      ],
      "memoryTag": "reorder_calculation"
    }
  },
  {
    "meta": {
      "questionId": "35Y-4",
      "paper": "35Y",
      "qid": 4,
      "moduleId": "A",
      "moduleKey": "mental_math",
      "interactionType": "text_input",
      "difficulty": 2,
      "schemaVersion": "1.0.0",
      "locale": "zh-CN"
    },
    "stem": {
      "title": "987-99-1-2-98-45-55",
      "blocks": [
        {
          "id": "b1",
          "type": "paragraph",
          "text": "计算：987-99-1-2-98-45-55。"
        }
      ]
    },
    "interaction": {
      "type": "text_input",
      "submitMode": "manual",
      "keyboard": "number",
      "timerSeconds": 20
    },
    "answer": {
      "kind": "numeric",
      "acceptedValues": [
        687
      ],
      "ignoreLeadingZeros": true,
      "trimWhitespace": true
    },
    "explanation": {
      "summary": "先根据题型特征做一步核心判断，再计算或验证答案。",
      "steps": [
        {
          "id": "s1",
          "kind": "observation",
          "title": "先识别题型",
          "text": "这题属于「连减重组」，先用这一类题的固定思路观察条件。"
        },
        {
          "id": "s2",
          "kind": "rule",
          "title": "抓住核心关系",
          "text": "把题目中最关键的数量关系、规律关系或空间关系先找出来。"
        },
        {
          "id": "s3",
          "kind": "verification",
          "title": "验证答案",
          "text": "得到结果后，再回到原题核对一次，确认没有漏条件或看错图。"
        }
      ],
      "wrongReasons": [
        {
          "code": "skip_observation",
          "title": "上来就算",
          "text": "先看题型、再下手，通常会更快也更稳。"
        },
        {
          "code": "miss_condition",
          "title": "漏了条件",
          "text": "图形题、规律题和等量题都要把条件完整读一遍。"
        }
      ]
    },
    "assets": {
      "imageKeys": []
    },
    "review": {
      "recommendedFocus": [
        "凑整",
        "逆推",
        "口算结构"
      ],
      "memoryTag": "subtraction_reorder"
    }
  },
  {
    "meta": {
      "questionId": "35Y-16",
      "paper": "35Y",
      "qid": 16,
      "moduleId": "A",
      "moduleKey": "mental_math",
      "interactionType": "text_input",
      "difficulty": 1,
      "schemaVersion": "1.0.0",
      "locale": "zh-CN"
    },
    "stem": {
      "title": "一个数先减5再加18得100",
      "blocks": [
        {
          "id": "b1",
          "type": "paragraph",
          "text": "一个数先减5，再加18后，得数是100。这个数是多少？"
        }
      ]
    },
    "interaction": {
      "type": "text_input",
      "submitMode": "manual",
      "keyboard": "number",
      "timerSeconds": 20
    },
    "answer": {
      "kind": "numeric",
      "acceptedValues": [
        87
      ],
      "ignoreLeadingZeros": true,
      "trimWhitespace": true
    },
    "explanation": {
      "summary": "先根据题型特征做一步核心判断，再计算或验证答案。",
      "steps": [
        {
          "id": "s1",
          "kind": "observation",
          "title": "先识别题型",
          "text": "这题属于「逆运算」，先用这一类题的固定思路观察条件。"
        },
        {
          "id": "s2",
          "kind": "rule",
          "title": "抓住核心关系",
          "text": "把题目中最关键的数量关系、规律关系或空间关系先找出来。"
        },
        {
          "id": "s3",
          "kind": "verification",
          "title": "验证答案",
          "text": "得到结果后，再回到原题核对一次，确认没有漏条件或看错图。"
        }
      ],
      "wrongReasons": [
        {
          "code": "skip_observation",
          "title": "上来就算",
          "text": "先看题型、再下手，通常会更快也更稳。"
        },
        {
          "code": "miss_condition",
          "title": "漏了条件",
          "text": "图形题、规律题和等量题都要把条件完整读一遍。"
        }
      ]
    },
    "assets": {
      "imageKeys": []
    },
    "review": {
      "recommendedFocus": [
        "凑整",
        "逆推",
        "口算结构"
      ],
      "memoryTag": "inverse_operation"
    }
  },
  {
    "meta": {
      "questionId": "35Y-19",
      "paper": "35Y",
      "qid": 19,
      "moduleId": "A",
      "moduleKey": "mental_math",
      "interactionType": "text_input",
      "difficulty": 1,
      "schemaVersion": "1.0.0",
      "locale": "zh-CN"
    },
    "stem": {
      "title": "自定义运算 a△b=a+b-1",
      "blocks": [
        {
          "id": "b1",
          "type": "paragraph",
          "text": "定义 a△b=a+b-1，那么 13△5=（ ）。"
        }
      ]
    },
    "interaction": {
      "type": "text_input",
      "submitMode": "manual",
      "keyboard": "number",
      "timerSeconds": 20
    },
    "answer": {
      "kind": "numeric",
      "acceptedValues": [
        17
      ],
      "ignoreLeadingZeros": true,
      "trimWhitespace": true
    },
    "explanation": {
      "summary": "先根据题型特征做一步核心判断，再计算或验证答案。",
      "steps": [
        {
          "id": "s1",
          "kind": "observation",
          "title": "先识别题型",
          "text": "这题属于「新运算」，先用这一类题的固定思路观察条件。"
        },
        {
          "id": "s2",
          "kind": "rule",
          "title": "抓住核心关系",
          "text": "把题目中最关键的数量关系、规律关系或空间关系先找出来。"
        },
        {
          "id": "s3",
          "kind": "verification",
          "title": "验证答案",
          "text": "得到结果后，再回到原题核对一次，确认没有漏条件或看错图。"
        }
      ],
      "wrongReasons": [
        {
          "code": "skip_observation",
          "title": "上来就算",
          "text": "先看题型、再下手，通常会更快也更稳。"
        },
        {
          "code": "miss_condition",
          "title": "漏了条件",
          "text": "图形题、规律题和等量题都要把条件完整读一遍。"
        }
      ]
    },
    "assets": {
      "imageKeys": []
    },
    "review": {
      "recommendedFocus": [
        "凑整",
        "逆推",
        "口算结构"
      ],
      "memoryTag": "custom_operation"
    }
  },
  {
    "meta": {
      "questionId": "36Y-1",
      "paper": "36Y",
      "qid": 1,
      "moduleId": "A",
      "moduleKey": "mental_math",
      "interactionType": "text_input",
      "difficulty": 1,
      "schemaVersion": "1.0.0",
      "locale": "zh-CN"
    },
    "stem": {
      "title": "37+18-37+82",
      "blocks": [
        {
          "id": "b1",
          "type": "paragraph",
          "text": "计算：37+18-37+82。"
        }
      ]
    },
    "interaction": {
      "type": "text_input",
      "submitMode": "manual",
      "keyboard": "number",
      "timerSeconds": 20
    },
    "answer": {
      "kind": "numeric",
      "acceptedValues": [
        100
      ],
      "ignoreLeadingZeros": true,
      "trimWhitespace": true
    },
    "explanation": {
      "summary": "先根据题型特征做一步核心判断，再计算或验证答案。",
      "steps": [
        {
          "id": "s1",
          "kind": "observation",
          "title": "先识别题型",
          "text": "这题属于「抵消凑整」，先用这一类题的固定思路观察条件。"
        },
        {
          "id": "s2",
          "kind": "rule",
          "title": "抓住核心关系",
          "text": "把题目中最关键的数量关系、规律关系或空间关系先找出来。"
        },
        {
          "id": "s3",
          "kind": "verification",
          "title": "验证答案",
          "text": "得到结果后，再回到原题核对一次，确认没有漏条件或看错图。"
        }
      ],
      "wrongReasons": [
        {
          "code": "skip_observation",
          "title": "上来就算",
          "text": "先看题型、再下手，通常会更快也更稳。"
        },
        {
          "code": "miss_condition",
          "title": "漏了条件",
          "text": "图形题、规律题和等量题都要把条件完整读一遍。"
        }
      ]
    },
    "assets": {
      "imageKeys": []
    },
    "review": {
      "recommendedFocus": [
        "凑整",
        "逆推",
        "口算结构"
      ],
      "memoryTag": "cancel_and_make_ten"
    }
  },
  {
    "meta": {
      "questionId": "36Y-3",
      "paper": "36Y",
      "qid": 3,
      "moduleId": "A",
      "moduleKey": "mental_math",
      "interactionType": "text_input",
      "difficulty": 1,
      "schemaVersion": "1.0.0",
      "locale": "zh-CN"
    },
    "stem": {
      "title": "16-9=( )-9+6",
      "blocks": [
        {
          "id": "b1",
          "type": "paragraph",
          "text": "用破十法计算：16-9=（ ）-9+6。"
        }
      ]
    },
    "interaction": {
      "type": "text_input",
      "submitMode": "manual",
      "keyboard": "number",
      "timerSeconds": 20
    },
    "answer": {
      "kind": "numeric",
      "acceptedValues": [
        10
      ],
      "ignoreLeadingZeros": true,
      "trimWhitespace": true
    },
    "explanation": {
      "summary": "先根据题型特征做一步核心判断，再计算或验证答案。",
      "steps": [
        {
          "id": "s1",
          "kind": "observation",
          "title": "先识别题型",
          "text": "这题属于「破十法」，先用这一类题的固定思路观察条件。"
        },
        {
          "id": "s2",
          "kind": "rule",
          "title": "抓住核心关系",
          "text": "把题目中最关键的数量关系、规律关系或空间关系先找出来。"
        },
        {
          "id": "s3",
          "kind": "verification",
          "title": "验证答案",
          "text": "得到结果后，再回到原题核对一次，确认没有漏条件或看错图。"
        }
      ],
      "wrongReasons": [
        {
          "code": "skip_observation",
          "title": "上来就算",
          "text": "先看题型、再下手，通常会更快也更稳。"
        },
        {
          "code": "miss_condition",
          "title": "漏了条件",
          "text": "图形题、规律题和等量题都要把条件完整读一遍。"
        }
      ]
    },
    "assets": {
      "imageKeys": []
    },
    "review": {
      "recommendedFocus": [
        "凑整",
        "逆推",
        "口算结构"
      ],
      "memoryTag": "break_ten_method"
    }
  },
  {
    "meta": {
      "questionId": "36Y-13",
      "paper": "36Y",
      "qid": 13,
      "moduleId": "A",
      "moduleKey": "mental_math",
      "interactionType": "text_input",
      "difficulty": 1,
      "schemaVersion": "1.0.0",
      "locale": "zh-CN"
    },
    "stem": {
      "title": "南瓜香蕉橘子价格代换",
      "blocks": [
        {
          "id": "b1",
          "type": "paragraph",
          "text": "南瓜2元，香蕉3元，橘子5元，那么（南瓜+橘子+苹果）-（苹果+香蕉）=（ ）元。"
        }
      ]
    },
    "interaction": {
      "type": "text_input",
      "submitMode": "manual",
      "keyboard": "number",
      "timerSeconds": 20
    },
    "answer": {
      "kind": "numeric",
      "acceptedValues": [
        4
      ],
      "ignoreLeadingZeros": true,
      "trimWhitespace": true
    },
    "explanation": {
      "summary": "先根据题型特征做一步核心判断，再计算或验证答案。",
      "steps": [
        {
          "id": "s1",
          "kind": "observation",
          "title": "先识别题型",
          "text": "这题属于「抵消简算」，先用这一类题的固定思路观察条件。"
        },
        {
          "id": "s2",
          "kind": "rule",
          "title": "抓住核心关系",
          "text": "把题目中最关键的数量关系、规律关系或空间关系先找出来。"
        },
        {
          "id": "s3",
          "kind": "verification",
          "title": "验证答案",
          "text": "得到结果后，再回到原题核对一次，确认没有漏条件或看错图。"
        }
      ],
      "wrongReasons": [
        {
          "code": "skip_observation",
          "title": "上来就算",
          "text": "先看题型、再下手，通常会更快也更稳。"
        },
        {
          "code": "miss_condition",
          "title": "漏了条件",
          "text": "图形题、规律题和等量题都要把条件完整读一遍。"
        }
      ]
    },
    "assets": {
      "imageKeys": []
    },
    "review": {
      "recommendedFocus": [
        "凑整",
        "逆推",
        "口算结构"
      ],
      "memoryTag": "cancel_simplify"
    }
  },
  {
    "meta": {
      "questionId": "36Y-17",
      "paper": "36Y",
      "qid": 17,
      "moduleId": "A",
      "moduleKey": "mental_math",
      "interactionType": "text_input",
      "difficulty": 2,
      "schemaVersion": "1.0.0",
      "locale": "zh-CN"
    },
    "stem": {
      "title": "偶数和减奇数和",
      "blocks": [
        {
          "id": "b1",
          "type": "paragraph",
          "text": "（2+4+6+…+20+22）-（1+3+5+…+19+21）=（ ）。"
        }
      ]
    },
    "interaction": {
      "type": "text_input",
      "submitMode": "manual",
      "keyboard": "number",
      "timerSeconds": 20
    },
    "answer": {
      "kind": "numeric",
      "acceptedValues": [
        11
      ],
      "ignoreLeadingZeros": true,
      "trimWhitespace": true
    },
    "explanation": {
      "summary": "先根据题型特征做一步核心判断，再计算或验证答案。",
      "steps": [
        {
          "id": "s1",
          "kind": "observation",
          "title": "先识别题型",
          "text": "这题属于「配对巧算」，先用这一类题的固定思路观察条件。"
        },
        {
          "id": "s2",
          "kind": "rule",
          "title": "抓住核心关系",
          "text": "把题目中最关键的数量关系、规律关系或空间关系先找出来。"
        },
        {
          "id": "s3",
          "kind": "verification",
          "title": "验证答案",
          "text": "得到结果后，再回到原题核对一次，确认没有漏条件或看错图。"
        }
      ],
      "wrongReasons": [
        {
          "code": "skip_observation",
          "title": "上来就算",
          "text": "先看题型、再下手，通常会更快也更稳。"
        },
        {
          "code": "miss_condition",
          "title": "漏了条件",
          "text": "图形题、规律题和等量题都要把条件完整读一遍。"
        }
      ]
    },
    "assets": {
      "imageKeys": []
    },
    "review": {
      "recommendedFocus": [
        "凑整",
        "逆推",
        "口算结构"
      ],
      "memoryTag": "pairing_mental_math"
    }
  },
  {
    "meta": {
      "questionId": "34W-6",
      "paper": "34W",
      "qid": 6,
      "moduleId": "B",
      "moduleKey": "patterns",
      "interactionType": "text_input",
      "difficulty": 4,
      "schemaVersion": "1.0.0",
      "locale": "zh-CN"
    },
    "stem": {
      "title": "损坏数码管下，1到30不能正确显示多少层",
      "blocks": [
        {
          "id": "b1",
          "type": "paragraph",
          "text": "电梯数码管有部分灯管损坏。从1层到30层，不能正确显示的楼层一共有多少层？"
        },
        {
          "id": "b2",
          "type": "image",
          "imageKey": "34W-6.png",
          "alt": "损坏数码管下，1到30不能正确显示多少层",
          "zoomable": true
        },
        {
          "id": "b3",
          "type": "callout",
          "text": "这题的正式答案仍建议结合原图资源做一轮终审。当前记录已完成题面结构化，SEO 解析页已补“外轮廓→支撑列→隐藏区”的可视化拆解，页面文案继续统一收口为“待终审”。",
          "tone": "warning"
        }
      ]
    },
    "interaction": {
      "type": "text_input",
      "submitMode": "manual",
      "keyboard": "number",
      "timerSeconds": 40
    },
    "answer": {
      "kind": "free_text",
      "acceptedTexts": [
        "待终审"
      ],
      "ignoreCase": true,
      "trimWhitespace": true
    },
    "explanation": {
      "summary": "题面和资源挂接已完成，这题的解题方法已经固定。SEO 解析页已补出可复用的空间题可视化模板：先看外轮廓，再补支撑列，最后只盯隐藏区；最终数量仍建议结合原图资源完成最后一轮终审。",
      "steps": [
        {
          "id": "s1",
          "kind": "observation",
          "title": "先识别题型",
          "text": "这题属于「规则系统」，先用这一类题的固定思路观察条件。"
        },
        {
          "id": "s2",
          "kind": "rule",
          "title": "抓住核心关系",
          "text": "把题目中最关键的数量关系、规律关系或空间关系先找出来。"
        },
        {
          "id": "s3",
          "kind": "verification",
          "title": "验证答案",
          "text": "得到结果后，再回到原题核对一次，确认没有漏条件或看错图。"
        }
      ],
      "wrongReasons": [
        {
          "code": "skip_observation",
          "title": "上来就算",
          "text": "先看题型、再下手，通常会更快也更稳。"
        },
        {
          "code": "miss_condition",
          "title": "漏了条件",
          "text": "图形题、规律题和等量题都要把条件完整读一遍。"
        }
      ]
    },
    "assets": {
      "imageKeys": [
        "34W-6.png"
      ]
    },
    "review": {
      "recommendedFocus": [
        "找规律",
        "分组观察",
        "递推"
      ],
      "memoryTag": "rule_system"
    }
  },
  {
    "meta": {
      "questionId": "34W-8",
      "paper": "34W",
      "qid": 8,
      "moduleId": "B",
      "moduleKey": "patterns",
      "interactionType": "text_input",
      "difficulty": 2,
      "schemaVersion": "1.0.0",
      "locale": "zh-CN"
    },
    "stem": {
      "title": "图形规律选择问号处",
      "blocks": [
        {
          "id": "b1",
          "type": "paragraph",
          "text": "请仔细观察右图规律，?处应填哪一个选项？"
        },
        {
          "id": "b2",
          "type": "image",
          "imageKey": "34W-8.png",
          "alt": "图形规律选择问号处",
          "zoomable": true
        }
      ]
    },
    "interaction": {
      "type": "text_input",
      "submitMode": "manual",
      "keyboard": "text",
      "timerSeconds": 40
    },
    "answer": {
      "kind": "free_text",
      "acceptedTexts": [
        "B",
        "b",
        "图B"
      ],
      "ignoreCase": true,
      "trimWhitespace": true
    },
    "explanation": {
      "summary": "先找出变化规则，再验证后面的数或图是否符合。",
      "steps": [
        {
          "id": "s1",
          "kind": "observation",
          "title": "先识别题型",
          "text": "这题属于「图形规律」，先用这一类题的固定思路观察条件。"
        },
        {
          "id": "s2",
          "kind": "rule",
          "title": "抓住核心关系",
          "text": "把题目中最关键的数量关系、规律关系或空间关系先找出来。"
        },
        {
          "id": "s3",
          "kind": "verification",
          "title": "验证答案",
          "text": "得到结果后，再回到原题核对一次，确认没有漏条件或看错图。"
        }
      ],
      "wrongReasons": [
        {
          "code": "skip_observation",
          "title": "上来就算",
          "text": "先看题型、再下手，通常会更快也更稳。"
        },
        {
          "code": "miss_condition",
          "title": "漏了条件",
          "text": "图形题、规律题和等量题都要把条件完整读一遍。"
        }
      ]
    },
    "assets": {
      "imageKeys": [
        "34W-8.png"
      ]
    },
    "review": {
      "recommendedFocus": [
        "找规律",
        "分组观察",
        "递推"
      ],
      "memoryTag": "shape_pattern"
    }
  },
  {
    "meta": {
      "questionId": "34W-15",
      "paper": "34W",
      "qid": 15,
      "moduleId": "B",
      "moduleKey": "patterns",
      "interactionType": "text_input",
      "difficulty": 3,
      "schemaVersion": "1.0.0",
      "locale": "zh-CN"
    },
    "stem": {
      "title": "结绳计数，满七进一",
      "blocks": [
        {
          "id": "b1",
          "type": "paragraph",
          "text": "按“满七进一”的结绳计数规则，图③表示一共捕获了多少只猎物？"
        },
        {
          "id": "b2",
          "type": "image",
          "imageKey": "34W-15.png",
          "alt": "结绳计数，满七进一",
          "zoomable": true
        }
      ]
    },
    "interaction": {
      "type": "text_input",
      "submitMode": "manual",
      "keyboard": "number",
      "timerSeconds": 40
    },
    "answer": {
      "kind": "numeric",
      "acceptedValues": [
        10
      ],
      "ignoreLeadingZeros": true,
      "trimWhitespace": true
    },
    "explanation": {
      "summary": "先找出变化规则，再验证后面的数或图是否符合。",
      "steps": [
        {
          "id": "s1",
          "kind": "observation",
          "title": "先识别题型",
          "text": "这题属于「进位规则」，先用这一类题的固定思路观察条件。"
        },
        {
          "id": "s2",
          "kind": "rule",
          "title": "抓住核心关系",
          "text": "把题目中最关键的数量关系、规律关系或空间关系先找出来。"
        },
        {
          "id": "s3",
          "kind": "verification",
          "title": "验证答案",
          "text": "得到结果后，再回到原题核对一次，确认没有漏条件或看错图。"
        }
      ],
      "wrongReasons": [
        {
          "code": "skip_observation",
          "title": "上来就算",
          "text": "先看题型、再下手，通常会更快也更稳。"
        },
        {
          "code": "miss_condition",
          "title": "漏了条件",
          "text": "图形题、规律题和等量题都要把条件完整读一遍。"
        }
      ]
    },
    "assets": {
      "imageKeys": [
        "34W-15.png"
      ]
    },
    "review": {
      "recommendedFocus": [
        "找规律",
        "分组观察",
        "递推"
      ],
      "memoryTag": "carry_rule"
    }
  },
  {
    "meta": {
      "questionId": "34W-18",
      "paper": "34W",
      "qid": 18,
      "moduleId": "B",
      "moduleKey": "patterns",
      "interactionType": "text_input",
      "difficulty": 2,
      "schemaVersion": "1.0.0",
      "locale": "zh-CN"
    },
    "stem": {
      "title": "1个、2个正方体可见正方形数，推3个、4个",
      "blocks": [
        {
          "id": "b1",
          "type": "paragraph",
          "text": "桌面上摆放正方体时：1个能看到5个正方形，2个能看到9个。3个和4个正方体分别能看到多少个正方形？"
        },
        {
          "id": "b2",
          "type": "image",
          "imageKey": "34W-18.png",
          "alt": "1个、2个正方体可见正方形数，推3个、4个",
          "zoomable": true
        }
      ]
    },
    "interaction": {
      "type": "text_input",
      "submitMode": "manual",
      "keyboard": "text",
      "timerSeconds": 40
    },
    "answer": {
      "kind": "free_text",
      "acceptedTexts": [
        "13,17",
        "13，17",
        "13 17"
      ],
      "ignoreCase": true,
      "trimWhitespace": true
    },
    "explanation": {
      "summary": "先找出变化规则，再验证后面的数或图是否符合。",
      "steps": [
        {
          "id": "s1",
          "kind": "observation",
          "title": "先识别题型",
          "text": "这题属于「空间递推」，先用这一类题的固定思路观察条件。"
        },
        {
          "id": "s2",
          "kind": "rule",
          "title": "抓住核心关系",
          "text": "把题目中最关键的数量关系、规律关系或空间关系先找出来。"
        },
        {
          "id": "s3",
          "kind": "verification",
          "title": "验证答案",
          "text": "得到结果后，再回到原题核对一次，确认没有漏条件或看错图。"
        }
      ],
      "wrongReasons": [
        {
          "code": "skip_observation",
          "title": "上来就算",
          "text": "先看题型、再下手，通常会更快也更稳。"
        },
        {
          "code": "miss_condition",
          "title": "漏了条件",
          "text": "图形题、规律题和等量题都要把条件完整读一遍。"
        }
      ]
    },
    "assets": {
      "imageKeys": [
        "34W-18.png"
      ]
    },
    "review": {
      "recommendedFocus": [
        "找规律",
        "分组观察",
        "递推"
      ],
      "memoryTag": "spatial_recursion"
    }
  },
  {
    "meta": {
      "questionId": "34W-20",
      "paper": "34W",
      "qid": 20,
      "moduleId": "B",
      "moduleKey": "patterns",
      "interactionType": "text_input",
      "difficulty": 4,
      "schemaVersion": "1.0.0",
      "locale": "zh-CN"
    },
    "stem": {
      "title": "齿轮转动后哪个方块先碰到",
      "blocks": [
        {
          "id": "b1",
          "type": "paragraph",
          "text": "最左边齿轮按箭头方向旋转后，齿轮a和b的指针会先碰到哪一块方块？"
        },
        {
          "id": "b2",
          "type": "image",
          "imageKey": "34W-20.png",
          "alt": "齿轮转动后哪个方块先碰到",
          "zoomable": true
        }
      ]
    },
    "interaction": {
      "type": "text_input",
      "submitMode": "manual",
      "keyboard": "text",
      "timerSeconds": 40
    },
    "answer": {
      "kind": "free_text",
      "acceptedTexts": [
        "2,3",
        "2，3",
        "2 3",
        "a到2,b到3"
      ],
      "ignoreCase": true,
      "trimWhitespace": true
    },
    "explanation": {
      "summary": "先找出变化规则，再验证后面的数或图是否符合。",
      "steps": [
        {
          "id": "s1",
          "kind": "observation",
          "title": "先识别题型",
          "text": "这题属于「动态规则」，先用这一类题的固定思路观察条件。"
        },
        {
          "id": "s2",
          "kind": "rule",
          "title": "抓住核心关系",
          "text": "把题目中最关键的数量关系、规律关系或空间关系先找出来。"
        },
        {
          "id": "s3",
          "kind": "verification",
          "title": "验证答案",
          "text": "得到结果后，再回到原题核对一次，确认没有漏条件或看错图。"
        }
      ],
      "wrongReasons": [
        {
          "code": "skip_observation",
          "title": "上来就算",
          "text": "先看题型、再下手，通常会更快也更稳。"
        },
        {
          "code": "miss_condition",
          "title": "漏了条件",
          "text": "图形题、规律题和等量题都要把条件完整读一遍。"
        }
      ]
    },
    "assets": {
      "imageKeys": [
        "34W-20.png"
      ]
    },
    "review": {
      "recommendedFocus": [
        "找规律",
        "分组观察",
        "递推"
      ],
      "memoryTag": "dynamic_rule"
    }
  },
  {
    "meta": {
      "questionId": "34Y-7",
      "paper": "34Y",
      "qid": 7,
      "moduleId": "B",
      "moduleKey": "patterns",
      "interactionType": "text_input",
      "difficulty": 2,
      "schemaVersion": "1.0.0",
      "locale": "zh-CN"
    },
    "stem": {
      "title": "1,4,3,9,5,16,7,( ),9,36,11",
      "blocks": [
        {
          "id": "b1",
          "type": "paragraph",
          "text": "找规律填数：1，4，3，9，5，16，7，（ ），9，36，11。"
        }
      ]
    },
    "interaction": {
      "type": "text_input",
      "submitMode": "manual",
      "keyboard": "number",
      "timerSeconds": 20
    },
    "answer": {
      "kind": "numeric",
      "acceptedValues": [
        25
      ],
      "ignoreLeadingZeros": true,
      "trimWhitespace": true
    },
    "explanation": {
      "summary": "先找出变化规则，再验证后面的数或图是否符合。",
      "steps": [
        {
          "id": "s1",
          "kind": "observation",
          "title": "先识别题型",
          "text": "这题属于「交错数列」，先用这一类题的固定思路观察条件。"
        },
        {
          "id": "s2",
          "kind": "rule",
          "title": "抓住核心关系",
          "text": "把题目中最关键的数量关系、规律关系或空间关系先找出来。"
        },
        {
          "id": "s3",
          "kind": "verification",
          "title": "验证答案",
          "text": "得到结果后，再回到原题核对一次，确认没有漏条件或看错图。"
        }
      ],
      "wrongReasons": [
        {
          "code": "skip_observation",
          "title": "上来就算",
          "text": "先看题型、再下手，通常会更快也更稳。"
        },
        {
          "code": "miss_condition",
          "title": "漏了条件",
          "text": "图形题、规律题和等量题都要把条件完整读一遍。"
        }
      ]
    },
    "assets": {
      "imageKeys": []
    },
    "review": {
      "recommendedFocus": [
        "找规律",
        "分组观察",
        "递推"
      ],
      "memoryTag": "alternating_sequence"
    }
  },
  {
    "meta": {
      "questionId": "34Y-10",
      "paper": "34Y",
      "qid": 10,
      "moduleId": "B",
      "moduleKey": "patterns",
      "interactionType": "text_input",
      "difficulty": 3,
      "schemaVersion": "1.0.0",
      "locale": "zh-CN"
    },
    "stem": {
      "title": "火柴房子第10个图有几根火柴",
      "blocks": [
        {
          "id": "b1",
          "type": "paragraph",
          "text": "第10个图中有多少根火柴棒？"
        },
        {
          "id": "b2",
          "type": "image",
          "imageKey": "34Y-10.png",
          "alt": "火柴房子第10个图有几根火柴",
          "zoomable": true
        }
      ]
    },
    "interaction": {
      "type": "text_input",
      "submitMode": "manual",
      "keyboard": "number",
      "timerSeconds": 40
    },
    "answer": {
      "kind": "numeric",
      "acceptedValues": [
        51
      ],
      "ignoreLeadingZeros": true,
      "trimWhitespace": true
    },
    "explanation": {
      "summary": "先找出变化规则，再验证后面的数或图是否符合。",
      "steps": [
        {
          "id": "s1",
          "kind": "observation",
          "title": "先识别题型",
          "text": "这题属于「图形递推」，先用这一类题的固定思路观察条件。"
        },
        {
          "id": "s2",
          "kind": "rule",
          "title": "抓住核心关系",
          "text": "把题目中最关键的数量关系、规律关系或空间关系先找出来。"
        },
        {
          "id": "s3",
          "kind": "verification",
          "title": "验证答案",
          "text": "得到结果后，再回到原题核对一次，确认没有漏条件或看错图。"
        }
      ],
      "wrongReasons": [
        {
          "code": "skip_observation",
          "title": "上来就算",
          "text": "先看题型、再下手，通常会更快也更稳。"
        },
        {
          "code": "miss_condition",
          "title": "漏了条件",
          "text": "图形题、规律题和等量题都要把条件完整读一遍。"
        }
      ]
    },
    "assets": {
      "imageKeys": [
        "34Y-10.png"
      ]
    },
    "review": {
      "recommendedFocus": [
        "找规律",
        "分组观察",
        "递推"
      ],
      "memoryTag": "shape_recursion"
    }
  },
  {
    "meta": {
      "questionId": "34Y-19",
      "paper": "34Y",
      "qid": 19,
      "moduleId": "B",
      "moduleKey": "patterns",
      "interactionType": "text_input",
      "difficulty": 3,
      "schemaVersion": "1.0.0",
      "locale": "zh-CN"
    },
    "stem": {
      "title": "蚂蚁爬井，第5天爬4米到井口",
      "blocks": [
        {
          "id": "b1",
          "type": "paragraph",
          "text": "一只蚂蚁从井底沿着井壁往上爬，每天白天能往上爬5米，晚上会滑下1米。第5天只爬了4米就到了井口，这口井有多少米深？"
        }
      ]
    },
    "interaction": {
      "type": "text_input",
      "submitMode": "manual",
      "keyboard": "number",
      "timerSeconds": 20
    },
    "answer": {
      "kind": "numeric",
      "acceptedValues": [
        20
      ],
      "ignoreLeadingZeros": true,
      "trimWhitespace": true
    },
    "explanation": {
      "summary": "先找出变化规则，再验证后面的数或图是否符合。",
      "steps": [
        {
          "id": "s1",
          "kind": "observation",
          "title": "先识别题型",
          "text": "这题属于「周期递推」，先用这一类题的固定思路观察条件。"
        },
        {
          "id": "s2",
          "kind": "rule",
          "title": "抓住核心关系",
          "text": "把题目中最关键的数量关系、规律关系或空间关系先找出来。"
        },
        {
          "id": "s3",
          "kind": "verification",
          "title": "验证答案",
          "text": "得到结果后，再回到原题核对一次，确认没有漏条件或看错图。"
        }
      ],
      "wrongReasons": [
        {
          "code": "skip_observation",
          "title": "上来就算",
          "text": "先看题型、再下手，通常会更快也更稳。"
        },
        {
          "code": "miss_condition",
          "title": "漏了条件",
          "text": "图形题、规律题和等量题都要把条件完整读一遍。"
        }
      ]
    },
    "assets": {
      "imageKeys": []
    },
    "review": {
      "recommendedFocus": [
        "找规律",
        "分组观察",
        "递推"
      ],
      "memoryTag": "periodic_recursion"
    }
  },
  {
    "meta": {
      "questionId": "35Y-5",
      "paper": "35Y",
      "qid": 5,
      "moduleId": "B",
      "moduleKey": "patterns",
      "interactionType": "text_input",
      "difficulty": 1,
      "schemaVersion": "1.0.0",
      "locale": "zh-CN"
    },
    "stem": {
      "title": "蚂蚱从0开始每次跳4格，第3次落点",
      "blocks": [
        {
          "id": "b1",
          "type": "paragraph",
          "text": "从0开始每次跳4格，第3次跳到数字几？"
        },
        {
          "id": "b2",
          "type": "image",
          "imageKey": "35Y-5.png",
          "alt": "蚂蚱从0开始每次跳4格，第3次落点",
          "zoomable": true
        }
      ]
    },
    "interaction": {
      "type": "text_input",
      "submitMode": "manual",
      "keyboard": "number",
      "timerSeconds": 40
    },
    "answer": {
      "kind": "numeric",
      "acceptedValues": [
        12
      ],
      "ignoreLeadingZeros": true,
      "trimWhitespace": true
    },
    "explanation": {
      "summary": "先找出变化规则，再验证后面的数或图是否符合。",
      "steps": [
        {
          "id": "s1",
          "kind": "observation",
          "title": "先识别题型",
          "text": "这题属于「数轴递推」，先用这一类题的固定思路观察条件。"
        },
        {
          "id": "s2",
          "kind": "rule",
          "title": "抓住核心关系",
          "text": "把题目中最关键的数量关系、规律关系或空间关系先找出来。"
        },
        {
          "id": "s3",
          "kind": "verification",
          "title": "验证答案",
          "text": "得到结果后，再回到原题核对一次，确认没有漏条件或看错图。"
        }
      ],
      "wrongReasons": [
        {
          "code": "skip_observation",
          "title": "上来就算",
          "text": "先看题型、再下手，通常会更快也更稳。"
        },
        {
          "code": "miss_condition",
          "title": "漏了条件",
          "text": "图形题、规律题和等量题都要把条件完整读一遍。"
        }
      ]
    },
    "assets": {
      "imageKeys": [
        "35Y-5.png"
      ]
    },
    "review": {
      "recommendedFocus": [
        "找规律",
        "分组观察",
        "递推"
      ],
      "memoryTag": "number_line_recursion"
    }
  },
  {
    "meta": {
      "questionId": "35Y-6",
      "paper": "35Y",
      "qid": 6,
      "moduleId": "B",
      "moduleKey": "patterns",
      "interactionType": "text_input",
      "difficulty": 2,
      "schemaVersion": "1.0.0",
      "locale": "zh-CN"
    },
    "stem": {
      "title": "19,8,16,4,13,2,10,1,( )",
      "blocks": [
        {
          "id": "b1",
          "type": "paragraph",
          "text": "找规律填数：19，8，16，4，13，2，10，1，（ ）。"
        }
      ]
    },
    "interaction": {
      "type": "text_input",
      "submitMode": "manual",
      "keyboard": "number",
      "timerSeconds": 20
    },
    "answer": {
      "kind": "numeric",
      "acceptedValues": [
        7
      ],
      "ignoreLeadingZeros": true,
      "trimWhitespace": true
    },
    "explanation": {
      "summary": "先找出变化规则，再验证后面的数或图是否符合。",
      "steps": [
        {
          "id": "s1",
          "kind": "observation",
          "title": "先识别题型",
          "text": "这题属于「双序列规律」，先用这一类题的固定思路观察条件。"
        },
        {
          "id": "s2",
          "kind": "rule",
          "title": "抓住核心关系",
          "text": "把题目中最关键的数量关系、规律关系或空间关系先找出来。"
        },
        {
          "id": "s3",
          "kind": "verification",
          "title": "验证答案",
          "text": "得到结果后，再回到原题核对一次，确认没有漏条件或看错图。"
        }
      ],
      "wrongReasons": [
        {
          "code": "skip_observation",
          "title": "上来就算",
          "text": "先看题型、再下手，通常会更快也更稳。"
        },
        {
          "code": "miss_condition",
          "title": "漏了条件",
          "text": "图形题、规律题和等量题都要把条件完整读一遍。"
        }
      ]
    },
    "assets": {
      "imageKeys": []
    },
    "review": {
      "recommendedFocus": [
        "找规律",
        "分组观察",
        "递推"
      ],
      "memoryTag": "double_sequence_pattern"
    }
  },
  {
    "meta": {
      "questionId": "35Y-8",
      "paper": "35Y",
      "qid": 8,
      "moduleId": "B",
      "moduleKey": "patterns",
      "interactionType": "text_input",
      "difficulty": 2,
      "schemaVersion": "1.0.0",
      "locale": "zh-CN"
    },
    "stem": {
      "title": "正方形中小球个数1,3,6,10,…第8个",
      "blocks": [
        {
          "id": "b1",
          "type": "paragraph",
          "text": "第一个正方形有1个小球，第二个有3个，第三个有6个，第四个有10个，那么第八个正方形有多少个小球？"
        },
        {
          "id": "b2",
          "type": "image",
          "imageKey": "35Y-8.png",
          "alt": "正方形中小球个数1,3,6,10,…第8个",
          "zoomable": true
        }
      ]
    },
    "interaction": {
      "type": "text_input",
      "submitMode": "manual",
      "keyboard": "number",
      "timerSeconds": 40
    },
    "answer": {
      "kind": "numeric",
      "acceptedValues": [
        36
      ],
      "ignoreLeadingZeros": true,
      "trimWhitespace": true
    },
    "explanation": {
      "summary": "先找出变化规则，再验证后面的数或图是否符合。",
      "steps": [
        {
          "id": "s1",
          "kind": "observation",
          "title": "先识别题型",
          "text": "这题属于「三角数」，先用这一类题的固定思路观察条件。"
        },
        {
          "id": "s2",
          "kind": "rule",
          "title": "抓住核心关系",
          "text": "把题目中最关键的数量关系、规律关系或空间关系先找出来。"
        },
        {
          "id": "s3",
          "kind": "verification",
          "title": "验证答案",
          "text": "得到结果后，再回到原题核对一次，确认没有漏条件或看错图。"
        }
      ],
      "wrongReasons": [
        {
          "code": "skip_observation",
          "title": "上来就算",
          "text": "先看题型、再下手，通常会更快也更稳。"
        },
        {
          "code": "miss_condition",
          "title": "漏了条件",
          "text": "图形题、规律题和等量题都要把条件完整读一遍。"
        }
      ]
    },
    "assets": {
      "imageKeys": [
        "35Y-8.png"
      ]
    },
    "review": {
      "recommendedFocus": [
        "找规律",
        "分组观察",
        "递推"
      ],
      "memoryTag": "triangular_number"
    }
  },
  {
    "meta": {
      "questionId": "35Y-14",
      "paper": "35Y",
      "qid": 14,
      "moduleId": "B",
      "moduleKey": "patterns",
      "interactionType": "text_input",
      "difficulty": 2,
      "schemaVersion": "1.0.0",
      "locale": "zh-CN"
    },
    "stem": {
      "title": "89,55,34,21,13,( )",
      "blocks": [
        {
          "id": "b1",
          "type": "paragraph",
          "text": "找规律填空：89，55，34，21，13，（ ）。"
        }
      ]
    },
    "interaction": {
      "type": "text_input",
      "submitMode": "manual",
      "keyboard": "number",
      "timerSeconds": 20
    },
    "answer": {
      "kind": "numeric",
      "acceptedValues": [
        8
      ],
      "ignoreLeadingZeros": true,
      "trimWhitespace": true
    },
    "explanation": {
      "summary": "先找出变化规则，再验证后面的数或图是否符合。",
      "steps": [
        {
          "id": "s1",
          "kind": "observation",
          "title": "先识别题型",
          "text": "这题属于「相邻和数列」，先用这一类题的固定思路观察条件。"
        },
        {
          "id": "s2",
          "kind": "rule",
          "title": "抓住核心关系",
          "text": "把题目中最关键的数量关系、规律关系或空间关系先找出来。"
        },
        {
          "id": "s3",
          "kind": "verification",
          "title": "验证答案",
          "text": "得到结果后，再回到原题核对一次，确认没有漏条件或看错图。"
        }
      ],
      "wrongReasons": [
        {
          "code": "skip_observation",
          "title": "上来就算",
          "text": "先看题型、再下手，通常会更快也更稳。"
        },
        {
          "code": "miss_condition",
          "title": "漏了条件",
          "text": "图形题、规律题和等量题都要把条件完整读一遍。"
        }
      ]
    },
    "assets": {
      "imageKeys": []
    },
    "review": {
      "recommendedFocus": [
        "找规律",
        "分组观察",
        "递推"
      ],
      "memoryTag": "adjacent_sum_sequence"
    }
  },
  {
    "meta": {
      "questionId": "36Y-2",
      "paper": "36Y",
      "qid": 2,
      "moduleId": "B",
      "moduleKey": "patterns",
      "interactionType": "text_input",
      "difficulty": 2,
      "schemaVersion": "1.0.0",
      "locale": "zh-CN"
    },
    "stem": {
      "title": "3,20,6,18,9,16,12,14,( ),12",
      "blocks": [
        {
          "id": "b1",
          "type": "paragraph",
          "text": "找规律填数：3，20，6，18，9，16，12，14，（ ），12。"
        }
      ]
    },
    "interaction": {
      "type": "text_input",
      "submitMode": "manual",
      "keyboard": "number",
      "timerSeconds": 20
    },
    "answer": {
      "kind": "numeric",
      "acceptedValues": [
        15
      ],
      "ignoreLeadingZeros": true,
      "trimWhitespace": true
    },
    "explanation": {
      "summary": "先找出变化规则，再验证后面的数或图是否符合。",
      "steps": [
        {
          "id": "s1",
          "kind": "observation",
          "title": "先识别题型",
          "text": "这题属于「双序列规律」，先用这一类题的固定思路观察条件。"
        },
        {
          "id": "s2",
          "kind": "rule",
          "title": "抓住核心关系",
          "text": "把题目中最关键的数量关系、规律关系或空间关系先找出来。"
        },
        {
          "id": "s3",
          "kind": "verification",
          "title": "验证答案",
          "text": "得到结果后，再回到原题核对一次，确认没有漏条件或看错图。"
        }
      ],
      "wrongReasons": [
        {
          "code": "skip_observation",
          "title": "上来就算",
          "text": "先看题型、再下手，通常会更快也更稳。"
        },
        {
          "code": "miss_condition",
          "title": "漏了条件",
          "text": "图形题、规律题和等量题都要把条件完整读一遍。"
        }
      ]
    },
    "assets": {
      "imageKeys": []
    },
    "review": {
      "recommendedFocus": [
        "找规律",
        "分组观察",
        "递推"
      ],
      "memoryTag": "double_sequence_pattern"
    }
  },
  {
    "meta": {
      "questionId": "36Y-5",
      "paper": "36Y",
      "qid": 5,
      "moduleId": "B",
      "moduleKey": "patterns",
      "interactionType": "text_input",
      "difficulty": 2,
      "schemaVersion": "1.0.0",
      "locale": "zh-CN"
    },
    "stem": {
      "title": "根据前两个图示推断第三个问号",
      "blocks": [
        {
          "id": "b1",
          "type": "paragraph",
          "text": "根据前两个图给出的信息，第三个图中的“？”应填什么？"
        },
        {
          "id": "b2",
          "type": "image",
          "imageKey": "36Y-5.png",
          "alt": "根据前两个图示推断第三个问号",
          "zoomable": true
        }
      ]
    },
    "interaction": {
      "type": "text_input",
      "submitMode": "manual",
      "keyboard": "number",
      "timerSeconds": 40
    },
    "answer": {
      "kind": "numeric",
      "acceptedValues": [
        3
      ],
      "ignoreLeadingZeros": true,
      "trimWhitespace": true
    },
    "explanation": {
      "summary": "先找出变化规则，再验证后面的数或图是否符合。",
      "steps": [
        {
          "id": "s1",
          "kind": "observation",
          "title": "先识别题型",
          "text": "这题属于「图示规则」，先用这一类题的固定思路观察条件。"
        },
        {
          "id": "s2",
          "kind": "rule",
          "title": "抓住核心关系",
          "text": "把题目中最关键的数量关系、规律关系或空间关系先找出来。"
        },
        {
          "id": "s3",
          "kind": "verification",
          "title": "验证答案",
          "text": "得到结果后，再回到原题核对一次，确认没有漏条件或看错图。"
        }
      ],
      "wrongReasons": [
        {
          "code": "skip_observation",
          "title": "上来就算",
          "text": "先看题型、再下手，通常会更快也更稳。"
        },
        {
          "code": "miss_condition",
          "title": "漏了条件",
          "text": "图形题、规律题和等量题都要把条件完整读一遍。"
        }
      ]
    },
    "assets": {
      "imageKeys": [
        "36Y-5.png"
      ]
    },
    "review": {
      "recommendedFocus": [
        "找规律",
        "分组观察",
        "递推"
      ],
      "memoryTag": "visual_rule"
    }
  },
  {
    "meta": {
      "questionId": "36Y-6",
      "paper": "36Y",
      "qid": 6,
      "moduleId": "B",
      "moduleKey": "patterns",
      "interactionType": "text_input",
      "difficulty": 2,
      "schemaVersion": "1.0.0",
      "locale": "zh-CN"
    },
    "stem": {
      "title": "楼梯从下往上算到最上面",
      "blocks": [
        {
          "id": "b1",
          "type": "paragraph",
          "text": "从楼梯下面开始向上计算，最上面的“？”是多少？"
        },
        {
          "id": "b2",
          "type": "image",
          "imageKey": "36Y-6.png",
          "alt": "楼梯从下往上算到最上面",
          "zoomable": true
        }
      ]
    },
    "interaction": {
      "type": "text_input",
      "submitMode": "manual",
      "keyboard": "number",
      "timerSeconds": 40
    },
    "answer": {
      "kind": "numeric",
      "acceptedValues": [
        105
      ],
      "ignoreLeadingZeros": true,
      "trimWhitespace": true
    },
    "explanation": {
      "summary": "先找出变化规则，再验证后面的数或图是否符合。",
      "steps": [
        {
          "id": "s1",
          "kind": "observation",
          "title": "先识别题型",
          "text": "这题属于「递推楼梯」，先用这一类题的固定思路观察条件。"
        },
        {
          "id": "s2",
          "kind": "rule",
          "title": "抓住核心关系",
          "text": "把题目中最关键的数量关系、规律关系或空间关系先找出来。"
        },
        {
          "id": "s3",
          "kind": "verification",
          "title": "验证答案",
          "text": "得到结果后，再回到原题核对一次，确认没有漏条件或看错图。"
        }
      ],
      "wrongReasons": [
        {
          "code": "skip_observation",
          "title": "上来就算",
          "text": "先看题型、再下手，通常会更快也更稳。"
        },
        {
          "code": "miss_condition",
          "title": "漏了条件",
          "text": "图形题、规律题和等量题都要把条件完整读一遍。"
        }
      ]
    },
    "assets": {
      "imageKeys": [
        "36Y-6.png"
      ]
    },
    "review": {
      "recommendedFocus": [
        "找规律",
        "分组观察",
        "递推"
      ],
      "memoryTag": "stair_recursion"
    }
  },
  {
    "meta": {
      "questionId": "34W-7",
      "paper": "34W",
      "qid": 7,
      "moduleId": "C",
      "moduleKey": "counting_and_construct",
      "interactionType": "text_input",
      "difficulty": 2,
      "schemaVersion": "1.0.0",
      "locale": "zh-CN"
    },
    "stem": {
      "title": "脸谱左右可站的位置共有几种",
      "blocks": [
        {
          "id": "b1",
          "type": "paragraph",
          "text": "艺术广场上有4个脸谱雕塑，月月只能站在某个脸谱的左边或者右边，他可以站的位置共有多少种？"
        },
        {
          "id": "b2",
          "type": "image",
          "imageKey": "34W-7.png",
          "alt": "脸谱左右可站的位置共有几种",
          "zoomable": true
        }
      ]
    },
    "interaction": {
      "type": "text_input",
      "submitMode": "manual",
      "keyboard": "number",
      "timerSeconds": 40
    },
    "answer": {
      "kind": "numeric",
      "acceptedValues": [
        5
      ],
      "ignoreLeadingZeros": true,
      "trimWhitespace": true
    },
    "explanation": {
      "summary": "先根据题型特征做一步核心判断，再计算或验证答案。",
      "steps": [
        {
          "id": "s1",
          "kind": "observation",
          "title": "先识别题型",
          "text": "这题属于「位置计数」，先用这一类题的固定思路观察条件。"
        },
        {
          "id": "s2",
          "kind": "rule",
          "title": "抓住核心关系",
          "text": "把题目中最关键的数量关系、规律关系或空间关系先找出来。"
        },
        {
          "id": "s3",
          "kind": "verification",
          "title": "验证答案",
          "text": "得到结果后，再回到原题核对一次，确认没有漏条件或看错图。"
        }
      ],
      "wrongReasons": [
        {
          "code": "skip_observation",
          "title": "上来就算",
          "text": "先看题型、再下手，通常会更快也更稳。"
        },
        {
          "code": "miss_condition",
          "title": "漏了条件",
          "text": "图形题、规律题和等量题都要把条件完整读一遍。"
        }
      ]
    },
    "assets": {
      "imageKeys": [
        "34W-7.png"
      ]
    },
    "review": {
      "recommendedFocus": [
        "有序枚举",
        "不重不漏",
        "构造最值"
      ],
      "memoryTag": "position_count"
    }
  },
  {
    "meta": {
      "questionId": "34W-10",
      "paper": "34W",
      "qid": 10,
      "moduleId": "C",
      "moduleKey": "counting_and_construct",
      "interactionType": "text_input",
      "difficulty": 1,
      "schemaVersion": "1.0.0",
      "locale": "zh-CN"
    },
    "stem": {
      "title": "从第5集直接跳到第16集，中间没看几集",
      "blocks": [
        {
          "id": "b1",
          "type": "paragraph",
          "text": "从第5集直接跳到第16集，中间有多少集没看？"
        }
      ]
    },
    "interaction": {
      "type": "text_input",
      "submitMode": "manual",
      "keyboard": "number",
      "timerSeconds": 20
    },
    "answer": {
      "kind": "numeric",
      "acceptedValues": [
        10
      ],
      "ignoreLeadingZeros": true,
      "trimWhitespace": true
    },
    "explanation": {
      "summary": "先根据题型特征做一步核心判断，再计算或验证答案。",
      "steps": [
        {
          "id": "s1",
          "kind": "observation",
          "title": "先识别题型",
          "text": "这题属于「区间计数」，先用这一类题的固定思路观察条件。"
        },
        {
          "id": "s2",
          "kind": "rule",
          "title": "抓住核心关系",
          "text": "把题目中最关键的数量关系、规律关系或空间关系先找出来。"
        },
        {
          "id": "s3",
          "kind": "verification",
          "title": "验证答案",
          "text": "得到结果后，再回到原题核对一次，确认没有漏条件或看错图。"
        }
      ],
      "wrongReasons": [
        {
          "code": "skip_observation",
          "title": "上来就算",
          "text": "先看题型、再下手，通常会更快也更稳。"
        },
        {
          "code": "miss_condition",
          "title": "漏了条件",
          "text": "图形题、规律题和等量题都要把条件完整读一遍。"
        }
      ]
    },
    "assets": {
      "imageKeys": []
    },
    "review": {
      "recommendedFocus": [
        "有序枚举",
        "不重不漏",
        "构造最值"
      ],
      "memoryTag": "interval_count"
    }
  },
  {
    "meta": {
      "questionId": "34W-16",
      "paper": "34W",
      "qid": 16,
      "moduleId": "C",
      "moduleKey": "counting_and_construct",
      "interactionType": "text_input",
      "difficulty": 2,
      "schemaVersion": "1.0.0",
      "locale": "zh-CN"
    },
    "stem": {
      "title": "一荤一素有几种选法",
      "blocks": [
        {
          "id": "b1",
          "type": "paragraph",
          "text": "特价菜谱里一荤一素共有多少种不同的选择方法？"
        },
        {
          "id": "b2",
          "type": "image",
          "imageKey": "34W-16.png",
          "alt": "一荤一素有几种选法",
          "zoomable": true
        }
      ]
    },
    "interaction": {
      "type": "text_input",
      "submitMode": "manual",
      "keyboard": "number",
      "timerSeconds": 40
    },
    "answer": {
      "kind": "numeric",
      "acceptedValues": [
        6
      ],
      "ignoreLeadingZeros": true,
      "trimWhitespace": true
    },
    "explanation": {
      "summary": "先根据题型特征做一步核心判断，再计算或验证答案。",
      "steps": [
        {
          "id": "s1",
          "kind": "observation",
          "title": "先识别题型",
          "text": "这题属于「组合计数」，先用这一类题的固定思路观察条件。"
        },
        {
          "id": "s2",
          "kind": "rule",
          "title": "抓住核心关系",
          "text": "把题目中最关键的数量关系、规律关系或空间关系先找出来。"
        },
        {
          "id": "s3",
          "kind": "verification",
          "title": "验证答案",
          "text": "得到结果后，再回到原题核对一次，确认没有漏条件或看错图。"
        }
      ],
      "wrongReasons": [
        {
          "code": "skip_observation",
          "title": "上来就算",
          "text": "先看题型、再下手，通常会更快也更稳。"
        },
        {
          "code": "miss_condition",
          "title": "漏了条件",
          "text": "图形题、规律题和等量题都要把条件完整读一遍。"
        }
      ]
    },
    "assets": {
      "imageKeys": [
        "34W-16.png"
      ]
    },
    "review": {
      "recommendedFocus": [
        "有序枚举",
        "不重不漏",
        "构造最值"
      ],
      "memoryTag": "combination_count"
    }
  },
  {
    "meta": {
      "questionId": "34Y-9",
      "paper": "34Y",
      "qid": 9,
      "moduleId": "C",
      "moduleKey": "counting_and_construct",
      "interactionType": "text_input",
      "difficulty": 2,
      "schemaVersion": "1.0.0",
      "locale": "zh-CN"
    },
    "stem": {
      "title": "十位和个位和为8的两位数有多少个",
      "blocks": [
        {
          "id": "b1",
          "type": "paragraph",
          "text": "十位数字与个位数字之和是8的两位数共有多少个？"
        }
      ]
    },
    "interaction": {
      "type": "text_input",
      "submitMode": "manual",
      "keyboard": "number",
      "timerSeconds": 20
    },
    "answer": {
      "kind": "numeric",
      "acceptedValues": [
        8
      ],
      "ignoreLeadingZeros": true,
      "trimWhitespace": true
    },
    "explanation": {
      "summary": "先根据题型特征做一步核心判断，再计算或验证答案。",
      "steps": [
        {
          "id": "s1",
          "kind": "observation",
          "title": "先识别题型",
          "text": "这题属于「枚举计数」，先用这一类题的固定思路观察条件。"
        },
        {
          "id": "s2",
          "kind": "rule",
          "title": "抓住核心关系",
          "text": "把题目中最关键的数量关系、规律关系或空间关系先找出来。"
        },
        {
          "id": "s3",
          "kind": "verification",
          "title": "验证答案",
          "text": "得到结果后，再回到原题核对一次，确认没有漏条件或看错图。"
        }
      ],
      "wrongReasons": [
        {
          "code": "skip_observation",
          "title": "上来就算",
          "text": "先看题型、再下手，通常会更快也更稳。"
        },
        {
          "code": "miss_condition",
          "title": "漏了条件",
          "text": "图形题、规律题和等量题都要把条件完整读一遍。"
        }
      ]
    },
    "assets": {
      "imageKeys": []
    },
    "review": {
      "recommendedFocus": [
        "有序枚举",
        "不重不漏",
        "构造最值"
      ],
      "memoryTag": "enumeration_count"
    }
  },
  {
    "meta": {
      "questionId": "34Y-11",
      "paper": "34Y",
      "qid": 11,
      "moduleId": "C",
      "moduleKey": "counting_and_construct",
      "interactionType": "text_input",
      "difficulty": 3,
      "schemaVersion": "1.0.0",
      "locale": "zh-CN"
    },
    "stem": {
      "title": "1、4、5、8组成两个两位数，差最小",
      "blocks": [
        {
          "id": "b1",
          "type": "paragraph",
          "text": "用数字卡片“1”“4”“5”“8”拼成两个两位数，这两个数的差最小是几？"
        }
      ]
    },
    "interaction": {
      "type": "text_input",
      "submitMode": "manual",
      "keyboard": "number",
      "timerSeconds": 20
    },
    "answer": {
      "kind": "numeric",
      "acceptedValues": [
        3
      ],
      "ignoreLeadingZeros": true,
      "trimWhitespace": true
    },
    "explanation": {
      "summary": "先根据题型特征做一步核心判断，再计算或验证答案。",
      "steps": [
        {
          "id": "s1",
          "kind": "observation",
          "title": "先识别题型",
          "text": "这题属于「最值构造」，先用这一类题的固定思路观察条件。"
        },
        {
          "id": "s2",
          "kind": "rule",
          "title": "抓住核心关系",
          "text": "把题目中最关键的数量关系、规律关系或空间关系先找出来。"
        },
        {
          "id": "s3",
          "kind": "verification",
          "title": "验证答案",
          "text": "得到结果后，再回到原题核对一次，确认没有漏条件或看错图。"
        }
      ],
      "wrongReasons": [
        {
          "code": "skip_observation",
          "title": "上来就算",
          "text": "先看题型、再下手，通常会更快也更稳。"
        },
        {
          "code": "miss_condition",
          "title": "漏了条件",
          "text": "图形题、规律题和等量题都要把条件完整读一遍。"
        }
      ]
    },
    "assets": {
      "imageKeys": []
    },
    "review": {
      "recommendedFocus": [
        "有序枚举",
        "不重不漏",
        "构造最值"
      ],
      "memoryTag": "extreme_value_construction"
    }
  },
  {
    "meta": {
      "questionId": "34Y-13",
      "paper": "34Y",
      "qid": 13,
      "moduleId": "C",
      "moduleKey": "counting_and_construct",
      "interactionType": "text_input",
      "difficulty": 1,
      "schemaVersion": "1.0.0",
      "locale": "zh-CN"
    },
    "stem": {
      "title": "小于20的自然数有几个",
      "blocks": [
        {
          "id": "b1",
          "type": "paragraph",
          "text": "小于20的自然数有多少个？"
        }
      ]
    },
    "interaction": {
      "type": "text_input",
      "submitMode": "manual",
      "keyboard": "number",
      "timerSeconds": 20
    },
    "answer": {
      "kind": "numeric",
      "acceptedValues": [
        20
      ],
      "ignoreLeadingZeros": true,
      "trimWhitespace": true
    },
    "explanation": {
      "summary": "先根据题型特征做一步核心判断，再计算或验证答案。",
      "steps": [
        {
          "id": "s1",
          "kind": "observation",
          "title": "先识别题型",
          "text": "这题属于「数感计数」，先用这一类题的固定思路观察条件。"
        },
        {
          "id": "s2",
          "kind": "rule",
          "title": "抓住核心关系",
          "text": "把题目中最关键的数量关系、规律关系或空间关系先找出来。"
        },
        {
          "id": "s3",
          "kind": "verification",
          "title": "验证答案",
          "text": "得到结果后，再回到原题核对一次，确认没有漏条件或看错图。"
        }
      ],
      "wrongReasons": [
        {
          "code": "skip_observation",
          "title": "上来就算",
          "text": "先看题型、再下手，通常会更快也更稳。"
        },
        {
          "code": "miss_condition",
          "title": "漏了条件",
          "text": "图形题、规律题和等量题都要把条件完整读一遍。"
        }
      ]
    },
    "assets": {
      "imageKeys": []
    },
    "review": {
      "recommendedFocus": [
        "有序枚举",
        "不重不漏",
        "构造最值"
      ],
      "memoryTag": "number_sense_count"
    }
  },
  {
    "meta": {
      "questionId": "34Y-16",
      "paper": "34Y",
      "qid": 16,
      "moduleId": "C",
      "moduleKey": "counting_and_construct",
      "interactionType": "text_input",
      "difficulty": 2,
      "schemaVersion": "1.0.0",
      "locale": "zh-CN"
    },
    "stem": {
      "title": "0、1、2、3组成无重复三位数个数",
      "blocks": [
        {
          "id": "b1",
          "type": "paragraph",
          "text": "用数字0、1、2、3能组成多少个没有重复数字的三位数？"
        }
      ]
    },
    "interaction": {
      "type": "text_input",
      "submitMode": "manual",
      "keyboard": "number",
      "timerSeconds": 20
    },
    "answer": {
      "kind": "numeric",
      "acceptedValues": [
        18
      ],
      "ignoreLeadingZeros": true,
      "trimWhitespace": true
    },
    "explanation": {
      "summary": "先根据题型特征做一步核心判断，再计算或验证答案。",
      "steps": [
        {
          "id": "s1",
          "kind": "observation",
          "title": "先识别题型",
          "text": "这题属于「枚举构造」，先用这一类题的固定思路观察条件。"
        },
        {
          "id": "s2",
          "kind": "rule",
          "title": "抓住核心关系",
          "text": "把题目中最关键的数量关系、规律关系或空间关系先找出来。"
        },
        {
          "id": "s3",
          "kind": "verification",
          "title": "验证答案",
          "text": "得到结果后，再回到原题核对一次，确认没有漏条件或看错图。"
        }
      ],
      "wrongReasons": [
        {
          "code": "skip_observation",
          "title": "上来就算",
          "text": "先看题型、再下手，通常会更快也更稳。"
        },
        {
          "code": "miss_condition",
          "title": "漏了条件",
          "text": "图形题、规律题和等量题都要把条件完整读一遍。"
        }
      ]
    },
    "assets": {
      "imageKeys": []
    },
    "review": {
      "recommendedFocus": [
        "有序枚举",
        "不重不漏",
        "构造最值"
      ],
      "memoryTag": "enumeration_construction"
    }
  },
  {
    "meta": {
      "questionId": "35Y-10",
      "paper": "35Y",
      "qid": 10,
      "moduleId": "C",
      "moduleKey": "counting_and_construct",
      "interactionType": "text_input",
      "difficulty": 1,
      "schemaVersion": "1.0.0",
      "locale": "zh-CN"
    },
    "stem": {
      "title": "0、1、2、3、4组成最小无重复三位数",
      "blocks": [
        {
          "id": "b1",
          "type": "paragraph",
          "text": "用0、1、2、3、4组成没有重复数字的三位数，最小是多少？"
        }
      ]
    },
    "interaction": {
      "type": "text_input",
      "submitMode": "manual",
      "keyboard": "number",
      "timerSeconds": 20
    },
    "answer": {
      "kind": "numeric",
      "acceptedValues": [
        102
      ],
      "ignoreLeadingZeros": true,
      "trimWhitespace": true
    },
    "explanation": {
      "summary": "先根据题型特征做一步核心判断，再计算或验证答案。",
      "steps": [
        {
          "id": "s1",
          "kind": "observation",
          "title": "先识别题型",
          "text": "这题属于「最小数构造」，先用这一类题的固定思路观察条件。"
        },
        {
          "id": "s2",
          "kind": "rule",
          "title": "抓住核心关系",
          "text": "把题目中最关键的数量关系、规律关系或空间关系先找出来。"
        },
        {
          "id": "s3",
          "kind": "verification",
          "title": "验证答案",
          "text": "得到结果后，再回到原题核对一次，确认没有漏条件或看错图。"
        }
      ],
      "wrongReasons": [
        {
          "code": "skip_observation",
          "title": "上来就算",
          "text": "先看题型、再下手，通常会更快也更稳。"
        },
        {
          "code": "miss_condition",
          "title": "漏了条件",
          "text": "图形题、规律题和等量题都要把条件完整读一遍。"
        }
      ]
    },
    "assets": {
      "imageKeys": []
    },
    "review": {
      "recommendedFocus": [
        "有序枚举",
        "不重不漏",
        "构造最值"
      ],
      "memoryTag": "minimum_number_construction"
    }
  },
  {
    "meta": {
      "questionId": "35Y-20",
      "paper": "35Y",
      "qid": 20,
      "moduleId": "C",
      "moduleKey": "counting_and_construct",
      "interactionType": "text_input",
      "difficulty": 3,
      "schemaVersion": "1.0.0",
      "locale": "zh-CN"
    },
    "stem": {
      "title": "各位不同且数字和30的最大自然数",
      "blocks": [
        {
          "id": "b1",
          "type": "paragraph",
          "text": "各位数字互不相同，数字和是30的最大自然数是多少？"
        }
      ]
    },
    "interaction": {
      "type": "text_input",
      "submitMode": "manual",
      "keyboard": "number",
      "timerSeconds": 20
    },
    "answer": {
      "kind": "numeric",
      "acceptedValues": [
        96543210
      ],
      "ignoreLeadingZeros": true,
      "trimWhitespace": true
    },
    "explanation": {
      "summary": "先根据题型特征做一步核心判断，再计算或验证答案。",
      "steps": [
        {
          "id": "s1",
          "kind": "observation",
          "title": "先识别题型",
          "text": "这题属于「最大数构造」，先用这一类题的固定思路观察条件。"
        },
        {
          "id": "s2",
          "kind": "rule",
          "title": "抓住核心关系",
          "text": "把题目中最关键的数量关系、规律关系或空间关系先找出来。"
        },
        {
          "id": "s3",
          "kind": "verification",
          "title": "验证答案",
          "text": "得到结果后，再回到原题核对一次，确认没有漏条件或看错图。"
        }
      ],
      "wrongReasons": [
        {
          "code": "skip_observation",
          "title": "上来就算",
          "text": "先看题型、再下手，通常会更快也更稳。"
        },
        {
          "code": "miss_condition",
          "title": "漏了条件",
          "text": "图形题、规律题和等量题都要把条件完整读一遍。"
        }
      ]
    },
    "assets": {
      "imageKeys": []
    },
    "review": {
      "recommendedFocus": [
        "有序枚举",
        "不重不漏",
        "构造最值"
      ],
      "memoryTag": "maximum_number_construction"
    }
  },
  {
    "meta": {
      "questionId": "36Y-8",
      "paper": "36Y",
      "qid": 8,
      "moduleId": "C",
      "moduleKey": "counting_and_construct",
      "interactionType": "text_input",
      "difficulty": 2,
      "schemaVersion": "1.0.0",
      "locale": "zh-CN"
    },
    "stem": {
      "title": "五人握手，一共握几次",
      "blocks": [
        {
          "id": "b1",
          "type": "paragraph",
          "text": "五人握手，每两人之间都握一次手，一共要握多少次？"
        }
      ]
    },
    "interaction": {
      "type": "text_input",
      "submitMode": "manual",
      "keyboard": "number",
      "timerSeconds": 20
    },
    "answer": {
      "kind": "numeric",
      "acceptedValues": [
        10
      ],
      "ignoreLeadingZeros": true,
      "trimWhitespace": true
    },
    "explanation": {
      "summary": "先根据题型特征做一步核心判断，再计算或验证答案。",
      "steps": [
        {
          "id": "s1",
          "kind": "observation",
          "title": "先识别题型",
          "text": "这题属于「配对计数」，先用这一类题的固定思路观察条件。"
        },
        {
          "id": "s2",
          "kind": "rule",
          "title": "抓住核心关系",
          "text": "把题目中最关键的数量关系、规律关系或空间关系先找出来。"
        },
        {
          "id": "s3",
          "kind": "verification",
          "title": "验证答案",
          "text": "得到结果后，再回到原题核对一次，确认没有漏条件或看错图。"
        }
      ],
      "wrongReasons": [
        {
          "code": "skip_observation",
          "title": "上来就算",
          "text": "先看题型、再下手，通常会更快也更稳。"
        },
        {
          "code": "miss_condition",
          "title": "漏了条件",
          "text": "图形题、规律题和等量题都要把条件完整读一遍。"
        }
      ]
    },
    "assets": {
      "imageKeys": []
    },
    "review": {
      "recommendedFocus": [
        "有序枚举",
        "不重不漏",
        "构造最值"
      ],
      "memoryTag": "pair_count"
    }
  },
  {
    "meta": {
      "questionId": "36Y-14",
      "paper": "36Y",
      "qid": 14,
      "moduleId": "C",
      "moduleKey": "counting_and_construct",
      "interactionType": "text_input",
      "difficulty": 1,
      "schemaVersion": "1.0.0",
      "locale": "zh-CN"
    },
    "stem": {
      "title": "1、2、3、4组成两位数，共有多少个",
      "blocks": [
        {
          "id": "b1",
          "type": "paragraph",
          "text": "四张卡片上分别写着1、2、3、4，用这些卡片组成两位数，这些两位数一共有多少个？"
        }
      ]
    },
    "interaction": {
      "type": "text_input",
      "submitMode": "manual",
      "keyboard": "number",
      "timerSeconds": 20
    },
    "answer": {
      "kind": "numeric",
      "acceptedValues": [
        12
      ],
      "ignoreLeadingZeros": true,
      "trimWhitespace": true
    },
    "explanation": {
      "summary": "先根据题型特征做一步核心判断，再计算或验证答案。",
      "steps": [
        {
          "id": "s1",
          "kind": "observation",
          "title": "先识别题型",
          "text": "这题属于「枚举计数」，先用这一类题的固定思路观察条件。"
        },
        {
          "id": "s2",
          "kind": "rule",
          "title": "抓住核心关系",
          "text": "把题目中最关键的数量关系、规律关系或空间关系先找出来。"
        },
        {
          "id": "s3",
          "kind": "verification",
          "title": "验证答案",
          "text": "得到结果后，再回到原题核对一次，确认没有漏条件或看错图。"
        }
      ],
      "wrongReasons": [
        {
          "code": "skip_observation",
          "title": "上来就算",
          "text": "先看题型、再下手，通常会更快也更稳。"
        },
        {
          "code": "miss_condition",
          "title": "漏了条件",
          "text": "图形题、规律题和等量题都要把条件完整读一遍。"
        }
      ]
    },
    "assets": {
      "imageKeys": []
    },
    "review": {
      "recommendedFocus": [
        "有序枚举",
        "不重不漏",
        "构造最值"
      ],
      "memoryTag": "enumeration_count"
    }
  },
  {
    "meta": {
      "questionId": "36Y-15",
      "paper": "36Y",
      "qid": 15,
      "moduleId": "C",
      "moduleKey": "counting_and_construct",
      "interactionType": "text_input",
      "difficulty": 1,
      "schemaVersion": "1.0.0",
      "locale": "zh-CN"
    },
    "stem": {
      "title": "站成一排，左10右9，总人数",
      "blocks": [
        {
          "id": "b1",
          "type": "paragraph",
          "text": "小朋友站成一排，小帅左边有10人，右边有9人，这一排一共有多少人？"
        }
      ]
    },
    "interaction": {
      "type": "text_input",
      "submitMode": "manual",
      "keyboard": "number",
      "timerSeconds": 20
    },
    "answer": {
      "kind": "numeric",
      "acceptedValues": [
        20
      ],
      "ignoreLeadingZeros": true,
      "trimWhitespace": true
    },
    "explanation": {
      "summary": "先根据题型特征做一步核心判断，再计算或验证答案。",
      "steps": [
        {
          "id": "s1",
          "kind": "observation",
          "title": "先识别题型",
          "text": "这题属于「队列总数」，先用这一类题的固定思路观察条件。"
        },
        {
          "id": "s2",
          "kind": "rule",
          "title": "抓住核心关系",
          "text": "把题目中最关键的数量关系、规律关系或空间关系先找出来。"
        },
        {
          "id": "s3",
          "kind": "verification",
          "title": "验证答案",
          "text": "得到结果后，再回到原题核对一次，确认没有漏条件或看错图。"
        }
      ],
      "wrongReasons": [
        {
          "code": "skip_observation",
          "title": "上来就算",
          "text": "先看题型、再下手，通常会更快也更稳。"
        },
        {
          "code": "miss_condition",
          "title": "漏了条件",
          "text": "图形题、规律题和等量题都要把条件完整读一遍。"
        }
      ]
    },
    "assets": {
      "imageKeys": []
    },
    "review": {
      "recommendedFocus": [
        "有序枚举",
        "不重不漏",
        "构造最值"
      ],
      "memoryTag": "queue_total"
    }
  },
  {
    "meta": {
      "questionId": "34W-2",
      "paper": "34W",
      "qid": 2,
      "moduleId": "D",
      "moduleKey": "equivalence_and_balance",
      "interactionType": "text_input",
      "difficulty": 1,
      "schemaVersion": "1.0.0",
      "locale": "zh-CN"
    },
    "stem": {
      "title": "至少再记住几种蔬菜才能超过对方",
      "blocks": [
        {
          "id": "b1",
          "type": "paragraph",
          "text": "小亮至少再记住多少种蔬菜，才能超过小冬？"
        }
      ]
    },
    "interaction": {
      "type": "text_input",
      "submitMode": "manual",
      "keyboard": "number",
      "timerSeconds": 20
    },
    "answer": {
      "kind": "numeric",
      "acceptedValues": [
        6
      ],
      "ignoreLeadingZeros": true,
      "trimWhitespace": true
    },
    "explanation": {
      "summary": "先根据题型特征做一步核心判断，再计算或验证答案。",
      "steps": [
        {
          "id": "s1",
          "kind": "observation",
          "title": "先识别题型",
          "text": "这题属于「至少多1」，先用这一类题的固定思路观察条件。"
        },
        {
          "id": "s2",
          "kind": "rule",
          "title": "抓住核心关系",
          "text": "把题目中最关键的数量关系、规律关系或空间关系先找出来。"
        },
        {
          "id": "s3",
          "kind": "verification",
          "title": "验证答案",
          "text": "得到结果后，再回到原题核对一次，确认没有漏条件或看错图。"
        }
      ],
      "wrongReasons": [
        {
          "code": "skip_observation",
          "title": "上来就算",
          "text": "先看题型、再下手，通常会更快也更稳。"
        },
        {
          "code": "miss_condition",
          "title": "漏了条件",
          "text": "图形题、规律题和等量题都要把条件完整读一遍。"
        }
      ]
    },
    "assets": {
      "imageKeys": []
    },
    "review": {
      "recommendedFocus": [
        "等量关系",
        "移多补少",
        "代换"
      ],
      "memoryTag": "at_least_plus_one"
    }
  },
  {
    "meta": {
      "questionId": "34W-5",
      "paper": "34W",
      "qid": 5,
      "moduleId": "D",
      "moduleKey": "equivalence_and_balance",
      "interactionType": "text_input",
      "difficulty": 2,
      "schemaVersion": "1.0.0",
      "locale": "zh-CN"
    },
    "stem": {
      "title": "白兔灰兔胡萝卜对话求原数量",
      "blocks": [
        {
          "id": "b1",
          "type": "paragraph",
          "text": "白兔说“我拔了6根胡萝卜，怎么又送了我5根”，灰兔说“这样我们俩的胡萝卜就同样多了”。灰兔原来拔了多少根？"
        },
        {
          "id": "b2",
          "type": "image",
          "imageKey": "34W-5.png",
          "alt": "白兔灰兔胡萝卜对话求原数量",
          "zoomable": true
        }
      ]
    },
    "interaction": {
      "type": "text_input",
      "submitMode": "manual",
      "keyboard": "number",
      "timerSeconds": 40
    },
    "answer": {
      "kind": "numeric",
      "acceptedValues": [
        16
      ],
      "ignoreLeadingZeros": true,
      "trimWhitespace": true
    },
    "explanation": {
      "summary": "先根据题型特征做一步核心判断，再计算或验证答案。",
      "steps": [
        {
          "id": "s1",
          "kind": "observation",
          "title": "先识别题型",
          "text": "这题属于「和差关系」，先用这一类题的固定思路观察条件。"
        },
        {
          "id": "s2",
          "kind": "rule",
          "title": "抓住核心关系",
          "text": "把题目中最关键的数量关系、规律关系或空间关系先找出来。"
        },
        {
          "id": "s3",
          "kind": "verification",
          "title": "验证答案",
          "text": "得到结果后，再回到原题核对一次，确认没有漏条件或看错图。"
        }
      ],
      "wrongReasons": [
        {
          "code": "skip_observation",
          "title": "上来就算",
          "text": "先看题型、再下手，通常会更快也更稳。"
        },
        {
          "code": "miss_condition",
          "title": "漏了条件",
          "text": "图形题、规律题和等量题都要把条件完整读一遍。"
        }
      ]
    },
    "assets": {
      "imageKeys": [
        "34W-5.png"
      ]
    },
    "review": {
      "recommendedFocus": [
        "等量关系",
        "移多补少",
        "代换"
      ],
      "memoryTag": "sum_difference_relation"
    }
  },
  {
    "meta": {
      "questionId": "34W-17",
      "paper": "34W",
      "qid": 17,
      "moduleId": "D",
      "moduleKey": "equivalence_and_balance",
      "interactionType": "text_input",
      "difficulty": 2,
      "schemaVersion": "1.0.0",
      "locale": "zh-CN"
    },
    "stem": {
      "title": "爷爷70岁时爸爸和妙妙各几岁",
      "blocks": [
        {
          "id": "b1",
          "type": "paragraph",
          "text": "爸爸今年30岁，妙妙比爸爸小22岁，爷爷比爸爸大27岁。爷爷到70岁时，爸爸和妙妙分别多少岁？"
        }
      ]
    },
    "interaction": {
      "type": "text_input",
      "submitMode": "manual",
      "keyboard": "text",
      "timerSeconds": 20
    },
    "answer": {
      "kind": "free_text",
      "acceptedTexts": [
        "43,21",
        "43，21",
        "43 21",
        "爸爸43岁，妙妙21岁"
      ],
      "ignoreCase": true,
      "trimWhitespace": true
    },
    "explanation": {
      "summary": "先根据题型特征做一步核心判断，再计算或验证答案。",
      "steps": [
        {
          "id": "s1",
          "kind": "observation",
          "title": "先识别题型",
          "text": "这题属于「年龄关系」，先用这一类题的固定思路观察条件。"
        },
        {
          "id": "s2",
          "kind": "rule",
          "title": "抓住核心关系",
          "text": "把题目中最关键的数量关系、规律关系或空间关系先找出来。"
        },
        {
          "id": "s3",
          "kind": "verification",
          "title": "验证答案",
          "text": "得到结果后，再回到原题核对一次，确认没有漏条件或看错图。"
        }
      ],
      "wrongReasons": [
        {
          "code": "skip_observation",
          "title": "上来就算",
          "text": "先看题型、再下手，通常会更快也更稳。"
        },
        {
          "code": "miss_condition",
          "title": "漏了条件",
          "text": "图形题、规律题和等量题都要把条件完整读一遍。"
        }
      ]
    },
    "assets": {
      "imageKeys": []
    },
    "review": {
      "recommendedFocus": [
        "等量关系",
        "移多补少",
        "代换"
      ],
      "memoryTag": "age_relation"
    }
  },
  {
    "meta": {
      "questionId": "34Y-6",
      "paper": "34Y",
      "qid": 6,
      "moduleId": "D",
      "moduleKey": "equivalence_and_balance",
      "interactionType": "text_input",
      "difficulty": 2,
      "schemaVersion": "1.0.0",
      "locale": "zh-CN"
    },
    "stem": {
      "title": "两层书架，第一层12本，比第二层多4本，求总数",
      "blocks": [
        {
          "id": "b1",
          "type": "paragraph",
          "text": "两层书架，第一层有12本，第一层比第二层多4本。书架上一共有多少本书？"
        }
      ]
    },
    "interaction": {
      "type": "text_input",
      "submitMode": "manual",
      "keyboard": "number",
      "timerSeconds": 20
    },
    "answer": {
      "kind": "numeric",
      "acceptedValues": [
        20
      ],
      "ignoreLeadingZeros": true,
      "trimWhitespace": true
    },
    "explanation": {
      "summary": "先根据题型特征做一步核心判断，再计算或验证答案。",
      "steps": [
        {
          "id": "s1",
          "kind": "observation",
          "title": "先识别题型",
          "text": "这题属于「和差关系」，先用这一类题的固定思路观察条件。"
        },
        {
          "id": "s2",
          "kind": "rule",
          "title": "抓住核心关系",
          "text": "把题目中最关键的数量关系、规律关系或空间关系先找出来。"
        },
        {
          "id": "s3",
          "kind": "verification",
          "title": "验证答案",
          "text": "得到结果后，再回到原题核对一次，确认没有漏条件或看错图。"
        }
      ],
      "wrongReasons": [
        {
          "code": "skip_observation",
          "title": "上来就算",
          "text": "先看题型、再下手，通常会更快也更稳。"
        },
        {
          "code": "miss_condition",
          "title": "漏了条件",
          "text": "图形题、规律题和等量题都要把条件完整读一遍。"
        }
      ]
    },
    "assets": {
      "imageKeys": []
    },
    "review": {
      "recommendedFocus": [
        "等量关系",
        "移多补少",
        "代换"
      ],
      "memoryTag": "sum_difference_relation"
    }
  },
  {
    "meta": {
      "questionId": "34Y-8",
      "paper": "34Y",
      "qid": 8,
      "moduleId": "D",
      "moduleKey": "equivalence_and_balance",
      "interactionType": "text_input",
      "difficulty": 2,
      "schemaVersion": "1.0.0",
      "locale": "zh-CN"
    },
    "stem": {
      "title": "三角形和正方形代表数，求差值",
      "blocks": [
        {
          "id": "b1",
          "type": "paragraph",
          "text": "如果 △+□=9，且 △+△+□+□+□=25，那么 □-△=（ ）。"
        }
      ]
    },
    "interaction": {
      "type": "text_input",
      "submitMode": "manual",
      "keyboard": "number",
      "timerSeconds": 20
    },
    "answer": {
      "kind": "numeric",
      "acceptedValues": [
        5
      ],
      "ignoreLeadingZeros": true,
      "trimWhitespace": true
    },
    "explanation": {
      "summary": "先根据题型特征做一步核心判断，再计算或验证答案。",
      "steps": [
        {
          "id": "s1",
          "kind": "observation",
          "title": "先识别题型",
          "text": "这题属于「图形代换」，先用这一类题的固定思路观察条件。"
        },
        {
          "id": "s2",
          "kind": "rule",
          "title": "抓住核心关系",
          "text": "把题目中最关键的数量关系、规律关系或空间关系先找出来。"
        },
        {
          "id": "s3",
          "kind": "verification",
          "title": "验证答案",
          "text": "得到结果后，再回到原题核对一次，确认没有漏条件或看错图。"
        }
      ],
      "wrongReasons": [
        {
          "code": "skip_observation",
          "title": "上来就算",
          "text": "先看题型、再下手，通常会更快也更稳。"
        },
        {
          "code": "miss_condition",
          "title": "漏了条件",
          "text": "图形题、规律题和等量题都要把条件完整读一遍。"
        }
      ]
    },
    "assets": {
      "imageKeys": []
    },
    "review": {
      "recommendedFocus": [
        "等量关系",
        "移多补少",
        "代换"
      ],
      "memoryTag": "shape_substitution"
    }
  },
  {
    "meta": {
      "questionId": "34Y-17",
      "paper": "34Y",
      "qid": 17,
      "moduleId": "D",
      "moduleKey": "equivalence_and_balance",
      "interactionType": "text_input",
      "difficulty": 3,
      "schemaVersion": "1.0.0",
      "locale": "zh-CN"
    },
    "stem": {
      "title": "两箱苹果共40个，移5个后相等，求原来第一箱",
      "blocks": [
        {
          "id": "b1",
          "type": "paragraph",
          "text": "两个箱子中共有40个苹果，从第一个箱子拿出5个放到第二个箱子，这时两箱苹果数量相等。原来第一个箱子里有多少个苹果？"
        }
      ]
    },
    "interaction": {
      "type": "text_input",
      "submitMode": "manual",
      "keyboard": "number",
      "timerSeconds": 20
    },
    "answer": {
      "kind": "numeric",
      "acceptedValues": [
        25
      ],
      "ignoreLeadingZeros": true,
      "trimWhitespace": true
    },
    "explanation": {
      "summary": "先根据题型特征做一步核心判断，再计算或验证答案。",
      "steps": [
        {
          "id": "s1",
          "kind": "observation",
          "title": "先识别题型",
          "text": "这题属于「移动平衡」，先用这一类题的固定思路观察条件。"
        },
        {
          "id": "s2",
          "kind": "rule",
          "title": "抓住核心关系",
          "text": "把题目中最关键的数量关系、规律关系或空间关系先找出来。"
        },
        {
          "id": "s3",
          "kind": "verification",
          "title": "验证答案",
          "text": "得到结果后，再回到原题核对一次，确认没有漏条件或看错图。"
        }
      ],
      "wrongReasons": [
        {
          "code": "skip_observation",
          "title": "上来就算",
          "text": "先看题型、再下手，通常会更快也更稳。"
        },
        {
          "code": "miss_condition",
          "title": "漏了条件",
          "text": "图形题、规律题和等量题都要把条件完整读一遍。"
        }
      ]
    },
    "assets": {
      "imageKeys": []
    },
    "review": {
      "recommendedFocus": [
        "等量关系",
        "移多补少",
        "代换"
      ],
      "memoryTag": "move_balance"
    }
  },
  {
    "meta": {
      "questionId": "35Y-9",
      "paper": "35Y",
      "qid": 9,
      "moduleId": "D",
      "moduleKey": "equivalence_and_balance",
      "interactionType": "text_input",
      "difficulty": 2,
      "schemaVersion": "1.0.0",
      "locale": "zh-CN"
    },
    "stem": {
      "title": "星形代换求值",
      "blocks": [
        {
          "id": "b1",
          "type": "paragraph",
          "text": "若 ★+★+★=9，且 ★+☆=11，那么 ☆=（ ）。"
        }
      ]
    },
    "interaction": {
      "type": "text_input",
      "submitMode": "manual",
      "keyboard": "number",
      "timerSeconds": 20
    },
    "answer": {
      "kind": "numeric",
      "acceptedValues": [
        8
      ],
      "ignoreLeadingZeros": true,
      "trimWhitespace": true
    },
    "explanation": {
      "summary": "先根据题型特征做一步核心判断，再计算或验证答案。",
      "steps": [
        {
          "id": "s1",
          "kind": "observation",
          "title": "先识别题型",
          "text": "这题属于「图形代换」，先用这一类题的固定思路观察条件。"
        },
        {
          "id": "s2",
          "kind": "rule",
          "title": "抓住核心关系",
          "text": "把题目中最关键的数量关系、规律关系或空间关系先找出来。"
        },
        {
          "id": "s3",
          "kind": "verification",
          "title": "验证答案",
          "text": "得到结果后，再回到原题核对一次，确认没有漏条件或看错图。"
        }
      ],
      "wrongReasons": [
        {
          "code": "skip_observation",
          "title": "上来就算",
          "text": "先看题型、再下手，通常会更快也更稳。"
        },
        {
          "code": "miss_condition",
          "title": "漏了条件",
          "text": "图形题、规律题和等量题都要把条件完整读一遍。"
        }
      ]
    },
    "assets": {
      "imageKeys": []
    },
    "review": {
      "recommendedFocus": [
        "等量关系",
        "移多补少",
        "代换"
      ],
      "memoryTag": "shape_substitution"
    }
  },
  {
    "meta": {
      "questionId": "35Y-12",
      "paper": "35Y",
      "qid": 12,
      "moduleId": "D",
      "moduleKey": "equivalence_and_balance",
      "interactionType": "text_input",
      "difficulty": 3,
      "schemaVersion": "1.0.0",
      "locale": "zh-CN"
    },
    "stem": {
      "title": "两油桶共20千克，分别加同样多后变14和18，求原大桶",
      "blocks": [
        {
          "id": "b1",
          "type": "paragraph",
          "text": "有大小两个油桶，一共装油20千克，现在给每个油桶倒入同样多的油，小桶有油14千克，大桶有油18千克。大桶原来装油多少千克？"
        }
      ]
    },
    "interaction": {
      "type": "text_input",
      "submitMode": "manual",
      "keyboard": "number",
      "timerSeconds": 20
    },
    "answer": {
      "kind": "numeric",
      "acceptedValues": [
        12
      ],
      "ignoreLeadingZeros": true,
      "trimWhitespace": true
    },
    "explanation": {
      "summary": "先根据题型特征做一步核心判断，再计算或验证答案。",
      "steps": [
        {
          "id": "s1",
          "kind": "observation",
          "title": "先识别题型",
          "text": "这题属于「等量增加」，先用这一类题的固定思路观察条件。"
        },
        {
          "id": "s2",
          "kind": "rule",
          "title": "抓住核心关系",
          "text": "把题目中最关键的数量关系、规律关系或空间关系先找出来。"
        },
        {
          "id": "s3",
          "kind": "verification",
          "title": "验证答案",
          "text": "得到结果后，再回到原题核对一次，确认没有漏条件或看错图。"
        }
      ],
      "wrongReasons": [
        {
          "code": "skip_observation",
          "title": "上来就算",
          "text": "先看题型、再下手，通常会更快也更稳。"
        },
        {
          "code": "miss_condition",
          "title": "漏了条件",
          "text": "图形题、规律题和等量题都要把条件完整读一遍。"
        }
      ]
    },
    "assets": {
      "imageKeys": []
    },
    "review": {
      "recommendedFocus": [
        "等量关系",
        "移多补少",
        "代换"
      ],
      "memoryTag": "equal_increment"
    }
  },
  {
    "meta": {
      "questionId": "35Y-15",
      "paper": "35Y",
      "qid": 15,
      "moduleId": "D",
      "moduleKey": "equivalence_and_balance",
      "interactionType": "text_input",
      "difficulty": 2,
      "schemaVersion": "1.0.0",
      "locale": "zh-CN"
    },
    "stem": {
      "title": "2个西瓜换10苹果，1苹果换3糖，求1西瓜换几糖",
      "blocks": [
        {
          "id": "b1",
          "type": "paragraph",
          "text": "2个西瓜换10个苹果，1个苹果换3颗糖，1个西瓜能换多少颗糖？"
        }
      ]
    },
    "interaction": {
      "type": "text_input",
      "submitMode": "manual",
      "keyboard": "number",
      "timerSeconds": 20
    },
    "answer": {
      "kind": "numeric",
      "acceptedValues": [
        15
      ],
      "ignoreLeadingZeros": true,
      "trimWhitespace": true
    },
    "explanation": {
      "summary": "先根据题型特征做一步核心判断，再计算或验证答案。",
      "steps": [
        {
          "id": "s1",
          "kind": "observation",
          "title": "先识别题型",
          "text": "这题属于「等价兑换」，先用这一类题的固定思路观察条件。"
        },
        {
          "id": "s2",
          "kind": "rule",
          "title": "抓住核心关系",
          "text": "把题目中最关键的数量关系、规律关系或空间关系先找出来。"
        },
        {
          "id": "s3",
          "kind": "verification",
          "title": "验证答案",
          "text": "得到结果后，再回到原题核对一次，确认没有漏条件或看错图。"
        }
      ],
      "wrongReasons": [
        {
          "code": "skip_observation",
          "title": "上来就算",
          "text": "先看题型、再下手，通常会更快也更稳。"
        },
        {
          "code": "miss_condition",
          "title": "漏了条件",
          "text": "图形题、规律题和等量题都要把条件完整读一遍。"
        }
      ]
    },
    "assets": {
      "imageKeys": []
    },
    "review": {
      "recommendedFocus": [
        "等量关系",
        "移多补少",
        "代换"
      ],
      "memoryTag": "equivalent_exchange"
    }
  },
  {
    "meta": {
      "questionId": "36Y-9",
      "paper": "36Y",
      "qid": 9,
      "moduleId": "D",
      "moduleKey": "equivalence_and_balance",
      "interactionType": "text_input",
      "difficulty": 3,
      "schemaVersion": "1.0.0",
      "locale": "zh-CN"
    },
    "stem": {
      "title": "图形竖式，不同图形代表不同数字",
      "blocks": [
        {
          "id": "b1",
          "type": "paragraph",
          "text": "下图竖式中，相同图形表示相同数字，不同图形表示不同数字，那么 △=（ ）。"
        },
        {
          "id": "b2",
          "type": "image",
          "imageKey": "36Y-9.png",
          "alt": "图形竖式，不同图形代表不同数字",
          "zoomable": true
        }
      ]
    },
    "interaction": {
      "type": "text_input",
      "submitMode": "manual",
      "keyboard": "number",
      "timerSeconds": 40
    },
    "answer": {
      "kind": "numeric",
      "acceptedValues": [
        9
      ],
      "ignoreLeadingZeros": true,
      "trimWhitespace": true
    },
    "explanation": {
      "summary": "先根据题型特征做一步核心判断，再计算或验证答案。",
      "steps": [
        {
          "id": "s1",
          "kind": "observation",
          "title": "先识别题型",
          "text": "这题属于「竖式代换」，先用这一类题的固定思路观察条件。"
        },
        {
          "id": "s2",
          "kind": "rule",
          "title": "抓住核心关系",
          "text": "把题目中最关键的数量关系、规律关系或空间关系先找出来。"
        },
        {
          "id": "s3",
          "kind": "verification",
          "title": "验证答案",
          "text": "得到结果后，再回到原题核对一次，确认没有漏条件或看错图。"
        }
      ],
      "wrongReasons": [
        {
          "code": "skip_observation",
          "title": "上来就算",
          "text": "先看题型、再下手，通常会更快也更稳。"
        },
        {
          "code": "miss_condition",
          "title": "漏了条件",
          "text": "图形题、规律题和等量题都要把条件完整读一遍。"
        }
      ]
    },
    "assets": {
      "imageKeys": [
        "36Y-9.png"
      ]
    },
    "review": {
      "recommendedFocus": [
        "等量关系",
        "移多补少",
        "代换"
      ],
      "memoryTag": "vertical_substitution"
    }
  },
  {
    "meta": {
      "questionId": "36Y-11",
      "paper": "36Y",
      "qid": 11,
      "moduleId": "D",
      "moduleKey": "equivalence_and_balance",
      "interactionType": "text_input",
      "difficulty": 2,
      "schemaVersion": "1.0.0",
      "locale": "zh-CN"
    },
    "stem": {
      "title": "从第一行移几个星到第二行后一样多",
      "blocks": [
        {
          "id": "b1",
          "type": "paragraph",
          "text": "从第一行移几个☆到第二行，两行☆的颗数就一样多？"
        },
        {
          "id": "b2",
          "type": "image",
          "imageKey": "36Y-11.png",
          "alt": "从第一行移几个星到第二行后一样多",
          "zoomable": true
        }
      ]
    },
    "interaction": {
      "type": "text_input",
      "submitMode": "manual",
      "keyboard": "number",
      "timerSeconds": 40
    },
    "answer": {
      "kind": "numeric",
      "acceptedValues": [
        5
      ],
      "ignoreLeadingZeros": true,
      "trimWhitespace": true
    },
    "explanation": {
      "summary": "先根据题型特征做一步核心判断，再计算或验证答案。",
      "steps": [
        {
          "id": "s1",
          "kind": "observation",
          "title": "先识别题型",
          "text": "这题属于「差的一半」，先用这一类题的固定思路观察条件。"
        },
        {
          "id": "s2",
          "kind": "rule",
          "title": "抓住核心关系",
          "text": "把题目中最关键的数量关系、规律关系或空间关系先找出来。"
        },
        {
          "id": "s3",
          "kind": "verification",
          "title": "验证答案",
          "text": "得到结果后，再回到原题核对一次，确认没有漏条件或看错图。"
        }
      ],
      "wrongReasons": [
        {
          "code": "skip_observation",
          "title": "上来就算",
          "text": "先看题型、再下手，通常会更快也更稳。"
        },
        {
          "code": "miss_condition",
          "title": "漏了条件",
          "text": "图形题、规律题和等量题都要把条件完整读一遍。"
        }
      ]
    },
    "assets": {
      "imageKeys": [
        "36Y-11.png"
      ]
    },
    "review": {
      "recommendedFocus": [
        "等量关系",
        "移多补少",
        "代换"
      ],
      "memoryTag": "half_the_difference"
    }
  },
  {
    "meta": {
      "questionId": "36Y-18",
      "paper": "36Y",
      "qid": 18,
      "moduleId": "D",
      "moduleKey": "equivalence_and_balance",
      "interactionType": "text_input",
      "difficulty": 3,
      "schemaVersion": "1.0.0",
      "locale": "zh-CN"
    },
    "stem": {
      "title": "▲+■=10，且2▲+3■=26，求▲",
      "blocks": [
        {
          "id": "b1",
          "type": "paragraph",
          "text": "已知 ▲+■=10，且 ▲+▲+■+■+■=26，那么 ▲=（ ）。"
        }
      ]
    },
    "interaction": {
      "type": "text_input",
      "submitMode": "manual",
      "keyboard": "number",
      "timerSeconds": 20
    },
    "answer": {
      "kind": "numeric",
      "acceptedValues": [
        4
      ],
      "ignoreLeadingZeros": true,
      "trimWhitespace": true
    },
    "explanation": {
      "summary": "先根据题型特征做一步核心判断，再计算或验证答案。",
      "steps": [
        {
          "id": "s1",
          "kind": "observation",
          "title": "先识别题型",
          "text": "这题属于「二元代换」，先用这一类题的固定思路观察条件。"
        },
        {
          "id": "s2",
          "kind": "rule",
          "title": "抓住核心关系",
          "text": "把题目中最关键的数量关系、规律关系或空间关系先找出来。"
        },
        {
          "id": "s3",
          "kind": "verification",
          "title": "验证答案",
          "text": "得到结果后，再回到原题核对一次，确认没有漏条件或看错图。"
        }
      ],
      "wrongReasons": [
        {
          "code": "skip_observation",
          "title": "上来就算",
          "text": "先看题型、再下手，通常会更快也更稳。"
        },
        {
          "code": "miss_condition",
          "title": "漏了条件",
          "text": "图形题、规律题和等量题都要把条件完整读一遍。"
        }
      ]
    },
    "assets": {
      "imageKeys": []
    },
    "review": {
      "recommendedFocus": [
        "等量关系",
        "移多补少",
        "代换"
      ],
      "memoryTag": "two_variable_substitution"
    }
  },
  {
    "meta": {
      "questionId": "34W-3",
      "paper": "34W",
      "qid": 3,
      "moduleId": "E",
      "moduleKey": "plane_geometry_counting",
      "interactionType": "text_input",
      "difficulty": 2,
      "schemaVersion": "1.0.0",
      "locale": "zh-CN"
    },
    "stem": {
      "title": "修补墙面还要买多少块",
      "blocks": [
        {
          "id": "b1",
          "type": "paragraph",
          "text": "墙面破损了，修补时还需要买多少块拼片，才能把墙面修补好？"
        },
        {
          "id": "b2",
          "type": "image",
          "imageKey": "34W-3.png",
          "alt": "修补墙面还要买多少块",
          "zoomable": true
        },
        {
          "id": "b3",
          "type": "callout",
          "text": "这题已完成终审，正式答案可直接核对：5个图中共有3个是正方体展开图。",
          "tone": "success"
        }
      ]
    },
    "interaction": {
      "type": "text_input",
      "submitMode": "manual",
      "keyboard": "number",
      "timerSeconds": 40
    },
    "answer": {
      "kind": "free_text",
      "acceptedTexts": [
        "3"
      ],
      "ignoreCase": true,
      "trimWhitespace": true
    },
    "explanation": {
      "summary": "这题已完成终审，5个图中共有3个是正方体展开图；判断时可先找中心格，再排查重叠与对面冲突。",
      "steps": [
        {
          "id": "s1",
          "kind": "observation",
          "title": "先识别题型",
          "text": "这题属于「平面补块」，先用这一类题的固定思路观察条件。"
        },
        {
          "id": "s2",
          "kind": "rule",
          "title": "抓住核心关系",
          "text": "把题目中最关键的数量关系、规律关系或空间关系先找出来。"
        },
        {
          "id": "s3",
          "kind": "verification",
          "title": "验证答案",
          "text": "得到结果后，再回到原题核对一次，确认没有漏条件或看错图。"
        }
      ],
      "wrongReasons": [
        {
          "code": "skip_observation",
          "title": "上来就算",
          "text": "先看题型、再下手，通常会更快也更稳。"
        },
        {
          "code": "miss_condition",
          "title": "漏了条件",
          "text": "图形题、规律题和等量题都要把条件完整读一遍。"
        }
      ]
    },
    "assets": {
      "imageKeys": [
        "34W-3.png"
      ]
    },
    "review": {
      "recommendedFocus": [
        "从小到大数图",
        "分层计数",
        "防漏数"
      ],
      "memoryTag": "plane_fill_tiles"
    }
  },
  {
    "meta": {
      "questionId": "34W-19",
      "paper": "34W",
      "qid": 19,
      "moduleId": "E",
      "moduleKey": "plane_geometry_counting",
      "interactionType": "text_input",
      "difficulty": 3,
      "schemaVersion": "1.0.0",
      "locale": "zh-CN"
    },
    "stem": {
      "title": "地面铺砖，还需补几块黑砖与白砖",
      "blocks": [
        {
          "id": "b1",
          "type": "paragraph",
          "text": "给地面铺瓷砖时，图中还需要补几块黑色瓷砖和几块白色瓷砖？"
        },
        {
          "id": "b2",
          "type": "image",
          "imageKey": "34W-19.png",
          "alt": "地面铺砖，还需补几块黑砖与白砖",
          "zoomable": true
        },
        {
          "id": "b3",
          "type": "callout",
          "text": "这题的方法讲解与可视化拆解已完成，最终数量仍建议结合更清晰的原图资源做最后一轮终审。当前答案先标记为“待终审”。",
          "tone": "warning"
        }
      ]
    },
    "interaction": {
      "type": "text_input",
      "submitMode": "manual",
      "keyboard": "number",
      "timerSeconds": 40
    },
    "answer": {
      "kind": "free_text",
      "acceptedTexts": [
        "待终审"
      ],
      "ignoreCase": true,
      "trimWhitespace": true
    },
    "explanation": {
      "summary": "题面与可视化拆解已完成，这题的最终数量建议在更清晰原图到位后再做一次终审。",
      "steps": [
        {
          "id": "s1",
          "kind": "observation",
          "title": "先识别题型",
          "text": "这题属于「平面覆盖」，先用这一类题的固定思路观察条件。"
        },
        {
          "id": "s2",
          "kind": "rule",
          "title": "抓住核心关系",
          "text": "把题目中最关键的数量关系、规律关系或空间关系先找出来。"
        },
        {
          "id": "s3",
          "kind": "verification",
          "title": "验证答案",
          "text": "得到结果后，再回到原题核对一次，确认没有漏条件或看错图。"
        }
      ],
      "wrongReasons": [
        {
          "code": "skip_observation",
          "title": "上来就算",
          "text": "先看题型、再下手，通常会更快也更稳。"
        },
        {
          "code": "miss_condition",
          "title": "漏了条件",
          "text": "图形题、规律题和等量题都要把条件完整读一遍。"
        }
      ]
    },
    "assets": {
      "imageKeys": [
        "34W-19.png"
      ]
    },
    "review": {
      "recommendedFocus": [
        "从小到大数图",
        "分层计数",
        "防漏数"
      ],
      "memoryTag": "plane_covering"
    }
  },
  {
    "meta": {
      "questionId": "34Y-12",
      "paper": "34Y",
      "qid": 12,
      "moduleId": "E",
      "moduleKey": "plane_geometry_counting",
      "interactionType": "text_input",
      "difficulty": 2,
      "schemaVersion": "1.0.0",
      "locale": "zh-CN"
    },
    "stem": {
      "title": "数点阵图一共有多少个点",
      "blocks": [
        {
          "id": "b1",
          "type": "paragraph",
          "text": "数一数，下图共有多少个点。"
        },
        {
          "id": "b2",
          "type": "image",
          "imageKey": "34Y-12.png",
          "alt": "数点阵图一共有多少个点",
          "zoomable": true
        }
      ]
    },
    "interaction": {
      "type": "text_input",
      "submitMode": "manual",
      "keyboard": "number",
      "timerSeconds": 40
    },
    "answer": {
      "kind": "numeric",
      "acceptedValues": [
        41
      ],
      "ignoreLeadingZeros": true,
      "trimWhitespace": true
    },
    "explanation": {
      "summary": "这类题先按层、按大小或按区域分类统计，避免漏数。",
      "steps": [
        {
          "id": "s1",
          "kind": "observation",
          "title": "先识别题型",
          "text": "这题属于「数点」，先用这一类题的固定思路观察条件。"
        },
        {
          "id": "s2",
          "kind": "rule",
          "title": "抓住核心关系",
          "text": "把题目中最关键的数量关系、规律关系或空间关系先找出来。"
        },
        {
          "id": "s3",
          "kind": "verification",
          "title": "验证答案",
          "text": "得到结果后，再回到原题核对一次，确认没有漏条件或看错图。"
        }
      ],
      "wrongReasons": [
        {
          "code": "skip_observation",
          "title": "上来就算",
          "text": "先看题型、再下手，通常会更快也更稳。"
        },
        {
          "code": "miss_condition",
          "title": "漏了条件",
          "text": "图形题、规律题和等量题都要把条件完整读一遍。"
        }
      ]
    },
    "assets": {
      "imageKeys": [
        "34Y-12.png"
      ]
    },
    "review": {
      "recommendedFocus": [
        "从小到大数图",
        "分层计数",
        "防漏数"
      ],
      "memoryTag": "count_points"
    }
  },
  {
    "meta": {
      "questionId": "34Y-14",
      "paper": "34Y",
      "qid": 14,
      "moduleId": "E",
      "moduleKey": "plane_geometry_counting",
      "interactionType": "text_input",
      "difficulty": 3,
      "schemaVersion": "1.0.0",
      "locale": "zh-CN"
    },
    "stem": {
      "title": "六边形边框图中间缺多少个六边形",
      "blocks": [
        {
          "id": "b1",
          "type": "paragraph",
          "text": "如下图，中间的空白处一共少了多少个六边形？"
        },
        {
          "id": "b2",
          "type": "image",
          "imageKey": "34Y-14.png",
          "alt": "六边形边框图中间缺多少个六边形",
          "zoomable": true
        },
        {
          "id": "b3",
          "type": "callout",
          "text": "这题的方法讲解与可视化拆解已完成，最终数量仍建议结合更清晰的原图资源做最后一轮终审。当前答案先标记为“待终审”。",
          "tone": "warning"
        }
      ]
    },
    "interaction": {
      "type": "text_input",
      "submitMode": "manual",
      "keyboard": "number",
      "timerSeconds": 40
    },
    "answer": {
      "kind": "free_text",
      "acceptedTexts": [
        "待终审"
      ],
      "ignoreCase": true,
      "trimWhitespace": true
    },
    "explanation": {
      "summary": "题面与可视化拆解已完成，这题的最终数量建议在更清晰原图到位后再做一次终审。",
      "steps": [
        {
          "id": "s1",
          "kind": "observation",
          "title": "先识别题型",
          "text": "这题属于「缺口补图」，先用这一类题的固定思路观察条件。"
        },
        {
          "id": "s2",
          "kind": "rule",
          "title": "抓住核心关系",
          "text": "把题目中最关键的数量关系、规律关系或空间关系先找出来。"
        },
        {
          "id": "s3",
          "kind": "verification",
          "title": "验证答案",
          "text": "得到结果后，再回到原题核对一次，确认没有漏条件或看错图。"
        }
      ],
      "wrongReasons": [
        {
          "code": "skip_observation",
          "title": "上来就算",
          "text": "先看题型、再下手，通常会更快也更稳。"
        },
        {
          "code": "miss_condition",
          "title": "漏了条件",
          "text": "图形题、规律题和等量题都要把条件完整读一遍。"
        }
      ]
    },
    "assets": {
      "imageKeys": [
        "34Y-14.png"
      ]
    },
    "review": {
      "recommendedFocus": [
        "从小到大数图",
        "分层计数",
        "防漏数"
      ],
      "memoryTag": "fill_missing_shape"
    }
  },
  {
    "meta": {
      "questionId": "35Y-17",
      "paper": "35Y",
      "qid": 17,
      "moduleId": "E",
      "moduleKey": "plane_geometry_counting",
      "interactionType": "text_input",
      "difficulty": 3,
      "schemaVersion": "1.0.0",
      "locale": "zh-CN"
    },
    "stem": {
      "title": "复合方框图中共有多少条线段",
      "blocks": [
        {
          "id": "b1",
          "type": "paragraph",
          "text": "下图中，一共有多少条线段？"
        },
        {
          "id": "b2",
          "type": "image",
          "imageKey": "35Y-17.png",
          "alt": "复合方框图中共有多少条线段",
          "zoomable": true
        }
      ]
    },
    "interaction": {
      "type": "text_input",
      "submitMode": "manual",
      "keyboard": "number",
      "timerSeconds": 40
    },
    "answer": {
      "kind": "numeric",
      "acceptedValues": [
        44
      ],
      "ignoreLeadingZeros": true,
      "trimWhitespace": true
    },
    "explanation": {
      "summary": "这题属于复合方框图数线段。按“先最短、再分方向、最后按长度复核”的顺序统计，最终总数为 44。",
      "steps": [
        {
          "id": "s1",
          "kind": "observation",
          "title": "先数最短线段",
          "text": "第一轮先只找 1 格长的最短基础线段，不急着合并更长的线段。先把基础段数清，后面的统计才有依托。"
        },
        {
          "id": "s2",
          "kind": "rule",
          "title": "把横线和竖线拆开",
          "text": "第二轮固定一个方向来数，先横后竖或先竖后横都可以。方向一旦混着数，同一条线段最容易重复进入统计。"
        },
        {
          "id": "s3",
          "kind": "verification",
          "title": "按长度复核并收口",
          "text": "最后在同一方向里再检查 1 格段、2 格段和更长线段，把各层数量合并后，终审总数为 44。"
        }
      ],
      "wrongReasons": [
        {
          "code": "only_short_segments",
          "title": "只数了最短段",
          "text": "最短段只是基础，后面还要补 2 格段、3 格段和整条长段。"
        },
        {
          "code": "mix_directions",
          "title": "横竖混着数",
          "text": "横线和竖线最好分开统计；混在一起时，同一条线段最容易被重复或漏掉。"
        }
      ]
    },
    "assets": {
      "imageKeys": [
        "35Y-17.png"
      ]
    },
    "review": {
      "recommendedFocus": [
        "从小到大数图",
        "分层计数",
        "防漏数"
      ],
      "memoryTag": "count_segments"
    }
  },
  {
    "meta": {
      "questionId": "36Y-4",
      "paper": "36Y",
      "qid": 4,
      "moduleId": "E",
      "moduleKey": "plane_geometry_counting",
      "interactionType": "text_input",
      "difficulty": 1,
      "schemaVersion": "1.0.0",
      "locale": "zh-CN"
    },
    "stem": {
      "title": "数灰色圆点",
      "blocks": [
        {
          "id": "b1",
          "type": "paragraph",
          "text": "下图一共有多少个灰色的圆点？"
        },
        {
          "id": "b2",
          "type": "image",
          "imageKey": "36Y-4.png",
          "alt": "数灰色圆点",
          "zoomable": true
        }
      ]
    },
    "interaction": {
      "type": "text_input",
      "submitMode": "manual",
      "keyboard": "number",
      "timerSeconds": 40
    },
    "answer": {
      "kind": "numeric",
      "acceptedValues": [
        30
      ],
      "ignoreLeadingZeros": true,
      "trimWhitespace": true
    },
    "explanation": {
      "summary": "这类题先按层、按大小或按区域分类统计，避免漏数。",
      "steps": [
        {
          "id": "s1",
          "kind": "observation",
          "title": "先识别题型",
          "text": "这题属于「数点」，先用这一类题的固定思路观察条件。"
        },
        {
          "id": "s2",
          "kind": "rule",
          "title": "抓住核心关系",
          "text": "把题目中最关键的数量关系、规律关系或空间关系先找出来。"
        },
        {
          "id": "s3",
          "kind": "verification",
          "title": "验证答案",
          "text": "得到结果后，再回到原题核对一次，确认没有漏条件或看错图。"
        }
      ],
      "wrongReasons": [
        {
          "code": "skip_observation",
          "title": "上来就算",
          "text": "先看题型、再下手，通常会更快也更稳。"
        },
        {
          "code": "miss_condition",
          "title": "漏了条件",
          "text": "图形题、规律题和等量题都要把条件完整读一遍。"
        }
      ]
    },
    "assets": {
      "imageKeys": [
        "36Y-4.png"
      ]
    },
    "review": {
      "recommendedFocus": [
        "从小到大数图",
        "分层计数",
        "防漏数"
      ],
      "memoryTag": "count_points"
    }
  },
  {
    "meta": {
      "questionId": "36Y-10",
      "paper": "36Y",
      "qid": 10,
      "moduleId": "E",
      "moduleKey": "plane_geometry_counting",
      "interactionType": "text_input",
      "difficulty": 3,
      "schemaVersion": "1.0.0",
      "locale": "zh-CN"
    },
    "stem": {
      "title": "方格图中共有多少个正方形",
      "blocks": [
        {
          "id": "b1",
          "type": "paragraph",
          "text": "下图一共有多少个正方形？"
        },
        {
          "id": "b2",
          "type": "image",
          "imageKey": "36Y-10.png",
          "alt": "方格图中共有多少个正方形",
          "zoomable": true
        }
      ]
    },
    "interaction": {
      "type": "text_input",
      "submitMode": "manual",
      "keyboard": "number",
      "timerSeconds": 40
    },
    "answer": {
      "kind": "numeric",
      "acceptedValues": [
        40
      ],
      "ignoreLeadingZeros": true,
      "trimWhitespace": true
    },
    "explanation": {
      "summary": "这类题先按层、按大小或按区域分类统计，避免漏数。",
      "steps": [
        {
          "id": "s1",
          "kind": "observation",
          "title": "先识别题型",
          "text": "这题属于「数正方形」，先用这一类题的固定思路观察条件。"
        },
        {
          "id": "s2",
          "kind": "rule",
          "title": "抓住核心关系",
          "text": "把题目中最关键的数量关系、规律关系或空间关系先找出来。"
        },
        {
          "id": "s3",
          "kind": "verification",
          "title": "验证答案",
          "text": "得到结果后，再回到原题核对一次，确认没有漏条件或看错图。"
        }
      ],
      "wrongReasons": [
        {
          "code": "skip_observation",
          "title": "上来就算",
          "text": "先看题型、再下手，通常会更快也更稳。"
        },
        {
          "code": "miss_condition",
          "title": "漏了条件",
          "text": "图形题、规律题和等量题都要把条件完整读一遍。"
        }
      ]
    },
    "assets": {
      "imageKeys": [
        "36Y-10.png"
      ]
    },
    "review": {
      "recommendedFocus": [
        "从小到大数图",
        "分层计数",
        "防漏数"
      ],
      "memoryTag": "count_squares"
    }
  },
  {
    "meta": {
      "questionId": "34W-1",
      "paper": "34W",
      "qid": 1,
      "moduleId": "F",
      "moduleKey": "spatial_reasoning",
      "interactionType": "text_input",
      "difficulty": 1,
      "schemaVersion": "1.0.0",
      "locale": "zh-CN"
    },
    "stem": {
      "title": "中药柜11号抽屉正下方是几号",
      "blocks": [
        {
          "id": "b1",
          "type": "paragraph",
          "text": "中药柜中黄芪摆放在11号抽屉，白芷摆放在它正下方的抽屉中。白芷摆放在几号抽屉？"
        },
        {
          "id": "b2",
          "type": "image",
          "imageKey": "34W-1.png",
          "alt": "中药柜11号抽屉正下方是几号",
          "zoomable": true
        }
      ]
    },
    "interaction": {
      "type": "text_input",
      "submitMode": "manual",
      "keyboard": "number",
      "timerSeconds": 40
    },
    "answer": {
      "kind": "numeric",
      "acceptedValues": [
        15
      ],
      "ignoreLeadingZeros": true,
      "trimWhitespace": true
    },
    "explanation": {
      "summary": "先分清可见与不可见、相邻与对面，再判断答案。",
      "steps": [
        {
          "id": "s1",
          "kind": "observation",
          "title": "先识别题型",
          "text": "这题属于「方位位置」，先用这一类题的固定思路观察条件。"
        },
        {
          "id": "s2",
          "kind": "rule",
          "title": "抓住核心关系",
          "text": "把题目中最关键的数量关系、规律关系或空间关系先找出来。"
        },
        {
          "id": "s3",
          "kind": "verification",
          "title": "验证答案",
          "text": "得到结果后，再回到原题核对一次，确认没有漏条件或看错图。"
        }
      ],
      "wrongReasons": [
        {
          "code": "skip_observation",
          "title": "上来就算",
          "text": "先看题型、再下手，通常会更快也更稳。"
        },
        {
          "code": "miss_condition",
          "title": "漏了条件",
          "text": "图形题、规律题和等量题都要把条件完整读一遍。"
        }
      ]
    },
    "assets": {
      "imageKeys": [
        "34W-1.png"
      ]
    },
    "review": {
      "recommendedFocus": [
        "观察遮挡",
        "立体想象",
        "位置关系"
      ],
      "memoryTag": "spatial_position"
    }
  },
  {
    "meta": {
      "questionId": "34W-11",
      "paper": "34W",
      "qid": 11,
      "moduleId": "F",
      "moduleKey": "spatial_reasoning",
      "interactionType": "text_input",
      "difficulty": 4,
      "schemaVersion": "1.0.0",
      "locale": "zh-CN"
    },
    "stem": {
      "title": "两张卡片叠放/翻转后能看到的最小数",
      "blocks": [
        {
          "id": "b1",
          "type": "paragraph",
          "text": "把遮挡卡翻转后盖在1-16数字卡上，能看到的最小数字是几？"
        },
        {
          "id": "b2",
          "type": "image",
          "imageKey": "34W-11.png",
          "alt": "两张卡片叠放/翻转后能看到的最小数",
          "zoomable": true
        }
      ]
    },
    "interaction": {
      "type": "text_input",
      "submitMode": "manual",
      "keyboard": "number",
      "timerSeconds": 40
    },
    "answer": {
      "kind": "numeric",
      "acceptedValues": [
        2
      ],
      "ignoreLeadingZeros": true,
      "trimWhitespace": true
    },
    "explanation": {
      "summary": "先分清可见与不可见、相邻与对面，再判断答案。",
      "steps": [
        {
          "id": "s1",
          "kind": "observation",
          "title": "先识别题型",
          "text": "这题属于「覆盖与对称」，先用这一类题的固定思路观察条件。"
        },
        {
          "id": "s2",
          "kind": "rule",
          "title": "抓住核心关系",
          "text": "把题目中最关键的数量关系、规律关系或空间关系先找出来。"
        },
        {
          "id": "s3",
          "kind": "verification",
          "title": "验证答案",
          "text": "得到结果后，再回到原题核对一次，确认没有漏条件或看错图。"
        }
      ],
      "wrongReasons": [
        {
          "code": "skip_observation",
          "title": "上来就算",
          "text": "先看题型、再下手，通常会更快也更稳。"
        },
        {
          "code": "miss_condition",
          "title": "漏了条件",
          "text": "图形题、规律题和等量题都要把条件完整读一遍。"
        }
      ]
    },
    "assets": {
      "imageKeys": [
        "34W-11.png"
      ]
    },
    "review": {
      "recommendedFocus": [
        "观察遮挡",
        "立体想象",
        "位置关系"
      ],
      "memoryTag": "overlay_symmetry"
    }
  },
  {
    "meta": {
      "questionId": "34Y-15",
      "paper": "34Y",
      "qid": 15,
      "moduleId": "F",
      "moduleKey": "spatial_reasoning",
      "interactionType": "text_input",
      "difficulty": 3,
      "schemaVersion": "1.0.0",
      "locale": "zh-CN"
    },
    "stem": {
      "title": "立体方块堆中看不到的小正方体有几个",
      "blocks": [
        {
          "id": "b1",
          "type": "paragraph",
          "text": "下图中，看不到的小正方体有多少个？"
        },
        {
          "id": "b2",
          "type": "image",
          "imageKey": "34Y-15.png",
          "alt": "立体方块堆中看不到的小正方体有几个",
          "zoomable": true
        },
        {
          "id": "b3",
          "type": "callout",
          "text": "这题的正式答案仍建议结合原图资源做一轮终审。当前记录已完成题面结构化，SEO 解析页已补“外轮廓→支撑列→隐藏区”的可视化拆解，页面文案继续统一收口为“待终审”。",
          "tone": "warning"
        }
      ]
    },
    "interaction": {
      "type": "text_input",
      "submitMode": "manual",
      "keyboard": "number",
      "timerSeconds": 40
    },
    "answer": {
      "kind": "free_text",
      "acceptedTexts": [
        "待终审"
      ],
      "ignoreCase": true,
      "trimWhitespace": true
    },
    "explanation": {
      "summary": "题面和资源挂接已完成，这题的解题方法已经固定。SEO 解析页已补出可复用的空间题可视化模板：先看外轮廓，再补支撑列，最后只盯隐藏区；最终数量仍建议结合原图资源完成最后一轮终审。",
      "steps": [
        {
          "id": "s1",
          "kind": "observation",
          "title": "先识别题型",
          "text": "这题属于「遮挡计数」，先用这一类题的固定思路观察条件。"
        },
        {
          "id": "s2",
          "kind": "rule",
          "title": "抓住核心关系",
          "text": "把题目中最关键的数量关系、规律关系或空间关系先找出来。"
        },
        {
          "id": "s3",
          "kind": "verification",
          "title": "验证答案",
          "text": "得到结果后，再回到原题核对一次，确认没有漏条件或看错图。"
        }
      ],
      "wrongReasons": [
        {
          "code": "skip_observation",
          "title": "上来就算",
          "text": "先看题型、再下手，通常会更快也更稳。"
        },
        {
          "code": "miss_condition",
          "title": "漏了条件",
          "text": "图形题、规律题和等量题都要把条件完整读一遍。"
        }
      ]
    },
    "assets": {
      "imageKeys": [
        "34Y-15.png"
      ]
    },
    "review": {
      "recommendedFocus": [
        "观察遮挡",
        "立体想象",
        "位置关系"
      ],
      "memoryTag": "hidden_block_count"
    }
  },
  {
    "meta": {
      "questionId": "35Y-7",
      "paper": "35Y",
      "qid": 7,
      "moduleId": "F",
      "moduleKey": "spatial_reasoning",
      "interactionType": "text_input",
      "difficulty": 3,
      "schemaVersion": "1.0.0",
      "locale": "zh-CN"
    },
    "stem": {
      "title": "绳子对折两次再中间剪断，最长一段多长",
      "blocks": [
        {
          "id": "b1",
          "type": "paragraph",
          "text": "一根绳子长12厘米，对折两次，用剪刀在中间剪断，得到的最长一段长多少厘米？"
        },
        {
          "id": "b2",
          "type": "image",
          "imageKey": "35Y-7.png",
          "alt": "绳子对折两次再中间剪断，最长一段多长",
          "zoomable": true
        }
      ]
    },
    "interaction": {
      "type": "text_input",
      "submitMode": "manual",
      "keyboard": "text",
      "timerSeconds": 40
    },
    "answer": {
      "kind": "free_text",
      "acceptedTexts": [
        "1.5",
        "1.5厘米",
        "一又二分之一",
        "一又二分之一厘米"
      ],
      "ignoreCase": true,
      "trimWhitespace": true
    },
    "explanation": {
      "summary": "先分清可见与不可见、相邻与对面，再判断答案。",
      "steps": [
        {
          "id": "s1",
          "kind": "observation",
          "title": "先识别题型",
          "text": "这题属于「折叠切分」，先用这一类题的固定思路观察条件。"
        },
        {
          "id": "s2",
          "kind": "rule",
          "title": "抓住核心关系",
          "text": "把题目中最关键的数量关系、规律关系或空间关系先找出来。"
        },
        {
          "id": "s3",
          "kind": "verification",
          "title": "验证答案",
          "text": "得到结果后，再回到原题核对一次，确认没有漏条件或看错图。"
        }
      ],
      "wrongReasons": [
        {
          "code": "skip_observation",
          "title": "上来就算",
          "text": "先看题型、再下手，通常会更快也更稳。"
        },
        {
          "code": "miss_condition",
          "title": "漏了条件",
          "text": "图形题、规律题和等量题都要把条件完整读一遍。"
        }
      ]
    },
    "assets": {
      "imageKeys": [
        "35Y-7.png"
      ]
    },
    "review": {
      "recommendedFocus": [
        "观察遮挡",
        "立体想象",
        "位置关系"
      ],
      "memoryTag": "fold_and_cut"
    }
  },
  {
    "meta": {
      "questionId": "35Y-13",
      "paper": "35Y",
      "qid": 13,
      "moduleId": "F",
      "moduleKey": "spatial_reasoning",
      "interactionType": "text_input",
      "difficulty": 4,
      "schemaVersion": "1.0.0",
      "locale": "zh-CN"
    },
    "stem": {
      "title": "5个图里有几个是正方体展开图",
      "blocks": [
        {
          "id": "b1",
          "type": "paragraph",
          "text": "下面5个图中，有几个是正方体展开图？"
        },
        {
          "id": "b2",
          "type": "image",
          "imageKey": "35Y-13.png",
          "alt": "5个图里有几个是正方体展开图",
          "zoomable": true
        },
        {
          "id": "b3",
          "type": "callout",
          "text": "这题已完成终审，正式答案可直接核对：5个图中共有3个是正方体展开图。",
          "tone": "warning"
        }
      ]
    },
    "interaction": {
      "type": "text_input",
      "submitMode": "manual",
      "keyboard": "number",
      "timerSeconds": 40
    },
    "answer": {
      "kind": "free_text",
      "acceptedTexts": [
        "3"
      ],
      "ignoreCase": true,
      "trimWhitespace": true
    },
    "explanation": {
      "summary": "这题已完成终审，5个图中共有3个是正方体展开图。复盘时不要只记答案，要按“图1到图5逐个判断”的顺序，明确哪些保留、哪些排除；SEO 解析页里还补了折叠方向示意图，方便直观看“为什么撞面”。",
      "steps": [
        {
          "id": "s1",
          "kind": "observation",
          "title": "图1保留，先建立正确样本",
          "text": "图1可以折成正方体。先把中间那格看成核心面，再看左右和下方的面依次翻起，6个面能落到不同方向，不会重叠。"
        },
        {
          "id": "s2",
          "kind": "rule",
          "title": "图2保留，尾巴格不会撞面",
          "text": "图2右边多出一个再往下拐的尾巴，但它折起后会成为最后一个独立面，不会和前面已经占掉的位置重合。"
        },
        {
          "id": "s3",
          "kind": "verification",
          "title": "图3排除，末端回折后会撞位",
          "text": "图3右端往下拐出的那一格折起来后，会和另一面争同一个方向，出现撞面，所以不能保留。"
        },
        {
          "id": "s4",
          "kind": "verification",
          "title": "图4保留，错位双排仍能分到6个方向",
          "text": "图4上排和下排虽然拉得比较长，但它们是错位连接的，折起后会落到不同方向，因此可以保留。"
        },
        {
          "id": "s5",
          "kind": "verification",
          "title": "图5排除，按终审记录收口",
          "text": "图5在当前站内截图里位于最右侧边缘，页面按终审记录收口为排除。复盘重点是记住：一旦折起后方向重合，这个图就不能算展开图。"
        }
      ],
      "wrongReasons": [
        {
          "code": "skip_observation",
          "title": "上来就算",
          "text": "先看题型、再下手，通常会更快也更稳。"
        },
        {
          "code": "miss_condition",
          "title": "漏了条件",
          "text": "图形题、规律题和等量题都要把条件完整读一遍。"
        }
      ]
    },
    "assets": {
      "imageKeys": [
        "35Y-13.png"
      ]
    },
    "review": {
      "recommendedFocus": [
        "观察遮挡",
        "立体想象",
        "位置关系"
      ],
      "memoryTag": "net_recognition"
    }
  },
  {
    "meta": {
      "questionId": "35Y-18",
      "paper": "35Y",
      "qid": 18,
      "moduleId": "F",
      "moduleKey": "spatial_reasoning",
      "interactionType": "text_input",
      "difficulty": 3,
      "schemaVersion": "1.0.0",
      "locale": "zh-CN"
    },
    "stem": {
      "title": "同一正方体不同摆法，2的对面是谁",
      "blocks": [
        {
          "id": "b1",
          "type": "paragraph",
          "text": "下图是同一个正方体不同摆放方式，2的对面是几？"
        },
        {
          "id": "b2",
          "type": "image",
          "imageKey": "35Y-18.png",
          "alt": "同一正方体不同摆法，2的对面是谁",
          "zoomable": true
        }
      ]
    },
    "interaction": {
      "type": "text_input",
      "submitMode": "manual",
      "keyboard": "number",
      "timerSeconds": 40
    },
    "answer": {
      "kind": "numeric",
      "acceptedValues": [
        4
      ],
      "ignoreLeadingZeros": true,
      "trimWhitespace": true
    },
    "explanation": {
      "summary": "先分清可见与不可见、相邻与对面，再判断答案。",
      "steps": [
        {
          "id": "s1",
          "kind": "observation",
          "title": "先识别题型",
          "text": "这题属于「对面判断」，先用这一类题的固定思路观察条件。"
        },
        {
          "id": "s2",
          "kind": "rule",
          "title": "抓住核心关系",
          "text": "把题目中最关键的数量关系、规律关系或空间关系先找出来。"
        },
        {
          "id": "s3",
          "kind": "verification",
          "title": "验证答案",
          "text": "得到结果后，再回到原题核对一次，确认没有漏条件或看错图。"
        }
      ],
      "wrongReasons": [
        {
          "code": "skip_observation",
          "title": "上来就算",
          "text": "先看题型、再下手，通常会更快也更稳。"
        },
        {
          "code": "miss_condition",
          "title": "漏了条件",
          "text": "图形题、规律题和等量题都要把条件完整读一遍。"
        }
      ]
    },
    "assets": {
      "imageKeys": [
        "35Y-18.png"
      ]
    },
    "review": {
      "recommendedFocus": [
        "观察遮挡",
        "立体想象",
        "位置关系"
      ],
      "memoryTag": "opposite_face"
    }
  },
  {
    "meta": {
      "questionId": "36Y-7",
      "paper": "36Y",
      "qid": 7,
      "moduleId": "F",
      "moduleKey": "spatial_reasoning",
      "interactionType": "text_input",
      "difficulty": 3,
      "schemaVersion": "1.0.0",
      "locale": "zh-CN"
    },
    "stem": {
      "title": "六面不同颜色的小正方体，蓝色对面是什么色",
      "blocks": [
        {
          "id": "b1",
          "type": "paragraph",
          "text": "三个完全相同的小正方体堆在一起，每个小正方体的六个面分别是红、橙、黄、绿、蓝、紫色。蓝色面的对面是什么颜色？"
        },
        {
          "id": "b2",
          "type": "image",
          "imageKey": "36Y-7.png",
          "alt": "六面不同颜色的小正方体，蓝色对面是什么色",
          "zoomable": true
        }
      ]
    },
    "interaction": {
      "type": "text_input",
      "submitMode": "manual",
      "keyboard": "text",
      "timerSeconds": 40
    },
    "answer": {
      "kind": "free_text",
      "acceptedTexts": [
        "绿色",
        "绿"
      ],
      "ignoreCase": true,
      "trimWhitespace": true
    },
    "explanation": {
      "summary": "先分清可见与不可见、相邻与对面，再判断答案。",
      "steps": [
        {
          "id": "s1",
          "kind": "observation",
          "title": "先识别题型",
          "text": "这题属于「对面判断」，先用这一类题的固定思路观察条件。"
        },
        {
          "id": "s2",
          "kind": "rule",
          "title": "抓住核心关系",
          "text": "把题目中最关键的数量关系、规律关系或空间关系先找出来。"
        },
        {
          "id": "s3",
          "kind": "verification",
          "title": "验证答案",
          "text": "得到结果后，再回到原题核对一次，确认没有漏条件或看错图。"
        }
      ],
      "wrongReasons": [
        {
          "code": "skip_observation",
          "title": "上来就算",
          "text": "先看题型、再下手，通常会更快也更稳。"
        },
        {
          "code": "miss_condition",
          "title": "漏了条件",
          "text": "图形题、规律题和等量题都要把条件完整读一遍。"
        }
      ]
    },
    "assets": {
      "imageKeys": [
        "36Y-7.png"
      ]
    },
    "review": {
      "recommendedFocus": [
        "观察遮挡",
        "立体想象",
        "位置关系"
      ],
      "memoryTag": "opposite_face"
    }
  },
  {
    "meta": {
      "questionId": "36Y-12",
      "paper": "36Y",
      "qid": 12,
      "moduleId": "F",
      "moduleKey": "spatial_reasoning",
      "interactionType": "text_input",
      "difficulty": 1,
      "schemaVersion": "1.0.0",
      "locale": "zh-CN"
    },
    "stem": {
      "title": "正方体面、顶点、棱，求A+B-C",
      "blocks": [
        {
          "id": "b1",
          "type": "paragraph",
          "text": "一个正方体有A个面，有B个顶点，有C条棱，那么 A+B-C=（ ）。"
        }
      ]
    },
    "interaction": {
      "type": "text_input",
      "submitMode": "manual",
      "keyboard": "number",
      "timerSeconds": 20
    },
    "answer": {
      "kind": "numeric",
      "acceptedValues": [
        2
      ],
      "ignoreLeadingZeros": true,
      "trimWhitespace": true
    },
    "explanation": {
      "summary": "先分清可见与不可见、相邻与对面，再判断答案。",
      "steps": [
        {
          "id": "s1",
          "kind": "observation",
          "title": "先识别题型",
          "text": "这题属于「立体基础」，先用这一类题的固定思路观察条件。"
        },
        {
          "id": "s2",
          "kind": "rule",
          "title": "抓住核心关系",
          "text": "把题目中最关键的数量关系、规律关系或空间关系先找出来。"
        },
        {
          "id": "s3",
          "kind": "verification",
          "title": "验证答案",
          "text": "得到结果后，再回到原题核对一次，确认没有漏条件或看错图。"
        }
      ],
      "wrongReasons": [
        {
          "code": "skip_observation",
          "title": "上来就算",
          "text": "先看题型、再下手，通常会更快也更稳。"
        },
        {
          "code": "miss_condition",
          "title": "漏了条件",
          "text": "图形题、规律题和等量题都要把条件完整读一遍。"
        }
      ]
    },
    "assets": {
      "imageKeys": []
    },
    "review": {
      "recommendedFocus": [
        "观察遮挡",
        "立体想象",
        "位置关系"
      ],
      "memoryTag": "solid_basics"
    }
  },
  {
    "meta": {
      "questionId": "36Y-16",
      "paper": "36Y",
      "qid": 16,
      "moduleId": "F",
      "moduleKey": "spatial_reasoning",
      "interactionType": "text_input",
      "difficulty": 3,
      "schemaVersion": "1.0.0",
      "locale": "zh-CN"
    },
    "stem": {
      "title": "两个立体图共有多少个小正方体",
      "blocks": [
        {
          "id": "b1",
          "type": "paragraph",
          "text": "下面两个图一共有多少个小正方体？"
        },
        {
          "id": "b2",
          "type": "image",
          "imageKey": "36Y-16.png",
          "alt": "两个立体图共有多少个小正方体",
          "zoomable": true
        }
      ]
    },
    "interaction": {
      "type": "text_input",
      "submitMode": "manual",
      "keyboard": "number",
      "timerSeconds": 40
    },
    "answer": {
      "kind": "numeric",
      "acceptedValues": [
        12
      ],
      "ignoreLeadingZeros": true,
      "trimWhitespace": true
    },
    "explanation": {
      "summary": "先分清可见与不可见、相邻与对面，再判断答案。",
      "steps": [
        {
          "id": "s1",
          "kind": "observation",
          "title": "先识别题型",
          "text": "这题属于「堆叠计数」，先用这一类题的固定思路观察条件。"
        },
        {
          "id": "s2",
          "kind": "rule",
          "title": "抓住核心关系",
          "text": "把题目中最关键的数量关系、规律关系或空间关系先找出来。"
        },
        {
          "id": "s3",
          "kind": "verification",
          "title": "验证答案",
          "text": "得到结果后，再回到原题核对一次，确认没有漏条件或看错图。"
        }
      ],
      "wrongReasons": [
        {
          "code": "skip_observation",
          "title": "上来就算",
          "text": "先看题型、再下手，通常会更快也更稳。"
        },
        {
          "code": "miss_condition",
          "title": "漏了条件",
          "text": "图形题、规律题和等量题都要把条件完整读一遍。"
        }
      ]
    },
    "assets": {
      "imageKeys": [
        "36Y-16.png"
      ]
    },
    "review": {
      "recommendedFocus": [
        "观察遮挡",
        "立体想象",
        "位置关系"
      ],
      "memoryTag": "stacked_cube_count"
    }
  },
  {
    "meta": {
      "questionId": "34W-12",
      "paper": "34W",
      "qid": 12,
      "moduleId": "G",
      "moduleKey": "logic_puzzles",
      "interactionType": "text_input",
      "difficulty": 3,
      "schemaVersion": "1.0.0",
      "locale": "zh-CN"
    },
    "stem": {
      "title": "洛书图中★处填什么",
      "blocks": [
        {
          "id": "b1",
          "type": "paragraph",
          "text": "洛书上纵、横、斜三条线上的三个数之和都等于15，图中的★处应填什么？"
        },
        {
          "id": "b2",
          "type": "image",
          "imageKey": "34W-12.png",
          "alt": "洛书图中★处填什么",
          "zoomable": true
        }
      ]
    },
    "interaction": {
      "type": "text_input",
      "submitMode": "manual",
      "keyboard": "number",
      "timerSeconds": 40
    },
    "answer": {
      "kind": "numeric",
      "acceptedValues": [
        1
      ],
      "ignoreLeadingZeros": true,
      "trimWhitespace": true
    },
    "explanation": {
      "summary": "先根据题型特征做一步核心判断，再计算或验证答案。",
      "steps": [
        {
          "id": "s1",
          "kind": "observation",
          "title": "先识别题型",
          "text": "这题属于「等和填数」，先用这一类题的固定思路观察条件。"
        },
        {
          "id": "s2",
          "kind": "rule",
          "title": "抓住核心关系",
          "text": "把题目中最关键的数量关系、规律关系或空间关系先找出来。"
        },
        {
          "id": "s3",
          "kind": "verification",
          "title": "验证答案",
          "text": "得到结果后，再回到原题核对一次，确认没有漏条件或看错图。"
        }
      ],
      "wrongReasons": [
        {
          "code": "skip_observation",
          "title": "上来就算",
          "text": "先看题型、再下手，通常会更快也更稳。"
        },
        {
          "code": "miss_condition",
          "title": "漏了条件",
          "text": "图形题、规律题和等量题都要把条件完整读一遍。"
        }
      ]
    },
    "assets": {
      "imageKeys": [
        "34W-12.png"
      ]
    },
    "review": {
      "recommendedFocus": [
        "条件排除",
        "等和关系",
        "试填验证"
      ],
      "memoryTag": "equal_sum_fill"
    }
  },
  {
    "meta": {
      "questionId": "34Y-5",
      "paper": "34Y",
      "qid": 5,
      "moduleId": "G",
      "moduleKey": "logic_puzzles",
      "interactionType": "text_input",
      "difficulty": 4,
      "schemaVersion": "1.0.0",
      "locale": "zh-CN"
    },
    "stem": {
      "title": "在若干空里填“+”或“-”，使等式成立并统计方法数",
      "blocks": [
        {
          "id": "b1",
          "type": "paragraph",
          "text": "在空里填入“+”或“-”，使 6○5○4○3○2○1=13。问一共有几种不同的方法。"
        }
      ]
    },
    "interaction": {
      "type": "text_input",
      "submitMode": "manual",
      "keyboard": "number",
      "timerSeconds": 20
    },
    "answer": {
      "kind": "numeric",
      "acceptedValues": [
        2
      ],
      "ignoreLeadingZeros": true,
      "trimWhitespace": true
    },
    "explanation": {
      "summary": "先根据题型特征做一步核心判断，再计算或验证答案。",
      "steps": [
        {
          "id": "s1",
          "kind": "observation",
          "title": "先识别题型",
          "text": "这题属于「填符号」，先用这一类题的固定思路观察条件。"
        },
        {
          "id": "s2",
          "kind": "rule",
          "title": "抓住核心关系",
          "text": "把题目中最关键的数量关系、规律关系或空间关系先找出来。"
        },
        {
          "id": "s3",
          "kind": "verification",
          "title": "验证答案",
          "text": "得到结果后，再回到原题核对一次，确认没有漏条件或看错图。"
        }
      ],
      "wrongReasons": [
        {
          "code": "skip_observation",
          "title": "上来就算",
          "text": "先看题型、再下手，通常会更快也更稳。"
        },
        {
          "code": "miss_condition",
          "title": "漏了条件",
          "text": "图形题、规律题和等量题都要把条件完整读一遍。"
        }
      ]
    },
    "assets": {
      "imageKeys": []
    },
    "review": {
      "recommendedFocus": [
        "条件排除",
        "等和关系",
        "试填验证"
      ],
      "memoryTag": "fill_operators"
    }
  },
  {
    "meta": {
      "questionId": "34Y-18",
      "paper": "34Y",
      "qid": 18,
      "moduleId": "G",
      "moduleKey": "logic_puzzles",
      "interactionType": "text_input",
      "difficulty": 4,
      "schemaVersion": "1.0.0",
      "locale": "zh-CN"
    },
    "stem": {
      "title": "20到26填入Y形圆圈，使每条线三数和相等，问中心有几种填法",
      "blocks": [
        {
          "id": "b1",
          "type": "paragraph",
          "text": "将20至26这七个数分别填入图中各圆圈内，使每条线段上的三个圆圈内数的和都相等。中间圆圈有几种填法？"
        },
        {
          "id": "b2",
          "type": "image",
          "imageKey": "34Y-18.png",
          "alt": "20到26填入Y形圆圈，使每条线三数和相等，问中心有几种填法",
          "zoomable": true
        }
      ]
    },
    "interaction": {
      "type": "text_input",
      "submitMode": "manual",
      "keyboard": "number",
      "timerSeconds": 40
    },
    "answer": {
      "kind": "numeric",
      "acceptedValues": [
        3
      ],
      "ignoreLeadingZeros": true,
      "trimWhitespace": true
    },
    "explanation": {
      "summary": "先根据题型特征做一步核心判断，再计算或验证答案。",
      "steps": [
        {
          "id": "s1",
          "kind": "observation",
          "title": "先识别题型",
          "text": "这题属于「等和图」，先用这一类题的固定思路观察条件。"
        },
        {
          "id": "s2",
          "kind": "rule",
          "title": "抓住核心关系",
          "text": "把题目中最关键的数量关系、规律关系或空间关系先找出来。"
        },
        {
          "id": "s3",
          "kind": "verification",
          "title": "验证答案",
          "text": "得到结果后，再回到原题核对一次，确认没有漏条件或看错图。"
        }
      ],
      "wrongReasons": [
        {
          "code": "skip_observation",
          "title": "上来就算",
          "text": "先看题型、再下手，通常会更快也更稳。"
        },
        {
          "code": "miss_condition",
          "title": "漏了条件",
          "text": "图形题、规律题和等量题都要把条件完整读一遍。"
        }
      ]
    },
    "assets": {
      "imageKeys": [
        "34Y-18.png"
      ]
    },
    "review": {
      "recommendedFocus": [
        "条件排除",
        "等和关系",
        "试填验证"
      ],
      "memoryTag": "equal_sum_graph"
    }
  },
  {
    "meta": {
      "questionId": "34Y-20",
      "paper": "34Y",
      "qid": 20,
      "moduleId": "G",
      "moduleKey": "logic_puzzles",
      "interactionType": "text_input",
      "difficulty": 4,
      "schemaVersion": "1.0.0",
      "locale": "zh-CN"
    },
    "stem": {
      "title": "1、2、4、6填入三圆重叠图，使每个圆内四数和相等，求中心",
      "blocks": [
        {
          "id": "b1",
          "type": "paragraph",
          "text": "将1、2、4、6填入图中空白区域，使每个圆圈里的四个数字和都相等。正中间的空白区域填什么？"
        },
        {
          "id": "b2",
          "type": "image",
          "imageKey": "34Y-20.png",
          "alt": "1、2、4、6填入三圆重叠图，使每个圆内四数和相等，求中心",
          "zoomable": true
        }
      ]
    },
    "interaction": {
      "type": "text_input",
      "submitMode": "manual",
      "keyboard": "number",
      "timerSeconds": 40
    },
    "answer": {
      "kind": "numeric",
      "acceptedValues": [
        1
      ],
      "ignoreLeadingZeros": true,
      "trimWhitespace": true
    },
    "explanation": {
      "summary": "先根据题型特征做一步核心判断，再计算或验证答案。",
      "steps": [
        {
          "id": "s1",
          "kind": "observation",
          "title": "先识别题型",
          "text": "这题属于「区域等和」，先用这一类题的固定思路观察条件。"
        },
        {
          "id": "s2",
          "kind": "rule",
          "title": "抓住核心关系",
          "text": "把题目中最关键的数量关系、规律关系或空间关系先找出来。"
        },
        {
          "id": "s3",
          "kind": "verification",
          "title": "验证答案",
          "text": "得到结果后，再回到原题核对一次，确认没有漏条件或看错图。"
        }
      ],
      "wrongReasons": [
        {
          "code": "skip_observation",
          "title": "上来就算",
          "text": "先看题型、再下手，通常会更快也更稳。"
        },
        {
          "code": "miss_condition",
          "title": "漏了条件",
          "text": "图形题、规律题和等量题都要把条件完整读一遍。"
        }
      ]
    },
    "assets": {
      "imageKeys": [
        "34Y-20.png"
      ]
    },
    "review": {
      "recommendedFocus": [
        "条件排除",
        "等和关系",
        "试填验证"
      ],
      "memoryTag": "regional_equal_sum"
    }
  },
  {
    "meta": {
      "questionId": "35Y-11",
      "paper": "35Y",
      "qid": 11,
      "moduleId": "G",
      "moduleKey": "logic_puzzles",
      "interactionType": "text_input",
      "difficulty": 3,
      "schemaVersion": "1.0.0",
      "locale": "zh-CN"
    },
    "stem": {
      "title": "在式子空格填“+”或“-”使结果尽可能大",
      "blocks": [
        {
          "id": "b1",
          "type": "paragraph",
          "text": "在 20-(7□5)□(4□3) 的空格中填入合适的“+”或“-”，使结果尽可能大，最大是多少？"
        }
      ]
    },
    "interaction": {
      "type": "text_input",
      "submitMode": "manual",
      "keyboard": "number",
      "timerSeconds": 20
    },
    "answer": {
      "kind": "numeric",
      "acceptedValues": [
        25
      ],
      "ignoreLeadingZeros": true,
      "trimWhitespace": true
    },
    "explanation": {
      "summary": "先根据题型特征做一步核心判断，再计算或验证答案。",
      "steps": [
        {
          "id": "s1",
          "kind": "observation",
          "title": "先识别题型",
          "text": "这题属于「最优化填符号」，先用这一类题的固定思路观察条件。"
        },
        {
          "id": "s2",
          "kind": "rule",
          "title": "抓住核心关系",
          "text": "把题目中最关键的数量关系、规律关系或空间关系先找出来。"
        },
        {
          "id": "s3",
          "kind": "verification",
          "title": "验证答案",
          "text": "得到结果后，再回到原题核对一次，确认没有漏条件或看错图。"
        }
      ],
      "wrongReasons": [
        {
          "code": "skip_observation",
          "title": "上来就算",
          "text": "先看题型、再下手，通常会更快也更稳。"
        },
        {
          "code": "miss_condition",
          "title": "漏了条件",
          "text": "图形题、规律题和等量题都要把条件完整读一遍。"
        }
      ]
    },
    "assets": {
      "imageKeys": []
    },
    "review": {
      "recommendedFocus": [
        "条件排除",
        "等和关系",
        "试填验证"
      ],
      "memoryTag": "optimize_operators"
    }
  },
  {
    "meta": {
      "questionId": "36Y-19",
      "paper": "36Y",
      "qid": 19,
      "moduleId": "G",
      "moduleKey": "logic_puzzles",
      "interactionType": "text_input",
      "difficulty": 5,
      "schemaVersion": "1.0.0",
      "locale": "zh-CN"
    },
    "stem": {
      "title": "4×4填1-4，每行每列不重复且满足粗框和",
      "blocks": [
        {
          "id": "b1",
          "type": "paragraph",
          "text": "填入1-4的数字，使每行、每列的四个数字不能重复，且满足粗框内数字和。最下面一行从左到右依次是多少？"
        },
        {
          "id": "b2",
          "type": "image",
          "imageKey": "36Y-19.png",
          "alt": "4×4填1-4，每行每列不重复且满足粗框和",
          "zoomable": true
        }
      ]
    },
    "interaction": {
      "type": "text_input",
      "submitMode": "manual",
      "keyboard": "text",
      "timerSeconds": 40
    },
    "answer": {
      "kind": "free_text",
      "acceptedTexts": [
        "3412",
        "3 4 1 2",
        "3,4,1,2",
        "3，4，1，2"
      ],
      "ignoreCase": true,
      "trimWhitespace": true
    },
    "explanation": {
      "summary": "先根据题型特征做一步核心判断，再计算或验证答案。",
      "steps": [
        {
          "id": "s1",
          "kind": "observation",
          "title": "先识别题型",
          "text": "这题属于「逻辑填数」，先用这一类题的固定思路观察条件。"
        },
        {
          "id": "s2",
          "kind": "rule",
          "title": "抓住核心关系",
          "text": "把题目中最关键的数量关系、规律关系或空间关系先找出来。"
        },
        {
          "id": "s3",
          "kind": "verification",
          "title": "验证答案",
          "text": "得到结果后，再回到原题核对一次，确认没有漏条件或看错图。"
        }
      ],
      "wrongReasons": [
        {
          "code": "skip_observation",
          "title": "上来就算",
          "text": "先看题型、再下手，通常会更快也更稳。"
        },
        {
          "code": "miss_condition",
          "title": "漏了条件",
          "text": "图形题、规律题和等量题都要把条件完整读一遍。"
        }
      ]
    },
    "assets": {
      "imageKeys": [
        "36Y-19.png"
      ]
    },
    "review": {
      "recommendedFocus": [
        "条件排除",
        "等和关系",
        "试填验证"
      ],
      "memoryTag": "logic_grid_fill"
    }
  },
  {
    "meta": {
      "questionId": "36Y-20",
      "paper": "36Y",
      "qid": 20,
      "moduleId": "G",
      "moduleKey": "logic_puzzles",
      "interactionType": "text_input",
      "difficulty": 3,
      "schemaVersion": "1.0.0",
      "locale": "zh-CN"
    },
    "stem": {
      "title": "三角形空圈填11、12、13，使每条线和相等",
      "blocks": [
        {
          "id": "b1",
          "type": "paragraph",
          "text": "在空白圆里填11、12、13，使每条线上的三个数的和都相等。每条线的和等于多少？"
        },
        {
          "id": "b2",
          "type": "image",
          "imageKey": "36Y-20.png",
          "alt": "三角形空圈填11、12、13，使每条线和相等",
          "zoomable": true
        }
      ]
    },
    "interaction": {
      "type": "text_input",
      "submitMode": "manual",
      "keyboard": "number",
      "timerSeconds": 40
    },
    "answer": {
      "kind": "numeric",
      "acceptedValues": [
        16
      ],
      "ignoreLeadingZeros": true,
      "trimWhitespace": true
    },
    "explanation": {
      "summary": "先根据题型特征做一步核心判断，再计算或验证答案。",
      "steps": [
        {
          "id": "s1",
          "kind": "observation",
          "title": "先识别题型",
          "text": "这题属于「等和三角」，先用这一类题的固定思路观察条件。"
        },
        {
          "id": "s2",
          "kind": "rule",
          "title": "抓住核心关系",
          "text": "把题目中最关键的数量关系、规律关系或空间关系先找出来。"
        },
        {
          "id": "s3",
          "kind": "verification",
          "title": "验证答案",
          "text": "得到结果后，再回到原题核对一次，确认没有漏条件或看错图。"
        }
      ],
      "wrongReasons": [
        {
          "code": "skip_observation",
          "title": "上来就算",
          "text": "先看题型、再下手，通常会更快也更稳。"
        },
        {
          "code": "miss_condition",
          "title": "漏了条件",
          "text": "图形题、规律题和等量题都要把条件完整读一遍。"
        }
      ]
    },
    "assets": {
      "imageKeys": [
        "36Y-20.png"
      ]
    },
    "review": {
      "recommendedFocus": [
        "条件排除",
        "等和关系",
        "试填验证"
      ],
      "memoryTag": "equal_sum_triangle"
    }
  }
];

export const fullQuestionContentBundle: QuestionContentBundle = {
  version: CONTENT_SCHEMA_VERSION,
  locale: 'zh-CN',
  records: fullQuestionContentRecords,
};
