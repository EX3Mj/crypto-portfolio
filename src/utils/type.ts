export type TCryptoAsset = {
  id: string;
  symbol: string;
  price: number;
  quantity: number | null;
  portfolio: boolean;
  change24h: number;
}