import React, { useState, useEffect, useRef } from "react"
import { Form, Input, Button, message } from "antd"
import "./index.less"
import userInfoApi from "../../serviceApi/userInfoApi"
import orderApi from "../../serviceApi/orderApi"
import financeApi from "../../serviceApi/financeApi"
import { useSelector } from "react-redux"
import Loading from "./Loading"
import PaymentResult from "./PaymentResult"
import { selectUserEmail, selectUserPhone } from "../../store/modules/userSlice"
import {useHistory, useLocation} from "react-router"
import qs from "querystring"
import intl from "react-intl-universal"
const { useForm } = Form

function Pay() {
  const [inviteCode] = useForm()
  const phone = useSelector(selectUserPhone)
  const email = useSelector(selectUserEmail)

  const [accountBalance, setAccountBalance] = useState(0)
  const [orderAmount, setOrderAmount] = useState(0)
  const [accountTitle, setAccountTitle] = useState("")
  const [account, setAccount] = useState("")
  // 未支付0 支付加载1  支付 成功 或 失败 2 ｜ 3
  const [paymentStatus, setPaymentStatus] = useState(0)
  let [btnStyle, setBtnStyle] = useState(60)
  const [exit, setExit] = useState(0)
  //orderID
  const [orderId, setOrderId] = useState("")
  const [verifyCode, setVerifyCode] = useState("")

  // 订单状态，是否可以提交
  const [orderStatus, setOrderStatus] = useState(true)
  // 提交订单状态
  const [submitPay, setSubmitpay] = useState(false)
  // 订单结束倒计时
  const [orderTimedOut, setOrderTimedOut] = useState({
    hour: "00",
    min: "00",
    sec: "00",
  })

  const history = useHistory()
  // localtion
  const location = useLocation()

  const timeRef = useRef()

  useEffect(() => {
    if (phone === "" && email === "") return
    getAccountBalance()
    let account = phone || email
    setAccount(account)
    account = account.slice(0, 3) + "***" + account.slice(account.length - 4)
    setAccountTitle(account)
    // getInviteCode()
  }, [phone || email])

  const getAccountBalance = () => {
    // qs
    const { search } = location
    const searchObj = search.slice(1)
    const { orderId } = qs.parse(searchObj)
    setOrderId(orderId)
    orderApi.orderPayInfo({ orderId }).then((res) => {
      console.log(res)
      const { price, createdAt } = res.data.order
      const starTime = new Date(createdAt.slice(0, createdAt.length-3)).getTime()
      timeRef.current = setInterval(() => {
        orderExpired(starTime, Date.now())
      }, 1000);
      // console.log(res, '获取订单等信息')
      setOrderAmount(price)
    })
    financeApi.getFinanceAccount().then(res => {
      const { totalBalance } = res.data;
      setAccountBalance(totalBalance)
    })
  }
  // 订单过期
  const orderExpired = (star, now) => {
    const oneHour = 60 * 60 * 1000
    const endtime =  star + oneHour
    const timeDifference = endtime - now;
    if (timeDifference <= 0) {
      const hour = "00"
      const min = "00"
      const  sec = "00"
      setOrderTimedOut({
        hour,
        min,
        sec,
      })
      setOrderStatus(false)
      clearInterval(timeRef.current)
      return
    }
    let hour = parseInt((timeDifference /1000 / 60 / 60) % 24, 10)
    let min = parseInt((timeDifference / 1000 / 60) % 60, 10)
    let sec = parseInt(timeDifference /1000 % 60, 10)
    hour = checkTime(hour)
    min = checkTime(min)
    sec = checkTime(sec)
    // console.log(hour, min, sec)
    setOrderTimedOut({
      hour: String(hour),
      min:  String(min),
      sec:  String(sec),
    })


    // let timer = setTimeout(() => {
    //   setOrderTimedOut({
    //     hour: new String(hour),
    //     min: new String(min),
    //     sec: new String(sec),
    //   })
    //   orderExpired(star , Date.now())
    //   clearTimeout(timer)
    // }, 1000)
  }
  const checkTime = (i) => {
    if (i < 10) {
      i = "0" + i
    }
    return i
  }
  const getInviteCode = () => {
    const data = {
      account: email || phone,
      type: orderId,
    }
    countdown()

    setExit(1)
    if (data.account === "" || data.phone === "") {
      return
    }
    // return
    userInfoApi.getInviteCode(data).then((res) => {
      console.log(res)
    })
  }
  // 时间逻辑
  const countdown = () => {
    if (btnStyle === 0) {
      setBtnStyle(60)
    } else {
      setBtnStyle(btnStyle--)
      setTimeout(() => {
        countdown()
      }, 1000)
    }
  }

  // 确定支付
  const confirmPayment = () => {
    setPaymentStatus(1)
    if (orderStatus) {
      orderApi
        .confirmPayment({ orderId, verifyCode, account })
        .then((res) => {
          console.log(res)
          setPaymentStatus(2)
        })
        .catch((err) => {
          console.log(err)
          setPaymentStatus(3)
        })
    } else {
      message.error(intl.get("YOUR_ORDER_HAS_TIMED_OUT"))
    }
  }

  return (
    <div className="pay">
      <div className="pay-title">
        {intl.get("ACCOUNT_BALANCE_PAYMENT")}
      <span>
          你还有
          <span>
            {orderTimedOut.hour}小时{orderTimedOut.min}分{orderTimedOut.sec}秒{" "}
          </span>
          待付款，超时订单将自动关闭
        </span>
      </div>
      <div className="account-balance pay-style">
        {" "}
        账&nbsp;&nbsp;户&nbsp;&nbsp;余&nbsp;&nbsp;额：
        <span>{accountBalance}</span>&nbsp;元
      </div>
      <div className="pay-amount pay-style">
        支&nbsp;&nbsp;付&nbsp;&nbsp;金&nbsp;&nbsp;额：<span>{orderAmount}</span>
        &nbsp;元 <br />
      </div>
      <div className="invite-code pay-style">
        <span style={{ float: "left" }}>{intl.get("PLEASE_ENTER_VERIFICATION_CODE")}：</span>
        <span className="invite-warrper">
          <Form form={inviteCode}>
            <Form.Item
              extra={
                exit === 0 ? null : <span>{intl.get("VERIFICATION_CODE_HAS_BEEN_SENT_TO")} {accountTitle}</span>
              }
              name="name"
              rules={[
                {
                  validator(_, value) {
                    if (value.length === 6) {
                      const data = {
                        account: account,
                        type: orderId,
                        verifyCode: value,
                      }
                      return userInfoApi
                        .verifyInviteCode(data)
                        .then((res) => {
                          setSubmitpay(true)
                          setVerifyCode(value)
                          return Promise.resolve(intl.get("APPROVED"))
                        })
                        .catch((err) => {
                          console.log(err)
                          return Promise.reject(intl.get("VERIFICATION_CODE_ERROR"))
                        })
                    } else {
                      return Promise.reject(intl.get("PLEASE_ENTER_A_6_DIGIT_VERIFICATION_CODE"))
                    }
                  },
                },
              ]}
            >
              <Input
                autocomplete="off"
                placeholder={intl.get("PLEASE_ENTER_THE_VERIFICATION_CODE")}
                style={{ height: "44px", width: "200px" }}
              />
            </Form.Item>
          </Form>
          <Button
            type="primary"
            htmlType="submit"
            style={{ height: "44px", width: "104px" }}
            disabled={btnStyle !== 60}
            onClick={getInviteCode}
          >
            {btnStyle !== 60 ? `${btnStyle}秒后发送` : "发送验证码"}
          </Button>
        </span>
      </div>
      <div className="pay-handStatus pay-style">
        <Button onClick={()=>{
          history.replace('/order')
        }}>{intl.get("CANCEL")}</Button>&nbsp;&nbsp;&nbsp;&nbsp;
        <Button type="primary" disabled={!submitPay} onClick={confirmPayment}>
          {intl.get("CONFIRM_PAYMENT")}
        </Button>
      </div>
      <div>
        {paymentStatus === 1 ? (
          <Loading />
        ) : paymentStatus === 2 || paymentStatus === 3 ? (
          <PaymentResult payStatus={paymentStatus} />
        ) : null}
      </div>
    </div>
  )
}

export default Pay
