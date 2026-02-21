import { useParams, Link } from 'react-router-dom';
import styles from './NewsDetailPage.module.scss';
import { getNewsById } from '@/entities/news/api';
import { useEffect, useState } from 'react';
import { NewsItem } from '@/entities/news/types';
import { Container } from '@/shared/ui/Container/Container';

export const NewsDetailPage = () => {
    const { id } = useParams<{ id: string }>();

    const [newItem, setNewItem] = useState<NewsItem | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchNews = async () => {
        try {
            const data = await getNewsById(id!);
            setNewItem(data);
        } catch (err) {
            setError((err as Error).message);
        } finally {
            setLoading(false);
        }
        };
        fetchNews();
    }, [id]);

    if (loading) return <div>Загрузка...</div>;
    if (error) return <div>Ошибка: {error}</div>;
    if (!newItem)  {
        return (
        <>
            <div className={styles.statusError}>{error || 'Новость не найдена'}</div>
            <Link to="/">На главную</Link>
        </>
        );
    }

    return (
        <Container>
            <article className={styles.article}>
                <div className={styles.imageWrapper}>
                    <img 
                        src={newItem.image} 
                        alt={newItem.title} 
                        className={styles.image} 
                    />
                    
                </div>
                <div className={styles.contentWrapper}>
                    <h1 className={styles.title}>{newItem.title}</h1>
                    <div className={styles.date}>{newItem.date}</div>
                    <div className={styles.description}>{newItem.description}</div>
                    <div className={styles.content}>{newItem.content}</div>
                </div>
                
            </article>
        </Container>
    );
};