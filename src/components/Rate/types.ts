

export interface RateProps {
  /** 当前评分值 */
  value: string | number;
  /** 星星总数 */
  count?: number;
  /** 是否允许半星 */
  allowHalf?: boolean;
  /** 是否只读 */
  disabled?: boolean;
  /** 自定义颜色，默认 #1677ff */
  color?: string;
  /** 评分变化回调 */
  onChange?: (value: string) => void;
  /** 自定义类名 */
  className?: string;
  /** 星星大小 */
  size?: number;
  /**
   * 自定义字符数组，优先级最高，隐藏默认图标，只支持整星
   * 注意：chats 数组中的每个元素必须是单个字符
   * @example
   * // 正确：每个元素都是单个字符
   * chats={['A', 'B', 'C', 'D', 'E']}
   * chats={['差', '较差', '一般', '良好', '优秀']} // 错误！不支持多字符
   */
  chats?: string[];
}
