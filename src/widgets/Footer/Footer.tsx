import { Container } from '@/shared/ui/Container/Container';
import styles from './Footer.module.scss';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <Container>
        <div className={styles['footer__content']}>
          <Link to="/" className={styles['footer__logo']}>
            <img src="/icons/LogoWhite.svg" alt="Логотип компании" />
          </Link>

          <h3 className={styles['footer__title']}>
            <Link to="/" className={styles['footer__link']}>
              Креативное агентство 500na700
            </Link>
          </h3>

          <div className={styles['footer__logo']} />
        </div>
      </Container>
    </footer>
  );
};
