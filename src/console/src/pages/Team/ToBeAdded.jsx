import React, {useEffect, useState} from 'react'
import {Table, Space, message, Modal } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import teamApi from '../../serviceApi/teamApi'
import { userId, teamId } from '../../utils/cookie'

import './team.less'
import intl from "react-intl-universal"

function ToBeAdded (){
  const [records, setRecords] = useState([]);
  const [pageTotal, setPageTotal] = useState(0);
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  useEffect(() => {
    getAwaitAddTeamList()
  }, [])

  const getAwaitAddTeamList = (size=10, current=1) => {
    teamApi.getAwaitAddTeamList({size, current})
      .then(res => {
        const { records, current, pages, size, total } = res.data;
        for(let prop of records){
          prop['key'] = prop['id']
          var time = new Date(prop['createTime']).toJSON();
          var date = new Date(+new Date(time)+8*3600*1000).toISOString().replace(/T/g,' ').replace(/\.[\d]{3}Z/,'');
          prop['createTime'] = date
        }
        setRecords(records)
        setPageTotal(total)
        setPageIndex(current)
        setPageSize(size)
      })
  }

  const reinviteMember = (record) => {
    const data = {
      userId,
      beInviteUserId: record.userId,
      teamId: record.teamId
    }
    teamApi.reinviteToJoinTeam(data)
      .then(res => {
        message.success(intl.get("RE_INVITE_SUCCESSFUL"));
      })
  }

  const removeMember = (record) => {
    console.log(record)
    Modal.warning({
      title: intl.get("REVOKE_INVITATION"),
      content: `你确定撤销 ${record.account} 的加入团队邀请？`,
      closable: true,
      keyboard: true,
      onOk(){
        const data = {
          userId,
          removeUserId: String(record.userId),
          teamId
        }
        teamApi.removeMember(data)
          .then(res => {
            message.success(intl.get("INVITATION_REVOKED_SUCCESSFULLY"));
            getAwaitAddTeamList()
          })
      }
    });
  }




  const columns = [
    {
      title: intl.get("INVITED_PEOPLE"),
      dataIndex: 'account',
      key: 'account',
    },
    {
      title: intl.get("DATE"),
      dataIndex: 'createTime',
      key: 'createTime',
    },
    {
      title: intl.get("OPERATE"),
      key: 'operate',
      render: (text, record) => (
        <Space size="middle">
          {/* <a>编辑</a> */}
          <a onClick = {() => reinviteMember(record)}>{intl.get("RE_INVITE")}</a>
          <a onClick = {() => removeMember(record)}>{intl.get("REVOKE_INVITATION")}</a>
        </Space>
      ),
    },
  ];
  return (
    <div className='allmembers tobeadded'>
      <div className='allmembers-top'>
        <div className='title'>{intl.get("MEMBER_TO_BE_ADDED")}</div>
      </div>
      <Table 
        columns={columns} 
        dataSource={records} 
        // rowKey={_ => _.jobId}
        pagination={{
            showQuickJumper: true,
            current: pageIndex,
            total: pageTotal,
            pageSize,
            onChange: (current, size) => {
                setPageIndex(current);
                setPageSize(size);
                getAwaitAddTeamList(size, current)
                // getBusinessListApi(size, current, searchInfo, status, sortField);
            },
            pageSizeOptions: ["10", "20", "50", "100"],
            showSizeChanger: true,
            showTotal: (total, range) => {
                return `共${total}条`
            },
        }}
      />
    </div>
  )
}

export default ToBeAdded;
