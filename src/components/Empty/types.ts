import { ReactNode } from 'react';

export interface EmptyProps {
  /** 自定义图标或图片 */
  icon?: ReactNode;
  /** 自定义图片路径 */
  image?: string;
  /** 空状态描述 */
  description?: ReactNode;
  /** 自定义操作区域 */
  children?: ReactNode;
  /** 尺寸 */
  size?: 'large' | 'middle' | 'small';
  /** 自定义样式 */
  style?: React.CSSProperties;
  /** 自定义类名 */
  className?: string;
}