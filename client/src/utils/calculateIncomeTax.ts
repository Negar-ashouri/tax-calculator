import type { TaxBracket } from "../types/TaxBracket";

/**
 * Calculates total income tax based on tax brackets and annual income
 *
 * @param income The annual taxable income (in CAD)
 * @param brackets Array of tax brackets with min and optional max and rate.
 * @returns The total income tax (in CAD)
 */
export function calculateIncomeTax(
  income: number,
  brackets: TaxBracket[]
): number {
  let tax = 0;

  for (const bracket of brackets) {
    const { min, max, rate } = bracket;

    // no income or incomes lower than min falls into this bracket, no tax
    if (income <= min) break;
    
    // determine the upper limit of income taxed at this rate
    const upper = max ?? income; // if no max then this is the top bracket
    const taxableAmount = Math.min(income, upper) - min;

    tax += taxableAmount * rate;
  }

  return Math.round(tax * 100) / 100;
}