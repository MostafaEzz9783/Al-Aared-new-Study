import { occupancyOptions } from "@/data/financialAssumptions";

export const OPERATOR_FEE_RATE = 0.2;

const round = (value) => Math.round(value);

export function buildScenario({
  revenueAt100,
  unitCount,
  revenueByOccupancy = {},
  netRevenueByOccupancy = {},
  annualPerUnitByOccupancy = {},
  monthlyPerUnitByOccupancy = {},
}) {
  const occupancy = occupancyOptions.reduce((rows, occupancyRate) => {
    const revenue = revenueByOccupancy[occupancyRate] ?? round(revenueAt100 * (occupancyRate / 100));
    const netRevenue = netRevenueByOccupancy[occupancyRate] ?? round(revenue * (1 - OPERATOR_FEE_RATE));
    const annualPerUnit = annualPerUnitByOccupancy[occupancyRate] ?? round(netRevenue / unitCount);
    const monthlyPerUnit = monthlyPerUnitByOccupancy[occupancyRate] ?? round(annualPerUnit / 12);

    rows[occupancyRate] = {
      revenue,
      netRevenue,
      annualPerUnit,
      monthlyPerUnit,
    };

    return rows;
  }, {});

  return {
    revenueAt100,
    occupancy,
  };
}

export function buildModelScenarios({ unitCount, scenarios }) {
  return Object.entries(scenarios).reduce((modelScenarios, [scenarioKey, scenario]) => {
    modelScenarios[scenarioKey] = buildScenario({
      unitCount,
      revenueAt100: scenario.revenueAt100,
      revenueByOccupancy: scenario.revenueByOccupancy,
      netRevenueByOccupancy: scenario.netRevenueByOccupancy,
      annualPerUnitByOccupancy: scenario.annualPerUnitByOccupancy,
      monthlyPerUnitByOccupancy: scenario.monthlyPerUnitByOccupancy,
    });

    return modelScenarios;
  }, {});
}
