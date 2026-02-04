import React, { useEffect, useState } from 'react';
import Info from './components/bill/info';
import Month from './components/bill/month';
import { Tabs } from 'antd';
import useUrlState from '@ahooksjs/use-url-state';
import intl from 'react-intl-universal';

import './styles/bill.less';

function Bill() {

    const [defaultActiveKey, setDefaultActiveKey] = useState('month');
    const [state, setState] = useUrlState({});

    useEffect(() => {
        let type = new URLSearchParams(window.location.search).get('type');
        if (type === 'info') {
            setDefaultActiveKey('info')
        } else {
            setDefaultActiveKey('month')
        }
    }, []);

    const onChange = (value) => {
        setState({ type: undefined });
        setDefaultActiveKey(value);
    }

    return (
        <div className='bill-main'>
            <div className='bill-body'>
                <Tabs onChange={onChange} activeKey={defaultActiveKey}>
            <Tabs.TabPane tab={intl.get('TEAM_COST_BILL_OVERVIEW')} key="month">
                        <Month />
                    </Tabs.TabPane>
            <Tabs.TabPane tab={intl.get('TEAM_COST_BILL_DETAIL')} key="info">
                        <Info />
                    </Tabs.TabPane>
                </Tabs>
            </div>
        </div>
    )
}

export default Bill