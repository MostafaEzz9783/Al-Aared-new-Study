export const MARKET_VALIDATION_URL = "/files/Financial%20Study-%20Al%20Aared%20Villa%20Conversion.xlsx";

export const projectData = {
  mapUrl: "https://maps.app.goo.gl/LW8zg1pMaMkTQQvt5?g_st=ic",
  executiveUnits: 6,
  executiveUnitType: "Executive Housing Units",
  coLivingUnits: 11,
  operatorFeeRate: 0.2,
  location: {
    ar: "العريض",
    en: "Al Aared",
  },
  locationSubtext: {
    ar: "الرياض، المملكة العربية السعودية",
    en: "Riyadh, Saudi Arabia",
  },
  modelValue: {
    ar: "Co-Living / Executive Housing",
    en: "Co-Living / Executive Housing",
  },
  modelSubtext: {
    ar: "نموذجان تشغيليان لتحويل فيلا قائمة",
    en: "Two operating models for an existing villa conversion",
  },
  overviewDescription: {
    ar:
      "تقوم الدراسة على تحويل فيلا قائمة في العريض إلى وحدات قابلة للتأجير. تقارن Mathwa بين نموذج السكن المشترك ونموذج الإسكان التنفيذي وفق تقسيم الوحدات، افتراضات الإيجار، حساسية الإشغال، وصافي الإيراد بعد رسوم المشغل.",
    en:
      "This study is based on converting an existing villa in Al Aared into multiple rentable units. Mathwa compares a Co-Living model and an Executive Housing model based on unit segmentation, rent assumptions, occupancy scenarios, and net revenue after operator fees.",
  },
  features: {
    ar: [
      "الأصل العقاري فيلا قائمة يتم تقييم تحويلها إلى وحدات قابلة للتأجير.",
      "نموذج السكن المشترك: 10 وحدات ماستر + 1 استوديو، بإجمالي 11 وحدة.",
      "نموذج الإسكان التنفيذي: 1 استوديو + 5 وحدات غرفتين، بإجمالي 6 وحدات.",
      "تحليل الحساسية يغطي أسوأ حالة، الحالة الأساسية، وأفضل حالة عند إشغال من 50% إلى 90%.",
      "رسوم المشغل ثابتة عند 20% من الإيراد السنوي.",
      "الهدف تحديد النموذج الأكثر جاذبية ماليا والأكثر ملاءمة تشغيليا للأصل.",
    ],
    en: [
      "The asset is an existing villa being evaluated for conversion into rentable units.",
      "Co-Living model: 10 master units + 1 studio, for a total of 11 units.",
      "Executive Housing model: 1 studio + 5 two-bedroom units, for a total of 6 units.",
      "Sensitivity covers Worst Case, Base Case, and Best Case scenarios from 50% to 90% occupancy.",
      "Operator fee is fixed at 20% of annual revenue.",
      "The objective is to identify the most financially attractive and operationally suitable model for the asset.",
    ],
  },
  inventoryHighlights: [
    {
      count: 11,
      label: {
        ar: "وحدات السكن المشترك",
        en: "Co-Living Units",
      },
      note: {
        ar: "10 ماستر + 1 استوديو",
        en: "10 Master + 1 Studio",
      },
    },
    {
      count: 6,
      label: {
        ar: "وحدات الإسكان التنفيذي",
        en: "Executive Housing Units",
      },
      note: {
        ar: "1 استوديو + 5 وحدات غرفتين",
        en: "1 Studio + 5 two-bedroom units",
      },
    },
    {
      count: 3,
      label: {
        ar: "سيناريوهات مالية",
        en: "Financial Scenarios",
      },
      note: {
        ar: "أسوأ حالة، أساسي، وأفضل حالة",
        en: "Worst Case, Base Case, and Best Case",
      },
    },
    {
      count: 20,
      label: {
        ar: "رسوم المشغل",
        en: "Operator Fee",
      },
      note: {
        ar: "نسبة ثابتة من الإيراد السنوي",
        en: "Fixed percentage of annual revenue",
      },
    },
  ],
  inventoryTable: [
    {
      type: {
        ar: "Co-Living - Master",
        en: "Co-Living - Master",
      },
      count: 10,
      use: {
        ar: "وحدات رئيسية ضمن نموذج السكن المشترك",
        en: "Primary rentable units under the Co-Living model",
      },
    },
    {
      type: {
        ar: "Co-Living - Studio",
        en: "Co-Living - Studio",
      },
      count: 1,
      use: {
        ar: "وحدة استوديو ضمن نموذج السكن المشترك",
        en: "Studio unit under the Co-Living model",
      },
    },
    {
      type: {
        ar: "Executive Housing - Studio",
        en: "Executive Housing - Studio",
      },
      count: 1,
      use: {
        ar: "وحدة استوديو ضمن نموذج الإسكان التنفيذي",
        en: "Studio unit under the Executive Housing model",
      },
    },
    {
      type: {
        ar: "Executive Housing - 2BR",
        en: "Executive Housing - 2BR",
      },
      count: 5,
      use: {
        ar: "وحدات غرفتين ضمن نموذج الإسكان التنفيذي",
        en: "Two-bedroom units under the Executive Housing model",
      },
    },
  ],
  marketBenchmarks: [
    {
      label: {
        ar: "Co-Living - Worst Case 100%",
        en: "Co-Living - Worst Case 100%",
      },
      value: 431496,
      note: {
        ar: "الإيراد السنوي عند إشغال 100%",
        en: "Annual revenue at 100% occupancy",
      },
    },
    {
      label: {
        ar: "Co-Living - Base Case 100%",
        en: "Co-Living - Base Case 100%",
      },
      value: 475085,
      note: {
        ar: "الإيراد السنوي عند إشغال 100%",
        en: "Annual revenue at 100% occupancy",
      },
    },
    {
      label: {
        ar: "Executive Housing - Best Case 100%",
        en: "Executive Housing - Best Case 100%",
      },
      value: 743256,
      note: {
        ar: "إبراز قوة الارتفاع في أفضل حالة",
        en: "Highlights the materially stronger Best Case upside",
      },
    },
  ],
};

export default projectData;
