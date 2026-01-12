import React, { createContext, useContext, useState, useEffect } from 'react';
import classNames from 'classnames';
import { RadioProps, RadioGroupProps } from './types';
import './Radio.css';

// RadioGroup的Context类型
interface RadioGroupContextType {
    value?: any;
    onChange?: (value: any) => void;
    disabled?: boolean;
    type?: 'button' | 'radio';
    size?: 'large' | 'middle' | 'small';
}

const RadioGroupContext = createContext<RadioGroupContextType | undefined>(undefined);

// Radio组件
const Radio: React.FC<RadioProps> & { Group: React.FC<RadioGroupProps> } = ({
    value,
    checked,
    defaultChecked = false,
    onChange,
    disabled = false,
    size,
    children,
    className,
    style
}) => {
    // 使用Context获取Group的状态
    const groupContext = useContext(RadioGroupContext);
    const isGroupMode = !!groupContext;
    
    // 非Group模式下的内部状态管理
    const [internalChecked, setInternalChecked] = useState(defaultChecked);
    
    // Group模式下的checked状态由Group控制
    const isChecked = isGroupMode 
        ? groupContext.value === value 
        : checked !== undefined ? checked : internalChecked;
    
    // 确定最终的size，优先使用组件自身的size，否则使用Group的size
    const finalSize = size || (isGroupMode ? groupContext.size : undefined);
    
    // 确定最终的type，仅Group模式下有效
    const groupType = isGroupMode ? groupContext.type : undefined;
    const isButtonType = groupType === 'button';
    
    // 当外部checked变化时更新内部状态（非Group模式）
    useEffect(() => {
        if (!isGroupMode && checked !== undefined) {
            setInternalChecked(checked);
        }
    }, [checked, isGroupMode]);
    
    // 处理Radio点击事件
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newChecked = e.target.checked;
        
        if (disabled || (isGroupMode && groupContext.disabled)) {
            return;
        }
        
        if (isGroupMode) {
            // Group模式下通知Group更新value
            groupContext.onChange?.(value);
        } else {
            // 非Group模式下更新内部状态
            setInternalChecked(newChecked);
            onChange?.(newChecked, value);
        }
    };
    
    const classes = classNames(
        'idp-radio',
        {
            'idp-radio--checked': isChecked,
            'idp-radio--disabled': disabled || (isGroupMode && groupContext.disabled),
            [`idp-radio--${finalSize}`]: finalSize,
            'idp-radio--button': isButtonType
        },
        className
    );
    
    return (
        <label className={classes} style={style}>
            <input
                type="radio"
                className="idp-radio__input"
                checked={isChecked}
                onChange={handleChange}
                disabled={disabled || (isGroupMode && groupContext.disabled)}
                value={value}
            />
            {/* 按钮类型时隐藏span元素 */}
            {!isButtonType && <span className="idp-radio__inner"></span>}
            {children && <span className="idp-radio__label">{children}</span>}
        </label>
    );
};

// Radio.Group组件
Radio.Group = ({
    value,
    defaultValue,
    onChange,
    disabled = false,
    type = 'radio',
    size = 'middle',
    children,
    className,
    style
}) => {
    // Group组件的状态管理
    const [internalValue, setInternalValue] = useState(defaultValue);
    
    // 当外部value变化时更新内部状态
    useEffect(() => {
        if (value !== undefined) {
            setInternalValue(value);
        }
    }, [value]);
    
    // 处理Group内部Radio的变化
    const handleGroupChange = (newValue: any) => {
        setInternalValue(newValue);
        onChange?.(newValue);
    };
    
    const classes = classNames(
        'idp-radio-group',
        {
            'idp-radio-group--button': type === 'button',
            [`idp-radio-group--${size}`]: size
        },
        className
    );
    
    // 提供Context给子Radio组件
    return (
        <RadioGroupContext.Provider value={{
            value: value !== undefined ? value : internalValue,
            onChange: handleGroupChange,
            disabled,
            type,
            size
        }}>
            <div className={classes} style={style}>
                {children}
            </div>
        </RadioGroupContext.Provider>
    );
};

// 设置组件名称，方便调试
Radio.displayName = 'Radio';
Radio.Group.displayName = 'Radio.Group';

export default Radio;
export * from './types';
