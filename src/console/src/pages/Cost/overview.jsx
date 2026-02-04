import React, { useEffect, useState } from 'react';
import { Button, Table, Popover, Tooltip, Modal } from 'antd';
import { InfoCircleOutlined, DoubleRightOutlined } from '@ant-design/icons';
import { useHistory } from "react-router";
import costApi from '../../serviceApi/cost';
import { getRecentMonth, moneyFormat } from '../../utils/cost';
import teamApi from '../../serviceApi/teamApi';
import intl from 'react-intl-universal';

import './styles/overview.less';

function Overview() {
    const history = useHistory()
    const [tableHeight, setTableHeight] = useState(window.document.documentElement.clientHeight);
    const [openModal, setOpenModal] = useState(false);
    const [data, setData] = useState([]);
    const [pageIndex, setPageIndex] = useState(1);
    const [pageSize, setPageSize] = useState(12);

    const [finance, setFinance] = useState(0);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        // history.pushState({}, null, '/team/cost/recharges'); // 暂时直接跳转到开发的页面
        const month = getRecentMonth();
        exePaymentAggregateListApi(month[month.length - 1], month[0]);
        exeFinanceAccountApi();
        exeTeamMemberListApi();
    }, []);

    const exePaymentAggregateListApi = async (beginMonth, endMonth) => {
        const result = await costApi.getPaymentAggregateListApi(beginMonth, endMonth, pageIndex, pageSize);
        if (result.code == 200) {
            setData(result.data.records);
        }
    }

    const exeFinanceAccountApi = async () => {
        const result = await costApi.getFinanceAccountApi();
        if (result.code == 200) {
            setFinance(result.data.totalBalance / 100);
        }
    }

    const exeTeamMemberListApi = async () => {
        teamApi.getTeamMemberList().then((result) => {
            setTotal(result.data.total);
        });
    }

    const columns = [
        {
            title: intl.get('TEAM_COST_OVERVIEW_TABLE_ACCOUNT_PERIOD'),
            dataIndex: 'month',
            key: 'month',
            render: (text) => <a>{text}</a>,
        },
        {
            title: `${intl.get('TEAM_COST_OVERVIEW_TABLE_CASH')}`,
            dataIndex: 'amount',
            key: 'amount',
            render: (text) => <a>{moneyFormat(text / 100)}</a>,
        }
    ];

    const goPay = () => {
        history.push('/cost/recharges');
    }

    const goInfo = () => {
        history.push(`/cost/revenue?type=info`);
    }

    const goMember = () => {
        history.push('/member');
    }

    const openModalTx = () => {
        setOpenModal(!openModal)
    }

    const goMore = () => {
        history.push(`/cost/bill`);
    }

    const scorllTable_Y = tableHeight - 300;

    return (
        <div className='overview-main'>
            <div className='overview-header'>
                <div className='overview-card overview-left'>
                    <div className='overview-money-title'>
                        {intl.get('TEAM_COST_OVERVIEW_BALANCE')}
                    </div>
                    <div className='overview-actios'>
                        <span className='overview-unit'>{window.globalConfig?.currency?.symbol}</span>
                        <span className='overview-sum'>{moneyFormat(finance)}</span>
                        <span className='overview-btn'>
                            <Button onClick={() => goPay()} className='overview-ant-btn overview-recharges' type="primary">{intl.get('TEAM_COST_OVERVIEW_RECHARGE')}</Button>
                            <Button onClick={() => goInfo()} className='overview-ant-btn overview-revenue' >{intl.get('TEAM_COST_OVERVIEW_DETAILS')}</Button>
                            <Button onClick={openModalTx} className='overview-ant-btn overview-extract'>
                                {intl.get('TEAM_COST_OVERVIEW_WITHDRAW_CASH')}
                            </Button>
                        </span>
                    </div>
                </div>
                <div className='overview-card overview-right'>
                    <div className='overview-version'>
                        <div>
                            <span style={{ cursor: 'pointer' }}>
                                <a target={'_blank'} href={window.globalConfig?.document?.official?.price}>{intl.get('TEAM_COST_OVERVIEW_PACKAGE')} <InfoCircleOutlined /></a>
                            </span>
                        </div>
                        <div>{intl.get('TEAM_COST_OVERVIEW_STANDARD_VERSION')}</div>
                    </div>
                    <div className='overview-hr'>
                        <div></div>
                    </div>
                    <div className='overview-info'>
                        <div className='overview-join'>{intl.get('TEAM_COST_OVERVIEW_MEMBER')}</div>
                        <span className='overview-manage'>
                            <span className='overview-number'>{total}</span>
                        </span>
                    </div>
                    <div className='overview-info'>
                        <div className='overview-join' style={{ height: '16px' }}></div>
                        <span className='overview-manage'>
                            <span className='overview-member' onClick={() => goMember()}>{intl.get('TEAM_COST_OVERVIEW_MEMBER_MANAGE')}</span>
                        </span>
                    </div>
                    <div className='overview-upgrade'>
                        <Tooltip placement="topLeft" title={intl.get('TEAM_COST_OVERVIEW_UPGRADE_TOOLTIPS')}>
                            <Button disabled>{intl.get('TEAM_COST_OVERVIEW_UPGRADE_PACKAGE')}</Button>
                        </Tooltip>
                    </div>
                </div>
            </div>
            <div className='overview-table' style={{ height: (tableHeight - 150) }}>
                <div className='overview-table-top'>
                    <div className='overview-preview'>{intl.get('TEAM_COST_OVERVIEW_TABLE_TILTE')}</div>
                    <div onClick={goMore} className='overview-more'>
                        <span className='overview-more-title'>{intl.get('TEAM_COST_OVERVIEW_TABLE_MORE')}</span>
                        <DoubleRightOutlined />
                    </div>
                </div>
                <div className='overview-antd-table'>
                    <Table
                        columns={columns}
                        dataSource={data}
                        pagination={false}
                        scroll={{ y: scorllTable_Y }}
                    />
                </div>
            </div>
            <TxModal openModal={openModal} setOpenModal={setOpenModal} />
        </div>
    )
}

// 提现antd-modal
function TxModal({ openModal, setOpenModal }) {

    const handleOk = () => {
        setOpenModal(false);
    }

    return (
        <div>
            <Modal width={300} onCancel={handleOk} visible={openModal} title={<div style={{ fontSize: '16px', color: 'red' }}> {intl.get('TEAM_COST_OVERVIEW_CONTACT_WECHAT')}</div>} footer={null}>
                <img style={{ width: '300px' }} src={window.globalConfig?.CS?.contactWith}></img>
            </Modal>
        </div>
    )
}

export default Overview