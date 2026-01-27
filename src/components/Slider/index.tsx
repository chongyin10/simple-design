import React, { useState, useRef, useEffect, useCallback } from 'react';
import './Slider.css';
import { SliderProps } from './types';

export const Slider: React.FC<SliderProps> = ({
  min = 0,
  max = 100,
  step = 1,
  value,
  defaultValue = 0,
  disabled = false,
  marks = {},
  showValue = false,
  transitionSpeed = 300,
  trackColor = '#1890ff',
  handleColor = '#1890ff',
  gradient,
  onChange,
  onAfterChange,
  className = '',
  style
}) => {
  const [internalValue, setInternalValue] = useState<number>(defaultValue);
  const [isDragging, setIsDragging] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);

  const currentValue = value !== undefined ? value : internalValue;

  const getPositionFromValue = useCallback((val: number) => {
    const ratio = (val - min) / (max - min);
    return Math.max(0, Math.min(1, ratio));
  }, [min, max]);

  const getValueFromPosition = useCallback((position: number) => {
    const ratio = Math.max(0, Math.min(1, position));
    const rawValue = min + ratio * (max - min);
    
    if (step > 0) {
      const steppedValue = Math.round(rawValue / step) * step;
      return Math.min(max, Math.max(min, steppedValue));
    }
    
    return Math.min(max, Math.max(min, rawValue));
  }, [min, max, step]);

  const getClientX = (e: MouseEvent | TouchEvent | React.MouseEvent | React.TouchEvent) => {
    if ('touches' in e) {
      return e.touches[0].clientX;
    }
    return (e as MouseEvent).clientX;
  };

  const updateValueFromPosition = useCallback((clientX: number) => {
    if (!trackRef.current || disabled) return;

    const rect = trackRef.current.getBoundingClientRect();
    const position = (clientX - rect.left) / rect.width;
    const newValue = getValueFromPosition(position);
    
    if (value === undefined) {
      setInternalValue(newValue);
    }
    onChange?.(newValue);
  }, [disabled, value, getValueFromPosition, onChange]);

  const handleMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
    if (disabled) return;
    
    e.preventDefault();
    setIsDragging(true);
    
    const clientX = getClientX(e as any);
    updateValueFromPosition(clientX);
  };

  const handleTrackClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (disabled) return;
    
    const target = e.target as HTMLElement;
    if (target.classList.contains('slider-handle')) {
      return;
    }
    
    updateValueFromPosition(e.clientX);
    onAfterChange?.(currentValue);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;

    let newValue = currentValue;
    
    switch (e.key) {
      case 'ArrowLeft':
      case 'ArrowDown':
        newValue = Math.max(min, currentValue - step);
        break;
      case 'ArrowRight':
      case 'ArrowUp':
        newValue = Math.min(max, currentValue + step);
        break;
      case 'Home':
        newValue = min;
        break;
      case 'End':
        newValue = max;
        break;
      case 'PageDown':
        newValue = Math.max(min, currentValue - step * 10);
        break;
      case 'PageUp':
        newValue = Math.min(max, currentValue + step * 10);
        break;
      default:
        return;
    }
    
    e.preventDefault();
    
    if (value === undefined) {
      setInternalValue(newValue);
    }
    onChange?.(newValue);
    onAfterChange?.(newValue);
  };

  useEffect(() => {
    if (!isDragging) return;

    const handleMove = (e: MouseEvent | TouchEvent) => {
      e.preventDefault();
      const clientX = getClientX(e);
      updateValueFromPosition(clientX);
    };

    const handleEnd = () => {
      setIsDragging(false);
      onAfterChange?.(currentValue);
    };

    document.addEventListener('mousemove', handleMove);
    document.addEventListener('mouseup', handleEnd);
    document.addEventListener('touchmove', handleMove, { passive: false });
    document.addEventListener('touchend', handleEnd);

    return () => {
      document.removeEventListener('mousemove', handleMove);
      document.removeEventListener('mouseup', handleEnd);
      document.removeEventListener('touchmove', handleMove);
      document.removeEventListener('touchend', handleEnd);
    };
  }, [isDragging, updateValueFromPosition, currentValue, onAfterChange]);

  const position = getPositionFromValue(currentValue);
  const filledWidth = `${position * 100}%`;
  const handleLeft = `${position * 100}%`;

  // 获取当前值对应的分段配置
  const getSegmentConfig = useCallback((val: number) => {
    const markEntries = Object.entries(marks).sort((a, b) => Number(a[0]) - Number(b[0]));
    
    for (let i = 0; i < markEntries.length; i++) {
      const [key, value] = markEntries[i];
      const markValue = Number(key);
      
      if (val <= markValue) {
        const config = typeof value === 'string' 
          ? { trackColor: undefined, handleColor: undefined, mark: value }
          : value;
        return config;
      }
    }
    
    // 如果值大于所有标记点，使用最后一个标记点的配置
    const lastEntry = markEntries[markEntries.length - 1];
    if (lastEntry) {
      const [_, value] = lastEntry;
      return typeof value === 'string' 
        ? { trackColor: undefined, handleColor: undefined, mark: value }
        : value;
    }
    
    return { trackColor: undefined, handleColor: undefined, mark: '' };
  }, [marks]);

  const currentSegment = getSegmentConfig(currentValue);
  
  // 获取 style 中的 CSS 变量值（如果存在）
  const styleTrackColor = style && (style as any)['--slider-track-filled-bg-color'];
  const styleHandleColor = style && (style as any)['--slider-handle-border-color'];
  
  // 判断是否可以使用 gradient
  // 只有当 marks 中没有 trackColor、style 中没有 trackColor、没有 trackColor 参数时才使用
  const canUseGradient = gradient && 
    !currentSegment.trackColor && 
    !styleTrackColor && 
    trackColor === '#1890ff'; // 只有使用默认颜色时才启用渐变
  
  // 优先级：marks > style > SliderProps > gradient > 默认
  const effectiveTrackColor = currentSegment.trackColor || styleTrackColor || trackColor;
  const effectiveHandleColor = currentSegment.handleColor || styleHandleColor || handleColor;

  const markArray = Object.entries(marks)
    .map(([key, value]) => {
      const markValue = Number(key);
      const markConfig = typeof value === 'string' 
        ? { trackColor: undefined, handleColor: undefined, mark: value }
        : value;
      
      return {
        value: markValue,
        label: markConfig.mark,
        trackColor: markConfig.trackColor,
        handleColor: markConfig.handleColor,
        position: getPositionFromValue(markValue)
      };
    })
    .sort((a, b) => a.value - b.value);

  return (
    <div 
      className={`slider-container ${disabled ? 'disabled' : ''} ${className}`}
      style={{
        ['--slider-track-filled-bg-color' as any]: effectiveTrackColor,
        ['--slider-handle-border-color' as any]: effectiveHandleColor,
        ['--slider-track-filled-transition' as any]: `width ${transitionSpeed}ms ease`,
        ['--slider-handle-transition' as any]: `all ${transitionSpeed}ms ease`,
        ...style
      }}
    >
      <div 
        ref={trackRef}
        className="slider-track"
        onClick={handleTrackClick}
        role="presentation"
      >
        <div 
          className="slider-track-filled" 
          style={{ 
            width: filledWidth,
            ...(canUseGradient && gradient ? {
              background: `linear-gradient(to right, ${gradient.startColor}, ${gradient.endColor})`
            } : {})
          }}
        />
        <div
          className="slider-handle"
          style={{ left: handleLeft }}
          onMouseDown={handleMouseDown}
          onTouchStart={handleMouseDown}
          onKeyDown={handleKeyDown}
          role="slider"
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={currentValue}
          aria-disabled={disabled}
          tabIndex={disabled ? -1 : 0}
        >
          <div className="slider-tooltip">
            {currentValue}
          </div>
        </div>
      </div>
      
      {Object.keys(marks).length > 0 && (
        <div className="slider-marks">
          {markArray.map((mark) => (
            <div
              key={mark.value}
              className="slider-mark"
              style={{ 
                left: `${mark.position * 100}%`,
                color: mark.trackColor || undefined
              }}
            >
              {mark.label}
            </div>
          ))}
        </div>
      )}
      
      {showValue && (
        <div className="slider-value-display">
          当前值：{currentValue}
        </div>
      )}
    </div>
  );
};

export default Slider;