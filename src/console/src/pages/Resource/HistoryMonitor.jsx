import React, { useState, useEffect, useMemo } from 'react';
import { Row, Col, Select, DatePicker } from 'antd';
import { Line } from '@ant-design/plots';
import dayjs from 'dayjs';
import { resourceUsageHistory } from '../../serviceApi/resourceApi';

/* react/react-in-jsx-scope*/
const HistoryMonitor = (props) => {
  const [monitorData, setMonitorData] = useState([]);
  const [timeRange, setTimeRange] = useState('12h');
  const asyncFetch = (start, end ,step) => {
    let json = [];
    resourceUsageHistory({ start, end, step }).then(res => {
      for (const item of res.data) {
        json.push({
          date: dayjs(item.date).format('YYYY-MM-DD HH:mm:ss'),
          value: Math.floor(item.usage * 100),
          category: item.category,
        })
      }
      setMonitorData(json);
    })
  };
  useEffect(() => {
    onSelectTimeRange('1h');
  }, []);

  const trend = useMemo(() => {
    return {
      data: monitorData,
      xField: 'date',
      yField: 'value',
      seriesField: 'category',
      yAxis: {
        label: {
          formatter: (v) => `${v}%`,
        },
      },
      meta: {
        value: {
          min: 0,
          max: 100,
        }
      },
      slider: {
        start: 0,
        end: 1,
      },
      color: ['#5794F2', '#B877D9', '#73BF69', '#FF780A'],
    }
  }, [monitorData])

  // 选择时间范围
  const onSelectTimeRange = (value) => {
    console.log(value)
    setTimeRange(value);
    let end = dayjs().format('YYYY-MM-DDTHH:mm:ss')
    let start = null
    let step = 5
    switch (value) {
      case '1h':
        start = dayjs().subtract(1, 'hour').format("YYYY-MM-DDTHH:mm:ss")
        step = 1
        break;
      case '12h':
        start = dayjs().subtract(12, 'hour').format("YYYY-MM-DDTHH:mm:ss")
        step = 1
        break;
      case '24h':
        start = dayjs().subtract(24, 'hour').format("YYYY-MM-DDTHH:mm:ss")
        break;
      case '2d':
        start = dayjs().subtract(2, 'day').format("YYYY-MM-DDTHH:mm:ss")
        break;
      case '7d':
        start = dayjs().subtract(7, 'day').format("YYYY-MM-DDTHH:mm:ss")
        break;
      case '30d':
        start = dayjs().subtract(30, 'day').format("YYYY-MM-DDTHH:mm:ss")
        step = 30;
        break;
      default:
        break;
    }
    asyncFetch(start, end, step);
  }

  // 控制日期选择不超过1个月
  const [dates, setDates] = useState([]);
  const [hackValue, setHackValue] = useState();
  const [rangeValue, setRangeValue] = useState();
  const disabledDate = current => {
    if (!dates || dates.length === 0) {
      return false;
    }
    const tooLate = dates[0] && current.diff(dates[0], 'days') > 31;
    const tooEarly = dates[1] && dates[1].diff(current, 'days') > 31;
    return tooEarly || tooLate;
  };
  const onOpenChange = open => {
    if (open) {
      setHackValue([]);
      setDates([]);
      setRangeValue([])
    } else {
      setHackValue(undefined);
    }
  };
  const onDateChange = (date, dateString) => {
    console.log(date, dateString);
    setRangeValue(date);
    setTimeRange(dateString[0] + ' ~ ' + dateString[1]);
    let step = 5;
    const days = date[1].diff(date[0], 'days');
    if (days > 7) {
      step = 30;
    }
    asyncFetch(dateString[0] + 'T00:00:00', dateString[1] + 'T00:00:00', step);
  }

  return (
    <div>
      <Row className="resource-title">
        <Col span={18}><b>历史使用曲线</b></Col>
        <Col span={6}>
          <Select style={{ width: '225px' }} value={timeRange} onSelect={onSelectTimeRange}>
            <Select.Option value="1h">过去1小时</Select.Option>
            <Select.Option value="12h">过去12小时</Select.Option>
            <Select.Option value="24h">过去24小时</Select.Option>
            <Select.Option value="2d">过去2天</Select.Option>
            <Select.Option value="7d">过去7天</Select.Option>
            <Select.Option value="30d">过去30天</Select.Option>
          </Select>
          <DatePicker.RangePicker
            allowClear={false}
            style={{ height: '32px' }}
            value={hackValue || rangeValue}
            disabledDate={disabledDate}
            onCalendarChange={val => setDates(val)}
            onChange={onDateChange}
            onOpenChange={onOpenChange}
          />
        </Col>
      </Row>
      <Row className="resource-body">
        <Col span={24}>
          <Line {...trend} />
        </Col>
      </Row>
    </div>
  )
}

export default HistoryMonitor;