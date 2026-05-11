import { buildModelScenarios, OPERATOR_FEE_RATE } from "@/data/modelCalculations";

const unitCount = 11;

const coLivingVariant = {
  key: "villaConversion",
  selectorLabel: {
    ar: "نموذج السكن المشترك",
    en: "Co-Living Model",
  },
  title: {
    ar: "Financial Study - Al Aared Co-Living Model",
    en: "Financial Study - Al Aared Co-Living Model",
  },
  description: {
    ar: "تحويل الفيلا إلى 10 وحدات ماستر ووحدة استوديو واحدة، بما يرفع عدد الوحدات ويزيد تنوع شرائح التأجير.",
    en: "Converts the villa into 10 master units and 1 studio, creating a higher unit count and more diversified rental segmentation.",
  },
  contextDescription: {
    ar:
      "يعرض نموذج السكن المشترك تحويل الفيلا الحالية إلى 11 وحدة قابلة للتأجير: 10 وحدات ماستر ووحدة استوديو، مع اختبار الحساسية من 50% إلى 90% إشغال ورسوم مشغل ثابتة 20%.",
    en:
      "The Co-Living model converts the existing villa into 11 rentable units: 10 master units and 1 studio, tested across 50% to 90% occupancy with a fixed 20% operator fee.",
  },
  operatorFeeRate: OPERATOR_FEE_RATE,
  recommendedOccupancy: 80,
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
      "ملاءمة تشغيلية للسكن المشترك",
      "مخاطر دخل موزعة على عدد أكبر من المستأجرين",
    ],
    en: [
      "Higher unit count",
      "More diversified rental segmentation",
      "Operationally suited to shared living",
      "Income risk spread across more tenants",
    ],
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
      worst: 3270,
      base: 3599,
      best: 3838,
    },
    {
      label: {
        ar: "استوديو",
        en: "Studio",
      },
      units: 1,
      worst: 2900,
      base: 3258,
      best: 3556,
    },
  ],
  scenarios: buildModelScenarios({
    unitCount,
    scenarios: {
      worst: {
        revenueAt100: 431496,
        revenueByOccupancy: {
          50: 215748,
          60: 258898,
          70: 302047,
          80: 345197,
          90: 388346,
        },
        netRevenueByOccupancy: {
          50: 172598,
          60: 207118,
          70: 241638,
          80: 276157,
          90: 310677,
        },
      },
      base: {
        revenueAt100: 475085,
        revenueByOccupancy: {
          50: 237542,
          60: 285051,
          70: 332559,
          80: 380068,
          90: 427576,
        },
        netRevenueByOccupancy: {
          50: 190034,
          60: 228041,
          70: 266047,
          80: 304054,
          90: 342061,
        },
      },
      best: {
        revenueAt100: 506676,
        revenueByOccupancy: {
          50: 253338,
          60: 304006,
          70: 354673,
          80: 405341,
          90: 456008,
        },
        netRevenueByOccupancy: {
          50: 202670,
          60: 243204,
          70: 283739,
          80: 324273,
          90: 364807,
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
