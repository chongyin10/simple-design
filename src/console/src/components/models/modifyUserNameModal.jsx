import React from 'react'
import intl from "react-intl-universal"
import {Form, Input, Modal} from "antd"
import PropTypes from "prop-types"
import {useForm} from "antd/es/form/Form"
import userInfoApi from "../../serviceApi/userInfoApi"
import {useDispatch} from "react-redux"
import {saveUserBaseInfo} from "../../store/modules/userSlice"

function ModifyUserNameModal(props) {

  const { visible,setVisible,callback } = props
  const dispatch = useDispatch()
  const [form] = useForm()


  const getUserInfoAgain = () => {
    userInfoApi.getUserInfo().then((res) => {
      if (res.data) {
        dispatch(saveUserBaseInfo({...res.data}))
      }
    })
  }


  const confirmModify = () => {
    form.validateFields().then((value) => {
      const { name } = value
      if (name) {
        const data = {
          username: name,
        }
        userInfoApi
          .updateUsername(data)
          .then((res) => {
            getUserInfoAgain()
            typeof callback ==='function' && callback(name)
            cancelModify()
          })
          .catch((err) => {
            console.log(err)
          })
      }
    })
  }


  const cancelModify = ()=>{
    setVisible(false)
  }

  return (
    <Modal
      wrapClassName={"add-or-update-project-modal"}
      title={
        <span style={{ fontWeight: "bold" }}>
            {intl.get("MODIFY_USERNAME")}
          </span>
      }
      visible={visible}
      okButtonProps={{
        size: "large",
      }}
      cancelButtonProps={{
        size: "large",
      }}
      onOk={confirmModify}
      onCancel={cancelModify}
    >
      <Form form={form}>
        <Form.Item
          name={"name"}
          rules={[
            {
              required: true,
              message: intl.get("USERNAME_CAN_NOT_BE_EMPTY"),
            },
          ]}
        >
          <Input
            placeholder={intl.get("PLEASE_ENTER_A_NEW_USERNAME")}
            size={"large"}
          />
        </Form.Item>
      </Form>
    </Modal>
  )
}

ModifyUserNameModal.propTypes = {
  visible:PropTypes.bool.isRequired,
  setVisible:PropTypes.func.isRequired,
}

export default ModifyUserNameModal
