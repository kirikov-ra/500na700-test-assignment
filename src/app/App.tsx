import { Route, Routes } from 'react-router-dom';
import { MainLayout } from './MainLayout/MainLayout';
import { NewsPage } from '@/pages/NewsPage/NewsPage';
import { NewsDetailPage } from '@/pages/NewsDetailPage/NewsDetailPage';
import { NewsLayout } from './NewsLayout/NewsLayout';

export const App = () => {
    return (
        <Routes>
            <Route element={<NewsLayout />}>
                <Route path="/news/:id" element={<NewsDetailPage />} />
            </Route>

            <Route element={<MainLayout />}>
                    <Route index element={<NewsPage />} />
            </Route>
        </Routes>
    )
};