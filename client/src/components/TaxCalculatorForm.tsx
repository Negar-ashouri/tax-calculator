import React, { useEffect, useState } from 'react';
import type { TaxBracket } from '../types/TaxBracket';
import { fetchTaxBrackets } from '../api/taxCalculatorApi';
import {calculateIncomeTax} from '../utils/calculateIncomeTax';
import TaxResult from './TaxResult';
import '../styles/TaxCalculatorForm.css';


const TAX_YEARS = ['2019', '2020', '2021', '2022'] as const;


const TaxCalculatorForm = () => {
    const [income, setIncome] = useState<string>('');
    const [year, setYear] = useState<string>('2022');
    const [brackets, setBrackets] = useState<TaxBracket[] | null>(null);
    const [tax, setTax] = useState<number | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [submitted, setSubmitted] = useState(false);


    useEffect(() => {
        const loadBrackets = async () => {
          setSubmitted(false);
          setLoading(true);
          setError(null);
    
          try {
            const data = await fetchTaxBrackets(year);
            setBrackets(data.tax_brackets);
          } catch (err: any) {
            setError(err.message || 'Failed to fetch tax brackets. Please try again later.');
            console.error(err);
            setBrackets(null);
          } finally {
            setLoading(false);
          }
        };
    
        loadBrackets();
      }, [year]);

      useEffect(() => {
        setSubmitted(false); // hides tax when income changes
      }, [income]);
    
      const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const incomeNumber = parseFloat(income);
        setError(null);

        if (!brackets || isNaN(incomeNumber) || incomeNumber <= 0) {
          setError('Please enter a valid income and wait for tax brackets to load.');
          return;
        }
      
        const calculatedTax = calculateIncomeTax(incomeNumber, brackets);
        setTax(calculatedTax);
        setSubmitted(true);
      }

    return (
        <div className="tax-calculator">
        <form onSubmit={handleSubmit} className="tax-calculator-form">
            <div className="tax-calculator-field">
            <label className="tax-calculator-label" htmlFor="income">
                Annual Income ($)
            </label>
            <input
                type="number"
                id="income"
                value={income}
                onChange={(e) => setIncome(e.target.value)}
                placeholder="Enter income in CAD"
                className="tax-calculator-input"
            />
            </div>

            <div className="tax-calculator-field">
            <label className="tax-calculator-label" htmlFor="year">
                Tax Year
            </label>
            <select
                id="year"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="tax-calculator-select"
            >
                {TAX_YEARS.map((y) => (
                <option key={y} value={y}>{y}</option>
                ))}
            </select>
            </div>

            <button type="submit" className="tax-calculator-button">
            Calculate Tax
            </button>
        </form>
        <TaxResult
            tax={tax}
            error={error}
            loading={loading}
            submitted={submitted}
            year={year}
        />
        </div>
    );
};

export default TaxCalculatorForm;