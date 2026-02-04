import './index.less';
import Payment from './Payment';
import Buyment from "./Buyment";
import ShopCart from "./ShopCart";
import { RedoOutlined } from '@ant-design/icons';
import engineApi from '../../services/engineApi';
import { useReactive, useDebounce } from 'ahooks';
import React, { useEffect, useState } from "react";
import shopCartApi from "../../services/shopCartApi.js";
import { Select, Space, Input, Button, Table, Drawer } from 'antd'
import { statueMenu, autoRenewMenu, chargeTypeMenu, CalculateColumes, rank } from '../common/common'
import { useUpdateEffect } from 'ahooks';
import intl from 'react-intl-universal';

const CalculateInstance = () => {
  const [typeValue, setTypeValue] = useState('instance');
  const [area, setArea] = useState([]);
  const [open, setOpen] = useState(false);
  const [childrenDrawer, setChildrenDrawer] = useState(false);
  const [threeDrawer, setThreeDrawer] = useState(false);
  const [buyDetail, setBuyDetail] = useState({})
  const [selectedProduct, setSelectedProduct] = useState({})
  const [loading, setLoading] = useState(false);
  let tableState = useReactive({
    resource: '', // 搜索内容
    regionId: -1, // 区域
    status: 'running',   // 状态 running：运行中；expired：已到期；retired:已退定；
    chargeType: 0, // 计费方式；Dynamic：按量计费；Month：按月；Daily：按日；
    autoRenew: 0, // 是否自动续费
    createTimeSort: '', // 排序 创建时间排序方式；asc：升序；desc：降序
    expireTimeSort: '', // 排序 到期时间排序方式；asc：升序；desc：降序

    pageIndex: 1,
    pageSize: 10,
    productType: 'instance',

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

  const addCalculateInstance = () => {
    setTypeValue('instance')
    setOpen(true);
  }

  const debouncedValue = useDebounce(tableState.resource, { wait: 500 });

  useEffect(() => {
    getList()
    tableState.pageIndex = 1
  }, [
    debouncedValue,
    tableState.regionId,
    tableState.status,
    tableState.chargeType,
    tableState.autoRenew,
    tableState.pageSize,
    tableState.productType
  ])

  useUpdateEffect(() => {
    getList(tableState.pageIndex)
  }, [
    tableState.pageIndex,
    tableState.expireTimeSort,
    tableState.createTimeSort,
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
    console.log(pageIndex)
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
    setLoading(true)
    engineApi.resourceList(handlePayload(pageIndex)).then(res => {
      const { records, total } = res.data;
      tableState.data = records
      tableState.total = total
      setLoading(false)
    })
    .catch(err => setLoading(false))
  }

  return <div className="calculate-instance">
    {/* <div className="head-line">{intl.get('CALCULATION_INSTANCE')}</div> */}
    <div className="user-table">
      <div className="title">{intl.get('INSTANCE_LIST')}</div>
      <br />
      <div style={{display: 'flex', justifyContent: 'space-between'}}>
        <Space>
          <Space>
            <span>{intl.get('INSTANCE')}：</span>
            <Input
              style={{ width: '200px' }}
              placeholder={intl.get('PLEASE_ENTER_AN_ID_OR_NAME')}
              allowClear
              value={tableState.resource}
              onChange={(e) => tableState.resource = e.target.value}
            />
          </Space>

          <Space>
            <span>{intl.get('AREA')}：</span>
            <Select
              style={{ width: 120 }}
              value={tableState.regionId}
              onChange={(e) => { tableState.regionId = e }}
              options={area}
            />
          </Space>

          <Space>
            <span>{intl.get('STATUS')}：</span>
            <Select
              style={{ width: 120 }}
              value={tableState.status}
              onChange={(e) => { tableState.status = e }}
              options={statueMenu()}
            />
          </Space>

          <Space>
            <span>{intl.get('BILLING_MODE')}：</span>
            <Select
              style={{ width: 120 }}
              value={tableState.chargeType}
              onChange={(e) => { tableState.chargeType = e }}
              options={chargeTypeMenu()}
            />
          </Space>

          <Space>
            <span>{intl.get('RENEWAL_METHOD')}：</span>
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
            <Button type="primary" onClick={addCalculateInstance}>{intl.get('ADD_INSTANCE')}</Button>
          </Space>

          <Space>
            <Button icon={<RedoOutlined />} onClick={() => getList(tableState.pageIndex)} />
          </Space>
        </Space>
      </div>
      <div>
        <br />
        <Table
          columns={CalculateColumes({ getList, area, data: tableState.data })}
          dataSource={tableState.data}
          scroll={{
            x: 2500,
          }}
          loading={loading}
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
              return `${intl.get('GENERAL')}${total}${intl.get('STRIP')}`
            }
          }}
        />
      </div>
    </div>

    <Drawer title={intl.get('PRODUCT_LIST')} width={"90%"} onClose={onClose} visible={open}>
      <Payment onChildrenDrawerOpen={onChildrenDrawerOpen} typeValue={typeValue} open={open} childrenDrawer={childrenDrawer} threeDrawer={threeDrawer} />
      <Drawer
        maskClosable={false}
        closable={false}
        title={intl.get('PURCHASE')}
        width={"80%"}
        onClose={onChildrenDrawerClose}
        visible={childrenDrawer}
      >
        <Buyment buyDetail={buyDetail} onChildrenDrawerClose={onChildrenDrawerClose} onThreeDrawerOpen={onThreeDrawerOpen} />
        <Drawer
          maskClosable={false}
          closable={false}
          title={intl.get('PAYMENT')}
          width={600}
          onClose={onThreeDrawerClose}
          visible={threeDrawer}
        >
          <ShopCart onThreeDrawerClose={onThreeDrawerClose} selectedProduct={selectedProduct} />
        </Drawer>
      </Drawer>
    </Drawer>
  </div >
}
export default CalculateInstance;