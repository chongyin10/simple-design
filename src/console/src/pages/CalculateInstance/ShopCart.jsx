import React, { useEffect, useRef, useState } from "react"
import PropTypes from "prop-types"
import "./style/ShopCart.less"
import { Button, Drawer, Radio, Space, Checkbox, message } from "antd"
import { useHistory } from "react-router"
import { QuestionCircleFilled } from "@ant-design/icons"
import shopCartApi from "../../services/shopCartApi.js"
import { userId, teamId } from "../../utils/cookie"
import zfbImg from "../../assets/zhifubao.png"
import wxImg from "../../assets/weixin.png"
import stripeImg from '../../assets/svg/other.png'
import paypalImg from '../../assets/svg/paypal.svg'
import QRCode from "qrcodejs2"
import intl from 'react-intl-universal';

function ShopCart({ selectedProduct, onThreeDrawerClose }) {
  const history = useHistory()
  const intervalRef = useRef(0)
  const qrCodeRef = useRef("")
  const qrCodeDomRef = useRef()
  const tradeNoRef = useRef(0)

  const [totalPrice, setTotalPrice] = useState()
  const [payMethod, setPayMethod] = useState(2)
  const [financeAccount, setFinanceAccount] = useState(0)
  const [btnLoading, setBtnLoading] = useState(false)
  const [originTargetUrl, setoriginTargetUrl] = useState('')

  const getOpenUrl = () => {
    shopCartApi.getOpenUrl().then(res => {
      setoriginTargetUrl(location.protocol + '//' + res.data)
    })
  }

  useEffect(() => {
    setTotalPrice(selectedProduct.totalPrice)
    clearInterval(intervalRef.current)
    getAccount()
    getOpenUrl()
    return () => {
      clearInterval(intervalRef.current)
    }
  }, [selectedProduct])



  const getAccount = () => {
    shopCartApi.getFinanceAccountApi().then(res => {
      const avlBalance = res.data.avlBalance
      setFinanceAccount(avlBalance / 100)
    }).catch(err => {
      console.error(err)
    })
  }


  const payOrder = () => {
    let params = {
      teamId,
      userId,
      payType: payMethod,
      amount: selectedProduct.totalPrice,
      tradeNo: selectedProduct.tradeNo
    }
    shopCartApi.buyProduct(params).then((res) => {
      if (res.data.status === 'paid') {
        message.success(intl.get('PAY_SUCCESS'))
        setTimeout(() => {
          history.go(0);
          setBtnLoading(false)
        }, 1000);
      }
      if (res.data.status === 'allocation_failed_cancel') {
        message.warning(intl.get('RESOURCE_ALLOCATIOM_FAILED_AND_ORDER_CANCELLED'))
        setTimeout(() => {
          history.go(0);
          setBtnLoading(false)
        }, 1000);
      }
    })
  }

  const pollFn = () => {
    clearInterval(intervalRef.current)
    intervalRef.current = setInterval(() => {
      shopCartApi.getChargeStatus({ tradeNo: selectedProduct.tradeNo }).then((res) => {
        if (res.data.status === "paid") {
          clearInterval(intervalRef.current)
          message.success(intl.get('PAY_SUCCESS'))
          setTimeout(() => {
            history.go(0);
            setBtnLoading(false)
          }, 1000);
        }
        if (res.data.status === 'allocation_failed_cancel') {
          clearInterval(intervalRef.current)
          message.warning(intl.get('RESOURCE_ALLOCATIOM_FAILED_AND_ORDER_CANCELLED'))
          setTimeout(() => {
            history.go(0);
            setBtnLoading(false)
          }, 1000);
        }
      })
    }, 1000)
  }


  const handleClose = () => {
    setBtnLoading(false)
    let params = {
      orderId: selectedProduct.tradeNo
    }
    shopCartApi.cancelOrder(params).then(res => {

    }).catch(err => {
      console.error(err)
    })


    setPayMethod(2)
    qrCodeDomRef.current.innerHTML = ""
    clearInterval(intervalRef.current)
    onThreeDrawerClose()
  }

  const payOrderClick = () => {
    setBtnLoading(true)
    clearInterval(intervalRef)
    qrCodeDomRef.current.innerHTML = ""
    if (payMethod === 2) {
      if (financeAccount < totalPrice) {
        message.warning(intl.get('INSUFFICIENT_BALANCE'))
        setBtnLoading(false)
        return
      }
      payOrder()
    } else if (payMethod === 3) {
      let params = {
        teamId,
        userId,
        payType: payMethod,
        amount: selectedProduct.totalPrice,
        tradeNo: selectedProduct.tradeNo
      }
      shopCartApi.buyProduct(params).then((res) => {
        location.replace(res.data.codeUrl)
      })
    } else if (payMethod === 4) {
      creatSWCode()
    } else if (payMethod == 5) {
      let params = {
        teamId,
        userId,
        payType: payMethod,
        amount: selectedProduct.totalPrice,
        tradeNo: selectedProduct.tradeNo
      }
      shopCartApi.buyProduct(params).then((res) => {
        location.replace(res.data.toPayHtml)
      })
    } else {
      let params = {
        teamId,
        userId,
        payType: payMethod,
        amount: selectedProduct.totalPrice,
        tradeNo: selectedProduct.tradeNo
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
      amount: selectedProduct.totalPrice,
      buyType: '2',
      tradeNo: selectedProduct.tradeNo,
      payType: '4'
    }
    shopCartApi.swCreateOrder(params).then((res) => {
      const qr = document.getElementById('qrcode-url');
      const url = `${originTargetUrl}/2/api/v1/idp-product/order/buy?tradeNo=${res.data.tradeNo}`
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


  return (
    <div className={"order-card-container"}>
      <div className={"amount-container"}>
        <span>{intl.get('AMOUNT_PAYABLE')}</span>
        <span style={{ marginLeft: 10, marginRight: 3, color: "#f7412d" }}>{window.globalConfig?.currency?.symbol} {selectedProduct.totalPrice}</span>
      </div>

      <div className={"pay-container"}>
        <div style={{ marginBottom: 10 }}>{intl.get('CHANNEL')}</div>{" "}
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
              <span className={"pay-span"}>{intl.get('TEAM_COST_OVERVIEW_BALANCE')} {window.globalConfig?.currency?.symbol}</span>
              <span className={"pay-span"}>{financeAccount}</span>
            </div>
            <div className={"pay-item"}>
              <Radio value={0} />
              <img className={"icon"} src={zfbImg} alt="" />
              <span className={"pay-span"}>{intl.get('ALIPAY')}</span>
            </div>
            <div className={"pay-item"}>
              <Radio value={1} />
              <img className={"icon"} src={wxImg} alt="" />
              <span className={"pay-span"}>{intl.get('WEPAY')}</span>
            </div>
            {selectedProduct.totalPrice > 4.2 ? <div className={"pay-item"}>
              <Radio value={3} />
              <img className={"icon"} src={stripeImg} style={{width: '38px', height: '36px', margin: '0px 6px'}} alt="" />
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
          {intl.get('TIPS')}
        </div>
      }
      <div className="code-box">
        <div ref={qrCodeDomRef} style={{ marginTop: 30 }} id={'qrcode-url'}></div>
        {
          (payMethod === 4 && btnLoading) ? <div className="tip">
            <p className="buy-tips">*{intl.get('PLEASE_OPEN_WECHART_OR_ALIPAY_TO_PAY')}</p>
            <div className="img-box">
              <img src={wxImg} alt="" />
              <img src={zfbImg} alt="" />
            </div>
          </div> : null
        }
      </div>
      <div className="buyment-footer">
        <Button style={{ marginRight: '20px' }} onClick={handleClose}>
        {intl.get('NEGATE')}
        </Button>
        <Button
          onClick={payOrderClick}
          type={"primary"}
          style={{ marginRight: '20px' }}
          loading={btnLoading}
        >
          {intl.get('PAYMENT')}
        </Button>
      </div>
    </div >
  )
}

export default ShopCart
