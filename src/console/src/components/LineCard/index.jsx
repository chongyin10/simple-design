import React from "react"
import './index.less'
import {Statistic, Row, Col, Card} from 'antd'
import { ArrowUpOutlined } from '@ant-design/icons'
function LineCard({headline,value,}){
  return <Card bordered={false}>
    <Statistic
      title={headline}
      value={value}
      precision={2}
      valueStyle={{
        color: 'black',
      }}
    />
  </Card>
}

export default LineCard