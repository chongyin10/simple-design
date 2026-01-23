import React, { useEffect, useMemo, useRef, useState } from 'react';
import classNames from 'classnames';
import Icon from '../Icon';
import { TabItem, TabsProps } from './types';
import './Tabs.css';

const Tabs: React.FC<TabsProps> = ({
  items = [],
  activeKey,
  defaultActiveKey,
  onChange,
  onClose,
  tabsClosable = false,
  tabPlacement = 'top',
  className,
  style,
  contentStyle
}) => {
  const [innerActiveKey, setInnerActiveKey] = useState<string | undefined>(() => defaultActiveKey);
  const tabsNavRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<Map<string, HTMLDivElement>>(new Map());
  const [indicatorStyle, setIndicatorStyle] = useState<React.CSSProperties>({});
  const [showScrollButtons, setShowScrollButtons] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const isScrollingRef = useRef(false);
  const isFirstUpdateRef = useRef(true);

  useEffect(() => {
    if (activeKey !== undefined) {
      setInnerActiveKey(activeKey);
    }
  }, [activeKey]);

  useEffect(() => {
    if (activeKey !== undefined) return;

    const firstKey = items[0]?.key;
    const hasDefault = defaultActiveKey ? items.some(item => item.key === defaultActiveKey) : false;

    if (hasDefault && !innerActiveKey) {
      setInnerActiveKey(defaultActiveKey);
      return;
    }

    if (!firstKey) {
      setInnerActiveKey(undefined);
      return;
    }

    const exists = items.some(item => item.key === innerActiveKey);
    if (!exists) {
      setInnerActiveKey(firstKey);
    }
  }, [items, innerActiveKey, activeKey, defaultActiveKey]);

  const currentActiveKey = activeKey !== undefined ? activeKey : innerActiveKey;

  const activeItem = useMemo(() => {
    return items.find(item => item.key === currentActiveKey) || items[0];
  }, [items, currentActiveKey]);

  const updateIndicatorWithKey = (key: string, animate = true) => {
    if (!key || !tabsNavRef.current) return;

    const activeTab = tabRefs.current.get(key);
    const container = tabsNavRef.current;

    if (activeTab && container) {
      const indicator = container.querySelector('.idp-tabs-indicator') as HTMLElement;
      const isFirstUpdate = isFirstUpdateRef.current;

      // 首次更新时禁用transition，避免闪烁
      if (indicator && isFirstUpdate) {
        indicator.style.transition = 'none';
      }

      // 使用相对于容器的位置，不受滚动影响
      if (tabPlacement === 'top' || tabPlacement === 'bottom') {
        setIndicatorStyle({
          left: activeTab.offsetLeft,
          width: activeTab.offsetWidth,
          top: undefined,
          height: undefined
        });

        // 只在非动画模式下（初始化、resize时）才自动滚动到可视区域
        // 避免在用户手动滚动时产生冲突
        if (!animate) {
          const tabLeft = activeTab.offsetLeft;
          const tabRight = tabLeft + activeTab.offsetWidth;
          const scrollLeft = container.scrollLeft;
          const containerWidth = container.clientWidth;

          if (tabLeft < scrollLeft || tabRight > scrollLeft + containerWidth) {
            activeTab.scrollIntoView({ behavior: 'smooth', inline: 'nearest', block: 'nearest' });
          }
        }
      } else {
        setIndicatorStyle({
          top: activeTab.offsetTop,
          height: activeTab.offsetHeight,
          left: undefined,
          width: undefined
        });
      }

      // 首次更新后，恢复transition并标记已初始化
      if (indicator && isFirstUpdate && animate) {
        requestAnimationFrame(() => {
          indicator.style.transition = '';
          isFirstUpdateRef.current = false;
        });
      } else if (isFirstUpdate) {
        isFirstUpdateRef.current = false;
      }
    }
  };

  const checkOverflow = React.useCallback(() => {
    if (!tabsNavRef.current) return;

    const container = tabsNavRef.current;
    const isHorizontal = tabPlacement === 'top' || tabPlacement === 'bottom';
    
    if (isHorizontal) {
      // 精确计算是否有溢出，考虑小数点精度
      const hasOverflow = Math.ceil(container.scrollWidth) > Math.floor(container.clientWidth);
      setShowScrollButtons(hasOverflow);
      
      if (hasOverflow) {
        // 检查是否可以向左滚动（当前滚动位置 > 0）
        const canLeft = container.scrollLeft > 1;
        setCanScrollLeft(canLeft);
        
        // 检查是否可以向右滚动（当前滚动位置 + 容器宽度 < 内容宽度 - 1）
        const maxScroll = container.scrollWidth - container.clientWidth;
        const canRight = container.scrollLeft < maxScroll - 1;
        setCanScrollRight(canRight);
      } else {
        // 没有溢出时，重置按钮状态
        setCanScrollLeft(false);
        setCanScrollRight(false);
      }
    } else {
      // 垂直布局时隐藏滚动按钮
      setShowScrollButtons(false);
      setCanScrollLeft(false);
      setCanScrollRight(false);
    }
  }, [tabPlacement]);

  const scrollTabs = (direction: 'left' | 'right') => {
    if (!tabsNavRef.current || isScrollingRef.current) return;

    const container = tabsNavRef.current;
    const containerWidth = container.clientWidth;
    const scrollAmount = Math.max(200, containerWidth * 0.6); // 每次滚动至少200px，或容器宽度的60%

    isScrollingRef.current = true;

    if (direction === 'left') {
      container.scrollTo({
        left: container.scrollLeft - scrollAmount,
        behavior: 'smooth'
      });
    } else {
      container.scrollTo({
        left: container.scrollLeft + scrollAmount,
        behavior: 'smooth'
      });
    }

    // 重置滚动状态，允许下一次滚动
    setTimeout(() => {
      isScrollingRef.current = false;
      checkOverflow(); // 滚动后更新按钮状态
    }, 400);
  };

  useEffect(() => {
    // 当currentActiveKey变化时，使用平滑滑动更新indicator
    if (currentActiveKey) {
      updateIndicatorWithKey(currentActiveKey, false); // 初始化时不使用动画
      checkOverflow();
    }
  }, [currentActiveKey, items, tabPlacement, checkOverflow]);

  // 组件挂载后检查溢出和初始indicator位置
  useEffect(() => {
    // 初始检查
    checkOverflow();

    // 使用requestAnimationFrame确保DOM完全渲染后设置初始indicator位置
    const rafId = requestAnimationFrame(() => {
      // 设置初始位置，首次不使用动画
      if (currentActiveKey) {
        updateIndicatorWithKey(currentActiveKey, false);
      }
      // 再次检查溢出，确保按钮状态正确
      checkOverflow();
    });

    return () => cancelAnimationFrame(rafId);
  }, [checkOverflow, currentActiveKey]);

  useEffect(() => {
    let scrollTimeout: ReturnType<typeof setTimeout>;
    
    const handleResize = () => {
      // 窗口大小变化时更新indicator
      if (currentActiveKey) {
        updateIndicatorWithKey(currentActiveKey, false); // resize时不使用动画
      }
      checkOverflow();
    };
    
    const handleScroll = () => {
      // 防抖处理，避免滚动期间频繁更新
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        checkOverflow(); // 只更新按钮状态，不更新indicator位置
      }, 100);
    };
    
    const container = tabsNavRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
    }
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      if (container) {
        container.removeEventListener('scroll', handleScroll);
      }
      clearTimeout(scrollTimeout);
    };
  }, [checkOverflow, currentActiveKey]);

  const handleTabClick = (item: TabItem) => {
    if (item.disabled) return;

    if (activeKey === undefined) {
      setInnerActiveKey(item.key);
    }

    // 点击时使用平滑滑动效果
    updateIndicatorWithKey(item.key, true);
    checkOverflow();
    onChange?.(item.key);
  };

  const handleClose = (event: React.MouseEvent, item: TabItem) => {
    event.stopPropagation();
    if (item.disabled) return;
    onClose?.(item.key);
  };

  const renderNav = () => {
    const isHorizontal = tabPlacement === 'top' || tabPlacement === 'bottom';
    
    return (
      <div className="idp-tabs-nav-wrapper">
        {isHorizontal && showScrollButtons && (
          <button
            className={classNames(
              'idp-tabs-nav__button', 
              'idp-tabs-nav__button--left', 
              {
                'idp-tabs-nav__button--disabled': !canScrollLeft,
                'idp-tabs-nav__button--visible': true
              }
            )}
            onClick={() => scrollTabs('left')}
            disabled={!canScrollLeft}
            type="button"
          >
            <Icon type="arrowLeft" size={12} />
          </button>
        )}

        <div className="idp-tabs-nav" ref={tabsNavRef}>
          {items.map(item => {
            const isActive = item.key === currentActiveKey;
            const isClosable = tabsClosable || item.closable;

            return (
              <div
                key={item.key}
                ref={(el) => {
                  if (el) {
                    tabRefs.current.set(item.key, el);
                  } else {
                    tabRefs.current.delete(item.key);
                  }
                }}
                className={classNames('idp-tabs-tab', {
                  'idp-tabs-tab--active': isActive,
                  'idp-tabs-tab--disabled': item.disabled
                })}
                role="tab"
                aria-selected={isActive}
                onClick={() => handleTabClick(item)}
              >
                {item.icon && <span className="idp-tabs-tab__icon">{item.icon}</span>}
                <span className="idp-tabs-tab__label">{item.label}</span>
                {isClosable && !item.disabled && (
                  <span className="idp-tabs-tab__close" onClick={(event) => handleClose(event, item)}>
                    <Icon type="close" size={12} />
                  </span>
                )}
              </div>
            );
          })}
          <div className="idp-tabs-indicator" style={indicatorStyle} />
        </div>
        
        {isHorizontal && showScrollButtons && (
          <button
            className={classNames(
              'idp-tabs-nav__button', 
              'idp-tabs-nav__button--right', 
              {
                'idp-tabs-nav__button--disabled': !canScrollRight,
                'idp-tabs-nav__button--visible': true
              }
            )}
            onClick={() => scrollTabs('right')}
            disabled={!canScrollRight}
            type="button"
          >
            <Icon type="arrowRight" size={12} />
          </button>
        )}
      </div>
    );
  };

  const renderContent = () => (
    <div className={`idp-tabs-content idp-tabs-content--${tabPlacement}`} style={contentStyle}>
      {activeItem?.content}
    </div>
  );

  return (
    <div
      className={classNames(
        'idp-tabs',
        `idp-tabs--${tabPlacement}`,
        className
      )}
      style={style}
    >
      {tabPlacement === 'bottom' ? (
        <>
          {renderContent()}
          {renderNav()}
        </>
      ) : (
        <>
          {renderNav()}
          {renderContent()}
        </>
      )}
    </div>
  );
};

export default Tabs;
