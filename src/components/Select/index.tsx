import React, { createContext, useContext, useState, useEffect, useRef, ReactNode } from 'react';
import classNames from 'classnames';
import { SelectProps, SelectOptionProps, SelectOptGroupProps } from './types';
import './Select.css';

interface SelectContextType {
    value: any;
    onOptionSelect: (value: any) => void;
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
    placeholder = '请选择',
    disabled = false,
    size = 'middle',
    style,
    className,
    options,
    children
}) => {
    const [value, setValue] = useState(defaultValue);
    const [open, setOpen] = useState(false);
    const [selectedLabel, setSelectedLabel] = useState<ReactNode>(placeholder);
    const selectRef = useRef<HTMLDivElement>(null);
    const menuRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLDivElement>(null);

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
                setSelectedLabel(placeholder);
            }
        }
    }, [value, options, placeholder]);

    // 点击外部关闭下拉菜单
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                open &&
                selectRef.current &&
                !selectRef.current.contains(event.target as Node)
            ) {
                setOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [open]);

    // 处理选项选择
    const handleOptionSelect = (newValue: any) => {
        if (disabled) return;

        const newValueToSet = externalValue !== undefined ? externalValue : newValue;
        setValue(newValueToSet);
        onChange?.(newValueToSet);
        setOpen(false);

        // 更新显示的label
        if (options && options.length > 0) {
            const selected = options.find(option => option.value === newValueToSet);
            if (selected) {
                setSelectedLabel(selected.label);
            }
        }
    };

    // 处理触发器点击
    const handleTriggerClick = () => {
        if (disabled) return;
        setOpen(!open);
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
                onClick={() => !option.disabled && handleOptionSelect(option.value)}
            >
                {option.label}
            </div>
        ));
    };

    const classes = classNames('idp-select', {
        'idp-select--open': open,
        'idp-select--disabled': disabled,
        [`idp-select--${size}`]: size
    }, className);

    return (
        <SelectContext.Provider value={{ value, onOptionSelect: handleOptionSelect, disabled }}>
            <div className={classes} style={style} ref={selectRef}>
                <div
                    className="idp-select__trigger"
                    onClick={handleTriggerClick}
                    ref={triggerRef}
                    aria-expanded={open}
                    aria-haspopup="listbox"
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

                {open && (
                    <div className="idp-select-dropdown" ref={menuRef} role="listbox">
                        <div className="idp-select-dropdown__content">
                            {children ? children : renderOptions()}
                        </div>
                    </div>
                )}
            </div>
        </SelectContext.Provider>
    );
};

// Option子组件
Select.Option = ({ value, children, disabled = false }: SelectOptionProps) => {
    const context = useContext(SelectContext);

    if (!context) {
        throw new Error('Select.Option must be used within a Select component');
    }

    const { value: selectValue, onOptionSelect, disabled: selectDisabled } = context;
    const isSelected = selectValue === value;
    const isDisabled = disabled || selectDisabled;

    const handleClick = () => {
        if (!isDisabled) {
            onOptionSelect(value);
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
            {children}
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
