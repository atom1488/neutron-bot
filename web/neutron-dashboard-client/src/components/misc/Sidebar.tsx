import Image from 'next/image';
import { MdSpaceDashboard } from 'react-icons/md';
import { BsTerminal } from 'react-icons/bs';
import { FaWrench } from 'react-icons/fa';
import { RiLogoutCircleLine } from 'react-icons/ri';
import styles from './index.module.scss';
import { useRouter } from 'next/router';

const routes = [
  {
    name: 'dashboard',
    getPath: (id: string) => `/dashboard/${id}`,
    icon: <MdSpaceDashboard size={48} />,
  },
  {
    name: 'commands',
    getPath: (id: string) => `/dashboard/${id}/commands`,
    icon: <BsTerminal size={48} />,
  },
  {
    name: 'settings',
    getPath: (id: string) => `/dashboard/${id}/settings`,
    icon: <FaWrench size={48} />,
  },
];

export const Sidebar = () => {
  const router = useRouter();
  return (
    <div className={styles.sidebar}>
      <Image
        className={styles.avatar}
        //src={`https://cdn.discordapp.com/icons/${router.query?.id!.toString()}/${router.query?.icon!}}`}
        src={`/botavatar.png`}
        height={80}
        width={80}
        alt="guild_avatar"
      />
      <div className={styles.icons}>
        {routes.map((route) => (
          <div key={route.name} onClick={() => router.push(route.getPath(router.query?.id!.toString()))}>
            {route.icon}
          </div>
        ))}
      </div>
      <div>
        <RiLogoutCircleLine size={48} />
      </div>
    </div>
  );
};
