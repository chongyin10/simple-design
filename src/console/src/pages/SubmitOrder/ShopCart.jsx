import React, {useEffect, useRef, useState} from "react"
import PropTypes from "prop-types"
import "./ShopCart.less"
import { Button, Drawer, Radio, Space, Checkbox, message } from "antd"
import { QuestionCircleFilled } from "@ant-design/icons"
import financeApi from "../../serviceApi/financeApi"
import orderApi from "../../serviceApi/orderApi"
import {useHistory, useLocation} from "react-router"
import intl from "react-intl-universal"
import zfbImg from "../../assets/zhifubao.png"
import wxImg from "../../assets/weixin.png"
import costApi from "../../serviceApi/cost"
import { getTeamId } from "../../utils/cookie"
import QRCode from "qrcodejs2"

ShopCart.propTypes = {
  selectedProduct: PropTypes.object.isRequired,
  billingModel: PropTypes.string.isRequired,
  calculatePrice: PropTypes.number.isRequired,
  count: PropTypes.number.isRequired,
}
function ShopCart(props) {
  const {
    selectedProduct,
    billingModel,
    calculatePrice,
    count,
    timer,
    productDiscountList,
    isAutoRenewal
  } = props


  const history = useHistory()
  const location = useLocation()


  const [visible, setVisible] = useState(()=>{
    return !!location.state?.orderId
  })
  const [orderId, setOrderId] = useState(()=>{
    return location.state?.orderId
  })
  const [totalPrice, setTotalPrice] = useState(0)


  const [payMethod, setPayMethod] = useState(2)
  const [financeAccount, setFinanceAccount] = useState(0)
  // const [agreement, setAgreement] = useState(false)


  const tradeNoRef = useRef(0)
  const intervalRef = useRef(0)
  const qrCodeRef = useRef("")
  const qrCodeDomRef = useRef()

  useEffect(() => {
    if(orderId){
      setTimeout(()=>{
        orderApi.getDetail(orderId).then((res)=>{
          if(res.data.status ==='paid'){
            history.replace('/cost/indent')
            return
          }
          setTotalPrice(res.data.totalPrice)
        }).catch(()=>{
          history.replace('/cost/indent')
        })
      },300)
    }
  }, [orderId])



  useEffect(() => {
    getAccount()
    return ()=>{
      clearInterval(intervalRef.current)
    }
  }, [])



  const getAccount = () => {
    financeApi.getFinanceAccount().then((res) => {
      const avlBalance = res.data.avlBalance
      setFinanceAccount(avlBalance)
    })
  }

  const showDrawer = () => {
    if (billingModel === "byVolume") {
      // 确认订单
      const packageId = selectedProduct.productId
      const cloud = "ucloud"
      const teamId = getTeamId()
      const chargeType = "Dynamic"
      const cpu = selectedProduct.cpu
      const gpu = selectedProduct.gpu ? selectedProduct.gpu : "0"
      const memory = Number(selectedProduct.memory) * 1024 + ""
      const dataDiskSize = "50"
      const bhuPrice = Math.floor(selectedProduct.bhuPrice * 100) + ""
      const instancePrice = Math.floor(selectedProduct.instancePrice * 100) + ""
      const rebate = "100"
      const duratio = "1"

      orderApi
        .createOrder({
          packageId,
          cloud,
          teamId,
          chargeType,
          cpu,
          gpu,
          memory,
          dataDiskSize,
          bhuPrice,
          instancePrice,
          rebate,
          duratio,
          count: String(count),
          autoRenew:isAutoRenewal,
        })
        .then((res) => {
          message.success("创建订单成功")
          const orderId = res.data.orderId
          history.replace(`/cost/indent?id=${orderId}`)
        })
    } else {
      const findResult = productDiscountList.find(
        (item) => item.context === timer
      )

      const packageId = selectedProduct.productId
      const cloud = "ucloud"
      const teamId = getTeamId()
      const chargeType = findResult.chargeType

      const cpu = selectedProduct.cpu
      const gpu = selectedProduct.gpu ? selectedProduct.gpu : "0"
      const memory = Number(selectedProduct.memory) * 1024 + ""
      const dataDiskSize = "50"

      // console.log(selectedProduct.bhuMonthPrice ,selectedProduct.instanceMonthPrice,selectedProduct.bhuMonthPrice *100,selectedProduct.instanceMonthPrice * 100, 'dddddddddd')

      const bhuPrice = Math.floor(selectedProduct.bhuMonthPrice * 100) + ""
      const instancePrice = Math.floor(selectedProduct.instanceMonthPrice * 100) + ""
      const rebate = findResult.rebate + ""
      const duratio = findResult.duration + ""

      orderApi
        .createOrder({
          packageId,
          cloud,
          teamId,
          chargeType,
          cpu,
          gpu,
          memory,
          dataDiskSize,
          bhuPrice,
          instancePrice,
          rebate,
          duratio,
          count: String(count),
          autoRenew:isAutoRenewal,
        })
        .then((res) => {
          const orderId = res.data.orderId
          setOrderId(orderId)
          setVisible(true)
          getAccount()
        })
    }
  }

  const onClose = () => {
    qrCodeDomRef.current.innerHTML = ""
    clearInterval(intervalRef.current)
    setVisible(false)
  }

  //
  const pollFn = ()=>{
    clearInterval(intervalRef.current)
    intervalRef.current =  setInterval(()=>{
      costApi.getPayStatusApi(tradeNoRef.current).then((res)=>{
        if(res.data.status ==="PAY_FINISH"){
          clearInterval(intervalRef.current)
          payOrder()
        }
      })
    },1000)
  }

  const payOrder = ()=>{
    orderApi.orderPay(orderId).then((res) => {
      message.success('支付成功')
      history.replace('/cost/indent')
    })
  }

  const payOrderClick = () => {
    clearInterval(intervalRef)
    qrCodeDomRef.current.innerHTML = ""
    if (payMethod === 2) {
      if(financeAccount < totalPrice){
        message.warning('账户余额不足 ')
        return
      }
      payOrder()
    }else{
      costApi.getPayCodeApi(payMethod,totalPrice).then((res)=>{
        tradeNoRef.current = res.data.trade_no

        const qr = document.getElementById('qrcode-url');
        qrCodeRef.current = new QRCode(qr, {
          text: res.data.qr_code,//可以是链接，也可以是文本
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

  return (
    <div className={"shop-cart-container"}>
      <span className={"agreement-container"}>
{/*        <Checkbox
          value={agreement}
          onChange={(ev) => {
            setAgreement(ev.target.checked)
          }}
        />
        <span style={{ marginLeft: 3, marginRight: 3 }}>我已了解</span>
        <span style={{ color: "#030DFF", cursor: "pointer" }}>《协议》</span>*/}
      </span>

      <div className={"right"}>
        <span className={"cost-container"}>
          <span>{intl.get("COST")}: &nbsp;</span> <h2>{calculatePrice}</h2>{" "}
          {billingModel === "byVolume" ? <span>&nbsp;元/小时</span> : null}
        </span>

        <Button
          onClick={showDrawer}
          disabled={!(calculatePrice)}
          type={"primary"}
          size={"large"}
        >
          {billingModel === "monthly" ? "去支付" : "确认订单"}
        </Button>
      </div>

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
              disabled={!orderId}
              onClick={payOrderClick}
              type={"primary"}
              size={"large"}
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
              {totalPrice}
            </span>
            <span>元</span>
          </div>

          <div className={"pay-container"}>
            <div style={{ marginBottom: 10 }}>支付渠道:</div>{" "}
            <Radio.Group
              value={payMethod}
              onChange={(ev) => {
                setPayMethod(ev.target.value)
                if(qrCodeRef.current){
                  qrCodeDomRef.current.innerHTML = ""
                  clearInterval(intervalRef.current)
                }
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
              </Space>
            </Radio.Group>
          </div>

          <div ref={qrCodeDomRef} style={{marginTop:30}} id={'qrcode-url'}></div>
        </div>
      </Drawer>
    </div>
  )
}

export default ShopCart
