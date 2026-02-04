import React, { useEffect, useMemo, useState } from "react"
import cookie from "react-cookies"
import Header from "../components/header"
import Content from "../components/content"
import "./App.less"
import { logout } from "../utils"
import { useDispatch, useSelector } from "react-redux"
import { BrowserRouter } from "react-router-dom"
import { teamId, userId } from "../utils/cookie"
import { notification, Result } from 'antd'
import { useAvatarUrl } from "../utils/hook/useAvatarUrl"
import GlobalCls from '../components/header/mobx/globalCls';
import Marquee from '../components/Marquee'

import {
  changeTeamIdAndTeamList,
  saveUserBaseInfo,
  selectCurrentRoleIdList,
} from "../store/modules/userSlice"
import teamApi from "../serviceApi/teamApi"
import userInfoApi from "../serviceApi/userInfoApi"
import comApi from '../serviceApi/commonApi'
import { useUpdate } from "ahooks"
import { NotificationOutlined } from "@ant-design/icons"
import permissionApi from "../serviceApi/permissionApi"
import { removeHistoryOpenProject } from '../utils/cookie';
import intl from 'react-intl-universal';

export const AppContext = React.createContext()

const locales = {
  "enUS": require('../locales/en-US.json'),
  "zhCN": require('../locales/zh-CN.json')
}

function App(props) {

  // 防止js没加载之前白屏
  // window.document.getElementById('loading-team-gif').style.display = 'none';

  useEffect(() => {
    const loadDom = document.querySelector('#loading-team-gif');
    console.log(loadDom, 'loadDom')
    if (loadDom) {
        loadDom.style.display = 'none';
    }
  }, []);
  const dispatch = useDispatch()
  const update = useUpdate()
  const currentRoleIdList = useSelector(selectCurrentRoleIdList)
  const { avatarUrl, getAvatar, updateAvatarUrl } = useAvatarUrl()
  const AppContextValue = useMemo(() => {
    return { avatarUrl, updateAvatarUrl }
  }, [avatarUrl, updateAvatarUrl])

  // 判断是否有团队 LOADING EXIST NONE
  const [teamListStatus, setTeamListStatus] = useState('LOADING')

  // 国际化
  const [initDone, setInitDone] = useState(false)
  const setDefaultLang = () => {
    let lang = cookie.load("locale") || navigator.language || navigator.browserLanguage
    if (undefined === lang || "" === lang) {
      lang = "zhCN"
    } else {
      if (lang.indexOf('zh') !== -1) {
        lang = 'zhCN'
      } else {
        lang = 'enUS'
      }
    }
    lang = "zhCN"
    cookie.save("locale", lang, { path: '/' })
    return lang
  }

  

  const getPermissionList = () => {
    permissionApi.permissionList().then((res) => {
      const data = res.data
      window.localStorage.setItem('permission_list', JSON.stringify(data))
      update()
    })
  }

  useEffect(() => {
    if (!(teamId && userId)) {
      // logout()
      return
    }
    checkAuth((res) => {
      const str = Object.prototype.toString.call(res);
      if (str == '[object Function]') {
        res();
      } else {
        if (process.env.NODE == 'pro' && process.env.REACT_APP_VERSION === 'SAAS') {
          getUserArea();
        } else {
          getPermissionList()
        }
      }
    })
  }, [])

  const checkAuth = async (callback) => {
    const result = await comApi.checkAuth();
    if ( result.code == 200) {
      callback(true);
    }
  }

  const getUserArea = async () => {
    if (process.env.NODE == 'dev') return;
    const result = await comApi.getUserArea();
    if (result.code == 200) {
      const host = window.location.host;
      if (result.data && result.data !== host) {
        removeHistoryOpenProject();
        setTimeout(() => {
          window.location.href = `//${result.data}/console`;
        });
      } else {
        getPermissionList()
      }
    }
  }

  useEffect(() => {
    if (!currentRoleIdList.length) {
      Promise.all([teamApi.getTeamList(), userInfoApi.getUserInfo()])
        .then((results) => {
          const { records } = results[0].data
          const teamListInfoWithRole = records.map((item) => {
            return {
              ...item,
              roleIdList: item.roleId,
            }
          })
          if(records.length)setTeamListStatus('EXIST');
          else setTeamListStatus('NONE');
          const { teamId, teamName, phone, email, id, username, roleId } = results[1].data
          console.log(results,'results')
          GlobalCls.setUserInfo(results[1].data);
          dispatch(
            changeTeamIdAndTeamList({ teamId, teamListInfoWithRole, teamName })
          )
          dispatch(saveUserBaseInfo({...results[1].data}))
          update()
        })
        .catch(() => {
          setTimeout(() => {
            // logout()
          }, 1000)
        })
    }
  }, [])

  const versionUpdateNotification = () => {
    notification.open({
      message: <div style={{ color: 'red' }}><NotificationOutlined /><span style={{ paddingLeft: 10 }}>通知</span></div>,
      description: '为了不断提高产品与服务品质，我们将于5月13日（本周五）19:00-21:00停机改版升级，本次升级会重置您测试账号中的数据，请您提前备份文件管理器中的数据。感谢您一如既往的支持。',
      className: 'custom-class',
      duration: null,
      placement: 'bottomRight',
      style: {
        width: 600,
      },
      onClose: () => {
        cookie.save('majorVersionUpdate', true)
      }
    })
  }

  // 通知
  useEffect(() => {
    const majorVersionUpdate = cookie.load('majorVersionUpdate')
    if (!majorVersionUpdate) {
      // 更新版本时的通知
      // versionUpdateNotification()
    }
  }, [])

  useEffect(() => {
    loadLocales()
    getAvatar()
  }, [])

  function loadLocales() {
    // init method will load CLDR locale data according to currentLocale
    // react-intl-universal is singleton, so you should init it only once in your app
    const lang = setDefaultLang()
    intl.init({
      currentLocale: lang,
      locales,
    })
      .then(() => {
        // After loading CLDR locale data, start to render
        setInitDone(true)
      });
  }

  return currentRoleIdList.length && initDone ? (
    <BrowserRouter
      basename={window.__POWERED_BY_QIANKUN__ ? '/console' : (process.env.NODE === 'dev' ? '/' : '/child/idpStudio-console/')}>
      <React.Fragment>
        <AppContext.Provider value={AppContextValue}>
          <Marquee />
          <Header doc={'console'} page={'console'}/>
          <Content />
        </AppContext.Provider>
      </React.Fragment>
    </BrowserRouter>
  ) : (<>
    {teamListStatus!=="LOADING"? <Result
      status="warning"
      title={intl.get('NO_ASSOCIATED_TEAM_FOUND')}
    /> : null}
  </>)
}

export default App
