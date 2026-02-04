import React, { Component, useEffect, useMemo, useState } from 'react';
import { Tabs, message, Breadcrumb } from 'antd';
import { RightOutlined } from '@ant-design/icons';
import JobInstance from './jobInstance';
import Task from './task';
import clsx from "clsx";
import Api from '../../../serviceApi/monitor';

import "./index.less";

const { TabPane } = Tabs;

let taskTime = '';

function IdpTask() {

    const [kernelSource, setKernelSource] = useState('');
    const [tabList, setTabList] = useState([]);
    const [jobInstanceList, setJobInstanceList] = useState([]);
    const [size, setSize] = useState(10);
    const [current, setCurrent] = useState(1);
    const [pageTotal, setPageTotal] = useState(0);

    const [checkTable, setCheckTable] = useState();
    const [openTaskTable, setOpenTaskTable] = useState(false);

    const [title, setTitle] = useState();
    const [projectId, setProjectId] = useState();
    const [projectName, setProjectName] = useState();
    const [projectNameList, setProjectNameList] = useState([]);
    const [filterProjectId, setFilterProjectId] = useState('');
    const [filtered, setFiltered] = useState(false);

    const goBack = () => {
        setTitle();
        clearIntervalTaskTime();
        setCheckTable();
        setOpenTaskTable(false);
        getTabListApi(false, (data) => {
            exeInterval(kernelSource, current, size);
        });

    }

    useEffect(() => {
        getTabListApi();

        return () => {
            clearIntervalTaskTime(taskTime);
        }
    }, []);

    const callback = (key) => {
        setOpenTaskTable(false);
        setCheckTable();
        clearIntervalTaskTime();
        setKernelSource(key);
        exeInterval(key, current, size);
    }

    const getTabListApi = async (time = true, callback) => {
        const result = await Api.getTabTypeList();
        if (result.code >= 20000000 && result.code < 30000000) {
            setTabList(result.data);
            if (result.data.length > 0 && time) {
                setKernelSource(result.data[0]['kernelSource']);
                exeInterval(result.data[0]['kernelSource'], current, size);
            }
            callback && callback(result.data);
        }
    }

    const upatecheckTable = (item, record) => {
        clearIntervalTaskTime();
        setCheckTable({ kernelSource: record.kernelSource, jobInstanceId: record.jobInstanceId, label: item.label });
        setTitle(item.label);
        setOpenTaskTable(true);
        setProjectId(record.projectId);
        setProjectName(record.projectName);
    }

    const onPageChange = (current, size) => {
        setOpenTaskTable(false);
        setCheckTable();
        clearIntervalTaskTime();
        setCurrent(current);
        setSize(size);
        exeInterval(kernelSource, current, size);
    }

    const clearIntervalTaskTime = () => {
        clearInterval(taskTime);
    }

    const exeInterval = (kernelSource, current, size, filterProjectId) => {
        getJobInstanceListApi(kernelSource, current, size, filterProjectId);
        taskTime = setInterval(() => {
            getJobInstanceListApi(kernelSource, current, size, filterProjectId);
        }, 3000);
    }

    const getJobInstanceListApi = async (kernelSource, current, size, projectId = '') => {
        let result = '';
        try {
            result = await Api.getJobInstanceList(kernelSource, current, size, projectId);
            if (result.code >= 20000000 && result.code < 30000000) {
                setJobInstanceList(result.data.data);
                setPageTotal(result.data.total);
                setCurrent(result.data.current);
                let proList = [];
                const list = Object.values(result.data.data).map((item) => ({ text: item.projectName, value: item.projectId }));
                const listIndex = Object.values(result.data.data).map((item) => item.projectId);
                const resIndex = [...new Set(listIndex)];
                resIndex.forEach(its => {
                    const fi = list.filter(it => its == it.value);
                    if (fi.length > 0) {
                        proList.push(fi[0])
                        return;
                    }
                });
                setProjectNameList(proList);
            } else {
                clearIntervalTaskTime();
                setJobInstanceList([]);
                message.error(result.message);
            }
        } catch (error) {
            clearIntervalTaskTime();
            setJobInstanceList([]);
        }
    }

    const filterColumnsProjectNameTable = (projectId) => {
        setFilterProjectId(projectId);
        setFiltered(!!projectId);
        clearIntervalTaskTime();
        exeInterval(kernelSource, 1, size, projectId);
    }

    const onTabClick = () => {
        setFiltered(false);
        clearIntervalTaskTime();
        setFilterProjectId();
    }

    const loadTabPane = useMemo(() => {
        return (
            <>
                {
                    tabList.map((item) => {
                        return <TabPane tab={item.label} key={item.kernelSource}>
                            {
                                <JobInstance
                                    data={jobInstanceList}
                                    item={item}
                                    size={size}
                                    current={current}
                                    pageTotal={pageTotal}
                                    onPageChange={onPageChange}
                                    upatecheckTable={upatecheckTable}
                                    projectNameList={projectNameList}
                                    filterColumnsProjectNameTable={filterColumnsProjectNameTable}
                                    filterProjectId={filterProjectId}
                                    filtered={filtered}
                                    clearIntervalTaskTime={clearIntervalTaskTime}
                                />
                            }
                        </TabPane>
                    })
                }
            </>
        )
    }, [tabList, jobInstanceList, size, current, pageTotal, filterProjectId, filtered]);

    return (
        <div>
            <div className="monitor_title">
                <span onClick={() => { openTaskTable && goBack() }} className={clsx({ 'monitor_title_active': openTaskTable })}>{`正在运行的作业`}</span>
                <span>{title && <span>
                    <span style={{ margin: '0px 5px' }}><RightOutlined /></span>
                    <span>{projectName}</span>
                    <span style={{ margin: '0px 5px' }}><RightOutlined /></span>
                    <span>{title}</span>
                </span>}</span>
                {title && <span onClick={goBack} className="monitor_goback">返回上一级</span>}
            </div>
            {
                openTaskTable ? <Task
                    jobInstanceId={checkTable?.jobInstanceId}
                    kernelSource={kernelSource}
                    openTaskTable={openTaskTable}
                    projectId={projectId}
                /> : <Tabs
                    activeKey={kernelSource}
                    onTabClick={callback}
                    type="card"
                    onChange={onTabClick}
                >
                    {loadTabPane}
                </Tabs>
            }
        </div>
    )
}

export default IdpTask