import React, { useState, useRef, useEffect } from 'react';
import { Result, Button } from "antd";
import { useHistory } from "react-router";
import intl from 'react-intl-universal';
import './styles/success.less';
function Success() {
    const history = useHistory()
    const [id, setId] = useState(1)
    const getUrlParams = (name, str) => {
        const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`);
        const r = str.substr(1).match(reg);
        if (r != null) return decodeURIComponent(r[2]); return null;
    }

    const gotoPath = (path) => {
        history.push(path);
    }

    useEffect(() => {
        setId(getUrlParams('id', history.location.search))
    }, [])

    return (<>
        <div className='success-main'>
            <div className='success-body'>
                <div className='success-box'>
                    <Result
                        status="success"
                        title={id == 1 ? intl.get('RECHARGED_SUCCESSFULLY')+'!' : intl.get('PURCHASE_SUCCESSFULLY')+'!'}
                        extra={[
                            id == 1 ?
                                <Button type="primary" onClick={() => { gotoPath('/cost/recharges') }}>
                                    {intl.get('THE_RECHARGE_PAGE')}
                                </Button> : <Button type="primary" onClick={() => { gotoPath('/cost/indent') }} >
                                    {intl.get('GO_TO_ORDER_PAGE')}
                                </Button>
                        ]}
                    />
                </div>
            </div>
        </div>
    </>);
}

export default Success;