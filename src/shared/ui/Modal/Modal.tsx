import { ReactNode, useEffect } from 'react';
import ReactDOM from 'react-dom';
import styles from './Modal.module.scss';

interface ModalProps {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

export const Modal = ({ children, isOpen, onClose }: ModalProps) => {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  const modalRoot = document.getElementById('modal-root');
  if (!modalRoot || !isOpen) return null;

  return ReactDOM.createPortal(
    <div
      className={styles.overlay}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Модальное окно"
    >
      <div className={styles.wrapper}>
        <div className={styles.content} onClick={(e) => e.stopPropagation()}>
          {children}
          <button
            className={styles['close-button']}
            onClick={onClose}
            type="button"
            aria-label="Закрыть"
          >
            <img
              src="/icons/close.svg"
              alt="Иконка крестик"
              aria-label="Закрыть форму связи"
            />
          </button>
        </div>
      </div>
    </div>,
    modalRoot,
  );
};
