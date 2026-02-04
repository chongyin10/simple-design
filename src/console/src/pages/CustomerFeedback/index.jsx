import React, {useEffect} from 'react'
import "./index.less"
import {useReactive} from "ahooks"
import feedbackApi from "../../serviceApi/feedbackApi"
import FeedbackItem from "./feedbackItem"
import {Pagination} from "antd"
import intl from 'react-intl-universal';
function CustomerFeedback(props) {

  const feedbackListState = useReactive({
    list:[],
    current:1,
    size:5,
    total:0
  })

  const getFeedbackList = ()=>{
    feedbackListState.list = []
    const { current,size } = feedbackListState
    feedbackApi.getFeedbackList({
      current,
      size,
      sort:'desc',
      sortField:"createTime",
      categoryId:11
    }).then((res)=>{
      feedbackListState.list = res.data.feedbackInfo
      feedbackListState.total  = res.data.total
    })
  }

  useEffect(() => {
    getFeedbackList()
  }, [])


  return (
    <div className={'customer-feedback-container'}>
      <div className={'page-title'}>
        {intl.get('TEAM_DEMAND_TITLE')}
      </div>

      <div className={'feedback-list-container'}>
        {
          feedbackListState.list.map(item=>{
            const {
              contact, // 手机号
              createTime, // 创建时间
              feedback,  // 反馈内容
              id,     // 唯一标识
              username,  // 用户名
              userId,   // 用户ID
              fileIds, // 附件
            } = item

            return <FeedbackItem
              key={id}
              contact={contact}
              createTime={createTime}
              feedback={feedback}
              id={id}
              username={username}
              userId={userId}
              fileIds={fileIds}
            />
          })
        }
      </div>

      <div style={{textAlign:"right"}}>
        <Pagination
          onChange={(current, size) => {
            feedbackListState.current = current
            feedbackListState.size = size
            getFeedbackList()
          }}
          showQuickJumper={true}
          current={feedbackListState.current}
          total={feedbackListState.total}
          pageSize={feedbackListState.size}
          pageSizeOptions={["5", "10", "20"]}
          showSizeChanger={true}
          showTotal={(total, range) => {
            return `共${total}条`
          }}
        />
      </div>


    </div>
  )
}

export default CustomerFeedback
