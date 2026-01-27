export interface MarkConfig {
  trackColor?: string;
  handleColor?: string;
  mark: React.ReactNode;
}

export type MarksTypes = Record<number, MarkConfig | string>;

export interface GradientConfig {
  startColor: string;
  endColor: string;
}

export interface SliderProps {
  min?: number;
  max?: number;
  step?: number;
  value?: number;
  defaultValue?: number;
  disabled?: boolean;
  marks?: MarksTypes;
  showValue?: boolean;
  transitionSpeed?: number;
  trackColor?: string;
  handleColor?: string;
  onChange?: (value: number) => void;
  onAfterChange?: (value: number) => void;
  className?: string;
  style?: React.CSSProperties;
  gradient?: GradientConfig
}
