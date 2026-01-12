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
