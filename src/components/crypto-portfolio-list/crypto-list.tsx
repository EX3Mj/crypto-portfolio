import React, { memo, useMemo, useState } from "react";
import styles from "./crypto-list.module.scss";
import { useSelector, useDispatch } from "../../services/store";
import {
  removeFromPortfolio,
  selectCrypto,
} from "../../services/slices/cryptoSlice";
import { Loader } from "../loader";
import classNames from "classnames";
import { formatPrice } from "../../utils/utlis-functions";
import { CryptoCard } from "../crypto-portfolio-card";
import { TCryptoAsset } from "../../utils/type";
import { DeletePortfolioItemForm } from "../detelePorfolioItemForm";

type CryptoListProps = {
  type: "form" | "active";
  compact: boolean;
  textFilter?: string;
};

export const CryptoList: React.FC<CryptoListProps> = memo(
  ({ type, compact, textFilter }) => {
    const dispatch = useDispatch();
    const data = useSelector((state) => state.crypto.AllCrypto);
    const isLoadingCrypto = useSelector(
      (state) => state.crypto.isLoadingCrypto
    );
    const isDataLoaded = useSelector((state) => state.crypto.isDataLoaded);
    const [isDeletePortfolioItemFormOpen, setIsDeletePortfolioItemFormOpen] =
      useState<boolean>(false);
    const [idDeletePortfolioItemFormOpen, setIdDeletePortfolioItemFormOpen] =
      useState<string>("");

    const filteredData = useMemo(() => {
      let result =
        type === "active"
          ? data.filter((asset) => asset.portfolio === true)
          : data;

      if (textFilter) {
        result = result.filter((asset) =>
          asset.symbol.toLowerCase().includes(textFilter.toLowerCase())
        );
      }

      return result;
    }, [data, type, textFilter]);

    const handelSelectCrypto = (data: TCryptoAsset) => {
      dispatch(selectCrypto(data));
    };

    const handleDeletePortfolioItem = (id: string) => {
      console.log('Привет');
      setIdDeletePortfolioItemFormOpen(id);
      setIsDeletePortfolioItemFormOpen(true);
    };

    const handleCloseDeleteForm = () => {
      setIsDeletePortfolioItemFormOpen(false);
      setIdDeletePortfolioItemFormOpen('');
    };

    const totalPortfolio: number | null = useMemo(() => {
      if (type !== "active") {
        return null;
      }
      return filteredData.reduce((total: number, asset: TCryptoAsset) => {
        if (asset.quantity != null && asset.price != null) {
          return total + asset.price * asset.quantity;
        }
        return total;
      }, 0);
    }, [filteredData, type]);

    const listClass = classNames({
      [styles.list]: !compact,
      [styles.listCompact]: compact,
    });

    return (
      <>
        {isLoadingCrypto ? (
          <Loader />
        ) : !isDataLoaded ? null : filteredData.length === 0 ? (
          <span className={styles.list_empty}>
            {compact
              ? `Криптовалюты не найдены`
              : `Нет активов в вашем портфеле. Добавьте что-нибудь, чтобы начать!`}
          </span>
        ) : (
          <>
            {!compact ? (
              <span className={styles.total}>
                Общая сумма портфеля: ${"\u00A0"}
                {formatPrice(totalPortfolio)}
              </span>
            ) : null}
            {!compact ? (
              <div aria-label="Шапка таблица" className={styles.list__header}>
                <span>Название</span>
                <span>Цена</span>
                <span>Количество</span>
                <span>Общая стоимость</span>
                <span>Изм. за 24 ч.</span>
                <span>% портфеля</span>
              </div>
            ) : null}
            <ul aria-label="Список криптовалют" className={listClass}>
              {filteredData.map((asset) => (
                <CryptoCard
                  key={asset.id}
                  data={asset}
                  totalPortfolio={totalPortfolio}
                  compact={compact}
                  onClick={() =>
                    compact
                      ? handelSelectCrypto(asset)
                      : handleDeletePortfolioItem(asset.id)
                  }
                />
              ))}
            </ul>
            <DeletePortfolioItemForm
              onClose={handleCloseDeleteForm}
              isOpen={isDeletePortfolioItemFormOpen}
              onConfirm={() =>
                dispatch(removeFromPortfolio(idDeletePortfolioItemFormOpen))
              }
            />
          </>
        )}
      </>
    );
  }
);
