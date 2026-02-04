import { useEffect, useState } from 'react';
import { Button, Dropdown, message, Menu } from 'antd';
import { UserOutlined, LogoutOutlined, CopyOutlined, SettingOutlined } from '@ant-design/icons';
import { useClipboard } from 'use-clipboard-copy';
import { logout } from '../../../utils/logout';
import { version } from 'antd';

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

function User({ userInfo }) {

    const [avatarUrl, setAvatarUrl] = useState();
    const clipboard = useClipboard();

    const antdVersion = Number(version.split('.')[0]) > 4;

    useEffect(() => {
        if (userInfo) {
            const avatarUrl = `/0/api/v1/user/image/profile_photo/${userInfo.userId}.jpg?temp=${Date.now()}`;
            validateImageUrl(avatarUrl).then(isValid => {
                if (isValid) {
                    setAvatarUrl(avatarUrl)
                }
            }).catch(error => {

            })
        }
    }, [userInfo])

    const menuClick = ({ item, key }) => {
        logout();
    }

    const copyUser = () => {
        clipboard.copy(JSON.stringify({
            "用户账号": userInfo.username,
            "用户ID": userInfo?.userId
        }));
        message.success('已复制');
    }

    const copyTeam = () => {
        clipboard.copy(JSON.stringify({
            "当前用户角色": userInfo?.role?.join(),
            "团队名称": userInfo?.teamName,
            "团队ID": userInfo?.teamId
        }));
        message.success('已复制');
    }

    const items = [
        {
            key: 'userinfo',
            label: (
                <div style={{ padding: '10px 10px 10px 0px' }}>
                    <div style={{ marginRight: '15px' }}>
                        <div style={{ width: '50px', height: '50px', borderRadius: '50%' }}>
                            <img style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} src={avatarUrl} alt="" />
                        </div>
                    </div>
                    <div>
                        <div style={{ marginBottom: '5px' }}>用户账号: <span>{userInfo.username}</span></div>
                        <div>用户ID: <span>{userInfo?.userId}</span><span className='conter-userinfo' style={{ marginLeft: '5px' }}><CopyOutlined onClick={copyUser} /></span></div>
                    </div>
                </div>
            ),
        },
        {
            key: 'team',
            label: (
                <div style={{ padding: '10px 10px 10px 0px' }}>
                    <div vertical>
                        <div style={{ marginBottom: '5px' }}>当前用户角色: <span>{userInfo?.role?.join()}</span></div>
                        <div style={{ marginBottom: '5px' }}>团队名称: <span>{userInfo?.teamName}</span></div>
                        <div>团队ID: <span>{userInfo?.teamId}</span><span className='conter-userinfo' style={{ marginLeft: '5px' }}><CopyOutlined onClick={copyTeam} /></span></div>
                    </div>
                </div>
            ),
        },
        {
            key: 'usercenter',
            label: (
                <div style={{ padding: '10px 10px 10px 0px' }} onClick={() => window.location.href = '/team/myAccount/personalInformation'}>
                    <div>
                        <SettingOutlined style={{ marginRight: '5px' }} />个人账号设置
                    </div>
                </div>
            ),
        },
        {
            key: 'logout',
            label: (
                <div style={{ padding: '10px 10px 10px 0px' }} onClick={menuClick}>
                    <div>
                        <LogoutOutlined style={{ marginRight: '5px' }} />退出登录
                    </div>
                </div>
            ),
        },
    ];

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
                        <div style={{ marginBottom: '5px' }}>用户账号: <span>{userInfo.username}</span></div>
                        <div style={{ display: 'flex', width: '230px' }}>用户ID: <span>{userInfo?.userId}</span><span className='conter-userinfo' style={{ marginLeft: '5px' }}><CopyOutlined onClick={copyUser} /></span></div>
                    </div>
                </div>
            </Menu.Item>
            <Menu.Item key="team">
                <div style={{ padding: '10px 10px 10px 0px' }}>
                    <div vertical>
                        <div style={{ marginBottom: '5px' }}>当前用户角色: <span>{userInfo?.role?.join()}</span></div>
                        <div style={{ marginBottom: '5px' }}>团队名称: <span>{userInfo?.teamName}</span></div>
                        <div>团队ID: <span>{userInfo?.teamId}</span><span className='conter-userinfo' style={{ marginLeft: '5px' }}><CopyOutlined onClick={copyTeam} /></span></div>
                    </div>
                </div>
            </Menu.Item>
            <Menu.Item key="usercenter">
                <div style={{ padding: '10px 10px 10px 0px' }} onClick={() => window.location.href = '/team/myAccount/personalInformation'}>
                    <div>
                        <SettingOutlined style={{ marginRight: '5px' }} />个人账号设置
                    </div>
                </div>
            </Menu.Item>
            <Menu.Item key="logout">
                <div style={{ padding: '10px 10px 10px 0px' }} onClick={menuClick}>
                    <div>
                        <LogoutOutlined style={{ marginRight: '5px' }} />退出登录
                    </div>
                </div>
            </Menu.Item>
        </Menu>
    )

    const dropdownMenu = antdVersion ? { menu: { items } } : { overlay: oldItem };

    return (
        <Dropdown
            placement="bottom"
            style={{ background: 'transparent' }}
            {...dropdownMenu}
        >
            <Button icon={<UserOutlined style={{ width: 'unset', color: 'unset' }} />} style={{ background: 'transparent', border: '0px', color: 'unset', fontSize: 'unset', height: '100%' }}>
                <span style={{ opacity: 1 }}>{userInfo?.username}</span>
            </Button>
        </Dropdown>
    )
}

export default User