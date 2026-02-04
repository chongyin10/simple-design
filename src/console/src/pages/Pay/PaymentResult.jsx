import React, { useState } from "react"
import "./index.less"
import endFail from "./endfail.png"
import endsuccess from "./endsuccess.png"
import { Button } from "antd"
import { useHistory } from "react-router"
import intl from "react-intl-universal"
function PaymentResult(props) {
  const { payStatus } = props
  const history = useHistory()
  return (
    <div className="pay-result">
      <div className="pay-warrper">
        <div className="pay-all">
          <div className="pay-img">
            <img src={payStatus === 3 ? endFail : endsuccess} alt="" />
          </div>
          <div className={payStatus === 3 ? "payfail" : "paysuccess"}>
            {intl.get("PAYMENT_RESULT")}
          </div>
          <div className="paystatitle">
            {payStatus === 3
              ? "账户余额不足，请充值后再支付"
              : "您购买的资源正在开通中，请耐心等待"}
          </div>
          <div className="pay-btn">
            <Button
              onClick={() => {
                history.replace("/resource")
              }}
              type="primary"
            >
              {intl.get("RESOURCE_MANAGEMENT")}
            </Button>
            <Button
              onClick={() => {
                history.replace("/order")
              }}
              type="primary"
            >
              {intl.get("ORDER_CENTER")}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PaymentResult
