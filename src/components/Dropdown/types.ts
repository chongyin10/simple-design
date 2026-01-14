import React from 'react';

export type DropdownType = 'text' | 'button';

export interface DropdownItem {
  key: string;
  label: React.ReactNode;
  disabled?: boolean;
  onClick?: () => void;
  icon?: string | React.ReactNode;
}

export interface DropdownProps {
  items: DropdownItem[];
  type?: DropdownType;
  children?: React.ReactNode;
  trigger?: 'click' | 'hover';
  placement?: 'top' | 'bottom' | 'left' | 'right';
  disabled?: boolean;
  open?: boolean;
  ellipsis?: boolean;
  className?: string;
  style?: React.CSSProperties;
  contentStyles?: React.CSSProperties;
  onVisibleChange?: (visible: boolean) => void;
  onChange?: (item: DropdownItem) => void;
}