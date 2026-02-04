import cookie from "react-cookies"
// import { analysisUrl } from '../../../studio/config/auth';

const cookieKeys = ['userId', 'teamId', 'token', 'id_token', 'mode', 'region',
  'majorVersionUpdate', 'historyOpenProject', 'code', 'scope', 'state', 'pluginTime', 'projectId'];
const storageKeys = ['historyOpenFile', 'avatar', 'permission_list', 'rootKey'];

export function logout() {
  const host = window.location.host;
  const hostname = window.location.hostname;
  const domain = host === 'localhost:3000' ? 'test.baihai.co' : host;
  const hostArr = hostname.split('.');
  const primayDomain = host === 'localhost:3000' ? 'baihai.co' : hostArr.slice(hostArr.length - 2).join('.');

  for (const key of cookieKeys) {
    cookie.remove(key, { path: "/", domain: primayDomain });
    cookie.remove(key, { path: "/", domain: domain });
    cookie.remove(key, { path: "/", domain: 'localhost' });
    cookie.remove(key, { path: "/", domain: hostname });
  }

  for (const key of storageKeys) {
    window.localStorage.removeItem(key);
  }

  // window.location.href = '/';
  // 跳转认证open
  // analysisUrl();

  window.location.href = '/0/api/v1/user/logout';
}
