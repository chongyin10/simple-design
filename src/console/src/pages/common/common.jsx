import engineApi from '../../services/engineApi'
import { message, Popconfirm, Button, Divider } from 'antd'
import Compound from '../../components/Compount'
import cookies from 'react-cookies';
import intl from 'react-intl-universal';

export const statusMenu = [
  {
    value: 'running',
    label: '运行中'
  },
  {
    value: 'expired',
    label: '已到期'
  },
  {
    value: 'retired',
    label: '已退订'
  },
  {
    value: 'retiring',
    label: '退订中'
  },
  {
    value: 'removed',
    label: '已删除'
  },
  {
    value: 'allocation_failed',
    label: '分配失败'
  }
]

export const unsubscribe = (resourceId, getList, data) => {
  console.log(data, 'data')
  data.forEach(item => {
    if(resourceId === item.id){
      item.myOwnerLoader = true;
      engineApi.unsubscribe(resourceId)
      .then(res => {
        message.success('已经退订')
        item.myOwnerLoader = false;
        getList()
      }).catch((_) => {
        item.myOwnerLoader = false;
        getList()
      })
    }
  })
  
}

export const deleteInstance = (resourceId, getList) => {
  engineApi.deleteItem(resourceId)
    .then(res => {
      message.success('已经删除')
      getList()
    })
}

export function storageColumes({getList}){
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '实例名称',
      dataIndex: 'user',
      key: 'user',
      render: (text, _) => <Compound name={_.resourceName} id={_.productId} />
    },
    {
      title: '存储类型',
      dataIndex: 'storageType',
      key: 'storageType',
    },
    {
      title: '容量',
      dataIndex: 'storageCapacity',
      key: 'storageCapacity',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (text) => <div>
        {statusMenu.map(item => {
          if (item.value === text) {
            return <div key={item.value}>{item.label}</div>
          }
        })}
      </div>
    },
    {
      title: '创建时间',
      dataIndex: 'createdTime',
      key: 'createdTime',
      sorter: true,
    },
    {
      title: '订单ID',
      dataIndex: 'orderId',
      key: 'orderId',
      render: (text) => <Compound id={text} />
    },
    {
      title: '计费模式',
      dataIndex: 'chargeType',
      key: 'chargeType',
      render: (text) => <div>
        {chargeTypeMenu().map(item => {
          if (item.value === text) {
            return <div key={item.value}>{item.label}</div>
          }
        })}
      </div>
    },
    {
      title: '续费方式',
      dataIndex: 'autoRenew',
      key: 'autoRenew',
      render: (text) => <div>
        {text? '自动续费' : '手动续费'}
      </div>
    },
    {
      title: '到期时间',
      dataIndex: 'pricingEndTime',
      key: 'pricingEndTime',
      sorter: true
    },
    {
      title: '操作',
      dataIndex: 'operate',
      key: 'operate',
      fixed: 'right',
      render: (text, _) => <div>
        {_.status === 'running'? 
          <Popconfirm
            title="退订"
            description="你确定你要退订该服务?"
            onConfirm={() => {
              unsubscribe(_.id, getList)
            }}
            okText="退订"
            okType='danger'
            cancelText="取消"
          >
            <Button danger>退订</Button>
          </Popconfirm> : 
          <Popconfirm
            title="删除"
            description="你确定你要删除该记录?"
            onConfirm={() => deleteInstance(_.id, getList)}
            okText="删除"
            okType='danger'
            cancelText="取消"
          >
            <Button danger>删除</Button>
          </Popconfirm>}
      </div>
    },
  ];
  return columns
}

export function CalculateColumes({getList, area = [], data}){
  console.log('@area:', area);
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 200,
    },
    {
      title: intl.get('INSTANCE')+intl.get('NAME'),
      dataIndex: 'resourceName',
      key: 'resourceName',
      width: 150,
    },
    {
      title: intl.get('SPECIFICATION')+intl.get('NAME'),
      dataIndex: 'username',
      key: 'username',
      width: 250,
      render: (_, record) => {
        const spec = record.instanceSpecification;
        return <div>
          
          <p>{Boolean(spec.gpuCount) && `${spec.gpuVendor} ${spec.gpuModel} ${spec.gpuMemory}GB * ${spec.gpuCount}卡`}</p>
          <p>{`${spec.cpuCore}核 ${spec.memory}GB`}</p>
        </div>
      }
    },
    {
      title: intl.get('BELONG')+intl.get('REGION'),
      dataIndex: 'regionName',
      key: 'regionName',
      width: 120,
    },
    {
      title: intl.get('STATUS'),
      dataIndex: 'status',
      key: 'status',
      width: 80,
      render: (text) => <div>
        {statusMenu.map(item => {
          if (item.value === text) {
            return <div key={item.value}>{item.label}</div>
          }
        })}
      </div>
    },
    {
      title: intl.get('TEAM_COST_ORDER_CREATE_TIME'),
      dataIndex: 'createdTime',
      key: 'createdTime',
      width: 200,
      sorter: true,
    },
    {
      title: intl.get('TEAM_MENU_COST_ORDER'),
      dataIndex: 'orderId',
      key: 'orderId',
      width: 200,
    },
    {
      title:  intl.get('TEAM_COST_ORDER_CHARGE_MODE'),
      dataIndex: 'chargeType',
      key: 'chargeType',
      width: 100,
      render: (text) => <div>
        {chargeTypeMenu().map(item => {
          if (item.value === text) {
            return <div key={item.value}>{item.label}</div>
          }
        })}
      </div>
    },
    {
      title: intl.get('RENEWAL_METHOD'),
      dataIndex: 'autoRenew',
      key: 'autoRenew',
      width: 100,
      render: (text) => <span>{text ? intl.get('AUTOMATIC_RENEWAL') : intl.get('MANUAL_RENEWAL')}</span>
    },
    {
      title: intl.get('EXPIRATION_TIME'),
      dataIndex: 'pricingEndTime',
      key: 'pricingEndTime',
      width: 200,
      sorter: true
    },
    {
      title: intl.get('MACHINE')+'id',
      dataIndex: 'serverId',
      key: 'serverId',
    },
    {
      title: intl.get('JOB_LIST'),
      dataIndex: 'jobs',
      key: 'jobs',
      render: (text) => {
      return <div>
        {text ? text.substr(1, text.length-2).replaceAll('idp-', '') : ''}
      </div>}
    },
    {
      title: intl.get('OPERATE'),
      dataIndex: 'operate',
      key: 'operate',
      fixed: 'right',
      width: 180,
      render: (text, _) => <div>
        {
          _.status !== 'retiring' ?
          <>
            <Popconfirm
              title={intl.get('TEAM_COST_ORDER_TYPE_CANCEL')}
              description={intl.get('ARE_YOU_SURE_UNSUBSCRIBE_THE_SERVOCE')}
              onConfirm={() => unsubscribe(_.id, getList, data)}
              okText={intl.get('TEAM_COST_ORDER_TYPE_CANCEL')}
              okType='danger'
              cancelText={intl.get('CANCEL')}
              disabled={_.status !== 'running'}
            >
              <Button loading={_.myOwnerLoader} type='link' onClick={()=> {
                if ( _.status !== 'running') {
                  message.warning(intl.get('A_COMPUTE_INSTANTCE_NOT_RUNING_CANNOT_BE_UNSUBSCRIBED'))
                  return;
                }
              }} style={{color: _.status === 'running' ? '#1890ff' : 'gray', padding: 0}}>{intl.get('TEAM_COST_ORDER_TYPE_CANCEL')}</Button>
            </Popconfirm>
            <Divider type="vertical"></Divider>
            <span onClick={()=> {
              if ( _.status !== 'running') {
                message.warning(intl.get('A_COMPUTE_INSTANCE_THAT_NOT_RUNING_CANNOT_BE_UNSUBSCRIBED'))
                return;
              }
              const record = area.find(item => item.id == Number(_.regionId));
              top.location.href = process.env.NODE == 'dev' ? '/teamSpace/containerService?r=management' : `${record.areaUrl}/teamSpace/containerService?r=management`
            }} style={{color: _.status === 'running' ? '#1890ff' : 'gray', cursor: 'pointer'}}>{intl.get('STARTER_CONTAINER')}</span>
            <Divider type="vertical"></Divider>
            <Popconfirm
              title={intl.get('DELETE')}
              description={intl.get('ARE_YOU_SURE_DELETE_THE_RECORD')}
              onConfirm={() => deleteInstance(_.id, getList)}
              okText={intl.get('DELETE')}
              okType='danger'
              style={{display: 'flex'}}
              cancelText={intl.get('CANCEL')}
              disabled={_.status == 'running'}
              overlayClassName="sw-instancemanage-popconfirm"
            >
              <span onClick={()=> {
                if ( _.status == 'running') {
                  message.warning(intl.get('A_RUNNING_COMPUTE_INSTANCE_CANNOT_BE_DELETED'))
                  return;
                }
              }} style={{color: _.status !== 'running' ? '#1890ff' : 'gray', cursor: _.status !== 'running' ? 'pointer' : 'not-allowed'}}>{intl.get('DELETE')}</span>
            </Popconfirm>
          </>: null
        }
          
      </div>
      
    },
  ];
  return columns
}

export const statueMenu = () => {
  return [
    {
      value: 0,
      label: intl.get('FULL_STATUS'),
    },
    {
      value: 'running',
      label: intl.get('RUNNUING'),
    },
    {
      value: 'expired',
      label: intl.get('WAS_DUE'),
    },
    {
      value: 'retiring',
      label: intl.get('RETIRING'),
    },
    {
      value: 'retired',
      label: intl.get('RETIRED'),
    },
  ]

}



export const chargeTypeMenu = () => [
  {
    value: 0,
    label: intl.get('FULL_MODEL'),
  },
  {
    value: 'Dynamic',
    label: intl.get('CHARGE_BY_VOLUME'),
  },
  {
    value: 'Month',
    label: intl.get('AT_MONTH'),
  },
  {
    value: 'Daily',
    label: intl.get('AT_DAY'),
  },
]

export const autoRenewMenu = () =>  [
  {
    value: 0,
    label: intl.get('ALL_MODE'),
  },
  {
    value: false,
    label: intl.get('NO_AUTOMATIC_RENEWAL'),
  },
  {
    value: true,
    label: intl.get('AUTOMATIC_RENEWAL'),
  },
]

export function rank(pagination, filters, sorter, tableState){
  const { current, pageSize} = pagination
    tableState.pageIndex = current;
    tableState.pageSize = pageSize;

    if (sorter.field === "createdTime") {
      if(!tableState.createTimeSort) tableState.createTimeSort = 'asc';
      else if(tableState.createTimeSort === 'asc') tableState.createTimeSort = 'desc';
      else if(tableState.createTimeSort === 'desc') tableState.createTimeSort = '';
    }

    if(sorter.field === "pricingEndTime"){
      if(!tableState.expireTimeSort) tableState.expireTimeSort = 'asc';
      else if(tableState.expireTimeSort === 'asc') tableState.expireTimeSort = 'desc';
      else if(tableState.expireTimeSort === 'desc') tableState.expireTimeSort = '';
    }
}