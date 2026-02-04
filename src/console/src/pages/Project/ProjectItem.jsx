import React, { useContext } from "react"
import dayjs from "dayjs"
import { EllipsisOutlined } from "@ant-design/icons"
import "./ProjectItem.less"
import account from "../../assets/image/account.svg"
import { Divider, Dropdown, Menu, message,  Tooltip} from "antd"
import {checkResource, ProjectContext} from "./index"
import { locationToProjectPage } from "../../utils/other"
import intl from "react-intl-universal"
import projectApi from "../../serviceApi/projectApi";
import { getProjectInfo } from '../../store/modules/globalSlice';
import { useSelector } from "react-redux";

function ProjectItem(props) {

  const { projectItem } = props;
  const { deleteProject, renameProjectName } = useContext(ProjectContext);
  const proInfo = useSelector(getProjectInfo);


  const gotoProjectHome = () => {
    checkResource(() => {
      // 获取当前环境列表
      projectApi.getProjectInfo(projectItem.id)
        .then(res => {
          locationToProjectPage(`?projectId=${projectItem.id}`)
        })
        .catch(err => {
          console.log(err)
        })
    })
  }
  const actionItem = (
    <Menu>
      <Menu.Item
        key="1"
        onClick={({ domEvent }) => {
          domEvent.stopPropagation()
          renameProjectName(projectItem)
        }}
      >
        <span style={{ color: "#3793EF" }}>{intl.get("RENAME")}</span>
      </Menu.Item>
      <Divider />
      <Menu.Item
        key="2"
        onClick={({ domEvent }) => {
          if ( proInfo.length === 1) {
            console.log(proInfo)
            if(proInfo.total === 1){
              message.info('无法删除，项目列表中至少要存在一个项目')
              return;
            }
          }
          domEvent.stopPropagation()
          deleteProject(projectItem)
        }}
      >
        <span style={{ color: "#EB4B60" }}>{intl.get("DELETE")}</span>
      </Menu.Item>
      {/* <Divider /> */}
    </Menu>
  )

  return (
    <div className={"project-item"} onClick={gotoProjectHome}>
      <div className={"project-name"}>
        
        <Tooltip title={projectItem.name}>
          <span>{projectItem.name}</span>
        </Tooltip>
      </div>
      <div className={"project-owner-name "}>
        <img src={account} alt="" />
        {projectItem.username}
      </div>
      <div className="project-update-time">
        {projectItem.update_time
          ? dayjs(new Date(projectItem.update_time)).format(
              "YYYY-MM-DD HH:mm:ss"
            )
          : null}
      </div>
      <div className={"project-actions"} onClick={(event)=>{
        event.stopPropagation()
      }}>
        <Dropdown overlay={actionItem}>
          <EllipsisOutlined/>
        </Dropdown>
      </div>
    </div>
  )
}

export default ProjectItem
