/**
 * props type to send to child component taxResult
 */
export type TaxResultProps = {
    tax: number | null;
    error: string | null;
    loading: boolean;
    submitted: boolean;
    year: string;
};