import React, { useState } from "react"
import "./index.less"
import { Menu, Modal, Dropdown, Form, Input, message, Divider } from "antd"
import {userId, teamId, } from "../../utils/cookie"
import { DownOutlined, FormOutlined, PlusOutlined } from "@ant-design/icons"
import teamApi from "../../serviceApi/teamApi"
import userInfoApi from "../../serviceApi/userInfoApi"
import { useDispatch, useSelector } from "react-redux"
import PubSub from 'pubsub-js'
import {
  changeTeamIdAndName,
  refreshTeamListInfo,
  selectTeamId,
  selectTeamListInfoWithRole,
  selectTeamName,
} from "../../store/modules/userSlice"
import {useHistory, useLocation} from "react-router"
import {saveGlobalKeywordSearch, saveHistoryOpenFile} from "../../utils/storage"
import intl from "react-intl-universal"
import { removeHistoryOpenProject } from '../../utils/cookie';

function TeamDown(props) {

  const [reviseTeamNameModal, setReviseTeamNameModal] = useState(false)
  const [creatorTeamModal, SetCreatorTeamModal] = useState(false)
  const [reviseTeamForm] = Form.useForm()
  const [creatorTeamForm] = Form.useForm()
  const [inputHint, setInputHint] = useState("")
  const [inputHint2, setInputHint2] = useState("")

  const teamList = useSelector(selectTeamListInfoWithRole)
  const teamName = useSelector(selectTeamName)
  const currentTeamId = useSelector(selectTeamId)
  const dispatch = useDispatch()
  const history = useHistory()
  const location = useLocation()


  const getTeamList = () => {
    teamApi.getTeamList().then((res) => {
      const { records } = res.data
      const roleListWithTeam = records.map((item) => {
        return {
          ...item,
          roleIdList: item.roleId,
        }
      })
      dispatch(refreshTeamListInfo(roleListWithTeam))
    })
  }
  const getCurrentTeamName = () => {
    userInfoApi.getUserInfo().then((res) => {
      const { teamName, teamId } = res.data
      dispatch(changeTeamIdAndName({ teamName, teamId }))
    })
  }
  const creatorNewTeam = () => {
    creatorTeamForm.validateFields().then((value) => {
      console.log(value)
      const { username } = value
      teamApi.newCreatorTeam({userId, teamName: username}).then((res) => {
        getTeamList()
        SetCreatorTeamModal(false)
        creatorTeamForm.resetFields()
        message.success(`${intl.get("CREATE_TEAM_SUCCESS")}！`)
      })
    })
  }
  const changeTeamName = () => {
    reviseTeamForm.validateFields().then((value) => {
      teamApi.renameTeam({
        teamName: value["username"],
      }).then((res) => {
        message.success(`${intl.get("MODIFY_TEAM_NAME_SUCCESSFULLY")}！`)
        getCurrentTeamName()
        getTeamList()
        setReviseTeamNameModal(false)
        reviseTeamForm.setFieldsValue(value["username"])
      })
    })
  }

  const switchTeam = (item,) => {
    if (item.teamId === currentTeamId) {
      return false
    }
    const data = {
      teamId: item.teamId,
      userId,
    }
    console.log(data.teamId)
    // return 
    teamApi.switchTeam(data)
      .then(res => {
        console.log(res)
        // getTeamList()
        PubSub.publish("refresh")
        message.success(`${intl.get("SWITCH_TEAM_SUCCESSFULLY")}！`)
        getCurrentTeamName()
        saveHistoryOpenFile()
        saveGlobalKeywordSearch()
        removeHistoryOpenProject();

        const pathname = location.pathname
        if (pathname !=="/overview"){
          history.replace('/overview')
          window.location.reload()
        }else{
          window.location.reload()
        }
      })
  }
  const projectOverlay = (
    <React.Fragment key="1">
      <Menu
        theme="dark"
        mode="vertical"
        className={`main-menu`}
        selectable={false}
        style={{ background: "#2C2F33" }}
      >
        <Menu.Item
          key={"编辑团队名称"}
          icon={<FormOutlined />}
          onClick={() => {
            setReviseTeamNameModal(true)
          }}
        >
          {intl.get("EDIT_TEAM_NAME")}
        </Menu.Item>
        <Divider/>
        <Menu.Item disabled key="切换至其他团队" className="downMenu">
          <span style={{ fontSize: 12 }}>{intl.get("SWITCH_TO_ANOTHER_TEAM")}</span>
        </Menu.Item>
        {teamList.map((item) => (
          <Menu.Item
            style={{
              lineHeight: "40px",
              textIndent: "15px",
            }}
            onClick={() => switchTeam(item)}
            key={item.teamId}
          >
            {item.teamName !== null ? item.teamName : ""}
          </Menu.Item>
        ))}
        <Divider/>
        {process.env.REACT_APP_VERSION === 'HOST' ? <Menu.Item
          icon={<PlusOutlined />}
          key="创建团队"
          onClick={() => SetCreatorTeamModal(true)}
        >
          创建团队
        </Menu.Item> : null}
      </Menu>
    </React.Fragment>
  )
  return (
    <>
      <Dropdown
        overlayClassName={`team-dropdown`}
        overlay={projectOverlay}
        arrow
      >
        <div className={"team-dropdown-content-wrapper"}>
          <span className={"title"}>{teamName}</span>
          <DownOutlined style={{ color: "white" }} />
        </div>
      </Dropdown>

      <Modal
        title={intl.get("EDIT_TEAM_NAME")}
        visible={reviseTeamNameModal}
        onOk={changeTeamName}
        onCancel={() => {
          reviseTeamForm.resetFields()
          setReviseTeamNameModal(false)
        }}
        okText={intl.get("OK")}
        cancelText={intl.get("CANCEL")}
      >
        <Form labelCol={{ span: 24 }} form={reviseTeamForm}>
          <Form.Item
            name="username"
            extra={inputHint}
            rules={[
              {
                validator: (_, value) => {
                  const remainingLength = 30 - value?.length;
                  if( 0 <= remainingLength <= 30 && value !== undefined){
                    if(remainingLength===30){
                      setInputHint("")
                      return Promise.reject(intl.get("INPUT_CAN_NOT_BE_EMPTY"))
                    }else if(remainingLength < 0){
                      setInputHint("")
                      return Promise.reject(intl.get("TEAM_NAME_CAN_BE_UP_TO_30_CHARACTERS_LONG"))
                    }else if(remainingLength > 27){
                      setInputHint("")
                      return Promise.reject("请至少输入三个字符")
                    }else{
                      setInputHint(`您还能输入${remainingLength}个字符`)
                      return Promise.resolve()
                    }
                  }else if(value === undefined){
                    return Promise.reject("请编辑团队名称")
                  }
                }
              },
            ]}
          >
            <Input
              placeholder={intl.get("PLEASE_ENTER_THE_REVISED_TEAM_NAME")}
              defaultValue={teamName}
              />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title={intl.get("CREATE_NEW_TEAM")}
        visible={creatorTeamModal}
        onOk={() => creatorNewTeam()}
        onCancel={() => {
          SetCreatorTeamModal(false)
          creatorTeamForm.resetFields()
        }}
        okText={intl.get("OK")}
        cancelText={intl.get("CANCEL")}
      >
        <Form labelCol={{ span: 24 }} form={creatorTeamForm}>
          <Form.Item
            name="username"
            extra={inputHint2}
            rules={[
              {
                validator: (_, value) => {
                  const remainingLength = 30 - value?.length;
                  if( 0 <= remainingLength <= 30 && value !== undefined){
                    if(remainingLength===30){
                      setInputHint2("")
                      return Promise.reject(intl.get("INPUT_CAN_NOT_BE_EMPTY"))
                    }else if(remainingLength < 0){
                      setInputHint2("")
                      return Promise.reject(intl.get("TEAM_NAME_CAN_BE_UP_TO_30_CHARACTERS_LONG"))
                    }else if(remainingLength > 27){
                      setInputHint2("")
                      return Promise.reject("请至少输入三个字符")
                    }else{
                      setInputHint2(`您还能输入${remainingLength}个字符`)
                      return Promise.resolve()
                    }
                  }else if(value === undefined){
                    return Promise.reject("请编辑团队名称")
                  }
                }
              },
            ]}
          >
            <Input placeholder={intl.get("PLEASE_ENTER_A_TEAM_NAME")} onPressEnter={() => creatorNewTeam()} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}
export default TeamDown
