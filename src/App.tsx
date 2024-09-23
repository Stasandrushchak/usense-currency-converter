import React, { useEffect, useState } from "react";
import { fetchCurrency } from "./api/fetchCurrency";
import { currencyConvertor } from "./utils/currencyConvertor";
import { HeroSection } from "./components/HeroSection";
import { CurrencyConverterTable } from "./components/CurrencyConverterTable";
import { Loader } from "./components/Loader/Loader";
import "bulma/css/bulma.css";

export const App: React.FC = () => {
  const [eurRate, setEurRate] = useState<number | null>(null);
  const [usdRate, setUsdRate] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [initialCurrency, setInitialCurrency] = useState("UAH");
  const [toCurrency, setToCurrency] = useState("UAH");
  const [amount, setAmount] = useState({
    first: "0",
    second: "0",
  });
  const [totalAmount, setTotalAmount] = useState({
    first: "0",
    second: "0",
  });

  useEffect(() => {
    const getCurrencyRates = async () => {
      const { eurRate, usdRate } = await fetchCurrency();
      setEurRate(eurRate);
      setUsdRate(usdRate);
      setLoading(false);
    };

    getCurrencyRates();
  }, []);

  useEffect(() => {
    currencyConvertor(
      initialCurrency,
      toCurrency,
      amount,
      usdRate,
      eurRate,
      setTotalAmount,
    );
  }, [amount, initialCurrency, toCurrency]);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <HeroSection eurRate={eurRate} usdRate={usdRate} />
      <CurrencyConverterTable
        initialCurrency={initialCurrency}
        setInitialCurrency={setInitialCurrency}
        toCurrency={toCurrency}
        setToCurrency={setToCurrency}
        amount={amount}
        setAmount={setAmount}
        totalAmount={totalAmount}
      />
    </>
  );
};
