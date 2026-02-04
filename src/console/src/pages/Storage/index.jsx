import './index.less'
import React, { useEffect, useState } from "react"
import { RedoOutlined } from '@ant-design/icons'
import engineApi from '../../services/engineApi'
import { useReactive, useDebounce } from 'ahooks';
import Payment from '../CalculateInstance/Payment'
import Buyment from "../CalculateInstance/Buyment";
import ShopCart from "../CalculateInstance/ShopCart";
import shopCartApi from "../../services/shopCartApi.js";
import { Select, Space, Input, Button, Table, Drawer } from 'antd';
import { storageColumes, statueMenu, autoRenewMenu, chargeTypeMenu, rank } from '../common/common';
import { useUpdateEffect } from 'ahooks';

const Storage = () => {
  const [typeValue, setTypeValue] = useState('instance');
  const [area, setArea] = useState([]);
  const [open, setOpen] = useState(false);
  const [childrenDrawer, setChildrenDrawer] = useState(false);
  const [threeDrawer, setThreeDrawer] = useState(false);
  const [buyDetail, setBuyDetail] = useState({})
  const [selectedProduct, setSelectedProduct] = useState({})
  let tableState = useReactive({
    resource: '', // 搜索内容
    regionId: -1, // 区域
    status: 0,   // 状态 running：运行中；expired：已到期；retired:已退定；
    chargeType: 0, // 计费方式；Dynamic：按量计费；Month：按月；Daily：按日；
    autoRenew: 0, // 是否自动续费
    createTimeSort: '', // 排序 创建时间排序方式；asc：升序；desc：降序
    expireTimeSort: '', // 排序 到期时间排序方式；asc：升序；desc：降序

    pageIndex: 1,
    pageSize: 10,
    productType: 'storage',

    total: 0,
    data: []
  });

  const onClose = () => {
    setOpen(false);
  };
  const onChildrenDrawerOpen = (record) => {
    setBuyDetail(record)
    setChildrenDrawer(true);
  };
  const onChildrenDrawerClose = () => {
    setChildrenDrawer(false);
  };
  const onThreeDrawerClose = () => {
    setThreeDrawer(false)
  }
  const onThreeDrawerOpen = (params) => {
    shopCartApi.createOrder({ ...params, totalPrice: params.totalPrice * 1000 / 10 }).then(res => {
      setSelectedProduct({ ...params, tradeNo: res.data.tradeNo })
      setThreeDrawer(true)
    }).catch(err => {
      console.error(err)
    })
  }
  const addStorage = () => {
    setTypeValue('storage')
    setOpen(true);
  }

  const debouncedValue = useDebounce(tableState.resource, { wait: 500 });

  useEffect(() => {
    tableState.pageIndex=1
    getList()
  }, [
    debouncedValue,
    tableState.regionId,
    tableState.status,
    tableState.chargeType,
    tableState.autoRenew,
    tableState.expireTimeSort,
    tableState.createTimeSort,
    tableState.pageSize,
    tableState.productType
  ])
  useUpdateEffect(() => {
    getList(tableState.pageIndex)
  }, [
    tableState.pageIndex
  ])

  useEffect(() => {
    getArea()
  }, [])



  const getArea = () => {
    engineApi.getAreaList()
      .then(res => {
        const { data } = res;
        data.forEach(item => {
          item.value = item.id
          item.label = item.areaCnName
        })
        data.push({
          value: -1,
          label: '全部地域'
        })
        setArea(data)
      })
  }

  const isBoolean = (value) => {
    return typeof value === 'boolean';
  }

  const handlePayload = (pageIndex) => {
    const payload = {
      pageIndex: pageIndex? pageIndex : 1,
      pageSize: tableState.pageSize,
      productType: tableState.productType,
    }
    tableState.resource && (payload.resource = tableState.resource);
    tableState.regionId !== -1 && (payload.regionId = tableState.regionId);
    tableState.status && (payload.status = tableState.status);
    tableState.chargeType && (payload.chargeType = tableState.chargeType);
    isBoolean(tableState.autoRenew) && (payload.autoRenew = tableState.autoRenew);
    tableState.createTimeSort && (payload.createTimeSort = tableState.createTimeSort);
    tableState.expireTimeSort && (payload.expireTimeSort = tableState.expireTimeSort);
    return payload
  }

  const getList = (pageIndex) => {
    engineApi.resourceList(handlePayload(pageIndex)).then(res => {
      const { records, total } = res.data;
      console.log(res, 'res')
      tableState.data = records
      tableState.total = total
    })
      .catch(err => console.log(err))
  }

  return <div className="storage">
    <div className="head-line">存储</div>
    <div className="user-table">
      <div className="title">实例列表</div>
      <br />
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Space>
          <Space>
            <span>实例：</span>
            <Input
              style={{ width: '200px' }}
              placeholder="请输入ID或者实例名称"
              allowClear
              value={tableState.resource}
              onChange={(e) => tableState.resource = e.target.value}
            />
          </Space>

          <Space>
            <span>地域：</span>
            <Select
              style={{ width: 120 }}
              value={tableState.regionId}
              onChange={(e) => { tableState.regionId = e }}
              options={area}
            />
          </Space>

          <Space>
            <span>状态：</span>
            <Select
              style={{ width: 120 }}
              value={tableState.status}
              onChange={(e) => { tableState.status = e }}
              options={statueMenu}
            />
          </Space>

          <Space>
            <span>计费模式：</span>
            <Select
              style={{ width: 120 }}
              value={tableState.chargeType}
              onChange={(e) => { tableState.chargeType = e }}
              options={chargeTypeMenu()}
            />
          </Space>

          <Space>
            <span>续费方式：</span>
            <Select
              style={{ width: 120 }}
              value={tableState.autoRenew}
              onChange={(e) => { tableState.autoRenew = e }}
              options={autoRenewMenu()}
            />
          </Space>
        </Space>

        <Space>
          <Space>
            <Button type="primary" onClick={addStorage}>添加实例</Button>
          </Space>

          <Space>
            <Button icon={<RedoOutlined />} onClick={() => getList(tableState.pageIndex)} />
          </Space>
        </Space>
      </div>
      <div>
        <br />
        <Table
          columns={storageColumes({ getList })}
          dataSource={tableState.data}
          rowKey={_ => _.id}
          onChange={(pagination, filters, sorter) => rank(pagination, filters, sorter, tableState)}
          pagination={{
            current: tableState.pageIndex,
            total: tableState.total,
            pageSize: tableState.pageSize,
            showQuickJumper: true,
            pageSizeOptions: [10, 20, 50, 100],
            showSizeChanger: true,
            showTotal: (total, range) => {
              return `共${total}条`
            }
          }}
        />
      </div>
    </div>

    <Drawer title="商品列表" width={"90%"} onClose={onClose} visible={open}>
      <Payment onChildrenDrawerOpen={onChildrenDrawerOpen} typeValue={typeValue} open={open} childrenDrawer={childrenDrawer} threeDrawer={threeDrawer} />
      <Drawer

        maskClosable={false}
        closable={false}
        title="购买"
        width={"80%"}
        onClose={onChildrenDrawerClose}
        visible={childrenDrawer}
      >
        <Buyment buyDetail={buyDetail} onChildrenDrawerClose={onChildrenDrawerClose} onThreeDrawerOpen={onThreeDrawerOpen} />
        <Drawer
          maskClosable={false}
          closable={false}
          title="支付"
          width={600}
          onClose={onThreeDrawerClose}
          visible={threeDrawer}
        >
          <ShopCart onThreeDrawerClose={onThreeDrawerClose} selectedProduct={selectedProduct} />
        </Drawer>
      </Drawer>
    </Drawer>
  </div>
}

export default Storage;