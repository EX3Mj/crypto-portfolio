export const ConnectToBinance = (ticker: string) => {
  return new WebSocket(
      `wss://stream.binance.com:9443/stream?streams=${ticker}`
    );
};