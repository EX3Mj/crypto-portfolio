import React from "react";
import styles from "./delete-portfolio-item-form.module.scss";
import { TDeletePortfolioItemForm } from "./type";
import { Modal } from "../modal";

export const DeletePortfolioItemForm: React.FC<TDeletePortfolioItemForm> = ({
  onClose,
  isOpen,
  onConfirm,
}) => {

  const handleConfirm = () => {
    onConfirm();
    onClose();
  }

  return (
    <Modal onClose={onClose} isOpen={isOpen}>
      <div className={styles.form}>
        <p className={styles.form__text}>Удалить этот криптоактив?</p>
        <div className={styles.container__button}>
          <button
            aria-label="Удалить криптоактив"
            className={styles.button}
            onClick={() => handleConfirm()}
          >
            да
          </button>
          <button
            aria-label="Выход"
            className={styles.button}
            onClick={onClose}
          >
            нет
          </button>
        </div>
      </div>
    </Modal>
  );
};
