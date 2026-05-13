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
      "يعرض نموذج الإسكان التنفيذي تحويل الفيلا الحالية إلى 6 وحدات قابلة للتأجير: استوديو واحد و5 وحدات بغرفتي نوم، مع اختبار الحساسية من 50% إلى 90% إشغال ورسوم مشغل ثابتة 20%.",
    en:
      "The Executive Housing model converts the existing villa into 6 rentable units: 1 studio and 5 two-bedroom units, tested across 50% to 90% occupancy with a fixed 20% operator fee.",
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
        ar: "استوديو",
        en: "Studio",
      },
      units: 1,
      worst: 3500,
      base: 4000,
      best: 8500,
    },
    {
      label: {
        ar: "غرفتان",
        en: "2BR",
      },
      units: 5,
      worst: 4050,
      base: 4709,
      best: 10622,
    },
  ],
  scenarios: buildModelScenarios({
    unitCount,
    scenarios: {
      worst: {
        revenueAt100: 284976,
        revenueByOccupancy: {
          50: 142488,
          60: 170986,
          70: 199483,
          80: 227981,
          90: 256478,
        },
        netRevenueByOccupancy: {
          50: 113990,
          60: 136788,
          70: 159587,
          80: 182385,
          90: 205183,
        },
        annualPerUnitByOccupancy: {
          50: 18998,
          60: 22798,
          70: 26598,
          80: 30397,
          90: 34197,
        },
        monthlyPerUnitByOccupancy: {
          50: 1583,
          60: 1900,
          70: 2216,
          80: 2533,
          90: 2850,
        },
      },
      base: {
        revenueAt100: 330508,
        revenueByOccupancy: {
          50: 165254,
          60: 198305,
          70: 231355,
          80: 264406,
          90: 297457,
        },
        netRevenueByOccupancy: {
          50: 132203,
          60: 158644,
          70: 185084,
          80: 211525,
          90: 237966,
        },
      },
      best: {
        revenueAt100: 743256,
        revenueByOccupancy: {
          50: 371628,
          60: 445954,
          70: 520279,
          80: 594605,
          90: 668930,
        },
        netRevenueByOccupancy: {
          50: 297302,
          60: 356763,
          70: 416223,
          80: 475684,
          90: 535144,
        },
        annualPerUnitByOccupancy: {
          50: 49550,
          60: 59460,
          70: 69371,
          80: 79281,
          90: 89191,
        },
      },
    },
  }),
};

export default executiveModel;
