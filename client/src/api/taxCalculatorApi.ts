import { TaxBracketsResponse } from "../types";

const BASE_URL = "http://localhost:5001/tax-calculator";

export const fetchTaxBrackets = async (
    year?: number
  ): Promise<TaxBracketsResponse> => {
    const url = year ? `${BASE_URL}/tax-year/${year}` : BASE_URL;
    const response = await fetch(url);
  
    if (!response.ok) {
      throw new Error(
        `Error fetching tax brackets: ${response.status} ${response.statusText}`
      );
    }
  
    const data: TaxBracketsResponse = await response.json();
    return data;
  };