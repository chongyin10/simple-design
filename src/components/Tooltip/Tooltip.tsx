import React, { useState, useRef, useEffect } from 'react';
import './Tooltip.css';

export interface TooltipProps {
    children: React.ReactElement;
    title?: React.ReactNode;
    placement?: 'top' | 'bottom' | 'left' | 'right';
    trigger?: 'hover' | 'click';
    delay?: number;
    open?: boolean;
    backgroundColor?: string;
    style?: React.CSSProperties;
    className?: string;
}

const Tooltip: React.FC<TooltipProps> = ({
    children,
    title,
    placement = 'top',
    trigger = 'hover',
    delay = 300,
    open,
    backgroundColor,
    style = {},
    className = ''
}) => {
    const [visible, setVisible] = useState(false);
    const [position, setPosition] = useState({ top: 0, left: 0 });
    const containerRef = useRef<HTMLSpanElement>(null);
    const tooltipRef = useRef<HTMLDivElement>(null);
    const timeoutRef = useRef<number | null>(null);

    // 受控模式：使用 open；非受控模式：使用内部 visible
    const isTooltipVisible = open !== undefined ? open : visible;

    const updatePosition = () => {
        if (!containerRef.current || !tooltipRef.current) return;

        const containerRect = containerRef.current.getBoundingClientRect();
        const tooltipRect = tooltipRef.current.getBoundingClientRect();
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

        let top = 0;
        let left = 0;

        switch (placement) {
            case 'top':
                top = containerRect.top - tooltipRect.height - 8;
                left = containerRect.left + (containerRect.width - tooltipRect.width) / 2;
                break;
            case 'bottom':
                top = containerRect.bottom + 8;
                left = containerRect.left + (containerRect.width - tooltipRect.width) / 2;
                break;
            case 'left':
                top = containerRect.top + (containerRect.height - tooltipRect.height) / 2;
                left = containerRect.left - tooltipRect.width - 8;
                break;
            case 'right':
                top = containerRect.top + (containerRect.height - tooltipRect.height) / 2;
                left = containerRect.right + 8;
                break;
        }

        setPosition({ top: top + scrollTop, left: left + scrollLeft });
    };

    const handleMouseEnter = () => {
        if (title && open === undefined) {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
            timeoutRef.current = setTimeout(() => {
                setVisible(true);
                requestAnimationFrame(updatePosition);
            }, delay);
        }
    };

    const handleMouseLeave = () => {
        if (open === undefined) {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
                timeoutRef.current = null;
            }
            setVisible(false);
        }
    };

    const handleClick = () => {
        if (trigger === 'click' && open === undefined) {
            setVisible(!visible);
        }
    };

    // 检查点击是否发生在组件外部
    const handleClickOutside = (event: MouseEvent) => {
        if (trigger !== 'click' || open !== undefined || !visible) return;

        const target = event.target as Node;
        if (containerRef.current && !containerRef.current.contains(target) && tooltipRef.current && !tooltipRef.current.contains(target)) {
            setVisible(false);
        }
    };

    useEffect(() => {
        if (isTooltipVisible) {
            requestAnimationFrame(updatePosition);
            const handleResize = () => updatePosition();
            const handleScroll = () => updatePosition();

            window.addEventListener('resize', handleResize);
            window.addEventListener('scroll', handleScroll, true);

            // 为 click 触发方式添加外部点击关闭功能（仅在非受控模式下）
            if (trigger === 'click' && open === undefined) {
                document.addEventListener('click', handleClickOutside);
            }

            return () => {
                window.removeEventListener('resize', handleResize);
                window.removeEventListener('scroll', handleScroll, true);
                if (trigger === 'click' && open === undefined) {
                    document.removeEventListener('click', handleClickOutside);
                }
            };
        }
    }, [isTooltipVisible, placement, trigger, open]);

    // 清理 timeout
    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    return (
        <>
            <span
                ref={containerRef}
                onMouseEnter={trigger === 'hover' ? handleMouseEnter : undefined}
                onMouseLeave={trigger === 'hover' ? handleMouseLeave : undefined}
                onClick={trigger === 'click' ? handleClick : undefined}
                style={{ display: 'inline-block' }}
            >
                {children}
            </span>
            {isTooltipVisible && title && (
                <div
                    ref={tooltipRef}
                    className={`idp-tooltip idp-tooltip-${placement} ${className}`}
                    style={{
                        position: 'fixed',
                        top: position.top,
                        left: position.left,
                        zIndex: 1000,
                        backgroundColor: backgroundColor,
                        ...style
                    }}
                    onMouseEnter={trigger === 'hover' && open === undefined ? () => setVisible(true) : undefined}
                    onMouseLeave={trigger === 'hover' && open === undefined ? () => setVisible(false) : undefined}
                >
                    <div className="idp-tooltip-content">{title}</div>
                    <div
                        className="idp-tooltip-arrow"
                        style={{ backgroundColor: backgroundColor }}
                    />
                </div>
            )}
        </>
    );
};

export default Tooltip;

