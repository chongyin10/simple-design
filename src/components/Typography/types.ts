import { ReactNode } from 'react';

export interface TypographyProps {
  /** 文本内容 */
  children: ReactNode;
  /** 宽度限制 */
  width?: number | string;
  /** 行数限制 */
  rows?: number;
  /** 自定义样式 */
  style?: React.CSSProperties;
  /** 自定义类名 */
  className?: string;
}