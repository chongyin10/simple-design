import React from 'react';
import './Breadcrumb.css';
import { BreadcrumbProps } from './types';

export const Breadcrumb: React.FC<BreadcrumbProps> = ({
  items,
  separator = '/',
  className = ''
}) => {
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <nav className={`breadcrumb ${className}`} aria-label="breadcrumb">
      <ol className="breadcrumb-list">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          
          return (
            <li key={index} className="breadcrumb-item">
              {isLast ? (
                <span className="breadcrumb-current">{item.label}</span>
              ) : (
                <>
                  {item.href ? (
                    <a href={item.href} className="breadcrumb-link">{item.label}</a>
                  ) : (
                    <span className="breadcrumb-text">{item.label}</span>
                  )}
                  {index < items.length - 1 && (
                    <span className="breadcrumb-separator">{separator}</span>
                  )}
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;