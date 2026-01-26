import React from 'react';

export interface CascaderOption {
  value: any;
  label: React.ReactNode;
  disabled?: boolean;
  children?: CascaderOption[];
}

export interface CascaderProps {
  value?: any[];
  defaultValue?: any[];
  onChange?: (value: any[], selectedOptions: CascaderOption[]) => void;
  options?: CascaderOption[];
  placeholder?: string;
  disabled?: boolean;
  size?: 'large' | 'middle' | 'small';
  style?: React.CSSProperties;
  className?: string;
  allowClear?: boolean;
  maxTagCount?: number;
  showSearch?: boolean;
  expandTrigger?: 'click' | 'hover';
  changeOnSelect?: boolean;
  fieldNames?: {
    label?: string;
    value?: string;
    children?: string;
  };
  width?: number | string;
  dropdownWidth?: number | string;
  dropdownHeight?: number | string;
  dropdownStyle?: React.CSSProperties;
  dropdownClassName?: string;
  placement?: 'bottomLeft' | 'bottomRight' | 'topLeft' | 'topRight';
  checkbox?: boolean;
  autoWidth?: boolean;
}
