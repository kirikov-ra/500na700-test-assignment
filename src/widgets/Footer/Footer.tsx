import { Container } from '@/shared/ui/Container/Container';
import styles from './Footer.module.scss';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <Container>
        <div className={styles.content}>
          <Link to="/" className={styles.logo}>
            <img src="/icons/LogoWhite.svg" alt="Логотип компании" />
          </Link>

          <h3 className={styles.title}>
            <Link to="/" className={styles.link}>
              Креативное агентство 500na700
            </Link>
          </h3>

          <div className={styles.empty} />
        </div>
      </Container>
    </footer>
  );
};
