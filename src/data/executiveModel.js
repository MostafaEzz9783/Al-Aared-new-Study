import { buildModelScenarios, OPERATOR_FEE_RATE } from "@/data/modelCalculations";

const unitCount = 6;

export const executiveModel = {
  key: "executive",
  labelKey: "executiveHousing",
  operatorFeeRate: OPERATOR_FEE_RATE,
  expectedOccupancy: 60,
  unitCount,
  title: {
    ar: "Financial Study - Dora Al Aared Executive Housing Model",
    en: "Financial Study - Dora Al Aared Executive Housing Model",
  },
  contextDescription: {
    ar:
      "يعرض نموذج السكن التنفيذي تحويل الفيلا الحالية إلى 6 وحدات قابلة للتأجير: 5 وحدات بغرفتي نوم ووحدة استوديو واحدة، مع اختبار الحساسية من 50% إلى 90% إشغال ورسوم مشغل ثابتة 20%.",
    en:
      "The Executive Housing model converts the existing villa into 6 rentable units: 5 two-bedroom units and 1 studio, tested across 50% to 90% occupancy with a fixed 20% operator fee.",
  },
  opportunitiesChallenges: {
    opportunities: {
      ar: [
        "قرب المشروع من مدينة الأمير سلطان للخدمات الإنسانية",
        "قربه من المدينة العسكرية",
        "قربه من مناطق العمل",
        "ملاءمته لفئة الموظفين والإقامات طويلة المدى",
        "إمكانية تحقيق استقرار تشغيلي أعلى",
      ],
      en: [
        "Proximity to Prince Sultan Humanitarian City",
        "Proximity to the military city",
        "Access to employment areas",
        "Suitable for employees and long-stay demand",
        "Potential to achieve higher operational stability",
      ],
    },
    challenges: {
      ar: [
        "المنافسة مع المشاريع التنفيذية الحديثة",
        "الحاجة إلى الحفاظ على جودة تشغيل مرتفعة",
        "حساسية العملاء التنفيذيين تجاه مستوى الخدمات",
        "احتمالية تأثر الطلب بتغيرات السوق وأسعار الإيجار",
      ],
      en: [
        "Competition with newer executive housing projects",
        "The need to maintain a high operating quality",
        "Executive customers are sensitive to service standards",
        "Demand may be affected by market shifts and rental pricing changes",
      ],
    },
  },
  pricing: [
    {
      label: {
        ar: "غرفتان",
        en: "2BR",
      },
      units: 5,
      worst: 3958,
      base: 4500,
      best: 4900,
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
        revenueAt100: 278976,
        revenueByOccupancy: {
          50: 139488,
          60: 167386,
          70: 195283,
          80: 223181,
          90: 251078,
        },
        netRevenueByOccupancy: {
          50: 111590,
          60: 133908,
          70: 156227,
          80: 178545,
          90: 200863,
        },
        annualPerUnitByOccupancy: {
          50: 18598,
          60: 22318,
          70: 26038,
          80: 29757,
          90: 33477,
        },
        monthlyPerUnitByOccupancy: {
          50: 1550,
          60: 1860,
          70: 2170,
          80: 2480,
          90: 2790,
        },
      },
      base: {
        revenueAt100: 316685,
        revenueByOccupancy: {
          50: 158343,
          60: 190011,
          70: 221680,
          80: 253348,
          90: 285017,
        },
        netRevenueByOccupancy: {
          50: 126674,
          60: 152009,
          70: 177343,
          80: 202678,
          90: 228013,
        },
        annualPerUnitByOccupancy: {
          50: 21112,
          60: 25335,
          70: 29557,
          80: 33780,
          90: 38002,
        },
        monthlyPerUnitByOccupancy: {
          50: 1759,
          60: 2111,
          70: 2463,
          80: 2815,
          90: 3167,
        },
      },
      best: {
        revenueAt100: 344400,
        revenueByOccupancy: {
          50: 172200,
          60: 206640,
          70: 241080,
          80: 275520,
          90: 309960,
        },
        netRevenueByOccupancy: {
          50: 137760,
          60: 165312,
          70: 192864,
          80: 220416,
          90: 247968,
        },
        annualPerUnitByOccupancy: {
          50: 22960,
          60: 27552,
          70: 32144,
          80: 36736,
          90: 41328,
        },
        monthlyPerUnitByOccupancy: {
          50: 1913,
          60: 2296,
          70: 2679,
          80: 3061,
          90: 3444,
        },
      },
    },
  }),
};

export default executiveModel;
