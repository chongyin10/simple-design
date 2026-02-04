import React, { useEffect, useState } from 'react';
import cookie from 'react-cookies';
import { Button, Dropdown, Menu, message, Modal, Input, Form, Table, Radio } from 'antd';
import { UserOutlined, LogoutOutlined, CopyOutlined, UsergroupAddOutlined, UserSwitchOutlined, UserAddOutlined } from '@ant-design/icons';
import { useClipboard } from 'use-clipboard-copy';
import { newCreatorTeam, switchTeam, getTeamList } from './api/teamApi';
import { userId } from '../../utils/cookie';
import { logout } from '../../utils/logout';
import intl from 'react-intl-universal';

import "./index.less";

async function validateImageUrl(url) {
    let isValid = true
    try {
        await checkImgExists(url)
    } catch (err) {
        isValid = false
    }
    return isValid
}

function checkImgExists(imgUrl) {
    return new Promise(function (resolve, reject) {
        let ImgObj = new Image()
        ImgObj.src = imgUrl
        ImgObj.onload = function (res) {
            resolve(res)
        }
        ImgObj.onerror = function (err) {
            reject(err)
        }
    })
}

function User({ data }) {

    const [userInfo, setUserInfo] = useState({});
    const [avatarUrl, setAvatarUrl] = useState();
    const clipboard = useClipboard();

    const [openTeam, setOpenTeam] = useState(false);
    const [openCheckTeam, setOpenCheckTeam] = useState(false);

    const handleLogout = ({ item, key }) => {
        logout();
    }

    const handleUserCenter = () => {
        window.location.href = '/console/myAccount/personalInformation';
    }

    useEffect(() => {
        if (data) {
            setUserInfo(data);
            const avatarUrl = `/0/api/v1/user/image/profile_photo/${data.userId}.jpg?temp=${Date.now()}`;
            validateImageUrl(avatarUrl).then(isValid => {
                if (isValid) {
                    setAvatarUrl(avatarUrl)
                }
            }).catch(error => {

            })
        }
    }, [data]);

    const copyUser = () => {
        clipboard.copy(JSON.stringify({
            [intl.get('USER_ACCOUNT')]: userInfo.email || userInfo.phone,
            [intl.get('TEAM_USER_TABLE_ID')]: userInfo?.userId
        }));
        message.success(intl.get('ALREADY')+intl.get('COPY'));
    }

    const copyTeam = () => {
        clipboard.copy(JSON.stringify({
            [intl.get('CURRENT_USER_ROLE')]: userInfo?.role?.join(),
            [intl.get('TEAM_NAME')]: userInfo?.teamName,
            [intl.get('TEAM')+"ID"]: userInfo?.teamId
        }));
        message.success(intl.get('ALREADY')+intl.get('COPY'));
    }

    const onNewTeam = () => {
        setOpenTeam(true);
    }

    const oldItem = (
        <Menu>
            <Menu.Item key="userinfo">
                <div style={{ padding: '10px 10px 10px 0px', display: 'flex', width: '100%' }}>
                    <div style={{ marginRight: '15px' }}>
                        <div style={{ width: '50px', height: '50px', borderRadius: '50%' }}>
                            <img style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} src={avatarUrl} alt="" />
                        </div>
                    </div>
                    <div>
                        <div style={{ marginBottom: '5px' }}>{intl.get('USER_ACCOUNT')}: <span>{userInfo.email || userInfo.phone}</span></div>
                        <div style={{ display: 'flex', width: '230px' }}>{intl.get('USER')}ID: <span>{userInfo?.userId}</span><span className='conter-userinfo' style={{ marginLeft: '5px' }}><CopyOutlined onClick={copyUser} /></span></div>
                    </div>
                </div>
            </Menu.Item>
            <Menu.Item key="team">
                <div style={{ padding: '10px 10px 10px 0px' }}>
                    <div>
                        <div style={{ marginBottom: '5px' }}>{intl.get('CURRENT_USER_ROLE')}: <span>{userInfo?.role?.join()}</span></div>
                        <div style={{ marginBottom: '5px' }}>{intl.get('TEAM_NAME')}: <span>{userInfo?.teamName}</span></div>
                        <div>{intl.get('TEAM')+"ID"}: <span>{userInfo?.teamId}</span><span className='conter-userinfo' style={{ marginLeft: '5px' }}><CopyOutlined onClick={copyTeam} /></span></div>
                    </div>
                </div>
            </Menu.Item>
            <Menu.Item key="usercenter">
                <div style={{ padding: '10px 10px 10px 0px' }} onClick={handleUserCenter}>
                    <UserOutlined style={{ marginRight: '5px' }} />{intl.get('USER')+intl.get('CENTER')}
                </div>
            </Menu.Item>
            <Menu.Item key="teamcenter">
                <div style={{ padding: '10px 10px 10px 0px' }} onClick={() => window.location.href = '/console/member'}>
                    <div>
                        <UsergroupAddOutlined style={{ marginRight: '5px' }} />{intl.get('TEAM')+intl.get('CENTER')}
                    </div>
                </div>
            </Menu.Item>
            <Menu.Item key="checkcenter">
                <div onClick={() => setOpenCheckTeam(true)} style={{ padding: '10px 10px 10px 0px' }}>
                    <div>
                        <UserSwitchOutlined style={{ marginRight: '5px' }} />{intl.get('SWITCH')+intl.get('TEAM')}
                    </div>
                </div>
            </Menu.Item>
            <Menu.Item key="newcenter">
                <div onClick={onNewTeam} style={{ padding: '10px 10px 10px 0px' }}>
                    <div>
                        <UserAddOutlined style={{ marginRight: '5px' }} />{intl.get('NEW_FOUND')+intl.get('TEAM')}
                    </div>
                </div>
            </Menu.Item>
            <Menu.Item key="logout">
                <div style={{ padding: '10px 10px 10px 0px' }} onClick={handleLogout}>
                    <div>
                        <LogoutOutlined style={{ marginRight: '5px' }} />{intl.get('LOGOUT')}
                    </div>
                </div>
            </Menu.Item>
        </Menu>
    )


    return (
        <div>
            <Dropdown
                overlay={oldItem}
                placement="bottom"
                style={{background: 'transparent'}}
            >
                <Button icon={<UserOutlined style={{ width: '14px'}} />} style={{ border: '0px', background: 'transparent' }}>
                    <span>{userInfo?.username}</span>
                </Button>
            </Dropdown>
            <NewTeamModal
                openTeam={openTeam}
                setOpenTeam={setOpenTeam}
                teamId={userInfo?.teamId}
            />
            <CheckTeamModal
                openCheckTeam={openCheckTeam}
                setOpenCheckTeam={setOpenCheckTeam}
                teamId={userInfo?.teamId}
            />
        </div>
    )
}

export function CheckTeamModal({ openCheckTeam = false, setOpenCheckTeam, teamId }) {

    if (!openCheckTeam) return;

    const [teamList, setTeamList] = useState([]);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        openCheckTeam && getTeamListApi();
    }, [openCheckTeam])

    const checkTeam = () => {
        if (selectedRowKeys.length == 0) {
            message.warning(intl.get('PLEASE_SELECT_THE_TEAM'));
            return;
        };
        switchTeamApi()
    }

    const getTeamListApi = () => {
        setLoading(true);
        getTeamList().then((res) => {
            const { records } = res.data
            const roleListWithTeam = records.map((item) => {
                return {
                    ...item,
                    roleIdList: item.roleId,
                }
            });
            setTeamList(roleListWithTeam);
        }).finally(() => {
            setTimeout(() => {
                setLoading(false);
            }, 600);
        })
    }

    const switchTeamApi = () => {
        if (selectedRowKeys[0] === teamId) {
            return false
        }
        const data = {
            teamId: selectedRowKeys[0],
            userId,
        }
        switchTeam(data).then(res => {
            message.success(intl.get('SWITCH_TEAM_SUCCESSFULLY'));
            saveHistoryOpenFile();
            saveGlobalKeywordSearch();
            removeHistoryOpenProject();
            setOpenCheckTeam(false);
            setTimeout(() => {
                window.location.reload();
            }, 300);
        })
    }

    function saveHistoryOpenFile(historyOpenFileObj = {}) {
        window.localStorage.setItem(
            "historyOpenFile",
            JSON.stringify(historyOpenFileObj)
        )
    }

    function saveGlobalKeywordSearch(globalKeywordSearch = {}, projectId) {
        if (Array.isArray(globalKeywordSearch[projectId])) {
            globalKeywordSearch[projectId] = globalKeywordSearch[projectId].slice(0, 5)
        }
        window.localStorage.setItem(
            "global_keyword_search",
            JSON.stringify(globalKeywordSearch)
        )
    }

    const removeHistoryOpenProject = () => {
        const hostname = window.location.hostname;
        cookie.remove('historyOpenProject', { path: '/', domain: hostname });
        cookie.remove('historyOpenProject', { path: '/', domain: 'localhost' });
    }

    const columns = [
        {
            title: '',
            dataIndex: 'box',
            key: 'box',
            align: 'center',
            width: 40,
            render: (text, record) => {
                return <Radio disabled={teamId == record['teamId']} checked={record['teamId'] == selectedRowKeys?.[0]}></Radio>
            }
        },
        {
            title: intl.get('TEAM')+'ID',
            dataIndex: 'teamId',
            key: 'teamId',
            align: 'center',
            render: (text) => {
                return <span>{text == teamId ? `${text}(${intl.get('CURRNET')+intl.get('TEAM')})` : text}</span>
            }
        },
        {
            title: intl.get('TEAM')+intl.get('NAME'),
            dataIndex: 'teamName',
            key: 'teamName',
            width: 200,
            align: 'center'
        },
        {
            title: intl.get('ROLE'),
            dataIndex: 'roleName',
            key: 'roleName',
            align: 'center',
            width: 200,
            render: (text, record) => <span>{text ? text?.join() : ''}</span>
        },
    ]

    const onRow = (record, index) => {
        if (record['teamId'] == teamId) return;
        if (selectedRowKeys.length == 0 || selectedRowKeys[0] != record['teamId']) {
            setSelectedRowKeys([record['teamId']]);
        } else {
            setSelectedRowKeys([]);
        }
    }

    return (
        <Modal
            title={intl.get('SWITCH')+intl.get('TEAM')}
            visible={openCheckTeam}
            onOk={() => checkTeam()}
            width={800}
            onCancel={() => {
                setSelectedRowKeys([]);
                setOpenCheckTeam(false);
            }}
        >
            <Table
                rowKey={'teamId'}
                loading={loading}
                onRow={(record, index) => {
                    return {
                        onClick: () => onRow(record, index), // 点击行
                    };
                }}
                columns={columns}
                dataSource={teamList}
                pagination={false}
                scroll={{ y: window.innerHeight - 350 }}
            />
        </Modal>
    )
}

function NewTeamModal({ openTeam = false, setOpenTeam }) {

    if (!openTeam) return;

    const [creatorTeamForm] = Form.useForm()
    const [inputHint2, setInputHint2] = useState("")

    const creatorNewTeam = () => {
        creatorTeamForm.validateFields().then((value) => {
            const { username } = value
            newCreatorTeam({ teamName: username }).then((res) => {
                setOpenTeam(false)
                creatorTeamForm.resetFields()
                message.success(intl.get('CREATE_TEAM_SUCCESS'))
            })
        })
    }

    return (
        <Modal
            title={intl.get('CREATE_NEW_TEAM')}
            open={openTeam}
            onOk={() => creatorNewTeam()}

            onCancel={() => {
                setOpenTeam(false)
                creatorTeamForm.resetFields()
            }}
        >
            <Form labelCol={{ span: 24 }} form={creatorTeamForm}>
                <Form.Item
                    name="username"
                    extra={inputHint2}
                    rules={[
                        {
                            validator: (_, value) => {
                                const remainingLength = 30 - value?.length;
                                if (0 <= remainingLength <= 30 && value !== undefined) {
                                    if (remainingLength === 30) {
                                        setInputHint2("")
                                        return Promise.reject(intl.get('INPUT_CAN_NOT_BE_EMPTY'))
                                    } else if (remainingLength < 0) {
                                        setInputHint2("")
                                        return Promise.reject(intl.get('TEAM_NAME_CAN_BE_UP_TO_30_CHARACTERS_LONG'))
                                    } else if (remainingLength > 27) {
                                        setInputHint2("")
                                        return Promise.reject(intl.get('PLEASE_ENTER_AT_LEAST_THREE_CHARACTERS'))
                                    } else {
                                        setInputHint2(`${intl.get('YOU_CAN_ALSO_TYPE')}${remainingLength}${intl.get("CHARACTER")}`)
                                        return Promise.resolve()
                                    }
                                } else if (value === undefined) {
                                    return Promise.reject(intl.get('PLEASE_EDIT_THE_TEAM_NAME'))
                                }
                            }
                        },
                    ]}
                >
                    <Input placeholder={intl.get('PLEASE_ENTER_A_TEAM_NAME')} onPressEnter={() => creatorNewTeam()} />
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default User