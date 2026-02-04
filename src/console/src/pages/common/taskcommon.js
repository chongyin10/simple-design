import { Space, Tooltip, Button, Table, message } from 'antd'
import { InfoCircleOutlined } from '@ant-design/icons'
import LineCard from '../../components/LineCard'
import Compound from '../../components/Compount'
import engineApi from '../../services/engineApi'
import intl from 'react-intl-universal';

export const selectOption = [
  {
    value: 'createTime',
    label: '注册时间',
  },
  {
    value: 'LastLoginTime',
    label: '最近一次登录时间',
  }
]

export const statusMenu = [
  {
    value: 'PENDING',
    label: '等待中',
  },
  {
    value: 'RUNNING',
    label: '运行中',
  },
  {
    value: 'FAIL',
    label: '异常',
  },
  {
    value: 'CANCEL',
    label: '已终止',
  },
  {
    value: 'FINISH',
    label: '已结束',
  }
]

export function takeCloumes({history, getList, taskTags}){
  const columns = [
    {
      title: intl.get('ASSIGNMENT'),
      dataIndex: 'user',
      key: 'user',
      fixed: 'left',
      width: 300,
      render: (text, _) => <div style={{overflow: 'hidden'}}><Compound history={history} name={_.name} id={_.id} /></div>
    },
    {
      title: intl.get('ASSIGNMENT')+intl.get('PRIORITY'),
      dataIndex: 'priority',
      key: 'priority',
      width: 120,
      editable: true,
      sorter: (a, b) => a.age - b.age,
    },
    {
      title: intl.get('STATUS'),
      dataIndex: 'status',
      key: 'status',
      width: 120,
      render: (text) => <div>
          {statusMenu.map(item => {
            if (item.value === text) {
              return <div key={item.value}>{item.label}</div>
            }
          })}
        </div>
    },
    {
      title: (<div style={{display: 'flex', justifyContent: 'space-between'}}>
        <Space>GPU {intl.get('ALLOCATED_QUANTITY')}/{intl.get('APPLY_FOR_QUSNTITY')}</Space>
        <Space>
          <Tooltip title={intl.get('REQUEST_VOLUME_IS_MORE_MORE_WORDS')} mouseEnterDelay={0.5}> 
            <InfoCircleOutlined />
          </Tooltip>  
        </Space>
      </div>),
      width: 210,
      dataIndex: 'GPU',
      key: 'GPU',
      render: (text, _) => <div style={{fontSize: 18}}>
        {_?.resource?.gpuScheduled}&nbsp;&nbsp;/&nbsp;&nbsp;{_?.resource?.gpuNumber} <span style={{fontSize: 12}}>{_?.resource?.cpuUnit}</span>个 <br />
        <div style={{fontSize: 15, color: '#999'}}>{_?.resource?.gpuShownName}</div>
      </div>
    },
    {
      title: (<div style={{display: 'flex', justifyContent: 'space-between'}}>
        <Space>CPU {intl.get('ALLOCATED_QUANTITY')}/{intl.get('APPLY_FOR_QUSNTITY')}</Space>
        <Space>
          <Tooltip title={intl.get('REQUEST_VOLUME_IS_MORE_MORE_WORDS')} mouseEnterDelay={0.5}> 
            <InfoCircleOutlined />
          </Tooltip>  
        </Space>
      </div>),
      width: 210,
      dataIndex: 'CPU',
      key: 'CPU',
      render: (text, _) => <div style={{fontSize: 18}}>
        {_?.resource?.cpuScheduled}&nbsp;&nbsp;/&nbsp;&nbsp;{_?.resource?.cpuNumber} <span style={{fontSize: 12}}>{_?.resource?.cpuUnit}</span> 核
      </div>

    },
    {
      title: (<div style={{display: 'flex', justifyContent: 'space-between'}}>
        <Space>{intl.get('MEMORY')}{intl.get('ALLOCATED_QUANTITY')}/{intl.get('APPLY_FOR_QUSNTITY')}</Space>
        <Space>
          <Tooltip title={intl.get('REQUEST_VOLUME_IS_MORE_MORE_WORDS')} mouseEnterDelay={0.5}> 
            <InfoCircleOutlined />
          </Tooltip>  
        </Space>
      </div>),
      width: 210,
      dataIndex: 'mem',
      key: 'mem',
      render: (text, _) => <div style={{fontSize: 18}}>{_?.resource?.memScheduled}&nbsp;&nbsp;/&nbsp;&nbsp;{_?.resource?.memNumber} <span style={{fontSize: 12}}>{_?.resource?.memUnit}</span>GB</div>
    },
    {
      title: intl.get('BELONG') + intl.get('REGION'),
      dataIndex: 'region',
      width: 100,
      key: 'region',
      render: (text, _) => <div>{_?.appInfo?.area}</div>
    },
    {
      title: intl.get('BELONG') + intl.get('INSTANCE'),
      dataIndex: 'insId',
      key: 'insId',
      width: 300,
      render: (text, _) => <div>{text && text.length > 0 ? text.join() : ''}</div>
    },
    {
      title: intl.get('BELONG') + intl.get('PRODUCT_FUNCTION'),
      dataIndex: 'lastLoginTime',
      key: 'lastLoginTime',
      width: 180,
      render: (text, _) => <div>
        {/* {_?.appInfo?.topApp}/{_?.appInfo?.module} */}
        {taskTags.map(item => item.value === _?.appInfo?.module && item.label)}
      </div>
    },
    {
      title: intl.get('BELONG') + intl.get('TEAM_MENU_PROJECT'),
      dataIndex: 'ownerproject',
      key: 'ownerproject',
      width: 200,
      render: (text, _) => <div>{_?.appInfo?.projectName}</div>
    },
    {
      title: intl.get('TEAM_COST_ORDER_CREATE_TIME'),
      dataIndex: 'createTIme',
      key: 'createTIme',
      width: 200,
      sorter: (a, b) => a.age - b.age,
      render: (text, _) => <div>{_?.timeInfo?.createTimestamp}</div>
  
    },
    {
      title: intl.get('RUNTIME'),
      dataIndex: 'duringSecond',
      key: 'duringSecond',
      width: 150,
      sorter: (a, b) => a.age - b.age,
      render: (text, _) => <div>{_?.timeInfo?.duringSecond}</div>
    },
    {
      title: intl.get('CREATOR'),
      dataIndex: 'creator',
      key: 'creator',
      render: (text, _) => <div>{_?.ownerInfo?.userName}</div>
  
    },
    {
      title: intl.get('OPERATE'),
      dataIndex: 'operate',
      key: 'operate',
      width: 100,
      fixed: 'right',
      
      render: (text, _) => <Button 
      disabled={_.status !== 'PENDING' && _.status !== 'RUNNING'} 
      type='link' 
      onClick={() => killPod(_, getList)}>{intl.get('SHUTDOWNKERNEL')}</Button> 
    }
  ];

  return columns
}

const killPod = (item, getList) => {
  const {name, appInfo: {areaId}} = item
  const payload = {
    name,
    areaId
  }
  engineApi.KillPod(payload)
    .then(res => {
      getList()
      message.success(intl.get('ALREADY_SHUTDOWN'))
    })
}


export const columnsDe = () => {
  const columns = [
    {
      title: intl.get('ASSIGNMENT'),
      dataIndex: 'jobid',
      key: 'jobid',
      fixed: 'left',
    },
    {
      title: intl.get('STATUS'),
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: intl.get('NODE')+'IP',
      dataIndex: 'instanceIp',
      key: 'instanceIp',
    },
    {
      title: intl.get('MACHINE')+'IP',
      dataIndex: 'machineIp',
      key: 'machineIp',
    },
    {
      title: (<div style={{display: 'flex', justifyContent: 'space-between'}}>
        <Space>GPU {intl.get('ALLOCATED_QUANTITY')}/{intl.get('APPLY_FOR_QUSNTITY')}</Space>
        <Space>
          <Tooltip title={intl.get('REQUEST_VOLUME_IS_MORE_MORE_WORDS')} mouseEnterDelay={0.5}> 
            <InfoCircleOutlined />
          </Tooltip>  
        </Space>
      </div>),
      width: 210,
      dataIndex: 'GPU',
      key: 'GPU',
      render: (text, _) => <div style={{fontSize: 18}}>
        {_?.resource?.gpuScheduled}&nbsp;&nbsp;/&nbsp;&nbsp;{_?.resource?.gpuNumber} <span style={{fontSize: 12}}>{_?.resource?.gpuUnit}</span> <br />
        <div style={{fontSize: 15, color: '#999'}}>{_?.resource?.gpuShownName}</div>
      </div>
    },
    {
      title: (<div style={{display: 'flex', justifyContent: 'space-between'}}>
        <Space>CPU {intl.get('ALLOCATED_QUANTITY')}/{intl.get('APPLY_FOR_QUSNTITY')}</Space>
        <Space>
          <Tooltip title={intl.get('REQUEST_VOLUME_IS_MORE_MORE_WORDS')} mouseEnterDelay={0.5}> 
            <InfoCircleOutlined />
          </Tooltip>  
        </Space>
      </div>),
      width: 210,
      dataIndex: 'CPU',
      key: 'CPU',
      render: (text, _) => <div style={{fontSize: 18}}>
        {_?.resource?.cpuScheduled}&nbsp;&nbsp;/&nbsp;&nbsp;{_?.resource?.cpuNumber} <span style={{fontSize: 12}}>{_?.resource?.cpuUnit}</span>
      </div>

    },
    {
      title: (<div style={{display: 'flex', justifyContent: 'space-between'}}>
        <Space>{intl.get('MEMORY')}{intl.get('ALLOCATED_QUANTITY')}/{intl.get('APPLY_FOR_QUSNTITY')}</Space>
        <Space>
          <Tooltip title={intl.get('REQUEST_VOLUME_IS_MORE_MORE_WORDS')} mouseEnterDelay={0.5}> 
            <InfoCircleOutlined />
          </Tooltip>  
        </Space>
      </div>),
      width: 210,
      dataIndex: 'mem',
      key: 'mem',
      render: (text, _) => <div style={{fontSize: 18}}>{_?.resource?.memScheduled}&nbsp;&nbsp;/&nbsp;&nbsp;{_?.resource?.memNumber} <span style={{fontSize: 12}}>{_?.resource?.memUnit}</span></div>
    },
    {
      title: intl.get('TEAM_COST_ORDER_CREATE_TIME'),
      dataIndex: 'createTime',
      key: 'createTime',
      sorter: (a, b) => a.age - b.age,
      render: (text, _) => <div>{_?.timeInfo?.createTimestamp}</div>,

    },
    {
      title: intl.get('RUNTIME'),
      dataIndex: 'duringSecond',
      key: 'duringSecond',
      sorter: (a, b) => a.age - b.age,
      render: (text, _) => <div>{_?.timeInfo?.duringSecond}</div>,
    },
    {
      title: intl.get('TEAM_APPROVE_MY_TABLE_OPERATE'),
      dataIndex: 'opearte',
      key: 'opearte',
      fixed: 'right',
      render: () => <div><Button danger type="link">{intl.get('TERMINATION')}</Button></div>
    }
  ];
  return columns;
}