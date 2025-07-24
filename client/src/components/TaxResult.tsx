import React from "react";
import type { TaxResultProps } from "../types/TaxResultProps"; 
import '../styles/TaxCalculatorForm.css';


function TaxResult({ tax, error, loading, submitted, year }: TaxResultProps) {
    return (
      <div className="tax-calculator-message">
        {loading && (
          <p className="tax-calculator-loading">
            Loading tax brackets{year ? ` for ${year}` : ''}...
          </p>
        )}
        {error && <p className="tax-calculator-error">{error}</p>}
        {!loading && submitted && tax !== null && (
          <p className="tax-calculator-result">Estimated tax: ${tax}</p>
        )}
      </div>
    );
}

export default TaxResult;