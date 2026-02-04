import { useEffect, useState, useRef } from 'react';
import { useHotkeys } from "react-hotkeys-hook";
import { Switch, Spin, message } from 'antd'
import { DeleteOutlined } from "@ant-design/icons"
import auditApi from "../api/auditApi";
import './notification.less'
let dropDownDoading = false
let size = 5
let flag = true

const ProcessingWithTTime = (time) => {
  if (!time) return time;
  var date = time.substr(0, 10); //年月日
  var hours = time.substring(11, 13);
  var minutes = time.substring(14, 16);
  var seconds = time.substring(17, 19);
  var timeFlag = date + ' ' + hours + ':' + minutes + ':' + seconds;
  timeFlag = timeFlag.replace(/-/g, "/");
  timeFlag = new Date(timeFlag);
  timeFlag = new Date(timeFlag.getTime() + 8 * 3600 * 1000);
  timeFlag = timeFlag.getFullYear() + '-' + ((timeFlag.getMonth() + 1) < 10 ? "0" + (timeFlag.getMonth() + 1) : (timeFlag.getMonth() + 1)) + '-' + (timeFlag.getDate() < 10 ? "0" + timeFlag.getDate() : timeFlag.getDate()) + ' ' + (timeFlag.getHours() < 10 ? "0" + timeFlag.getHours() : timeFlag.getHours()) + ':' + (timeFlag.getMinutes() < 10 ? "0" + timeFlag.getMinutes() : timeFlag.getMinutes()) + ':' + (timeFlag.getSeconds() < 10 ? "0" + timeFlag.getSeconds() : timeFlag.getSeconds());
  return timeFlag;
}

function Notification(props){
  const { notificationView, onOk, onCancel} = props;

  const [total, setTotal] = useState(0)
  const [auditInfo, setAutoInfo] = useState([])
  const [loading, setLoading] = useState(false)

  const [notADropLeft, setNotADropLeft] = useState(false)

  const [numberOfNotifications, setNumberOfNotifications] = useState(0)

  // 判断消息是否全部已读
  const isThereAnyUnread = () => {
    auditApi.isUnRead({})
      .then(res => {
      })
  }

  useEffect(() => {
    if(notificationView) {
      document.body.style.overflow = 'hidden';
      if(auditInfo.length){
        getList(auditInfo.length--, flag)
      }else{
        getList(5, flag)
      }
    }else {
      document.body.style.overflow = 'hidden'
    }
  }, [notificationView])
  useEffect(() => {
    auditInfo.forEach((item, index) => {
      // if(item.smsStatus === "unread"){
      //   auditApi.changeStatusOrDetele({id: item.id, viewFlag: 'read'})
      //     .then(res => {})
      // }
      console.log(item)
      document.getElementById(item.id)?.addEventListener('click', () => markRead(item.id, 'read'))
    })
    return () => {
      auditInfo.forEach((item, index) => {
        document.getElementById(item.id)?.removeEventListener('click', markRead(item.id, 'read'))
      })
    }
  }, [auditInfo])

  // 标记为已读\全部标记为已读
  const markRead = (id, viewFlag) => {
    auditApi.changeStatus({id, viewFlag})
      .then(res => {
        if(viewFlag === 'readall'){
          getList(size, flag)
          isThereAnyUnread()
          message.success("已经全部标记为已读")
        }
        console.log(res)
      })
  }

  const approvalStatusList = [
    { value: "All", label: "所有状态" },
    { value: "Auditing", label: "待审批" },
    { value: "Deny", label: "未通过" },
    { value: "Pass", label: "通过" },
    { value: "Withdraw", label: "撤销申请" },
  ]

  function getList(size, viewFlag){
    auditApi.notificationList2({
      viewFlag,
      current: 1,
      size}).then(res => {
        console.log(res)
        const {records: auditInfo, total: newTotal} = res.data;
        if(newTotal !== total){
          setTotal(newTotal)
        }
        setAutoInfo(auditInfo)
        dropDownDoading = true;
        setLoading(false)
      })
  }

  useHotkeys('esc', onCancel)

  const checktStatus = (status) => {
    if(status){
      flag = !status
      setNumberOfNotifications(auditInfo.length--)
      getList(5, flag)
    }else{
      flag = !status
      getList(numberOfNotifications, flag)
      setNumberOfNotifications(0)
    }
    
  }

  function getMoreData(){
    if(size > total){
      setNotADropLeft(true)
      return
    }else{
      setNotADropLeft(false)
    }
    const panelCont = document.getElementById("panelCont"),
          currentHeight = panelCont.scrollHeight,
          clientHeight = panelCont.clientHeight,
          currentTop = panelCont.scrollTop,
          currentBot = currentHeight - clientHeight - currentTop;
    if(currentBot < 30){
      if(dropDownDoading){
        dropDownDoading = false
        getList(size+5, flag)
        size = size+5
        setLoading(true)
        console.log("请求更多数据")
      }
    }
  }

  const deleteItem = (id) => {
    auditApi.deleteNotification({id})
      .then(res => {
        getList(size+5, flag)
        message.success("已删除！")
      })
  }


  if(document.getElementById("panelCont")){
    const panelCont = document.getElementById("panelCont");
    panelCont.addEventListener("scroll", () => getMoreData())
  }
  
  return (<div 
    className="notification" 
    onClick={() => onCancel()}
    style={{display:`${!notificationView ? 'none' : 'block'}`}}
    >
    <div className='panel' onClick={(e) => {
      e.stopPropagation()
    }}>
      <div className='panel-header'>
        <span className='title'>通知中心</span>
        <div className='option'>
          <a onClick={() => markRead(null, 'readall')}>全部标记已读</a>
          <p></p>
          <span>仅显示未读&nbsp;&nbsp;<Switch size="small" defaultChecked={false} onClick={checktStatus} /></span>
        </div>
      </div>
      <div className='panel-cont' id='panelCont'>
        <ul className='panel-ul'>
          {auditInfo.map((item, index) => (
            <li key={index}>
              <div className='li-title'>
                <div>
                  <span>{item.type}&nbsp;&nbsp;</span>
                  <span>{ProcessingWithTTime(item.createTime)}</span>
                </div>
                <span className='icon' onClick={() => deleteItem(item.id)}><DeleteOutlined/></span>
                {item.smsStatus==="unread"? (<p className='logo'></p>) : null}
                
              </div>
              <div className='cont'  dangerouslySetInnerHTML = {{ __html: item.content }}>
                
              </div>
              
              <div className='opinion'>审批意见：{item.opinion===""? "无": item.opinion}</div>
            </li>
          ))}
        </ul>
        {loading? ( <div className='loading'><Spin /></div>) : null}
        {notADropLeft? (<div className='loading'>没有更多的消息</div>) : null}
      </div>
      <div className='panel-foo'>共{total}条消息</div>
    </div>
  </div>)
}


export default Notification