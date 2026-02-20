import { Link } from 'react-router-dom';
import styles from './Header.module.scss';

export const Header = () => {
    return (
        <header className={styles.header}>
            <Link to="/" className={styles.logo}>
                <img src="/icon.svg" alt="Логотип компании"/>
            </Link>
            <button 
                className={styles.button} 
                aria-label="Открыть форму контактов"
            >
                <span className={styles.text}>Связаться с нами</span>
            </button>
        </header>
    );
};