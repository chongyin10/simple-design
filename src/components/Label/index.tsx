import { FC } from 'react';
import { LabelWrapper } from './styles';
import { LabelProps } from './types';

const Label: FC<LabelProps> = (props: LabelProps) => {
    const {
        title,
        indicatorColor = 'blue',
        indicatorWidth = '3px',
        indicatorHeight = '100%',
        paddingRight = '8px'
    } = props;

    // 将数值转换为带 px 单位的字符串
    const formatValue = (value: string | number | undefined): string => {
        if (value === undefined) return '';
        return typeof value === 'number' ? `${value}px` : value;
    };

    const style: React.CSSProperties = {
        '--label-indicator-color': indicatorColor,
        '--label-indicator-width': formatValue(indicatorWidth),
        '--label-indicator-height': formatValue(indicatorHeight),
        '--label-padding-right': formatValue(paddingRight),
    } as React.CSSProperties;

    return (
        <LabelWrapper className={'label-wrapper'} style={style}>
            {title || null}
        </LabelWrapper>
    );
};

export default Label;
