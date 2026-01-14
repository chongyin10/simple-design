import React from 'react';
import { Space, Button, Input, Select, Table } from '../../components';
import type { Column } from '../../components/Table';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

const SpaceExample: React.FC = () => {
  // API参数列配置
  const apiColumns: Column[] = [
    { dataIndex: 'param', title: '参数名', width: '150px' },
    { dataIndex: 'type', title: '类型', width: '300px' },
    { dataIndex: 'default', title: '默认值', width: '150px' },
    { dataIndex: 'description', title: '描述', width: '300px' }
  ];

  // API参数数据源
  const apiDataSource = [
    { param: 'children', type: 'React.ReactNode', default: '-', description: '子元素' },
    { param: 'gap', type: 'number | string', default: '12px', description: '间距大小，可以是数字（px）或字符串' },
    { param: 'align', type: "'start' | 'end' | 'center' | 'baseline' | 'stretch'", default: 'center', description: '水平对齐方式' },
    { param: 'wrap', type: "'nowrap' | 'wrap' | 'wrap-reverse'", default: 'nowrap', description: '包裹方式' },
    { param: 'className', type: 'string', default: '-', description: '类名' },
    { param: 'style', type: 'React.CSSProperties', default: '-', description: '样式' },
    { param: 'inline', type: 'boolean', default: 'false', description: '是否为内联元素' }
  ];

  return (
    <div style={{ padding: '20px' }}>
      <h2>Space 组件</h2>
      <p>设置组件之间的间距，避免组件紧贴在一起，拉开统一的空间。</p>
      
      {/* 基本使用示例 */}
      <div style={{ marginBottom: '40px' }}>
        <h3>基本使用</h3>
        <p>适合行内元素的水平间距。</p>
        
        <div style={{ marginBottom: '20px', padding: '10px', border: '1px solid #eee', borderRadius: '8px' }}>
          <Space gap={16}>
            <Button variant="primary">按钮1</Button>
            <Button variant="secondary">按钮2</Button>
            <Button variant="success">按钮3</Button>
            <Button variant="warning">按钮4</Button>
            <Button variant="danger">按钮5</Button>
          </Space>
        </div>
      </div>
      
      {/* 对齐方式示例 */}
      <div style={{ marginBottom: '40px' }}>
        <h3>对齐方式</h3>
        <p>可以设置各种水平对齐方式。</p>
        
        <h4>居中对齐 (默认)</h4>
        <div style={{ marginBottom: '20px', padding: '10px', border: '1px solid #eee', borderRadius: '8px' }}>
          <Space gap={12} align="center">
            <Button variant="primary" size="small">小按钮</Button>
            <Button variant="secondary" size="medium">中等按钮</Button>
            <Button variant="success" size="large">大按钮</Button>
          </Space>
        </div>
        
        <h4>顶部对齐</h4>
        <div style={{ marginBottom: '20px', padding: '10px', border: '1px solid #eee', borderRadius: '8px' }}>
          <Space gap={12} align="start">
            <Button variant="primary" size="small">小按钮</Button>
            <Button variant="secondary" size="medium">中等按钮</Button>
            <Button variant="success" size="large">大按钮</Button>
          </Space>
        </div>
        
        <h4>底部对齐</h4>
        <div style={{ marginBottom: '20px', padding: '10px', border: '1px solid #eee', borderRadius: '8px' }}>
          <Space gap={12} align="end">
            <Button variant="primary" size="small">小按钮</Button>
            <Button variant="secondary" size="medium">中等按钮</Button>
            <Button variant="success" size="large">大按钮</Button>
          </Space>
        </div>
        
        <h4>基线对齐</h4>
        <div style={{ marginBottom: '20px', padding: '10px', border: '1px solid #eee', borderRadius: '8px' }}>
          <Space gap={12} align="baseline">
            <Input style={{ width: '120px' }} placeholder="输入框" />
            <Button variant="primary">按钮</Button>
            <Select
              style={{ width: '120px' }}
              options={[
                { value: '1', label: '选项1' },
                { value: '2', label: '选项2' },
                { value: '3', label: '选项3' }
              ]}
              placeholder="选择框"
            />
          </Space>
        </div>
      </div>
      
      {/* 内联模式示例 */}
      <div style={{ marginBottom: '40px' }}>
        <h3>内联模式</h3>
        <p>设置 inline 属性为 true，使 Space 组件表现为内联元素。</p>
        
        <div style={{ marginBottom: '20px', padding: '10px', border: '1px solid #eee', borderRadius: '8px' }}>
          <p>
            这是一段文本，
            <Space gap={8} inline>
              <Button variant="primary" size="small">按钮1</Button>
              <Button variant="secondary" size="small">按钮2</Button>
            </Space>
            在文本中间插入内联按钮。
          </p>
        </div>
      </div>
      
      {/* 换行模式示例 */}
      <div style={{ marginBottom: '40px' }}>
        <h3>换行模式</h3>
        <p>当子元素超出容器宽度时，设置 wrap 属性为 wrap 可以自动换行。</p>
        
        <div style={{ marginBottom: '20px', padding: '10px', border: '1px solid #eee', borderRadius: '8px', width: '400px' }}>
          <Space gap={12} wrap="wrap">
            <Button variant="primary" size="small">按钮1</Button>
            <Button variant="secondary" size="small">按钮2</Button>
            <Button variant="success" size="small">按钮3</Button>
            <Button variant="warning" size="small">按钮4</Button>
            <Button variant="danger" size="small">按钮5</Button>
            <Button variant="primary" size="small">按钮6</Button>
            <Button variant="secondary" size="small">按钮7</Button>
            <Button variant="success" size="small">按钮8</Button>
          </Space>
        </div>
      </div>
      
      {/* API 文档 */}
      <div style={{ marginBottom: '40px', padding: '20px', background: '#fafafa', borderRadius: '8px' }}>
        <h3>API 参数</h3>
        <Table pagination={false} columns={apiColumns} dataSource={apiDataSource} />
      </div>
      
      {/* 代码示例 */}
      <div style={{ marginBottom: '40px' }}>
        <h3>代码示例</h3>
        <SyntaxHighlighter language="tsx" style={vscDarkPlus} customStyle={{ borderRadius: '6px', margin: '0' }}>
{`import { Space, Button } from '@zjpcy/simple-design';

// 基本用法
<Space gap={16}>
  <Button variant="primary">按钮1</Button>
  <Button variant="secondary">按钮2</Button>
  <Button variant="success">按钮3</Button>
</Space>

// 对齐方式
<Space gap={12} align="center">
  <Button variant="primary" size="small">小按钮</Button>
  <Button variant="secondary" size="medium">中等按钮</Button>
  <Button variant="success" size="large">大按钮</Button>
</Space>

<Space gap={12} align="start">
  {/* 顶部对齐 */}
</Space>

<Space gap={12} align="end">
  {/* 底部对齐 */}
</Space>

<Space gap={12} align="baseline">
  {/* 基线对齐 */}
</Space>

// 内联模式
<p>
  这是一段文本，
  <Space gap={8} inline>
    <Button variant="primary" size="small">按钮1</Button>
    <Button variant="secondary" size="small">按钮2</Button>
  </Space>
  在文本中间插入内联按钮。
</p>

// 换行模式
<div style={{ width: '400px' }}>
  <Space gap={12} wrap="wrap">
    <Button variant="primary" size="small">按钮1</Button>
    <Button variant="secondary" size="small">按钮2</Button>
    <Button variant="success" size="small">按钮3</Button>
    <Button variant="warning" size="small">按钮4</Button>
    <Button variant="danger" size="small">按钮5</Button>
    <Button variant="primary" size="small">按钮6</Button>
    <Button variant="secondary" size="small">按钮7</Button>
    <Button variant="success" size="small">按钮8</Button>
  </Space>
</div>`}
        </SyntaxHighlighter>
      </div>
      
      {/* 在其他项目中引用示例 */}
      <div>
        <h3>在其他项目中引用</h3>
        <div style={{ margin: '15px 0' }}>
          <h4>1. 安装</h4>
          <SyntaxHighlighter language="bash" style={vscDarkPlus} customStyle={{ borderRadius: '6px', margin: '0', fontSize: '14px', fontFamily: 'monospace' }}>
            {`npm i @zjpcy/simple-design`}
          </SyntaxHighlighter>
        </div>
        <div>
          <h4>2. 引用组件</h4>
          <SyntaxHighlighter language="tsx" style={vscDarkPlus} customStyle={{ borderRadius: '6px', margin: '0', fontSize: '14px', fontFamily: 'monospace' }}>
{`// 方式一：单独引入
import Space from '@zjpcy/simple-design/lib/Space';
import '@zjpcy/simple-design/lib/Space/Space.css';

// 方式二：批量引入
import { Space } from '@zjpcy/simple-design';
import '@zjpcy/simple-design/lib/index.css';`}
          </SyntaxHighlighter>
        </div>
      </div>
    </div>
  );
};

export default SpaceExample;