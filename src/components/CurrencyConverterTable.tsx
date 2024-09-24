import React from "react";
import { CurrencySelect } from "./Select";

type CurrencyConverterTableProps = {
  initialCurrency: string;
  setInitialCurrency: (value: string) => void;
  toCurrency: string;
  setToCurrency: (value: string) => void;
  amount: { first: string; second: string };
  setAmount: (amount: { first: string; second: string }) => void;
  totalAmount: { first: string; second: string };
};

export const CurrencyConverterTable: React.FC<CurrencyConverterTableProps> = ({
  initialCurrency,
  setInitialCurrency,
  toCurrency,
  setToCurrency,
  amount,
  setAmount,
  totalAmount,
}) => (
  <div className="box is-centered is-flex is-justify-content-center">
    <table className="table has-addons-centered">
      <tbody>
        <tr>
          <td>
            <CurrencySelect
              selectedCurrency={initialCurrency}
              onChange={setInitialCurrency}
            />
          </td>
          <td>
            <p className="control">
              <input
                className="input is-warning is-medium"
                type="number"
                value={amount.first}
                onChange={(event) =>
                  setAmount({ ...amount, first: event.target.value })
                }
              />
            </p>
          </td>
          <td>
            <p className="title is-2">{totalAmount.first}</p>
          </td>
          <td>
            <p className="subtitle is-2">{toCurrency}</p>
          </td>
        </tr>
        <tr>
          <td>
            <CurrencySelect
              selectedCurrency={toCurrency}
              onChange={setToCurrency}
            />
          </td>
          <td>
            <p className="control">
              <input
                className="input is-warning is-medium"
                type="number"
                value={amount.second}
                onChange={(event) =>
                  setAmount({ ...amount, second: event.target.value })
                }
              />
            </p>
          </td>
          <td>
            <p className="title is-2">{totalAmount.second}</p>
          </td>
          <td>
            <p className="subtitle is-2">{initialCurrency}</p>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
);
