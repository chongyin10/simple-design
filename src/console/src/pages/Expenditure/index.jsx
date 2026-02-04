import React, { useState, useEffect, useMemo } from 'react';
import './index.less'
import { Label, Flex, Table, Input, Button, Select } from '@zjpcy/simple-design';
import Apis from '../../serviceApi/cost';
import { DatePicker } from 'antd';

const { RangePicker } = DatePicker;

const actionType = {
    add: '增加',
    deduct: '扣除',
    reset: '重置',
    consume: '消费'
}

function Expenditure() {

    const [logSize, setLogSize] = useState(10);
    const [logTotal, setLogTotal] = useState(0);
    const [logCurrent, setLogCurrent] = useState(1);
    const [searchLogInfo, setSearchLogInfo] = useState('');
    const [tableLogLoadding, setTableLogLoadding] = useState(false);

    const [logData, setLogData] = useState([]);

    const [score, setScore] = useState(0);

    const [logAction, setLogAction] = useState('');
    const [lotTime, setLogTime] = useState({
        startTime: '',
        endTime: '',
    });


    useEffect(() => {
        getTeamCurrentScoreApi();
    }, [])

    useEffect(() => {
        getScoreUserChangeLogListApi({ size: logSize, current: logCurrent, searchInfo: searchLogInfo, action: logAction, startTime: lotTime.startTime, endTime: lotTime.endTime })
    }, [logAction, lotTime, searchLogInfo])

    const getScoreUserChangeLogListApi = (payload) => {
        setTableLogLoadding(true);
        Apis.getScoreUserChangeLogList(payload).then(res => {
            if (res.code >= 20000000 && res.code < 30000000) {
                setLogCurrent(res?.data?.current || 1);
                setLogSize(res?.data.size || logSize);
                setLogTotal(res?.data?.total || 0);
                setLogData(res?.data?.data || []);
            }
        }).finally(() => {
            setTimeout(() => {
                setTableLogLoadding(false);
            }, 1000);
        })
    }

    const getTeamCurrentScoreApi = () => {
        Apis.getTeamCurrentScore().then(res => {
            if (res.code >= 20000000 && res.code < 30000000) {
                setScore(res?.data || 0)
            }
        })
    }

    const logColumns = [
        { dataIndex: 'updateTime', title: '变更时间', width: '160px', align: 'center' },
        { dataIndex: 'teamName', title: '团队名称/ID', width: '180px', align: 'center', render: (_, record) => <Flex>{record?.teamName || '暂无团队'}<br />{record?.teamId}</Flex> },
        { dataIndex: 'action', title: '操作类型', width: '80px', align: 'center', render: (_) => <Flex justify="center">{actionType?.[_]}</Flex> },
        { dataIndex: 'changeScore', title: '变更数值', width: '120px', align: 'center' },
        { dataIndex: 'score', title: '变更后余额', width: '160px', align: 'center' },
        { dataIndex: 'updater', title: '操作者', width: '160px', align: 'center' },
        { dataIndex: 'business_category', title: '关联业务类型', width: '160px', align: 'center' },
        { dataIndex: 'jobId', title: '关联业务ID', width: '160px', align: 'center' },
        { dataIndex: 'intro', title: '备注', width: '160px', align: 'center' },
    ]

    return (
        <Flex gap={10} direction="column">
            <Label style={{ backgroundColor: '#fff', fontSize: '16px' }} title={
                <Flex style={{ width: '100%' }}>
                    <div style={{ flex: '1 auto' }}>积分变更记录</div>
                    <div style={{ fontSize: '13px' }}><span style={{ opacity: .5 }}>团队积分余额</span>: {score}</div>
                </Flex>
            }></Label>
            <Flex gap={10} direction="column">
                <Flex>
                    <div style={{ flex: 1, display: 'flex', gap: '10px' }}>
                        <Input.Search
                            width={300}
                            value={searchLogInfo}
                            onChange={setSearchLogInfo}
                            placeholder="请输入搜索内容"
                            onSearch={() => getScoreUserChangeLogListApi({ size: logSize, current: 1, searchInfo: searchLogInfo, action: logAction, startTime: lotTime.startTime, endTime: lotTime.endTime })}
                        />
                        <Select
                            label="操作类型:"
                            value={logAction}
                            onChange={(value) => setLogAction(value)}
                            placeholder="请选择操作类型"
                            width={200}
                        >
                            <Select.Option value="">全部</Select.Option>
                            {
                                Object.keys(actionType).map(key => (
                                    <Select.Option key={key} value={key}>{actionType[key]}</Select.Option>
                                ))
                            }
                        </Select>
                        <Flex style={{ marginLeft: '10px' }} align="center">时间范围:</Flex>
                        <RangePicker allowClear onChange={(dates, dateStrings) => {
                            setLogTime({
                                startTime: dateStrings[0],
                                endTime: dateStrings[1]
                            })
                        }} format="YYYY-MM-DD" />
                    </div>
                    <Button type="primary">导出数据</Button>
                </Flex>
                <Table
                    columns={logColumns}
                    dataSource={logData}
                    loading={tableLogLoadding}
                    rowKey="id"
                    scroll={{ x: '100%' }}
                    pagination={{
                        total: logTotal,
                        pageSize: logSize,
                        current: logCurrent,
                        showSizeChanger: true,
                        showQuickJumper: true,
                        showTotal: (total, range) => '显示 ' + range[0] + '-' + range[1] + ' 条，共 ' + total + ' 条',
                        onChange: (page, pageSize) => {
                            getScoreUserChangeLogListApi({ size: pageSize, current: page, searchInfo: searchLogInfo, action: logAction, startTime: lotTime.startTime, endTime: lotTime.endTime })
                        }
                    }}
                />
            </Flex>
        </Flex>

    )
}

export default Expenditure;