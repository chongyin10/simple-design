import React, {useImperativeHandle, useState} from "react"
import PropTypes from "prop-types"
import "./ProductList.less"
import { Table } from "antd"
import intl from "react-intl-universal"

ProductList.propTypes = {
  productList: PropTypes.array.isRequired,
  selectedProduct: PropTypes.object.isRequired,
  setSelectedProduct: PropTypes.func.isRequired,
  isSass: PropTypes.bool.isRequired,
}
ProductList.defaultProps = {
  isSass: true,
}

function ProductList(props,ref) {
  const { productList, setSelectedProduct, isSass,billingModel } = props
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);


  useImperativeHandle(
    ref,
    () => {
      return {
        setSelectedRowKeys
      }
    },
    [],
  )


  const columns = [
    {
      title: "CPU",
      dataIndex: "cpu",
      render(text) {
        return <span>{text}核</span>
      }
    },
    {
      title: "内存",
      dataIndex: "memory",
      render(text) {
        return <span>{text}G</span>
      }
    },
    {
      title: "GPU",
      dataIndex: "gpu",
      render(text) {
        return <span>{text?text:0}颗</span>
      }
    },
  ]

  const rowSelection = {
    type: "radio",
    selectedRowKeys,
    onChange: (selectedRowKeys, selectedRows) => {
      setSelectedProduct(selectedRows[0])
      setSelectedRowKeys(selectedRowKeys)
    },
  }

  return (
    <div className={"product-list-container"}>
      <Table
        bordered={false}
        rowSelection={rowSelection}
        rowKey={"productId"}
        dataSource={productList}
        columns={columns}
        pagination={false}
        scroll={{ y: 280 }}
      />
    </div>
  )
}

export default React.forwardRef(ProductList)
