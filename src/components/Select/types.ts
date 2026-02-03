export interface SelectOption {
    value: any;
    label: React.ReactNode;
    disabled?: boolean;
    icon?: string;
}

export interface SelectProps {
    value?: any;
    defaultValue?: any;
    onChange?: (value: any) => void;
    placeholder?: string;
    disabled?: boolean;
    size?: 'large' | 'middle' | 'small';
    style?: React.CSSProperties;
    className?: string;
    options?: SelectOption[];
    children?: React.ReactNode;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    width?: number | string;
    height?: number | string;
    dropdownHeight?: number | string;
    /** 标签文案，显示在选择器前面 */
    label?: string | React.ReactNode;
    /** 标签到选择器的距离 */
    labelGap?: string | number;
    /** 标签的CSS类名 */
    labelClassName?: string;
    /** 标签的样式 */
    labelStyle?: React.CSSProperties;
}

export interface SelectOptionProps {
    value: any;
    children: React.ReactNode;
    disabled?: boolean;
    icon?: string;
}

export interface SelectOptGroupProps {
    label: React.ReactNode;
    children?: React.ReactNode;
}
