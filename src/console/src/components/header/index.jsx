import { useState, useEffect, useMemo } from 'react';
import { Layout } from 'antd';
import { getHost } from './utils/center';
import { getUserInfo } from './api/userApi';
import Api from './api';
import Feedback from './feedback/Feedback';
import Notification from './notification/Notification';
import Navigation from './navigation';
import './index.less';
import Theme from '@/Theme';

const Header = ({ doc, page }) => {

    const [feedbackView, setFeedbackView] = useState(false);
    const [notificationView, setNotificationView] = useState(false);
    const [isThreeAnyUnread, setIsThreeAnyUnread] = useState(false);
    const [globalSearchVisible, setGlobalSearchVisible] = useState(false);
    const [clickHeaderKey, setClickHeaderKey] = useState();

    const closeHandle = () => {
        setFeedbackView(false)
    }

    const cancelHandle = () => {
        setFeedbackView(false)
    }

    const gotoPath = (pathname) => {
        getHost().then((host) => {
            const url = `${location.protocol}//${host}/${pathname}`;
            top.location.href = url;
        });
    }

    const isThereAnyUnread = () => {
        Api.isUnRead({}).then(res => {
            setIsThreeAnyUnread(res.data)
        })
    }

    const onRightClick = (item, event) => {
        setClickHeaderKey(item);
        if (item == 'notice') {
            setNotificationView(true);
        } else if (item == 'help') {
            if (page == 'studio') {
                window.open(window.globalConfig?.document?.[doc]?.home)
            } else {
                const helpPath = window?.globalConfig?.document?.[doc];
                window.open(helpPath, "_blank");
            }
        } else if (item == 'feedback') {
            setFeedbackView(true);
        } else if (item == 'search') {
            setGlobalSearchVisible(true);
        }
    }

    const selectArea = ({ key }) => {
        window.location.href = `${key}/teamSpace`;
    }

    const onLeftClick = (item, data) => {
        setClickHeaderKey(item);
        if (item == 'console') {
            gotoPath('console');
        } else if (item == 'area' && data) {
            selectArea(data);
        }
    }

    const loadNavigation = useMemo(() => {
        return (
            <Navigation
                onRightClick={onRightClick}
                onLeftClick={onLeftClick}
            />
        )
    }, [])

    return (
        <>
            <Theme moduleKey="console">
                <Layout.Header>
                    {loadNavigation}
                </Layout.Header>
            </Theme>
            <Feedback
                visible={feedbackView}
                onOk={closeHandle}
                onCancel={cancelHandle}
            />
            <Notification
                notificationView={notificationView}
                onOk={() => setNotificationView(true)}
                onCancel={() => setNotificationView(false)}
                isThereAnyUnread={() => isThereAnyUnread()}
            />
        </>
    )
}

export default Header;