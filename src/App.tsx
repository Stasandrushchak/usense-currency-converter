import React, { useEffect, useState } from "react";
import { Currency } from "./types/currency";
import { Loader } from "./components/Loader/Loader";
import 'bulma/css/bulma.css';

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
    const fetchCurrencyRates = async () => {
      try {
        const response = await fetch(
          "https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json",
        );
        const data: Currency[] = await response.json();

        const eur = data.find((currency) => currency.cc === "EUR");
        const usd = data.find((currency) => currency.cc === "USD");

        setEurRate(eur?.rate || null);
        setUsdRate(usd?.rate || null);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching currency rates:", error);
        setLoading(false);
      }
    };

    fetchCurrencyRates();
  }, []);

  function currencyHelper(value: string) {
    if (value === "UAH") {
      return 1;
    }

    if (value === "USD") {
      return usdRate || 0;
    }

    if (value === "EUR") {
      return eurRate || 0;
    }

    return 0;
  }

  const currencyConvertor = () => {
    if (!initialCurrency || !toCurrency) {
      return 0;
    }

    const initialValue = currencyHelper(initialCurrency);
    const outputValue = currencyHelper(toCurrency);

    const resultFirst = (parseInt(amount.first) * initialValue) / outputValue;
    const resultSecond = (parseInt(amount.second) * outputValue) / initialValue;

    setTotalAmount({
      first: resultFirst.toFixed(1),
      second: resultSecond.toFixed(1),
    });
  };

  useEffect(() => {
    currencyConvertor();
  }, [amount, initialCurrency, toCurrency]);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <section className="hero is-warning">
        <div className="hero-body">
          <h1 className="title has-text-centered">Exchange Rate</h1>
          <div className="section">
            <div className="container">
              <div className="columns is-vcentered">
                <div className="column">
                  <div className="box">
                    <h2 className="title">EUR</h2>
                    <p className="title is-4">{eurRate?.toFixed(2)} UAH</p>
                  </div>
                </div>
                <div className="column">
                  <div className="box">
                    <h2 className="title">USD</h2>
                    <p className="title is-4">{usdRate?.toFixed(2)} UAH</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="box is-centered is-flex is-justify-content-center">
        <table className="table has-addons-centered">
          <tbody>
            <tr>
              <td>
                <div className="select is-medium is-warning is-hovered">
                  <select
                    onChange={(event) => setInitialCurrency(event.target.value)}
                  >
                    <option value="UAH">UAH</option>
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                  </select>
                </div>
              </td>
              <td>
                <p className="control">
                  <input
                    className="input is-warning is-medium"
                    type="number"
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
                <div className="select is-medium is-warning is-hovered">
                  <select
                    onChange={(event) => setToCurrency(event.target.value)}
                  >
                    <option value="UAH">UAH</option>
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                  </select>
                </div>
              </td>
              <td>
                <p className="control">
                  <input
                    className="input is-warning is-medium"
                    type="number"
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
    </>
  );
};
