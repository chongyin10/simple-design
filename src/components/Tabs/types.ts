import React from 'react';

export interface TabItem {
  key: string;
  label: React.ReactNode;
  content: React.ReactNode;
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
  contentStyle?: React.CSSProperties;
}
