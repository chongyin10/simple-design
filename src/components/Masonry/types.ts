export interface MasonryItem {
  key: React.Key;
  column?: number;
  content: React.ReactNode;
}

export interface ResponsiveConfig<T> {
  [breakpoint: number]: T;
}

export interface MasonryProps {
  items: MasonryItem[];
  columns?: number | ResponsiveConfig<number>;
  gutter?: number | ResponsiveConfig<number>;
  className?: string;
  style?: React.CSSProperties;
  classNames?: {
    container?: string | ((index: number) => string);
    column?: string | ((index: number) => string);
    item?: string | ((index: number) => string);
  };
  styles?: {
    container?: React.CSSProperties | ((index: number) => React.CSSProperties);
    column?: React.CSSProperties | ((index: number) => React.CSSProperties);
    item?: React.CSSProperties | ((index: number) => React.CSSProperties);
  };
  onLayoutChange?: (columns: number, items: MasonryItem[]) => void;
}
