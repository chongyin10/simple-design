import React, { Component, useEffect, useState } from 'react';
import { Progress, Table, Tooltip, Tag } from 'antd';
import { toFixedFileName, toPercent } from '../../../utils'
import Api from '../../../serviceApi/monitor';

export const stateCodeMenus = {
    'Fail': '#FFEEEB',
    'Paused': '#EDE6FF',
    'Running': '#FBF5D8',
    'Idle': '#E0F3E3',
    'Init': '#E6E9ED',
    'Success': '#EDFDDC',
    'Killed': '#848484',
    'Pending': '#E6F7FF',
}
export const stateNameMenus = {
    'Fail': '失败', // 失败
    'Paused': '暂停', // 暂停
    'Running': '运行中', // 暂停
    'Idle': '空闲', // 空闲
    'Init': '初始化', // 未开始
    'Success': '成功', // Success
    'Killed': '终止', // Killed
    'Pending': '准备中' // 准备中
}
export const stateNameFontColor = {
    'Fail': '#FF4D4F',
    'Paused': '#8C58EB',
    'Running': '#FAAD14',
    'Idle': '#188061',
    'Init': '#00C400',
    'Success': '#00C400',
    'Killed': '#666666',
    'Pending': '#1890FF',
}

const filterOrderColumn = {
    'ascend': 'desc',
    'descend': 'asc'
}

let time = null;

function Task({ kernelSource, jobInstanceId, openTaskTable, projectId }) {

    const [size, setSize] = useState(10);
    const [current, setCurrent] = useState(1);
    const [pageTotal, setPageTotal] = useState(0);
    const [data, setData] = useState([]);
    const [sort, setSort] = useState();
    const [sortField, setSortField] = useState();

    const columns = [
        {
            title: '任务实例',
            dataIndex: 'path',
            fixed: 'left',
            key: 'path',
            width: 200,
            ellipsis: true,
            render: (text, record) => {
                return <Tooltip placement="top" title={text}>
                    <div style={{ width: '170px', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>{toFixedFileName(text)}</div>
                </Tooltip>
            }
        },
        {
            title: '用户名',
            dataIndex: 'username',
            key: 'username',
            align: 'center',
            ellipsis: true,
            width: 215,
        },
        {
            title: '状态',
            dataIndex: 'status',
            key: 'status',
            align: 'center',
            width: 160,
            ellipsis: true,
            render: (text, record) => {
                return (
                    <div>
                        <Tag color={stateCodeMenus[text]}>
                            <span style={{ color: stateNameFontColor[text] }}>{stateNameMenus[text]}</span>
                        </Tag>
                    </div>
                )
            }
        },
        {
            title: '节点',
            dataIndex: 'node',
            key: 'node',
            align: 'center',
            ellipsis: true,
            width: 160
        },
        {
            title: '启动时间',
            dataIndex: 'runStart',
            key: 'runStart',
            align: 'center',
            ellipsis: true,
            width: 250,
            return: (text, record) => {
                return text
            }
        },
        {
            title: 'CPU',
            dataIndex: 'cpuUsedPercent',
            key: 'cpuUsedPercent',
            align: 'center',
            width: 200,
            ellipsis: true,
            sorter: true,
            keyName: 'cpu_used',
            render: (text) => {
                return <Progress
                    percent={toPercent(text)}
                    strokeColor={'#00C400'}
                    status={"normal"}
                />
            }
        },
        {
            title: '内存',
            dataIndex: 'memUsedPercent',
            key: 'memUsedPercent',
            align: 'center',
            width: 200,
            ellipsis: true,
            sorter: true,
            keyName: 'mem_used',
            render: (text) => {
                return <Progress
                    percent={toPercent(text)}
                    strokeColor={'#FAAD14'}
                    status={"normal"}
                />
            }
        },
        {
            title: 'GPU',
            dataIndex: 'gpuUsedPercent',
            key: 'gpuUsedPercent',
            align: 'center',
            width: 200,
            ellipsis: true,
            sorter: true,
            keyName: 'gpu_used',
            render: (text) => {
                return <Progress
                    percent={toPercent(text)}
                    strokeColor={'#FF4D4F'}
                    status={"normal"}
                />
            }
        },
        {
            title: '最近一次运行时长',
            dataIndex: 'timeCost',
            key: 'timeCost',
            align: 'center',
            width: 160,
            ellipsis: true,
        }
    ];

    useEffect(() => {
        openTaskTable && getTaskListApi(kernelSource, jobInstanceId, current, size, sort, sortField);
        openTaskTable && exeIntervalTime(kernelSource, jobInstanceId, current, size, sort, sortField);

    }, [jobInstanceId, openTaskTable]);

    useEffect(() => {
        return () => {
            clearIntervalTime()
        };
    }, [])

    const clearIntervalTime = () => {
        clearInterval(time);
    }

    const exeIntervalTime = (kernelSource, jobInstanceId, current, size, sort, sortField) => {
        time = setInterval(() => {
            getTaskListApi(kernelSource, jobInstanceId, current, size, sort, sortField);
        }, 3000);
    }

    const getTaskListApi = async (kernelSource, jobInstanceId, current, size, sort, sortField) => {
        const result = await Api.getTaskList(kernelSource, jobInstanceId, current, size, sort, sortField, projectId);
        if (result.code >= 20000000 && result.code < 30000000) {
            setData(result.data.records);
            setPageTotal(result.data.total);
            setCurrent(result.data.current);
            setSize(result.data.size);
        }
    }

    const onPageChange = (kernelSource, jobInstanceId, current, size, sort, sortField) => {
        clearIntervalTime();
        setCurrent(current);
        setSize(size);
        setSortField(sortField);
        getTaskListApi(kernelSource, jobInstanceId, current, size, sort, sortField);
    }

    const onChange = (pagination, filters, sorter, extra) => {
        const { action } = extra;
        const { current, pageSize } = pagination;
        if (action == 'paginate') {
            onPageChange(kernelSource, jobInstanceId, current, pageSize, sort, sortField)
        } else if (action == 'sort') {
            const { column, order } = sorter;
            onPageChange(kernelSource, jobInstanceId, 1, pageSize, order ? filterOrderColumn[order] : '', sorter ? column?.keyName : '');
        }
    }

    return (
        <div className='task-root'>
            <Table
                rowKey={'executorId'}
                columns={columns}
                dataSource={data}
                scroll={{ y: 300 }}
                onChange={onChange}
                pagination={{
                    showQuickJumper: true,
                    current,
                    total: pageTotal,
                    pageSize: size,
                    pageSizeOptions: ["10", "20", "50", "100"],
                    showSizeChanger: true,
                    showTotal: (total, range) => {
                        return `共${total}条`
                    },
                }}
            />
        </div>
    )
}

export default Task;