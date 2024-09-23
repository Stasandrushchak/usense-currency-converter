export const currencyHelper = (
  value: string,
  usdRate: number | null,
  eurRate: number | null,
): number => {
  switch (value) {
    case "UAH":
      return 1;
    case "USD":
      return usdRate || 0;
    case "EUR":
      return eurRate || 0;
    default:
      return 0;
  }
};
