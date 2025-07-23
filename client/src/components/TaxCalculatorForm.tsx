import React, { useEffect, useState } from 'react';
import { TaxBracket } from '../types';
import { fetchTaxBrackets } from '../api/taxCalculatorApi';


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
          } catch (err) {
            setError('Failed to fetch tax brackets. Please try again later.');
            console.error(err);
          } finally {
            setLoading(false);
          }
        };
    
        loadBrackets();
      }, [year]);


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
        </div>
      );
    };
    
    export default TaxCalculatorForm;