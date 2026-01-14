import React from 'react';
import classNames from 'classnames';
import Icon from '../Icon';
import './Button.css';

export interface ButtonProps {
    children?: React.ReactNode;
    variant?: 'primary' | 'secondary' | 'danger' | 'success' | 'warning';
    size?: 'small' | 'medium' | 'large';
    disabled?: boolean;
    loading?: boolean;
    onClick?: () => void;
    className?: string;
    style?: React.CSSProperties;
    icon?: string | React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({
    children,
    variant = 'primary',
    size = 'medium',
    disabled = false,
    loading = false,
    onClick,
    className,
    style,
    icon
}, ref) => {
    const classes = classNames(
        'idp-btn',
        `idp-btn--${variant}`,
        `idp-btn--${size}`,
        {
            'idp-btn--disabled': disabled || loading
        },
        className
    );

    const handleClick = () => {
        if (!disabled && onClick) {
            onClick();
        }
    };

    const renderIcon = () => {
        if (loading) {
            return <Icon type="loading" style={{ marginRight: children ? '2px' : 0 }} />;
        }
        
        if (!icon) return null;
        
        if (typeof icon === 'string') {
            return <Icon type={icon} style={{ marginRight: children ? '2px' : 0 }} />;
        }
        
        return <span style={{ marginRight: children ? '8px' : 0, display: 'inline-flex', alignItems: 'center' }}>{icon}</span>;
    };

    return (
        <button
            ref={ref}
            className={classes}
            onClick={handleClick}
            disabled={disabled}
            style={style}
        >
            {renderIcon()}
            {children}
        </button>
    );
});

// 设置组件名称，方便调试
Button.displayName = 'Button';

export default Button;