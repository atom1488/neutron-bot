import { ReactElement, useContext } from 'react';
import { Sidebar } from '../misc/Sidebar';
import styles from '../../utils/styles/layout.module.scss';
import { Appbar } from '../misc/Appbar';
import { GuildContext } from '../../utils/contexts/GuildContext';

export function DashboardLayout({ children }: { children: ReactElement }) {
  const { guild } = useContext(GuildContext);
  return (
    <>
      <Sidebar guild={guild} />
      <div className={styles.layout}>
        <Appbar guild={guild} />
        <>{children}</>
      </div>
    </>
  );
}
