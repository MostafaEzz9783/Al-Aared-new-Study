import { createServer } from "vite";

const occupancyLevels = [50, 60, 70, 80, 90];
const scenarios = ["worst", "base", "best"];

const expected = {
  coLiving: {
    units: 11,
    pricing: [
      { label: "Master", units: 10, worst: 2800, base: 3000, best: 3300 },
      { label: "Studio", units: 1, worst: 3458, base: 3890, best: 4200 },
    ],
    rev100: { worst: 377496, base: 406685, best: 446400 },
    revenue: {
      worst: { 50: 188748, 60: 226498, 70: 264247, 80: 301997, 90: 339746 },
      base: { 50: 203343, 60: 244011, 70: 284680, 80: 325348, 90: 366017 },
      best: { 50: 223200, 60: 267840, 70: 312480, 80: 357120, 90: 401760 },
    },
    net: {
      worst: { 50: 150998, 60: 181198, 70: 211398, 80: 241597, 90: 271797 },
      base: { 50: 162674, 60: 195209, 70: 227743, 80: 260278, 90: 292813 },
      best: { 50: 178560, 60: 214272, 70: 249984, 80: 285696, 90: 321408 },
    },
    annual: {
      worst: { 50: 13727, 60: 16473, 70: 19218, 80: 21963, 90: 24709 },
      base: { 50: 14789, 60: 17746, 70: 20704, 80: 23662, 90: 26619 },
      best: { 50: 16233, 60: 19479, 70: 22726, 80: 25972, 90: 29219 },
    },
    monthly: {
      worst: { 50: 1144, 60: 1373, 70: 1601, 80: 1830, 90: 2059 },
      base: { 50: 1232, 60: 1479, 70: 1725, 80: 1972, 90: 2218 },
      best: { 50: 1353, 60: 1623, 70: 1894, 80: 2164, 90: 2435 },
    },
  },
  executive: {
    units: 6,
    pricing: [
      { label: "2BR", units: 5, worst: 3958, base: 4500, best: 4900 },
      { label: "Studio", units: 1, worst: 3458, base: 3890, best: 4200 },
    ],
    rev100: { worst: 278976, base: 316685, best: 344400 },
    revenue: {
      worst: { 50: 139488, 60: 167386, 70: 195283, 80: 223181, 90: 251078 },
      base: { 50: 158343, 60: 190011, 70: 221680, 80: 253348, 90: 285017 },
      best: { 50: 172200, 60: 206640, 70: 241080, 80: 275520, 90: 309960 },
    },
    net: {
      worst: { 50: 111590, 60: 133908, 70: 156227, 80: 178545, 90: 200863 },
      base: { 50: 126674, 60: 152009, 70: 177343, 80: 202678, 90: 228013 },
      best: { 50: 137760, 60: 165312, 70: 192864, 80: 220416, 90: 247968 },
    },
    annual: {
      worst: { 50: 18598, 60: 22318, 70: 26038, 80: 29757, 90: 33477 },
      base: { 50: 21112, 60: 25335, 70: 29557, 80: 33780, 90: 38002 },
      best: { 50: 22960, 60: 27552, 70: 32144, 80: 36736, 90: 41328 },
    },
    monthly: {
      worst: { 50: 1550, 60: 1860, 70: 2170, 80: 2480, 90: 2790 },
      base: { 50: 1759, 60: 2111, 70: 2463, 80: 2815, 90: 3167 },
      best: { 50: 1913, 60: 2296, 70: 2679, 80: 3061, 90: 3444 },
    },
  },
};

function assertClose(mismatches, label, actual, expectedValue, tolerance = 0) {
  if (Math.abs(actual - expectedValue) > tolerance) {
    mismatches.push(`${label}: ${actual} !== ${expectedValue}`);
  }
}

const server = await createServer({
  server: { middlewareMode: true },
  appType: "custom",
  optimizeDeps: { noDiscovery: true },
});

try {
  const { coLivingModel } = await server.ssrLoadModule("/src/data/coLivingModel.js");
  const { executiveModel } = await server.ssrLoadModule("/src/data/executiveModel.js");
  const models = {
    coLiving: coLivingModel.strategies.villaConversion,
    executive: executiveModel,
  };
  const mismatches = [];

  for (const [modelKey, expectedModel] of Object.entries(expected)) {
    const model = models[modelKey];

    assertClose(mismatches, `${modelKey}.unitCount`, model.unitCount, expectedModel.units);
    assertClose(mismatches, `${modelKey}.operatorFeeRate`, model.operatorFeeRate, 0.2);
    assertClose(mismatches, `${modelKey}.expectedOccupancy`, model.expectedOccupancy, 60);

    expectedModel.pricing.forEach((expectedPrice, index) => {
      const actualPrice = model.pricing[index];
      const actualLabel = actualPrice.label.en;

      if (actualLabel !== expectedPrice.label) {
        mismatches.push(`${modelKey}.pricing.${index}.label: ${actualLabel} !== ${expectedPrice.label}`);
      }

      assertClose(mismatches, `${modelKey}.pricing.${index}.units`, actualPrice.units, expectedPrice.units);

      for (const scenario of scenarios) {
        assertClose(
          mismatches,
          `${modelKey}.pricing.${index}.${scenario}`,
          actualPrice[scenario],
          expectedPrice[scenario],
        );
      }
    });

    for (const scenario of scenarios) {
      const actualScenario = model.scenarios[scenario];
      assertClose(
        mismatches,
        `${modelKey}.${scenario}.revenueAt100`,
        actualScenario.revenueAt100,
        expectedModel.rev100[scenario],
      );

      for (const occupancy of occupancyLevels) {
        const row = actualScenario.occupancy[occupancy];

        assertClose(mismatches, `${modelKey}.${scenario}.${occupancy}.revenue`, row.revenue, expectedModel.revenue[scenario][occupancy]);
        assertClose(mismatches, `${modelKey}.${scenario}.${occupancy}.netRevenue`, row.netRevenue, expectedModel.net[scenario][occupancy]);
        assertClose(mismatches, `${modelKey}.${scenario}.${occupancy}.annualPerUnit`, row.annualPerUnit, expectedModel.annual[scenario][occupancy]);
        assertClose(mismatches, `${modelKey}.${scenario}.${occupancy}.monthlyPerUnit`, row.monthlyPerUnit, expectedModel.monthly[scenario][occupancy]);

        assertClose(mismatches, `${modelKey}.${scenario}.${occupancy}.netFormula`, row.netRevenue, Math.round(row.revenue * 0.8), 1);
        assertClose(mismatches, `${modelKey}.${scenario}.${occupancy}.annualFormula`, row.annualPerUnit, Math.round(row.netRevenue / expectedModel.units), 1);
        assertClose(mismatches, `${modelKey}.${scenario}.${occupancy}.monthlyFormula`, row.monthlyPerUnit, Math.round(row.annualPerUnit / 12), 1);
      }
    }
  }

  if (mismatches.length > 0) {
    console.error(mismatches.join("\n"));
    process.exitCode = 1;
  } else {
    console.log("VALIDATION PASSED: all source values and formulas match within rounding tolerance.");
  }
} finally {
  await server.close();
}
