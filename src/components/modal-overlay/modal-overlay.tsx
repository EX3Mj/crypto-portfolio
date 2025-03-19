import styles from "./modal-overlay.module.scss";
import { TModalOverlayProps } from "./type";
import { FC } from "react";
import { CSSTransition } from "react-transition-group";
import { useRef } from "react";

export const ModalOverlay: FC<TModalOverlayProps> = ({ onClose, isOpen }) => {
  const overlayRef = useRef<HTMLDivElement>(null);

  return (
  <>
  <CSSTransition
        in={isOpen}
        nodeRef={overlayRef}
        timeout={300}
        classNames={{
          enter: styles.overlayEnter,
          enterActive: styles.overlayEnterActive,
          exit: styles.overlayExit,
          exitActive: styles.overlayExitActive,
        }}
        unmountOnExit
      >
  <div className={styles.overlay} ref={overlayRef} onClick={onClose} />
  </CSSTransition>
  </>
  )
} 
  
;
