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
    /** 标签文案，显示在单选按钮前面 */
    label?: string | React.ReactNode;
    /** 标签到单选按钮的距离 */
    labelGap?: string | number;
    /** 标签的CSS类名 */
    labelClassName?: string;
    /** 标签的样式 */
    labelStyle?: React.CSSProperties;
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