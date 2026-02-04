import React, { Fragment, useContext, useEffect, useState } from "react"
import { Menu, Popover, Drawer, Row, Col, Layout, message, Modal, Button } from "antd"
import "./index.less"
import Icons from '../Icons'
import Feedback from '../feedback/Feedback'
import Notification from '../notification/Notification'
import { logout } from "../../utils"
import { useHistory } from "react-router"
import TeamDown from "./TeamDown"
import { AppContext } from "../../pages/App"
import { BellOutlined } from '@ant-design/icons'
import auditApi from "../../serviceApi/auditApi"
import { teamId } from '../../utils/cookie'
import { useReactive } from 'ahooks'
import { useSelector } from "react-redux"
import { selectUser } from "../../store/modules/userSlice"
import UserCenter from './User';

import intl from 'react-intl-universal';
import { useAvatarUrl } from "../../utils/hook/useAvatarUrl"
import { gerModulePermissionList, hasOperationFromModule } from "../../utils/storage"
import App from "./App"
import Theme from "../../Theme"

function Header(props) {
  const {
    avatarUrl,
  } = useContext(AppContext)
  const history = useHistory()
  const [feedbackView, setFeedbackView] = useState(false)
  const [notificationView, setNotificationView] = useState(false)
  const [isThreeAnyUnread, setIsThreeAnyUnread] = useState(false)
  const [roleId, setRoleID] = useState([])
  let baseInfo = useReactive({
    email: "",
    phone: "",
  })
  const [modalVisible, setModalVisible] = useState(false)

  const user = useSelector(selectUser)
  const [userInfo, setUserInfo] = useState();

  useEffect(() => {
    grade()
  }, [])
  useEffect(() => {
    if (roleId?.[0] !== 5 && roleId.length) {
      isThereAnyUnread()
    }
  }, [roleId])
  // 判断消息是否全部已读
  const isThereAnyUnread = () => {
    // auditApi.isThreeAnyUnread({})
    //   .then(res => {
    //     setIsThreeAnyUnread(res.data)
    //   })
    auditApi.isUnRead({})
      .then(res => {
        setIsThreeAnyUnread(res.data)
      })
  }

  const grade = () => {
    if (!user) return;
    baseInfo.email = user.email
    baseInfo.phone = user.phone
    setRoleID(user.roleId)
    localStorage.setItem('userInfo', JSON.stringify(user));
    setUserInfo(user)
  }

  function feedbackShow() {
    setFeedbackView(true)
  }
  function closeHandle() {
    setFeedbackView(false)
  }
  function cancelHandle() {
    setFeedbackView(false)
  }

  return (
    <Fragment>

      <Theme>
        <Layout.Header className={`idpheader header-theme`} >
          <Row wrap={false}>
            <Col className={'header-left header-theme-left'} span={12}>
              <div style={{ display: 'flex' }}>
                <div
                  onClick={() => {
                    if (process.env.REACT_APP_VERSION === 'MODEL') {
                      window.location.href = '/sharePlatform';
                    } else {
                      window.location.href = '/';
                    }
                  }}
                >
                  <img className="logo" src={window.globalConfig?.logo?.logo35} />
                </div>
                {/* <TeamDown /> */}
                <App />
              </div>
            </Col>
            <Col className={'header-right header-theme-right'} span={12} style={{ whiteSpace: "nowrap", display: "flex", justifyContent: 'flex-end' }}>
              {
                hasOperationFromModule('header', 'header_notification') &&
                (
                  <div style={{ display: 'flex', cursor: "pointer", alignItems: 'center' }}>
                    {roleId?.[0] === 5 ? null :
                      (<div
                        className={`messageBell`}
                        onClick={() => setNotificationView(true)}
                      >
                        {isThreeAnyUnread ? (<span className="is-three"></span>) : null}
                        {/* <span className="is-three"></span> */}
                        <BellOutlined />
                      </div>)
                    }
                    {
                      hasOperationFromModule('header', 'header_feedback') &&
                      hasOperationFromModule('header', 'header_contact_support') &&
                      (
                        <>
                          {roleId?.[0] === 5 ? null :
                            (<div style={{ display: "inline-block", marginLeft: "10px", marginRight: "10px", fontSize: "20px", position: 'relative', top: '-1px' }} >
                              |
                            </div>)
                          }
                        </>
                      )
                    }
                  </div>
                )
              }
              {
                hasOperationFromModule('header', 'header_feedback') &&
                (
                  <div style={{ display: 'flex', cursor: "pointer", alignItems: 'center' }}>
                    <div style={{ display: 'flex', padding: '0px 5px' }} onClick={feedbackShow}>
                      <div style={{ marginRight: '5px' }}>
                        <img style={{ width: '16px', height: '16px' }} src={require('../../assets/image/feedback.png').default}></img>
                      </div>
                      <span>{intl.get("SUB_MENU_FEEDBACK")}</span>
                    </div>
                    {
                      hasOperationFromModule('header', 'header_contact_support') &&
                      (
                        <div style={{ display: "inline-block", marginLeft: "10px", marginRight: "10px", fontSize: "20px", position: 'relative', top: '-1px' }} >
                          |
                        </div>
                      )
                    }
                  </div>
                )
              }
              {
                hasOperationFromModule('header', 'header_contact_support') &&
                <div style={{ display: 'flex', cursor: "pointer", alignItems: 'center', }}>
                  <Popover
                    placement="bottomRight"
                    content={<img src={window.globalConfig?.CS?.QRCode} alt="" />}
                    trigger="hover"
                  >
                    <div style={{ display: 'flex', padding: '0px 5px' }}>
                      <div style={{ marginRight: '5px' }}>
                        <img style={{ height: '16px', width: '16px' }} src={require('../../assets/image/download.png').default}></img>
                      </div>
                      <span>{intl.get("CUSTOMER_SERVICE")}</span>
                    </div>
                  </Popover>
                </div>
              }

              <div style={{ display: 'flex', cursor: "pointer", alignItems: 'center' }}>
                <UserCenter data={userInfo} />
              </div>

            </Col>
          </Row>
        </Layout.Header>
      </Theme>
      
      <Feedback
        visible={feedbackView}
        onOk={closeHandle}
        onCancel={cancelHandle}
      />
      <Notification
        notificationView={notificationView}
        onOk={() => setNotificationView(true)}
        onCancel={() => setNotificationView(false)}
        isThereAnyUnread={() => isThereAnyUnread()}
      />

      <Modal
        title="个人信息"
        visible={modalVisible}
        onCancel={() => { setModalVisible(false) }}
        footer={<Button type="primary" onClick={() => { setModalVisible(false) }} >关闭</Button>}
      >
        <Row><Col span={4}>用户昵称:</Col>{userInfo?.username || ''}</Row>
        <Row><Col span={4}>团队ID:</Col>{teamId}</Row>
        {baseInfo.email ? <Row><Col span={4}>邮箱:</Col>{baseInfo.email}</Row> : null}
        {baseInfo.phone ? <Row><Col span={4}>手机号:</Col>{baseInfo.phone}</Row> : null}
      </Modal>

    </Fragment>
  )
}

export default Header
