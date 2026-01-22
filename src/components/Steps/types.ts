import React from 'react';

export type StepStatus = 'wait' | 'process' | 'finish' | 'error';

export interface StepItem {
    title?: React.ReactNode;
    description?: React.ReactNode;
    node?: React.ReactNode;
    status?: StepStatus;
    disabled?: boolean;
    tailColor?: string; // 自定义连接线颜色
    tailTitle?: React.ReactNode; // 连接线上方显示的标题
    tailType?: 'solid' | 'dashed'; // 连接线类型：实线或虚线
}

export interface StepsProps {
    current?: number;
    status?: StepStatus;
    direction?: 'horizontal' | 'vertical';
    size?: 'default' | 'small';
    type?: 'default' | 'panel'; // 步骤条类型：默认或面板
    items: StepItem[];
    onChange?: (current: number) => void;
    className?: string;
    style?: React.CSSProperties;
}

export interface StepContextType {
    current: number;
    status: StepStatus;
    direction: 'horizontal' | 'vertical';
    size: 'default' | 'small';
    type: 'default' | 'panel';
    onChange?: (current: number) => void;
}