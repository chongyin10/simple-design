import React from 'react';

export interface AnchorLinkProps {
  href: string;
  title: string;
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export interface AnchorProps {
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  offsetTop?: number;
  affix?: boolean;
  bounds?: number;
  getContainer: () => HTMLElement;
  onChange?: (activeLink: string) => void;
}

export interface AnchorItem {
  href: string;
  title: string;
  top: number;
}
