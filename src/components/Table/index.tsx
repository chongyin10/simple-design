import { useState, useEffect, useRef, ReactNode } from 'react';
import Empty from '../Empty';
import Pagination from '../Pagination';
import './Table.css';

export interface Column {
    key?: string;
    dataIndex?: string;
    title?: ReactNode;
    width?: number | string;
    align?: 'left' | 'center' | 'right';
    fixed?: boolean | 'start' | 'end';
    /** 限制单元格内容显示的最大行数，超出时显示省略号 */
    maxLines?: number;
    render?: (value: any, record: any, index: number) => ReactNode;
    [key: string]: any;
}

export interface PaginationProps {
    pageSize?: number;
    total?: number;
    current?: number;
    onChange?: (page: number, pageSize: number) => void;
    [key: string]: any;
}

interface TableProps {
    dataSource?: any[];
    columns?: Column[];
    bordered?: boolean;
    scroll?: {
        x?: number | string;
        y?: number | string;
    };
    rowKey?: string | ((record: any, index: number) => string | number);
    className?: string;
    pagination?: PaginationProps | false;
    /** 自定义空状态组件 */
    empty?: ReactNode;
}

const Table = ({
    dataSource = [],
    columns = [],
    bordered = false,
    scroll = {},
    rowKey = 'key',
    className = '',
    pagination,
    empty
}: TableProps) => {
    const [fixedLeftColumns, setFixedLeftColumns] = useState<Column[]>([]);
    const [fixedRightColumns, setFixedRightColumns] = useState<Column[]>([]);
    const [normalColumns, setNormalColumns] = useState<Column[]>([]);
    const [columnWidths, setColumnWidths] = useState<number[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const tableRef = useRef<HTMLDivElement>(null);
    const headerInnerRef = useRef<HTMLDivElement>(null);
    const bodyRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (pagination && typeof pagination === 'object') {
            if (pagination.current) setCurrentPage(pagination.current);
            if (pagination.pageSize) setPageSize(pagination.pageSize);
        }
    }, [pagination]);

    const getColumnWidth = (width: number | string | undefined): number => {
        if (!width) return 0;
        return typeof width === 'number' ? width : parseInt(width, 10) || 0;
    };

    // 处理列固定
    useEffect(() => {
        const leftCols: Column[] = [];
        const rightCols: Column[] = [];
        const normalCols: Column[] = [];
        const widths: number[] = [];

        columns.forEach((col, index) => {
            const colWidth = getColumnWidth(col.width);
            widths[index] = colWidth;
            const columnWithIndex = { ...col, _index: index };
            if (col.fixed === 'start' || col.fixed === true) {
                leftCols.push(columnWithIndex);
            } else if (col.fixed === 'end') {
                rightCols.push(columnWithIndex);
            } else {
                normalCols.push(columnWithIndex);
            }
        });

        setFixedLeftColumns(leftCols);
        setFixedRightColumns(rightCols);
        setNormalColumns(normalCols);
        setColumnWidths(widths);
    }, [columns]);

    // 同步表头和表体的滚动
    const handleBodyScroll = (e: React.UIEvent<HTMLDivElement>) => {
        if (headerInnerRef.current && bodyRef.current) {
            const target = e.target as HTMLDivElement;
            // 只有当滚动的是body区域时才同步到header
            if (target === bodyRef.current && headerInnerRef.current.scrollLeft !== target.scrollLeft) {
                headerInnerRef.current.scrollLeft = target.scrollLeft;
            }
        }
    };

    const handleHeaderScroll = (e: React.UIEvent<HTMLDivElement>) => {
        if (headerInnerRef.current && bodyRef.current) {
            const target = e.target as HTMLDivElement;
            if (target === headerInnerRef.current && bodyRef.current.scrollLeft !== target.scrollLeft) {
                bodyRef.current.scrollLeft = target.scrollLeft;
            }
        }
    };

    // 分页处理
    const handlePageChange = (page: number, newPageSize: number) => {
        const newSize = newPageSize || pageSize;
        setCurrentPage(page);
        setPageSize(newSize);
        if (pagination && typeof pagination.onChange === 'function') {
            // 确保调用与Pagination组件的onChange签名兼容
            (pagination.onChange as (current: number, pageSize?: number) => void)(page, newPageSize);
        }
    };

    const getPaginationData = () => {
        if (pagination === false) {
            return null;
        }
        const total = pagination?.total || dataSource.length;
        const ps = pageSize;
        const cp = currentPage;
        const start = (cp - 1) * ps;
        const end = start + ps;
        const pagedData = dataSource.slice(start, end);
        const totalPages = Math.ceil(total / ps);

        return {
            data: pagedData,
            total,
            pageSize: ps,
            current: cp,
            totalPages
        };
    };

    // 获取行键值
    const getRowKey = (record: any, index: number): string | number => {
        if (typeof rowKey === 'function') {
            return rowKey(record, index);
        }
        return record[rowKey] || index;
    };

    // 渲染表头单元格
    const renderHeaderCell = (column: Column, index: number, colGroup: Column[]) => {
        const style: React.CSSProperties = {
            width: column.width || 'auto',
            textAlign: column.align || 'left',
            backgroundColor: '#fafafa !important',
            top: 0,
        };

        if (column.fixed === 'start' || column.fixed === true) {
            style.position = 'sticky';
            // 计算左侧固定列的累积宽度
            let leftOffset = 0;
            for (let i = 0; i < index; i++) {
                leftOffset += columnWidths[i] || 0;
            }
            style.left = `${leftOffset}px`;
            style.zIndex = 10;
        } else if (column.fixed === 'end') {
            style.position = 'sticky';
            // 计算右侧固定列的累积宽度
            let rightOffset = 0;
            for (let i = colGroup.length - 1; i > index; i--) {
                rightOffset += columnWidths[i] || 0;
            }
            style.right = `${rightOffset}px`;
            style.zIndex = 10;
        }

        return (
            <th key={column.key || column.dataIndex || column._index} style={style}>
                {column.title || ''}
            </th>
        );
    };

    // 渲染表格单元格
    const renderTableCell = (column: Column, record: any, rowIndex: number, colIndex: number, colGroup: Column[]) => {
        const style: React.CSSProperties = {
            width: column.width || 'auto',
            textAlign: column.align || 'left',
            backgroundColor: 'white',
        };

        if (column.fixed === 'start' || column.fixed === true) {
            style.position = 'sticky';
            // 计算左侧固定列的累积宽度
            let leftOffset = 0;
            for (let i = 0; i < colIndex; i++) {
                leftOffset += columnWidths[i] || 0;
            }
            style.left = `${leftOffset}px`;
            style.zIndex = 5;
        } else if (column.fixed === 'end') {
            style.position = 'sticky';
            // 计算右侧固定列的累积宽度
            let rightOffset = 0;
            for (let i = colGroup.length - 1; i > colIndex; i--) {
                rightOffset += columnWidths[i] || 0;
            }
            style.right = `${rightOffset}px`;
            style.zIndex = 5;
        }

        const lastFixedLeftIndex = fixedLeftColumns.length ? fixedLeftColumns.length - 1 : -1;
        const firstFixedRightIndex = fixedRightColumns.length ? fixedLeftColumns.length + normalColumns.length : -1;
        const shouldShowLeftShadow = (column.fixed === 'start' || column.fixed === true) && colIndex === lastFixedLeftIndex;
        const shouldShowRightShadow = column.fixed === 'end' && colIndex === firstFixedRightIndex;

        let content = column.dataIndex ? record[column.dataIndex] : null;

        if (column.render) {
            content = column.render(content, record, rowIndex);
        }

        // 处理 maxLines 属性
        const shouldApplyMaxLines = column.maxLines && column.maxLines > 0;
        const cellContent = shouldApplyMaxLines ? (
            <div className="idp-table-cell-ellipsis" style={{ WebkitLineClamp: column.maxLines }}>
                {content}
            </div>
        ) : content;

        return (
            <td
                key={column.key || column.dataIndex || column._index}
                style={style}
                className={`${shouldShowLeftShadow ? 'idp-table-fixed-left-shadow' : ''}${shouldShowRightShadow ? ' idp-table-fixed-right-shadow' : ''}${shouldApplyMaxLines ? ' idp-table-cell-has-ellipsis' : ''}`}
            >
                {cellContent}
            </td>
        );
    };

    const tableStyle: React.CSSProperties = {
        width: scroll.x ? (typeof scroll.x === 'number' ? `${scroll.x}px` : scroll.x) : 'auto',
    };

    const bodyStyle: React.CSSProperties = {
        maxHeight: scroll.y ? (typeof scroll.y === 'number' ? `${scroll.y}px` : scroll.y) : 'auto',
        overflowY: scroll.y ? 'auto' : 'visible',
        overflowX: scroll.x ? 'auto' : 'visible',
    };

    const allColumns = [...fixedLeftColumns, ...normalColumns, ...fixedRightColumns];
    const paginationData = getPaginationData();
    const displayData = paginationData ? paginationData.data : dataSource;

    const renderPagination = () => {
        if (pagination === false || !paginationData) {
            return null;
        }

        const { total, current, pageSize } = paginationData;



        return (
            <div className="custom-table-pagination-wrapper">
                <Pagination
                    total={total}
                    current={current}
                    pageSize={pageSize}
                    onChange={handlePageChange}
                    showTotal={(total: number, range: [number, number]) => `第 ${range[0]}-${range[1]} 条，共 ${total} 条`}
                    showSizeChanger={true}
                    showQuickJumper={true}
                    align="flex-end"
                    {...pagination}
                />
            </div>
        );
    };

    return (
        <div
            ref={tableRef}
            className={`custom-table-container ${bordered ? 'bordered' : ''} ${className}`}
            style={tableStyle}
        >
            {/* 表头 */}
            <div className="custom-table-header" ref={headerInnerRef} onScroll={handleHeaderScroll}>
                <table className={`custom-table ${bordered ? 'bordered' : ''}`}>
                    <colgroup>
                        {allColumns.map((col, index) => (
                            <col key={index} style={{ width: col.width || 'auto' }} />
                        ))}
                    </colgroup>
                    <thead>
                        <tr>
                            {allColumns.map((col, index) => renderHeaderCell(col, index, allColumns))}
                        </tr>
                    </thead>
                </table>
            </div>

            {/* 表体 */}
            <div
                className="custom-table-body"
                ref={bodyRef}
                style={bodyStyle}
                onScroll={handleBodyScroll}
            >
                <table className={`custom-table ${bordered ? 'bordered' : ''}`}>
                    <colgroup>
                        {allColumns.map((col, index) => (
                            <col key={index} style={{ width: col.width || 'auto' }} />
                        ))}
                    </colgroup>
                    <tbody>
                        {displayData.map((record, rowIndex) => (
                            <tr key={getRowKey(record, rowIndex)}>
                                {allColumns.map((column, colIndex) =>
                                    renderTableCell(column, record, rowIndex, colIndex, allColumns)
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {displayData.length === 0 && (
                <div className="custom-table-empty">
                    {empty || <Empty size="small" description="暂无数据" />}
                </div>
            )}

            {renderPagination()}
        </div>
    );
};

export default Table;