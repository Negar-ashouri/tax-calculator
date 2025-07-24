import type { TaxBracketsResponse } from "../types/TaxBracketsResponse";

const BASE_URL = "http://localhost:5001/tax-calculator";
const VALID_YEARS = [2019, 2020, 2021, 2022];
/**
 * Fetch tax bracket data from the backend API.
 *
 * @param year Optional tax year to fetch brackets
 *             If omitted, fetches default tax brackets.
 * @returns A Promise resolving to the tax brackets response.
 * @throws Throws an error if the network request fails or response is not OK.
 */
export const fetchTaxBrackets = async (
    year?: number
  ): Promise<TaxBracketsResponse> => {
    if (year !== undefined && !VALID_YEARS.includes(year)) {
        throw new Error(`Invalid year: ${year}. Valid years are ${VALID_YEARS.join(", ")}`);
    }
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