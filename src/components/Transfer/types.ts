import { CSSProperties, ReactNode } from 'react';

/**
 * Transfer 数据项接口
 * 支持自定义字段名，通过 fieldNames 属性指定 key 和 title 对应的字段
 */
export interface TransferItem {
  /** 唯一标识（默认字段名，可通过 fieldNames.key 自定义） */
  key?: string;
  /** 显示标题（默认字段名，可通过 fieldNames.title 自定义） */
  title?: ReactNode;
  /** 是否禁用 */
  disabled?: boolean;
  /** 允许自定义字段 */
  [key: string]: any;
}

/**
 * 自定义字段名称接口
 */
export interface FieldNames {
  /** 唯一标识字段名，默认 'key' */
  key?: string;
  /** 显示标题字段名，默认 'title' */
  title?: string;
}

/**
 * Transfer 组件属性接口
 */
export interface TransferProps {
  /** 数据源 */
  dataSource: TransferItem[];
  /** 自定义字段名称 */
  fieldNames?: FieldNames;
  /** 右侧已选中的 key 集合 */
  targetKeys?: string[];
  /** 默认已选中的 key 集合（非受控模式） */
  defaultTargetKeys?: string[];
  /** 不可选择的 key 集合 */
  selectedKeys?: string[];
  /** 默认已选择的 key 集合（非受控模式） */
  defaultSelectedKeys?: string[];
  /** 是否显示搜索框 */
  showSearch?: boolean;
  /** 是否禁用整个组件 */
  disabled?: boolean;
  /** 左侧标题 */
  leftTitle?: ReactNode;
  /** 右侧标题 */
  rightTitle?: ReactNode;
  /** 左侧描述信息，显示在列表下方 */
  leftDescription?: ReactNode;
  /** 右侧描述信息，显示在列表下方 */
  rightDescription?: ReactNode;
  /** 自定义筛选函数 */
  filterOption?: (inputValue: string, item: TransferItem) => boolean;
  /** 自定义样式 */
  styles?: {
    wrapper?: CSSProperties;
    list?: CSSProperties;
    item?: CSSProperties;
    search?: CSSProperties;
    operation?: CSSProperties;
  };
  /** 列表高度，默认 300px */
  listHeight?: number | string;
  /** 列表宽度，默认 200px */
  listWidth?: number | string;
  /** 选中项发生改变时的回调 */
  onSelectChange?: (sourceSelectedKeys: string[], targetSelectedKeys: string[]) => void;
  /** 选项在两栏之间转移时的回调 */
  onChange?: (targetKeys: string[], direction: 'left' | 'right', moveKeys: string[]) => void;
  /** 搜索框内容变化时的回调 */
  onSearch?: (direction: 'left' | 'right', value: string) => void;
  /** 自定义渲染每一项 */
  render?: (item: TransferItem) => ReactNode;
  /** 自定义 header，传入 null 则不显示 header 区域 */
  header?: (props: { direction: 'left' | 'right'; dataSource: TransferItem[]; selectedKeys: string[]; sourceSelectedKeys: string[]; targetSelectedKeys: string[] }) => ReactNode | null;
  /** 自定义搜索区域，传入此函数则替换默认搜索框 */
  search?: (props: { direction: 'left' | 'right'; value: string; onChange: (value: string) => void; disabled?: boolean }) => ReactNode;
  /** 自定义 body 渲染，传入此函数则使用自定义内容替换默认列表 */
  body?: (props: { direction: 'left' | 'right'; dataSource: TransferItem[]; selectedKeys: string[]; sourceSelectedKeys: string[]; targetSelectedKeys: string[]; onSelectChange: (sourceSelectedKeys: string[], targetSelectedKeys: string[]) => void }) => ReactNode;
  /** 自定义 footer */
  footer?: (props: { direction: 'left' | 'right' }) => ReactNode;
  /** 自定义行样式 */
  rowClassName?: (item: TransferItem) => string;
  /** 模式，transfer 为双栏穿梭模式（默认），single 为单栏选择模式 */
  mode?: 'transfer' | 'single';
  /** 是否显示加载状态 */
  loading?: boolean;
  /** 自定义 loading 渲染 */
  loadingRender?: () => ReactNode;
  /** 是否开启懒加载，默认 false */
  lazyLoad?: boolean;
  /** 懒加载阈值，距离底部多少像素时触发加载，默认 100 */
  lazyLoadThreshold?: number;
  /** 懒加载回调，当滚动到阈值位置时触发，用于加载下一组数据 */
  onLazyLoad?: (direction: 'left' | 'right') => void;
}

/**
 * Transfer 列表属性接口
 */
export interface TransferListProps {
  /** 列表数据 */
  dataSource: TransferItem[];
  /** 自定义字段名称 */
  fieldNames?: FieldNames;
  /** 已选中的 key 集合 */
  selectedKeys: string[];
  /** 源列表已选中的 key 集合 */
  sourceSelectedKeys: string[];
  /** 目标列表已选中的 key 集合 */
  targetSelectedKeys: string[];
  /** 是否显示搜索框 */
  showSearch: boolean;
  /** 是否禁用 */
  disabled?: boolean;
  /** 列表标题 */
  title?: ReactNode;
  /** 列表描述 */
  description?: ReactNode;
  /** 搜索框占位符 */
  searchPlaceholder?: string;
  /** 自定义筛选函数 */
  filterOption?: (inputValue: string, item: TransferItem) => boolean;
  /** 自定义样式 */
  styles?: TransferProps['styles'];
  /** 列表高度 */
  listHeight?: number | string;
  /** 列表宽度 */
  listWidth?: number | string;
  /** 选中项改变回调 */
  onSelectChange: (sourceSelectedKeys: string[], targetSelectedKeys: string[]) => void;
  /** 搜索回调 */
  onSearch?: (value: string) => void;
  /** 自定义渲染 */
  render?: (item: TransferItem) => ReactNode;
  /** 自定义 header */
  header?: (props: { direction: 'left' | 'right'; dataSource: TransferItem[]; selectedKeys: string[]; sourceSelectedKeys: string[]; targetSelectedKeys: string[] }) => ReactNode | null;
  /** 自定义搜索区域 */
  search?: (props: { direction: 'left' | 'right'; value: string; onChange: (value: string) => void; disabled?: boolean }) => ReactNode;
  /** 自定义 body */
  body?: (props: { direction: 'left' | 'right'; dataSource: TransferItem[]; selectedKeys: string[]; sourceSelectedKeys: string[]; targetSelectedKeys: string[]; onSelectChange: (sourceSelectedKeys: string[], targetSelectedKeys: string[]) => void }) => ReactNode;
  /** 自定义 footer */
  footer?: (props: { direction: 'left' | 'right' }) => ReactNode;
  /** 方向标识 */
  direction: 'left' | 'right';
  /** 自定义行样式 */
  rowClassName?: (item: TransferItem) => string;
  /** 是否显示加载状态 */
  loading?: boolean;
  /** 自定义 loading 渲染 */
  loadingRender?: () => ReactNode;
  /** 是否开启懒加载，默认 false */
  lazyLoad?: boolean;
  /** 懒加载阈值，距离底部多少像素时触发加载，默认 100 */
  lazyLoadThreshold?: number;
  /** 懒加载回调，当滚动到阈值位置时触发，用于加载下一组数据 */
  onLazyLoad?: () => void;
}

/**
 * Transfer 操作按钮属性接口
 */
export interface TransferOperationProps {
  /** 是否禁用移动到右侧按钮 */
  moveToRightDisabled?: boolean;
  /** 是否禁用移动到左侧按钮 */
  moveToLeftDisabled?: boolean;
  /** 移动到右侧回调 */
  onMoveToRight: () => void;
  /** 移动到左侧回调 */
  onMoveToLeft: () => void;
  /** 自定义样式 */
  style?: CSSProperties;
}

/**
 * Transfer 搜索框属性接口
 */
export interface TransferSearchProps {
  /** 占位符文本 */
  placeholder?: string;
  /** 当前值 */
  value?: string;
  /** 值变化回调 */
  onChange: (value: string) => void;
  /** 是否禁用 */
  disabled?: boolean;
  /** 自定义样式 */
  style?: CSSProperties;
}
