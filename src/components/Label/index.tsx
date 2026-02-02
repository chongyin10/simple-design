import { FC } from 'react';
import { LabelWrapper } from './styles';
import { LabelProps } from './types';
import './Label.css';

const Label: FC<LabelProps> = (props: LabelProps) => {
    const {
        title,
        indicatorColor = 'blue',
        indicatorWidth = '3px',
        indicatorHeight = '100%',
        paddingRight = '8px',
        style: customStyle
    } = props;

    // 将数值转换为带 px 单位的字符串
    const formatValue = (value: string | number | undefined): string => {
        if (value === undefined) return '';
        return typeof value === 'number' ? `${value}px` : value;
    };

    // 优先级顺序：
    // 1. 自定义 style（最高优先级 - 直接覆盖内联样式）
    // 2. CSS 变量样式（组件属性传入）
    // 3. .label-wrapper CSS 类
    // 4. styled-components（最低优先级）
    const cssVariableStyle: React.CSSProperties = {
        '--label-indicator-color': indicatorColor,
        '--label-indicator-width': formatValue(indicatorWidth),
        '--label-indicator-height': formatValue(indicatorHeight),
        '--label-padding-right': formatValue(paddingRight),
    } as React.CSSProperties;

    // 合并样式：自定义 style 优先级最高
    const finalStyle: React.CSSProperties = {
        ...cssVariableStyle,
        ...customStyle,
    };

    return (
        <LabelWrapper className="label-wrapper" style={finalStyle}>
            {title || null}
        </LabelWrapper>
    );
};

export default Label;
