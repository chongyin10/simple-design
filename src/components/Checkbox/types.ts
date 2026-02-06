export interface CheckboxProps {
    value?: any;
    checked?: boolean;
    defaultChecked?: boolean;
    onChange?: (checked: boolean, value: any) => void;
    disabled?: boolean;
    indeterminate?: boolean;
    children?: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
    /** 标签文案，显示在复选框前面 */
    label?: string | React.ReactNode;
    /** 标签到复选框的距离 */
    labelGap?: string | number;
    /** 标签的CSS类名 */
    labelClassName?: string;
    /** 标签的样式 */
    labelStyle?: React.CSSProperties;
}

export interface CheckboxGroupProps {
    value?: any[];
    defaultValue?: any[];
    onChange?: (checkedValues: any[]) => void;
    disabled?: boolean;
    options?: Array<{ label: string | React.ReactNode; value: any; disabled?: boolean }>;
    className?: string;
    style?: React.CSSProperties;
    children?: React.ReactNode;
    /** 排列方式：horizontal 横向排列，vertical 纵向排列 */
    layout?: 'horizontal' | 'vertical';
    /** 复选框之间的间距 */
    gap?: number | string;
}
