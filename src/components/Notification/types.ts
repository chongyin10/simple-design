export type NotificationPosition = 
  | 'top-left'
  | 'top-center'
  | 'top-right'
  | 'center'
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right';

export interface NotificationProps {
  message: string;
  duration?: number;
  type?: 'info' | 'success' | 'warning' | 'error';
  position?: NotificationPosition;
  color?: string;
  top?: number;
  open?: boolean;
  clickOutsideToClose?: boolean;
  onClose?: () => void;
}