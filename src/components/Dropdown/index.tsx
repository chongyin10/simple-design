import React, { useState, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import Button from '../Button';
import Icon from '../Icon';
import './Dropdown.css';
import { DropdownProps } from './types';

export const Dropdown: React.FC<DropdownProps> = ({
  items,
  type = 'text',
  children,
  trigger = 'click',
  placement = 'bottom',
  disabled = false,
  open,
  ellipsis = true,
  className,
  style,
  contentStyles,
  getContainer,
  onVisibleChange,
  onChange
}) => {
  // 受控组件逻辑：如果提供了 open 参数，则使用外部控制的状态
  const isControlled = open !== undefined;
  const [internalVisible, setInternalVisible] = useState(false);
  const visible = isControlled ? open : internalVisible;
  
  const dropdownRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        if (!isControlled) {
          setInternalVisible(false);
        }
        onVisibleChange?.(false);
      }
    };

    if (visible) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [visible, onVisibleChange, isControlled]);

  const handleTriggerClick = () => {
    if (disabled) return;
    
    if (trigger === 'click') {
      const newVisible = !visible;
      if (!isControlled) {
        setInternalVisible(newVisible);
      }
      onVisibleChange?.(newVisible);
    }
  };

  const handleMouseEnter = () => {
    if (disabled || trigger !== 'hover') return;
    if (!isControlled) {
      setInternalVisible(true);
    }
    onVisibleChange?.(true);
  };

  const handleMouseLeave = () => {
    if (disabled || trigger !== 'hover') return;
    if (!isControlled) {
      setInternalVisible(false);
    }
    onVisibleChange?.(false);
  };

  const handleItemClick = (item: any) => {
    if (item.disabled) return;
    
    item.onClick?.();
    onChange?.(item);
    if (!isControlled) {
      setInternalVisible(false);
    }
    onVisibleChange?.(false);
  };

  const renderTrigger = () => {
    if (type === 'button') {
      // 对于 button 类型，只支持点击触发，不支持悬停触发
      return (
        <Button
          variant="secondary"
          size="medium"
          disabled={disabled}
          onClick={handleTriggerClick}
          icon="caret-down"
        >
          {children || 'Dropdown'}
        </Button>
      );
    }

    return (
      <div
        ref={triggerRef}
        className={classNames('dropdown-trigger', {
          'dropdown-trigger--text': type === 'text',
          'dropdown-trigger--disabled': disabled
        })}
        onClick={handleTriggerClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {children || 'Dropdown'}
        <Icon type="caret-down" className="dropdown-arrow" />
      </div>
    );
  };

  const renderDropdownMenu = () => {
    if (!items || items.length === 0 || !visible) {
      return null;
    }

    const dropdownMenu = (
      <div className={classNames(`dropdown-menu dropdown-menu--${placement} dropdown-menu--p-${placement}`, {
        'dropdown-menu--visible': visible
      })}>
        <ul className="dropdown-list" style={contentStyles}>
          {items.map((item) => (
            <li
              key={item.key}
              className={classNames('dropdown-item', {
                'dropdown-item--disabled': item.disabled
              })}
              onClick={() => handleItemClick(item)}
            >
              {item.icon && (
                <span className="dropdown-item-icon">
                  {typeof item.icon === 'string' ? (
                    <Icon type={item.icon} />
                  ) : (
                    item.icon
                  )}
                </span>
              )}
              <span className={classNames('dropdown-item-label', {
                'dropdown-item-label--with-width': contentStyles?.width && !ellipsis,
                'dropdown-item-label--ellipsis': contentStyles?.width && ellipsis
              })}>{item.label}</span>
            </li>
          ))}
        </ul>
      </div>
    );

    // 如果提供了 getContainer，使用 Portal 渲染到指定容器
    if (getContainer) {
      const container = getContainer();
      if (container) {
        return ReactDOM.createPortal(dropdownMenu, container);
      }
    }

    // 默认渲染到当前组件位置
    return dropdownMenu;
  };

  return (
    <div
      ref={dropdownRef}
      className={classNames('dropdown', className, {
        'dropdown--disabled': disabled
      })}
      style={style}
    >
      {renderTrigger()}
      <div className="dropdown-content-wrapper">
        {renderDropdownMenu()}
      </div>
    </div>
  );
};

export default Dropdown;