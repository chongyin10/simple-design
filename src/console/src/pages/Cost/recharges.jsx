import React, { useState, useRef } from 'react';
import { Divider, Input, Radio, Checkbox, Button, message, InputNumber } from 'antd';
import { moneyFormat } from '../../utils/cost';
import QRCode from 'qrcodejs2';
import costApi from '../../serviceApi/cost';
import shopCartApi from '../../serviceApi/shopCartApi';
import { useHistory } from "react-router";
import './styles/recharges.less';
import { useEffect } from 'react';
import { teamId, userId } from '../../utils/cookie'
const global = require('../../../../config/global.js')
import intl from 'react-intl-universal';




const reg = /^-?(?:0|[1-9]\d{0,8})(?:\.\d{0,2}[1-9])?$/;
let last = 0;

function Recharges() {
    const history = useHistory()
    const aplRef = useRef();
    const intervalRef = useRef(0);

    const payTypes = ['alipay', 'weChat', '', 'other', 'paypal'];
    const [alipayChecked, setAlipayChecked] = useState(true);
    const [weChatChecked, setWeChatChecked] = useState(false);
    const [stripeChecked, setStripeChecked] = useState(false);
    const [paypalChecked, setPaypalChecked] = useState(false);
    const [swChecked, setSwChecked] = useState(false);
    const [pay, setPay] = useState(payTypes[0]);
    const [payType, setPayType] = useState(0);
    const [payUrl, setPayUrl] = useState('');
    const [visible, setVisible] = useState(false);
    const [load, setLoad] = useState(false);
    const [amount, setAmount] = useState('');
    const [amountError, setAmountError] = useState('');
    const [checked, setChecked] = useState(false);
    const [xyError, setXyError] = useState('');
    const [tradeNo, setTradeNo] = useState('');
    const [payTitle, setPayTitle] = useState('');
    const [moeny, setMoeny] = useState(0);
    const [originTargetUrl, setoriginTargetUrl] = useState('')

    const amountMsgs = {
        0: intl.get('THE_TOP_UP_AMOUNT_CANNOT_BE_EMPTY'),
        1: intl.get('THE_AMOUNT_ENTERED_IS_WRONG'),
    }

    const xyMsgs = {
        0: intl.get('PLEASE_TICK_PROTOCOL'),
    }
    const getOpenUrl = () => {
        shopCartApi.getOpenUrl().then(res => {
            setoriginTargetUrl(location.protocol + '//' + res.data)
        })
    }

    useEffect(() => {
        getOpenUrl()
        getMoenyApi();
    }, [])

    const clickAlipayChecked = (e, alipay) => {
        e.stopPropagation();
        setAlipayChecked(true);
        setWeChatChecked(false);
        setStripeChecked(false)
        setSwChecked(false)
        setPaypalChecked(false)
        setPay(alipay);
        setPayType(0);
    }

    const clickWeChatChecked = (e, weChat) => {
        e.stopPropagation();
        setAlipayChecked(false);
        setWeChatChecked(true);
        setStripeChecked(false)
        setSwChecked(false)
        setPaypalChecked(false)
        setPay(weChat);
        setPayType(1);
    }

    const clickStripeChecked = (e, sprite) => {
        e.stopPropagation();
        setAlipayChecked(false);
        setWeChatChecked(false);
        setStripeChecked(true)
        setSwChecked(false)
        setPaypalChecked(false)
        setPay(sprite);
        setPayType(3);
    }

    const clickPaypalChecked = (e, sprite) => {
        e.stopPropagation();
        setAlipayChecked(false);
        setWeChatChecked(false);
        setStripeChecked(false)
        setSwChecked(false)
        setPaypalChecked(true)
        setPay(sprite);
        setPayType(5);
    }

    const clickSwChecked = (e, sw) => {
        e.stopPropagation();
        setAlipayChecked(false);
        setWeChatChecked(false);
        setStripeChecked(false)
        setSwChecked(true)
        setPay(sw);
        setPayType(4);
    }

    const onChange = (e) => {
        if (e.target.checked) {
            setXyError('');
        }
        if (visible) return;
        setChecked(e.target.checked)
    }

    const toPay = () => {
        /*        if (!checked) {
                    setXyError(xyMsgs[0]);
                    return;
                }*/
        if (!checkAmount(amount)) {
            return;
        }
        setLoad(true);
        hrottle(function () {
            exePayCodeApi(payType, amount)
        })
    }

    const exePayCodeApi = (payType, amount) => {
        if (payType === 3 && amount < 4.2) return message.warning(intl.get('THE_MINIMUM_VOERSEAS_PAYMENT_IS58CENTS_OR_4_2_YUAN'))
        setPayTitle(`${intl.get('PLEAD')}${payType == 0 ? intl.get('ALIPAY') : payType == 4 ? intl.get('RECOVER') + intl.get('ALIPAY') + intl.get('OR') + intl.get('WEPAY') : intl.get('WEPAY')}${intl.get('SCAN_TO_PAY')}`)
        if (payType == 4) {
            let params = {
                teamId,
                userId,
                amount: amount,
                buyType: '1',
                payType: '4'
            }
            shopCartApi.swCreateOrder(params).then(result => {
                if (result.code == 200) {
                    const url = `${originTargetUrl}/2/api/v1/idp-product/order/buy?tradeNo=${result.data.tradeNo}`
                    setVisible(true);
                    setPayUrl(url);
                    createQrcode(url, result.data.tradeNo, true);
                    setTradeNo(result.data.tradeNo);
                }
            }).catch(error => {
                initStatus();
            })
        } else {
            costApi.getPayCodeApi(payType, amount).then(result => {
                if (result.code == 200) {
                    if (payType === 3) {
                        location.replace(result.data.codeUrl)
                    } else if (payType == 5) {
                        location.href = result.data.toPayHtml;
                    } else {
                        setVisible(true);
                        setPayUrl(result.data.codeUrl);
                        createQrcode(result.data.codeUrl, result.data.tradeNo, true);
                        setTradeNo(result.data.tradeNo);
                    }
                } else {
                    initStatus();
                }
            }).catch(error => {
                initStatus();
            })
        }
    }

    const hrottle = (callback) => {
        let now = new Date().getTime();;
        if (now - last > 1000) {
            last = new Date().getTime();
            callback()
        }
    }

    const checkAmount = (val) => {
        let flg = false;
        setAmount(val);
        if (val.length === 0) {
            setAmountError(amountMsgs[0]);
        } else if (!reg.test(val)) {
            setAmountError(amountMsgs[1]);
        } else {
            setAmountError('');
            flg = true;
        }
        return flg;
    }

    const initStatus = () => {
        setVisible(false);
        setPayUrl('');
        setLoad(false);
    }

    const createQrcode = (payUrl, trade_no, vis) => {
        const qr = document.getElementById('qrCodeUrl');
        const qrcode = new QRCode(qr, {
            text: payUrl,//可以是链接，也可以是文本
            width: 280,//二维码的宽度
            height: 280,//二维码的高度
            colorLight: '#ffffff',//二维码背景色
            colorDark: '#000000',//二维码前景色，以实现红码为例
            correctLevel: QRCode.CorrectLevel.H//纠错等级
        });
        if (vis) {
            intervalRef.current = setInterval(async () => {
                try {
                    const reuslt = await costApi.getPayStatusApi(trade_no);
                    if (reuslt.code === 200) {
                        if (reuslt.data.status == 'paid') {
                            clearInterval(intervalRef.current);
                            setPayTitle(intl.get('PAYMENT_IS_SUCCESSFUL_WILL_JUMP'));
                            const itle = setTimeout(() => {
                                history.push('/cost/overview');
                                clearTimeout(itle);
                            }, 3000);
                        }
                        if (reuslt.data.status === 'allocation_failed_cancel') {
                            clearInterval(intervalRef.current)
                            setPayTitle(intl.get('IF_RESOURCE_ALLOCSTION_FAILS'));
                            const itle = setTimeout(() => {
                                history.push('/cost/overview');
                                clearTimeout(itle);
                            }, 3000);
                        }
                    }
                } catch (error) {
                    setPayTitle(intl.get('DEDUCTION_FAILED_PLEASE_TRY_AGAIN'));
                }
            }, 1000);
        }
    }

    const getMoenyApi = async () => {
        const result = await costApi.getFinanceAccountApi();
        if (result.code == 200) {
            setMoeny(result.data.totalBalance / 100);
        }
    }

    const goback = () => {
        const qr = document.getElementById('qrCodeUrl');
        qr.innerHTML = ''
        initStatus()
        clearInterval(intervalRef.current);
    }

    return (
        <>
            <div className='recharges-main'>
                <div className='recharges-body'>
                    <div className='recharges-title'>{intl.get('TEAM_MENU_COST_RECHARGES')}</div>
                    <Divider plain style={{ background: 'rgb(24, 144, 255)', opacity: 0.3 }}></Divider>
                    <div className='recharges-table'>
                        <div className='recharges-menu recharges-balance'>
                            <span className='recharges-label'>{intl.get('CURRENT_ACCOUNT_BALANCE')}: </span>
                            <span className='recharges-units'>{window.globalConfig?.currency?.symbol}</span>
                            <span className='recharges-je'>{moneyFormat(moeny)}</span>
                        </div>
                        <div className='recharges-menu recharges-sum'>
                            <div style={{ position: 'relative' }}>
                                <div>
                                    <span className='recharges-label'>{intl.get('RECHARGE_AMOUNT')}: </span>
                                    <span className='recharges-je-input'>
                                        <InputNumber min={0.01} precision={2} disabled={visible} onChange={(e) => checkAmount(e + '')} placeholder={intl.get('PLEASE_ENTER') + intl.get('RECHARGE_AMOUNT')} style={{ width: 300 }}></InputNumber>
                                    </span>
                                </div>
                                <div className='recharges-amount-error'>{amountError}</div>
                            </div>
                        </div>
                        <div>
                            <div style={{ marginBottom: '30px' }}>
                                <div style={{ marginLeft: '80px', marginBottom: '30px' }} id="qrCodeUrl"></div>
                                <div style={visible ? { marginTop: '30px' } : { display: 'none' }}>
                                    {intl.get('TIP')}：<span style={{ color: 'red' }}>{payTitle}</span>
                                </div>
                                <div style={visible ? { marginTop: '30px' } : { display: 'none' }}>
                                    <span style={{ color: '#1890ff' }} onClick={goback}>{intl.get('RETURN_TO_THE_RECHARGE_PAGE')}</span>
                                </div>
                            </div>
                            <div style={visible ? { display: 'none' } : {}} className='recharges-menu recharges-balance'>
                                <div className='recharges-label' style={{ marginBottom: '15px' }}>{intl.get('CHANNEL')} </div>
                                <div className='recharges-qd'>
                                    <div onClick={(e) => clickAlipayChecked(e, payTypes[0])} className='recharges-card'>
                                        <Radio onChange={(e) => clickAlipayChecked(e, payTypes[0])} checked={alipayChecked}></Radio>
                                        <img style={{ width: '35px', margin: '0px 10px' }} src={require('../../assets/svg/alipay.svg').default}></img>
                                        <span style={{ fontSize: '16px', marginLeft: '10px' }}>{intl.get('ALIPAY')}</span>
                                    </div>
                                    <div onClick={(e) => clickWeChatChecked(e, payTypes[1])} className='recharges-card'>
                                        <Radio onChange={(e) => clickWeChatChecked(e, payTypes[1])} checked={weChatChecked}></Radio>
                                        <img style={{ width: '35px', margin: '0px 10px' }} src={require('../../assets/svg/weChat.svg').default}></img>
                                        <span style={{ fontSize: '16px', marginLeft: '10px' }}>{intl.get('WEPAY')}</span>
                                    </div>
                                    <div onClick={(e) => clickStripeChecked(e, payTypes[3])} className='recharges-card'>
                                        <Radio onChange={(e) => clickStripeChecked(e, payTypes[3])} checked={stripeChecked}></Radio>
                                        <img style={{ width: '35px', margin: '0px 10px' }} src={require('../../assets/svg/other.png').default}></img>
                                        <span style={{ fontSize: '16px', marginLeft: '10px' }}>{intl.get('STRIPE_PAY')}</span>
                                    </div>
                                    <div onClick={(e) => clickPaypalChecked(e, payTypes[4])} className='recharges-card'>
                                        <Radio onChange={(e) => clickPaypalChecked(e, payTypes[4])} checked={paypalChecked}></Radio>
                                        <img style={{ width: '35px', margin: '0px 10px' }} src={require('../../assets/svg/paypal.svg').default}></img>
                                        <span style={{ fontSize: '16px', marginLeft: '10px' }}>{intl.get('PAYPAL_PAY')}</span>
                                    </div>
                                    {/* <div onClick={(e) => clickSwChecked(e, payTypes[4])} className='recharges-card'>
                                        <Radio onChange={(e) => clickSwChecked(e, payTypes[4])} checked={swChecked}></Radio>
                                        <span style={{ fontSize: '16px', marginLeft: '10px' }}>扫码支付（微信/支付宝）</span>
                                    </div> */}
                                </div>
                            </div>
                            <div className='recharges-tips'>
                                <div className='recharges-wxts'>{intl.get('FRIENDLY_TIPS')}：</div>
                                <div className='recharges-text'>
                                    <div>{intl.get('CREDIT_CARD_AND_UNIONPAY_ARE_NOT_SUPPORTED')}</div>
                                    <div style={{ color: '#926e2a' }}>{intl.get('IF_YOU_HAVE_OUTSTSNDING_BILL_ETC')}</div>
                                    <div>{intl.get('AFTER_RECHARGING_PLEASE_SETTLE_ETC')}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div style={visible ? { display: 'none' } : {}}>
                        {/*                        <div className='recharges-xy' style={{ position: 'relative' }}>
                            <Checkbox value={checked} onChange={onChange}>我已了解 《支付协议》《xxx》</Checkbox>
                            <div style={{ fontSize: '12px', color: 'red', opacity: '.8', position: 'absolute' }}>{xyError}</div>
                        </div>*/}
                        <div className='recharges-paybtn'>
                            <Button loading={visible} onClick={() => toPay()} type="primary" style={{ width: '70%', height: '45px' }}>
                                <span style={{ fontSize: '16px' }}>{intl.get('ZHI')}<span style={{ marginLeft: '15px' }}>{intl.get('FU')}</span><sapn style={visible ? { marginLeft: '15px' } : { display: 'none' }}>{intl.get('ZHONG')}</sapn></span>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Recharges
