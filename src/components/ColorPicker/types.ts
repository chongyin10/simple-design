// react-colorful 颜色选择器组件类型定义
export interface ColorPickerProps {
  // 当前颜色值（支持 HEX 格式或渐变色字符串）
  color: string;
  // 颜色变化回调
  onChange: (color: string) => void;
  // 颜色变化回调（可选）
  onColorChange?: (color?: string) => void;
  // 按钮变体（类似 Button 组件）
  variant?: 'primary' | 'secondary' | 'danger' | 'success' | 'warning';
  // 按钮尺寸（类似 Button 组件）
  size?: 'large' | 'small' | 'middle';
  // 是否禁用
  disabled?: boolean;
  // 自定义类名
  className?: string;
  // 自定义样式
  style?: React.CSSProperties;
  // 是否显示颜色文本
  showText?: boolean;
  // 是否支持透明度
  alpha?: boolean;
  // 预设颜色数组
  presetColors?: string[];
  // 是否支持渐变色
  gradient?: boolean;
  // 自定义子元素
  children?: React.ReactNode;
}
