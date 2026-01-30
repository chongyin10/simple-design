import styled from 'styled-components';
import { SwitchStyles } from './types';

// 从 CSS 变量中读取值的辅助函数
const getCSSVar = (property: string, fallback: string) => `var(${property}, ${fallback})`;

// Wrapper 组件 - 使用 CSS 变量
export const Wrapper = styled.div<{ $styles?: SwitchStyles['wrapper'] }>`
  display: inline-block;

  &.switch-wrapper {
    /* 外部可通过 .switch-wrapper 选择器覆盖样式 */
  }

  ${({ $styles }) => $styles && Object.entries($styles).map(([key, value]) => `${key}: ${value};`).join('\n')}
`;

// Track 组件 - 配合 Switch.css 的 CSS 变量使用
export const Track = styled.div<{
  $checked: boolean;
  $disabled: boolean;
  $size: 'default' | 'small';
  $loading: boolean;
  $hasChildren?: boolean;
  $width?: number;
  $styles?: SwitchStyles['track'];
}>
`
  position: relative;
  background-color: ${_props => getCSSVar('--switch-track-bg', '#dcdfe6')};
  border-radius: ${_props => getCSSVar('--switch-track-radius', '10px')};
  transition: all ${_props => getCSSVar('--switch-transition', '0.3s')};
  cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'pointer')};
  opacity: ${({ $disabled }) => ($disabled ? 0.4 : 1)};
  box-sizing: border-box;
  overflow: hidden;

  &.switch-track {
    /* 外部可通过 .switch-track 选择器覆盖样式 */
  }

  &.switch-track-checked {
    background-color: ${getCSSVar('--switch-track-active-bg', '#409eff')};
  }

  &.switch-track-disabled {
    cursor: not-allowed;
    opacity: 0.4;
  }

  &.switch-track-loading {
    cursor: wait;
  }

  ${({ $size, $hasChildren, $width }) => {
    // 如果有自定义宽度，优先使用自定义宽度
    if ($width) {
      return `
        width: ${$width}px;
        min-width: ${$width}px;
        height: ${$size === 'small' ? getCSSVar('--switch-small-height', '16px') : getCSSVar('--switch-default-height', '22px')};
      `;
    }
    if ($size === 'small') {
      return `
        width: ${$hasChildren ? 'auto' : getCSSVar('--switch-small-width', '28px')};
        min-width: ${getCSSVar('--switch-small-width', '28px')};
        height: ${getCSSVar('--switch-small-height', '16px')};
      `;
    }
    return `
      width: ${$hasChildren ? 'auto' : getCSSVar('--switch-default-width', '44px')};
      min-width: ${getCSSVar('--switch-default-width', '44px')};
      height: ${getCSSVar('--switch-default-height', '22px')};
    `;
  }}

  ${({ $checked }) =>
    $checked && `
      background-color: ${getCSSVar('--switch-track-active-bg', '#409eff')};
    `
  }

  ${({ $loading }) =>
    $loading && `
      cursor: wait;
    `
  }

  ${({ $styles }) => $styles && Object.entries($styles).map(([key, value]) => `${key}: ${value};`).join('\n')}
`;

// Thumb 组件 - 配合 Switch.css 的 CSS 变量使用
export const Thumb = styled.div<{
  $checked: boolean;
  $size: 'default' | 'small';
  $loading: boolean;
  $hasChildren?: boolean;
  $width?: number;
  $styles?: SwitchStyles['thumb'];
}>
`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: ${_props => getCSSVar('--switch-thumb-bg', '#fff')};
  border-radius: ${_props => getCSSVar('--switch-thumb-radius', '50%')};
  box-shadow: ${_props => getCSSVar('--switch-thumb-shadow', '0 2px 4px rgba(0, 0, 0, 0.2)')};
  transition: left 0.3s ease;
  z-index: 2;

  &.switch-thumb {
    /* 外部可通过 .switch-thumb 选择器覆盖样式 */
  }

  &.switch-thumb-checked {
    /* 选中状态下的样式 */
  }

  ${({ $size, $checked, $width }) => {
    // 尺寸配置
    const thumbSize = $size === 'small' ? 12 : 18;
    const defaultOffset = 2; // 默认边距
    
    if ($width) {
      // 自定义宽度时，动态计算 thumb 位置
      // 未选中时：left = 边距
      // 选中时：left = 宽度 - thumb尺寸 - 边距
      const leftValue = $checked ? `${$width - thumbSize - defaultOffset}px` : `${defaultOffset}px`;
      return `
        width: ${thumbSize}px;
        height: ${thumbSize}px;
        left: ${leftValue};
      `;
    }
    
    // 默认尺寸
    if ($size === 'small') {
      const leftValue = $checked ? '14px' : '2px';
      return `
        width: ${thumbSize}px;
        height: ${thumbSize}px;
        left: ${leftValue};
      `;
    }
    const leftValue = $checked ? '24px' : '2px';
    return `
      width: ${thumbSize}px;
      height: ${thumbSize}px;
      left: ${leftValue};
    `;
  }}

  ${({ $loading }) =>
    $loading && `
      animation: switch-thumb-spin 1s linear infinite;
    `
  }

  ${({ $styles }) => $styles && Object.entries($styles).map(([key, value]) => `${key}: ${value};`).join('\n')}
`;

// LoadingIcon 组件 - 使用 SVG 图标
export const LoadingIcon = styled.div<{
  $checked?: boolean;
  $size?: 'default' | 'small';
  $width?: number;
  $styles?: SwitchStyles['loading'];
}>
`
  position: absolute;
  top: 50%;
  margin-top: -6px; /* 12px 高度的一半，实现垂直居中 */
  width: ${_props => getCSSVar('--switch-loading-size', '12px')};
  height: ${_props => getCSSVar('--switch-loading-size', '12px')};
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;

  &.switch-loading-icon {
    /* 外部可通过 .switch-loading-icon 选择器覆盖样式 */
  }

  /* SVG 旋转动画 - 以中心点旋转 */
  & > svg {
    width: 100%;
    height: 100%;
    animation: switch-spin 1s linear infinite;
    transform-origin: center center;
    display: block;
  }

  ${({ $size, $checked, $width }) => {
    // 尺寸配置（与 Thumb 保持一致）
    const iconSize = 12; // loading icon 固定 12px
    const thumbSize = $size === 'small' ? 12 : 18;
    const defaultOffset = 2; // 默认边距
    
    if ($width) {
      // 自定义宽度时，动态计算位置（与 Thumb 保持一致）
      // 未选中时：left = 边距 + (thumb尺寸 - icon尺寸) / 2 （居中在 thumb 位置）
      // 选中时：left = 宽度 - thumb尺寸 - 边距 + (thumb尺寸 - icon尺寸) / 2
      const thumbLeft = $checked ? $width - thumbSize - defaultOffset : defaultOffset;
      const leftValue = thumbLeft + (thumbSize - iconSize) / 2;
      return `
        left: ${leftValue}px;
      `;
    }
    
    // 默认尺寸
    if ($size === 'small') {
      const thumbLeft = $checked ? 14 : 2;
      const leftValue = thumbLeft + (thumbSize - iconSize) / 2;
      return `
        left: ${leftValue}px;
      `;
    }
    const thumbLeft = $checked ? 24 : 2;
    const leftValue = thumbLeft + (thumbSize - iconSize) / 2;
    return `
      left: ${leftValue}px;
    `;
  }}

  ${({ $styles }) => $styles && Object.entries($styles).map(([key, value]) => `${key}: ${value};`).join('\n')}
`;

// Inner 组件 - 用于显示文字内容（选中状态）
export const CheckedInner = styled.span<{
  $size: 'default' | 'small';
  $styles?: SwitchStyles['inner'];
}>
`
  position: absolute;
  top: 0;
  bottom: 0;
  left: ${({ $size }) => $size === 'small' ? '4px' : '6px'};
  display: flex;
  align-items: center;
  justify-content: flex-start;
  font-size: 12px;
  color: #fff;
  white-space: nowrap;
  user-select: none;
  z-index: 1;
  padding-right: ${({ $size }) => $size === 'small' ? '14px' : '22px'};

  &.switch-checked-inner {
    /* 外部可通过 .switch-checked-inner 选择器覆盖样式 */
  }

  ${({ $styles }) => $styles && Object.entries($styles).map(([key, value]) => `${key}: ${value};`).join('\n')}
`;

// Inner 组件 - 用于显示文字内容（非选中状态）
export const UnCheckedInner = styled.span<{
  $size: 'default' | 'small';
  $styles?: SwitchStyles['inner'];
}>
`
  position: absolute;
  top: 0;
  bottom: 0;
  right: ${({ $size }) => $size === 'small' ? '4px' : '6px'};
  display: flex;
  align-items: center;
  justify-content: flex-end;
  font-size: 12px;
  color: #fff;
  white-space: nowrap;
  user-select: none;
  z-index: 1;
  padding-left: ${({ $size }) => $size === 'small' ? '14px' : '22px'};

  &.switch-unchecked-inner {
    /* 外部可通过 .switch-unchecked-inner 选择器覆盖样式 */
  }

  ${({ $styles }) => $styles && Object.entries($styles).map(([key, value]) => `${key}: ${value};`).join('\n')}
`;

// 注入全局样式的函数
export const injectGlobalStyles = () => {
  if (typeof document !== 'undefined' && !document.getElementById('switch-styles')) {
    const style = document.createElement('style');
    style.id = 'switch-styles';
    style.textContent = `
      @keyframes switch-spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }
      @keyframes switch-thumb-spin {
        from { transform: translateY(-50%) rotate(0deg); }
        to { transform: translateY(-50%) rotate(360deg); }
      }
    `;
    document.head.appendChild(style);
  }
};
