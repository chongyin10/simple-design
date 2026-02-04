import React, { useCallback, useRef } from 'react';
import { StyleProvider, legacyLogicalPropertiesTransformer } from '@ant-design/cssinjs';
import ErrorBoundary from './ErrorBoundary';
import { CloseOutlined } from '@ant-design/icons';

function StyleGeneral({ children }) {

    const ref = useRef();

    const getBrowserEngineVersion = () => {
        const engine = {
            'Edge': /Edge\/([\d.]+)/,
            'Chrome': /Chrome\/([\d.]+)/,
            'Firefox': /Firefox\/([\d.]+)/,
            'Safari': /Version\/([\d.]+).*Safari/,
            'IE': /Trident\/.*rv:([\d.]+)/
        };
        for (let key in engine) {
            if (navigator.userAgent.indexOf(key) !== -1) {
                let version = navigator.userAgent.match(engine[key]);
                if (version) {
                    return {
                        name: key,
                        version: version[1]
                    };
                }
            }
        }
        return { name: 'unknown', version: '0.0.0' };
    }

    const onClose = () => {
        ref.current.style.display = 'none';
    }

    const loadStyleGeneral = useCallback(() => {
        const browserEngineVersion = getBrowserEngineVersion();
        if (browserEngineVersion?.name == 'Chrome' && browserEngineVersion?.version && browserEngineVersion?.version?.split('.')[0] < 100) {
            return <StyleProvider transformers={[legacyLogicalPropertiesTransformer]} hashPriority="high">
                <div
                    ref={ref}
                    style={{
                        textAlign: 'center',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        fontSize: '13px',
                        background: '#fffbe6',
                        border: '1px solid #ffe58f',
                        height: '30px'
                    }}
                >
                    您当前的浏览器版本过低，部分功能可能无法正常使用，请升级浏览器到最新版本
                    <div onClick={onClose} style={{ position: 'absolute', right: '10px', cursor: 'pointer' }}><CloseOutlined /></div>
                </div>
                <ErrorBoundary>
                    {children}
                </ErrorBoundary>
            </StyleProvider>
        }
        return children
    }, [])

    return (
        <>
            {loadStyleGeneral()}
        </>
    )
}

export default StyleGeneral