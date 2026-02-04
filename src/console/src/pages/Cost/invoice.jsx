import React, { Component } from 'react';
import { Divider } from 'antd';

import './styles/invoice.less';
import intl from 'react-intl-universal';

function Invoice() {

    const tableHeight = window.document.documentElement.clientHeight - 450;

    return (
        <div className='invoice-main'>
            <div className='invoice-body'>
                <div className='invoice-title'>{intl.get('BILLING_APPLICATION')}</div>
                <Divider plain style={{ background: 'rgb(24, 144, 255)', opacity: 0.3 }}></Divider>
                <img style={{ width: '300px' }} src={window.globalConfig?.CS?.contactWith}></img>
                <div style={{ marginTop: '20px' }}>{intl.get('PLEASE_CONTACT_CUSTOMER_SERVICE')}</div>
            </div>
        </div>
    )
}

export default Invoice