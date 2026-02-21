import { Container } from '@/shared/ui/Container/Container';
import styles from './Footer.module.scss';

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <Container>
        <div className={styles.content}>
          <div className={styles.logo}>
            <img src="/icons/LogoWhite.svg" alt="Логотип компании" />
          </div>
          <h3>
            <a href="https://500na700.ru/" target="_blank">
              Креативное агентство 500na700
            </a>
          </h3>
          <div className={styles.logo}></div>
        </div>
      </Container>
    </footer>
  );
};
