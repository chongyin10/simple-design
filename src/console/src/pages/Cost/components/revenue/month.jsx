import React, { useState, useEffect } from 'react';
import { DatePicker, Form, Select, Button, Table } from 'antd';
import moment from "moment";
import { shopApiPath, productApiPath } from "../../../../services/httpClient";

import costApi from '../../../../serviceApi/cost';
import { getRecentMonth } from '../../../../utils/cost';
import { moneyFormat } from '../../../../utils/cost';
import intl from 'react-intl-universal';

const { RangePicker } = DatePicker;
const { Option } = Select;

import './styles/month.less';

function Month() {

    const [form] = Form.useForm();

    const [data, setData] = useState([]);
    const [pageIndex, setPageIndex] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [pageTotal, setPageTotal] = useState(0);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({});

    const onFinish = ({ month, billType }) => {
        setLoading(true);
        const { beginMonth, endMonth } = initMonth(month);
        setFormData({ beginMonth, endMonth, billType });
        exePaymentAggregateListApi(beginMonth, endMonth, billType);
    };

    const initMonth = (month) => {
        let beginMonth = '';
        let endMonth = '';
        if (month) {
            beginMonth = moment(month[0], 'YYYY-MM').format('YYYY-MM');
            endMonth = moment(month[1], 'YYYY-MM').format('YYYY-MM');
        }
        return { beginMonth, endMonth };
    }

    const onReset = () => {
        form.resetFields();
        onFinish({});
    };

    useEffect(() => {
        onFinish({});
    }, []);

    const exePaymentAggregateListApi = async (beginMonth, endMonth, billType) => {
        try {
            const result = await costApi.getBillAggregateApi(beginMonth, endMonth, billType, pageIndex, pageSize);
            if (result.code == 200) {
                setData(result.data.records);
                setPageTotal(result.data.total);
            }
            setLoading(false);
        } catch (error) {
            setLoading(false);
        }
    }

    const columns = [
        {
            title: intl.get('TEAM_COST_REVENUE_OVERVIEW_MONTH'),
            dataIndex: 'month',
            key: 'month',
        },
        {
            title: intl.get('TEAM_COST_REVENUE_OVERVIEW_TYPE'),
            dataIndex: 'billType',
            key: 'billType',
            render: (text) => {
                return <span>{text == 'charge' ? intl.get('TEAM_COST_REVENUE_OVERVIEW_TYPE_INCOME') : intl.get('TEAM_COST_REVENUE_OVERVIEW_TYPE_EXPENDITURE')}</span>
            }
        },
        {
            title: intl.get('TEAM_COST_REVENUE_OVERVIEW_EXPENSE'),
            dataIndex: 'amount',
            key: 'amount',
            render: (text) => moneyFormat(text / 100)
        }
    ];

    const exportExcelFile = async () => {
        const month = form.getFieldValue('month');
        const billType = form.getFieldValue('billType');
        const { beginMonth, endMonth } = initMonth(month);
        await costApi.exportExcelFile(`${productApiPath}/bill/exportAggregateExcel`, `收支(月汇总)_`, { billType, beginDate: beginMonth, endDate: endMonth })
    }

    const tableHeight = window.document.documentElement.clientHeight - 450;

    return (
        <div className='month-main'>
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
                                label={`${intl.get('TEAM_COST_REVENUE_OVERVIEW_MONTH')}: `}
                                labelAlign={"right"}
                            >
                                <RangePicker picker="month" showTime format="YYYY-MM" />
                            </Form.Item>
                        </div>
                        <div style={{ marginLeft: '30px' }}>
                            <Form.Item
                                name="billType"
                                label={`${intl.get('TEAM_COST_REVENUE_OVERVIEW_TYPE')}: `}
                                labelAlign={"right"}
                            >
                                <Select style={{ width: '160px' }} allowClear placeholder={intl.get('TEAM_COST_REVENUE_OVERVIEW_TYPE')}>
                                    <Option value="charge">{intl.get('TEAM_COST_REVENUE_OVERVIEW_TYPE_INCOME')}</Option>
                                    <Option value="payment">{intl.get('TEAM_COST_REVENUE_OVERVIEW_TYPE_EXPENDITURE')}</Option>
                                </Select>
                            </Form.Item>
                        </div>
                        <div style={{ marginLeft: '60px' }}>
                            <Form.Item
                                labelAlign={"right"}
                            >
                                <Button type="primary" htmlType="submit" style={{ marginRight: '15px', width: '80px' }}>{intl.get('TEAM_COST_REVENUE_OVERVIEW_QUERY')}</Button>
                                <Button onClick={onReset} style={{ width: '80px' }}>{intl.get('TEAM_COST_REVENUE_OVERVIEW_RESET')}</Button>
                            </Form.Item>
                        </div>
                    </Form>
                </div>
                <div className='month-actions'>
                    <Button onClick={() => exportExcelFile()} size="small">{intl.get('TEAM_COST_REVENUE_DETAIL_EXPORT')}</Button>
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