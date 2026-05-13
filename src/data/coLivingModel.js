import { buildModelScenarios, OPERATOR_FEE_RATE } from "@/data/modelCalculations";

const unitCount = 11;

const coLivingVariant = {
  key: "villaConversion",
  selectorLabel: {
    ar: "نموذج Co-Living النسائي",
    en: "Women's Co-Living Model",
  },
  title: {
    ar: "Financial Study - Dora Al Aared Women's Co-Living Model",
    en: "Financial Study - Dora Al Aared Women's Co-Living Model",
  },
  description: {
    ar: "تحويل الفيلا إلى 10 وحدات ماستر ووحدة استوديو واحدة ضمن نموذج Co-Living النسائي، بما يرفع عدد الوحدات ويزيد تنوع شرائح التأجير.",
    en: "Converts the villa into 10 master units and 1 studio under a women's Co-Living model, creating a higher unit count and more diversified rental segmentation.",
  },
  contextDescription: {
    ar:
      "يعرض نموذج Co-Living النسائي تحويل الفيلا الحالية إلى 11 وحدة قابلة للتأجير: 10 وحدات ماستر ووحدة استوديو، مع اختبار الحساسية من 50% إلى 90% إشغال ورسوم مشغل ثابتة 20%.",
    en:
      "The women's Co-Living model converts the existing villa into 11 rentable units: 10 master units and 1 studio, tested across 50% to 90% occupancy with a fixed 20% operator fee.",
  },
  operatorFeeRate: OPERATOR_FEE_RATE,
  expectedOccupancy: 60,
  unitCount,
  inventoryCount: unitCount,
  inventoryDescription: {
    ar: "10 ماستر + 1 استوديو",
    en: "10 Master + 1 Studio",
  },
  focusPill: {
    ar: "عدد وحدات أعلى وتنويع تأجيري أكبر",
    en: "Higher unit count and more diversified rental segmentation",
  },
  emphasis: {
    ar: "تنويع الدخل",
    en: "Income diversification",
  },
  merits: {
    ar: [
      "عدد وحدات أعلى",
      "تنوع أكبر في شرائح التأجير",
      "ملاءمة تشغيلية لنموذج Co-Living النسائي",
      "مخاطر دخل موزعة على عدد أكبر من المستأجرات",
    ],
    en: [
      "Higher unit count",
      "More diversified rental segmentation",
      "Operationally suited to women's shared living",
      "Income risk spread across more tenants",
    ],
  },
  opportunitiesChallenges: {
    opportunities: {
      ar: [
        "قرب العقار من جامعة اليمامة",
        "يبعد عن جامعة اليمامة بحوالي 7 كم",
        "إمكانية استهداف الطالبات والموظفات الشابات",
        "إمكانية تطوير نموذج سكن مشترك اقتصادي للنساء",
      ],
      en: [
        "The asset is near Al Yamamah University",
        "Approximately 7 km from Al Yamamah University",
        "Potential to target female students and young female professionals",
        "Potential to develop an economical women's shared-living model",
      ],
    },
    challenges: {
      ar: [
        "بعد العقار عن أغلب الجامعات",
        "بعده عن المناطق التي تخدم نموذج السكن المشترك بشكل مباشر",
        "محدودية الطلب المباشر على الـ Co-Living في المنطقة الحالية",
        "الحاجة إلى تسويق وتشغيل أقوى لجذب الفئة المستهدفة",
      ],
      en: [
        "The asset is distant from most universities",
        "The location is away from areas that directly support a Co-Living model",
        "Direct Co-Living demand in the current area is limited",
        "Stronger marketing and operations are required to attract the target segment",
      ],
    },
  },
  pricingFactors: {
    ar: ["تقسيم الوحدات", "نوع الوحدة", "سيناريو السعر", "مستوى الإشغال"],
    en: ["Unit segmentation", "Unit type", "Pricing scenario", "Occupancy level"],
  },
  pricing: [
    {
      label: {
        ar: "ماستر",
        en: "Master",
      },
      units: 10,
      worst: 2800,
      base: 3000,
      best: 3300,
    },
    {
      label: {
        ar: "استوديو",
        en: "Studio",
      },
      units: 1,
      worst: 3458,
      base: 3890,
      best: 4200,
    },
  ],
  scenarios: buildModelScenarios({
    unitCount,
    scenarios: {
      worst: {
        revenueAt100: 377496,
        revenueByOccupancy: {
          50: 188748,
          60: 226498,
          70: 264247,
          80: 301997,
          90: 339746,
        },
        netRevenueByOccupancy: {
          50: 150998,
          60: 181198,
          70: 211398,
          80: 241597,
          90: 271797,
        },
        annualPerUnitByOccupancy: {
          50: 13727,
          60: 16473,
          70: 19218,
          80: 21963,
          90: 24709,
        },
        monthlyPerUnitByOccupancy: {
          50: 1144,
          60: 1373,
          70: 1601,
          80: 1830,
          90: 2059,
        },
      },
      base: {
        revenueAt100: 406685,
        revenueByOccupancy: {
          50: 203343,
          60: 244011,
          70: 284680,
          80: 325348,
          90: 366017,
        },
        netRevenueByOccupancy: {
          50: 162674,
          60: 195209,
          70: 227743,
          80: 260278,
          90: 292813,
        },
        annualPerUnitByOccupancy: {
          50: 14789,
          60: 17746,
          70: 20704,
          80: 23662,
          90: 26619,
        },
        monthlyPerUnitByOccupancy: {
          50: 1232,
          60: 1479,
          70: 1725,
          80: 1972,
          90: 2218,
        },
      },
      best: {
        revenueAt100: 446400,
        revenueByOccupancy: {
          50: 223200,
          60: 267840,
          70: 312480,
          80: 357120,
          90: 401760,
        },
        netRevenueByOccupancy: {
          50: 178560,
          60: 214272,
          70: 249984,
          80: 285696,
          90: 321408,
        },
        annualPerUnitByOccupancy: {
          50: 16233,
          60: 19479,
          70: 22726,
          80: 25972,
          90: 29219,
        },
        monthlyPerUnitByOccupancy: {
          50: 1353,
          60: 1623,
          70: 1894,
          80: 2164,
          90: 2435,
        },
      },
    },
  }),
};

export const coLivingModel = {
  key: "coLiving",
  labelKey: "coLiving",
  defaultStrategy: "villaConversion",
  strategies: {
    villaConversion: coLivingVariant,
  },
};

export default coLivingModel;
