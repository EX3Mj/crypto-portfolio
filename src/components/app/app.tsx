import React, { useEffect, useMemo } from "react";
import { CryptoList } from "../crypto-portfolio-list";
import { AppHeader } from "../app-header";
import styles from "./app.module.scss";
import { useDispatch, useSelector } from "../../services/store";
import { getAllCrypto } from "../../services/thunk/cryptoThunk";
import { initialPortfolioState } from "../../services/slices/cryptoSlice";
import { getPortfolioLocalstorage } from "../../utils/localstorage";
import { useBinanceWebSocket } from "../../services/hooks/useBinance";
import { FormatTicker } from "../../utils/utlis-functions";

export const App: React.FC = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.crypto.AllCrypto);

  useEffect(() => {
    dispatch(initialPortfolioState(getPortfolioLocalstorage()));
    dispatch(getAllCrypto());
  }, [dispatch]);

  const allActiveSymbols = useMemo(
    () =>
      data
        .filter((asset) => asset.portfolio === true)
        .map((asset) => asset.symbol),
    [data]
  );

  const ticker = FormatTicker(allActiveSymbols);

  useBinanceWebSocket(ticker);

  return (
    <div className={styles.wrapper}>
      <AppHeader />
      <main className={styles.content}>
        <CryptoList type="active" compact={false} />
      </main>
    </div>
  );
};
