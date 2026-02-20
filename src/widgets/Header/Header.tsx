import { Link } from 'react-router-dom';
import styles from './Header.module.scss';
import { Button } from '@/shared/ui/Button/Button';
import { useState } from 'react';

export const Header = () => {
    const [openModal, setOpenModal] = useState(false);

    return (
        <header className={styles.header}>
            <nav className={styles.nav}>
                <Link to="/" className={styles.logo}>
                    <img src="/icon.svg" alt="Логотип компании"/>
                </Link>
                <Button 
                    ariaLabel="Открыть форму контактов"
                    onClick={setOpenModal}
                >
                    Связаться с нами
                </Button>
            </nav>
        </header>
    );
};