import { getNews } from '@/entities/news/api';
import { NewsItem } from '@/entities/news/types';
import { useEffect, useState } from 'react';
import styles from './NewsPage.module.scss';
import { Link } from 'react-router-dom';
import { Container } from '@/shared/ui/Container/Container';

export const NewsPage = () => {
    const [news, setNews] = useState<NewsItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchNews = async () => {
        try {
            const data = await getNews();
            setNews(data);
        } catch (err) {
            setError((err as Error).message);
        } finally {
            setLoading(false);
        }
        };
        fetchNews();
    }, []);

    if (loading) return <div>Загрузка...</div>;
    if (error) return <div>Ошибка: {error}</div>;
    if (!news.length) return <div>Список новостей пуст.</div>;

    return (
        <Container>
            <div className={styles.container}>
                <h1 className={styles.pageTitle}>Новости</h1>
                <div className={styles.news}>
                    {news.map(item => (
                        <Link 
                            to={`news/${item.id}`}
                            key={item.id} 
                            className={styles.newWrapper}
                        >
                            <div className={styles.imageWrapper}>
                                <img 
                                    src={item.image}
                                    alt={item.title}
                                    className={styles.image}
                                />
                            </div>
                            <h2 className={styles.title}>{item.title}</h2>
                            <p className={styles.description}>{item.description}</p>
                            <div className={styles.date}>{item.date}</div>
                        </Link>
                    ))}
                </div>
            </div>
        </Container>
    );
};