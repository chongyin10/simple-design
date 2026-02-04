import React, { useEffect, useState } from 'react';
import Info from './components/revenue/info';
import Month from './components/revenue/month';
import { Tabs } from 'antd';
import useUrlState from '@ahooksjs/use-url-state';
import intl from 'react-intl-universal';

import './styles/revenue.less';

function Revenue() {

    const [defaultActiveKey, setDefaultActiveKey] = useState('month');
    const [state, setState] = useUrlState({});
    const [data, setData] = useState([]);

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
        <div className='revenue-main'>
            <div className='revenue-body'>
                <Tabs onChange={onChange} activeKey={defaultActiveKey}>
            <Tabs.TabPane tab={intl.get('TEAM_COST_REVENUE_OVERVIEW')} key="month">
                        <Month />
                    </Tabs.TabPane>
            <Tabs.TabPane tab={intl.get('TEAM_COST_REVENUE_DETAIL')} key="info">
                        <Info />
                    </Tabs.TabPane>
                </Tabs>
            </div>
        </div>
    )
}

export default Revenue