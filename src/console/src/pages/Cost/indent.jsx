import React, { useState, useEffect } from 'react';
import { DatePicker, Col, Form, Input, Row, Select, Button, Table, Space, Divider, Popconfirm, message } from 'antd';
import moment from "moment";
import { moneyFormat, dateFormat, dateToGMT, getRecentMonth } from '../../utils/cost';
import costApi from '../../serviceApi/cost';
import { shopApiPath, productApiPath } from "../../services/httpClient";
import { processingWithTTime } from '../../utils/cost';
import './styles/indent.less';
import { useHistory } from "react-router";
import PayCart from './Cart';
import intl from 'react-intl-universal';

const { RangePicker } = DatePicker;
const { Option } = Select;

function Indent() {

    const history = useHistory()

    const [form] = Form.useForm();

    const [data, setData] = useState([]);
    const [pageTotal, setPageTotal] = useState(0);
    const [pageIndex, setPageIndex] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({});
    const [visible, setVisible] = useState(false);
    const [record, setRecord] = useState('');

    useEffect(() => {
        getList({ pageIndexParams: pageIndex, pageSizeParams: pageSize });
    }, []);

    const exeOrderListApi = async (id, beginMonth, endMonth, orderType, chargeType, status, pageIndex, pageSize) => {
        try {
            const result = await costApi.orderListApi(id, beginMonth, endMonth, orderType, chargeType, status, pageIndex, pageSize);
            if (result.code == 200) {
                setData(result.data.records);
                setPageTotal(result.data.total);
            }
            setLoading(false);
        } catch (error) {
            setLoading(false);
        }
    }

    const onFinish = ({ id, month, orderType, status, chargeType }) => {
        setPageIndex(1)
        setFormData({ id, month, orderType, status, chargeType });
        getList({ id, month, orderType, chargeType, status, pageIndexParams: 1, pageSizeParams: pageSize });
    };

    const onReset = () => {
        form.resetFields();
        setPageIndex(1)
        setFormData({});
        getList({ pageIndexParams: 1, pageSizeParams: pageSize });
    };

    const columns = [
        {
            title: intl.get('TEAM_COST_ORDER_ID'),
            dataIndex: 'id',
            key: 'id',
            fixed: 'left',
            width: 180
        },
        {
            title: intl.get('TEAM_COST_ORDER_PRODUCT'),
            dataIndex: 'productName',
            key: 'productName',
            fixed: 'left',
            width: 220,
            // render: (text, record) => {
            //     return <>
            //         <div>{record.name}</div>
            //         <Divider />
            //         <div>{record.specification}</div>
            //     </>orderType
            // }
        },
        {
            title: intl.get('TEAM_COST_ORDER_COUNT'),
            dataIndex: 'count',
            key: 'count',
            width: 60
        },
        {
            title: intl.get('TEAM_COST_ORDER_INSID'),
            dataIndex: 'resourceId',
            key: 'resourceId',
            width: 180
        },
        {
            title: intl.get('TEAM_COST_ORDER_TYPE'),
            dataIndex: 'orderType',
            key: 'orderType',
            width: 100,
            render: (text, record) => {
                let textArray = {
                    1: intl.get('TEAM_COST_ORDER_TYPE_NEW'),
                    2: intl.get('TEAM_COST_ORDER_TYPE_RENEW'),
                    3: intl.get('TEAM_COST_ORDER_TYPE_CANCEL')
                };
                return <span>{textArray[text]}</span>
            }
        },
        {
            title: intl.get('TEAM_COST_ORDER_CHARGE_MODE'),
            dataIndex: 'chargeType',
            key: 'chargeType',
            width: 100,
            render: (text, record) => {
                let textArray = {
                    "Daily": intl.get('TEAM_COST_ORDER_CHARGE_MODE_DAY'),
                    'Month': intl.get('TEAM_COST_ORDER_CHARGE_MODE_MONTH'),
                    'Dynamic': intl.get('TEAM_COST_ORDER_CHARGE_MODE_QUANTITY'),
                    'resource_pack': intl.get('TEAM_COST_ORDER_CHARGE_MODE_RESOURCE')
                };
                return <span>{textArray[text]}</span>
            }
        },
        {
            title: intl.get('TEAM_COST_ORDER_CREATE_TIME'),
            dataIndex: 'createdAt',
            key: 'createdAt',
            width: 220,
        },
        {
            title: intl.get('TEAM_COST_ORDER_PAY_TIME'),
            dataIndex: 'paidTime',
            key: 'paidTime',
            width: 220,
        },
        {
            title: intl.get('TEAM_COST_ORDER_STATE'),
            dataIndex: 'status',
            key: 'status',
            width: 100,
            render: (text, record) => {
                let textArray = {
                    1: intl.get('TEAM_COST_ORDER_STATE_PAID'),
                    2: intl.get('TEAM_COST_ORDER_STATE_UNPAID'),
                    3: intl.get('TEAM_COST_ORDER_STATE_DELETE')
                };
                let tx = '';
                if (text == 'not_paid') {
                    tx = textArray[2];
                }
                if (text == 'paid' || text == 'end') {
                    tx = textArray[1];
                }
                if (text == 'user_cancel' || text == 'paid_timeout_cancel' || text == 'allocation_failed_cancel') {
                    tx = textArray[3];
                }
                return <span>{tx}</span>
            }
        },
        {
            title: intl.get('TEAM_COST_ORDER_INS_PRICE'),
            dataIndex: 'instancePrice',
            key: 'instancePrice',
            width: 180,
            render: (text) => {
                return <>{moneyFormat(text / 100)}</>
            }
        },
        // {
        //     title: intl.get('TEAM_COST_ORDER_BHU_PRICE'),
        //     dataIndex: 'bhuPrice',
        //     key: 'bhuPrice',
        //     width: 180,
        //     render: (text) => {
        //         return <>{moneyFormat(text)}</>
        //     }
        // },
        {
            title: intl.get('TEAM_COST_ORDER_CASH'),
            dataIndex: 'totalPrice',
            key: 'totalPrice',
            width: 180,
            render: (text) => {
                return <>{moneyFormat(text / 100)}</>
            }
        },
        {
            title: intl.get('TEAM_COST_ORDER_OPERATE'),
            key: 'action',
            fixed: 'right',
            width: 120,
            render: (text, record) => (
                <Space size="middle">
                    {
                        record.status == 'not_paid' ? <><a style={text.status == 'not_paid' ? {} : { color: 'gray', cursor: 'not-allowed' }} onClick={() => goPay(record)}>{intl.get('TEAM_COST_ORDER_OPERATE_PAY')}</a>
                            <Popconfirm
                                title={intl.get('TEAM_COST_ORDER_OPERATE_CANCEL_MESSAGE')}
                                onConfirm={() => confirmDelete(record)}
                                okText={intl.get('TEAM_COST_ORDER_OPERATE_CANCEL_OK')}
                                cancelText={intl.get('TEAM_COST_ORDER_OPERATE_CANCEL')}
                            >
                                <a>{intl.get('TEAM_COST_ORDER_OPERATE_CANCEL')}</a>
                            </Popconfirm></> : null
                    }
                </Space>
            ),
        }
    ];

    const confirmDelete = async (record) => {
        if (record.status == 'not_paid') {
            try {
                const result = await costApi.canncelApi(record.id);
                if (result.code == 200) {
                    message.success(intl.get('TEAM_COST_ORDER_OPERATE_CANCEL_SUCCESS'));
                    getList({ pageIndexParams: pageIndex, pageSizeParams: pageSize });
                }
            } catch (error) {

            }
        }
    }

    const goPay = (record) => {
        if (record.status == 'not_paid') {
            setRecord(record)
            setVisible(true);
        }
    }

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
        const id = form.getFieldValue('id');
        const orderType = form.getFieldValue('orderType');
        const chargeType = form.getFieldValue('chargeType');
        const status = form.getFieldValue('status');
        const { beginMonth, endMonth } = initMonth(month);
        await costApi.exportExcelFile(`${productApiPath}/order/orderExcel`, `订单_`, { searchingId: id, beginDate: beginMonth, endDate: endMonth, orderType, chargeType, orderStatus: ["paid", "not_paid", "paid_timeout_cancel,user_cancel"][status - 1] })
    };


    const getList = ({ id, month, orderType, status, chargeType, pageIndexParams, pageSizeParams }) => {
        setLoading(true);
        const { beginMonth, endMonth } = initMonth(month);
        exeOrderListApi(id, beginMonth, endMonth, orderType, chargeType, status, pageIndexParams, pageSizeParams);
    };

    const tableHeight = window.document.documentElement.clientHeight - 480;

    return (
        <div className='indent-main'>
            <div className='indent-body'>
                <div className='indent-indent-title'>{intl.get('TEAM_MENU_COST_ORDER')}</div>
                <div className='indent-search'>
                    <Form
                        form={form}
                        name="advanced_search"
                        className="ant-advanced-search-form"
                        onFinish={onFinish}
                    >
                        <Row gutter={24}>
                            <Col span={8} >
                                <Form.Item
                                    name="id"
                                    label={`${intl.get('TEAM_COST_ORDER_INSTANCE_ID')}: `}
                                    labelAlign={"left"}
                                >
                                    <Input type={'number'} placeholder={intl.get('TEAM_COST_ORDER_INSTANCE_ID')} className='indent-form-input'></Input>
                                </Form.Item>
                            </Col>
                            <Col span={8} >
                                <Form.Item
                                    name="month"
                                    label={`${intl.get('TEAM_COST_ORDER_CREATE_TIME')}: `}
                                    labelAlign={"right"}
                                >
                                    <RangePicker format={'YYYY-MM-DD'} />
                                </Form.Item>
                            </Col>
                            <Col span={8} >
                                <Form.Item
                                    name="orderType"
                                    label={`${intl.get('TEAM_COST_ORDER_TYPE')}: `}
                                    labelAlign={"right"}
                                >
                                    <Select allowClear placeholder={intl.get('TEAM_COST_ORDER_TYPE')}>
                                        <Option value="1">{intl.get('TEAM_COST_ORDER_TYPE_NEW')}</Option>
                                        <Option value="2">{intl.get('TEAM_COST_ORDER_TYPE_RENEW')}</Option>
                                        <Option value="3">{intl.get('TEAM_COST_ORDER_TYPE_CANCEL')}</Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={24}>
                            <Col span={8} >
                                <Form.Item
                                    name="status"
                                    label={`${intl.get('TEAM_COST_ORDER_STATE')}: `}
                                    labelAlign={"right"}
                                    className="indent_search_zt"
                                >
                                    <Select allowClear placeholder={intl.get('TEAM_COST_ORDER_STATE')}>
                                        <Option value="1">{intl.get('TEAM_COST_ORDER_STATE_PAID')}</Option>
                                        <Option value="2">{intl.get('TEAM_COST_ORDER_STATE_UNPAID')}</Option>
                                        <Option value="3">{intl.get('TEAM_COST_ORDER_STATE_DELETE')}</Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col span={8} >
                                <Form.Item
                                    name="chargeType"
                                    label={`${intl.get('TEAM_COST_ORDER_CHARGE_MODE')}: `}
                                    labelAlign={"right"}
                                >
                                    <Select allowClear placeholder={intl.get('TEAM_COST_ORDER_CHARGE_MODE')}>
                                        <Option value="Dynamic">{intl.get('TEAM_COST_ORDER_CHARGE_MODE_QUANTITY')}</Option>
                                        <Option value="Month">{intl.get('TEAM_COST_ORDER_CHARGE_MODE_MONTH')}</Option>
                                        <Option value="Daily">{intl.get('TEAM_COST_ORDER_CHARGE_MODE_DAY')}</Option>
                                        <Option value="resource_pack">{intl.get('TEAM_COST_ORDER_CHARGE_MODE_RESOURCE')}</Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item
                                    labelAlign={"right"}
                                >
                                    <Button type="primary" htmlType="submit" style={{ marginRight: '15px', width: '100px' }}>{intl.get('TEAM_COST_ORDER_QUERY')}</Button>
                                    <Button onClick={onReset} style={{ width: '100px' }}>{intl.get('TEAM_COST_ORDER_RESET')}</Button>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                </div>
                <div className='indent-actions'>
                    <Button onClick={() => exportExcelFile()} size="small">{intl.get('TEAM_COST_ORDER_EXPORT')}</Button>
                </div>
                <div className='indent-table'>
                    <Table
                        columns={columns}
                        dataSource={data}
                        scroll={{ y: tableHeight }}
                        loading={loading}
                        pagination={{
                            showQuickJumper: true,
                            current: pageIndex,
                            total: pageTotal,
                            pageSize,
                            onChange: (current, size) => {
                                setPageIndex(current);
                                setPageSize(size);
                                Object.assign(formData, { pageIndexParams: (current), pageSizeParams: size });
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
            <PayCart
                visible={visible}
                totalPrice={record.totalPrice}
                setVisible={setVisible}
                onFinish={getList}
                tradeNo={record.id}
            />
        </div>
    )
}

export default Indent
