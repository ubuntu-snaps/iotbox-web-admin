import { AuthProviderProps } from "react-oidc-context";

export const authority = `${location.protocol}//${location.host}/uaa`;

const { VITE_OIDC_CLIENT_ID, VITE_OIDC_SECRET } = import.meta.env;

export const oidcConfig: AuthProviderProps = {
  authority,
  metadata: {
    authorization_endpoint: `${authority}/oauth2/authorize`,
    token_endpoint: `${authority}/oauth2/token`,
    userinfo_endpoint: `${authority}/userinfo`,
    end_session_endpoint: `${authority}/connect/logout`,
  },
  client_id: VITE_OIDC_CLIENT_ID,
  client_secret: VITE_OIDC_SECRET,
  redirect_uri: `${location.protocol}//${location.host}${location.pathname}`,
  post_logout_redirect_uri: `${location.protocol}//${location.host}${location.pathname}`,
  loadUserInfo: true,
  onSigninCallback() {
    window.history.replaceState({}, document.title, window.location.pathname);
  },
};
