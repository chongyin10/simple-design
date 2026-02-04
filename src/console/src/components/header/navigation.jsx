import React, { useState, useRef, useEffect, useLayoutEffect, useMemo } from 'react';
import { Divider, Popover, Modal } from 'antd';
import { getHost } from './utils/center';
import User from './user/mutUser';
import Content from './content';
const { target } = require('../../../../config/rescriptsrc');
import { getRegionList } from './api/productResource';
import GlobalCls from './mobx/globalCls';
import useWorkSpace from './hooks/useWorkSpace';
import { isTraveler } from "../../utils/cookie";
import './navigation.less';

let curLogin = '';
let time = null;

const rightShowModuleMap = {
    notice: { title: '通知', icon: `/static/img/svg/notice.svg`, devIconPath: require('./assets/svg/notice.svg') },
    search: { title: '搜索', icon: `/static/img/svg/search.svg`, devIconPath: require('./assets/svg/search.svg') },
    help: { title: '帮助', icon: `/static/img/svg/help.svg`, devIconPath: require('./assets/svg/help.svg') },
    feedback: { title: '反馈', icon: `/static/img/svg/feedback.svg`, devIconPath: require('./assets/svg/feedback.svg') },
    customer: { title: '联系客服', icon: `/static/img/svg/customer.svg`, devIconPath: require('./assets/svg/customer.svg') },
    user: { title: '用户', icon: `/static/img/svg/user.svg`, devIconPath: require('./assets/svg/user.svg') }
}

const leftShowModuleMap = {
    console: { title: '工作台', icon: `/static/img/svg/console.svg`, devIconPath: require('./assets/svg/console.svg'), iconName: 'console', popover: false },
    team: { title: '', icon: `/static/img/svg/help.svg`, devIconPath: require('./assets/svg/help.svg'), iconName: 'help', beforeIon: '', popover: true },
    product: { title: '产品服务', icon: `/static/img/svg/product.svg`, devIconPath: require('./assets/svg/product.svg'), iconName: 'product', beforeIon: '', popover: true },
    area: { title: '', icon: `/static/img/svg/coordinate.svg`, devIconPath: require('./assets/svg/coordinate.svg'), iconName: 'coordinate', beforeIon: '', popover: true },
}

let loadNum = 0;

function Navigation({ onRightClick, onLeftClick }) {

    const themeRef = useRef();
    const workSpace = useWorkSpace();

    const [activeRegion, setActiveRegion] = useState({ key: 'area', label: '选择地域' });

    const { logoTitleStyle = {} } = window?.globalConfig?.theme[window?.globalConfig?.theme.enable];
    const title = window?.globalConfig?.defaultHeaderModule?.title;
    const leftShowModule = window?.globalConfig?.defaultHeaderModule?.leftShowModule || [];
    const rightShowModule = window?.globalConfig?.defaultHeaderModule?.rightShowModule || [];

    const [pluginsOpacityToop, setPluginsOpacityToop] = useState(false);

    useEffect(() => {
        !GlobalCls.region.id && getRegionListApi();
    }, []);

    useLayoutEffect(() => {
        const domHeaderTitle = document.getElementById(`idp-ref-area`);
        const domSearch = document.querySelector('.idp-header-uuid-0-search');
        if (domHeaderTitle) {
            domHeaderTitle.innerText = GlobalCls?.region?.label;
        }
        if (domSearch && !workSpace) {
            domSearch.style.display = 'none';
        }
    }, [GlobalCls.region])

    const loadRightCommon = (module, item) => {
        return (
            <Popover style={item == 'search' ? (workSpace ? {} : { display: 'none !important' }) : {}} className={`Navigation-popover idp-header-uuid-0-${item}`} content={item == 'customer' ? <img src={window.globalConfig?.CS?.QRCode} alt="" /> : null}>
                <div onClick={(e) => onRightClick(item, e)} className='Navigation-r-li' style={{ height: '100%' }}>
                    <div className='Navigation-r-svg' style={{ backgroundImage: `url(${process.env.NODE == 'dev' ? (module?.devIconPath?.default || module?.devIconPath) : module?.icon})` }}></div>
                    <div className='Navigation-r-title'>{module?.title}</div>
                </div>
                <div style={{ display: item == 'user' ? 'none' : 'block' }} className='Navigation-display-divider'>
                    <Divider className='Navigation-r-divider' type={"vertical"} />
                </div>
            </Popover>
        )
    }

    const filterRightComp = (item) => {
        const module = rightShowModuleMap[item];
        switch (item) {
            case 'user':
                return <User>
                    <div className='Navigation-r-svg' style={{ backgroundImage: `url(${process.env.NODE == 'dev' ? (module?.devIconPath?.default || module?.devIconPath) : module?.icon})` }}></div>
                </User>
            default:
                return loadRightCommon(module, item)
        }
    }

    const filterLeftComp = (item) => {
        const module = leftShowModuleMap[item];
        return loadLeftCommon(module, item)
    }

    const getHostApi = (pathname) => {
        getHost().then((host) => {
            const url = `${location.protocol}//${host}/${pathname}`;
            top.location.href = url;
        });
    }

    const goComputility = () => {
        if (!isTraveler()) {
            getHostApi('gallery/computility');
        } else {
            top.location.href = '/login'
        }
    }

    const modalInfo = () => {
        return Modal.info({
            title: '提示',
            maskClosable: true,
            onCancel: () => {
                getHostApi('console');
            },
            onOk: () => {
                getHostApi('console');
            },
            content: (
                <div>
                    <p>当前地域没有购买计算实例，请先去<a onClick={goComputility} style={{ color: '#1677ff' }}>算力市场</a>购买该地域的计算实例，或者在头部工具栏的地域选择中选择其他地域</p>
                </div>
            ),
        });
    }

    const getRegionListApi = () => {
        getRegionList().then(res => {
            const origin = window.location.origin;
            let region = activeRegion;
            const rlist = [];
            let infoTotal = 0;
            for (const area of res.data) {
                if (process.env.NODE == 'dev') {
                    if (target.indexOf(area.areaUrl) > -1) {
                        region = { key: area.areaUrl, label: area.areaCnName, id: area?.id };
                    } else {
                        area.areaUrl && area.areaCnName ? rlist.push({ key: area.areaUrl, label: area.areaCnName }) : infoTotal++;
                    }
                } else {
                    if (area.areaUrl === origin) {
                        region = { key: area.areaUrl, label: area.areaCnName, id: area?.id };
                    } else {
                        area.areaUrl && area.areaCnName ? rlist.push({ key: area.areaUrl, label: area.areaCnName }) : infoTotal++;
                    }
                }
            }
            // 此处逻辑：当infoTotal值和res.data总数值相等，则全部命中，触发modal框
            // infoTotal == res.data.length && modalInfo();
            setActiveRegion(region);
            GlobalCls.setRegion(region);
            GlobalCls.setRegionList(rlist);
        })
    }

    const loadLeftCommon = (module, item) => {
        return (
            <Popover
                overlayClassName='loadLeftCommon-popover'
                content={module.popover ? <Content onLeftClick={onLeftClick} name={item} /> : null}
                placement="bottom"
                // visible={true}
                getPopupContainer={() => themeRef.current}
            >
                <div onClick={() => !module.popover && onLeftClick(item)} className='Navigation-card' style={{ display: 'flex', padding: '0px 15px' }}>
                    <div className='Navigation-left-logo' style={{ backgroundImage: `url(${process.env.NODE == 'dev' ? require(`./assets/svg/${module?.iconName}.svg`).default : module?.icon})` }}></div>
                    <div className='Navigation-left-title'><span id={`idp-ref-${item}`} style={{ cursor: 'pointer' }}>{module.title}</span></div>
                </div>
            </Popover>
        )
    }

    const isCheckHeaderModule = (name) => {
        return leftShowModule.some(item => item == name);
    }

    const idpHtmlRender = () => {
        return <>
            <div style={{ cursor: 'pointer' }} className='Navigation-logo' onClick={() => window.location.href = '/'}></div>
            <div id="Navigation-theme-title" className='Navigation-title' style={{ ...logoTitleStyle }}>{title || ''}</div>
        </>
    }

    const loadIdp = () => {
        const isIdp = isCheckHeaderModule('idp');
        if (isIdp) {
            return (
                <Idp>
                    {idpHtmlRender()}
                </Idp>
            )
        } else {
            return idpHtmlRender();
        }
    }

    return (
        <React.Fragment>
            <div ref={themeRef} className='Navigation-theme'>
                <div className='Navigation-left-theme'>
                    <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
                        <div style={{ display: 'flex', alignItems: 'center', width: '140px', height: '100%' }}>
                            {loadIdp()}
                        </div>
                        {
                            leftShowModule.map(item => {
                                if (item == 'idp') return;
                                return <React.Fragment key={item}>{filterLeftComp(item)}</React.Fragment>
                            })
                        }
                    </div>
                </div>
                <div className='Navigation-right-theme' style={{ display: 'flex', justifyContent: 'end' }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        {
                            rightShowModule?.map((item, index) => {
                                return <React.Fragment key={index}>{filterRightComp(item)}</React.Fragment>
                            })
                        }
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Navigation;