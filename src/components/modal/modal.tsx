import { FC, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import styles from "./modal.module.scss";
import { ModalOverlay } from "../modal-overlay";
import { ReactComponent as CloseIcon } from "../../images/CloseIcon.svg";
import { TModalProps } from "./type";
import { CSSTransition } from "react-transition-group";

const modalRoot = document.getElementById("modals");

export const Modal: FC<TModalProps> = ({ isOpen, onClose, children }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      previousFocusRef.current = document.activeElement as HTMLElement;

      if (modalRef.current) {
        modalRef.current.focus();
      }
    } else {
      if (previousFocusRef.current) {
        previousFocusRef.current.focus();
      }
    }
  }, [isOpen]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      e.key === "Escape" && onClose();
    };

    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, [onClose]);

  return ReactDOM.createPortal(
    <>
      <CSSTransition
        in={isOpen}
        nodeRef={modalRef}
        timeout={300}
        classNames={{
          enter: styles.modalEnter,
          enterActive: styles.modalEnterActive,
          exit: styles.modalExit,
          exitActive: styles.modalExitActive,
        }}
        unmountOnExit
      >
        <div className={styles.modal} ref={modalRef}>
          <button
            aria-label="Закрыть модальное окно"
            className={styles.button}
            type="button"
            data-cy="modal-close"
          >
            <CloseIcon onClick={onClose} />
          </button>
          {children}
        </div>
      </CSSTransition>
      <ModalOverlay onClose={onClose} isOpen={isOpen} />
    </>,
    modalRoot as HTMLDivElement
  );
};


