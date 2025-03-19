import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../services/store";
import { updateCrypto, selectCrypto, setItemPortfolio } from "../../services/slices/cryptoSlice";
import { formatPrice, formatSymbol } from "../../utils/utlis-functions";
import { setItemPortfolioLocalStorage } from "../../utils/localstorage";
import styles from "./add-asset-form.module.scss";
import { TAddAssetForm } from "./type";
import { Modal } from "../modal";
import { CryptoList } from "../crypto-portfolio-list";

export const AddPortfolioItemForm: React.FC<TAddAssetForm> = ({ onClose, isOpen }) => {
  const dispatch = useDispatch();
  const [textFilterCrypto, setFilterCryptoo] = useState<string>("");
  const [quantity, setQuantity] = useState<string>('');
  const [isQuantity, setIsQuantity] = useState<boolean>(true);
  const selectedCrypto = useSelector(
    (state: RootState) => state.crypto.selectedNewCrypto
  );

  const handleChangeTextFilter = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = event.target;
    setFilterCryptoo(value);
  };

  const handleCloseForm = () => {
    onClose();
    setFilterCryptoo('');
    setQuantity('');
    setIsQuantity(true);
    dispatch(selectCrypto(null));
  };

  const handleSubmitNewPortfolioItem = () => {
    const formattedQuantity = parseFloat(quantity.replace(",", "."))
    if (isNaN(formattedQuantity) || formattedQuantity <= 0) {
      setIsQuantity(false)
    }

    else 
    if (selectedCrypto !== null) {
      setItemPortfolioLocalStorage({
        symbol: selectedCrypto.symbol,
        quantity: formattedQuantity,
      });
      setItemPortfolio({
        symbol: selectedCrypto.symbol,
        quantity: formattedQuantity,
      });
      dispatch(
        updateCrypto({
          symbol: selectedCrypto.symbol,
          price: selectedCrypto.price,
          change24h: selectedCrypto.change24h,
          quantity: formattedQuantity,
          portfolio: true
        })
      );
      handleCloseForm();
    }
  };

  const handleChangeQuantity = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setQuantity(value);
    setIsQuantity(true);
  };

  return (
    <Modal onClose={handleCloseForm} isOpen={isOpen}>
      <div className={styles.form}>
        <input
          type="text"
          name="filter-crypto"
          className={styles.form__input}
          placeholder="Поиск валюты"
          value={textFilterCrypto}
          onChange={handleChangeTextFilter}
        />
        <div className={styles.form__cryptolist}>
          <CryptoList
            type="form"
            compact={true}
            textFilter={textFilterCrypto}
          />
        </div>
        {selectedCrypto !== null ? (
        <>
          <span className={styles.form__selected_crypto}>
            {formatSymbol(selectedCrypto.symbol)} ${formatPrice(selectedCrypto.price)}
          </span>
          <input
            type="number"
            name="quantity-crypto"
            className={styles.form__input}
            placeholder="Количество"
            value={quantity}
            onChange={handleChangeQuantity}
          />          
          { (!isQuantity) ? <span className={styles.error}>введите значение больше 0</span> : null}
          <div className={styles.container__button}>
            <button aria-label='Добавить криптоактив' className={styles.button} onClick={handleSubmitNewPortfolioItem}>
              добавить
            </button>
            <button aria-label='Выход' className={styles.button} onClick={handleCloseForm}>
              отмена
            </button>
          </div>
        </>
      ) : null}
      </div>
    </Modal>
  );
};
