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
        setSubmitted(false); // hides tax when income changes
      }, [income]);
      
      useEffect(() => {
        setSubmitted(false); // hides tax when year changes
      }, [year]);
    
      const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const incomeNumber = parseFloat(income);
        setError(null);
        setSubmitted(false);
        setLoading(true);
      
        if (isNaN(incomeNumber) || incomeNumber <= 0) {
          setError('Please enter a valid income.');
          setLoading(false);
          return;
        }
      
        try {
          const data = await fetchTaxBrackets(Number(year));
          setBrackets(data.tax_brackets);
          if(brackets){
            const calculatedTax = calculateIncomeTax(incomeNumber, data.tax_brackets);
            setTax(calculatedTax);
            setSubmitted(true);
          }
          const calculatedTax = calculateIncomeTax(incomeNumber, data.tax_brackets);
          setTax(calculatedTax);
          setSubmitted(true);
        } catch (err: unknown) {
          if (err instanceof Error) {
            setError(err.message);
          } else {
            setError('Failed to fetch tax brackets. Please try again later.');
          }
          console.error(err);
          setBrackets(null);
        } finally {
          setLoading(false);
        }
      };

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