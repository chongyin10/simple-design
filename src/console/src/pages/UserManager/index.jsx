import React, { useEffect, useRef, useState } from "react"
import "./index.less"
import { Button, DatePicker, Input, Table } from "antd"
import { useMemoizedFn, useReactive } from "ahooks"
import userApproveApi from "../../serviceApi/userApproveApi"
import dayjs from "dayjs"
import roleApi from "../../serviceApi/roleApi"
import intl from 'react-intl-universal';

const { RangePicker } = DatePicker

function findRoleName(roleList, roleId) {
  const findResult = roleList.find((item) => item.id === roleId)
  return findResult ? findResult.roleName : ""
}

function UserManager(props) {
  const userManagerState = useReactive({
    list: [],
    current: 1,
    size: 20,
    total: 0,
    conditions: "",
    timeArr: "",
  })

  const [momentTimeArr, setMomentTimeArr] = useState([])
  const roleListRef = useRef()

  useEffect(() => {
    roleApi.getRoleList().then((res) => {
      roleListRef.current = res.data
      getUserManagerList()
    })
  }, [])

  const getUserManagerList = useMemoizedFn(() => {
    const { current, size, conditions, timeArr } = userManagerState
    userManagerState.list = []

    const params = {
      pageIndex: current,
      pageSize: size,
    }

    if (conditions) {
      params.conditions = conditions
    }
    if (timeArr) {
      params.createTime = timeArr
    }

    userApproveApi.userManagement(params).then((res) => {
      userManagerState.list = res.data.records
      userManagerState.total = res.data.total
    })
  })

  const resetCurrentAndRefresh = () => {
    userManagerState.current = 1
    getUserManagerList()
  }

  const columns = [
    {
      title: intl.get('TEAM_USER_TABLE_NAME'),
      dataIndex: "user_name",
    },
    {
      title: intl.get('TEAM_USER_TABLE_ROLE'),
      dataIndex: "role_id",
      render(text) {
        return (
          <span>
            {Array.isArray(text) &&
              text.map((item, index, arr) => {
                let text = findRoleName(roleListRef.current, item)
                if (index !== arr.length - 1) {
                  text += "|"
                }
                return text
              })}
          </span>
        )
      },
    },
    {
      title: intl.get('TEAM_USER_TABLE_PHONE'),
      dataIndex: "phone",
    },
    {
      title: intl.get('TEAM_USER_TABLE_EMAIL'),
      dataIndex: "email",
    },
    {
      title: intl.get('TEAM_USER_TABLE_REALNAME'),
      dataIndex: "real_name",
    },
    {
      title: intl.get('TEAM_USER_TABLE_COMPANY'),
      dataIndex: "company",
    },
    {
      title: intl.get('TEAM_USER_TABLE_SCHOOL'),
      dataIndex: "school",
    },
    {
      title: intl.get('TEAM_USER_TABLE_CREATE_TIME'),
      dataIndex: "create_time",
      render(text) {
        return <span>{dayjs(text).format("YYYY-MM-DD HH:mm:ss")}</span>
      },
    },
    {
      title: intl.get('TEAM_USER_TABLE_IP'),
      dataIndex: "ip",
    },
    {
      title: intl.get('TEAM_USER_TABLE_ID'),
      dataIndex: "user_id",
    },
  ]

  return (
    <div className={"user-manager-container"}>
      <h2 style={{ fontSize: 20, fontWeight: "bold", marginBottom: 20 }}>
        {intl.get('TEAM_MENU_USER')}
      </h2>

      <div className={"user-manager-search"}>
        <span style={{ marginRight: 10 }}>{intl.get('TEAM_USER_TABLE_CREATE_TIME')}:</span>
        <RangePicker
          className={'time-input-wrapper'}
          style={{ width: 240 }}
          value={momentTimeArr}
          onChange={(dates, datesString) => {
            setMomentTimeArr(dates)
            if (!dates) {
              userManagerState.timeArr = ""
            } else {
              userManagerState.timeArr = datesString
            }
            resetCurrentAndRefresh()
          }}
          size={"large"}
        />

        <Input.Group
          style={{
            marginLeft: 10,
            width: "50%",
            display: "inline-block",
            transform: "translateY(-10px)",
          }}
          compact
        >
          <Input
            className={'search-input-wrapper'}
            value={userManagerState.conditions}
            onChange={(event) => {
              userManagerState.conditions = event.target.value
              if (!userManagerState.conditions) {
                resetCurrentAndRefresh()
              }
            }}
            onPressEnter={resetCurrentAndRefresh}
            placeholder={
              intl.get('TEAM_USER_SEARCH_PLACEHOLDER')
            }
            allowClear
            style={{ width: "80%", height: "40px" }}
          />
          <Button
            onClick={resetCurrentAndRefresh}
            style={{
              height: "40px",
              textAlign: "center",
              backgroundColor: "#1890FF",
            }}
            type="primary"
          >
            {intl.get('TEAM_USER_SEARCH')}
          </Button>
        </Input.Group>
      </div>

      <div className={"table-container"}>
        <Table
          scroll={{
            x: "155%",
          }}
          rowKey={"user_id"}
          dataSource={userManagerState.list}
          columns={columns}
          pagination={{
            showQuickJumper: true,
            current: userManagerState.current,
            total: userManagerState.total,
            pageSize: userManagerState.size,
            onChange: (current, size) => {
              userManagerState.current = current
              userManagerState.size = size
              getUserManagerList()
            },
            pageSizeOptions: ["10", "20", "50", "100"],
            showSizeChanger: true,
            showTotal: (total, range) => {
              return `共${total}条`
            },
          }}
        />
      </div>
    </div>
  )
}

export default UserManager
