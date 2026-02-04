import React, { useState, useRef, useEffect } from 'react';
import { Result, Button } from "antd";
import { useHistory } from "react-router";
import './styles/success.less';
import intl from 'react-intl-universal';
function Fail() {
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
                <Result
                    status="error"
                    title={id == 1 ? intl.get("RECHARGE_FAILURE")+'!' : intl.get("PURCHASE_FAILURE")+'!'}
                    extra={[
                        id == 1 ?
                            <Button type="primary" onClick={() => { gotoPath('/cost/recharges') }}>
                                {intl.get("THE_RECHARGE_PAGE")}
                            </Button> : <Button type="primary" onClick={() => { gotoPath('/cost/indent') }} >
                                {intl.get("GO_TO_ORDER_PAGE")}
                            </Button>
                    ]}
                >
                </Result>
            </div>
        </div>
    </>);
}

export default Fail;