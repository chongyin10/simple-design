export interface SelectOption {
    value: any;
    label: React.ReactNode;
    disabled?: boolean;
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
}

export interface SelectOptionProps {
    value: any;
    children: React.ReactNode;
    disabled?: boolean;
}

export interface SelectOptGroupProps {
    label: React.ReactNode;
    children?: React.ReactNode;
}
