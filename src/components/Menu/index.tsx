import { createContext, Fragment, useState, useEffect } from 'react';
import './index.css';
import { MenuProps, ContextProps, MenuItemProps } from './types';
import Icon from '../Icon';
import Divider from '../Divider';

const Menu: React.FC<MenuProps> = ({ mode = 'vertical', items = [], className, style, menuItemStyle = {}, selectedKey: externalSelectedKey, collapsed = false, onChange }) => {
    const [internalSelectedKey, setInternalSelectedKey] = useState('');
    const [openKeys, setOpenKeys] = useState<string[]>([]);
    const [popupVisible, setPopupVisible] = useState(false);
    const [popupPosition, setPopupPosition] = useState({ left: 0, top: 0 });
    const [currentItem, setCurrentItem] = useState<MenuItemProps | null>(null);
    const [subPopupVisible, setSubPopupVisible] = useState(false);
    const [subPopupPosition, setSubPopupPosition] = useState({ left: 0, top: 0 });
    const [subCurrentItem, setSubCurrentItem] = useState<MenuItemProps | null>(null);
    const [popupAnimation, setPopupAnimation] = useState(false);
    const [subPopupAnimation, setSubPopupAnimation] = useState(false);

    // 使用外部传入的selectedKey或内部状态
    const selectedKey = externalSelectedKey !== undefined ? externalSelectedKey : internalSelectedKey;

    // 当selectedKey改变时，展开包含该key的所有父级菜单
    useEffect(() => {
        if (selectedKey) {
            const findParentKeys = (items: MenuItemProps[], targetKey: string, parents: string[] = []): string[] | null => {
                for (const item of items) {
                    if (item.key === targetKey) {
                        return parents;
                    }
                    if (item.childrens && item.childrens.length > 0) {
                        const result = findParentKeys(item.childrens, targetKey, [...parents, item.key]);
                        if (result) {
                            return result;
                        }
                    }
                }
                return null;
            };

            const parentKeys = findParentKeys(items, selectedKey);
            if (parentKeys) {
                setOpenKeys(prev => Array.from(new Set([...prev, ...parentKeys])));
            }
        }
    }, [selectedKey, items]);

    const defaultValue = {

    };

    const MenuContext: React.Context<ContextProps> = createContext(defaultValue);

    useEffect(() => {
        if (popupVisible) {
            const timer = setTimeout(() => setPopupAnimation(true), 10);
            return () => clearTimeout(timer);
        } else {
            setPopupAnimation(false);
        }
    }, [popupVisible]);

    useEffect(() => {
        if (subPopupVisible) {
            const timer = setTimeout(() => setSubPopupAnimation(true), 10);
            return () => clearTimeout(timer);
        } else {
            setSubPopupAnimation(false);
        }
    }, [subPopupVisible]);

    // 监听滚动和窗口大小变化事件，隐藏弹出框
    useEffect(() => {
        const handleInteraction = () => {
            if (popupVisible) {
                setPopupVisible(false);
                setSubPopupVisible(false);
            }
            if (subPopupVisible) {
                setSubPopupVisible(false);
            }
        };

        window.addEventListener('scroll', handleInteraction, true); // 使用捕获阶段
        window.addEventListener('resize', handleInteraction);

        return () => {
            window.removeEventListener('scroll', handleInteraction, true);
            window.removeEventListener('resize', handleInteraction);
        };
    }, [popupVisible, subPopupVisible]);

    // 处理点击外部区域关闭弹窗
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            // 检查点击是否在菜单组件和弹出层之外
            const menuElements = document.querySelectorAll('.idp-menu-item');
            const popupElements = document.querySelectorAll('.menu-popup, .sub-menu-popup');

            let isInsideMenu = false;
            let isInsidePopup = false;

            // 检查是否点击在菜单内部
            menuElements.forEach(menuEl => {
                if (menuEl.contains(event.target as Node)) {
                    isInsideMenu = true;
                }
            });

            // 检查是否点击在弹出层内部
            popupElements.forEach(popupEl => {
                if (popupEl.contains(event.target as Node)) {
                    isInsidePopup = true;
                }
            });

            // 如果点击在菜单和弹出层之外，则关闭弹出层
            if ((mode === 'horizontal' || mode === 'inline-flex' || mode === 'inline-block') &&
                (popupVisible || subPopupVisible) &&
                !isInsideMenu &&
                !isInsidePopup) {

                setPopupVisible(false);
                setSubPopupVisible(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [popupVisible, subPopupVisible, mode]);

    const toggleSubMenu = (key: string) => {
        setOpenKeys(prev => {
            if (prev.includes(key)) {
                return prev.filter(k => k !== key);
            } else {
                return [...prev, key];
            }
        });
    };

    function childrenItems(item: MenuItemProps) {
        return item.childrens?.map((children) => (
            <div key={children.key} className="vertical-menu-item">
                <div
                    style={{ ...menuItemStyle }}
                    className={`common-item vertical-menu-item-content ${selectedKey === children.key ? `menu-${mode}-selected` : ''}`}
                    data-title={children.label}
                    onClick={() => {
                        if (externalSelectedKey === undefined) {
                            setInternalSelectedKey(children.key);
                        }
                        if (onChange) {
                            onChange(children, children.key);
                        }
                        if (children.childrens && !collapsed) {
                            toggleSubMenu(children.key);
                        }
                    }}
                >
                    {children?.icon || <span style={{ width: '16px', height: '16px', display: 'inline-block' }}>{children.label.charAt(0)}</span>}
                    <span>{children.label}</span>
                    {children.childrens && !collapsed && (
                        <Icon
                            type={openKeys.includes(children.key) ? 'arrowUp' : 'arrowDown'}
                            size={16}
                            color="#666"
                            style={{ transition: 'transform 0.3s ease' }}
                            className='common-menu-item-icon'
                        />
                    )}
                </div>
                {children.childrens && (
                    <div className={`sub-menu-container ${openKeys.includes(children.key) ? 'open' : ''}`}>
                        {childrenItems(children)}
                    </div>
                )}
            </div>
        ))
    }

    function renderVertical() {
        return (
            <div className={`idp-menu-item vertical-menu ${collapsed ? 'collapsed' : ''}`}>
                {items.map((item) => (
                    <div key={item.key} className="vertical-menu-item">
                        <div
                            className={`common-item vertical-menu-item-content ${selectedKey === item.key ? `menu-${mode}-selected` : ''}`}
                            data-title={item.label}
                            onClick={() => {
                                if (externalSelectedKey === undefined) {
                                    setInternalSelectedKey(item.key);
                                }
                                if (onChange) {
                                    onChange(item, item.key);
                                }
                                if (item.childrens && !collapsed) {
                                    toggleSubMenu(item.key);
                                }
                            }}
                        >
                            {item?.icon || <span style={{ width: '16px', height: '16px', display: 'inline-block' }}>{item.label.charAt(0)}</span>}
                            <span>{item.label}</span>
                            {item.childrens && !collapsed && (
                                <Icon
                                    type={openKeys.includes(item.key) ? 'arrowUp' : 'arrowDown'}
                                    size={16}
                                    color="#666"
                                    style={{ transition: 'transform 0.3s ease' }}
                                    className='common-menu-item-icon'
                                />
                            )}
                        </div>
                        {item.childrens && (
                            <div className={`sub-menu-container ${openKeys.includes(item.key) ? 'open' : ''}`}>
                                {childrenItems(item)}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        )
    }

    const renderHorizontal = () => {
        return (
            <div className='idp-menu-item horizontal-menu' id="idp-horizontal">
                {
                    items.map(item => (
                        <div key={item.key} className="horizontal-menu-item">
                            <div
                                className={`common-item horizontal-menu-item-content ${selectedKey === item.key ? `menu-${mode}-selected` : ''}`}
                                onClick={(e) => {
                                    if (externalSelectedKey === undefined) {
                                        setInternalSelectedKey(item.key);
                                    }
                                    if (onChange) {
                                        onChange(item, item.key);
                                    }
                                    if (item.childrens) {
                                        // 检查是否点击的是当前已打开的菜单项，如果是则关闭弹窗
                                        if (popupVisible && currentItem?.key === item.key) {
                                            setPopupVisible(false);
                                            setSubPopupVisible(false);
                                        } else {
                                            const rect: any = e.currentTarget.getBoundingClientRect();
                                            let right: number = rect.right + 1;
                                            if (mode === 'horizontal') {
                                                const horizontalMenu = document.getElementById('idp-horizontal');
                                                const hrect = horizontalMenu?.getBoundingClientRect() ?? { right: 0, top: 0 };
                                                right = hrect.right + 62;
                                            }
                                            setPopupPosition({
                                                left: right,
                                                top: rect.top
                                            });
                                            setCurrentItem(item);
                                            setPopupVisible(true);
                                        }
                                    } else {
                                        setPopupVisible(false);
                                    }
                                }}
                            >
                                {item?.icon}
                                <span>{item.label}</span>
                                {item.childrens && (
                                    <Icon
                                        type={'arrowRight'}
                                        size={16}
                                        color="#666"
                                        style={{
                                            transform: popupVisible && currentItem?.key === item.key ? 'rotate(180deg)' : 'rotate(0deg)',
                                            transition: 'transform 0.3s ease'
                                        }}
                                        className="common-menu-item-icon"
                                    />
                                )}
                            </div>
                        </div>
                    ))
                }
            </div>
        )
    }

    const renderInlineBlock = () => {
        return (
            <div className='idp-menu-item inline-menu'>
                {
                    items.map((item, index) => {
                        return (
                            <Fragment key={item.key}>
                                <div
                                    onClick={(e) => {
                                        if (externalSelectedKey === undefined) {
                                            setInternalSelectedKey(item.key);
                                        }
                                        if (onChange) {
                                            onChange(item, item.key);
                                        }
                                        if (item.childrens) {
                                            // 检查是否点击的是当前已打开的菜单项，如果是则关闭弹窗
                                            if (popupVisible && currentItem?.key === item.key) {
                                                setPopupVisible(false);
                                                setSubPopupVisible(false);
                                            } else {
                                                const rect = e.currentTarget.getBoundingClientRect();
                                                setPopupPosition({
                                                    left: rect.left + rect.width / 2,
                                                    top: rect.bottom + 8
                                                });
                                                setCurrentItem(item);
                                                setPopupVisible(true);
                                            }
                                        } else {
                                            setPopupVisible(false);
                                        }
                                    }}
                                    className={`common-item inline-menu-item ${selectedKey === item.key ? 'menu-inline-selected' : ''}`}
                                >
                                    {item?.icon}
                                    <span>{item.label}</span>
                                    {item.childrens && (
                                        <Icon
                                            type={'arrowDown'}
                                            size={12}
                                            color={selectedKey === item.key ? '#339af0' : '#666'}
                                            style={{
                                                transform: popupVisible && currentItem?.key === item.key ? 'rotate(180deg)' : 'rotate(0deg)',
                                                transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), color 0.2s ease',
                                                marginLeft: '4px',
                                                opacity: 0.7
                                            }}
                                        />
                                    )}
                                </div>
                                {index < items.length - 1 && (
                                    <Divider color="#e1e1e1" orientation="vertical" style={{ height: '24px', margin: '0 4px', alignSelf: 'center' }}></Divider>
                                )}
                            </Fragment>
                        )
                    })
                }
            </div>
        )
    }

    const renderPopup = () => {
        if (!popupVisible || !currentItem || !currentItem.childrens) return null;

        // inline-block模式使用垂直菜单布局
        if (mode === 'inline-block') {
            return (
                <div
                    className={`menu-popup ${popupAnimation ? 'visible' : ''}`}
                    onMouseLeave={() => {
                        setPopupVisible(false);
                        setSubPopupVisible(false);
                    }}
                    style={{
                        position: 'fixed',
                        left: popupPosition.left,
                        top: popupPosition.top,
                        transform: 'translateX(-50%)',
                        backgroundColor: 'white',
                        border: '1px solid #e1e1e1',
                        borderRadius: '8px',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                        padding: '8px 0',
                        minWidth: '200px',
                        zIndex: 1000
                    }}
                >
                    <div className="vertical-menu">
                        {currentItem.childrens.map(child => (
                            <div key={child.key} className="vertical-menu-item">
                                <div
                                    className={`vertical-menu-item-content ${selectedKey === child.key ? 'menu-vertical-selected' : ''}`}
                                    onClick={() => {
                                        if (child.childrens && child.childrens.length > 0) {
                                            // 有子菜单时切换展开状态
                                            toggleSubMenu(child.key);
                                        } else {
                                            // 没有子菜单时选中并关闭弹出层
                                            if (externalSelectedKey === undefined) {
                                                setInternalSelectedKey(child.key);
                                            }
                                            if (onChange) {
                                                onChange(child, child.key);
                                            }
                                            setPopupVisible(false);
                                            setSubPopupVisible(false);
                                        }
                                    }}
                                >
                                    {child?.icon}
                                    <span>{child.label}</span>
                                    {child.childrens && child.childrens.length > 0 && (
                                        <Icon
                                            type={openKeys.includes(child.key) ? 'arrowUp' : 'arrowDown'}
                                            size={12}
                                            color="#666"
                                            style={{ transition: 'transform 0.3s ease' }}
                                        />
                                    )}
                                </div>
                                {child.childrens && child.childrens.length > 0 && (
                                    <div className={`sub-menu-container ${openKeys.includes(child.key) ? 'open' : ''}`}>
                                        {child.childrens.map(subChild => (
                                            <div key={subChild.key} className="vertical-menu-item">
                                                <div
                                                    className={`vertical-menu-item-content ${selectedKey === subChild.key ? 'menu-vertical-selected' : ''}`}
                                                    onClick={() => {
                                                        if (externalSelectedKey === undefined) {
                                                            setInternalSelectedKey(subChild.key);
                                                        }
                                                        if (onChange) {
                                                            onChange(subChild, subChild.key);
                                                        }
                                                        setPopupVisible(false);
                                                        setSubPopupVisible(false);
                                                    }}
                                                >
                                                    {subChild?.icon}
                                                    <span>{subChild.label}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            );
        }

        // horizontal和inline-flex模式使用水平弹出菜单布局
        return (
            <div
                className={`menu-popup ${popupAnimation ? 'visible' : ''}`}
                onMouseLeave={() => {
                    if (mode === 'inline-flex' || mode === 'horizontal') {
                        setPopupVisible(false);
                        setSubPopupVisible(false);
                    }
                }}
                style={{
                    position: 'fixed',
                    left: popupPosition.left,
                    top: popupPosition.top,
                    transform: 'translateX(-50%)',
                    backgroundColor: 'white',
                    border: '1px solid #e1e1e1',
                    borderRadius: '8px',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                    padding: '8px 0',
                    minWidth: '120px',
                    zIndex: 1000
                }}
            >
                {currentItem.childrens.map(child => (
                    <div
                        key={child.key}
                        className={`common-item popup-menu-item popup-menu-item-content ${selectedKey === child.key ? 'menu-inline-selected' : ''} ${child.childrens && child.childrens.length > 0 ? 'has-children' : ''} ${subCurrentItem?.key === child.key && subPopupVisible ? 'sub-menu-active' : ''}`}
                        onClick={() => {
                            if (externalSelectedKey === undefined) {
                                setInternalSelectedKey(child.key);
                            }
                            if (onChange) {
                                onChange(child, child.key);
                            }
                            setPopupVisible(false);
                            setSubPopupVisible(false);
                        }}
                        onMouseEnter={(e) => {
                            if (child.childrens && child.childrens.length > 0) {
                                const rect = e.currentTarget.getBoundingClientRect();
                                setSubPopupPosition({
                                    left: rect.right + 1,
                                    top: rect.top
                                });
                                setSubCurrentItem(child);
                                setSubPopupVisible(true);
                            } else {
                                setSubPopupVisible(false);
                            }
                        }}
                        style={{
                            padding: '8px 16px',
                            cursor: 'pointer',
                            transition: 'background-color 0.2s ease',
                            color: selectedKey === child.key ? '#339af0' : '#333',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            {child?.icon}
                            <span>{child.label}</span>
                        </div>
                        {child.childrens && child.childrens.length > 0 && (
                            <Icon
                                type="arrowRight"
                                size={12}
                                color="#666"
                                className="common-menu-item-icon"
                            />
                        )}
                    </div>
                ))}
            </div>
        );
    };

    const renderSubPopup = () => {
        if (!subPopupVisible || !subCurrentItem || !subCurrentItem.childrens) return null;

        return (
            <div
                className={`menu-popup ${subPopupAnimation ? 'visible' : ''}`}
                onMouseLeave={() => {
                    if (mode === 'inline-flex') {
                        setSubPopupVisible(false);
                    }
                }}
                style={{
                    position: 'fixed',
                    left: subPopupPosition.left,
                    top: subPopupPosition.top,
                    backgroundColor: 'white',
                    border: '1px solid #e1e1e1',
                    borderRadius: '8px',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                    padding: '8px 0',
                    minWidth: '120px',
                    zIndex: 1001
                }}
            >
                {subCurrentItem.childrens.map(child => (
                    <div
                        key={child.key}
                        className="popup-menu-item"
                        onClick={() => {
                            if (externalSelectedKey === undefined) {
                                setInternalSelectedKey(child.key);
                            }
                            setPopupVisible(false);
                            setSubPopupVisible(false);
                        }}
                        style={{
                            padding: '8px 16px',
                            cursor: 'pointer',
                            transition: 'background-color 0.2s ease',
                            color: selectedKey === child.key ? '#339af0' : '#333'
                        }}
                    >
                        {child?.icon}
                        <span>{child.label}</span>
                    </div>
                ))}
            </div>
        );
    };

    const modeMap = {
        'horizontal': renderHorizontal,
        'vertical': renderVertical,
        'inline-flex': renderInlineBlock,
        'inline-block': renderInlineBlock
    };

    return (
        <MenuContext.Provider value={defaultValue}>
            <div className={`idp-menu ${className || ''}`} style={style}>
                {modeMap[mode]()}
                {renderPopup()}
                {renderSubPopup()}
                {(popupVisible || subPopupVisible) && (
                    <div
                        onClick={() => {
                            setPopupVisible(false);
                            setSubPopupVisible(false);
                        }}
                    />
                )}
            </div>
        </MenuContext.Provider>
    )
}

export default Menu;