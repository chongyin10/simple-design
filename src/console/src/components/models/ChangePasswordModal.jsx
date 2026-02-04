import React, {useRef, useState} from "react"
import intl from "react-intl-universal"
import {Button, Form, Input, message, Modal} from "antd"
import Icons from "../Icons"
import PropTypes from "prop-types"
import { useForm } from "antd/es/form/Form"
import {useDebounceFn, useLatest, useMemoizedFn} from "ahooks"
import resetPassword from "../../serviceApi/resetPassword"
import {useSelector} from "react-redux"
import {selectUserEmail, selectUserPhone} from "../../store/modules/userSlice"
import md5 from "md5"


function ChangePasswordModal(props) {
  const { visible, loading, passwordModalCancel } = props
  const [btnStyle, setBtnStyle] = useState(60)
  const lastBtnStyle = useLatest(btnStyle)
  const [passwordForm] = useForm()
  const [fired, setFired] = useState(false)

  const [formValidateFields, setFormValidateFields] = useState({
    password: false,
    confirmPassword: false,
    verificationCode: false
  })

  const email = useSelector(selectUserEmail)
  const phone = useSelector(selectUserPhone)
  const intervalRef = useRef()

  const { run: getVerificationCode } = useDebounceFn(
    () => {
      const accountVal = email !== null ? email : phone
      const accountKey = email !== null ? "email" : "phone"
      const data = {
        [accountKey]: accountVal,
      }
      setFired(true)
      if(email){
        resetPassword
          .getVerificationCode(data)
          .then((res) => {
            countdown()
          })
          .catch((err) => {
            setBtnStyle(60)
            setFired(false)
          })
      }else{
        resetPassword
          .getPhoneVerificationCode(data)
          .then((res) => {
            countdown()
          })
          .catch((err) => {
            setBtnStyle(60)
            setFired(false)
          })
      }
      
    },
    {
      wait: 1000,
    }
  )

  const countdown = useMemoizedFn(()=>{
      setFired(true)
      intervalRef.current = setInterval(()=>{
        if(lastBtnStyle.current === 0 || lastBtnStyle.current < 0){
          setBtnStyle(60)
          setFired(false)
          clearInterval(intervalRef.current)
        }else{
          setBtnStyle(btnStyle=>btnStyle-1)
        }
      },1000)
  })

  const clickEnterReset = () => {
    passwordForm.validateFields().then((value) => {
      const accountVal =
        email !== null ? email : phone
      const data = {
        account: accountVal,
        password: md5(value.confirmPassword),
        activeCode: value.verificationCode,
      }
      resetPassword
        .resetPasswordPlase(data)
        .then((res) => {
          passwordModalCancel()
          passwordForm.resetFields()
          message.success(`${intl.get("PASSWORD_HAS_BEEN_UPDATED")}！`)
        })
    })
  }

  const onFormValidateFields = (name) => {
    passwordForm.validateFields().then( value => {
      setFormValidateFields({...formValidateFields, [name]: true});
    }).catch( ({ errorFields = [] })=> {
      const newObj = {...formValidateFields};
      const arg = errorFields.filter( item => item.name[0] == name);
      Object.assign(newObj, { [name]: arg.length == 0})
      setFormValidateFields(newObj);
    })
  }

  return (
    <Modal
      wrapClassName={"change-password-modal"}
      title={
        <span style={{ fontWeight: "bold" }}>
          {intl.get("CHANGE_PASSWORD")}
        </span>
      }
      visible={visible}
      okButtonProps={{ size: "large" }}
      confirmLoading={loading}
      onCancel={()=>{
        passwordForm.resetFields()
        passwordModalCancel()
      }}
      cancelButtonProps={{
        size: "large",
      }}
      footer={null}
    >
      <Form form={passwordForm}>
        <Form.Item
          name={"password"}
          rules={[
            {
              required: true,
              message: intl.get("PLEASE_ENTER_A_NEW_PASSWORD"),
            },
            {
              pattern: new RegExp("(?=.*[0-9])(?=.*[a-zA-Z]).{8,30}"),
              message: intl.get(
                "PASSWORD_MUST_BE_NO_LESS_THAN_8_CHARACTERS AND_MUST_CONTAIN_NUMBERS_AND_LETTERS"
              ),
            },
          ]}

          // extra="密码至少六位,需要包含英文、数字与符号中的两位"
        >
          <Input.Password
            onChange={()=> onFormValidateFields('password')}
            placeholder={intl.get("PLEASE_ENTER_A_NEW_PASSWORD")}
            iconRender={(visible) => {
              return visible ? (
                <Icons.showPwdIcon style={{ fontSize: 20 }} />
              ) : (
                <Icons.hidePwdIcon style={{ fontSize: 20 }} />
              )
            }}
            style={{ height: "40px" }}
          />
        </Form.Item>

        <Form.Item
          name="confirmPassword"
          dependencies={["password"]}
          rules={[
            {
              required: true,
              message: intl.get("PLEASE_ENTER_A_NEW_PASSWORD"),
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve()
                }
                return Promise.reject(
                  new Error(
                    `${intl.get("THE_TWO_PASSWORDS_DO_NOT_MATCH")},${intl.get(
                      "PLEASE_ENTER_AGAIN"
                    )}`
                  )
                )
              },
            }),
          ]}
        >
          <Input.Password
            placeholder={intl.get("PLEASE_ENTER_THE_PASSWORD_AGAIN")}
            onChange={()=> onFormValidateFields('confirmPassword')}
            iconRender={(visible) =>
              visible ? (
                <Icons.showPwdIcon style={{ fontSize: 20 }} />
              ) : (
                <Icons.hidePwdIcon style={{ fontSize: 20 }} />
              )
            }
            style={{ height: "40px" }}
          />
        </Form.Item>
        <Form.Item
          name="verificationCode"
          rules={[
            {
              required: true,
              message: intl.get("PLEASE_ENTER_VERIFICATION_CODE"),
              whitespace: true,
            },
            {
              len: 6,
              message: intl.get("PLEASE_ENTER_A_6_DIGIT_VERIFICATION_CODE"),
            },
          ]}
          style={{
            width: "328px",
            display: "inline-block",
            marginTop: "1px",
          }}
        >
          <Input
            onChange={()=> onFormValidateFields('verificationCode')}
            placeholder={intl.get("PLEASE_ENTER_A_6_DIGIT_VERIFICATION_CODE")}
            className="sendinput"
          />
        </Form.Item>
        <Button
          className="sendvic"
          type="primary"
          disabled={fired || !(formValidateFields.confirmPassword && formValidateFields.password)}
          onClick={() => getVerificationCode()}
        >
          { fired ? `${btnStyle}秒后发送` : "发送验证码"}
        </Button>
        <Form.Item>
          <Button
            type="primary"
            style={{ height: "40px", width: "450px", borderRadius: "2px" }}
            onClick={clickEnterReset}
            disabled={!(formValidateFields.confirmPassword && formValidateFields.password && formValidateFields.verificationCode)}
          >
            {intl.get("OK")}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default ChangePasswordModal

ChangePasswordModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  passwordModalCancel: PropTypes.object.isRequired,
}
