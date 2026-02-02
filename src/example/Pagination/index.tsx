import React, { useState } from 'react';
import { Pagination, Table } from '../../components';

const PaginationExample: React.FC = () => {
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total] = useState(100);

  const handleChange = (page: number, size: number) => {
    setCurrent(page);
    if (size !== undefined) {
      setPageSize(size);
    }
  };

  const showTotal = (total: number, _: [number, number]) => (
    <span>共 {total} 条记录</span>
  );

  const columns = [
    { title: '姓名', dataIndex: 'name', key: 'name' },
    { title: '年龄', dataIndex: 'age', key: 'age' },
    { title: '地址', dataIndex: 'address', key: 'address' },
  ];

  const dataSource = Array.from({ length: total }, (_, i) => ({
    key: i,
    name: `用户 ${i + 1}`,
    age: 20 + (i % 30),
    address: `北京市朝阳区 ${i + 1} 号`,
  }));

  return (
    <div style={{ padding: '20px', height: '400px', overflow: 'auto', border: '1px solid #ddd' }}>
      <h1>Pagination 分页</h1>
      <p>测试在 Table 中下拉菜单是否被遮罩</p>
      
      <div style={{ marginBottom: '20px' }}>
        <h3>基础分页</h3>
        <Pagination
          total={total}
          current={current}
          pageSize={pageSize}
          onChange={handleChange}
          showTotal={showTotal}
          showSizeChanger
          showQuickJumper
        />
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h3>在 Table 中使用</h3>
        <Table
          columns={columns}
          dataSource={dataSource.slice((current - 1) * pageSize, current * pageSize)}
          pagination={{
            total,
            current,
            pageSize,
            onChange: handleChange,
            showTotal,
            showSizeChanger: true,
            showQuickJumper: true,
          }}
        />
      </div>

      <div style={{ height: '500px', background: '#f0f0f0', padding: '20px' }}>
        <h3>更多内容（用于测试滚动）</h3>
        <p>滚动页面，然后点击分页器的下拉菜单，测试是否被遮罩</p>
      </div>
    </div>
  );
};

export default PaginationExample;
