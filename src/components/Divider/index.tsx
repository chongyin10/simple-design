import React from 'react';
import './Divider.css';

export interface DividerProps {
    orientation?: 'horizontal' | 'vertical';
    type?: 'solid' | 'dashed';
    color?: string;
    className?: string;
    style?: React.CSSProperties;
}

const Divider: React.FC<DividerProps> = ({
    orientation = 'horizontal',
    type = 'solid',
    color = '#339af0',
    className = '',
    style
}) => {
    return (
        <div
            className={`divider divider-${orientation} divider-${type} ${className}`}
            style={{
                backgroundColor: orientation === 'horizontal' ? color : 'transparent',
                borderColor: orientation === 'vertical' ? color : 'transparent',
                ...style
            }}
        />
    );
};

export default Divider;
