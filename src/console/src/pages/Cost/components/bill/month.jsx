import React, { useState, useEffect } from 'react';
import { DatePicker, Form, Select, Button, Table } from 'antd';
import moment from "moment";
import { moneyFormat } from '../../../../utils/cost';
import { shopApiPath, productApiPath } from "../../../../services/httpClient";
import costApi from '../../../../serviceApi/cost';
import intl from 'react-intl-universal';

const { RangePicker } = DatePicker;
const { Option } = Select;

import './styles/month.less';

function Month() {

    const [form] = Form.useForm();

    const [data, setData] = useState([]);
    const [pageTotal, setPageTotal] = useState(0);
    const [pageIndex, setPageIndex] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({});

    useEffect(() => {
        onFinish({});
    }, []);

    const exePaymentAggregateApi = async (beginMonth, endMonth) => {
        try {
            const result = await costApi.getPaymentAggregateApi(beginMonth, endMonth, pageIndex, pageSize);
            if (result.code == 200) {
                setData(result.data.records);
                setPageTotal(result.data.total);
            }
            setLoading(false);
        } catch (error) {
            setLoading(false);
        }
    }

    const initMonth = (month) => {
        let beginMonth = '';
        let endMonth = '';
        if (month) {
            beginMonth = moment(month[0], 'YYYY-MM').format('YYYY-MM');
            endMonth = moment(month[1], 'YYYY-MM').format('YYYY-MM');
        }
        return { beginMonth, endMonth };
    }

    const onFinish = ({ month }) => {
        setLoading(true);
        const { beginMonth, endMonth } = initMonth(month);
        setFormData({ beginMonth, endMonth });
        exePaymentAggregateApi(beginMonth, endMonth);
    };

    const exportExcelFile = async () => {
        const month = form.getFieldValue('month');
        const paymentType = form.getFieldValue('paymentType');
        const { beginMonth, endMonth } = initMonth(month);
        await costApi.exportExcelFile(`${productApiPath}/payment/aggregateExcel`, `月账单(汇总)_`, { beginMonth, endMonth, paymentType })
    }

    const onReset = () => {
        form.resetFields();
        setFormData({});
        onFinish({});
    };

    const columns = [
        {
            title: intl.get('TEAM_COST_BILL_DETAIL_PERIOD'),
            dataIndex: 'month',
            key: 'month',
        },
        {
            title: intl.get('TEAM_COST_BILL_DETAIL_EXPENSES'),
            dataIndex: 'amount',
            key: 'amount',
            render: (text) => moneyFormat(text / 100)
        }
    ];

    const tableHeight = window.document.documentElement.clientHeight - 450;

    return (
        <div className='bill-month-main'>
            <div className='month-body'>
                <div className='month-search'>
                    <Form
                        form={form}
                        name="advanced_search"
                        style={{ display: 'flex' }}
                        className="ant-advanced-search-form"
                        onFinish={onFinish}
                    >
                        <div>
                            <Form.Item
                                name="month"
                                label={`${intl.get('TEAM_COST_BILL_DETAIL_PERIOD')}: `}
                                labelAlign={"right"}
                            >
                                <RangePicker picker="month" showTime format="YYYY-MM" />
                            </Form.Item>
                        </div>
                        <div style={{ marginLeft: '60px' }}>
                            <Form.Item
                                labelAlign={"right"}
                            >
                                <Button type="primary" htmlType="submit" style={{ marginRight: '15px', width: '80px' }}>{intl.get('TEAM_COST_BILL_DETAIL_QUERY')}</Button>
                                <Button onClick={onReset} style={{ width: '80px' }}>{intl.get('TEAM_COST_BILL_DETAIL_RESET')}</Button>
                            </Form.Item>
                        </div>
                    </Form>
                </div>
                <div className='month-actions'>
                    <Button onClick={() => exportExcelFile()} size="small">{intl.get('TEAM_COST_BILL_DETAIL_EXPORT')}</Button>
                </div>
                <div className='month-table'>
                    <Table
                        scroll={{ y: tableHeight }}
                        columns={columns}
                        dataSource={data}
                        loading={loading}
                    />
                </div>
            </div>
        </div>
    )
}

export default Month