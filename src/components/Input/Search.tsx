import React from 'react';
import InputBase, { InputProps } from './InputBase';
import Icon from '../Icon';

interface SearchProps extends InputProps {
    onSearch?: () => void;
    onClear?: () => void;
}

const Search: React.FC<SearchProps> = ({
    type = 'text',
    placeholder = '搜索',
    width,
    className = '',
    style,
    value,
    onChange,
    onBlur,
    onFocus,
    disabled = false,
    readOnly = false,
    onSearch,
    onClear,
    clear = false,
    suffix,
    ...rest
}) => {
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            onSearch?.();
        }
    };

    const handleSearchClick = () => {
        onSearch?.();
    };

    const handleClearClick = () => {
        onClear?.();
        // 如果没有提供onClear，模拟InputBase的清除行为
        if (!onClear && onChange) {
            const mockEvent = {
                target: { value: '' }
            } as React.ChangeEvent<HTMLInputElement>;
            onChange(mockEvent);
        }
    };

    // 当clear为true时，将搜索图标作为suffix传递给InputBase
    // 这样清除按钮会显示在搜索图标的左边
    const inputSuffix = clear ? (
        <Icon
            type="search"
            onClick={handleSearchClick}
            style={{ cursor: 'pointer' }}
        />
    ) : suffix;

    return (
        <div className={`search-input-wrapper ${className}`} style={{ width, ...style }}>
            <InputBase
                type={type}
                placeholder={placeholder}
                width="100%"
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                onFocus={onFocus}
                disabled={disabled}
                readOnly={readOnly}
                onKeyDown={handleKeyDown}
                clear={clear}
                suffix={inputSuffix}
                {...rest}
            />
            {/* 只有当clear为false时，才显示Search组件自己的清除按钮和搜索图标 */}
            {!clear && (
                <div className="search-input-suffix">
                    {value && (
                        <Icon
                            type="clear"
                            size="small"
                            onClick={handleClearClick}
                            style={{ cursor: 'pointer', marginRight: '8px' }}
                        />
                    )}
                    <Icon
                        type="search"
                        onClick={handleSearchClick}
                        style={{ cursor: 'pointer' }}
                    />
                </div>
            )}
        </div>
    );
};

export default Search;