// CopyToClipboard组件类型定义
export interface CopyToClipboardProps {
  url: string;
  onCopyStatusChange?: (status: 'success' | 'error') => void;
  children?: React.ReactNode;
}