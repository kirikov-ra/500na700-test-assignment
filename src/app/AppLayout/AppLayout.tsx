import { Header } from '@/widgets/Header/Header';
import styles from './AppLayout.module.scss';
import { Outlet } from 'react-router-dom';

export const AppLayout = () => {
    return (
        <>
            <Header />
            <div className={ styles.container }>
                <Outlet />
            </div>
        </>
    )
};