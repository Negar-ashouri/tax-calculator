import type { TaxBracket } from "./TaxBracket";

/**
 * API response shape 
 */
export type TaxBracketsResponse = {
  tax_brackets: TaxBracket[];
}