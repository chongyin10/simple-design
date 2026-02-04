import { useState, useEffect} from 'react'
import { title } from '../common'
import { Button, Space } from 'antd'
import { RightOutlined } from '@ant-design/icons';
import comApi from '../../../serviceApi/commonApi'
import MiniChart from '../../../components/Chart/MiniChart';
import engineApi from '../../../services/engineApi';
import { lastVisitApp } from '../../../components/header/api/areaApi';
import intl from 'react-intl-universal';


import { useReactive } from 'ahooks'
import { useHistory } from "react-router"

function Container(){
  const [instanceNum, setInstanceNum] = useState(0);
  const [expireInstantce, setExpireInstantce] = useState(0);
  const [jobNum, setJobNum] = useState(0);
  const [monitor, setMonitor] = useState({})
  const [allStorage, setAllstorage] = useState({})

  const history = useHistory();

  let taskList = useReactive({
    current: 1,
    size: 10,
    total: 0,
    data: []
  });

  

  useEffect(() => {
    getJobList()
  }, [ taskList.current, taskList.size])
  
  useEffect(() => {
    getInstanceList()
    getInstances()
    getStorage()
    getInstanceListExpire()
  }, [])
  
  const getInstances = () => {
    engineApi.getInstances({ areaId: '-1' })
      .then(res => {
        setMonitor(res.data)
      })
  }

  const getStorage = () => {
    engineApi.getStorage({ areaId: '-1' })
      .then(res => {
        setAllstorage(res.data)
      })
  }


  
  function getInstanceList(){
    const payload = {
      pageIndex: 1,
      pageSize: 1,
      productType: 'instance',
      status: 'running',
    }
    comApi.resourceList(payload)
      .then(res => {
        setInstanceNum(res.data.total)
      })
  }
  function getInstanceListExpire(){
    let currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 7);
    const payload = {
      pageIndex: 1,
      pageSize: 1,
      productType: 'instance',
      status: 'running',
      expireTime: currentDate
    }
    comApi.resourceList(payload)
      .then(res => {
        // setInstanceNum(res.data.total)
        setExpireInstantce(res.data.total)
      })
  }

  function getJobList(){
    comApi.getTakeList({current: taskList.current, size: taskList.size})
      .then(res => {
        const { data, total } = res.data
        setJobNum(total)
        taskList.data = data
        taskList.total = total
      })
      .catch(err => console.log(err, ''))
  }

  function jump(url){

    window.location.href = url
  }

  const selectApp = (path) => {

      lastVisitApp(10200).then((res) => {
        window.location.href = `${res.data.areaUrl}${path}`;
      }).catch((err) => {
        console.log(err);
        Modal.warning({
          content: <>{intl.get('USEING')} {`IDP LM`} {intl.get('PLEASE_PURCHASE_RESOURCE')}</>
        });
      });
  }

  return <>
    <div className="navigator border">
      {title(intl.get('BRISK_NAVIGATION'))}
      <Space className='row bg'>
        {title(intl.get('COMPUTILITY'))}
        <Button type='link' onClick={() => jump('/gallery/computility')}>{intl.get('PURCHASE_COMPUTE_INSTANCE')}</Button>
        <Button type='link' onClick={() => history.push('/instancemanage/calculateinstance')}>{intl.get('CALCULATION_INSTANCE')}{intl.get('MANAGEMENT')}</Button>
      </Space>
      <Space className='row bg'>
        {title(intl.get('MODEL'))}
        <Button type='link' onClick={() => jump('/gallery/gallery')}>{intl.get('MODEL')}{intl.get('SQUALRE')}</Button>
        <Button type='link' onClick={() => jump('/aimarket/modelservice')}>{intl.get('MODEL')}{intl.get('SERVICE')}</Button>
        <Button type='link' onClick={() => selectApp('/lm/modelmanagement')}>{intl.get('MODEL')}{intl.get('TRANING')}</Button>
        <Button type='link' onClick={() => selectApp('/lm/datasetmanagement')}>{intl.get('DATA')}{intl.get('MANAGEMENT')}</Button>
      </Space>
      {/* <Space className='row bg'>
        {title('其他')}
        <Button type='link'>镜像管理</Button>
        <Button type='link'>容器管理</Button>
      </Space> */}
    </div>
    <div className='compute-instance-monitor border'>
      {title(`${intl.get('CASE_MANAGEMENT')}${intl.get('MONITOR')}`)}
      <div className='my-content'>
        <div className='instance'>
          <Space className='bg item'>
            <span className='num'>{instanceNum}</span>
            <span>{intl.get('CALCULATION_INSTANCE')}</span>
            <span style={{color: '#52C41A'}}>{intl.get('RUNNING')}</span>
            <Button icon={<RightOutlined />} type='link' onClick={() => history.push('/instancemanage/calculateinstance')} />
          </Space>
          <Space className='bg item'>
            <span className='num'>{expireInstantce}</span>
            <span>{intl.get('CALCULATION_INSTANCE')}</span>
            <span style={{color: '#FF4D4F'}}>{intl.get('SONN_EXPIRE')}</span>
            <Button icon={<RightOutlined />} type='link' onClick={() => history.push('/instancemanage/calculateinstance')} />
          </Space>
          <Space className='bg item'>
            <span className='num'>{taskList.total}</span>
            <span>{intl.get('ASSIGNMENT')}{intl.get('TASK')}</span>
            <span style={{color: '#52C41A'}}>{intl.get('RUNNING')}</span>
            <Button icon={<RightOutlined />} type='link' onClick={() => history.push('/instancemanage/task')} />
          </Space>
        </div>
        <div className='mymonitor'>
          <div className='monitor-container'>
            <div className='monitor-item bg'>
              <MiniChart name={'CPU'} unit={monitor?.cpuUnit}  percent={monitor?.cpuAllocatedRate} all={monitor?.cpuNumber} allocated={monitor?.cpuAllocated} />
            </div>
            <div className='monitor-item bg'>
              <MiniChart name={'GPU'} unit={monitor?.gpuUnit}  percent={monitor?.gpuAllocatedRate} all={monitor?.gpuNumber} allocated={monitor?.gpuAllocated} />
            </div>
            <div className='monitor-item bg'>
              <MiniChart name={intl.get('MEMORY')} unit={monitor?.memUnit}  percent={monitor?.memAllocatedRate} all={monitor?.memNumber} allocated={monitor?.memAllocated} />
            </div>
          </div>
        </div>
      </div>
    </div>
    {/* <div className='story-monitor border'>
      {title(`${intl.get('STORAGE')}${intl.get('MONITOR')}`)}
      <div className='item bg'>
        <MiniChart name={`${intl.get('STORAGE')}${intl.get('CAPCITY')}`} unit={allStorage?.unit} percent={allStorage?.allocatedRate} all={allStorage?.number} allocated={allStorage?.allocated} />
      </div>
    </div> */}
  </>
}

export default Container