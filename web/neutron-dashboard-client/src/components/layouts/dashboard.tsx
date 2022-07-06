import { ReactElement } from 'react';
import { Sidebar } from '../misc/Sidebar';
import styles from '../misc/index.module.scss';
import { Appbar } from '../misc/Appbar';

export function DashboardLayout({ children }: { children: ReactElement }) {
  return (
    <>
      <Sidebar />
      <div className={styles.layout}>
        <Appbar />
        <>{children}</>
      </div>
    </>
  );
}
