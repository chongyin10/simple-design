export interface RadioProps {
    value?: any;
    checked?: boolean;
    defaultChecked?: boolean;
    onChange?: (checked: boolean, value: any) => void;
    disabled?: boolean;
    size?: 'large' | 'middle' | 'small';
    children?: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
}

export interface RadioGroupProps {
    value?: any;
    defaultValue?: any;
    onChange?: (value: any) => void;
    disabled?: boolean;
    type?: 'button' | 'radio';
    size?: 'large' | 'middle' | 'small';
    className?: string;
    style?: React.CSSProperties;
    children?: React.ReactNode;
}