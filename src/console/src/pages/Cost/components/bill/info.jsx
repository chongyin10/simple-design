import React, { useState, useEffect } from 'react';
import { DatePicker, Form, Input, Select, Button, Table, Divider, Pagination } from 'antd';
import moment from "moment";
import { shopApiPath, productApiPath } from "../../../../services/httpClient";
import { moneyFormat, processingWithTTime } from '../../../../utils/cost';
import costApi from '../../../../serviceApi/cost';
import intl from 'react-intl-universal';

const { RangePicker } = DatePicker;
const { Option } = Select;

import './styles/info.less';

function Info() {

    const [form] = Form.useForm();

    const [data, setData] = useState([]);
    const [pageTotal, setPageTotal] = useState(0);
    const [pageIndex, setPageIndex] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({});

    const exePaymentListApi = async (id, beginMonth, endMonth, paymentType, pageIndex, pageSize) => {
        try {
            const result = await costApi.getPaymentListApi(id, beginMonth, endMonth, paymentType, pageIndex, pageSize);
            if (result.code == 200) {
                setData(result.data.records);
                setPageTotal(result.data.total);
            }
            setLoading(false);
        } catch (error) {
            setLoading(false);
        }
    }

    const onFinish = ({ paymentId, month, paymentType }) => {
        setPageIndex(1)
        setFormData({ paymentId, month, paymentType });
        getList({ paymentId, month, paymentType, pageIndexParams: 1, pageSizeParams: pageSize });
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
        const paymentId = form.getFieldValue('paymentId');
        const paymentType = form.getFieldValue('paymentType');
        const { beginMonth, endMonth } = initMonth(month);
        await costApi.exportExcelFile(`${productApiPath}/payment/paymentsExcel`, `账单明细_`, { paymentId, beginDate: beginMonth, endDate: endMonth, paymentType })
    };

    useEffect(() => {
        getList({ pageIndexParams: pageIndex, pageSizeParams: pageSize });
    }, [])

    const onReset = () => {
        setPageIndex(1)
        form.resetFields();
        setFormData({});
        getList({ pageIndexParams: 1, pageSizeParams: pageSize });
    };

    const columns = [
        {
            title: intl.get('TEAM_COST_BILL_DETAIL_PERIOD'),
            dataIndex: 'month',
            key: 'month',
            fixed: 'left',
            width: 100
        },
        {
            title: intl.get('TEAM_COST_BILL_DETAIL_PRODUCT'),
            dataIndex: 'subject',
            key: 'subject',
            width: 200,
            fixed: 'left',
        },
        {
            title: intl.get('TEAM_COST_BILL_DETAIL_INSID'),
            dataIndex: 'resourceId',
            key: 'resourceId',
            width: 200
        },
        {
            title: intl.get('TEAM_COST_BILL_DETAIL_TYPE'),
            dataIndex: 'paymentType',
            key: 'paymentType',
            width: 120,
            render: (text) => {
                const re = {
                    1: intl.get('TEAM_COST_BILL_DETAIL_TYPE_PREPAID'),
                    2: intl.get('TEAM_COST_BILL_DETAIL_TYPE_POSTPAID'),
                    3: intl.get('TEAM_COST_BILL_DETAIL_TYPE_REFUND')
                }
                return <>{re[text]}</>
            }
        },
        {
            title: intl.get('TEAM_COST_BILL_DETAIL_ORDERID'),
            dataIndex: 'orderId',
            key: 'orderId',
            width: 200
        },
        {
            title: intl.get('TEAM_COST_BILL_DETAIL_TIME'),
            dataIndex: 'createdAt',
            key: 'createdAt',
            width: 180,
        },
        {
            title: intl.get('TEAM_COST_BILL_DETAIL_EXPENSES'),
            dataIndex: 'amount',
            key: 'amount',
            width: 80,
            render: (text) => moneyFormat(text / 100)
        },
        {
            title: intl.get('TEAM_COST_BILL_DETAIL_STATE'),
            dataIndex: 'status',
            key: 'status',
            width: 80,
            fixed: 'right',
            render: (text) => {
                return <>{text == 'not_paid' ? intl.get('TEAM_COST_BILL_DETAIL_STATE_UNPAID') : intl.get('TEAM_COST_BILL_DETAIL_STATE_PAID')}</>
            }
        }
    ];

    const getList = ({ paymentId, month, paymentType, pageIndexParams, pageSizeParams }) => {
        setLoading(true);
        const { beginMonth, endMonth } = initMonth(month);
        exePaymentListApi(paymentId, beginMonth, endMonth, paymentType, pageIndexParams, pageSizeParams);
    };

    const tableHeight = window.document.documentElement.clientHeight - 450;
    return (
        <div className='bill-info-main'>
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
                                name="paymentId"
                                label={`${intl.get('TEAM_COST_BILL_DETAIL_ORDER_INS_ID')}: `}
                                labelAlign={"left"}
                            >
                                <Input type={'number'} placeholder={intl.get('TEAM_COST_BILL_DETAIL_ORDER_INS_ID')} className='info-form-input'></Input>
                            </Form.Item>
                        </div>
                        <div style={{ marginLeft: '30px' }}>
                            <Form.Item
                                name="month"
                                label={`${intl.get('TEAM_COST_BILL_DETAIL_TIME')}: `}
                                labelAlign={"right"}
                            >
                                <RangePicker format={'YYYY-MM-DD'} />
                            </Form.Item>
                        </div>
                        <div style={{ marginLeft: '30px' }}>
                            <Form.Item
                                name="paymentType"
                                label={`${intl.get('TEAM_COST_BILL_DETAIL_TYPE')}: `}
                                labelAlign={"right"}
                            >
                                <Select style={{ width: '160px' }} allowClear placeholder={intl.get('TEAM_COST_BILL_DETAIL_TYPE')}>
                                    <Option value="1">{intl.get('TEAM_COST_BILL_DETAIL_TYPE_PREPAID')}</Option>
                                    <Option value="2">{intl.get('TEAM_COST_BILL_DETAIL_TYPE_POSTPAID')}</Option>
                                    <Option value="3">{intl.get('TEAM_COST_BILL_DETAIL_TYPE_REFUND')}</Option>
                                </Select>
                            </Form.Item>
                        </div>
                        <div style={{ marginLeft: '60px' }}>
                            <Form.Item>
                                <div style={{ display: 'flex', marginLeft: '30px' }}>
                                    <Button type="primary" htmlType="submit" style={{ marginRight: '15px', width: '80px' }}>{intl.get('TEAM_COST_BILL_DETAIL_QUERY')}</Button>
                                    <Button onClick={onReset} style={{ width: '80px' }}>{intl.get('TEAM_COST_BILL_DETAIL_RESET')}</Button>
                                </div>
                            </Form.Item>
                        </div>

                    </Form>
                </div>
                <div className='info-actions'>
                    <Button onClick={exportExcelFile} size="small">{intl.get('TEAM_COST_BILL_DETAIL_EXPORT')}</Button>
                </div>
                <div className='info-table'>
                    <Table
                        scroll={{ y: tableHeight, x: 1000 }}
                        columns={columns}
                        dataSource={data}
                        loading={loading}
                        pagination={{
                            showQuickJumper: true,
                            current: pageIndex,
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