export interface SliderProps {
  min?: number;
  max?: number;
  step?: number;
  value?: number;
  defaultValue?: number;
  disabled?: boolean;
  marks?: Record<number, string>;
  showValue?: boolean;
  transitionSpeed?: number;
  onChange?: (value: number) => void;
  onAfterChange?: (value: number) => void;
  className?: string;
  style?: React.CSSProperties;
}