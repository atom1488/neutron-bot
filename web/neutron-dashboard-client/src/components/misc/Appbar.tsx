import styles from '../../utils/styles/appbar.module.scss';
import { RiMenu3Line } from 'react-icons/ri';
import { useRouter } from 'next/router';
import { FullGuild } from '../../utils/types';
import { FC } from 'react';

type Props = {
  guild?: FullGuild;
};

export const Appbar: FC<Props> = ({ guild }) => {
  const router = useRouter();

  return (
    <div className={styles.appbar}>
      <div className={styles.menu} onClick={() => router.push(`/menu`)}>
        <RiMenu3Line size={65} />
        <p>Menu</p>
      </div>
      <div>
        <p>{guild?.name}</p>
      </div>
    </div>
  );
};
