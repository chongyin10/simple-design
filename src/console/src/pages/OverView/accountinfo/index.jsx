import { Form, Row, Col, Button, Space, Modal, Input, message } from 'antd';
import { useState, useEffect } from 'react';
import costApi from '../../../serviceApi/cost';
import { useMemo } from 'react';
import { useHistory } from "react-router"

import teamApi from "../../../serviceApi/teamApi"
import { title } from '../common'

import { useSelector } from 'react-redux';
import { selectUser } from '../../../store/modules/userSlice';
import { userId } from '../../../utils/cookie'

import { CheckTeamModal } from '../../../components/header/user/mutUser'
import intl from 'react-intl-universal';

function Accountinfo(){
  const userInfo = useSelector(selectUser);
  const [form] = Form.useForm();
  const [avatarUrl, setAvatarUrl] = useState();
  const [members, setMembers] = useState(0);
  const [contect, setContect] = useState(false);
  // 切换团队
  const [openCheckTeam, setOpenCheckTeam] = useState(false);
  // 实名认证
  const [authenticate, setAuthenticate] = useState(false)
  const [isAuthentication, setIsAuthentication] = useState(false)
  const [loading, setLoading] = useState(false)


  const [cash, setCash] = useState('0.00');
  const history = useHistory();
  useEffect(() => {
    const avatarUrl = `/0/api/v1/user/image/profile_photo/${userId}.jpg?temp=${Date.now()}`;
    setAvatarUrl(avatarUrl)
  }, [userId]);
  useEffect(() => {
    getTeamMemberList()
    getFinanceAccount()
    getGlobalConfigListApi()
  }, [])

  const [realname, setRealname] = useState('off');
  const getGlobalConfigListApi = async () => {
    const result = await teamApi.getGlobalConfigList();
    if (result.code >= 20000000 && result.code < 30000000) {
        const _data = result?.data?.data?.filter(item => item.moduleName == 'auth');
        if (_data.length > 0) {
            setRealname(_data[0].config?.realname || 'off');
            if(_data[0].config?.realname==='on'){
              isAuthentification()
            }
        }
    }
  }

  const userRole = useMemo(() => { 
    const roleId = userInfo.roleId;
    if (roleId && (roleId[0] == 99 || roleId[0] == 10)) {
      return intl.get('TEAM')+intl.get('MANAGER');
    } else {
      return intl.get('COMMON_USER');
    }
  }, [userInfo.roleId]);

  const getTeamMemberList = () => {
    teamApi.getTeamMemberList().then((res) => {setMembers(res?.data?.total)})
  }

  const getFinanceAccount = () => {
    costApi.getFinanceAccountApi().then((res) => {
      const totalBalance = Number(res.data.totalBalance);
      setCash((totalBalance / 100).toFixed(2));
    }).catch((err) => {
      console.log(err)
    });
  }


  const isAuthentification = () => {
    teamApi.isAuthentication(userInfo?.username)
      .then(res => {
        if(res.data.authCode != 2 && res.data.authCode != 5){
          setIsAuthentication(true)
        }else{
          setIsAuthentication(false)
        }
      })
      .catch(err => console.log(err))
  }

  const verify = () => {
    form.validateFields()
      .then(valus => {
        setLoading(true)
        const {realName, idCardNo} = valus
        const payload = { realName, idCardNo, memberName: userInfo?.username}
        teamApi.authenticate(payload)
          .then(res => {
            setLoading(false)
            if(res.data.authCode != 2 && res.data.authCode != 5){
              message.success(intl.get('COMMIT_AUTHENTICATION')+intl.get('SUCCESS'))
              setAuthenticate(false)
              form.resetFields()
              isAuthentification()
            }else{
              message.error(intl.get('COMMIT_AUTHENTICATION')+intl.get('FAILURE'))
            }
          })
          .catct(err => console.log(err))
      })
      .catch(err => {console.log(err)})

  }

  
  return <>
    <div className="account border">
      <div className='headline'>
        {title(intl.get('ACCOUNT'))}
        <Space>
          <Button type='link' onClick={() => history.push('/myAccount/personalInformation')}>{intl.get('ACCOUNT')}{intl.get('SETTING')}</Button>
        </Space>
        
      </div>
      <Row>
        <Col span={6}>
          {/* <img src={require('../../assets/image/user.svg').default} /> */}
          <img style={{ width: '90%', objectFit: 'cover', borderRadius: '50%' }} src={avatarUrl} alt="" />

        </Col>
        <Col>
          <p>
            <span className="word">{intl.get('USER')}{intl.get('ACCOUNT')}</span><br />
            <span>{userInfo.username}</span>
          </p>
          <div style={{height: '5px'}}></div>
          <p>
            <span className="word">{intl.get('USER')}ID</span> <br />
            <span>{userInfo.userId}</span>
          </p>
          {/**
           * 
           */}
          {realname==='on' && <div>
            {isAuthentication? <div className='authentication' >{intl.get('REAL_NAME_AUTHENTICATION_BEEN_VERIFIED')}</div> : <div className='unauthenticate' onClick={() => setAuthenticate(true)} >{intl.get('NO_REAL_NAME_AUTHENTICATION')}</div>}
            {/* <div className='unauthenticate' onClick={() => setAuthenticate(true)} >未实名</div> */}
          </div>}
        </Col>
      </Row>
    </div>

    <div className="myteam border">
      <div className='headline'>
        {title(intl.get('TEAM')+intl.get('INFOMATION'))}
        <Space>
          <Button type='link' onClick={() => setOpenCheckTeam(true)}>{intl.get('SWITCH')}{intl.get('TEAM')}</Button>
          <Button type='link' onClick={() => history.push('/member')}>{intl.get('MEMBER')}{intl.get('MANAGEMENT')}</Button>
        </Space>
      </div>
      <Row>
        <Col span={19}>
          <p>
            <span className="word">{intl.get('CURRNET')}{intl.get('USER')}{intl.get('ROLE')}</span><br />
            <span>{userRole}</span>
          </p>
          <div style={{height: '15px'}}></div>
          <p>
            <span className="word">{intl.get('TEAM')}{intl.get('NAME')}</span> <br />
            <span>{userInfo.teamName}</span>
          </p>
          <div style={{height: '15px'}}></div>
          <p>
            <span className="word">{intl.get('TEAM')}ID</span> <br />
            <span>{userInfo.teamId}</span>
          </p>
        </Col>
        <Col span={5} className='bg col'>
          <span style={{fontSize: '32px', color: '#107FE5'}}>{members}</span>
          <span style={{color: 'rgba(0,0,0,0.6)'}}>{intl.get('MEMBER')}{intl.get('QUANTITY')}</span>
        </Col>
      </Row>
    </div>


    <div className="balance border">
      <div className='headline'>
        {title(intl.get('ACCOUNT')+intl.get('BALANCE'))}
        <Button type='link' onClick={() => history.push('/cost/indent')}>{intl.get('CHECK')}{intl.get('BILL')}</Button>
      </div>
      <div className='balance-num'>
        <div className='number'><span>{cash}</span>&nbsp;&nbsp;&nbsp;&nbsp;{window.globalConfig?.currency?.unit}</div>
        <Button type="primary" ghost onClick={() => history.push('/cost/recharges')}>{intl.get('TEAM_MENU_COST_RECHARGES')}</Button>
      </div>
    </div>


    <div className="asist border">
      <div className='headline'>
        {title(intl.get('QUESTION_AND_HELP'))}
      </div>
      <div className='bg item1' onClick={() => window.open(window.globalConfig?.document?.idp)}>{intl.get('DOCUMENT_HELP')}</div>
      <div className='bg item2' onClick={() => setContect(true)}>{intl.get('CONTACT_US')}</div>
    </div>

    <CheckTeamModal
      openCheckTeam={openCheckTeam}
      setOpenCheckTeam={setOpenCheckTeam}
      teamId={userInfo?.teamId}
    />

    <Modal 
      visible={contect} 
      loading={loading}
      centered
      title={intl.get('CONTACT_US')}
      onCancel={() => setContect(false)}
      footer={[<Button type='primary' onClick={() => setContect(false)}>{intl.get('CLOSE')}</Button>]}>
      <div style={{display: 'flex', justifyContent: 'space-around'}}>
        <img src={window.globalConfig?.CS?.QRCode} alt="" />
      </div>
    </Modal>

    <Modal 
      visible={authenticate} 
      title={intl.get('AUTHENTIFCATION')}
      onCancel={() => {
        setAuthenticate(false)
        form.resetFields()
      }}
      onOk={verify}
      width={600}
    >
      <div className='little-title'>{intl.get('COMPLETE_AUUTHENTICATION_BEFORE_PURCHASING_THE_INSTANCE')}</div>
      <span>{intl.get('YOU_ARE_NOW_AUTHENTICATED')}</span> <br />
      <span style={{color: '#f09da7', marginBottom: '15px', display: 'inline-block'}}>{intl.get('PLEASE_COMPLETE_THE_REAL_NAME_VERIFICATION')}</span>
      <Form
        name="basic"
        form={form}
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 20,
        }}
      >
        <Form.Item
          label={intl.get('ALL_NAME')}
          name="realName"
          rules={[
            {
              required: true,
              message: intl.get('PLEASE_ENTER_YOUR_NAME')
            },
          ]}
        >
          <Input placeholder={intl.get('PLEASE_ENTER_REAL_NAME')}/>
        </Form.Item>

        <Form.Item
          label={intl.get('IDENTIFICATION_CARD')}
          name="idCardNo"
          rules={[
            {
              required: true,
              message: intl.get('PLEASE_ENTER_IDENTIFICATION_CARD'),
            },
            { pattern:new RegExp('(^\\d{15}$)|(^\\d{17}([0-9]|X)$)','g'),message: intl.get('PLEASE_ENTER_THE_CORRECT_IDENTIFICATION_CARD')},
          ]}
          validateFirst={true}
        >
          <Input placeholder={intl.get('PLEASE_ENTER_VALID_ID_NUMBER')} />
        </Form.Item>

      </Form>
    </Modal>
  </>
}
export default Accountinfo