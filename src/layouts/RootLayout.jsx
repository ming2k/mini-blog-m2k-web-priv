import { Outlet } from 'react-router-dom';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import styles from './RootLayout.module.css';

export default function RootLayout() {
  return (
    <div className={styles.layout}>
      <Navigation />
      <main className={styles.main}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
} 