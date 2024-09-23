import { currencyHelper } from "./currencyHelper";

export const currencyConvertor = (
  initialCurrency: string,
  toCurrency: string,
  amount: {
    first: string;
    second: string;
  },
  usdRate: number | null,
  eurRate: number | null,
  setTotalAmount: (totalAmount: { first: string; second: string }) => void,
) => {
  if (!initialCurrency || !toCurrency) {
    return;
  }

  const initialValue = currencyHelper(initialCurrency, usdRate, eurRate);
  const outputValue = currencyHelper(toCurrency, usdRate, eurRate);

  const resultFirst = (parseInt(amount.first) * initialValue) / outputValue;
  const resultSecond = (parseInt(amount.second) * outputValue) / initialValue;

  setTotalAmount({
    first: isNaN(resultFirst) ? "0" : resultFirst.toFixed(1),
    second: isNaN(resultSecond) ? "0" : resultSecond.toFixed(1),
  });
};
