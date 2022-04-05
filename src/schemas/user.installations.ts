export interface UserInstallationsResponseData {
  total_count: number;
  installations: UserInstallations[];
}

export interface UserInstallations {
  id: number;
  account: {
    login: string;
    id: number;
    node_id: string;
    avatar_url: string;
    gravatar_id: string;
    url: string;
    html_url: string;
    followers_url: string;
    following_url: string;
    gists_url: string;
    starred_url: string;
    subscriptions_url: string;
    organizations_url: string;
    repos_url: string;
    events_url: string;
    received_events_url: string;
    type: string;
    site_admin: false;
  };
  access_tokens_url: string;
  repositories_url: string;
  html_url: string;
  app_id: number;
  target_id: number;
  target_type: string;
  permissions: {
    checks: string;
    metadata: string;
    contents: string;
  };
  events: string[];
  single_file_name: string;
  has_multiple_single_files: true;
  single_file_paths: string[];
  repository_selection: string;
  created_at: string;
  updated_at: string;
  app_slug: string;
  suspended_at: null;
  suspended_by: null;
}
