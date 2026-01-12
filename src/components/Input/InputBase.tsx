import React from 'react';
import './Input.css';

import Icon from '../Icon/Icon';

export interface InputProps {
    type?: 'text';
    placeholder?: string;
    width?: string | number;
    className?: string;
    style?: React.CSSProperties;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
    onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
    disabled?: boolean;
    readOnly?: boolean;
    onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    prefix?: string | React.ReactNode;
    suffix?: string | React.ReactNode;
    clear?: boolean;
}

const InputBase: React.FC<InputProps> = ({
    type = 'text',
    placeholder = '',
    width,
    className = '',
    style,
    value,
    onChange,
    onBlur,
    onFocus,
    disabled = false,
    readOnly = false,
    onKeyDown,
    prefix,
    suffix,
    clear = false,
    ...rest
}) => {
    const [isFocused, setIsFocused] = React.useState(false);
    
    const renderIcon = (icon: string | React.ReactNode) => {
        if (!icon) return null;
        
        if (typeof icon === 'string') {
            return <Icon type={icon} size="medium" color="#909399" />;
        }
        
        return icon;
    };
    
    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
        setIsFocused(true);
        onFocus?.(e);
    };
    
    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        setIsFocused(false);
        onBlur?.(e);
    };
    
    const handleClear = () => {
        if (onChange && !disabled && !readOnly) {
            // 创建一个模拟的ChangeEvent，将value设置为空字符串
            const mockEvent = {
                target: { value: '' }
            } as React.ChangeEvent<HTMLInputElement>;
            onChange(mockEvent);
        }
    };
    
    // 确定是否显示清除按钮
    const showClearButton = clear && 
                          !disabled && 
                          !readOnly && 
                          isFocused && 
                          value !== undefined && 
                          value !== null && 
                          value.toString().length > 0;

    return (
        <div 
            className={`input-wrapper ${className} ${disabled ? 'input-disabled' : ''} ${readOnly ? 'input-readonly' : ''}`}
            style={{
                width,
                ...style
            }}
        >
            {prefix && <div className="input-prefix">{renderIcon(prefix)}</div>}
            <input
                type={type}
                placeholder={placeholder}
                className="input-inner"
                value={value}
                onChange={onChange}
                onBlur={handleBlur}
                onFocus={handleFocus}
                disabled={disabled}
                readOnly={readOnly}
                onKeyDown={onKeyDown}
                {...rest}
            />
            <div className="input-suffix-group">
                <div 
                    className={`input-suffix-clear ${showClearButton ? 'visible' : ''}`} 
                    onClick={handleClear}
                >
                    <Icon type="close" size="medium" color="#1890ff" />
                </div>
                {suffix && <div className="input-suffix-content">{renderIcon(suffix)}</div>}
            </div>
        </div>
    );
};

export default InputBase;