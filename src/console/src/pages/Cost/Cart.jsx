import React, { useState, useRef, useEffect } from 'react';
import { Button, Drawer, Radio, Space, message } from "antd";
import QRCode from "qrcodejs2"
import shopCartApi from '../../serviceApi/shopCartApi';

import { userId, teamId } from "../../utils/cookie"
import zfbImg from "../../assets/zhifubao.png";
import wxImg from "../../assets/weixin.png";
import stripeImg from '../../assets/svg/other.png'
import paypalImg from '../../assets/svg/paypal.svg'
import intl from 'react-intl-universal';
// const global = require('../../../../config/global.js')
import './styles/cart.less';

function Cart({ visible = false, totalPrice = 0, setVisible, onFinish, tradeNo }) {
    const [btnLoading, setBtnLoading] = useState(false)
    const [payMethod, setPayMethod] = useState(2);
    const [financeAccount, setFinanceAccount] = useState(0);
    const [originTargetUrl, setoriginTargetUrl] = useState('')
    const qrCodeDomRef = useRef();
    const intervalRef = useRef(0);
    const tradeNoRef = useRef(0);
    const qrCodeRef = useRef("")

    const getOpenUrl = () => {
        shopCartApi.getOpenUrl().then(res => {
            setoriginTargetUrl(location.protocol + '//' + res.data)
        })
    }

    useEffect(() => {
        getOpenUrl()
        exeFinanceAccountApi();
    }, []);

    const exeFinanceAccountApi = async () => {
        shopCartApi.getFinanceAccountApi().then(res => {
            const avlBalance = res.data.avlBalance
            setFinanceAccount(avlBalance / 100)
        }).catch(err => {
            console.error(err)
        })
    }

    const onClose = () => {
        setBtnLoading(false)
        setVisible(false);
    }


    const payOrderClick = () => {
        setBtnLoading(true)
        clearInterval(intervalRef)
        qrCodeDomRef.current.innerHTML = ""
        if (payMethod === 2) {
            if (financeAccount < (totalPrice / 100)) {
                setBtnLoading(false)
                message.warning('账户余额不足 ')
                return
            }
            payOrder()
        } else if (payMethod === 3) {
            let params = {
                teamId,
                userId,
                payType: payMethod,
                amount: totalPrice / 100,
                tradeNo: tradeNo
            }
            shopCartApi.buyProduct(params).then((res) => {
                location.replace(res.data.codeUrl)
            })
        } else if (payMethod === 4) {
            creatSWCode()
        } else {
            let params = {
                teamId,
                userId,
                payType: payMethod,
                amount: totalPrice / 100,
                tradeNo: tradeNo
            }
            shopCartApi.buyProduct(params).then((res) => {
                tradeNoRef.current = res.data.tradeNo
                const qr = document.getElementById('qrcode-url');
                qrCodeRef.current = new QRCode(qr, {
                    text: res.data.codeUrl,//可以是链接，也可以是文本
                    width: 280,//二维码的宽度
                    height: 280,//二维码的高度
                    colorLight: '#ffffff',//二维码背景色
                    colorDark: '#000000',//二维码前景色，以实现红码为例
                    correctLevel: QRCode.CorrectLevel.H//纠错等级
                })
                pollFn()
            })
        }
    }

    const pollFn = () => {
        clearInterval(intervalRef.current)
        intervalRef.current = setInterval(() => {
            shopCartApi.getChargeStatus({ tradeNo: tradeNo }).then((res) => {
                if (res.data.status === "paid") {
                    clearInterval(intervalRef.current)
                    message.success('支付成功')
                    setVisible(false);
                    onFinish({ pageIndexParams: 1, pageSizeParams: 10 });
                    setBtnLoading(false)
                }
                if (res.data.status === 'allocation_failed_cancel') {
                    clearInterval(intervalRef.current)
                    message.warning('资源分配失败，订单已作废')
                    setVisible(false);
                    onFinish({ pageIndexParams: 1, pageSizeParams: 10 });
                    setBtnLoading(false)
                }
            })
        }, 1000)
    }

    const payOrder = () => {
        let params = {
            teamId,
            userId,
            payType: payMethod,
            amount: totalPrice / 100,
            tradeNo
        }
        shopCartApi.buyProduct(params).then((res) => {
            if (res.data.status === 'paid') {
                message.success('支付成功')
                setVisible(false);
                onFinish({ pageIndexParams: 1, pageSizeParams: 10 });
                setBtnLoading(false)
            }
            if (res.data.status === 'allocation_failed_cancel') {
                message.warning('资源分配失败，订单已作废')
                setVisible(false);
                onFinish({ pageIndexParams: 1, pageSizeParams: 10 });
                setBtnLoading(false)
            }
        })
    }

    const openCode = (val) => {
        if (val === 4) {
            setBtnLoading(true)
            creatSWCode()
        }
    }
    const creatSWCode = () => {
        let params = {
            teamId,
            userId,
            amount: totalPrice / 100,
            buyType: '2',
            tradeNo: tradeNo,
            payType: '4'
        }
        shopCartApi.swCreateOrder(params).then((res) => {
            const url = `${originTargetUrl}/2/api/v1/idp-product/order/buy?tradeNo=${tradeNo}`
            const qr = document.getElementById('qrcode-url');
            qrCodeRef.current = new QRCode(qr, {
                text: url,//可以是链接，也可以是文本
                width: 280,//二维码的宽度
                height: 280,//二维码的高度
                colorLight: '#ffffff',//二维码背景色
                colorDark: '#000000',//二维码前景色，以实现红码为例
                correctLevel: QRCode.CorrectLevel.H//纠错等级
            })
        })
        pollFn()
    }

    useEffect(() => {
        if (visible) {
            setPayMethod(2)
            if (qrCodeRef.current) {
                qrCodeDomRef.current.innerHTML = ""
            }
        }
        clearInterval(intervalRef.current)
    }, [visible])

    return (
        <Drawer
            maskClosable={false}
            className={"order-details-container"}
            width={720}
            title={<h3 style={{ fontWeight: "bold" }}>订单支付</h3>}
            placement="right"
            onClose={onClose}
            visible={visible}
            footer={
                <div className={"shop-cart-drawer-footer-container"}>
                    <Button
                        onClick={payOrderClick}
                        type={"primary"}
                        size={"large"}
                        loading={btnLoading}
                    >
                        支付
                    </Button>
                </div>
            }
        >
            <div className={"order-card-container"}>
                <div className={"amount-container"}>
                    <span>应付金额:</span>
                    <span style={{ marginLeft: 10, marginRight: 3, color: "#17B3F3" }}>
                        {totalPrice / 100}
                    </span>
                    <span>元</span>
                </div>

                <div className={"pay-container"}>
                    <div style={{ marginBottom: 10 }}>支付渠道:</div>{" "}
                    <Radio.Group
                        value={payMethod}
                        onChange={(ev) => {
                            setBtnLoading(false)
                            setPayMethod(ev.target.value)
                            if (qrCodeRef.current) {
                                qrCodeDomRef.current.innerHTML = ""
                                clearInterval(intervalRef.current)
                            }
                            // openCode(ev.target.value)
                        }}
                        style={{ width: "100%" }}
                    >
                        <Space direction="vertical" style={{ width: "100%" }}>
                            <div className={"pay-item"}>
                                <Radio value={2} />
                                <span className={"pay-span"}>账户余额 ￥</span>
                                <span className={"pay-span"}>{financeAccount}</span>
                            </div>
                            <div className={"pay-item"}>
                                <Radio value={0} />
                                <img className={"icon"} src={zfbImg} alt="" />
                                <span className={"pay-span"}>支付宝</span>
                            </div>
                            <div className={"pay-item"}>
                                <Radio value={1} />
                                <img className={"icon"} src={wxImg} alt="" />
                                <span className={"pay-span"}>微信</span>
                            </div>
                            {totalPrice > 420 ? <div className={"pay-item"}>
                                <Radio value={3} />
                                <img className={"icon"} src={stripeImg} style={{ width: '38px', height: '36px', margin: '0px 6px' }} alt="" />
                                <span className={"pay-span"}>{intl.get('STRIPE_PAY')}</span>
                            </div> : null}
                            <div className={"pay-item"}>
                                <Radio value={5} />
                                <img className={"icon"} src={paypalImg} alt="" />
                                <span className={"pay-span"}>{intl.get('PAYPAL_PAY')}</span>
                            </div>
                            {/* <div className={"pay-item"}>
                                <Radio value={4} />
                                <span className={"pay-span"}>扫码支付（微信/支付宝）</span>
                            </div> */}
                        </Space>
                    </Radio.Group>
                </div>
                {
                    payMethod == 2 ? null : <div className="buy-tips">
                        温馨提示：若需要企业开票，请联系客服进行付款，请勿使用私人账户支付。
                    </div>
                }
                <div className="code-box">
                    <div ref={qrCodeDomRef} style={{ marginTop: 30 }} id={'qrcode-url'}></div>
                    {
                        (payMethod === 4 && btnLoading) ? <div className="tip">
                            <p className="buy-tips">*请打开微信或支付宝扫码支付。</p>
                            <div className="img-box">
                                <img src={wxImg} alt="" />
                                <img src={zfbImg} alt="" />
                            </div>
                        </div> : null
                    }
                </div>
            </div>
        </Drawer>
    )
}

export default Cart;