import React, {useState} from 'react'
import {Modal, Input, message} from "antd"
import auditApi from "../../serviceApi/auditApi"
import PropTypes from "prop-types"
import {categoryIdList} from "../../pages/ApprovalCenter/pages/ApprovalCenterIndex"
import "./UpdateApproveStatusModal.less"

function renderCategoryText(value) {
  const findResult = categoryIdList().find(item=>item.value === value+'')
  return findResult? findResult.label :''
}

function UpdateApproveStatusModal(props) {

  const { visible,id,status,setVisible,successCallback,categoryId } = props
  const [opinion, setOpinion] = useState("")
  const onOk = ()=>{
    auditApi.updateAudit({
      id,status,opinion
    }).then(()=>{
      const text = status === 'Pass'? "通过成功":"驳回成功"
      message.success(text)
      setVisible(false)
      setOpinion("")
      successCallback()
    })

  }

  const onCancel = ()=>{
    setVisible(false)
    setOpinion("")
  }

  return (
    <Modal
    visible={visible}
    title={<h2 style={{fontWeight:'bold'}}>{`确定${status ==='Pass'?"通过":"驳回"}${renderCategoryText(categoryId)}申请吗?`}</h2>}
    okText={'确定'}
    cancelText={'取消'}
    onOk={onOk}
    onCancel={onCancel}
    wrapClassName={'update-approve-status-model'}
    >
      <Input.TextArea
        autoSize={{ minRows: 4, maxRows: 6 }}
        placeholder={'请填写审批意见(选填)'}
        value={opinion}
        onChange={(ev)=>{
          setOpinion(ev.target.value)
        }}
      />
    </Modal>
  )
}

UpdateApproveStatusModal.propTypes = {
  id:PropTypes.number.isRequired,
  status:PropTypes.string.isRequired,
  visible:PropTypes.bool.isRequired,
  setVisible:PropTypes.func.isRequired,
  successCallback:PropTypes.func.isRequired,
  categoryId:PropTypes.number.isRequired,
}

export default UpdateApproveStatusModal
