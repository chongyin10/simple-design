import React, { useEffect, useMemo, useState, Drawer } from 'react';
import { Card, Radio, Checkbox, Button, Pagination, Input, Modal } from 'antd';
import merchandiseApi from '../../services/merchandise.js';
import shopCartApi from '../../services/shopCartApi.js'
import userInfoApi from '../../serviceApi/userInfoApi.js';
import './style/Payment.less'
import intl from 'react-intl-universal';

const CheckboxGroup = Checkbox.Group;
function Payment({ onChildrenDrawerOpen, typeValue, open, childrenDrawer, threeDrawer }) {
    const [pageTotal, setPageTotal] = useState(0);
    const [pageIndex, setPageIndex] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [chargeTypevalue, setChargeTypevalue] = useState('Daily')
    const [regionvalue, setRegionvalue] = useState('')
    const [gpuCountList, setGpuCountList] = useState([])
    const [gpuCountValue, setGpuCountValue] = useState('')
    const [dataList, setDataList] = useState([])
    const [labelList, setLabelList] = useState([])
    const [labelIndeterminate, setLabelIndeterminate] = useState(true);
    const [checkedLabelList, setCheckedLabelList] = useState([]);
    const [checkLabelAll, setLabelCheckAll] = useState(false);
    const [gpuModelList, setGpuModelList] = useState([])
    const [gpuModelIndeterminate, setGpuModelIndeterminate] = useState(true);
    const [checkedGpuModelList, setCheckedGpuModelList] = useState([]);
    const [checkGpuModelAll, setCheckGpuModelAll] = useState(false);
    const [storelList, setStorelList] = useState(['NFS', 'Longhorn', '专用存储'])
    const [storeIndeterminate, setStoreIndeterminate] = useState(true);
    const [checkedStoreList, setCheckedStoreList] = useState([]);
    const [checkStoreAll, setCheckStoreAll] = useState(false);
    const [areaList, setAreaList] = useState([])

    // 是否实名认证 判断是否需要购买
    const [purchaseQualify, setPurchaseQualify] = useState(false)



    useEffect(() => {
        getUserInfoAgain()
    }, [])

    const getUserInfoAgain = () => {
        userInfoApi.getUserInfo().then((res) => {
            if (res.data) {
                const { username } = res.data
                isOpenAuthentification(username)
            }
        })
    }

    const isOpenAuthentification = (username) => {
        shopCartApi.isOpenAuthentification()
            .then(res => {
                const { realname } = res?.data?.config
                console.log(res, realname, 'res')
                if(realname==='on'){
                    isAuthentification(username)
                }else{
                    setPurchaseQualify(true)
                }
            })
    }

    const isAuthentification = (username) => {
        shopCartApi.isAuthentication(username)
            .then(res => {
                console.log(res, 'res')
                if(res.data.authCode != 2 && res.data.authCode != 5){
                    setPurchaseQualify(true)
                }else{
                    setPurchaseQualify(false)
                }
            })
            .catch(err => console.log(err))
    }

    const info = () => {
        Modal.info({
            title: <>{intl.get('PURCHASE_NEED_REAL_NAME_AUTHENTICATION')}，{intl.get('PLEASE_GOTO')}<Button type='link' onClick={() => window.location.href = '/console/overview'}>{intl.get('WORKBENCH')}</Button>{intl.get('ACCOUNT_CARD_CLICK_UNAUTHENTICATION_GO_TO_AUTHENTICATION')}</>,
            onOk() {},
        });
    };
    const onChange = (e, name) => {
        setPageIndex(1)
        setPageSize(10)
        switch (name) {
            case 'chargeTypevalue':
                setChargeTypevalue(e.target.value)
                break
            case 'regionvalue':
                setGpuCountValue('')
                setCheckedGpuModelList([])
                setRegionvalue(e.target.value)
                if (typeValue === 'instance') {
                    getInventoryType('gpuModel', e.target.value)
                    getInventoryType('gpuCount', e.target.value)
                }
                break
            case 'gpuCountValue':
                setGpuCountValue(e.target.value)
                break
            default:
                break;
        }
    }

    //获取标签/适用模型列表
    const getLableList = () => {
        merchandiseApi.getLableList('label').then(res => {
            const data = res.data.map(item => item.name)
            setLabelList(data)
        }).catch(err => {
            console.error(err);
        })
    }

    const onLabelChange = (list) => {
        setCheckedLabelList(list);
        setLabelIndeterminate(!!list.length && list.length < labelList.length);
        setLabelCheckAll(list.length === labelList.length);
    }

    const onCheckAllChangeLabel = (e) => {
        setCheckedLabelList(e.target.checked ? labelList : []);
        setLabelIndeterminate(false);
        setLabelCheckAll(e.target.checked);
    }

    //获取地域
    const getArea = () => {
        merchandiseApi.getArea().then(res => {
            if (res.data.length > 0) {
                setAreaList(res.data)
                setRegionvalue(res.data[0].id)
                if (typeValue === 'instance') {
                    getInventoryType('gpuModel', res.data[0].id)
                    getInventoryType('gpuCount', res.data[0].id)
                }
            }
        }).catch(err => {
            console.error(err);
        })
    }

    //获取gpu型号和数量类型
    const getInventoryType = (type, areaId) => {
        merchandiseApi.getInventoryType(type, areaId).then(res => {
            switch (type) {
                case "gpuCount":
                    if (res.data.length > 0) {
                        setGpuCountList(['', ...res.data])
                    } else {
                        setGpuCountList([''])
                    }
                    break;
                case "gpuModel":
                    setGpuModelList(res.data)
                    break;
                default:
            }
        }).catch(err => {
            console.error(err);
        })
    }

    const onGpuModelChange = (list) => {
        setCheckedGpuModelList(list);
        setGpuModelIndeterminate(!!list.length && list.length < gpuModelList.length);
        setCheckGpuModelAll(list.length === gpuModelList.length);
    }

    const onCheckAllChangeGpuModel = (e) => {
        setCheckedGpuModelList(e.target.checked ? gpuModelList : []);
        setGpuModelIndeterminate(false);
        setCheckGpuModelAll(e.target.checked);
    }

    const onStoreChange = (list) => {
        setCheckedStoreList(list);
        setStoreIndeterminate(!!list.length && list.length < storelList.length);
        setCheckStoreAll(list.length === storelList.length);
    }

    const onCheckAllChangeStore = (e) => {
        setCheckedStoreList(e.target.checked ? storelList : []);
        setStoreIndeterminate(false);
        setCheckStoreAll(e.target.checked);
    }

    const gotoBuy = (record) => {
        onChildrenDrawerOpen({ ...record, typeValue })
    }

    //获取接口列表
    const getList = (page = pageIndex, pSize = pageSize) => {
        let gpuModelValue = ''
        if (checkedGpuModelList) {
            gpuModelValue = checkedGpuModelList.join(',')
        }
        let storageType = ''
        if (checkedStoreList) {
            storageType = checkedStoreList.join(',')
        }
        let params = {
            pageIndex: page,
            pageSize: pSize,
            type: typeValue,
            chargeType: chargeTypevalue,
            regionId: regionvalue,
            gpuCount: gpuCountValue,
            labels: checkedLabelList,
            gpuModel: gpuModelValue,
            storageType
        }
        merchandiseApi.getPageList(params).then(res => {
            setDataList(res.data.records || [])
            setPageTotal(res.data.total)
        }).catch(err => console.error(err))
    }

    const footer = (item) => {
        const symbol = item.priceUnit === 'dollar' ? '$' : '¥';
        const unit = item.priceUnit === 'dollar' ? '美元' : '元';
        const chargeType = { Dynamic: intl.get('HOUR'), Month: intl.get('MOUNTH'), Daily: intl.get('DAY') }[item.chargeType];
        return (
            <div className="item-footer">
                <div className="actual-price">
                    <span className='rmb'>{symbol}</span>
                    <span className='num'>{item.actualPrice}{unit}</span>
                    <span className='unit'>/{chargeType}</span>
                </div>
                <div className="base-price">
                    <span className='rmb'>{symbol}</span>
                    <span className='num'>{item.basisPrice}{unit}</span>
                    <span className='unit'>/{chargeType}</span>
                </div>
                <div className="discount">{culatingDiscount(item.discountCoefficient)}</div>
                <Button type="primary" onClick={() => {
                    if (purchaseQualify) {
                        gotoBuy(item)
                    } else {
                        info()
                    }
                }} disabled={item.inventory <= 0}>
                    {intl.get('GO_AND_BUY')}
                </Button>
            </div>
        );
    }

    const calculateinstanceList = () => (
        <div className="list-content">
            {
                dataList.map(item => (
                    <div className="list-item" key={item.id}>
                        <div className="item-header">
                            <div className="left">{item.name}</div>
                            <div className="right"><span className='item-label'> {intl.get('ALL_STOCK')}/{intl.get('AVIALABLE_STOCK')}：</span>{item.totalInventory + '/' + item.inventory}</div>
                        </div>
                        <div className="item-content">
                            {
                                item.gpuCount == 0 ? null : <div className="title">{item.gpuVendor} &nbsp; {item.gpuModel + '/' + item.gpuMemory}</div>
                            }
                            <div className="flex-p">
                                <p className='p-30'><span className='item-label'> {intl.get('ALL_STOCK')}</span>{item.gpuCount}</p>
                                <p className='p-30'><span className='item-label'> {intl.get('GPU_DRIVE')}</span>{item.gpuDriver}</p>
                                <p className='p-30'><span className='item-label'> {intl.get('GPU_DRIVE')}/{intl.get('CORE_NUMBER')}</span>{item.cpuModel + '/' + item.cpuCore}</p>
                            </div>
                            <div className="flex-p">
                                <p className='p-30'><span className='item-label'> {intl.get('HARD_DISK')}</span>{item.storage}GB</p>
                                <p className='p-30'><span className='item-label'> {intl.get('MEMORY')}</span>{item.memory}GB</p>
                                <p className='p-30'><span className='item-label'> {intl.get('MODEL_PARAMETER_MAGNITUDE')}</span>{item.parameterMagnitude ? item.parameterMagnitude + 'B' : ''}</p>
                            </div>
                            <div className="flex-p">
                                <p className='p-30'><span className='item-label'> {intl.get('CUDN_VERSION')}</span>{item.cudaVersion}</p>
                                <p className='p-30'><span className='item-label'> {intl.get('OPERATION_SYSTEM')}</span>{item.os}</p>
                            </div>
                            <div>
                                <p><span className='item-label'> {intl.get('FIT_MODEL')}</span>{item.applicableModel || ''}</p>
                            </div>
                            <div className='describe'>
                                <p><span className='item-label'> {intl.get('DESCRIPTION')}</span>{item.description}</p>
                            </div>
                        </div>
                        {footer(item)}
                    </div>
                ))
            }
        </div>
    )

    const storeList = () => (
        <div className="list-content">
            {
                dataList.map(item => (
                    <div className="list-item" key={item.id}>
                        <div className="item-header">
                            <div className="left">{item.name}</div>
                        </div>
                        <div className="item-content">
                            <div className="flex-p" style={{ padding: "10px 0", }}>
                                <p><span className='item-label'> {intl.get('FORM_OF_MEASUREMENT_P')}</span>{item.meterageMode}GB</p>
                                <p><span className='item-label'> {intl.get('STORAGE_CLASS')}</span>{item.storageType}</p>
                            </div>
                            <div className='describe'>
                                <p><span className='item-label'> {intl.get('DESCRIPTION')}</span>{item.description}</p>
                            </div>
                        </div>
                        <div className="item-footer">
                            <div className="actual-price">
                                <span className='rmb'>¥</span>
                                <span className='num'>{item.actualPrice}</span>
                                <span className='unit'>/{{ Dynamic: intl.get('HOUR'), Month: intl.get('MOUNTH'), Daily: intl.get('DAY') }[item.chargeType]}</span>
                            </div>
                            <div className="base-price">
                                <span className='rmb'>¥</span>
                                <span className='num'>{item.basisPrice}</span>
                                <span className='unit'>/{{ Dynamic: intl.get('HOUR'), Month: intl.get('MOUNTH'), Daily: intl.get('DAY') }[item.chargeType]}</span>
                            </div>
                            <div className="discount">{culatingDiscount(item.discountCoefficient)}</div>
                            <Button type="primary" onClick={() => { 
                                if(purchaseQualify){
                                    gotoBuy(item) 
                                }else{
                                    info()
                                } }} >
                                {intl.get('GO_AND_BUY')}
                            </Button>
                        </div>
                    </div>
                ))
            }
        </div>
    )

    const culatingDiscount = (discountCoefficient) => {
        let num = discountCoefficient * 1000 / 100
        return num < 10 ? (num + intl.get('DISCOUNT')) : intl.get('ORIGINAL_PRICE')
    }

    const onPageChange = (page, pageSize) => {
        setPageIndex(page)
        setPageSize(pageSize)
        getList(page, pageSize)
    };

    useMemo(() => {
        getList()
    }, [typeValue, chargeTypevalue, checkedLabelList, regionvalue, gpuCountValue, checkedGpuModelList, checkedStoreList])

    useEffect(() => {
        if (open) {
            getArea()
            setChargeTypevalue('Daily')
            setRegionvalue('')
            setGpuCountValue('')
            setCheckedLabelList([])
            setCheckedGpuModelList([])
            setCheckedStoreList([])
            setPageIndex(1)
            setPageSize(10)
        }
    }, [open])

    useEffect(() => {
        if (!childrenDrawer || !threeDrawer) {
            getList()
        }
    }, [childrenDrawer, threeDrawer])

    useEffect(() => {
        getArea()
        getLableList()
    }, [])
    return (
        <div>
            <div className="payment-content">
                <div className="filter">
                    <div className="list-filter">
                        <div className="filter-item">
                            <span className='filter-label'>{intl.get('PRODUCT_TYPE')}:</span>
                            <Input style={{ width: '120px' }} disabled={true} defaultValue={typeValue === 'instance' ? intl.get('CALCULATION_EXAMPLE') : intl.get('STORAGE')} />
                        </div>
                        <div className="filter-item">
                            <span className='filter-label'>{intl.get('BILLING_MODEL')}:</span>
                            <Radio.Group onChange={(e) => { onChange(e, 'chargeTypevalue') }} value={chargeTypevalue} buttonStyle="solid">
                                <Radio.Button value="Daily">{intl.get('AT_DAY')}</Radio.Button>
                                <Radio.Button value="Month">{intl.get('AT_MONTH')}</Radio.Button>
                                <Radio.Button value="Dynamic">{intl.get('BY_VOLUME')}</Radio.Button>
                            </Radio.Group>
                        </div>
                        <>
                            {
                                typeValue === 'instance' ? <div className="filter-item">
                                    <span className='filter-label'>{intl.get('TABS')}:</span>
                                    <Checkbox indeterminate={labelIndeterminate} onChange={onCheckAllChangeLabel} checked={checkLabelAll}>
                                        {intl.get('ALL')}
                                    </Checkbox>
                                    <CheckboxGroup options={labelList} value={checkedLabelList} onChange={onLabelChange} />
                                </div> : null
                            }
                        </>
                        <div className="filter-item">
                            <span className='filter-label'>{intl.get('REGION_SELECT')}:</span>
                            <Radio.Group onChange={(e) => { onChange(e, 'regionvalue') }} value={regionvalue} buttonStyle="solid">
                                {
                                    areaList.map(item => (
                                        <Radio.Button key={item.id} value={item.id}>{item.areaCnName}</Radio.Button>
                                    ))
                                }
                            </Radio.Group>
                        </div>
                        <>
                            {
                                typeValue === 'instance' ? <>
                                    <div className="filter-item">
                                        <span className='filter-label'>GPU{intl.get('TYPE')}:</span>
                                        <Checkbox indeterminate={gpuModelIndeterminate} onChange={onCheckAllChangeGpuModel} checked={checkGpuModelAll}>
                                            {intl.get('ALL')}
                                        </Checkbox>
                                        <CheckboxGroup options={gpuModelList} value={checkedGpuModelList} onChange={onGpuModelChange} />
                                    </div>

                                    <div className="filter-item">
                                        <span className='filter-label'>GPU{intl.get('TEAM_COST_ORDER_COUNT')}:</span>
                                        <Radio.Group onChange={(e) => { onChange(e, 'gpuCountValue') }} value={gpuCountValue} buttonStyle="solid">
                                            {
                                                gpuCountList.map(item => (
                                                    <Radio.Button key={item} value={item}>{item === '' ? intl.get('ALL') : item}</Radio.Button>
                                                ))
                                            }
                                        </Radio.Group>
                                    </div>
                                </> : <div className="filter-item">
                                    <span className='filter-label'>{intl.get('STORAGE_TYPE')}:</span>
                                    <Checkbox indeterminate={storeIndeterminate} onChange={onCheckAllChangeStore} checked={checkStoreAll}>
                                    {intl.get('ALL')}
                                    </Checkbox>
                                    <CheckboxGroup options={storelList} value={checkedStoreList} onChange={onStoreChange} />
                                </div>

                            }
                        </>
                    </div>
                </div>
                {
                    typeValue === 'storage' ? storeList() : calculateinstanceList()
                }
                <div style={{ marginTop: "10px", textAlign: "right" }}>
                    <Pagination
                        current={pageIndex}
                        pageSize={pageSize}
                        showSizeChanger
                        onChange={onPageChange}
                        total={pageTotal}
                    />
                </div>

            </div >
        </div>
    );
}

export default Payment;