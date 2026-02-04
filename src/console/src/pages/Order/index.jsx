import React, { useEffect, useState } from "react"
import "./index.less"
import { Button, Table } from "antd"
import { useHistory } from "react-router"
import orderApi from "../../serviceApi/orderApi"
import { useSetState } from "ahooks"
import dayjs from "dayjs"
import intl from "react-intl-universal"

function Order(props) {
  const history = useHistory()
  const [productPagination, setProductPagination] = useSetState({
    pageIndex: 1,
    pageSize: 10,
    total: 0,
  })
  const [orderList, setOrderList] = useState([])

  const columns = [
    {
      title: intl.get("ORDER_NUMBER"),
      dataIndex: "orderId",
      align: "center",
      render(text) {
        return <span style={{ color: "#666666" }}>{text}</span>
      },
    },
    {
      title: intl.get("BUY_CONTENT"),
      align: "center",
      dataIndex: "name",
      width: 250,
    },
    {
      title: intl.get("BILLING_MODEL"),
      align: "center",
      dataIndex: "whichPrice",
      render(whichPrice) {
        let text
        switch (whichPrice) {
          case "month_price":
            text = "包月"
            break
        }
        return <span>{text}</span>
      },
    },
    {
      title: intl.get("ORDER_AMOUNT"),
      align: "center",
      dataIndex: "price",
      render(text) {
        return <span style={{ color: "red" }}>￥{text}</span>
      },
    },
    {
      width: 180,
      title: intl.get("ORDER_CREATION_TIME"),
      align: "center",
      dataIndex: "createdAt",
      render(time) {
        const text = dayjs(new Date(time.replace("CST", ""))).format(
          "YYYY-MM-DD HH:mm:ss"
        )
        return <span>{text}</span>
      },
    },
    {
      title: intl.get("PAYMENT_OPENING_TIME"),
      align: "center",
      dataIndex: "pay_time",
    },
    {
      title: intl.get("STATUS"),
      align: "center",
      dataIndex: "status",
      render(status) {
        let text
        switch (status) {
          case "paid":
            text = intl.get("COMPLETED")
            break
          case "unpaid":
            text = intl.get("EXPIRED")
            break
          case "created":
            text = intl.get("TO_BE_PAID")
            break
        }
        return <span>{text}</span>
      },
    },
    {
      title: intl.get("OPERATE"),
      align: "center",
      render(text, record) {
        if (record.status === "created" && record.isMainOrder) {
          return (
            <Button
              onClick={() => {
                history.push(`/pay?orderId=${record.orderId}`)
              }}
            >
              {intl.get("TO_PAY")}
            </Button>
          )
        }
        return null
      },
    },
  ]

  useEffect(() => {
    getOrderList()
  }, [])

  const gotoSubmitOrder = () => {
    history.push("/submitOrder")
  }

  const getOrderList = () => {
    orderApi.getOrderList().then((res) => {
      const { orders } = res.data

      const orderList = orders.map((item) => {
        item.key = item.orderId
        item.isMainOrder = true
        item.orders.forEach((orderItem, index) => {
          orderItem.key = item.key + "-" + index
          item.whichPrice = orderItem.whichPrice
        })
        if (item.orders.length > 1) {
          item.children = item.orders
        }
        return item
      })

      setOrderList(orderList)
    })
  }

  return (
    <div className={"order-container"}>
      <div className={"order-header"}>
        <div className="order-header-left">{intl.get("ORDER_MANAGEMENT")}</div>

        <div className={"order-header-right"}>
          <Button onClick={gotoSubmitOrder} type={"primary"}>
            {intl.get("BUY_COMPUTING_RESOURCES")}
          </Button>
        </div>
      </div>

      <div className={"order-table"}>
        <Table
          /*          pagination={{
            pageSize: productPagination.pageSize,
            current: productPagination.pageIndex,
            total: productPagination.total,
            onChange: handlerPageChange,
          }}*/
          pagination={false}
          dataIndex={"orderId"}
          dataSource={orderList}
          columns={columns}
          scroll={{ y: 550 }}
        />
      </div>
    </div>
  )
}

export default Order
