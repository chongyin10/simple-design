import React, { createContext, useContext, useState, useEffect, useRef, ReactNode } from 'react';
import classNames from 'classnames';
import { SelectProps, SelectOptionProps, SelectOptGroupProps } from './types';
import Icon from '../Icon';
import Empty from '../Empty';
import { useI18n } from '../../i18n/I18nProvider';
import './Select.css';

interface SelectContextType {
    value: any;
    onOptionSelect: (value: any, label?: ReactNode) => void;
    disabled: boolean;
}

const SelectContext = createContext<SelectContextType | undefined>(undefined);

// 主Select组件
const Select: React.FC<SelectProps> & {
    Option: React.FC<SelectOptionProps>;
    OptGroup: React.FC<SelectOptGroupProps>;
} = ({
    value: externalValue,
    defaultValue,
    onChange,
    placeholder,
    disabled = false,
    size = 'middle',
    style,
    className,
    options,
    children,
    open: externalOpen,
    onOpenChange,
    width,
    height,
    dropdownHeight
}) => {
    const { t } = useI18n();
    const defaultPlaceholder = t('SELECT_PLACEHOLDER');
    const [value, setValue] = useState(defaultValue);
    const [internalOpen, setInternalOpen] = useState(false);
    const [selectedLabel, setSelectedLabel] = useState<ReactNode>(placeholder || defaultPlaceholder);
    const selectRef = useRef<HTMLDivElement>(null);
    const menuRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLDivElement>(null);

    // 确定最终的open状态，优先使用外部传入的open参数
    const isOpen = externalOpen !== undefined ? externalOpen : internalOpen;

    // 当外部value变化时更新内部状态
    useEffect(() => {
        if (externalValue !== undefined) {
            setValue(externalValue);
        }
    }, [externalValue]);

    // 根据value更新显示的label
    useEffect(() => {
        if (options && options.length > 0) {
            const selected = options.find(option => option.value === value);
            if (selected) {
                setSelectedLabel(selected.label);
            } else if (value === undefined || value === null) {
                setSelectedLabel(placeholder || defaultPlaceholder);
            }
        }
    }, [value, options, placeholder]);

    // 点击外部关闭下拉菜单
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                isOpen &&
                selectRef.current &&
                !selectRef.current.contains(event.target as Node)
            ) {
                if (externalOpen !== undefined) {
                    onOpenChange?.(false);
                } else {
                    setInternalOpen(false);
                }
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        // 清理函数
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, externalOpen, onOpenChange]);

    // 处理选项选择
    const handleOptionSelect = (newValue: any, label?: ReactNode) => {
        if (disabled) return;

        // 在受控模式下，只调用onChange，让外部组件更新value
        // 在非受控模式下，直接更新内部value
        if (externalValue === undefined) {
            setValue(newValue);
        }
        onChange?.(newValue);

        // 关闭下拉菜单
        if (externalOpen !== undefined) {
            onOpenChange?.(false);
        } else {
            setInternalOpen(false);
        }

        // 更新显示的label
        if (label) {
            setSelectedLabel(label);
        } else if (options && options.length > 0) {
            const selected = options.find(option => option.value === newValue);
            if (selected) {
                setSelectedLabel(selected.label);
            }
        }
    };

    // 处理触发器点击
    const handleTriggerClick = () => {
        if (disabled) return;
        const newOpenState = !isOpen;
        if (externalOpen !== undefined) {
            onOpenChange?.(newOpenState);
        } else {
            setInternalOpen(newOpenState);
        }
    };

    // 渲染通过options属性传入的选项
    const renderOptions = () => {
        if (!options || options.length === 0) return null;

        return options.map((option, index) => (
            <div
                    key={index}
                    className={classNames('idp-select-option', {
                        'idp-select-option--selected': value === option.value,
                        'idp-select-option--disabled': option.disabled
                    })}
                    onClick={() => !option.disabled && handleOptionSelect(option.value, option.label)}
                >
                    <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
                        {option.icon && <Icon type={option.icon} size={16} color={option.disabled ? '#00000040' : '#8c8c8c'} style={{ marginRight: '8px' }} />}
                        {option.label}
                    </div>
                    {value === option.value && (
                        <Icon type="check" size={18} color="#339af0" />
                    )}
                </div>
        ));
    };

    // 计算实际应用的尺寸
    const actualSize = height ? undefined : size;
    
    // 构建选择器的样式
    const selectStyle: React.CSSProperties = {
        ...style,
        width: width
    };
    
    // 构建触发器的样式
    const triggerStyle: React.CSSProperties = {
        height: height
    };
    
    // 构建下拉菜单的样式
    const dropdownStyle: React.CSSProperties = {
        width: width
    };
    
    // 构建下拉菜单内容的样式
    const dropdownContentStyle: React.CSSProperties = {
        maxHeight: dropdownHeight
    };
    
    const classes = classNames('idp-select', {
        'idp-select--open': isOpen,
        'idp-select--disabled': disabled,
        [`idp-select--${actualSize}`]: actualSize
    }, className);

    return (
        <SelectContext.Provider value={{ value, onOptionSelect: handleOptionSelect, disabled }}>
            <div className={classes} style={selectStyle} ref={selectRef}>
                <div
                    className="idp-select__trigger"
                    onClick={handleTriggerClick}
                    ref={triggerRef}
                    aria-expanded={isOpen}
                    aria-haspopup="listbox"
                    style={triggerStyle}
                >
                    <span className={classNames('idp-select__value', {
                        'idp-select__value--placeholder': value === undefined || value === null
                    })}>
                        {selectedLabel}
                    </span>
                    <span className="idp-select__arrow">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </span>
                </div>

                {isOpen && (
                    <div className="idp-select-dropdown" ref={menuRef} role="listbox" style={dropdownStyle}>
                        <div className="idp-select-dropdown__content" style={dropdownContentStyle}>
                            {(() => {
                                // 检查是否有选项
                                const hasOptions = options && options.length > 0;
                                const hasChildren = React.Children.count(children) > 0;
                                
                                if (hasOptions) {
                                    return renderOptions();
                                } else if (hasChildren) {
                                    return children;
                                } else {
                                    // 没有选项时显示空状态
                                    return (
                                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80px', padding: '20px' }}>
                                            <Empty size="small" description="暂无选项" />
                                        </div>
                                    );
                                }
                            })()}
                        </div>
                    </div>
                )}
            </div>
        </SelectContext.Provider>
    );
};

// Option子组件
Select.Option = ({ value, children, disabled = false, icon }: SelectOptionProps) => {
    const context = useContext(SelectContext);

    if (!context) {
        throw new Error('Select.Option must be used within a Select component');
    }

    const { value: selectValue, onOptionSelect, disabled: selectDisabled } = context;
    const isSelected = selectValue === value;
    const isDisabled = disabled || selectDisabled;

    const handleClick = () => {
        if (!isDisabled) {
            onOptionSelect(value, children);
        }
    };

    return (
        <div
            className={classNames('idp-select-option', {
                'idp-select-option--selected': isSelected,
                'idp-select-option--disabled': isDisabled
            })}
            onClick={handleClick}
            role="option"
            aria-selected={isSelected}
            aria-disabled={isDisabled}
        >
            <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
                {icon && <Icon type={icon} size={16} color={isDisabled ? '#00000040' : '#8c8c8c'} style={{ marginRight: '8px' }} />}
                {children}
            </div>
            {isSelected && (
                <Icon type="check" size={18} color="#339af0" />
            )}
        </div>
    );
};

// OptGroup分组组件
Select.OptGroup = ({ label, children }: SelectOptGroupProps) => {
    return (
        <div className="idp-select-optgroup">
            <div className="idp-select-optgroup__label">{label}</div>
            <div className="idp-select-optgroup__content">
                {children}
            </div>
        </div>
    );
};

Select.displayName = 'Select';
Select.Option.displayName = 'Select.Option';
Select.OptGroup.displayName = 'Select.OptGroup';

export default Select;
export * from './types';
