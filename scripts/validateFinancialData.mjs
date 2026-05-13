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
      { label: "Studio", units: 1, worst: 3500, base: 4000, best: 8500 },
      { label: "2BR", units: 5, worst: 4050, base: 4709, best: 10622 },
    ],
    rev100: { worst: 284976, base: 330508, best: 743256 },
    revenue: {
      worst: { 50: 142488, 60: 170986, 70: 199483, 80: 227981, 90: 256478 },
      base: { 50: 165254, 60: 198305, 70: 231355, 80: 264406, 90: 297457 },
      best: { 50: 371628, 60: 445954, 70: 520279, 80: 594605, 90: 668930 },
    },
    net: {
      worst: { 50: 113990, 60: 136788, 70: 159587, 80: 182385, 90: 205183 },
      base: { 50: 132203, 60: 158644, 70: 185084, 80: 211525, 90: 237966 },
      best: { 50: 297302, 60: 356763, 70: 416223, 80: 475684, 90: 535144 },
    },
    annual: {
      worst: { 50: 18998, 60: 22798, 70: 26598, 80: 30397, 90: 34197 },
      base: { 50: 22034, 60: 26441, 70: 30847, 80: 35254, 90: 39661 },
      best: { 50: 49550, 60: 59460, 70: 69371, 80: 79281, 90: 89191 },
    },
    monthly: {
      worst: { 50: 1583, 60: 1900, 70: 2216, 80: 2533, 90: 2850 },
      base: { 50: 1836, 60: 2203, 70: 2571, 80: 2938, 90: 3305 },
      best: { 50: 4129, 60: 4955, 70: 5781, 80: 6607, 90: 7433 },
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
