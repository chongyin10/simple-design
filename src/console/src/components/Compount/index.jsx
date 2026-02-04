
import { Flex, Avatar, Space, message } from "antd"
import { UserOutlined, CopyOutlined } from '@ant-design/icons';
import copy from 'copy-to-clipboard';

function Compound({history, name, id, type }){

  return <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
    {type === 'user' && <Avatar size={36} icon={<UserOutlined />} />}
    <div flex={1} style={{paddingLeft: 8}}>
      <div 
        style={{cursor: history && 'pointer', textDecoration: history && 'underline'}}
        onClick={() => {
          history && history.push(`/detail/${id}`)
        }}>{name.replace('idp-', '')}</div>
      <div>{id} <CopyOutlined onClick={() => {
        copy(id)
        message.success('已复制')
      }} /></div>
    </div>
  </div>
}

export default Compound