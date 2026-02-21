import { Header } from '@/widgets/Header/Header';
import { Outlet } from 'react-router-dom';

export const MainLayout = () => {
    return (
        <>
            <Header />
            <Outlet />
        </>
    )
};