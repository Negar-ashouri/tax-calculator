import { fetchTaxBrackets } from "../taxCalculatorApi";
import type { TaxBracketsResponse } from "../../types/TaxBracketsResponse";


describe("fetchTaxBrackets", () => {
  const mockResponse: TaxBracketsResponse = {
    tax_brackets: [
      { min: 0, max: 50197, rate: 0.15 },
      { min: 50197, max: 100392, rate: 0.205 },
    ],
  };

  beforeEach(() => {
    // Reset mocks before each test
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });
  
  it("throws error on invalid year", async () => {
    await expect(fetchTaxBrackets(2018)).rejects.toThrow(
      "Invalid year: 2018. Valid years are 2019, 2020, 2021, 2022"
    );
    await expect(fetchTaxBrackets(2025)).rejects.toThrow(
      "Invalid year: 2025. Valid years are 2019, 2020, 2021, 2022"
    );
  });

  it("fetches default tax brackets when no year provided", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    const data = await fetchTaxBrackets();

    expect(global.fetch).toHaveBeenCalledWith("http://localhost:5001/tax-calculator");
    expect(data).toEqual(mockResponse);
  });

  it("fetches tax brackets for a specific year", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    const year = 2022;
    const data = await fetchTaxBrackets(year);

    expect(global.fetch).toHaveBeenCalledWith(`http://localhost:5001/tax-calculator/tax-year/${year}`);
    expect(data).toEqual(mockResponse);
  });

  it("throws an error if response is not ok", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 500,
      statusText: "Internal Server Error",
    });

    await expect(fetchTaxBrackets(2022)).rejects.toThrow(
      "Error fetching tax brackets: Internal Server Error !try again!"
    );
  });

  it("throws an error if fetch rejects", async () => {
    (global.fetch as jest.Mock).mockRejectedValueOnce(new Error("Network failure"));

    await expect(fetchTaxBrackets()).rejects.toThrow("Network failure");
  });
});