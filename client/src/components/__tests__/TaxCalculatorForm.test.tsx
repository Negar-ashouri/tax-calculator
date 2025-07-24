import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import TaxCalculatorForm from '../TaxCalculatorForm';
import * as api from '../../api/taxCalculatorApi';
import * as utils from '../../utils/calculateIncomeTax';

// Mock the fetchTaxBrackets and calculateIncomeTax functions
jest.mock('../../api/taxCalculatorApi');
jest.mock('../../utils/calculateIncomeTax');

describe('TaxCalculatorForm', () => {
  const mockFetchTaxBrackets = api.fetchTaxBrackets as jest.MockedFunction<typeof api.fetchTaxBrackets>;
  const mockCalculateIncomeTax = utils.calculateIncomeTax as jest.MockedFunction<typeof utils.calculateIncomeTax>;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders form elements correctly', () => {
    render(<TaxCalculatorForm />);
    expect(screen.getByLabelText(/Annual Income/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Tax Year/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Calculate Tax/i })).toBeInTheDocument();
  });

  test('shows error if income is invalid on submit', async () => {
    render(<TaxCalculatorForm />);
    fireEvent.change(screen.getByLabelText(/Annual Income/i), { target: { value: '-100' } });
    fireEvent.click(screen.getByRole('button', { name: /Calculate Tax/i }));

    expect(await screen.findByText(/Please enter a valid income/i)).toBeInTheDocument();
    expect(mockFetchTaxBrackets).not.toHaveBeenCalled();
  });

  test('fetches brackets and calculates tax on valid submit', async () => {
    // Setup mock data
    const fakeBrackets = [
      { min: 0, max: 10000, rate: 0.1 },
      { min: 10001, max: 50000, rate: 0.2 },
    ];
    mockFetchTaxBrackets.mockResolvedValue({ tax_brackets: fakeBrackets });
    mockCalculateIncomeTax.mockReturnValue(1234.56);

    render(<TaxCalculatorForm />);

    // Input valid income and submit
    fireEvent.change(screen.getByLabelText(/Annual Income/i), { target: { value: '40000' } });
    fireEvent.change(screen.getByLabelText(/Tax Year/i), { target: { value: '2022' } });
    fireEvent.click(screen.getByRole('button', { name: /Calculate Tax/i }));

    // Wait for fetch and calculation
    await waitFor(() => {
      expect(mockFetchTaxBrackets).toHaveBeenCalledWith(2022);
    });

    // Check that calculateIncomeTax was called with correct args
    expect(mockCalculateIncomeTax).toHaveBeenCalledWith(40000, fakeBrackets);

    // Confirm tax result rendered (assuming TaxResult shows tax amount text)
    expect(screen.getByText(/\$?1234\.56/)).toBeInTheDocument();
  });

  test('handles fetch error gracefully', async () => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
  
    mockFetchTaxBrackets.mockRejectedValue(new Error('Network error'));
  
    render(<TaxCalculatorForm />);
  
    fireEvent.change(screen.getByLabelText(/Annual Income/i), { target: { value: '40000' } });
    fireEvent.click(screen.getByRole('button', { name: /Calculate Tax/i }));
  
    expect(await screen.findByText(/Network error/)).toBeInTheDocument();
  
    // Use exact tax number or a specific selector to avoid matching the year options
    expect(screen.queryByText('$1234.56')).not.toBeInTheDocument();
  
    (console.error as jest.Mock).mockRestore();
  });
  

  test('resets submitted state when income or year changes', async () => {
    // Mock success response
    mockFetchTaxBrackets.mockResolvedValue({ tax_brackets: [] });
    mockCalculateIncomeTax.mockReturnValue(0);

    render(<TaxCalculatorForm />);

    // Submit once to set submitted=true
    fireEvent.change(screen.getByLabelText(/Annual Income/i), { target: { value: '1000' } });
    fireEvent.click(screen.getByRole('button', { name: /Calculate Tax/i }));
    await waitFor(() => expect(mockFetchTaxBrackets).toHaveBeenCalled());

    // Change income - should reset submitted
    fireEvent.change(screen.getByLabelText(/Annual Income/i), { target: { value: '2000' } });
    // Change year - should reset submitted
    fireEvent.change(screen.getByLabelText(/Tax Year/i), { target: { value: '2021' } });
  });
});