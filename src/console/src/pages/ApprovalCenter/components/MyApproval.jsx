import React, { useEffect } from "react"
import {Button, Input, Modal, Select, Table,message} from "antd"
import "./MyApproval.less"
import { useMemoizedFn, useReactive, useSetState } from "ahooks"
import auditApi from "../../../serviceApi/auditApi"
import {categoryIdList} from "../pages/ApprovalCenterIndex"
import dayjs from "dayjs"
import ApprovalDetailDrawer from "../../../components/models/ApprovalDetailDrawer"
import useUrlState from "@ahooksjs/use-url-state"
import intl from 'react-intl-universal';

const { Option } = Select

export const approvalStatusList = () => {
  return [
    { value: "All", label: intl.get('TEAM_APPROVE_MY_STATE_ALL') },
    { value: "Auditing", label: intl.get('TEAM_APPROVE_MY_STATE_AUDITING') },
    { value: "Deny", label: intl.get('TEAM_APPROVE_MY_STATE_DENY') },
    { value: "Pass", label: intl.get('TEAM_APPROVE_MY_STATE_PASS') },
    { value: "Withdraw", label: intl.get('TEAM_APPROVE_MY_STATE_WITHDRAW') },
  ]
}

function MyApproval(props) {
  const { activeKey } = props

  const myApprovalListState = useReactive({
    list: [],
    current: 1,
    size: 10,
    total: 0,
    content: "",
    status: "All",
    categoryId: "",
  })

  const [ urlState,setUrlState ] = useUrlState()
  const approveId = Number(urlState.approveId)


  const viewApprovalInfo = useReactive({
    id:approveId?approveId:0,
    visible:!!approveId
  })
  const setViewApprovalVisible = useMemoizedFn((visible)=>{
    viewApprovalInfo.visible = visible
    if(!visible){
      setUrlState({
        approveId:undefined
      })
    }
  })

  const openViewDrawer = (id)=>{
    viewApprovalInfo.id = id
    viewApprovalInfo.visible = true
    setUrlState({
      approveId:id,
    })
  }


  const categoryIdChange = useMemoizedFn((value)=>{
    myApprovalListState.categoryId = value
    resetCurrentAndRefresh()
  })


  const { current, size, total, content, status, categoryId, list } =
    myApprovalListState

  const getMyApprovalList = useMemoizedFn(() => {
    const { current, size, content, status, categoryId } = myApprovalListState
    myApprovalListState.list = []

    const params = {
      current,
      size,
    }
    if (content) {
      params.content = content
    }
    if (categoryId) {
      params.categoryId = categoryId
    }
    if (status) {
      params.status = status
    }

    auditApi.getAuditList(params).then((res) => {
      myApprovalListState.list = res.data.auditInfo
      myApprovalListState.total = res.data.total
    })
  })

  useEffect(() => {
    if(activeKey === 'myApproval'){
      getMyApprovalList()
    }
  }, [activeKey])

  const resetCurrentAndRefresh = useMemoizedFn(() => {
    myApprovalListState.current = 1
    getMyApprovalList()
  })

  const confirmModal = (id)=>{

    return ()=>{
      Modal.confirm({
        title: intl.get('TEAM_APPROVE_MY_CANCEL'),
        onOk(){
          auditApi.updateAudit({
            id,
            status:"Withdraw"
          }).then(()=>{
            message.success(intl.get('TEAM_APPROVE_MY_CANCEL_SUCCESS'))
            getMyApprovalList()
          })
        }
      })
    }
  }

  const columns = [

    {
      title: intl.get('TEAM_APPROVE_MY_TABLE_ID'),
      dataIndex: "id",
      align:'center',
      width:30
    },
    {
      title: intl.get('TEAM_APPROVE_MY_TABLE_CATEGORYID'),
      dataIndex: "categoryId",
      align: 'center',
      render(text) {
        const findResult =  categoryIdList().find(item=>item.value === String(text))
        return findResult ? findResult.label:""
      },
      width: 30,
    },
    {
      title: intl.get('TEAM_APPROVE_MY_TABLE_CONTENT'),
      dataIndex: "content",
      width:60,
      ellipsis:true,
      render: (txt, record) => {
        let idText = ""
        if(String(record.categoryId)==='2'){
          idText = "模型"
        }else{
          idText = "用户"
        }
        return (
          <div>
            <span>{record.brief}</span> <br />
            <span>{idText}ID：{record.contentId}</span>
          </div>
        )
      }
    },
    {
      title: intl.get('TEAM_APPROVE_MY_TABLE_USERNAME'),
      dataIndex: "username",
      align: 'center',
      width: 30
    },
/*    {
      title: "申请时间",
      dataIndex: "createTime",
      align: 'center',
      width: 120,
      render(text) {
        return dayjs(text).format("YYYY-MM-DD HH:mm:ss")
      }
    },*/
    {
      title: intl.get('TEAM_APPROVE_MY_TABLE_STATUS'),
      dataIndex: "status",
      render(text) {
        const findResult =  approvalStatusList().find(item=>item.value === text)
        return findResult ? findResult.label : text
      },
      width: 30
    },
    {
      title: intl.get('TEAM_APPROVE_MY_TABLE_OPINION'),
      dataIndex: "opinion",
      ellipsis:true,
      width: 40,
    },

    {
      title: intl.get('TEAM_APPROVE_MY_TABLE_OPERATE'),
      width: 40,
      render(record) {
        // 撤销申请
        let isAuditing = false
        if(record.status ==='Auditing'){
          isAuditing = true
        }
        return <div>
            <Button onClick={()=>{
              openViewDrawer(record.id)
          }} style={{ paddingLeft: 0, paddingRight: 0 }} type={"link"}>{intl.get('TEAM_APPROVE_MY_TABLE_DETAIL')}</Button>
          {
            isAuditing &&
            <Button onClick={confirmModal(record.id)} style={{ paddingLeft: 0, paddingRight: 0, marginLeft: 10 }} type={'link'}>{intl.get('TEAM_APPROVE_MY_TABLE_CANCEL')}
              </Button>
          }
        </div>
      },
    },
  ]

  return (
    <div className={"my-approval-container"}>
      <div className={"my-approval-search"}>
        <Input.Group className={"left"} style={{ width: 360 }} compact>
          <Input
            value={content}
            onChange={(event) => {
              myApprovalListState.content = event.target.value
              if(!myApprovalListState.content){
                resetCurrentAndRefresh()
              }
            }}
            onPressEnter={resetCurrentAndRefresh}
            placeholder={intl.get('TEAM_APPROVE_MY_SEARCH_PLACEHOLDER')}
            allowClear
            style={{ width: "264px", height: "40px" }}
          />

          <Button
            onClick={resetCurrentAndRefresh}
            style={{
              width: "60px",
              height: "40px",
              textAlign: "center",
              backgroundColor: "#1890FF",
            }}
            type="primary"
          >
            {intl.get('TEAM_APPROVE_MY_SEARCH')}
          </Button>
        </Input.Group>

        <div className={"right"}>
          <Select
            onChange={(value) => {
              myApprovalListState.status = value
              resetCurrentAndRefresh()
            }}
            style={{ marginRight: "10px" }}
            value={status}
          >
            {approvalStatusList().map((item) => (
              <Option key={item.value} value={item.value}>
                {item.label}
              </Option>
            ))}
          </Select>
          <Select onChange={categoryIdChange}  value={categoryId} >
            {
              categoryIdList().map(item=>{
                return <Option value={item.value} key={item.value}>{item.label}</Option>
              })
            }
          </Select>
        </div>
      </div>

      <div className={"my-approval-table-container"}>
        <Table
/*          scroll={{
            x: "110%",
          }}*/
          dataSource={list}
          columns={columns}
          rowKey={"id"}
          pagination={{
            showQuickJumper: true,
            current,
            total,
            pageSize: size,
            onChange: (current, size) => {
              myApprovalListState.current = current
              myApprovalListState.size = size
              getMyApprovalList()
            },
            pageSizeOptions: ["10", "20", "50","100"],
            showSizeChanger: true,
            showTotal: (total, range) => {
              return `共${total}条`
            },
          }}
        />
      </div>

      <ApprovalDetailDrawer
        id={viewApprovalInfo.id}
        visible={viewApprovalInfo.visible}
        setVisible={setViewApprovalVisible}
        isReadOnly={true}
      />

    </div>
  )
}

export default MyApproval
