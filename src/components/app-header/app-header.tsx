import React, { useState, memo } from "react";
import styles from "./app-header.module.scss";
import { AddPortfolioItemForm } from "../addAssetForm/add-portfolio-item-form";

export const AppHeader: React.FC = memo(() => {
  const [isAddAssetFormOpen, setIsAddAssetFormState] = useState<boolean>(false);

  const handleCloseForm = () => {
    setIsAddAssetFormState(false);
  };

  return (
    <>
      <header className={styles.header}>
        <h1>PORTFOLIO OVERVIEW</h1>
        <button
          aria-label="Добавить криптоактив"
          className={styles.button}
          onClick={() => setIsAddAssetFormState(true)}
        >
          добавить
        </button>
      </header>
      <AddPortfolioItemForm onClose={handleCloseForm} isOpen={isAddAssetFormOpen} />
    </>
  );
});
