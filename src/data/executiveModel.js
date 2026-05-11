import { buildModelScenarios, OPERATOR_FEE_RATE } from "@/data/modelCalculations";

const unitCount = 6;

export const executiveModel = {
  key: "executive",
  labelKey: "executiveHousing",
  operatorFeeRate: OPERATOR_FEE_RATE,
  recommendedOccupancy: 80,
  unitCount,
  contextDescription: {
    ar:
      "يعرض نموذج الإسكان التنفيذي تحويل الفيلا الحالية إلى 6 وحدات قابلة للتأجير: استوديو واحد و5 وحدات بغرفتي نوم، مع اختبار الحساسية من 50% إلى 90% إشغال ورسوم مشغل ثابتة 20%.",
    en:
      "The Executive Housing model converts the existing villa into 6 rentable units: 1 studio and 5 two-bedroom units, tested across 50% to 90% occupancy with a fixed 20% operator fee.",
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
