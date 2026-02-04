import { Modal } from 'antd';
import { useMemo } from 'react';
import { lastVisitApp } from './api/areaApi';
import GlobalCls from './mobx/globalCls';

import './content.less';

function Content({ name, onLeftClick }) {
    return useMemo(() => {
        if (name == 'product') return <ProductContent />;
        if (name == 'area') return <Region name={name} onLeftClick={onLeftClick} />;
        return null;
    }, []);

}

/**
 * 产品服务Content
 * @returns 
 */
const ProductContent = () => {

    const appList = [
        {
            key: 'idp-lm',
            id: 10200,
            name: 'IDP LM',
            desc: '零代码大模型训推平台',
            path: '/lm/dataset',
        },
        {
            key: 'idp-studio',
            id: 10100,
            name: 'IDP Studio',
            desc: '面向专业团队的 AI 开发平台',
            path: '/teamSpace',
        },
        {
            key: 'ai-gallery',
            id: 10400,
            name: 'AI Gallery',
            desc: '模型\\模型服务\\算力市场',
            url: '/gallery',
        }
    ];

    const selectApp = ({ item, key }) => {
        const apps = appList.filter((item) => item.key === key);
        if (apps.length === 0) return;
        const app = apps[0];
        if (app.url) {
            window.location.href = app.url;
        } else {
            lastVisitApp(app.id).then((res) => {
                window.location.href = `${res.data.areaUrl}${app.path}`;
            }).catch((err) => {
                console.log(err);
                Modal.warning({
                    // content: <>使用 {`${app.name}`} 前请先<a href='/engine'>购买</a>资源</>
                    content: <>{`${app.name}`} 应用未就绪</>
                });
            });
        }
    }

    return (
        <div className='ProductContent-root'>
            {
                appList.map((item, index) => {
                    return (
                        <div key={index} onClick={() => selectApp(item)} className='ProductContent-title idp-content-title'>
                            <div className='ProductContent-name'>{item.name}</div>
                            <div className='ProductContent-desc'>{item.desc}</div>
                        </div>
                    )
                })
            }
        </div>
    )
}

const Region = ({ onLeftClick, name }) => {
    const regionList = GlobalCls.regionList;
    return (
        <div>
            {
                regionList?.map((item, index) => {
                    return (
                        <div onClick={() => onLeftClick(name, item)} key={index} className='Region-title idp-content-color'>
                            <div className='Region-name'>{item.label}</div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Content;