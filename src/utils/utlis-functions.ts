import { TCryptoAsset } from "./type";

export const FormatTicker = (data: (string | null)[]): string | null => {
  if (!data) {
    return null;
  }

  const filteredData = data.filter(
    (ticker): ticker is string => ticker !== null
  );

  if (filteredData.length === 0) {
    return null;
  }
  return filteredData.map((ticker) => `${ticker}@ticker`).join("/");
};

export const DataForCard = (
  data: Pick<TCryptoAsset, "symbol" | "price" | "quantity" | "change24h">,
  totalPortfolio: number | null 
) => {
  const { symbol, price, quantity, change24h } = data;

  const formattedSymbol = formatSymbol(symbol)

  const formattedPrice = formatPrice(price);

  const formattedQuantity =
    quantity !== null
      ? new Intl.NumberFormat("ru-RU", {
          style: "decimal",
          minimumFractionDigits: 5,
          maximumFractionDigits: 5,
        }).format(quantity)
      : null;

  const total = quantity !== null ? price * quantity : null;

  const formattedTotal =
    total !== null
      ? new Intl.NumberFormat("ru-RU", {
          style: "decimal",
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }).format(total)
      : null;

  const formattedChange = new Intl.NumberFormat("ru-RU", {
    style: "percent",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format((change24h || 0) / 100);

  const percentOfPortfolio =
    totalPortfolio !== null && total !== null
      ? (total / totalPortfolio) * 100
      : null;

  const formattedPercentOfPortfolio =
    percentOfPortfolio !== null
      ? new Intl.NumberFormat("ru-RU", {
          style: "decimal",
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }).format(percentOfPortfolio)
      : null;

  return {
    symbol: formattedSymbol,
    price: formattedPrice,
    quantity: formattedQuantity,
    total: formattedTotal,
    change24h: formattedChange,
    percentOfPortfolio: formattedPercentOfPortfolio,
  };
};

export const formatPrice = (price: number | null): string => {
  return price !== null && price !== undefined
    ? new Intl.NumberFormat("ru-RU", {
        style: "decimal",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(price)
    : '';
};

export const formatSymbol = (symbol: string) => symbol
    .replace("usdt", "")
    .toUpperCase();