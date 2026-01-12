import React from 'react';
import { FlexProps } from './types';
import './Flex.css';

const Flex: React.FC<FlexProps> = ({
  children,
  layout = 'horizontal',
  direction,
  justify = 'flex-start',
  align = 'stretch',
  wrap = 'nowrap',
  gap,
  style = {}
}) => {
  // 根据layout计算最终的direction，direction优先级更高
  const finalDirection = direction || (layout === 'column' ? 'column' : 'row');

  return (
    <div
      className={"flex"}
      style={{
        gap: typeof gap === 'number' ? `${gap}px` : gap,
        justifyContent:justify,
        alignItems: align,
        flexWrap: wrap,
        flexDirection: finalDirection,
        ...style
      }}
    >
      {children}
    </div>
  );
};

export default Flex;
