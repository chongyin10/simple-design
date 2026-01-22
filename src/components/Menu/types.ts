export interface MenuItemProps {
  key: string;
  label: string;
  icon?: React.ReactNode;
  childrens?: MenuItemProps[];
}

export interface MenuProps {
  mode: 'horizontal' | 'vertical' | 'inline-flex' | 'inline-block';
  items: MenuItemProps[];
  className?: string;
  style?: React.CSSProperties;
  selectedKey?: string;
  collapsed?: boolean;
  onChange?: (info: MenuItemProps, key: string) => void;
  menuItemStyle?: React.CSSProperties;
}

export interface ContextProps {
  
}