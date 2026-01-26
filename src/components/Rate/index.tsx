import React, { useState, useRef, useMemo, useCallback } from 'react';
import './Rate.css';
import { RateProps } from './types';
import Icon from '../Icon/Icon';

export const Rate: React.FC<RateProps> = ({
  value = 0,
  count = 5,
  allowHalf = true,
  disabled = false,
  color = '#1677ff',
  onChange,
  className = '',
  size = 24
}) => {
  const [hoverValue, setHoverValue] = useState<number>(0);
  const starElementsRef = useRef<(HTMLSpanElement | null)[]>([]);
  const lastHoverValueRef = useRef<number>(0);
  
  // 初始化ref数组
  if (starElementsRef.current.length !== count) {
    starElementsRef.current = Array(count).fill(null);
  }

  // 直接计算当前显示的值，不要额外的state，避免更新延迟
  const currentValue = hoverValue || value;

  const handleRef = useCallback((index: number) => (el: HTMLSpanElement | null) => {
    starElementsRef.current[index] = el;
  }, []);

  // 使用useMemo缓存计算结果，避免重复计算
  const starStates = useMemo(() => {
    return Array.from({ length: count }).map((_, index) => {
      const starValue = index + 1;
      
      // 计算当前星星的状态
      let isFull = false;
      let isHalf = false;
      
      if (currentValue >= starValue) {
        // 如果当前值大于等于星星的值，显示全星
        isFull = true;
      } else if (allowHalf && currentValue > index && currentValue < starValue) {
        // 如果在星星范围内且允许半星，显示半星
        isHalf = true;
      }
      
      return {
        index,
        isHalf,
        isFull,
        iconType: isHalf ? 'half' : (isFull ? 'full' : 'empty'),
        iconColor: isFull || isHalf ? color : '#d9d9d9'
      };
    });
  }, [count, currentValue, allowHalf, color]);

  return (
    <div
      className={`rate ${disabled ? 'disabled' : ''} ${className}`}
      style={{
        '--rate-color': color,
      } as React.CSSProperties}
    >
      {starStates.map((star) => (
        <span
          key={star.index}
          ref={handleRef(star.index)}
          className="rate-star"
          style={{ fontSize: `${size}px` }}
        >
          {/* 背景空心图标 */}
          <Icon 
            type="starOutline" 
            size={size} 
            color="#d9d9d9"
            className="rate-star-bg"
          />
          
          {/* 左半区域 - 控制半星 */}
          <span
            className="rate-star-left"
            onMouseEnter={(e) => {
              if (!disabled && allowHalf) {
                e.stopPropagation();
                const newValue = star.index + 0.5;
                if (newValue !== lastHoverValueRef.current) {
                  lastHoverValueRef.current = newValue;
                  setHoverValue(newValue);
                }
              }
            }}
            onMouseLeave={(e) => {
              if (!disabled && allowHalf) {
                e.stopPropagation();
                // 如果当前值就是半星，移出时回到实际值
                if (hoverValue === star.index + 0.5) {
                  setHoverValue(0);
                  lastHoverValueRef.current = 0;
                }
              }
            }}
            onClick={(e) => {
              if (!disabled && allowHalf) {
                e.stopPropagation();
                onChange?.(star.index + 0.5);
              }
            }}
          />
          
          {/* 右半区域 - 控制全星 */}
          <span
            className="rate-star-right"
            onMouseEnter={(e) => {
              if (!disabled) {
                e.stopPropagation();
                const newValue = star.index + 1;
                if (newValue !== lastHoverValueRef.current) {
                  lastHoverValueRef.current = newValue;
                  setHoverValue(newValue);
                }
              }
            }}
            onMouseLeave={(e) => {
              if (!disabled) {
                e.stopPropagation();
                // 如果当前值就是全星，移出时回到实际值
                if (hoverValue === star.index + 1) {
                  setHoverValue(0);
                  lastHoverValueRef.current = 0;
                }
              }
            }}
            onClick={(e) => {
              if (!disabled) {
                e.stopPropagation();
                onChange?.(star.index + 1);
              }
            }}
          />
          
          {/* 前景实心图标，通过CSS控制显示区域 */}
          <span 
            className={`rate-star-fill ${star.isHalf ? 'half' : ''} ${star.isFull ? 'full' : ''}`}
            style={{ color: star.iconColor }}
          >
            <Icon 
              type="star" 
              size={size} 
              color={star.iconColor}
              className="rate-star-icon"
            />
          </span>
        </span>
      ))}
    </div>
  );
};

export default Rate;
