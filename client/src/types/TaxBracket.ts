/**
 * Represents a single tax bracket coming from API
 * max is optional because the last bracket on the endpoint doesn't have an upper limit
 */
 export type TaxBracket = {
    min: number;
    max?: number;
    rate: number;
  }