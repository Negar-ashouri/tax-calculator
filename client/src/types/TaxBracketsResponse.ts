import { TaxBracket } from "./TaxBracket";

/**
 * API response shape for GET /tax-calculator
 */
export interface TaxBracketsResponse {
  tax_brackets: TaxBracket[];
}