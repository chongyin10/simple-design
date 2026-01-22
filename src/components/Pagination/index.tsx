import React, { useState, useEffect } from 'react';
import Select from '../Select';
import './Pagination.css';
import type { PaginationProps } from './types';

const Pagination: React.FC<PaginationProps> = ({
  total = 0,
  current: externalCurrent,
  pageSize: externalPageSize = 10,
  onChange,
  pageSizeOptions = ['10', '20', '50', '100'],
  showSizeChanger = false,
  showQuickJumper = false,
  showTotal,
  size = 'default',
  align,
  className = '',
  style
}) => {
  // 内部状态管理
  const [internalCurrent, setInternalCurrent] = useState(1);
  const [internalPageSize, setInternalPageSize] = useState(externalPageSize);
  
  // 使用外部传入的值或内部状态
  const current = externalCurrent !== undefined ? externalCurrent : internalCurrent;
  const pageSize = externalPageSize !== undefined ? externalPageSize : internalPageSize;
  
  // 计算总页数
  const totalPages = Math.ceil(total / pageSize);
  
  // 确保当前页在有效范围内
  useEffect(() => {
    if (current > totalPages && totalPages > 0) {
      const newCurrent = totalPages;
      if (externalCurrent === undefined) {
        setInternalCurrent(newCurrent);
      }
      if (onChange) {
        onChange(newCurrent, pageSize);
      }
    }
  }, [current, totalPages, externalCurrent, pageSize, onChange]);

  // 生成页码数组
  const generatePages = (): (number | string)[] => {
    if (totalPages <= 7) {
      // 如果总页数小于等于7，直接显示所有页码
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    
    const pages: (number | string)[] = [];
    
    // 第一页始终显示
    pages.push(1);
    
    if (current <= 4) {
      // 当前页靠近开头
      for (let i = 2; i <= 5; i++) {
        pages.push(i);
      }
      pages.push('...');
      pages.push(totalPages);
    } else if (current >= totalPages - 3) {
      // 当前页靠近结尾
      pages.push('...');
      for (let i = totalPages - 4; i <= totalPages - 1; i++) {
        pages.push(i);
      }
      pages.push(totalPages);
    } else {
      // 当前页在中间
      pages.push('...');
      for (let i = current - 1; i <= current + 1; i++) {
        pages.push(i);
      }
      pages.push('...');
      pages.push(totalPages);
    }
    
    return pages;
  };

  // 处理页码变化
  const handlePageChange = (page: number) => {
    if (page === current || page < 1 || page > totalPages) return;
    
    if (externalCurrent === undefined) {
      setInternalCurrent(page);
    }
    
    if (onChange) {
      onChange(page, pageSize);
    }
  };

  // 处理上一页
  const handlePrev = () => {
    if (current > 1) {
      handlePageChange(current - 1);
    }
  };

  // 处理下一页
  const handleNext = () => {
    if (current < totalPages) {
      handlePageChange(current + 1);
    }
  };

  // 处理每页条数变化
  const handlePageSizeChange = (value: any) => {
    const newPageSize = parseInt(value, 10);
    if (externalPageSize === undefined) {
      setInternalPageSize(newPageSize);
    }
    
    // 重新计算当前页
    const newCurrent = 1; // 切换每页条数时回到第一页
    if (externalCurrent === undefined) {
      setInternalCurrent(newCurrent);
    }
    
    if (onChange) {
      onChange(newCurrent, newPageSize);
    }
  };

  // 处理快速跳转
  const handleQuickJump = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const input = e.target as HTMLInputElement;
      const page = parseInt(input.value, 10);
      
      if (!isNaN(page) && page >= 1 && page <= totalPages) {
        handlePageChange(page);
        input.value = ''; // 清空输入框
      }
    }
  };

  // 计算当前页显示的数据范围
  const startItem = (current - 1) * pageSize + 1;
  const endItem = Math.min(current * pageSize, total);

  const alignClass = align === 'center' ? 'align-center' : align === 'flex-end' ? 'align-right' : '';
  return (
    <div className={`idp-pagination ${size === 'small' ? 'mini' : ''} ${alignClass} ${className}`} style={style}>
      {showTotal && (
        <div className="idp-pagination-total-text">
          {showTotal(total, [startItem, endItem])}
        </div>
      )}
      
      <ul className="idp-pagination-list">
        <li
          className={`idp-pagination-prev ${current <= 1 ? 'idp-pagination-prev-disabled' : ''}`}
          onClick={() => handlePrev()}
        >
          &lt;
        </li>
        
        {generatePages().map((page, index) => (
          <li
            key={index}
            className={
              typeof page === 'number'
                ? `idp-pagination-item ${
                    page === current
                      ? 'idp-pagination-item-active'
                      : ''
                  }`
                : 'idp-pagination-ellipsis'
            }
            onClick={() => typeof page === 'number' && handlePageChange(page)}
          >
            {page}
          </li>
        ))}
        
        <li
          className={`idp-pagination-next ${current >= totalPages ? 'idp-pagination-next-disabled' : ''}`}
          onClick={() => handleNext()}
        >
          &gt;
        </li>
      </ul>
      
      {(showSizeChanger || showQuickJumper) && (
        <div className="idp-pagination-options">
          {showSizeChanger && (
            <Select
              className="idp-pagination-options-size-changer"
              value={pageSize}
              onChange={handlePageSizeChange}
              options={pageSizeOptions.map((option: string) => ({
                value: parseInt(option, 10),
                label: `${option} 条/页`
              }))}
              style={{ width: 120 }}
            />
          )}
          
          {showQuickJumper && (
            <div className="idp-pagination-options-quick-jumper">
              <div style={{ minWidth: '30px' }}>跳至</div>
              <input
                type="text"
                onKeyPress={handleQuickJump}
                placeholder="页码"
              />
              页
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Pagination;