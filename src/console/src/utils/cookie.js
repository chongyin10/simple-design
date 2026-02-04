import cookie from 'react-cookies';

export const token = cookie.load("token");
export const region = cookie.load('region');

export const teamId = cookie.load('teamId');
export const userId = cookie.load('userId');
export const getTeamId = () => cookie.load('teamId');

export const hpoptPort = cookie.load('hpoptPort');

export const visualApiPath = `/${region}/api/v2/idp-note-rs`;
export const businessApiPath = `/0/api/v1/model-api`;
export const fileApiPath = `/0/api/v1`;

export const saveHistoryOpenProject = (historyOpenProject) => {
  if (process.env.NODE == 'pro') {
    const hostname = window.location.hostname;
    const vakhostname = window.location.hostname;
    const vak = vakhostname.replaceAll('.', '');
    if (/^[0-9]*$/.test(vak)) {
      cookie.save('historyOpenProject', historyOpenProject, { path: '/' });
    } else {
      cookie.save('historyOpenProject', historyOpenProject, { path: '/', domain: hostname });
    }
  } else {
    cookie.save('historyOpenProject', historyOpenProject, { path: '/', domain: 'localhost' });
  }
}

export const removeHistoryOpenProject = () => {
  if (process.env.NODE == 'pro') {
    const hostname = window.location.hostname;
    cookie.remove('historyOpenProject', { path: '/', domain: hostname });
  } else {
    cookie.remove('historyOpenProject', { path: '/', domain: 'localhost' });
  }
}

export const historyOpenProject = cookie.load('historyOpenProject');

export const projectId = new URLSearchParams(window.location.search).get('projectId')
export const getProjectId = () => {
  return new URLSearchParams(window.location.search).get('projectId')
}

if(projectId) cookie.save("projectId", projectId, { path: '/' });


// 游客
export const isTraveler = () => {
  return !cookie.load("teamId") && !cookie.load('userId')
}
