import React, { useEffect, useState } from 'react';
import type { TaxBracket } from '../types/TaxBracket';
import { fetchTaxBrackets } from '../api/taxCalculatorApi';
import {calculateIncomeTax} from '../utils/calculateIncomeTax';

const TAX_YEARS = ['2019', '2020', '2021', '2022'] as const;


const TaxCalculatorForm = () => {
    const [income, setIncome] = useState<number>(0);
    const [year, setYear] = useState<string>('2022');
    const [brackets, setBrackets] = useState<TaxBracket[] | null>(null);
    const [tax, setTax] = useState<number | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const loadBrackets = async () => {
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

    
      const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!brackets || income <= 0) {
          setError('Please enter a valid income and wait for tax brackets to load.');
          return;
        }
        const calculatedTax = calculateIncomeTax(income, brackets);
        setTax(calculatedTax);
      }

      return (
        <div className="">
          <h2 className="">Income Tax Calculator</h2>
    
          <form onSubmit={handleSubmit} className="">
            <div>
              <label className="" htmlFor="income">Annual Income ($)</label>
              <input
                type="number"
                id="income"
                value={income}
                onChange={(e) => setIncome(parseFloat(e.target.value))}
                className=""
                min={0}
                step={0.01}
                required
              />
            </div>
    
            <div>
              <label className="" htmlFor="year">Tax Year</label>
              <select
                id="year"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className=""
              >
                {TAX_YEARS.map((y) => (
                  <option key={y} value={y}>{y}</option>
                ))}
              </select>
            </div>
    
            <button
              type="submit"
              className=""
            >
              Calculate Tax
            </button>
          </form>
    
          {loading && <p className="">Loading tax brackets...</p>}
          {error && <p className="">{error}</p>}
          {tax !== null && (
            <p className="">
            Estimated tax: ${tax}
            </p>
           )}
        </div>
      );
    };
    
    export default TaxCalculatorForm;