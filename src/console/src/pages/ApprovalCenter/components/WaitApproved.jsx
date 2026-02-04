import React, {Fragment, useEffect, useState} from "react"
import {Button, Input, Modal, Select, Table} from "antd"
import "./WaitApproved.less"
import { useMemoizedFn, useReactive } from "ahooks"
import auditApi from "../../../serviceApi/auditApi"
import {useHistory} from "react-router"
import dayjs from "dayjs"
import {categoryIdList} from "../pages/ApprovalCenterIndex"
import {approvalStatusList} from "./MyApproval"
import UpdateApproveStatusModal from "../../../components/models/UpdateApproveStatusModal"
import ApprovalDetailDrawer from "../../../components/models/ApprovalDetailDrawer"
import useUrlState from "@ahooksjs/use-url-state"
import PubSub from "pubsub-js"
import { ProcessingWithTTime } from '../../../utils/hook/methods'

const { Option } = Select

const someApprovalStatusList = [
  { value: "Deny", label: "未通过" },
  { value: "Pass", label: "通过" },
]

function WaitApproved(props) {

  const { activeKey } = props
  const waitApprovedListState = useReactive({
    list: [],
    current: 1,
    size: 10,
    total: 0,
    content: "",
    status: "Auditing",
    categoryId: "",
    isOldApprovalForm: false,
  })

  const [ urlState,setUrlState ] = useUrlState()

  const approveId = Number(urlState.approveId)

  const [updateModalVisible, setUpdateModalVisible] = useState(false)

  const setDrawerVisible = (visible)=>{
    setUpdateDrawerVisible(visible)
    if(!visible){
      setUrlState({
        approveId:undefined
      })
    }
  }

  const updateApproveInfo = useReactive({
    id:approveId?approveId:0,
    status: "",
    categoryId: 0
  })
  const [updateDrawerVisible, setUpdateDrawerVisible] = useState(()=>{
    return !!approveId;
  })




  const openDrawer = (id)=>{
    updateApproveInfo.id = id
    setUpdateDrawerVisible(true)
    setUrlState({
      approveId:id,
    })
  }

  const categoryIdChange = useMemoizedFn((value)=>{
    waitApprovedListState.categoryId = value
    resetCurrentAndRefresh()
  })

  const {
    current,
    size,
    total,
    content,
    status,
    categoryId,
    isOldApprovalForm,
    list
  } = waitApprovedListState

  const getWaitApprovedList = useMemoizedFn(() => {
    const { current, size, content, status, categoryId } =
      waitApprovedListState
    waitApprovedListState.list = []
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
    auditApi.getAuditingList(params).then((res) => {
      waitApprovedListState.list = res.data.auditInfo
      waitApprovedListState.total = res.data.total
    })
  })
  useEffect(() => {
    if(activeKey === 'waitApproved'){
      getWaitApprovedList()
    }
  }, [activeKey])

  useEffect(() => {
    const subscriber = PubSub.subscribe("resetApprovalStatus",()=>{
      waitApprovedListState.status = 'Auditing'
      waitApprovedListState.isOldApprovalForm = false
      resetCurrentAndRefresh()
    })
    return ()=>{
      PubSub.unsubscribe(subscriber)
    }
  }, [])




  const resetCurrentAndRefresh = useMemoizedFn(() => {
    if(updateDrawerVisible){
      setDrawerVisible(false)
    }
    waitApprovedListState.current = 1
    getWaitApprovedList()
  })

  const columns = [

    {
      title: "申请单ID",
      dataIndex: "id",
      align:'center',
      width: 30,
    },
    {
      title: "事项类型",
      dataIndex: "categoryId",
      align: 'center',
      render(text) {
        const findResult =  categoryIdList().find(item=>item.value === String(text))
        return findResult ? findResult.label:""
      },
      width: 30,
    },
    {
      title: "事项内容",
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
      title: "申请人",
      dataIndex: "username",
      align: 'center',
      width: 40
    },
    {
      title: "申请时间",
      dataIndex: "createTime",
      align: 'center',
      width: 40,
      render(text) {
        return ProcessingWithTTime(text)
      }
    },
/*    {
      title: "审批状态",
      dataIndex: "status",
      render(text) {
        const findResult =  approvalStatusList.find(item=>item.value === text)
        return findResult ? findResult.label : text
      }
    },
    {
      title: "审批意见",
      dataIndex: "opinion",
    },*/

    {
      title: "操作",
      width: 52,
      render(record) {
        // 撤销申请
        let isAuditing = false
        if(record.status ==='Auditing'){
          isAuditing = true
        }
        return <div>
          <Button onClick={()=>{
            openDrawer(record.id)
          }} style={{paddingLeft:0,paddingRight:0}} type={"link"}>查看详情</Button>
          {
            isAuditing &&
            (
              <Fragment>
                <Button onClick={()=>{
                  openUpdateModal(record.id,'Pass',record.categoryId)
                }} style={{paddingLeft:0,paddingRight:0,marginLeft:10,color:"#52c41a"}} type={'link'}>通过</Button>
                <Button   onClick={()=>{
                  openUpdateModal(record.id,'Deny',record.categoryId)
                }}  style={{paddingLeft:0,paddingRight:0,marginLeft:10,color:"#ff4d4f"}} type={'link'}>驳回</Button>
              </Fragment>
            )
          }
        </div>
      },
    },
  ]



  const openUpdateModal = (id,status,categoryId)=>{
    setUpdateModalVisible(true)
    updateApproveInfo.id = id
    updateApproveInfo.status = status
    updateApproveInfo.categoryId = categoryId
  }


  return (
    <div className={"wait-approved-container"}>
      <div className={"wait-approved-search"}>
        <Input.Group className={"left"} style={{ width: 360 }} compact>
          <Input
            value={content}
            placeholder={"请输入申请单ID"}
            onChange={(event) => {
              waitApprovedListState.content = event.target.value
              if(!waitApprovedListState.content){
                resetCurrentAndRefresh()
              }
            }}
            onPressEnter={resetCurrentAndRefresh}
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
            搜索
          </Button>
        </Input.Group>

        <div className={"right"}>
          {isOldApprovalForm ? (
            <Select
              allowClear
              value={status}
              onChange={(value) => {

                if(!value){
                  waitApprovedListState.status = 'Auditing'
                  waitApprovedListState.isOldApprovalForm = false
                  resetCurrentAndRefresh()
                  return
                }
                waitApprovedListState.status = value
                resetCurrentAndRefresh()
              }}
            >
              {someApprovalStatusList.map((item) => (
                <Option key={item.value} value={item.value}>
                  {item.label}
                </Option>
              ))}
            </Select>
          ) : (
            <Button
              onClick={() => {
                waitApprovedListState.isOldApprovalForm = true
                waitApprovedListState.status = "Pass"
                resetCurrentAndRefresh()
              }}
              type={"link"}
            >
              查看过去审批的申请单
            </Button>
          )}
          <Select style={{marginLeft:10}} onChange={categoryIdChange}  value={categoryId} >
            {
              categoryIdList().map(item=>{
                return <Option value={item.value} key={item.value}>{item.label}</Option>
              })
            }
          </Select>
        </div>
      </div>

      <div className={"wait-approved-table-container"}>
        <Table
/*          scroll={{
            x: "100%",
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
              waitApprovedListState.current = current
              waitApprovedListState.size = size
              getWaitApprovedList()
            },
            pageSizeOptions: ["10", "20", "50","100"],
            showSizeChanger: true,
            showTotal: (total, range) => {
              return `共${total}条`
            },
          }}
        />
      </div>

      <UpdateApproveStatusModal
        visible={updateModalVisible}
        setVisible={setUpdateModalVisible}
        id={updateApproveInfo.id}
        status={updateApproveInfo.status}
        categoryId={updateApproveInfo.categoryId}
        successCallback={resetCurrentAndRefresh}
      />

      <ApprovalDetailDrawer
        id={updateApproveInfo.id}
        visible={updateDrawerVisible}
        setVisible={setDrawerVisible}
        isReadOnly={false}
        openUpdateModal={openUpdateModal}
      />

    </div>
  )
}

export default WaitApproved
