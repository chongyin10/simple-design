export interface RateProps {
  /** 当前评分值 */
  value: number;
  /** 星星总数 */
  count?: number;
  /** 是否允许半星 */
  allowHalf?: boolean;
  /** 是否只读 */
  disabled?: boolean;
  /** 自定义颜色，默认 #1677ff */
  color?: string;
  /** 评分变化回调 */
  onChange?: (value: number) => void;
  /** 自定义类名 */
  className?: string;
  /** 星星大小 */
  size?: number;
}
