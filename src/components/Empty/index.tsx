import React from 'react';
import { EmptyProps } from './types';
import Icon from '../Icon/Icon';
import { useI18n } from '../../i18n/I18nProvider';
import './Empty.css';

const Empty: React.FC<EmptyProps> = ({
  icon,
  image,
  description,
  children,
  size = 'middle',
  style,
  className
}) => {
  const { t } = useI18n();
  const defaultDescription = t('EMPTY_DESCRIPTION');
  return (
    <div className={`idp-empty idp-empty--${size} ${className || ''}`} style={style}>
      <div className="idp-empty__icon-wrapper">
        {icon && <div className="idp-empty__icon">{icon}</div>}
        {image && <img src={image} alt="empty" className="idp-empty__image" />}
        {!icon && !image && (
          <Icon type="file-text" size={size === 'large' ? 64 : size === 'small' ? 32 : 48} color="#d9d9d9" />
        )}
      </div>
      <div className="idp-empty__description">{description || defaultDescription}</div>
      {children && <div className="idp-empty__actions">{children}</div>}
    </div>
  );
};

export default Empty;