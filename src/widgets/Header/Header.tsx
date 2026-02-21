import { Link } from 'react-router-dom';
import styles from './Header.module.scss';
import { Button } from '@/shared/ui/Button/Button';
import { useState } from 'react';
import { FeedbackForm } from '../FeedbackForm/FeedbackForm';
import { Modal } from '@/shared/ui/Modal/Modal';

export const Header = () => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <header className={styles.header}>
      <nav className={styles['header__nav']}>
        <Link to="/" className={styles['header__logo']}>
          <img src="/icons/icon.svg" alt="Логотип компании" />
        </Link>

        <Button ariaLabel="Открыть форму контактов" onClick={() => setOpenModal(true)}>
          Связаться с нами
        </Button>
      </nav>

      <Modal isOpen={openModal} onClose={() => setOpenModal(false)}>
        <FeedbackForm />
      </Modal>
    </header>
  );
};
