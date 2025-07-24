import { calculateIncomeTax } from '../calculateIncomeTax';
import type { TaxBracket } from '../../types/TaxBracket';


describe('calculateIncomeTax with provided tax brackets', () => {
  const brackets: TaxBracket[] = [
    { min: 0, max: 50197, rate: 0.15 },
    { min: 50197, max: 100392, rate: 0.205 },
    { min: 100392, max: 155625, rate: 0.26 },
    { min: 155625, max: 221708, rate: 0.29 },
    { min: 221708, max: null, rate: 0.33 },
  ];

  it('returns 0 tax for zero income', () => {
    expect(calculateIncomeTax(0, brackets)).toBe(0);
  });

  it('calculates tax correctly for $50,000 income', () => {
    const tax = calculateIncomeTax(50000, brackets);
    expect(tax).toBeCloseTo(7500.00,2);
  });

  it('calculates tax correctly for $100,000 income', () => {
    const tax = calculateIncomeTax(100000, brackets);
    expect(tax).toBeCloseTo(17739.17, 2);
  });

  it('calculates tax correctly for $1,234,567 income', () => {
    const tax = calculateIncomeTax(1234567, brackets);
    expect(tax).toBeCloseTo(385587.65, 2);
  });
});