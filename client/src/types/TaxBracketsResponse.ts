import type { TaxBracket } from "./TaxBracket";

/**
 * API response shape for GET /tax-calculator
 */
export type TaxBracketsResponse = {
  tax_brackets: TaxBracket[];
}