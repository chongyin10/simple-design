import React from 'react';

export interface NavigationItem {
    key: string;
    name: string;
    description?: string;
    icon?: React.ReactNode;
    childrens?: NavigationItem[];
    disabled?: boolean;
}

export type NavigationMode = 'vertical' | 'horizontal';

export interface NavigationProps {
    items: NavigationItem[];
    selectedKey?: string;
    collapsed?: boolean;
    defaultOpenKeys?: string[];
    mode?: NavigationMode;
    closeOnOutsideClick?: boolean;
    header?: React.ReactNode;
    footer?: React.ReactNode;
    onChange?: (item: NavigationItem, key: string) => void;
    onCollapseChange?: (collapsed: boolean) => void;
    className?: string;
    style?: React.CSSProperties;
    width?: number;
    collapsedWidth?: number;
    animationDuration?: number;
}

export interface NavigationState {
    openKeys: string[];
    selectedKey: string;
    collapsed: boolean;
}

export interface NavigationContextType {
    openKeys: string[];
    selectedKey: string;
    collapsed: boolean;
    keyRef: React.RefObject<string>;
    clickNodeRef: React.RefObject<NavigationItem | null>;
    toggleOpenKey: (key: string) => void;
    setSelectedKey: (key: string) => void;
    toggleCollapsed: () => void;
}

export {};
