import React, { useEffect, useState } from "react"
import { Input, Button, Modal, Form, Table, Radio, Space, message } from "antd"
import { PlusOutlined } from "@ant-design/icons"
import "./team.less"
import teamApi from "../../serviceApi/teamApi"
import PubSub from "pubsub-js"

import { userId, teamId } from "../../utils/cookie"
import intl from "react-intl-universal"
import {hasOperationFromModule} from "../../utils/storage"

function AllMembers() {
  const [addMemberModal, setAddMemberModal] = useState(false)
  const [addMemberForm] = Form.useForm()
  const [records, setRecords] = useState([])
  const [loding, setLoding] = useState(false)
  const [princeVisible, setPrinceVisible] = useState(false)
  const [value, setValue] = useState(1);
  const [administrator, setAdministrator] = useState(false)

  useEffect(() => {
    getTeamMemberList()
  }, [])
  useEffect(() => {
    const refreshControl = PubSub.subscribe("refresh", (msg, data) => {
      getTeamMemberList()
    })
    return () => {
      PubSub.unsubscribe(refreshControl)
    }
  }, [])
  useEffect(() => {
    if(records.length){
      setAdministrator(records.some(item => item.roleId.some(num => num === 10 || num===99) && item.userId === userId))
      // console.log(records,'---')
    }
  }, [records])

  const getTeamMemberList = () => {
    teamApi.getTeamMemberList().then((res) => {
      const { records } = res.data
      for (let prop of records) {
        prop["key"] = prop["id"]
      }
      setRecords(records)
    })
  }

  const addMember = () => {
    try {
      addMemberForm.validateFields().then((value) => {
        setLoding(true)
        let account = []
        for (let i = 0; i < value.username.split(/；|;/).length; i++) {
          account.push({
            account: value.username.split(/；|;/)[i],
            roles: [5],
          })
        }
        const data = {
          userId,
          inviteAccountList: account,
          teamId,
        }
        teamApi
          .inviteToJoinTeam(data)
          .then((res) => {
            console.log(res)
            setLoding(false)
            getTeamMemberList()
            setAddMemberModal(false)
            addMemberForm.resetFields()
            message.success(`${intl.get("INVITATION_SENT")}！`)
          })
          .catch((err) => {
            setLoding(false)
          })
      })
    } catch (e) {
      console.log(e)
      message.error("发生错误！")
      setLoding(false)
    }
  }

  const deleteMember = (record) => {
    console.log(record)
    Modal.warning({
      title: intl.get("REMOVE_MEMBER_ACTION"),
      content: `你确定要将 ${record.userName} 移除该团队？`,
      closable: true,
      keyboard: true,
      onOk() {
        const data = {
          userId,
          removeUserId: String(record.userId),
          teamId,
        }
        teamApi.removeMember(data).then((res) => {
          console.log(res)
          getTeamMemberList()
        })
      },
    })
  }

  // const onSearch = value => console.log(value);

  const columns = [
    {
      title: intl.get("MEMBER_NICKNAME"),
      dataIndex: "userName",
      key: "userName",
    },
    {
      title: intl.get("ROLE"),
      dataIndex: "roleName",
      key: "roleName",
      render: (roleName) => (
        <span>
          {roleName === null
            ? ""
            : roleName.map((item, index, roleName) => {
                return (
                  <span>
                    {index + 1 === roleName.length ? item : `${item}/`}
                  </span>
                )
              })}
        </span>
      ),
    },
    {
      title: intl.get("EMAIL_PHONE_NUMBER"),
      dataIndex: "account",
      key: "account",
    },
    // {
    //   title: '群组',
    //   dataIndex: 'group',
    //   key: 'group',
    // },
    {
      title: intl.get("STATUS"),
      key: "operate",
      render: (text, record) => (
        <Space size="middle">
          <div>
            {administrator? (
              <div>
                {
                  text.roleId.every(item => item === 10 || item === 99)?
                    <div>
                      <div>
                        {/* 移交团队逻辑有问题，先屏蔽掉这个功能 */}
                        {/* {record.roleId.every(item => item === 10)? <a className="turnover" onClick={() => setPrinceVisible(true)}>移交团队</a> : null} */}
                      </div>
                    </div> :
                    (
                      <div>
                      {hasOperationFromModule('team_manage',"remove_team_member") &&
                          (
                            <div>
                              <a onClick={() => deleteMember(record)}>
                                {intl.get("REMOVE_MEMBER")}
                              </a>
                            </div>
                          )}
                      </div>)
                }
              </div>
            ) : (<a className="noControl">{intl.get("INOPERABLE")}</a>)}
          </div>
        </Space>
      ),
    },
  ]

  const onChange = (e) => {
    // console.log('radio checked', e.target.value);
    setValue(e.target.value);
  };

  const confirmHandover = () => {
    teamApi.turnOver({userId: value})
      .then(res => {
        getTeamMemberList()
        message.success("已完成团队移交")
        setPrinceVisible(false)
      })
  }

  return (
    <div id={"tour-member-add"}  className="allmembers">
      <div className="allmembers-top">
        <div className="title">{intl.get("ALL_MEMBERS")}</div>
        {/* <div className='search'>
          <Input.Search
            placeholder="昵称/邮箱/手机号"
            onSearch={onSearch}
            enterButton />
        </div> */}
        <div className="add">
          {
            hasOperationFromModule("team_manage","invite_team_member") && (
                <Button  type="primary" onClick={() => setAddMemberModal(true)}>
                  <PlusOutlined />
                  {intl.get("ADD_MEMBERS")}
                </Button>
            )
          }
        </div>
      </div>

      {
        hasOperationFromModule("team_manage","list_team_member")
          &&  <Table columns={columns} dataSource={records} rowKey={record => record.createTime} />
      }

      <Modal
        title={intl.get("ADD_MEMBERS")}
        visible={addMemberModal}
        onCancel={() => {
          setAddMemberModal(false)
          addMemberForm.resetFields()
        }}
        width={500}
        footer={[
          <Button
            key="submit"
            type="primary"
            loading={loding}
            onClick={() => addMember()}
          >
            {intl.get("OK")}
          </Button>,
        ]}
      >
        <Form labelCol={{ span: 24 }} form={addMemberForm}>
          <div style={{ color: "#afafaf", paddingBottom: "10px" }}>
            {intl.get("PLEASE_ENTER_THE_NEW_MEMBER_S_EMAIL_ADDRESS")}
          </div>
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: intl.get("INVITE_MEMBERS_CANNOT_BE_EMPTY"),
              },
              {
                validator(_, value) {
                  let account = [],
                  phone = /^1[3456789]\d{9}$/,
                  // /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/ 
                  // /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/
                  email = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
                  for (let i = 0; i < value.split(/；|;/).length; i++) {
                    account.push(value.split(/；|;/)[i])
                  }
                  let bool = account.every((item) => {

                    if(phone.test(item)){
                      return true
                    }else if(email.test(item)){
                      return true
                    }else return false
                  })
                  if (bool) {
                    return Promise.resolve("通过")
                  } else {
                    return Promise.reject(
                      intl.get(
                        "PLEASE_MAKE_SURE_THE_EMAIL_NUMBER_ENTERED_IS_CORRECT"
                      )
                    )
                  }
                },
              },
            ]}
          >
            <Input.TextArea
              rows={5}
              placeholder={`${intl.get("SUPPORT_BATCH_IMPORT")}，${intl.get(
                "PLEASE_USE_A_SEMICOLON_TO_SEPARATE"
              )}`}
            />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title={'请选择移交的账户'}
        visible={princeVisible}
        onCancel={() => setPrinceVisible(false)}
        onOk={confirmHandover}
        width={350}
      >
        <Radio.Group onChange={onChange} value={value} className="radio-group">
          {records.map((item, index) => <div className="radio">
              {item.roleId.find((key) => key !== 10)? <Radio value={item.userId} >
                {item.userName}
              </Radio> : null}
          </div>)}
        </Radio.Group>
      </Modal>
    </div>
  )
}

export default AllMembers
