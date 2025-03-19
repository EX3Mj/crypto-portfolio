import { useEffect, useRef } from 'react';
import { ConnectToBinance } from '../../utils/binance-socket';
import { updateCrypto } from '../slices/cryptoSlice';
import { useDispatch } from '../store';


export const useBinanceWebSocket = (ticker: string | null) => {
  const dispatch = useDispatch();
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    if (!ticker) {
      return;
    }

    if (wsRef.current) {
      wsRef.current.close();
    }

    wsRef.current = ConnectToBinance(ticker);
    
    wsRef.current.onopen = () => {
      console.log('WebSocket connection established');
    };

    wsRef.current.onmessage = (event) => {
      try {
        const parsedData = JSON.parse(event.data);
        const { data } = parsedData;

        if (!data || !data.s || !data.b || !data.P) {
          console.error("Некорректные данные от WebSocket:", parsedData);
          return;
        }

        const symbol = data.s.toLowerCase();
        dispatch(updateCrypto({ symbol, price: data.b, change24h: data.P }));
      } catch (error) {
        console.error("Ошибка при обработке данных WebSocket:", error);
      }
    };

    wsRef.current.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    wsRef.current.onclose = () => {
      console.log('WebSocket connection closed');
    };

    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, [dispatch, ticker]);
};