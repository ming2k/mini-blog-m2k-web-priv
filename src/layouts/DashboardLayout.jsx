import { Outlet } from 'react-router-dom';
import DashboardNavigation from '../components/DashboardNavigation';
import styles from './DashboardLayout.module.css';

export default function DashboardLayout() {
  return (
    <div className={styles.dashboard}>
      <DashboardNavigation />
      <main className={styles.content}>
        <Outlet />
      </main>
    </div>
  );
} 