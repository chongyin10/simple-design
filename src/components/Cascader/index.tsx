import React, { useState, useRef, useEffect, useCallback } from 'react';
import Icon from '../Icon';
import Empty from '../Empty';
import type { CascaderProps, CascaderOption } from './types';
import './Cascader.css';

const Cascader: React.FC<CascaderProps> = ({
  value,
  defaultValue,
  onChange,
  options = [],
  placeholder = '请选择',
  disabled = false,
  size = 'middle',
  style,
  className = '',
  allowClear = true,
  expandTrigger = 'click',
  changeOnSelect = false,
  fieldNames = {},
  width,
  dropdownWidth,
  dropdownHeight,
  dropdownStyle = {},
  dropdownClassName = ''
}) => {
  const [open, setOpen] = useState(false);
  const [internalValue, setInternalValue] = useState<any[]>(value || defaultValue || []);
  const [activePath, setActivePath] = useState<any[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const { label = 'label', value: valueKey = 'value', children: childrenKey = 'children' } = fieldNames;

  // 同步外部value
  useEffect(() => {
    if (value !== undefined) {
      setInternalValue(value);
    }
  }, [value]);

  // 获取选项的值
  const getOptionValue = useCallback((option: CascaderOption) => {
    return option[valueKey as keyof CascaderOption] || option.value;
  }, [valueKey]);

  // 获取选项的标签
  const getOptionLabel = useCallback((option: CascaderOption) => {
    return option[label as keyof CascaderOption] || option.label;
  }, [label]);

  // 获取选项的子项
  const getOptionChildren = useCallback((option: CascaderOption) => {
    return option[childrenKey as keyof CascaderOption] || option.children;
  }, [childrenKey]);

  // 根据值路径查找选中的选项
  const findSelectedOptions = useCallback((valuePath: any[]): CascaderOption[] => {
    const result: CascaderOption[] = [];
    let currentOptions = options;
    
    for (const val of valuePath) {
      const found = currentOptions.find(opt => getOptionValue(opt) === val);
      if (found) {
        result.push(found);
        currentOptions = getOptionChildren(found) || [];
      } else {
        return result;
      }
    }
    
    return result;
  }, [options, getOptionValue, getOptionChildren]);

  // 根据值查找显示文本
  const getDisplayText = useCallback(() => {
    if (internalValue.length === 0) {
      return placeholder;
    }
    
    const selectedOptions = findSelectedOptions(internalValue);
    return selectedOptions.map(opt => getOptionLabel(opt)).join(' / ');
  }, [internalValue, findSelectedOptions, getOptionLabel, placeholder]);

  // 处理选项点击
  const handleOptionClick = useCallback((option: CascaderOption, level: number) => {
    const newValue = [...activePath.slice(0, level), getOptionValue(option)];
    setActivePath(newValue);

    const children = getOptionChildren(option);
    
    if (children && children.length > 0) {
      // 有子项，不关闭，继续展开下一级
      if (changeOnSelect) {
        // 如果允许选中任意级别，触发onChange
        const selectedOptions = findSelectedOptions(newValue);
        onChange?.(newValue, selectedOptions);
        if (value === undefined) {
          setInternalValue(newValue);
        }
      }
    } else {
      // 没有子项，选中并关闭
      const selectedOptions = findSelectedOptions(newValue);
      onChange?.(newValue, selectedOptions);
      if (value === undefined) {
        setInternalValue(newValue);
      }
      setOpen(false);
      setActivePath([]);
    }
  }, [activePath, getOptionValue, getOptionChildren, changeOnSelect, findSelectedOptions, onChange, value]);

  // 处理选项悬停
  const handleOptionHover = useCallback((option: CascaderOption, level: number) => {
    if (expandTrigger === 'hover') {
      const newValue = [...activePath.slice(0, level), getOptionValue(option)];
      setActivePath(newValue);
    }
  }, [activePath, expandTrigger, getOptionValue]);

  // 清除选择
  const handleClear = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    onChange?.([], []);
    if (value === undefined) {
      setInternalValue([]);
    }
    setActivePath([]);
  }, [onChange, value]);

  // 处理容器点击
  const handleContainerClick = useCallback(() => {
    if (!disabled) {
      setOpen(!open);
    }
  }, [open, disabled]);

  // 点击外部关闭
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
        setActivePath([]);
      }
    };

    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open]);

  // 获取指定层级的选项
  const getOptionsAtLevel = useCallback((level: number): CascaderOption[] => {
    if (level === 0) {
      return options;
    }
    
    const valuePath = activePath.slice(0, level);
    let currentOptions = options;
    
    for (const val of valuePath) {
      const found = currentOptions.find(opt => getOptionValue(opt) === val);
      if (found) {
        currentOptions = getOptionChildren(found) || [];
      } else {
        return [];
      }
    }
    
    return currentOptions;
  }, [options, activePath, getOptionValue, getOptionChildren]);

  // 初始化activePath
  useEffect(() => {
    if (open && internalValue.length > 0) {
      setActivePath(internalValue);
    } else if (!open) {
      setActivePath([]);
    }
  }, [open, internalValue]);

  // 判断选项是否被选中
  const isOptionSelected = useCallback((option: CascaderOption, level: number) => {
    if (level >= internalValue.length) {
      return false;
    }
    return internalValue[level] === getOptionValue(option);
  }, [internalValue, getOptionValue]);

  // 判断选项是否处于激活路径中
  const isOptionActive = useCallback((option: CascaderOption, level: number) => {
    if (level >= activePath.length) {
      return false;
    }
    return activePath[level] === getOptionValue(option);
  }, [activePath, getOptionValue]);

  // 渲染选项列表
  const renderOptions = (level: number) => {
    const optionsAtLevel = getOptionsAtLevel(level);

    // 空状态处理
    if (!optionsAtLevel || optionsAtLevel.length === 0) {
      return (
        <div className="cascader-menu cascader-menu-empty">
          <Empty size="small" description="暂无数据" />
        </div>
      );
    }

    return (
      <ul className={`cascader-menu cascader-menu-${level}`}>
        {optionsAtLevel.map((option, index) => {
          const isSelected = isOptionSelected(option, level);
          const isActive = isOptionActive(option, level);
          const hasChildren = getOptionChildren(option) && getOptionChildren(option)!.length > 0;
          const isDisabled = option.disabled;

          return (
            <li
              key={`${getOptionValue(option)}-${index}`}
              className={`cascader-menu-item ${isSelected ? 'cascader-menu-item-selected' : ''} ${isActive ? 'cascader-menu-item-active' : ''} ${isDisabled ? 'cascader-menu-item-disabled' : ''}`}
              onClick={() => !isDisabled && handleOptionClick(option, level)}
              onMouseEnter={() => !isDisabled && handleOptionHover(option, level)}
            >
              <span className="cascader-menu-item-content">
                {getOptionLabel(option)}
              </span>
              {hasChildren && (
                <span className="cascader-menu-item-expand-icon">
                  <Icon type="arrowRight" size={12} color="#bfbfbf" />
                </span>
              )}
            </li>
          );
        })}
      </ul>
    );
  };

  // 获取显示的菜单数量
  const getMenuCount = useCallback(() => {
    if (activePath.length === 0) {
      return 1;
    }

    let count = activePath.length;
    let currentOptions = options;

    // 检查最后一级是否有子项
    for (const val of activePath) {
      const found = currentOptions.find(opt => getOptionValue(opt) === val);
      if (found) {
        currentOptions = getOptionChildren(found) || [];
      } else {
        break;
      }
    }

    if (currentOptions && currentOptions.length > 0) {
      count++;
    }

    return count;
  }, [activePath, options, getOptionValue, getOptionChildren]);

  // 计算触发器宽度
  const triggerStyle = useCallback(() => {
    if (width) {
      return { ...style, width: typeof width === 'number' ? `${width}px` : width };
    }
    return style;
  }, [width, style]);

  // 计算下拉框样式
  const computedDropdownStyle = useCallback(() => {
    const baseStyle: React.CSSProperties = {
      ...dropdownStyle
    };

    if (dropdownWidth) {
      baseStyle.width = typeof dropdownWidth === 'number' ? `${dropdownWidth}px` : dropdownWidth;
    }

    if (dropdownHeight) {
      baseStyle.maxHeight = typeof dropdownHeight === 'number' ? `${dropdownHeight}px` : dropdownHeight;
    }

    return baseStyle;
  }, [dropdownWidth, dropdownHeight, dropdownStyle]);

  return (
    <div
      ref={containerRef}
      className={`cascader cascader-${size} ${className} ${disabled ? 'cascader-disabled' : ''} ${open ? 'cascader-open' : ''}`}
      style={triggerStyle()}
    >
      <div className="cascader-trigger" onClick={handleContainerClick}>
        <span className={`cascader-selection-placeholder ${internalValue.length > 0 ? 'cascader-selection-hidden' : ''}`}>
          {placeholder}
        </span>
        <span className={`cascader-selection-value ${internalValue.length === 0 ? 'cascader-selection-hidden' : ''}`}>
          {getDisplayText()}
        </span>
        <span className="cascader-arrow">
          <Icon type="arrowDown" size={12} />
        </span>
        {allowClear && internalValue.length > 0 && !disabled && (
          <span className="cascader-clear" onClick={handleClear}>
            <Icon type="close" size={12} />
          </span>
        )}
      </div>

      {open && (
        <div className={`cascader-dropdown ${dropdownClassName}`} ref={menuRef} style={computedDropdownStyle()}>
          <div className="cascader-menus" style={{ width: dropdownWidth ? undefined : `${getMenuCount() * 180}px` }}>
            {Array.from({ length: getMenuCount() }).map((_, level) => renderOptions(level))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Cascader;
