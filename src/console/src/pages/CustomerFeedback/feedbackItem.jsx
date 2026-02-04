import React from 'react'
import "./feedbackItem.less"
import {Divider} from "antd"
import PropTypes from "prop-types"
import dayjs from "dayjs"
function FeedbackItem(props) {

  const {
    contact,
    createTime,
    feedback,
    username,
    userId,
    fileIds
  } = props

  function downloadFile() {
    
    fileIds.forEach(async item => {
      // (async function() {
      //   await download(item)
      // }(item))
      await download(item)
    })
    
  }

  function download(item){
    return new Promise(resolve => {
      let xhr = new XMLHttpRequest();
      const url = `/0/api/v1/admin-rs/feedback/download?fileId=${item}`
      xhr.open('GET', url, true);    // 也可用POST方式
      xhr.responseType = "blob";

      xhr.onload = function () {
        if (this.status === 200) {
          var blob = this.response;
          if (navigator.msSaveBlob == null) {
            var a = document.createElement('a');
            a.setAttribute('href', url);
            a.setAttribute('download', item);
            a.click();
            a.remove();
            resolve("success")
          } else {
            navigator.msSaveBlob(blob, decodeURIComponent(headerName).substring(20));
            resolve("success")
          }
        }
      };

      xhr.send()





    })
  }



  return (
    <div className={'feedback-item-container'}>

      <div className={'title-info'}>
        <span className={'img-wrapper'}>
          {
            userId && <img src={`/0/api/v1/user/image/profile_photo/${userId}.jpg`} alt=""/>
          }
        </span>
        <span className={'time-info'}>
          {username} 
          提交于 
          {dayjs(createTime).format("YYYY-MM-DD HH:mm:ss")}</span>
          <Divider style={{margin:"0 10px",borderColor:'#DADADA'}} type="vertical" />
          {fileIds.length? (<a onClick={() => downloadFile()}>下载附件</a>) : null}
          
      </div>

      <div className={"user-info"}>
        <span >
          联系人: {username}
        </span>

        <Divider style={{margin:"0 10px",borderColor:'#DADADA'}} type="vertical" />

        <span>
          联系电话: {contact}
        </span>
      </div>

      <div className={'feedback-content'}>
        <span>
          需求描述:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {feedback}
        </span>
      </div>

      <Divider  />

    </div>
  )
}

FeedbackItem.propTypes = {
  contact:PropTypes.string.isRequired,
  createTime:PropTypes.string.isRequired,
  feedback:PropTypes.string.isRequired,
  username:PropTypes.string.isRequired,
  userId:PropTypes.string.isRequired,
  fileIds:PropTypes.array.isRequired
}

export default FeedbackItem
