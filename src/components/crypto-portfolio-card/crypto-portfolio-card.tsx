import React, { memo } from "react";
import styles from "./crypto-portfolio-card.module.scss";
import classNames from "classnames";
import { DataForCard } from "../../utils/utlis-functions";

type CryptoCardProps = {
  data: {
    id: string;
    symbol: string;
    quantity: number | null;
    price: number;
    change24h: number;
  };
  totalPortfolio: number | null;
  compact: boolean;
  onClick: (id: string) => void;
};

export const CryptoCard: React.FC<CryptoCardProps> = memo(
  ({ data, totalPortfolio, compact, onClick }) => {
    const cardData = DataForCard(data, totalPortfolio);
    const isNegative = data.change24h < 0;
    const change24hClass = classNames({
      [styles.change24hPositive]: !isNegative,
      [styles.change24hNegative]: isNegative,
    });

    const contentClass = classNames({
      [styles.card__content]: !compact,
      [styles.card__contentCompact]: compact,
    });

    const ariaLabelText = compact
      ? `Название: ${cardData.symbol}. Цена: ${cardData.price} $. Изменение за 24 часа: ${cardData.change24h}%.`
      : `Название: ${cardData.symbol}. Цена: ${cardData.price} $. Количество: ${cardData.quantity}. Общая стоимость: ${cardData.total} $. Изменение за 24 часа: ${cardData.change24h}%. Процент от портфеля: ${cardData.percentOfPortfolio}%.`;

    return (
      <li className={styles.card__element}>
        <button
          aria-label={ariaLabelText}
          className={styles.button}
          onClick={() => onClick(data.id)}
        >
          <article className={contentClass}><span data-label="Название">{cardData.symbol}</span>
            <span data-label="Цена">$ {cardData.price}</span>
            {!compact && <span data-label="Количество">{cardData.quantity}</span>}
            {!compact && <span data-label="Общая стоимость">$ {cardData.total}</span>}
            <span className={change24hClass} data-label="Изменение за 24 часа">
              {cardData.change24h}
            </span>
            {!compact && (
              <span data-label="Процент от портфеля">{cardData.percentOfPortfolio} %</span>
            )}
          </article>
        </button>
      </li>
    );
  }
);
