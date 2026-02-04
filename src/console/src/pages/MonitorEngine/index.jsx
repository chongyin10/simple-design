
import { RedoOutlined } from '@ant-design/icons';
import engineApi from '../../services/engineApi';
import React, { useEffect, useState } from "react";
import MiniChart from '../../components/Chart/MiniChart';
import { Select, Space, Input, Button, Table, Drawer } from 'antd'
import './index.less'
function Monitor(){

  const [monitorSelect, setMonitorSelect] = useState(-1)
  const [area, setArea] = useState([]);
  const [monitor, setMonitor] = useState({})

  const [allStorage, setAllstorage] = useState({})


  useEffect(() => {
    getInstances()
    getStorage()
  }, [monitorSelect])
  useEffect(() => {
    getArea()
  }, [])


  const getStorage = () => {
    engineApi.getStorage({ areaId: monitorSelect })
      .then(res => {
        setAllstorage(res.data)
      })
  }

  const getInstances = () => {
    engineApi.getInstances({ areaId: monitorSelect })
      .then(res => {
        setMonitor(res.data)
      })
  }

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


  return <div className='monitor'>
    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 20}}>
      <div>监控概览</div>
      <div>
        <Space>地域：</Space>
        <Space>
          <Select
            value={monitorSelect}
            style={{ width: 150 }}
            onChange={(e) => setMonitorSelect(e)}
            options={area}
          />
        </Space>
      </div>
    </div>
    
    <div style={{display: 'flex', justifyContent: 'space-between'}}>
      <div style={{display: 'flex', justifyContent: 'space-between', flex: '1', flexDirection: 'column'}} className="first">
        <div className="head_line">计算实例</div>
        <div style={{display: 'flex', justifyContent: 'space-around', alignItems: 'center'}} className="right">
          <MiniChart name={'CPU'} unit={monitor?.cpuUnit}  percent={monitor?.cpuAllocatedRate} all={monitor?.cpuNumber} allocated={monitor?.cpuAllocated} />
          <MiniChart name={'GPU'} unit={monitor?.gpuUnit}  percent={monitor?.gpuAllocatedRate} all={monitor?.gpuNumber} allocated={monitor?.gpuAllocated} />
          <MiniChart name={'内存'} unit={monitor?.memUnit}  percent={monitor?.memAllocatedRate} all={monitor?.memNumber} allocated={monitor?.memAllocated} />
        </div>
      </div>
      <div style={{display: 'flex', justifyContent: 'space-around', width: 300, flexDirection: 'column'}} className="second" >
        <div className="head_line">存储实例</div>
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}} className="right">
          {/* <MiniChart name={'CPU'} unit={monitor?.cpuUnit}  percent={monitor?.cpuAllocatedRate} all={monitor?.cpuNumber} allocated={monitor?.cpuAllocated} /> */}
          <div className="right" style={{height: 233}}>
            <div className='therow'>
              {/* {monitorSelect==-1? <div className='wrapper'>
                <MiniChart name={'全部地域'} unit={allStorage?.unit} percent={allStorage?.allocatedRate} all={allStorage?.number} allocated={allStorage?.allocated} />
              </div> : storage.map((item, index) => <div className='wrapper' key={index}><MiniChart unit={item?.unit} name={item?.shownName} percent={item?.allocatedRate} all={item?.number} allocated={item?.allocated} /></div>)} */}
              <MiniChart name={'存储容量'} unit={allStorage?.unit} percent={allStorage?.allocatedRate} all={allStorage?.number} allocated={allStorage?.allocated} />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
}
export default Monitor