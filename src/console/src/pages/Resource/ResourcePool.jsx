import { Row, Col, Table, Button, message,Modal} from 'antd';
import React, { useEffect, useState } from 'react';
import { serviceList,unsubscribeService} from '../../serviceApi/resourceApi'
import { useHistory } from "react-router"
import intl from "react-intl-universal"
import {useReactive} from "ahooks"
import dayjs from "dayjs"


const ResourcePool = (props) => {

  const clickUnSubscribeService = (id)=>{
    Modal.confirm({
      title:"确定要退订吗?",
      okText: "退订",
      okButtonProps: {
        type: "primary",
        danger: true,
      },
      cancelText: "取消",
      onOk(){
        unsubscribeService({serviceId:id}).then(()=>{
          getServiceList()
        })
      },
      onCancel(){

      }
    })
  }

  const columns = [

    {
      title:"资源ID",
      key: "id",
      dataIndex: "id",
    },
    {
      title:"订单ID",
      key: "orderId",
      dataIndex: "orderId",
    },
    {
      title:"实例规格",
      key: "specification",
      dataIndex: "specification",
    },
    {
      title:"计费模式",
      key: "chargeType",
      dataIndex: "chargeType",
    },
    {
      title:"续费方式",
      key: "autoRenew",
      dataIndex: "autoRenew",
      render(text) {
        return text?"自动续费":"手动续费"
      }
    },
    {
      title:"创建时间",
      key: "createdAt",
      dataIndex: "createdAt",
      render(text) {
        return dayjs(text).format("YYYY-MM-DD HH:mm:ss")
      }
    },
    {
      title:"到期时间",
      key: "pricingEndTime",
      dataIndex: "pricingEndTime",
      render(text) {
        return dayjs(text).format("YYYY-MM-DD HH:mm:ss")
      }
    },
    {
      title: "操作",
      render(text,record){
        return <Button onClick={()=>{
          clickUnSubscribeService(record.id)
        }} danger>退订</Button>
      }
    }

  ]

  const history = useHistory()

  const listInfo = useReactive({
    data:[],
    pageIndex:1,
    pageSize:10,
    loading:false,
    total:0
  })

  const getServiceList = ()=>{
    const { pageIndex,pageSize  } = listInfo
    listInfo.data = []
    listInfo.loading = true

    serviceList({
      pageIndex,
      pageSize,
      payStatus:"paid"
    }).then((res)=>{
      const list = res.data.services
      listInfo.data = list
      listInfo.total = res.data.totalItems
    }).finally(()=>{
      listInfo.loading = false
    })
  }

  useEffect(()=>{
    getServiceList()

  },[])


/*
  const formatUsage = (runningTime) => {
    const hour = Math.floor(runningTime / 3600);
    const minute = Math.floor((runningTime % 3600) / 60);
    const second = Math.floor(runningTime % 60);
    return `${hour}小时${minute}分${second}秒`
  }

  const formatSpecification = (specification) => {
    let computeValue = ''
    let storageValue = ''
    for (const item of specification) {
      if (item.toLowerCase().indexOf('vcpus') !== -1) {
        computeValue = item
      } else {
        const diskValue = parseInt(item)
        storageValue = diskValue < 1000 ? `${diskValue}GB` : `${diskValue / 1000}TB`;
      }
    }
    const value = computeValue + (computeValue && storageValue ? ' | ' : '') + (storageValue ? `${storageValue} Disk` : '');
    return value;
  }*/



  return (
    <div>
      <Row className="resource-title">
        <Col span={20}><b>{intl.get("RESOURCE_POOL")}</b></Col>
        <Col span={4} style={{textAlign: 'right'}}>
          <Button type="link"
            // disabled={create[1]}
            onClick={() => {
              history.push(process.env.REACT_APP_VERSION === 'SAAS' ? '/submitOrder' : '/addResource?action=add')
            }}>
            {/* {create[0] ? intl.get("CREATE_A_RESOURCE") : intl.get("RESOURCE_ADD_MACHINE")} */}
            {intl.get("RESOURCE_EXPAND")}
          </Button>
          {
            process.env.REACT_APP_VERSION === 'HOST'?
              (<Button onClick={()=>{
                history.push('/addResource?action=decrease')
              }} type={'link'}>缩容</Button>):null
          }

          {/* <Button type="link" style={{
            display: create[0] ? 'none' : 'inline-block',
          }} onClick={() => setUpdateModal(true)}>
            更新配置
          </Button> */}
          {/* <Modal
            title="更新配置"
            visible={updateModal}
            onOk={updateResource}
            confirmLoading={updateModalLoading}
            onCancel={() => setUpdateModal(false)}
            cancelText="取消"
            okText="确定"
          >
            <p>更新配置会停止正在运行的Notebook任务！</p>
          </Modal> */}
        </Col>
      </Row>
      <Row className="resource-body">
        <Col span={24}>
          <Table
            columns={columns}
            rowKey={"id"}
            dataSource={listInfo.data}
            loading={listInfo.loading}
            pagination={{
              showQuickJumper: true,
              current:listInfo.pageIndex,
              pageSize: listInfo.pageSize,
              total:listInfo.total,
              onChange: (current, size) => {
                listInfo.pageIndex = current
                listInfo.pageSize = size
                getServiceList()
              },
              pageSizeOptions: ["10", "15", "20","30"],
              showSizeChanger: true,
              showTotal: (total, range) => {
                return `共${total}条`
              },
            }}
          >
          </Table>
        </Col>
      </Row>
    </div>
  )
}

export default ResourcePool
