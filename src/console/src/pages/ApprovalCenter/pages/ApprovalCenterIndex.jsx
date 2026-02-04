import React, {Fragment, useState} from 'react'
import {Tabs} from "antd"
import MyApproval from "../components/MyApproval"
import WaitApproved from "../components/WaitApproved"
import {useMemoizedFn, useUnmount} from "ahooks"
import useUrlState from "@ahooksjs/use-url-state"
import "./ApprovalCenterIndex.less"
import {hasModulePermission} from "../../../utils/storage"
import PubSub from "pubsub-js"
import intl from 'react-intl-universal';

const { TabPane } = Tabs

const tabs = () => {
  return [
    {
      key: "myApproval",
      title: intl.get('TEAM_APPROVE_MYAPPROVAL'),
      children: (props) => <MyApproval {...props} />
    },
    {
      key: "waitApproved",
      title: intl.get('TEAM_APPROVE_WAITAPPROVED'),
      children: (props) => <WaitApproved {...props} />,
      permission: "admin_approval_list"
    }
  ]
}

export const categoryIdList = () => {
  return [
    { value: "", label: intl.get('TEAM_APPROVE_EVENT_ALL') },
    { value: "2", label: intl.get('TEAM_APPROVE_EVENT_SHARE') },
    { value: "1", label: intl.get('TEAM_APPROVE_EVENT_NAME') },
    { value: "3", label: intl.get('TEAM_APPROVE_EVENT_WORK') },
    { value: "4", label: intl.get('TEAM_APPROVE_EVENT_EDU') },
  ]
}

function ApprovalCenterIndex(props) {

  const [ urlState,setUrlState ] = useUrlState()
  const [activeKey, setActiveKey] = useState(()=>{
    if(urlState.activeKey && (['myApproval','waitApproved'].includes(urlState.activeKey))){
      return  urlState.activeKey
    }
    setUrlState({
      activeKey:"myApproval"
    })
    return "myApproval"
  })

/*  useUnmount(()=>{
    setUrlState({
      activeKey:undefined
    })
  })*/


  const onChange = useMemoizedFn((activeKey)=>{
    setActiveKey(activeKey)
    setUrlState({
      activeKey
    })
  })

  return (
    <Fragment >
      <div className={"approval-center-title"}>
        {intl.get('TEAM_MENU_APPROVE')}
      </div>

      <div className={'approval-center-tab-container'}>
        <Tabs
          activeKey={activeKey}
          onChange={onChange}
          destroyInactiveTabPane={true}
          onTabClick={(key)=>{
            if(activeKey===key && activeKey ==='waitApproved'){
              PubSub.publish("resetApprovalStatus")
            }
          }}
        >
          {
            tabs().filter(item=>{
              return !item.permission || hasModulePermission((item.permission))
            }).map(item=>{
              return <TabPane tab={item.title} key={item.key}>{
                <item.children activeKey={activeKey}  />
              }</TabPane>
            })
          }
        </Tabs>
      </div>

    </Fragment>
  )
}

export default ApprovalCenterIndex
