export interface Repository {
  allow_forking: boolean;
  archive_url: string;
  archived: boolean;
  assignees_url: string;
  watchers_count: number;
  web_commit_signoff_required: boolean;
  id: number;
  name: string;
  full_name: string;
  owner: Owner;
  private: boolean;
  visibility: string;
  watchers: number;
  contributors_url: string;
  description: string;
  git_url: string;
}

interface Owner {
  avatar_url: string;
  events_url: string;
  followers_url: string;
  type: string;
  url: string;
}

export type Contributor = {
  avatar_url: string;
  contributions: number;
  events_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  gravatar_id: string;
  html_url: string;
  id: number;
  login: string;
  node_id: string;
  organizations_url: string;
  received_events_url: string;
  repos_url: string;
  site_admin: boolean;
  starred_url: string;
  subscriptions_url: string;
  type: string;
  url: string;
};

export type ParamList = {
  RepoDetails: {
    item: Repository;
  };
};
