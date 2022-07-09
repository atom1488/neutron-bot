import { NextPage } from 'next';
import { AppProps } from 'next/app';
import { ReactElement, ReactNode } from 'react';

export type Guild = {
  id: string;
  name: string;
  icon: string;
  owner: boolean;
  permissions: string;
  features: string[];
};

export type FullGuild = {
  id: string;
  name: string;
  icon: string;
  description: string;
  splash: string;
  discovery_splash: string;
  features: string[];
  emojis: {
    name: string;
    roles: string[];
    id: string;
    require_colons: boolean;
    managed: boolean;
    animated: boolean;
    available: boolean;
  }[];
  stickers: {
    id: string;
    name: string;
    tags: string | string[];
    type: number;
    format_type: number;
    description: string;
    asset: string;
    available: boolean;
    guild_id: string;
  }[];
  banner: string;
  owner_id: string;
  application_id: string;
  region: string;
  afk_channel_id: string;
  afk_timeout: number;
  system_channel_id: string;
  widget_enabled: boolean;
  widget_channel_id: string;
  verification_level: number;
  roles: {
    id: string;
    name: string;
    permissions: string;
    position: number;
    color: number;
    hoist: boolean;
    managed: boolean;
    mentionable: boolean;
    icon: string;
    unicode_emoji: string;
    flags: number;
    tags: { bot_id: string };
  }[];
  default_message_notifications: number;
  mfa_level: number;
  explicit_content_filter: number;
  max_presences: number;
  max_members: number;
  max_video_channel_users: number;
  vanity_url_code: string;
  premium_tier: number;
  premium_subscription_count: number;
  system_channel_flags: number;
  preferred_locale: string;
  rules_channel_id: string;
  public_updates_channel_id: string;
  hub_type: number;
  premium_progress_bar_enabled: boolean;
  nsfw: boolean;
  nsfw_level: number;
};

export type NextPageWithLayout<T> = NextPage<T> & { getLayout?: (page: ReactElement) => ReactNode };

export type AppPropsWithLayout<T> = AppProps & {
  Component: NextPageWithLayout<T>;
};
