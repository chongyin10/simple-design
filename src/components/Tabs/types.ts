import React from 'react';

export interface TabItem {
  key: string;
  label: React.ReactNode;
  content?: React.ReactNode;
  /** 渲染内容的函数，在渲染时调用，避免闭包问题 */
  renderContent?: () => React.ReactNode;
  disabled?: boolean;
  closable?: boolean;
  icon?: React.ReactNode;
}

export type TabPlacement = 'top' | 'start' | 'end' | 'bottom';

export type TabType = 'line' | 'card';

export interface TabsProps {
  items?: TabItem[];
  activeKey?: string;
  defaultActiveKey?: string;
  onChange?: (key: string) => void;
  onClose?: (key: string) => void;
  tabsClosable?: boolean;
  tabPlacement?: TabPlacement;
  type?: TabType;
  onAdd?: () => void;
  className?: string;
  style?: React.CSSProperties;
  /** 内容区域自定义类名，优先级高于内部 className */
  contentClassName?: string;
  /** 内容区域自定义样式，优先级低于外部 className 和 style */
  contentStyle?: React.CSSProperties;
  draggable?: boolean;
  onDragEnd?: (items: TabItem[]) => void;
}
