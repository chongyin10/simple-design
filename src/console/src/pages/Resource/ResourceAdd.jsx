import React, { useEffect, useMemo, useState } from "react"
import { useHistory, useLocation } from "react-router"
import productApi from "../../serviceApi/productApi"
import { Row, Col, Button, Card, Select, message, Input } from "antd"
import ProductList from "./ProductList"
import qs from "querystring"
import intl from "react-intl-universal"
import { add, resourceExpand } from "../../serviceApi/resourceApi"
import './resource.less'

const ResourceAdd = () => {
  const history = useHistory()
  const location = useLocation()
  const [productList, setProductList] = useState([])
  const [selectedProduct, setSelectedProduct] = useState({})
  const [selectCount, setSelectCount] = useState('1')
  const [btnLoading, setBtnLoading] = useState(false)
  const [action, setAction] = useState("")

  const getProductList = () => {
    productApi.getProductList({ pageIndex: 1, pageSize: 100 }).then((res) => {
      setProductList(res.data.products)
    })
  }

  const disabled = useMemo(() => {
    if (action === "add" || action ==='decrease') {
      return !selectedProduct.productId
    }
    return true
  }, [action, selectedProduct])


  useEffect(() => {
    const canEntry = handlerLocation()
    if (canEntry) {
      getProductList()
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
    if (obj.action === "add" || obj.action ==='decrease') {
      setAction(obj.action)
      return true
    }
    return false
  }


  const expandResource = () => {
    const product = productList.find((item) => item.productId === selectedProduct.productId)
    const { cpu, memory, gpu } = product
    const params = {
      podLimitMemory: memory + 'Gi',
      podLimitCpu: cpu,
      podLimitGpu: gpu?gpu:"0",
      podMaxWorkers: selectCount,
      operator: action==='add'? '+':'-'
    }
    setBtnLoading(true)
    resourceExpand(params).then((res) => {
      if(action==='add'){
        message.success(intl.get("INCREASE_RESOURCE_SUCCESS"))
      }else{
        message.success('缩减资源成功')
      }
      history.replace(`/resource`)
    }).catch((err) => {
      console.log(err)
    }).finally(()=>{
      setBtnLoading(false)
    })
  }



  return (
    // <>
    //   <Row>
    //     <Col span={1}>{intl.get("RESOURCE_EXPAND")}</Col>
    //     <Col span={22}></Col>
    //     <Col span={1}>
    //       <Button
    //         onClick={() => {
    //           history.goBack()
    //         }}
    //         type={"link"}
    //       >
    //         {intl.get("CANCEL_THE_OPERATION")}
    //       </Button>
    //     </Col>
    //   </Row>
    //   <Row>
    //     <Card className="site-card-border-less-wrapper">
    //       <Row>
    //         <Col span={2}>
    //           {intl.get("RESOURCE_SELECT_MACHINE")}
    //         </Col>
    //         <Col span={22}>
    //           <ProductList
    //             isSass={false}
    //             selectedProduct={selectedProduct}
    //             setSelectedProduct={setSelectedProduct}
    //             productList={productList}
    //           />
    //         </Col>
    //       </Row>
    //     </Card>
    //   </Row>
    //   <Row>
    //     <Card className="site-card-border-less-wrapper">
    //       <Row>
    //         <Col span={2}>
    //           {intl.get("RESOURCE_SELECT_MACHINE_COUNT")}
    //         </Col>
    //         <Col span={3}>
    //           <Input
    //             type="number"
    //             min="1"
    //             style={{ width: 150 }}
    //             addonAfter="台"
    //             defaultValue="1"
    //             onChange={(e) => setSelectCount(e.target.value)}
    //           />
    //         </Col>
    //         <Col span={19}></Col>
    //       </Row>
    //     </Card>
    //   </Row>
    //   <Row>
    //     <Col span={22}></Col>
    //     <Col span={2}>
    //       <Button
    //         loading={btnLoading}
    //         onClick={generateOrder}
    //         disabled={disabled}
    //         type={"primary"}
    //         size={"large"}
    //       >
    //         {intl.get("RESOURCE_EXPAND")}
    //       </Button>
    //     </Col>
    //   </Row>
    // </>
    <div className={"submit-order-container"}>
      <div className={"submit-order-header"}>
        <h2 className={"page-title"}>
          {action === "add"
            ? intl.get("RESOURCE_EXPAND")
            : "缩容"}
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
        <div className={"title"}>{intl.get("RESOURCE_SELECT_MACHINE")}</div>
        <ProductList
          isSass={false}
          selectedProduct={selectedProduct}
          setSelectedProduct={setSelectedProduct}
          productList={productList}
        />
      </div>

      <div className={"select-resource-container"}>
        <div className={"title"}>{intl.get("RESOURCE_SELECT_MACHINE_COUNT")}</div>
        <div className={"product-list-container"}>
          <Input
            type="number"
            min="1"
            style={{ width: 150 }}
            addonAfter="台"
            defaultValue="1"
            onChange={(e) => setSelectCount(Math.ceil(e.target.value)+"")}
          />
        </div>
      </div>


      <div className="shop-cart-container">
        <div className={'left'}></div>

        <div className={'right'}>
          <Button
            loading={btnLoading}
            onClick={expandResource}
            disabled={disabled}
            type={"primary"}
            size={"large"}
          >
            {action === "add"
              ? intl.get("RESOURCE_EXPAND")
              : "缩容"}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ResourceAdd
