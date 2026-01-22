export interface ModalProps {
    visible: boolean;
    title?: string;
    width?: number | string;
    height?: number | string;
    headerHeight?: number | string;
    footerHeight?: number | string;
    confirmLoading?: boolean;
    direction?: 'center' | 'top-right' | 'bottom-right' | 'normal';
    top?: number;
    footer?: null | React.ReactNode;
    bordered?: boolean;
    onCancel?: () => void;
    onOk?: () => void;
    children?: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
    getContainer?: HTMLElement | (() => HTMLElement) | false;
    okText?: string;
    cancelText?: string;
    maskStyle?: React.CSSProperties;
    maskClassName?: string;
    zIndex?: number;
}
