import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import classNames from 'classnames';
import Button from '../Button';
import Icon from '../Icon';
import Flex from '../Flex';
import { ModalProps } from './types';
import './Modal.css';

const Modal: React.FC<ModalProps> = ({
    visible,
    title = '标题',
    width = 600,
    height = 300,
    headerHeight = 40,
    footerHeight = 40,
    confirmLoading = false,
    direction = 'normal',
    top,
    onCancel,
    onOk,
    children,
    footer = null,
    bordered = false,
    className,
    style,
    okText = '确认',
    cancelText = '取消',
    getContainer = () => document.body,
    maskStyle,
    maskClassName,
    zIndex = 1000,
}) => {
    const [isVisible, setIsVisible] = useState(false);
    const [isClosing, setIsClosing] = useState(false);
    const [originOffset, setOriginOffset] = useState({ x: 0, y: 0 });
    const lastClickPointRef = useRef<{ x: number; y: number } | null>(null);
    const animationDuration = 550;

    // 当同时设置了top和direction时，direction强制使用normal
    const effectiveDirection = top !== undefined ? 'normal' : direction;

    // 计算内容区域高度
    const getHeightValue = (heightValue: number | string): number => {
        if (typeof heightValue === 'number') {
            return heightValue;
        }
        const match = heightValue.match(/^(\d+)px$/);
        return match ? parseInt(match[1], 10) : 0;
    };

    const getClickOriginOffset = () => {
        const point = lastClickPointRef.current;
        if (!point || typeof window === 'undefined') {
            return { x: 0, y: 0 };
        }
        const resolvedHeight = height ? getHeightValue(height) : 0;
        const centerX = window.innerWidth / 2;
        const centerY = top !== undefined && resolvedHeight > 0
            ? top + resolvedHeight / 2
            : window.innerHeight / 2;
        return {
            x: point.x - centerX,
            y: point.y - centerY
        };
    };

    useEffect(() => {
        const handleMouseDown = (event: MouseEvent) => {
            lastClickPointRef.current = { x: event.clientX, y: event.clientY };
        };
        document.addEventListener('mousedown', handleMouseDown, true);
        return () => {
            document.removeEventListener('mousedown', handleMouseDown, true);
        };
    }, []);

    useEffect(() => {
        if (visible) {
            const nextOffset = getClickOriginOffset();
            setOriginOffset(nextOffset);
            setIsClosing(false);
            setIsVisible(true);
        } else {
            setIsClosing(true);
            const timer = setTimeout(() => {
                setIsVisible(false);
                setIsClosing(false);
            }, animationDuration);
            return () => clearTimeout(timer);
        }
    }, [visible, animationDuration, height, top]);

    const handleCancel = () => {
        setIsClosing(true);
        const timer = setTimeout(() => {
            setIsVisible(false);
            setIsClosing(false);
            onCancel?.();
        }, animationDuration);
        return () => clearTimeout(timer);
    };

    const handleOk = () => {
        onOk?.();
    };

    const containerStyle: React.CSSProperties = {
        width: typeof width === 'number' ? `${width}px` : width,
        height: height ? (typeof height === 'number' ? `${height}px` : height) : undefined,
        top: top !== undefined ? `${top}px` : undefined,
        ['--idp-modal-origin-x' as any]: `${originOffset.x}px`,
        ['--idp-modal-origin-y' as any]: `${originOffset.y}px`,
        ...style
    };

    const headerStyle: React.CSSProperties = {
        height: typeof headerHeight === 'number' ? `${headerHeight}px` : headerHeight
    };

    const containerHeight = height ? getHeightValue(height) : 0;
    const headerHeightValue = getHeightValue(headerHeight);
    const footerHeightValue = getHeightValue(footerHeight);
    const calculatedContentHeight = containerHeight > 0
        ? Math.max(0, containerHeight - headerHeightValue - footerHeightValue)
        : undefined;

    const contentStyle: React.CSSProperties = {
        maxHeight: calculatedContentHeight ? `${calculatedContentHeight}px` : undefined
    };

    const footerStyle: React.CSSProperties = {
        height: typeof footerHeight === 'number' ? `${footerHeight}px` : footerHeight
    };

    // 渲染Modal内容
    const renderModalContent = () => {
        if (!isVisible && !isClosing) return null;

        // 合并遮罩层样式，添加zIndex
        const mergedMaskStyle = {
            zIndex,
            ...maskStyle
        };

        return (
            <div
                className={classNames(
                    'idp-modal-overlay',
                    {
                        'idp-modal-overlay--visible': isVisible,
                        'idp-modal-overlay--closing': isClosing,
                        'idp-modal-overlay--custom-top': top !== undefined
                    },
                    className,
                    maskClassName
                )}
                onClick={handleCancel}
                style={mergedMaskStyle}
            >
                <div
                        className={classNames(
                            'idp-modal-container',
                            {
                                // 显示动画
                                'idp-modal-container--center': isVisible && !isClosing && effectiveDirection === 'center',
                                'idp-modal-container--top-right': isVisible && !isClosing && effectiveDirection === 'top-right',
                                'idp-modal-container--bottom-right': isVisible && !isClosing && effectiveDirection === 'bottom-right',
                                'idp-modal-container--normal': isVisible && !isClosing && effectiveDirection === 'normal',
                                
                                // 关闭状态
                                'idp-modal-container--closing-center': isClosing && effectiveDirection === 'center',
                                'idp-modal-container--closing-top-right': isClosing && effectiveDirection === 'top-right',
                                'idp-modal-container--closing-bottom-right': isClosing && effectiveDirection === 'bottom-right',
                                'idp-modal-container--closing-normal': isClosing && effectiveDirection === 'normal',
                                'idp-modal-container--bordered': bordered
                            }
                        )}
                        style={containerStyle}
                        onClick={(e) => e.stopPropagation()}
                    >
                    <div
                        className="idp-modal-header"
                        style={headerStyle}
                    >
                        <div className="idp-modal-header__left">
                            <span className="idp-modal-header__title">{title}</span>
                        </div>
                        <div className="idp-modal-header__right">
                            <Icon
                                type="close"
                                size={24}
                                color="#339af0"
                                onClick={handleCancel}
                                style={{ cursor: 'pointer', padding: '4px' }}
                            />
                        </div>
                    </div>

                    <div
                        className="idp-modal-content"
                        style={contentStyle}
                    >
                        {children}
                    </div>

                    <Flex
                        className="idp-modal-footer"
                        align="center"
                        justify="flex-end"
                        style={Object.assign({}, footerStyle, { padding: '0px 10px' })}
                        gap={12}
                    >
                        {footer === null ? (
                            <Flex
                                className="idp-modal-footer__actions"
                                justify="flex-end"
                                gap={12}
                            >
                                <Button variant="secondary" onClick={handleCancel} disabled={confirmLoading}>
                                    {cancelText || '取消'}
                                </Button>
                                <Button variant="primary" onClick={handleOk} loading={confirmLoading}>
                                    {okText || '确认'}
                                </Button>
                            </Flex>
                        ) : (
                            footer
                        )}
                    </Flex>
                </div>
            </div>
        );
    };

    // 渲染Modal内容
    const modalContent = renderModalContent();
    
    // 如果没有内容需要渲染，直接返回null
    if (!modalContent) {
        return null;
    }
    
    // 根据getContainer属性决定渲染方式
    if (getContainer === false) {
        // 挂载在当前DOM
        return modalContent;
    } else {
        // 获取挂载容器
        const container = typeof getContainer === 'function' ? getContainer() : getContainer;
        // 只有当container存在时才使用createPortal，否则直接渲染
        if (container) {
            // 使用createPortal挂载到指定容器
            return createPortal(modalContent, container);
        } else {
            return modalContent;
        }
    }
};

export default Modal;
