import React, { useState } from 'react';
import { Table, Button, Empty, Icon, Flex } from '../../components';
import type { Column } from '../../components/Table';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

// 复制功能组件
const CopyBlock: React.FC<{ code: string }> = ({ code }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('复制失败:', err);
    }
  };

  return (
    <div style={{ position: 'relative', marginBottom: '16px' }}>
      <button
        onClick={handleCopy}
        style={{
          position: 'absolute',
          top: '8px',
          right: '8px',
          padding: '4px 8px',
          background: copied ? '#52c41a' : '#1890ff',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '12px',
          zIndex: 1,
        }}
      >
        {copied ? '已复制' : '复制'}
      </button>
      <SyntaxHighlighter language="tsx" style={vscDarkPlus} customStyle={{ margin: 0 }}>
        {code}
      </SyntaxHighlighter>
    </div>
  );
};

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div style={{ marginBottom: '32px' }}>
    <h2 style={{ marginTop: 0, marginBottom: '16px', color: '#333' }}>{title}</h2>
    {children}
  </div>
);

const TableExample: React.FC = () => {
  const basicColumns: Column[] = [
    { dataIndex: 'id', title: 'ID', width: '60px', align: 'center' },
    { dataIndex: 'name', title: '姓名' },
    { dataIndex: 'age', title: '年龄', width: '80px', align: 'center' },
    { dataIndex: 'gender', title: '性别', width: '80px', align: 'center' },
    { dataIndex: 'email', title: '邮箱' }
  ];

  const basicDataSource = [
    { id: 1, name: '张三', age: 25, gender: '男', email: 'zhangsan@example.com' },
    { id: 2, name: '李四', age: 30, gender: '女', email: 'lisi@example.com' },
    { id: 3, name: '王五', age: 28, gender: '男', email: 'wangwu@example.com' }
  ];

  return (
    <div style={{ padding: '20px' }}>
      <h1>Table 表格</h1>
      <p>Table 组件用于展示结构化数据，支持固定列、滚动、分页与自定义渲染。</p>

      {/* 基础用法 */}
      <Section title="基础用法">
        <div style={{ marginBottom: '16px' }}>
          <Table columns={basicColumns} dataSource={basicDataSource} />
        </div>
        <CopyBlock code={`import { Table } from '@zjpcy/simple-design';

const columns = [
  { dataIndex: 'id', title: 'ID', width: '60px', align: 'center' },
  { dataIndex: 'name', title: '姓名' },
  { dataIndex: 'age', title: '年龄', width: '80px', align: 'center' },
  { dataIndex: 'gender', title: '性别', width: '80px', align: 'center' },
  { dataIndex: 'email', title: '邮箱' }
];

const dataSource = [
  { id: 1, name: '张三', age: 25, gender: '男', email: 'zhangsan@example.com' },
  { id: 2, name: '李四', age: 30, gender: '女', email: 'lisi@example.com' },
  { id: 3, name: '王五', age: 28, gender: '男', email: 'wangwu@example.com' }
];

<Table columns={columns} dataSource={dataSource} />`} />
      </Section>

      {/* 带边框表格 */}
      <Section title="带边框表格">
        <div style={{ marginBottom: '16px' }}>
          <Table columns={basicColumns} dataSource={basicDataSource} bordered />
        </div>
        <CopyBlock code={`<Table columns={columns} dataSource={dataSource} bordered />`} />
      </Section>

      {/* 固定列 */}
      <Section title="固定列">
        <div style={{ marginBottom: '16px' }}>
          <Table
            columns={[
              { dataIndex: 'id', title: 'ID', width: '60px', align: 'center', fixed: 'start' },
              { dataIndex: 'name', title: '姓名', width: '120px' },
              { dataIndex: 'age', title: '年龄', width: '80px', align: 'center' },
              { dataIndex: 'gender', title: '性别', width: '80px', align: 'center' },
              { dataIndex: 'email', title: '邮箱', width: '200px' },
              { dataIndex: 'phone', title: '电话', width: '150px' },
              { dataIndex: 'address', title: '地址', width: '300px' },
              { dataIndex: 'city', title: '城市', width: '120px' },
              { dataIndex: 'country', title: '国家', width: '120px' },
              {
                title: '操作',
                width: '120px',
                align: 'center',
                fixed: 'end',
                render: () => (
                  <Flex align="center" justify="center" gap={8}>
                    <Button variant="primary" size="small" style={{ padding: '4px 8px', fontSize: '12px' }}>编辑</Button>
                    <Button variant="danger" size="small" style={{ padding: '4px 8px', fontSize: '12px' }}>删除</Button>
                  </Flex>
                )
              }
            ]}
            dataSource={[
              { id: 1, name: '张三', age: 25, gender: '男', email: 'zhangsan@example.com', phone: '13800138000', address: '北京市朝阳区', city: '北京', country: '中国' },
              { id: 2, name: '李四', age: 30, gender: '女', email: 'lisi@example.com', phone: '13900139000', address: '上海市浦东新区', city: '上海', country: '中国' },
              { id: 3, name: '王五', age: 28, gender: '男', email: 'wangwu@example.com', phone: '13700137000', address: '广州市天河区', city: '广州', country: '中国' }
            ]}
            scroll={{ x: '100%' }}
          />
        </div>
        <CopyBlock code={`import { Table, Button, Flex } from '@zjpcy/simple-design';

const columns = [
  { dataIndex: 'id', title: 'ID', width: '60px', align: 'center', fixed: 'start' },
  { dataIndex: 'name', title: '姓名', width: '120px' },
  { dataIndex: 'age', title: '年龄', width: '80px', align: 'center' },
  { dataIndex: 'gender', title: '性别', width: '80px', align: 'center' },
  { dataIndex: 'email', title: '邮箱', width: '200px' },
  { dataIndex: 'phone', title: '电话', width: '150px' },
  { dataIndex: 'address', title: '地址', width: '300px' },
  { dataIndex: 'city', title: '城市', width: '120px' },
  { dataIndex: 'country', title: '国家', width: '120px' },
  {
    title: '操作',
    width: '120px',
    align: 'center',
    fixed: 'end',
    render: () => (
      <Flex align="center" justify="center" gap={8}>
        <Button variant="primary" size="small">编辑</Button>
        <Button variant="danger" size="small">删除</Button>
      </Flex>
    )
  }
];

<Table columns={columns} dataSource={dataSource} scroll={{ x: '100%' }} />`} />
      </Section>

      {/* 纵向滚动 */}
      <Section title="纵向滚动">
        <div style={{ marginBottom: '16px' }}>
          <Table
            columns={basicColumns}
            dataSource={Array.from({ length: 12 }, (_, i) => ({
              id: i + 1,
              name: ['张三', '李四', '王五', '赵六', '孙七', '周八', '吴九', '郑十', '钱十一', '孙十二', '周十三', '吴十四'][i],
              age: 20 + Math.floor(Math.random() * 20),
              gender: Math.random() > 0.5 ? '男' : '女',
              email: 'user' + (i + 1) + '@example.com'
            }))}
            scroll={{ y: 300 }}
          />
        </div>
        <CopyBlock code={`<Table columns={columns} dataSource={dataSource} scroll={{ y: 300 }} />`} />
      </Section>

      {/* 限制内容行数 */}
      <Section title="限制内容行数 (maxLines)">
        <div style={{ marginBottom: '16px' }}>
          <Table
            columns={[
              { dataIndex: 'id', title: 'ID', width: '80px', align: 'center' },
              { dataIndex: 'title', title: '标题', width: '120px' },
              { dataIndex: 'content', title: '内容（限制2行）', maxLines: 2 }
            ]}
            dataSource={[
              { id: 1, title: '项目简介', content: '这是一个非常长的项目简介，包含了项目的详细背景、目标、范围和预期成果。项目将在未来六个月内完成。' },
              { id: 2, title: '技术方案', content: '采用前后端分离架构，前端使用React + TypeScript，后端使用Node.js + MySQL。整个系统将部署在云服务器上。' },
              { id: 3, title: '团队介绍', content: '我们的团队由资深工程师、产品经理、UI设计师和测试工程师组成。团队成员平均工作经验超过5年。' }
            ]}
            bordered
          />
        </div>
        <CopyBlock code={`<Table
  columns={[
    { dataIndex: 'id', title: 'ID', width: '80px', align: 'center' },
    { dataIndex: 'title', title: '标题', width: '120px' },
    { dataIndex: 'content', title: '内容（限制2行）', maxLines: 2 }
  ]}
  dataSource={dataSource}
  bordered
/>`} />
      </Section>

      {/* 分页功能 */}
      <Section title="分页功能">
        <div style={{ marginBottom: '16px' }}>
          <Table
            columns={basicColumns}
            dataSource={Array.from({ length: 100 }, (_, i) => ({
              id: i + 1,
              name: '用户' + (i + 1),
              age: 20 + Math.floor(Math.random() * 20),
              gender: Math.random() > 0.5 ? '男' : '女',
              email: 'user' + (i + 1) + '@example.com'
            }))}
            pagination={{
              total: 100,
              pageSize: 10,
              current: 1,
              onChange: (page, pageSize) => {
                console.log('当前页码:', page, '每页条数:', pageSize);
              }
            }}
          />
        </div>
        <CopyBlock code={`<Table
  columns={columns}
  dataSource={dataSource}
  pagination={{
    total: 100,
    pageSize: 10,
    current: 1,
    onChange: (page, pageSize) => {
      console.log('当前页码:', page, '每页条数:', pageSize);
    }
  }}
/>`} />
      </Section>

      {/* 分页增强功能 */}
      <Section title="分页增强功能">
        <div style={{ marginBottom: '16px' }}>
          <Table
            columns={basicColumns}
            dataSource={Array.from({ length: 200 }, (_, i) => ({
              id: i + 1,
              name: '用户' + (i + 1),
              age: 20 + Math.floor(Math.random() * 20),
              gender: Math.random() > 0.5 ? '男' : '女',
              email: 'user' + (i + 1) + '@example.com'
            }))}
            pagination={{
              total: 200,
              pageSize: 15,
              current: 1,
              showSizeChanger: true,
              showQuickJumper: true,
              showTotal: (total: number, range: [number, number]) => `显示 ${range[0]}-${range[1]} 条，共 ${total} 条`,
              onChange: (page, pageSize) => {
                console.log('当前页码:', page, '每页条数:', pageSize);
              }
            }}
          />
        </div>
        <CopyBlock code={`<Table
  columns={columns}
  dataSource={dataSource}
  pagination={{
    total: 200,
    pageSize: 15,
    current: 1,
    showSizeChanger: true,
    showQuickJumper: true,
    showTotal: (total, range) => '显示 ' + range[0] + '-' + range[1] + ' 条，共 ' + total + ' 条',
    onChange: (page, pageSize) => {
      console.log('当前页码:', page, '每页条数:', pageSize);
    }
  }}
/>`} />
      </Section>

      {/* 自定义空状态 */}
      <Section title="自定义空状态">
        <div style={{ marginBottom: '16px' }}>
          <Table
            columns={basicColumns}
            dataSource={[]}
            empty={
              <div style={{ textAlign: 'center', padding: '40px 20px' }}>
                <Empty
                  icon={<Icon type="search" size={48} color="#d9d9d9" />}
                  description="没有找到相关数据"
                >
                  <Button variant="primary">重新加载</Button>
                </Empty>
              </div>
            }
          />
        </div>
        <CopyBlock code={`import { Table, Empty, Icon, Button } from '@zjpcy/simple-design';

<Table
  columns={columns}
  dataSource={[]}
  empty={
    <div style={{ textAlign: 'center', padding: '40px 20px' }}>
      <Empty
        icon={<Icon type="search" size={48} color="#d9d9d9" />}
        description="没有找到相关数据"
      >
        <Button variant="primary">重新加载</Button>
      </Empty>
    </div>
  }
/>`} />
      </Section>

      {/* API 文档 */}
      <Section title="API">
        <h3>Table Props</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '24px' }}>
          <thead>
            <tr style={{ backgroundColor: '#f5f5f5' }}>
              <th style={{ border: '1px solid #d9d9d9', padding: '8px', textAlign: 'left' }}>属性</th>
              <th style={{ border: '1px solid #d9d9d9', padding: '8px', textAlign: 'left' }}>说明</th>
              <th style={{ border: '1px solid #d9d9d9', padding: '8px', textAlign: 'left' }}>类型</th>
              <th style={{ border: '1px solid #d9d9d9', padding: '8px', textAlign: 'left' }}>默认值</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>columns</td>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>列配置数组</td>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>Column[]</td>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>[]</td>
            </tr>
            <tr>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>dataSource</td>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>数据源数组</td>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>any[]</td>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>[]</td>
            </tr>
            <tr>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>bordered</td>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>是否显示边框</td>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>boolean</td>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>false</td>
            </tr>
            <tr>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>scroll</td>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>滚动配置</td>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>{`{ x?: number | string; y?: number | string }`}</td>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>-</td>
            </tr>
            <tr>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>rowKey</td>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>行唯一标识</td>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>string | function</td>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>'key'</td>
            </tr>
            <tr>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>pagination</td>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>分页配置，false表示禁用分页</td>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>PaginationProps | false</td>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>-</td>
            </tr>
            <tr>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>empty</td>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>自定义空状态组件</td>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>ReactNode</td>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>-</td>
            </tr>
          </tbody>
        </table>

        <h3>Column Props</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '24px' }}>
          <thead>
            <tr style={{ backgroundColor: '#f5f5f5' }}>
              <th style={{ border: '1px solid #d9d9d9', padding: '8px', textAlign: 'left' }}>属性</th>
              <th style={{ border: '1px solid #d9d9d9', padding: '8px', textAlign: 'left' }}>说明</th>
              <th style={{ border: '1px solid #d9d9d9', padding: '8px', textAlign: 'left' }}>类型</th>
              <th style={{ border: '1px solid #d9d9d9', padding: '8px', textAlign: 'left' }}>默认值</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>key</td>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>列唯一标识</td>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>string</td>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>-</td>
            </tr>
            <tr>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>dataIndex</td>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>对应数据源的字段名</td>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>string</td>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>-</td>
            </tr>
            <tr>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>title</td>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>列标题</td>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>ReactNode</td>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>-</td>
            </tr>
            <tr>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>width</td>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>列宽度</td>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>number | string</td>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>-</td>
            </tr>
            <tr>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>align</td>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>文本对齐方式</td>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>'left' | 'center' | 'right'</td>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>'left'</td>
            </tr>
            <tr>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>fixed</td>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>固定列位置</td>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>boolean | 'start' | 'end'</td>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>-</td>
            </tr>
            <tr>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>maxLines</td>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>限制单元格内容显示的最大行数</td>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>number</td>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>-</td>
            </tr>
            <tr>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>render</td>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>自定义渲染函数</td>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>{`(value, record, index) => ReactNode`}</td>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>-</td>
            </tr>
          </tbody>
        </table>
      </Section>

      {/* 安装和使用说明 */}
      <Section title="安装和使用">
        <h3>1. 安装依赖</h3>
        <CopyBlock code="npm i @zjpcy/simple-design" />

        <h3>2. 引用组件</h3>
        <CopyBlock code={`// 方式一：单独引入
import Table from '@zjpcy/simple-design/lib/Table';
import '@zjpcy/simple-design/lib/Table/Table.css';

// 方式二：批量引入
import { Table } from '@zjpcy/simple-design';
import '@zjpcy/simple-design/lib/index.css';`} />
      </Section>
    </div>
  );
};

export default TableExample;
