import React, { useState } from "react"
import "./AccountSettings.less"
import { Button } from "antd"
import ChangePasswordModal from "../../../components/models/ChangePasswordModal"
import {useMemoizedFn} from "ahooks"
import {useSelector} from "react-redux"
import {selectUserEmail, selectUserId, selectUserName, selectUserPhone} from "../../../store/modules/userSlice"

function AccountSettings(props) {
  const [passwordVisibleInfo, setPasswordVisibleInfo] = useState({
    visible: false,
    loading: false,
  })

  const phone = useSelector(selectUserPhone)
  const userId = useSelector(selectUserId)
  const email = useSelector(selectUserEmail)

  const passwordModalCancel = useMemoizedFn(()=>{
    setPasswordVisibleInfo({
      visible: false,
      loading: false
    })
  })

  return (
    <div className={"account-settings-container"}>
      <h2 style={{ marginBottom: 30 }} className={"h2-font"}>
        账号设置
      </h2>

      <ul className={"account-settings-list"}>
        <li className={"setting-item"}>
          <div className={"left"}>
            <h3 style={{ fontWeight: "bold" }}>账户密码</h3>
            <div>
              <span className={"info-title"}>当前密码强度:</span>
              {/*
               #53B259  强
               orange   中
               red      弱
              */}
              <span className={"info-content"} style={{color:"#53B259"}}>强</span>
            </div>
          </div>
          <div className={"right"}>
            <Button onClick={()=>{
              setPasswordVisibleInfo({
                visible: true
              })
            }} type={"link"}>修改</Button>
          </div>
        </li>

        <li className={"setting-item"}>
          <div className={"left"}>
            <h3 style={{ fontWeight: "bold" }}>手机号</h3>
            <div>
              <span className={"info-title"}>已绑定手机:</span>
              <span className={"info-content"}>{phone}</span>
            </div>
          </div>

        </li>

        <li className={"setting-item"}>
          <div className={"left"}>
            <h3 style={{ fontWeight: "bold" }}>邮箱</h3>
            <div>
              <span className={"info-title"}>已绑定邮箱:</span>
              <span className={"info-content"}>{email}</span>
            </div>
          </div>
        </li>

        {false? // 未实现的功能暂不使用
          <li className={"setting-item"}>
            <div className={"left"}>
              <h3 style={{ fontWeight: "bold" }}>账号注销</h3>
              <div>
                <span className={"info-title"}>当前ID:</span>
                <span className={"info-content"}>{userId}</span>
              </div>
            </div>
            <div className={"right"}>
              {/*<Button type={"link"}>注销</Button>*/}
            </div>
          </li>:
          null
        }
        
      </ul>

      <ChangePasswordModal
        loading={passwordVisibleInfo.loading}
        visible={passwordVisibleInfo.visible}
        passwordModalCancel={passwordModalCancel}
      />

    </div>
  )
}

export default AccountSettings
