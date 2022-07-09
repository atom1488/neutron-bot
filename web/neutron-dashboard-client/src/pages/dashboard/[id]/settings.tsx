import { GetServerSidePropsContext } from 'next';
import { ReactElement, useContext, useEffect } from 'react';
import { DashboardLayout } from '../../../components/layouts/dashboard';
import { fetchGuild } from '../../../utils/api';
import { GuildContext } from '../../../utils/contexts/GuildContext';
import { FullGuild, NextPageWithLayout } from '../../../utils/types';

type Props = {
  guild: FullGuild;
};

const SettingsPage: NextPageWithLayout<Props> = ({ guild }) => {
  const { setGuild } = useContext(GuildContext);

  useEffect(() => {
    setGuild(guild);
  }, []);
  return <div className="page">Settings Page</div>;
};

SettingsPage.getLayout = function (page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  return fetchGuild(ctx);
}

export default SettingsPage;
