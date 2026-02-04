import React, { useEffect, useMemo, useState } from "react"
import { useHistory, useLocation } from "react-router"
import productApi from "../../serviceApi/productApi"
import { Button, Select, message } from "antd"
import ProductList from "../SubmitOrder/ProductList"
import "./index.less"
import qs from "querystring"
import intl from "react-intl-universal"
import { add } from "../../serviceApi/resourceApi"

const { Option } = Select

function PrivateIncreaseResource(props) {
  const history = useHistory()
  const location = useLocation()
  const [productList, setProductList] = useState([])
  const [storageList, setStorageList] = useState([])
  const [selectedStorage, setSelectedStorage] = useState({
    monthlyPrice: 0,
  })
  const [selectedProduct, setSelectedProduct] = useState({
    monthlyPrice: 0,
  })
  const [btnLoading, setBtnLoading] = useState(false)
  const [action, setAction] = useState("")

  const disabled = useMemo(() => {
    if (action === "create") {
      return !(selectedStorage.productId && selectedStorage.productId)
    }
    if (action === "add") {
      return !selectedProduct.productId
    }
    return true
  }, [action, selectedStorage, selectedProduct])

  const type = useMemo(() => {
    let str = ""
    switch (action) {
      case "create":
        str = "HOST"
        break
      case "add":
        str = "HOSTADD"
        break
      default:
    }
    return str
  }, [action])

  useEffect(() => {
    const canEntry = handlerLocation()
    if (canEntry) {
      getProductListAndStorageList()
    } else {
      history.replace("/resource")
    }
  }, [])

  const handlerLocation = () => {
    const search = location.search
    if (!search) {
      return false
    }
    const searchStr = search.replace("?", "")
    const obj = qs.parse(searchStr)
    if (obj.action === "create" || obj.action === "add") {
      setAction(obj.action)
      return true
    }
    return false
  }

  const generateOrder = () => {
    const products = []
    if (selectedProduct.productId) {
      products.push({
        productId: selectedProduct.productId,
        whichPrice: "month_price",
        duration: "1",
        type,
        isRenew: true,
      })
    }
    if (selectedStorage.productId) {
      products.push({
        productId: selectedStorage.productId,
        whichPrice: "month_price",
        duration: "1",
        type,
        isRenew: true,
      })
    }

    setBtnLoading(true)
    // orderApi
    //   .generateOrder(products, type)
    // 新的逻辑，按region增加资源
    add({ products, type })
      .then((res) => {
        // const orderId = res.data.orderId
        setBtnLoading(false)
        message.success(intl.get("INCREASE_RESOURCE_SUCCESS"))
        history.replace(`/resource`)
      })
      .catch((err) => {
        if (err.message.indexOf('Cpu type pod cannot add GPU resource') > -1) {
          message.warning('扩充GPU资源时，请先在项目中切换到GPU计算单元', 10)
        }
        setBtnLoading(false)
      })
  }

  const getProductListAndStorageList = () => {
    productApi.getProductList({ pageIndex: 1, pageSize: 100 }).then((res) => {
      const { products } = res.data
      const productList = []
      const storageList = []
      products.forEach((item) => {
        if (item.type === "storage") {
          storageList.push(item)
        } else if (item.type === "compute") {
          productList.push(item)
        }
      })
      setProductList(productList)
      setStorageList(storageList)
      const searchStr = location.search.replace("?", "")
      const obj = qs.parse(searchStr)
      if (storageList.length > 0 && obj.action === "create") {
        setSelectedStorage(storageList[0])
      }
    })
  }

  return (
    <div className={"submit-order-container"}>
      <div className={"submit-order-header"}>
        <h2 className={"page-title"}>
          {action === "add"
            ? intl.get("INCREASE_COMPUTING_RESOURCES")
            : intl.get("CREATE_COMPUTING_RESOURCES")}
        </h2>
        <Button
          onClick={() => {
            history.goBack()
          }}
          type={"link"}
        >
          {intl.get("CANCEL_THE_OPERATION")}
        </Button>
      </div>

      <div className={"select-resource-container"}>
        <div className={"title"}>{intl.get("CHOOSE_A_RESOURCE")}</div>
        <ProductList
          isSass={false}
          selectedProduct={selectedProduct}
          setSelectedProduct={setSelectedProduct}
          productList={productList}
        />
      </div>

      {action === "create" ? (
        <div className={"storage-list-container"}>
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
        </div>
      ) : null}

      <div className="shop-cart-container">
        <Button
          loading={btnLoading}
          onClick={generateOrder}
          disabled={disabled}
          type={"primary"}
          size={"large"}
        >
          {action === "add"
            ? intl.get("INCREASE_RESOURCES")
            : intl.get("CREATE_A_RESOURCE")}
        </Button>
      </div>
    </div>
  )
}

export default PrivateIncreaseResource
