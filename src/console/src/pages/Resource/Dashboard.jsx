import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Button, Progress } from 'antd';
import { resourceUsageCurrent } from '../../serviceApi/resourceApi';
import {useHistory} from "react-router"

const Dashboard = (props) => {
  const usageColor = (value) => {
    if (value < 0.6) {
      return '#52C41A'
    } else if (value < 0.8) {
      return '#FAAD14'
    } else {
      return '#FF4D4F'
    }
  }
  const usageData = (value) => {
    return {
      percent: Math.floor(value * 100),
      strokeLinecap: 'square',
      type: 'circle',
      strokeColor: usageColor(value),
      width: 83,
      strokeWidth: 10,
    }
  }

  const [totalCpu, setTotalCpu] = useState(0);
  const [cpuUsage, setCpuUsage] = useState(usageData(0));
  const [totalGpu, setTotalGpu] = useState(0);
  const [gpuUsage, setGpuUsage] = useState(usageData(0));
  const [totalMemory, setTotalMemory] = useState(0);
  const [memoryUsage, setMemoryUsage] = useState(usageData(0));
  const [totalDisk, setTotalDisk] = useState(0);
  const [diskUsage, setDiskUsage] = useState(usageData(0));

  const history = useHistory()

  const asyncFetch = () => {
    resourceUsageCurrent().then(res => {
      for (const item of res.data) {
        if (item.category === 'cpu') {
          setTotalCpu(item.total);
          setCpuUsage(usageData(item.usage));
        } else if (item.category === 'gpu') {
          setTotalGpu(item.total);
          setGpuUsage(usageData(item.usage));
        } else if (item.category === 'memory') {
          setTotalMemory(item.total);
          setMemoryUsage(usageData(item.usage));
        } else if (item.category === 'disk') {
          setTotalDisk(item.total);
          setDiskUsage(usageData(item.usage));
        }
      }
    })
  }

  useEffect(() => {
    asyncFetch();
    const interval = setInterval(() => {
      asyncFetch();
    }, 60 * 1000);
    return () => clearInterval(interval);
  }, [])

  return (
    <div>
      <Row className="resource-title">
        <Col span={22} style={{ fontSize: '18px' }}><b>当前使用率</b></Col>
        <Col span={2}>
          <Button type="link" onClick={()=>{
            history.push(process.env.REACT_APP_VERSION==='SAAS'?'/submitOrder':'/addResource')
          }}>增加资源</Button>
        </Col>
      </Row>
      <Row className="resource-body">
        <Col span={6} style={{ paddingRight: '10px' }}>
          <Card bodyStyle={{ padding: 10 }}>
            <p style={{ textAlign: 'center' }}><b>{totalCpu}</b> 核CPU，当前使用率</p>
            <div style={{ textAlign: 'center', paddingTop: '10px' }}>
              <Progress {...cpuUsage} />
            </div>
          </Card>
        </Col>
        <Col span={6} style={{ paddingLeft: '3px', paddingRight: '7px' }}>
          <Card bodyStyle={{ padding: 10 }}>
            <p style={{ textAlign: 'center' }}><b>{totalGpu}</b> 个GPU，当前使用率</p>
            <div style={{ textAlign: 'center', paddingTop: '10px' }}>
              <Progress {...gpuUsage} />
            </div>
          </Card>
        </Col>
        <Col span={6} style={{ paddingLeft: '7px', paddingRight: '3px' }}>
          <Card bodyStyle={{ padding: 10 }}>
            <p style={{ textAlign: 'center' }}><b>{totalMemory}</b> GB内存，当前使用率</p>
            <div style={{ textAlign: 'center', paddingTop: '10px' }}>
              <Progress {...memoryUsage} />
            </div>
          </Card>
        </Col>
        <Col span={6} style={{ paddingLeft: '10px' }}>
          <Card bodyStyle={{ padding: 10 }}>
            <p style={{ textAlign: 'center' }}><b>{totalDisk} </b> GB存储，当前使用率</p>
            <div style={{ textAlign: 'center', paddingTop: '10px' }}>
              <Progress {...diskUsage} />
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default Dashboard;
