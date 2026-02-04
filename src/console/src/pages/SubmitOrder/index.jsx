import React, {useEffect, useRef, useState} from "react"
import "./index.less"
import { Button, Checkbox, InputNumber, Select, Tooltip } from "antd"
import ProductList from "./ProductList"
import ShopCart from "./ShopCart"
import classNames from "classnames"
import { useHistory } from "react-router"
import { useUpdateEffect } from "ahooks"
import productApi from "../../serviceApi/productApi"
import intl from "react-intl-universal"
import { QuestionCircleFilled } from "@ant-design/icons"
import orderApi from "../../serviceApi/orderApi"

const { Option } = Select


function SubmitOrder(props) {
  const history = useHistory()

  const [productDiscountList, setProductDiscountList] = useState([])

  // 产品列表
  const [productList, setProductList] = useState([])

  // 选中的产品
  const [selectedProduct, setSelectedProduct] = useState({})

  // 计费模式   按量计费 byVolume or  按月计费 monthly
  const [billingModel, setBillingModel] = useState("monthly")

  // 购买的数量
  const [count, setCount] = useState(1)
  // 购买的时长
  const [timer, setTimer] = useState("")

  // 是否自动续费
  const [isAutoRenewal, setIsAutoRenewal] = useState(false)

  // 计算价格过程中的loading
  const [calculateLoading, setCalculateLoading] = useState(false)
  // 计算出来的价格
  const [calculatePrice, setCalculatePrice] = useState(0)

  const productListRef = useRef()

  useUpdateEffect(() => {

    if(selectedProduct.productId){
      if(billingModel ==='byVolume'){
        const instancePrice = selectedProduct.instancePrice
        const bhuPrice = selectedProduct.bhuPrice
        const duration = 1
        const rebate = 100
        const chargeType = "Dynamic"

        setCalculateLoading(true)
        orderApi.orderPrice({
          duration,
          bhuPrice,
          instancePrice,
          rebate,
          chargeType,
          count
        }).then((res)=>{
          setCalculatePrice(res.data)
        }).finally(()=>{
          setCalculateLoading(false)
        })
      }else{
        const findResult = productDiscountList.find(item=>item.context === timer)
        if(!findResult){
          setCalculatePrice(0)
          return
        }
        const chargeType = findResult.chargeType
        let duration = findResult.duration

        const rebate = findResult.rebate
        const instancePrice = selectedProduct.instanceMonthPrice
        const bhuPrice = selectedProduct.bhuMonthPrice
        orderApi.orderPrice({
          duration,
          bhuPrice,
          instancePrice,
          rebate,
          chargeType,
          count
        }).then((res)=>{
          setCalculatePrice(res.data)
        }).finally(()=>{
          setCalculateLoading(false)
        })
      }
    }else{
      setCalculatePrice(0)
    }


  }, [selectedProduct,billingModel,timer,count])

  useEffect(() => {
    getProductListAndStorageList()
  }, [])

  useEffect(() => {
    productApi.getProductDiscountList().then((res)=>{
      setProductDiscountList(res.data)
    })
  }, [])


  const getProductListAndStorageList = () => {
    productApi.getProductList({ pageIndex: 1, pageSize: 100 }).then((res) => {
      const { products } = res.data
      const productList = []
      products.forEach((item) => {
        if (item.type === "storage") {
        } else if (item.type === "compute") {
          productList.push(item)
        }
      })
      setProductList(productList)
    })
  }

  const handlerModelClick = (billingModel) => {
    return () => {
      productListRef.current.setSelectedRowKeys([])
      setSelectedProduct({})
      setTimer("")
      setBillingModel(billingModel)
    }
  }

  return (
    <div className={"submit-order-container sass"}>
      <div className={"submit-order-header"}>
        <h2 className={"page-title"}>购买计算实例</h2>
        <Button
          onClick={() => {
            history.goBack()
          }}
          type={"link"}
        >
          {intl.get("CANCEL_PURCHASE")}
        </Button>
      </div>

      <div className={"billing-model-container"}>
        <div className={"title"}>{intl.get("BILLING_MODEL")}</div>
        <div className={"select-btn"}>
          <Button
            onClick={handlerModelClick("monthly")}
            className={classNames({ active: billingModel === "monthly" })}
            style={{ width: 88 }}
          >
            包年包月
          </Button>
{/*          <Button
            onClick={handlerModelClick("byVolume")}
            className={classNames({ active: billingModel === "byVolume" })}
            style={{ marginRight: 16 }}
          >
            按量计费
          </Button>*/}
        </div>
      </div>

      <div className={"select-resource-container"}>
        <div className={"title"}>{intl.get("CHOOSE_A_RESOURCE")}</div>
        <ProductList
          billingModel={billingModel}
          selectedProduct={selectedProduct}
          setSelectedProduct={setSelectedProduct}
          productList={productList}
          ref={productListRef}
        />
      </div>

      {/*<div className={"storage-list-container"}>
        <div className={"title"}>{intl.get("STORAGE")}</div>
        <Select
          onChange={(value) => {
            const findResult = storageList.find(
              (item) => item.productId === value
            )
            setSelectedStorage(findResult)
          }}
          value={selectedStorage.productId}
          style={{ width: 120 }}
        >
          {storageList.map((item) => (
            <Option key={item.productId} value={item.productId}>
              {item.name}
            </Option>
          ))}
        </Select>

        <div className={"unit-price"}>
          <span>
            <span style={{ fontSize: 24, color: "#333", fontWeight: "bold" }}>
              {selectedStorage.monthPrice}
            </span>
            {intl.get("YUAN")}/{intl.get("MONTH")}
          </span>
        </div>
      </div>*/}

      {billingModel === "monthly" ? (
        <div className={"purchase-time-container"}>
          <div className={"title"}>购买时长</div>

          <Select
            style={{ minWidth: 100 }}
            value={timer}
            onChange={(value) => {
              setTimer(value)
            }}
          >
            {productDiscountList.map((item) => {
              return <Option value={item.context}>{item.context}</Option>
            })}
          </Select>

          <div className={"auto-renewal"}>
            <Checkbox
              checked={isAutoRenewal}
              onChange={(event) => {
                setIsAutoRenewal(event.target.checked)
              }}
            />{" "}
            <span style={{ marginRight: 5, display: "inline-block" }}>
              启用自动续费
            </span>
            <Tooltip
              title={
                <div>
                  <p>按月购买</p>
                  <p>则自动续费周期为 1 个月</p>
                  <p>按年购买</p>
                  <p>则自动续费周期为 1 年</p>
                </div>
              }
            >
              <QuestionCircleFilled style={{ cursor: "pointer" }} />
            </Tooltip>
          </div>
        </div>
      ) : null}

      <div className={"purchase-count-container"}>
        <div className={"title"}>购买数量</div>
        <InputNumber
          min={1}
          max={1000}
          value={count}
          onChange={(value) => {
            setCount(Math.ceil(value))
          }}
        />

        <div style={{ marginLeft: 10, lineHeight: "32px" }}>台</div>
      </div>

      <ShopCart
        calculatePrice={calculatePrice}
        billingModel={billingModel}
        selectedProduct={selectedProduct}
        count={count}
        timer={timer}
        productDiscountList={productDiscountList}
        isAutoRenewal={isAutoRenewal}
      />
    </div>
  )
}

export default SubmitOrder
