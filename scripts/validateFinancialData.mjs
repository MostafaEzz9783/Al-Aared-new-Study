import { createServer } from "vite";

const occupancyLevels = [50, 60, 70, 80, 90];
const scenarios = ["worst", "base", "best"];

const expected = {
  coLiving: {
    units: 11,
    rev100: { worst: 431496, base: 475085, best: 506676 },
    revenue: {
      worst: { 50: 215748, 60: 258898, 70: 302047, 80: 345197, 90: 388346 },
      base: { 50: 237542, 60: 285051, 70: 332559, 80: 380068, 90: 427576 },
      best: { 50: 253338, 60: 304006, 70: 354673, 80: 405341, 90: 456008 },
    },
    net: {
      worst: { 50: 172598, 60: 207118, 70: 241638, 80: 276157, 90: 310677 },
      base: { 50: 190034, 60: 228041, 70: 266047, 80: 304054, 90: 342061 },
      best: { 50: 202670, 60: 243204, 70: 283739, 80: 324273, 90: 364807 },
    },
    annual: {
      worst: { 50: 15691, 60: 18829, 70: 21967, 80: 25105, 90: 28243 },
      base: { 50: 17276, 60: 20731, 70: 24186, 80: 27641, 90: 31096 },
      best: { 50: 18425, 60: 22109, 70: 25794, 80: 29479, 90: 33164 },
    },
    monthly: {
      worst: { 50: 1308, 60: 1569, 70: 1831, 80: 2092, 90: 2354 },
      base: { 50: 1440, 60: 1728, 70: 2016, 80: 2303, 90: 2591 },
      best: { 50: 1535, 60: 1842, 70: 2150, 80: 2457, 90: 2764 },
    },
  },
  executive: {
    units: 6,
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
