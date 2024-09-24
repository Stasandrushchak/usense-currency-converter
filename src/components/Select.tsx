import React from "react";

type CurrencySelectProps = {
  selectedCurrency: string;
  onChange: (value: string) => void;
};

export const CurrencySelect: React.FC<CurrencySelectProps> = ({
  selectedCurrency,
  onChange,
}) => (
  <div className="select is-medium is-warning is-hovered">
    <select
      value={selectedCurrency}
      onChange={(event) => onChange(event.target.value)}
    >
      <option value="UAH">UAH</option>
      <option value="USD">USD</option>
      <option value="EUR">EUR</option>
    </select>
  </div>
);
