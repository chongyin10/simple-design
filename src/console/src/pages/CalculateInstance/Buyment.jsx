import React, { useEffect, useMemo, useState, useRef } from 'react';
import { Card, Radio, Checkbox, Button, Form, Input, Select, message, InputNumber, Tooltip, Modal } from 'antd';
import { QuestionCircleOutlined, ExclamationCircleFilled } from '@ant-design/icons';
import { useHistory } from "react-router"
import merchandiseApi from '../../services/merchandise.js';
import shopCartApi from "../../services/shopCartApi.js"
import { getTeamId } from "../../utils/cookie"
import "./style/Buyment.less";
const { confirm } = Modal;
import intl from 'react-intl-universal';

const PriceHelp = () => {
    return <>
        <div>{intl.get('DAILY_EXPLANATION')}</div>
        <div>{intl.get('MOUNTHLY_EXPLANATION')}</div>
        <div>{intl.get('BY_VOLUME_EXPLANATION')}</div>
    </>;
}

function Buyment({ buyDetail, onChildrenDrawerClose, onThreeDrawerOpen }) {
    const history = useHistory()
    const intervalRef = useRef(0)
    const [form] = Form.useForm()
    const [price, setPrice] = useState(0)
    const [durationValue, setDurationValue] = useState(1)
    const [amountValue, setAmountValue] = useState(1)
    const [autoRenew, setAutoRenew] = useState(false)
    const [btnLoading, setBtnLoading] = useState(false)
    const [isRead, setIsRead] = useState(false)
    const [ischeck, setIsCheck] = useState(false)
    useEffect(() => {
        isReadProtocol()
    }, [])

    const isReadProtocol = () => {
        shopCartApi.inquireIsRead()
            .then(res => {
                const { licenseRead } = res.data;
                if (licenseRead === 0) {
                    setIsRead(false);
                    setIsCheck(false)
                } else {
                    setIsCheck(true);
                    setIsRead(true)
                }
            })
    }

    const showDurationFormItem = () => {
        if (buyDetail.chargeType === 'Daily') {
            return <InputNumber addonAfter={intl.get('ARTHER_DAY')} style={{ width: '100%' }} maxLength={3} max={999} value={durationValue} onChange={handleDuration} />
        }
        if (buyDetail.chargeType === 'Month') {
            return <Select
                style={{ width: '100%' }}
                value={durationValue}
                onChange={selectDuration}
                options={[
                    {
                        value: 1,
                        label: '1'+intl.get('MOUNTH'),
                    },
                    {
                        value: 2,
                        label: '2'+intl.get('MOUNTH'),
                    },
                    {
                        value: 3,
                        label: '3'+intl.get('MOUNTH'),
                    },
                    {
                        value: 4,
                        label: '4'+intl.get('MOUNTH'),
                    },
                    {
                        value: 5,
                        label: '5'+intl.get('MOUNTH'),
                    },
                    {
                        value: 6,
                        label: '6'+intl.get('MOUNTH'),
                    },
                    {
                        value: 7,
                        label: '7'+intl.get('MOUNTH'),
                    },
                    {
                        value: 8,
                        label: '8'+intl.get('MOUNTH'),
                    },
                    {
                        value: 9,
                        label: '9'+intl.get('MOUNTH'),
                    },
                    {
                        value: 10,
                        label: '10'+intl.get('MOUNTH'),
                    },
                    {
                        value: 11,
                        label: '11'+intl.get('MOUNTH'),
                    },
                    {
                        value: 12,
                        label: '1'+intl.get('YEAR'),
                    },
                    {
                        value: 24,
                        label: '2'+intl.get('YEAR'),
                    },
                    {
                        value: 36,
                        label: '3'+intl.get('YEAR'),
                    }
                ]}
            />
        }
    }

    const showCountItem = () => {
        if (buyDetail.type === 'storage') {
            return <InputNumber style={{ width: '100%' }} addonAfter="GB" maxLength={7} value={amountValue} onChange={handleAmountValue} />
        } else {
            return <InputNumber style={{ width: '100%' }} value={amountValue} max={buyDetail.inventory} onChange={handleAmountValue} />
        }
    }

    const handleDuration = (value) => {
        setDurationValue(value)
    }

    const selectDuration = (value) => {
        setDurationValue(value)
    }

    const handleAmountValue = (value) => {
        setAmountValue(value)
    }

    const calculatePrice = (params) => {
        merchandiseApi.calculatePrice(params).then(res => {
            setPrice(res.data)
        }).catch(err => {
            console.error(err)
        })
    }

    const handleClose = () => {
        onChildrenDrawerClose()
        setAutoRenew(false)
        clearInterval(intervalRef.current)
    }

    const onChangeAutoRenew = (e) => {
        setAutoRenew(e.target.checked)
    }

    const gotoPay = () => {
        let params = {}
        if (isRead) {
            if (ischeck) {
                setBtnLoading(true)
                if (price === 0) {
                    form.validateFields().then((res => {
                        params = {
                            teamId: getTeamId(),
                            productId: buyDetail.id,
                            duration: durationValue,
                            count: amountValue,
                            totalPrice: price,
                            autoRenew,
                        }
                        shopCartApi.createOrder(params).then(res => {
                            if (res.data.status === "paid") {
                                message.success(intl.get('PAYMENT')+intl.get('SUCCESS'))
                                setTimeout(() => {
                                    window.location.href = '/console/instancemanage/calculateinstance'
                                }, 1000);
                            }
                            if (res.data.status === 'allocation_failed_cancel') {
                                message.warning(intl.get('RESOURCE_ALLOCATIOM_FAILED_AND_ORDER_CANCELLED'))
                            }
                            setBtnLoading(false)
                        }).catch(err => {
                            setBtnLoading(false)
                            console.error(err)
                        })
                    })).catch(info => {
                        setBtnLoading(false)
                        console.log('Validate Failed:', info);
                    })
                } else {
                    form.validateFields().then(values => {
                        if (isDynamic()) {
                            params = {
                                teamId: getTeamId(),
                                productId: buyDetail.id,
                                totalPrice: price,
                                count: 1
                            }
                        } else {
                            params = {
                                teamId: getTeamId(),
                                productId: buyDetail.id,
                                totalPrice: price,
                                duration: durationValue,
                                count: amountValue,
                                autoRenew,
                            }
                        }
                        onThreeDrawerOpen(params)
                        clearInterval(intervalRef.current)
                        setBtnLoading(false)
                    }).catch(info => {
                        setBtnLoading(false)
                        console.log('Validate Failed:', info);
                    });
                }
            } else showConfirm()
        } else showConfirm()
    }


    const showConfirm = () => {
        confirm({
            title: intl.get('PLEASE_CLICK_TO_READ_PROTOCOL'),
            icon: <ExclamationCircleFilled />,
            okText: intl.get('GO_TO_READ'),
            onOk() {
                reading()
                console.log('OK');
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    };

    const reading = () => {
        console.log('reading.......')
        shopCartApi.readProtocol().then(res => {
            window.open(window.globalConfig?.agreement?.service)
            setIsRead(true)
        })
    }



    useEffect(() => {
        if (isDynamic() || durationValue <= 0 || !Number.isInteger(durationValue) || amountValue <= 0 || !Number.isInteger(amountValue)) {
            setPrice(buyDetail.actualPrice)
        } else {
            clearInterval(intervalRef.current)
            calculatePrice({ id: buyDetail.id, duration: +durationValue, amount: +amountValue })
            intervalRef.current = setInterval(() => {
                calculatePrice({ id: buyDetail.id, duration: +durationValue, amount: +amountValue })
            }, 60000)
        }
    }, [buyDetail, durationValue, amountValue])

    useEffect(() => {
        form.setFieldsValue({ duration: 1, count: 1 })
        setDurationValue(1)
        setAmountValue(1)
    }, [buyDetail])

    const isDynamic = () => {
        return buyDetail.chargeType === "Dynamic"
    }

    useEffect(() => {
        return () => {
            clearInterval(intervalRef.current)
        }
    }, [])

    const rightTitle = () => {
        const unit = buyDetail.priceUnit === 'dollar' ? '美元' : '元';
        const symbol = buyDetail.priceUnit === 'dollar' ? '$' : '¥';
        const chargeType = { Dynamic: intl.get('HOUR'), Month: intl.get('MOUNTH'), Daily: intl.get('DAY') }[buyDetail.chargeType];
        return (
            <div className="right">
                <div className="actual-price">
                    <span className='rmb'>{symbol}</span>
                    <span className='num'>{buyDetail.actualPrice}{unit}</span>
                    <span className='unit'>/{chargeType}</span>
                </div>
                <div className="base-price">
                    <span className='rmb'>{symbol}</span>
                    <span className='num'>{buyDetail.basisPrice}{unit}</span>
                    <span className='unit'>/{chargeType}</span>
                </div>
                <div className="discount">{culatingDiscount(buyDetail.discountCoefficient)}</div>
            </div>
        );
    }

    const calculateinstanceList = () => (
        <div className="list-item" >
            <div className="item-header">
                <div className="left">{buyDetail.name} <span className='inventory-label'>{intl.get('STOCK_DIGIT')} <span>{buyDetail.inventory}</span></span></div>
                {rightTitle()}
            </div>
            <div className="item-content">
                {
                    buyDetail.gpuCount == 0 ? null : <div className="title">{buyDetail.gpuVendor + buyDetail.gpuModel + '/' + buyDetail.gpuMemory}</div>
                }
                {/* <div className="title">{buyDetail.gpuVendor + buyDetail.gpuModel + '/' + buyDetail.gpuMemory}</div> */}
                <div className="flex-p">
                    <p className='p-30'><span className='item-label'> {intl.get('GPU_NUMBER')}</span>{buyDetail.gpuCount}</p>
                    <p className='p-30'><span className='item-label'> {intl.get('GPU_DRIVE')}</span>{buyDetail.gpuDriver}</p>
                    <p className='p-30'><span className='item-label'> {intl.get('CPU_MODEL')}/{intl.get('CORE_NUMBER')}</span>{buyDetail.cpuModel + '/' + buyDetail.cpuCore}</p>
                </div>
                <div className="flex-p">
                    <p className='p-30'><span className='item-label'> {intl.get('HARD_DISK')}</span>{buyDetail.storage}GB</p>
                    <p className='p-30'><span className='item-label'> {intl.get('MEMORY')}</span>{buyDetail.memory}GB</p>
                    <p className='p-30'><span className='item-label'> {intl.get('MODEL_PARAMETER_MAGNITUDE')}</span>{buyDetail.parameterMagnitude ? buyDetail.parameterMagnitude + 'B' : ''}</p>
                </div>
                <div className="flex-p">
                    <p className='p-30'><span className='item-label'> {intl.get('CUDN_VERSION')}</span>{buyDetail.cudaVersion}</p>
                    <p className='p-30'><span className='item-label'> {intl.get('OPERATION_SYSTEM')}</span>{buyDetail.os}</p>
                </div>
                <div>
                    <p><span className='item-label'> {intl.get('FIT_MODEL')}</span>{buyDetail.applicableModel || ''}</p>
                </div>
                <div className='describe'>
                    <p><span className='item-label'> {intl.get('DESCRIPTION')}</span>{buyDetail.description}</p>
                </div>
            </div>
        </div>
    )

    const storeList = () => (
        <div className="list-item">
            <div className="item-header">
                <div className="left">{buyDetail.name}</div>
                {rightTitle()}
            </div>
            <div className="item-content">
                <div className="flex-p" style={{ padding: "10px 0", }}>
                    <p><span className='item-label'> {intl.get('FORM_OF_MEASUREMENT_P')}</span>{buyDetail.meterageMode}GB</p>
                    <p><span className='item-label'> {intl.get('STORAGE_CLASS')}</span>{buyDetail.storageType}</p>
                </div>
                <div className='describe'>
                    <p><span className='item-label'> {intl.get('DESCRIPTION')}</span>{buyDetail.description}</p>
                </div>
            </div>
        </div>
    )

    const culatingDiscount = (discountCoefficient) => {
        let num = discountCoefficient * 1000 / 100
        return num < 10 ? (num + intl.get('DISCOUNT')) : intl.get('ORIGINAL_PRICE')
    }

    return (
        <div>
            <div className="buyment-content">
                {
                    buyDetail.typeValue === 'storage' ? storeList() : calculateinstanceList()
                }

                {
                    isDynamic() ? null : <Form
                        form={form}
                        autoComplete="off"
                    >
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <Form.Item
                                name="duration"
                                label={intl.get('PURCHASE_DURATION')}
                                labelAlign={"right"}
                                labelCol={{
                                    span: 6,
                                }}
                                wrapperCol={{
                                    span: 18,
                                }}
                                style={{
                                    width: 400,
                                }}
                                rules={[
                                    {
                                        required: true,
                                        message: intl.get('PLEASE_ENTER_POSITIVE_INTEGER_GREATER_THAN_0'),
                                        validator: (_, value) =>
                                            value > 0 && Number.isInteger(value) ? Promise.resolve() : Promise.reject(new Error('Should accept agreement')),
                                    },
                                ]}
                            >
                                {showDurationFormItem()}
                            </Form.Item>
                            <Checkbox style={{ marginBottom: '20px', marginLeft: '10px' }} checked={autoRenew} onChange={onChangeAutoRenew}>{intl.get('AUTOMETIC_RENEWAL')}</Checkbox>
                        </div>

                        <Form.Item
                            labelCol={{
                                span: 6,
                            }}
                            wrapperCol={{
                                span: 18,
                            }}
                            style={{
                                width: 400,
                            }}
                            name="count"
                            label={buyDetail.typeValue === "storage" ? intl.get('CAPACITY') : intl.get('PURCHASE_QUANTITY')}
                            labelAlign={"right"}
                            rules={[
                                {
                                    required: true,
                                    message: intl.get('PLEASE_ENTER_POSITIVE_INTEGER_GREATER_THAN_0'),
                                    validator: (_, value) =>
                                        value > 0 && Number.isInteger(value) ? Promise.resolve() : Promise.reject(new Error('Should accept agreement')),
                                },
                            ]}
                        >
                            {showCountItem()}
                        </Form.Item>
                    </Form>
                }

                <div style={{ padding: '0 0 0 20px' }}>
                    <Checkbox
                        checked={ischeck}
                        onChange={(e) => {
                            if (isRead) {
                                // 允许选中
                                setIsCheck(e.target.checked)
                            } else {
                                showConfirm()
                            }
                        }}
                    >
                        <span style={{ color: 'red', fontSize: '19px', fontWeight: 100 }}>
                            *</span>{intl.get('PLEASE_READ_THE_USER_CAREFULLY_BEFORE_BUYING')}
                        <Button type='link' onClick={() => reading()}>{intl.get('USER_AGREEMENT')}</Button>
                        {intl.get('AND_SELECT_CONFIRM_TO_AGREEMENT')}
                    </Checkbox>
                </div>

            </div>
            <div className="buyment-footer">
                {/* {
                    isDynamic() ? <div style={{ marginRight: '20px', color: '#666' }}>按量购买下单时无需支付，每天凌晨自动扣前一天的费用</div> : null
                } */}
                <div style={{ marginRight: '20px', display: 'flex', alignItems: 'center' }}>{intl.get('ALL_IN_COST')}
                    <Tooltip placement="top" title={<PriceHelp />}>
                        <QuestionCircleOutlined style={{ margin: '0px 10px 0px 5px' }} />
                    </Tooltip>
                    <span className='price'>{buyDetail.priceUnit === 'dollar' ? `$ ${price} 美元` : `¥ ${price} 元`}</span></div>
                <Button style={{ marginRight: '20px' }} onClick={handleClose}>
                {intl.get('NEGATE')}
                </Button>
                <Button type="primary" style={{ marginRight: '20px' }} onClick={() => { gotoPay() }} loading={btnLoading}>
                {intl.get('GO_TO_PAY')}
                </Button>
            </div>
        </div >
    );
}

export default Buyment;