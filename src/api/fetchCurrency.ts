import { Currency } from "../types/currency";

export const fetchCurrency = async (): Promise<{
  eurRate: number | null;
  usdRate: number | null;
}> => {
  try {
    const response = await fetch(
      "https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json",
    );
    const data: Currency[] = await response.json();

    const eur = data.find((currency) => currency.cc === "EUR");
    const usd = data.find((currency) => currency.cc === "USD");

    return {
      eurRate: eur?.rate || null,
      usdRate: usd?.rate || null,
    };
  } catch (error) {
    console.error("Error fetching currency rates:", error);
    return {
      eurRate: null,
      usdRate: null,
    };
  }
};
