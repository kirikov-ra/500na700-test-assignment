import { Route, Routes } from 'react-router-dom';
import { AppLayout } from './AppLayout/AppLayout';
import { NewsPage } from '@/pages/NewsPage/NewsPage';

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<NewsPage />} />
      </Route>
    </Routes>
  )
};