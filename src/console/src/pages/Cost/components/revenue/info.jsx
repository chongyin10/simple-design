import React, { useState, useEffect } from 'react';
import { DatePicker, Form, Input, Select, Button, Table } from 'antd';
import moment from "moment";
import { shopApiPath, productApiPath } from "../../../../services/httpClient";
import costApi from '../../../../serviceApi/cost';
import { moneyFormat, processingWithTTime } from '../../../../utils/cost';
import intl from 'react-intl-universal';

const { RangePicker } = DatePicker;
const { Option } = Select;

import './styles/info.less';

function Info() {

    const [form] = Form.useForm();

    const [data, setData] = useState([]);
    const [formData, setFormData] = useState({});
    const [pageIndex, setPageIndex] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [pageTotal, setPageTotal] = useState(0);
    const [loading, setLoading] = useState(false);

    const onFinish = ({ billId, month, dealType }) => {
        setPageIndex(1)
        setFormData({ billId, month, dealType });
        getList({ billId, month, dealType, pageIndexParams: 1, pageSizeParams: pageSize });
    };

    const exeBillListApi = async (billId, beginMonth, endMonth, dealType, pageIndex, pageSize) => {
        try {
            const result = await costApi.getBillListApi(billId, beginMonth, endMonth, dealType, pageIndex, pageSize);
            if (result.code == 200) {
                setData(result.data.records);
                setPageTotal(result.data.total);
            }
            setLoading(false);
        } catch (error) {
            setLoading(false);
        }
    }

    const onReset = () => {
        setPageIndex(1)
        form.resetFields();
        getList({ pageIndexParams: 1, pageSizeParams: pageSize });
    };

    const initMonth = (month) => {
        let beginMonth = '';
        let endMonth = '';
        if (month) {
            beginMonth = moment(month[0], 'YYYY-MM-DD').format('YYYY-MM-DD');
            endMonth = moment(month[1], 'YYYY-MM-DD').format('YYYY-MM-DD');
        }
        return { beginMonth, endMonth };
    }

    const exportExcelFile = async () => {
        const month = form.getFieldValue('month');
        const billId = form.getFieldValue('billId');
        const dealType = form.getFieldValue('dealType');
        const { beginMonth, endMonth } = initMonth(month);
        await costApi.exportExcelFile(`${productApiPath}/bill/exportBillExcel`, `流水明细_`, { billId, beginDate: beginMonth, endDate: endMonth, dealType })
    };

    const getList = ({ billId, month, dealType, pageIndexParams = pageIndex, pageSizeParams = pageSize }) => {
        setLoading(true);
        const { beginMonth, endMonth } = initMonth(month);
        exeBillListApi(billId, beginMonth, endMonth, dealType, pageIndexParams, pageSizeParams);
    };

    useEffect(() => {
        getList({});
    }, []);

    const columns = [
        {
            title: intl.get('TEAM_COST_REVENUE_DETAIL_ID'),
            dataIndex: 'id',
            key: 'id',
            fixed: 'id',
            fixed: 'left',
            width: 260
        },
        {
            title: intl.get('TEAM_COST_REVENUE_DETAIL_DATETIME'),
            dataIndex: 'createdAt',
            key: 'createdAt',
            width: 200,
        },
        {
            title: intl.get('TEAM_COST_REVENUE_OVERVIEW_TYPE'),
            dataIndex: 'type',
            key: 'type',
            width: 100,
            render: (text) => {
                return <>{text === 'payment' ? intl.get('TEAM_COST_REVENUE_OVERVIEW_TYPE_EXPENDITURE') : intl.get('TEAM_COST_REVENUE_OVERVIEW_TYPE_INCOME')}</>
            }
        },
        {
            title: intl.get('TEAM_COST_REVENUE_DETAIL_TRADE_TYPE'),
            dataIndex: 'dealType',
            key: 'dealType',
            width: 100,
            render: (text) => {
                const dealType = [
                    intl.get('TEAM_COST_REVENUE_DETAIL_TRADE_TYPE_RECHARGE'),
                    intl.get('TEAM_COST_REVENUE_DETAIL_TRADE_TYPE_EXPEND'),
                    intl.get('TEAM_COST_REVENUE_DETAIL_TRADE_TYPE_REFUND'),
                    intl.get('TEAM_COST_REVENUE_DETAIL_TRADE_TYPE_WITHDRAW_CASH')
                ]
                return <>{dealType[Number(text) - 1]}</>
            }
        },
        {
            title: intl.get('TEAM_COST_REVENUE_DETAIL_TRADE_CHANNEL'),
            dataIndex: 'channelType',
            key: 'channelType',
            width: 100,
            render: (text) => {
                const channelType = [
                    intl.get('TEAM_COST_REVENUE_DETAIL_TRADE_CHANNEL_CASH'),
                    intl.get('TEAM_COST_REVENUE_DETAIL_TRADE_CHANNEL_ALIPAY'),
                    intl.get('TEAM_COST_REVENUE_DETAIL_TRADE_CHANNEL_WECHAT'),
                    intl.get('TEAM_COST_REVENUE_DETAIL_TRADE_CHANNEL_STRIPE'),
                    intl.get('TEAM_COST_REVENUE_DETAIL_TRADE_CHANNEL_SHUNWANG')
                ]
                return <>{channelType[Number(text) - 1]}</>
            }
        },
        {
            title: intl.get('TEAM_COST_REVENUE_DETAIL_EXPENSE'),
            dataIndex: 'amount',
            key: 'amount',
            width: 100,
            render: (text) => moneyFormat(text / 100)
        },
        {
            title: intl.get('TEAM_COST_REVENUE_DETAIL_TRADE_CHANNEL_ID'),
            dataIndex: 'linkId',
            key: 'linkId',
            width: 200
        }
    ];

    const tableHeight = window.document.documentElement.clientHeight - 450;

    return (
        <div className='info-main'>
            <div className='info-body'>
                <div className='info-search'>
                    <Form
                        form={form}
                        name="advanced_search"
                        className="ant-advanced-search-form"
                        onFinish={onFinish}
                        style={{ display: 'flex' }}
                    >
                        <div>
                            <Form.Item
                                name="billId"
                                label={`${intl.get('TEAM_COST_REVENUE_DETAIL_ID')}: `}
                                labelAlign={"left"}
                            >
                                <Input placeholder={intl.get('TEAM_COST_REVENUE_DETAIL_ID')} className='info-form-input'></Input>
                            </Form.Item>
                        </div>
                        <div style={{ marginLeft: '30px' }}>
                            <Form.Item
                                name="month"
                                label={`${intl.get('TEAM_COST_REVENUE_DETAIL_DATETIME')}: `}
                                labelAlign={"right"}
                            >
                                <RangePicker format={'YYYY-MM-DD'} />
                            </Form.Item>
                        </div>
                        <div style={{ marginLeft: '30px' }}>
                            <Form.Item
                                name="dealType"
                                label={`${intl.get('TEAM_COST_REVENUE_DETAIL_TRADE_TYPE')}: `}
                                labelAlign={"right"}
                            >
                                <Select style={{ width: '160px' }} allowClear placeholder={intl.get('TEAM_COST_REVENUE_DETAIL_TRADE_TYPE')}>
                                    <Option value="1">{intl.get('TEAM_COST_REVENUE_DETAIL_TRADE_TYPE_RECHARGE')}</Option>
                                    <Option value="2">{intl.get('TEAM_COST_REVENUE_DETAIL_TRADE_TYPE_EXPEND')}</Option>
                                    <Option value="3">{intl.get('TEAM_COST_REVENUE_DETAIL_TRADE_TYPE_REFUND')}</Option>
                                    <Option value="4">{intl.get('TEAM_COST_REVENUE_DETAIL_TRADE_TYPE_WITHDRAW_CASH')}</Option>
                                </Select>
                            </Form.Item>
                        </div>
                        <div style={{ marginLeft: '60px' }}>
                            <Form.Item>
                                <div style={{ display: 'flex', marginLeft: '30px' }}>
                                    <Button type="primary" htmlType="submit" style={{ marginRight: '15px', width: '80px' }}>{intl.get('TEAM_COST_REVENUE_DETAIL_QUERY')}</Button>
                                    <Button onClick={onReset} style={{ width: '80px' }}>{intl.get('TEAM_COST_REVENUE_DETAIL_RESET')}</Button>
                                </div>
                            </Form.Item>
                        </div>

                    </Form>
                </div>
                <div className='info-actions'>
                    <Button onClick={() => exportExcelFile()} size="small">{intl.get('TEAM_COST_REVENUE_DETAIL_EXPORT')}</Button>
                </div>
                <div className='info-table'>
                    <Table
                        scroll={{ y: tableHeight }}
                        columns={columns}
                        dataSource={data}
                        loading={loading}
                        pagination={{
                            showQuickJumper: true,
                            current: (pageIndex),
                            total: pageTotal,
                            pageSize,
                            onChange: (current, size) => {
                                setPageIndex(current);
                                setPageSize(size);
                                // Object.assign(formData, { pageIndexParams: current, pageSizeParams: size });
                                getList({ ...formData, pageIndexParams: current, pageSizeParams: size })
                            },
                            pageSizeOptions: ["10", "20", "50", "100"],
                            showSizeChanger: true,
                            showTotal: (total, range) => {
                                return `共${total}条`
                            },
                        }}
                    />
                </div>
            </div>
        </div>
    )
}

export default Info