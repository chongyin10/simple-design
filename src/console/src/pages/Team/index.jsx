import React from "react"
import './team.less'
import { Menu } from 'antd'
import AllMembers from './AllMembers';
import ToBeAdded from "./ToBeAdded";
import Group from "./Group";
import intl from "react-intl-universal"
import Guide from "byte-guide"
import projectApi from "../../serviceApi/projectApi"

let steps = []



function Team(props) {
/*  if(!window.localStorage.getItem('hasGuide')){
    steps = [
      {
        selector: '#tour-member-add',
        content: '邀请同伴加入您的团队，一起协作完成项目吧',
        placement:"left",
      }
    ]
  }else{
    steps = []
  }*/


  const [rightInfo, setRightInfo] = React.useState('0')
  const handlerMenuClick = (item) => {
    setRightInfo(item.key)
  }
  return (
    <div className="team">
      <div className="team-member">
        <div className="manage-title">

          <span>{intl.get("MEMBER_MANAGEMENT")}</span>
          {/*<PlusOutlined />*/}
        </div>
        <Menu
          mode="inline"
          onClick={handlerMenuClick}
          // selectedKeys={[currentKey]}
          theme={"light"}
        >
          <Menu.Item key="1">
            {intl.get("MEMBER_TO_BE_ADDED")}
          </Menu.Item>
          <Menu.Item key="2">
            {intl.get("ALL_MEMBERS")}
          </Menu.Item>
          {/* <Menu.Item key="3">
            群组A
          </Menu.Item> */}
      </Menu>
      </div>
      <div className="team-exhibit">
        {(rightInfo === '0' || rightInfo === '2')? (
          <AllMembers/>
        ): rightInfo === '1'? (
          <ToBeAdded/>
        ): (
          <Group/>
        )}
      </div>

     {/* <Guide
        className='my-guide'
        steps={steps}
        onClose={()=>{
          window.localStorage.setItem("hasGuide","true")
        }}
        afterStepChange={(nextIndex, nextStep)=> {
          if(!nextStep){
            window.localStorage.setItem("hasGuide","true")
          }
        }}
        beforeStepChange={(stepIndex, step)=>{
        }}
        stepText={(stepIndex, stepCount) => {

          return `第${8}步，共${8}步`
        }}
        nextText="下一步"
        prevText="上一步"
        showPreviousBtn
        okText='完成引导'
      />*/}
    </div>
  )
}

export default Team
