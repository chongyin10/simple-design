import { Tooltip, Table, Progress } from 'antd';
import { useState } from 'react';
import { useLayoutEffect } from 'react';
import { useEffect } from 'react';
import { toPercent } from '../../../utils'

function JobInstance({ data, item, pageTotal, current, size, upatecheckTable, onPageChange, 
    projectNameList, filterProjectId, filterColumnsProjectNameTable, filtered, clearIntervalTaskTime }) {

    useEffect(()=> {
        const dom = document.getElementsByClassName('ant-table-filter-trigger');
        if ( dom && dom.length > 0 ) {
            dom[0].addEventListener('click', ()=> {
                clearIntervalTaskTime();
            })
        }
    }, [])

    const columns = [
        {
            title: '作业名称',
            dataIndex: 'jobName',
            key: 'jobName',
            ellipsis: true,
            render: (text, record) => {
                return <Tooltip title={text}>
                    <a onClick={() => upatecheckTable(item, record)}>{text}</a>
                </Tooltip>
            }
        },
        {
            title: '所属项目',
            dataIndex: 'projectName',
            key: 'projectName',
            ellipsis: true,
            filters: projectNameList,
            filterMultiple: false,
            filterSearch: true,
            filtered,
            filteredValue: filterProjectId ? [filterProjectId] : [],
            render: (text, record) => {
                return <Tooltip title={text}>
                    {text}
                </Tooltip>
            }
        },
        {
            title: 'CPU',
            dataIndex: 'cpuUsedPercent',
            key: 'cpuUsedPercent',
            align: 'center',
            render: (text) => {
                return (
                    <Progress
                        percent={toPercent(text)}
                        strokeColor={'#00C400'}
                        status={"normal"}
                    />
                )
            }
        },
        {
            title: '内存',
            dataIndex: 'memUsedPercent',
            key: 'memUsedPercent',
            align: 'center',
            render: (text) => {
                return (
                    <Progress
                        percent={toPercent(text)}
                        strokeColor={'#FAAD14'}
                        status={"normal"}
                    />
                )
            }
        },
        {
            title: 'GPU',
            dataIndex: 'gpuUsedPercent',
            key: 'gpuUsedPercent',
            align: 'center',
            render: (text) => {
                return (
                    <Progress
                        percent={toPercent(text)}
                        strokeColor={'#FF4D4F'}
                        status={"normal"}
                    />
                )
            }
        },
        {
            title: '操作',
            dataIndex: 'actions',
            key: 'actions',
            align: 'center',
            render: (text, record) => {
                return (
                    <a onClick={() => upatecheckTable(item, record)}>查看详情</a>
                )
            }
        },
    ];

    const handleTableChange = (pagination, filters, sorter, extra) => {
        if (filters.hasOwnProperty('projectName')) {
            if (filters.projectName && filters.projectName?.length > 0) {
                filterColumnsProjectNameTable(filters.projectName[0]);
            } else {
                filterColumnsProjectNameTable('');
            }
        } else {
            filterColumnsProjectNameTable('');
        }
    }

    const tableHeight = window.document.documentElement.clientHeight - 360;

    return (
        <div>
            <Table
                rowKey={record => record.jobInstanceId}
                columns={columns}
                dataSource={data}
                scroll={{ y: tableHeight }}
                pagination={{
                    showQuickJumper: true,
                    current,
                    total: pageTotal,
                    pageSize: size,
                    onChange: (current, size) => {
                        onPageChange(current, size);
                    },
                    pageSizeOptions: ["10", "20", "50", "100"],
                    showSizeChanger: true,
                    showTotal: (total, range) => {
                        return `共${total}条`
                    },
                }}
                onChange={handleTableChange}
            />
        </div>
    )
}

export default JobInstance