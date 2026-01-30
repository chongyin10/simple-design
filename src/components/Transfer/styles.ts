import styled from 'styled-components';
import { CSSProperties } from 'react';

// 从 CSS 变量中读取值的辅助函数
const getCSSVar = (property: string, fallback: string) => `var(${property}, ${fallback})`;

/**
 * Transfer 外层容器
 */
export const TransferWrapper = styled.div<{ $styles?: CSSProperties }>`
  display: flex;
  align-items: center;
  gap: 8px;

  &.transfer-wrapper {
    /* 外部可通过 .transfer-wrapper 选择器覆盖样式 */
  }

  ${({ $styles }) => $styles && Object.entries($styles).map(([key, value]) => `${key}: ${value};`).join('\n')}
`;

/**
 * Transfer 列表容器
 */
export const TransferListContainer = styled.div<{
  $disabled?: boolean;
  $styles?: CSSProperties;
  $height?: number | string;
  $width?: number | string;
}>`
  width: ${({ $width }) => typeof $width === 'number' ? `${$width}px` : ($width || getCSSVar('--transfer-list-width', '200px'))};
  height: ${({ $height }) => typeof $height === 'number' ? `${$height}px` : ($height || getCSSVar('--transfer-height', '300px'))};
  border: 1px solid ${getCSSVar('--transfer-border-color', '#d9d9d9')};
  border-radius: ${getCSSVar('--transfer-border-radius', '6px')};
  background: ${getCSSVar('--transfer-bg', '#fff')};
  display: flex;
  flex-direction: column;
  overflow: hidden;
  opacity: ${({ $disabled }) => ($disabled ? 0.6 : 1)};
  /* 立体感阴影效果 */
  box-shadow:
    0 2px 4px rgba(0, 0, 0, 0.04),
    0 4px 8px rgba(0, 0, 0, 0.06),
    0 8px 16px rgba(0, 0, 0, 0.04),
    inset 0 1px 0 rgba(255, 255, 255, 0.8);
  transition: box-shadow 0.3s ease, transform 0.3s ease;

  &:hover {
    box-shadow:
      0 4px 8px rgba(0, 0, 0, 0.06),
      0 8px 16px rgba(0, 0, 0, 0.08),
      0 16px 32px rgba(0, 0, 0, 0.06),
      inset 0 1px 0 rgba(255, 255, 255, 0.8);
  }

  &.transfer-list {
    /* 外部可通过 .transfer-list 选择器覆盖样式 */
  }

  ${({ $styles }) => $styles && Object.entries($styles).map(([key, value]) => `${key}: ${value};`).join('\n')}
`;

/**
 * Transfer 列表头部
 */
export const TransferListHeader = styled.div`
  height: ${getCSSVar('--transfer-header-height', '40px')};
  padding: 0 ${getCSSVar('--transfer-padding', '12px')};
  background: ${getCSSVar('--transfer-header-bg', '#fafafa')};
  border-bottom: 1px solid ${getCSSVar('--transfer-border-color', '#d9d9d9')};
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: ${getCSSVar('--transfer-header-font-size', '14px')};
  font-weight: 500;
  color: ${getCSSVar('--transfer-item-text-color', 'rgba(0, 0, 0, 0.85)')};

  &.transfer-list-header {
    /* 外部可通过 .transfer-list-header 选择器覆盖样式 */
  }
`;

/**
 * Transfer 头部左侧（全选复选框 + 标题）
 */
export const TransferHeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  .transfer-checkbox {
    cursor: pointer;
  }
`;

/**
 * Transfer 头部右侧（计数）
 */
export const TransferHeaderCount = styled.span`
  font-size: 12px;
  color: ${getCSSVar('--transfer-description-color', 'rgba(0, 0, 0, 0.45)')};
`;

/**
 * Transfer 搜索框容器
 */
export const TransferSearchWrapper = styled.div`
  padding: 8px ${getCSSVar('--transfer-padding', '12px')};
  border-bottom: 1px solid ${getCSSVar('--transfer-border-color', '#d9d9d9')};

  &.transfer-search-wrapper {
    /* 外部可通过 .transfer-search-wrapper 选择器覆盖样式 */
  }
`;

/**
 * Transfer 搜索框
 */
export const TransferSearch = styled.input<{ $styles?: CSSProperties }>`
  width: 100%;
  height: ${getCSSVar('--transfer-search-height', '32px')};
  padding: ${getCSSVar('--transfer-search-padding', '0 8px')};
  border: 1px solid ${getCSSVar('--transfer-search-border', '#d9d9d9')};
  border-radius: 4px;
  font-size: ${getCSSVar('--transfer-font-size', '14px')};
  outline: none;
  transition: ${getCSSVar('--transfer-transition', 'all 0.3s')};
  box-sizing: border-box;

  &::placeholder {
    color: ${getCSSVar('--transfer-search-placeholder-color', 'rgba(0, 0, 0, 0.45)')};
  }

  &:focus {
    border-color: ${getCSSVar('--transfer-search-focus-border', '#1890ff')};
  }

  &:disabled {
    background: #f5f5f5;
    cursor: not-allowed;
  }

  ${({ $styles }) => $styles && Object.entries($styles).map(([key, value]) => `${key}: ${value};`).join('\n')}
`;

/**
 * Transfer 列表内容区
 */
export const TransferListBody = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 4px 0;

  &.transfer-list-body {
    /* 外部可通过 .transfer-list-body 选择器覆盖样式 */
  }

  /* 滚动条样式 - 淡色精致设计 */
  &::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.15);
    border-radius: 4px;
    border: 2px solid transparent;
    background-clip: padding-box;
    transition: background 0.2s ease;

    &:hover {
      background: rgba(0, 0, 0, 0.25);
    }
  }

  &::-webkit-scrollbar-track {
    background: transparent;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-corner {
    background: transparent;
  }
`;

/**
 * Transfer 列表项
 */
export const TransferListItem = styled.div<{
  $selected?: boolean;
  $disabled?: boolean;
  $styles?: CSSProperties;
}>`
  height: ${getCSSVar('--transfer-item-height', '32px')};
  padding: ${getCSSVar('--transfer-item-padding', '0 12px')};
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'pointer')};
  transition: ${getCSSVar('--transfer-transition', 'all 0.3s')};
  font-size: ${getCSSVar('--transfer-item-font-size', '14px')};
  color: ${({ $disabled }) => 
    $disabled 
      ? getCSSVar('--transfer-item-disabled-color', 'rgba(0, 0, 0, 0.25)') 
      : getCSSVar('--transfer-item-text-color', 'rgba(0, 0, 0, 0.85)')};
  background: ${({ $selected }) => 
    $selected 
      ? getCSSVar('--transfer-item-selected-bg', '#e6f7ff') 
      : 'transparent'};

  &:hover {
    background: ${({ $disabled, $selected }) => 
      $disabled 
        ? 'transparent' 
        : $selected 
          ? getCSSVar('--transfer-item-selected-bg', '#e6f7ff')
          : getCSSVar('--transfer-item-hover-bg', '#f5f5f5')};
  }

  &.transfer-list-item {
    /* 外部可通过 .transfer-list-item 选择器覆盖样式 */
  }

  ${({ $styles }) => $styles && Object.entries($styles).map(([key, value]) => `${key}: ${value};`).join('\n')}
`;

/**
 * Transfer 列表项复选框
 */
export const TransferItemCheckbox = styled.span<{
  $checked?: boolean;
  $disabled?: boolean;
  $indeterminate?: boolean;
}>`
  width: 16px;
  height: 16px;
  border: 1px solid
    ${({ $checked, $indeterminate }) =>
      $checked || $indeterminate ? '#1890ff' : '#d9d9d9'};
  border-radius: 2px;
  background: ${({ $checked, $indeterminate }) =>
    $checked || $indeterminate ? '#1890ff' : '#fff'};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: all 0.3s;

  &::after {
    content: ${({ $checked, $indeterminate }) => {
      if ($indeterminate) return "'−'";
      if ($checked) return "'✓'";
      return "''";
    }};
    font-size: ${({ $indeterminate }) => ($indeterminate ? '14px' : '12px')};
    color: #fff;
    transform: scale(${({ $checked, $indeterminate }) => ($checked || $indeterminate ? 1 : 0)});
    transition: all 0.2s;
    line-height: 1;
    font-weight: ${({ $indeterminate }) => ($indeterminate ? 'bold' : 'normal')};
  }
`;

/**
 * Transfer 列表项复选框 - 普通项（只有选中/未选中两种状态）
 */
export const TransferListItemCheckbox = styled.span<{
  $checked?: boolean;
  $disabled?: boolean;
}>`
  width: 16px;
  height: 16px;
  border: 1px solid ${({ $checked }) => ($checked ? '#1890ff' : '#d9d9d9')};
  border-radius: 2px;
  background: ${({ $checked }) => ($checked ? '#1890ff' : '#fff')};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: all 0.3s;

  &::after {
    content: '✓';
    font-size: 12px;
    color: #fff;
    transform: scale(${({ $checked }) => ($checked ? 1 : 0)});
    transition: all 0.2s;
    line-height: 1;
  }
`;

/**
 * Transfer 列表项内容
 */
export const TransferItemContent = styled.span`
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

/**
 * Transfer 列表底部描述
 */
export const TransferListFooter = styled.div`
  padding: 8px ${getCSSVar('--transfer-padding', '12px')};
  border-top: 1px solid ${getCSSVar('--transfer-border-color', '#d9d9d9')};
  font-size: ${getCSSVar('--transfer-description-font-size', '12px')};
  color: ${getCSSVar('--transfer-description-color', 'rgba(0, 0, 0, 0.45)')};
  min-height: 20px;
  display: flex;
  align-items: center;

  &.transfer-list-footer {
    /* 外部可通过 .transfer-list-footer 选择器覆盖样式 */
  }
`;

/**
 * Transfer 操作按钮区
 */
export const TransferOperation = styled.div<{ $styles?: CSSProperties }>`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: ${getCSSVar('--transfer-operation-width', '40px')};
  align-items: center;

  &.transfer-operation {
    /* 外部可通过 .transfer-operation 选择器覆盖样式 */
  }

  ${({ $styles }) => $styles && Object.entries($styles).map(([key, value]) => `${key}: ${value};`).join('\n')}
`;

/**
 * Transfer 操作按钮
 */
export const TransferOperationButton = styled.button<{
  $direction: 'right' | 'left';
  $disabled?: boolean;
}>`
  width: 32px;
  height: 28px;
  border: 1px solid ${getCSSVar('--transfer-operation-border', '#d9d9d9')};
  border-radius: 4px;
  background: ${getCSSVar('--transfer-operation-bg', '#f5f5f5')};
  cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'pointer')};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: ${getCSSVar('--transfer-transition', 'all 0.3s')};
  opacity: ${({ $disabled }) => ($disabled ? 0.6 : 1)};

  &:hover:not(:disabled) {
    background: ${getCSSVar('--transfer-operation-hover-bg', '#e6f7ff')};
    border-color: ${getCSSVar('--transfer-operation-hover-border', '#1890ff')};
    color: #1890ff;
  }

  &:disabled {
    background: ${getCSSVar('--transfer-operation-disabled-bg', '#f5f5f5')};
    color: ${getCSSVar('--transfer-operation-disabled-color', 'rgba(0, 0, 0, 0.25)')};
  }

  /* 箭头图标 - 使用字符 */
  &::before {
    content: ${({ $direction }) => $direction === 'right' ? "'>'" : "'<'"};
    font-size: 14px;
    font-weight: 600;
    line-height: 1;
    color: inherit;
  }
`;

/**
 * Transfer 空状态
 */
export const TransferEmpty = styled.div`
  padding: 32px 0;
  text-align: center;
  color: ${getCSSVar('--transfer-description-color', 'rgba(0, 0, 0, 0.45)')};
  font-size: ${getCSSVar('--transfer-font-size', '14px')};

  &.transfer-empty {
    /* 外部可通过 .transfer-empty 选择器覆盖样式 */
  }
`;

/**
 * Transfer 加载状态容器
 */
export const TransferLoading = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 32px 0;

  &.transfer-loading {
    /* 外部可通过 .transfer-loading 选择器覆盖样式 */
  }
`;

/**
 * Transfer 加载动画
 */
export const TransferLoadingSpinner = styled.div`
  width: 32px;
  height: 32px;
  border: 3px solid ${getCSSVar('--transfer-loading-track-color', '#f0f0f0')};
  border-top-color: ${getCSSVar('--transfer-loading-spinner-color', '#1890ff')};
  border-radius: 50%;
  animation: transfer-spin 0.8s linear infinite;

  @keyframes transfer-spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;