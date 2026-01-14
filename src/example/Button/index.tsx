import React from 'react';
import { Button, Table } from '../../components';
import { useI18n } from '../../components';
import type { Column } from '../../components/Table';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

const ButtonExample: React.FC = () => {
  const { t } = useI18n();
  const search = t('BUTTON_SEARCH');
  const user = t('BUTTON_USER');
  const deleteText = t('BUTTON_DELETE');
  const confirm = t('BUTTON_CONFIRM');
  const warning = t('BUTTON_WARNING');
  // API参数列配置
  const apiColumns: Column[] = [
    { dataIndex: 'param', title: '参数名', width: '150px' },
    { dataIndex: 'type', title: '类型', width: '300px' },
    { dataIndex: 'default', title: '默认值', width: '150px' },
    { dataIndex: 'description', title: '描述', width: '300px' }
  ];

  // API参数数据源
  const apiDataSource = [
    { param: 'children', type: 'React.ReactNode', default: '-', description: '按钮文本内容' },
    { param: 'variant', type: "'primary' | 'secondary' | 'danger' | 'success' | 'warning'", default: 'primary', description: '按钮变体样式' },
    { param: 'size', type: "'small' | 'medium' | 'large'", default: 'medium', description: '按钮尺寸' },
    { param: 'disabled', type: 'boolean', default: 'false', description: '是否禁用按钮' },
    { param: 'onClick', type: '() => void', default: '-', description: '点击事件回调' },
    { param: 'className', type: 'string', default: '-', description: '自定义 CSS 类名' },
    { param: 'style', type: 'React.CSSProperties', default: '-', description: '自定义内联样式' },
    { param: 'icon', type: 'string | React.ReactNode', default: '-', description: '按钮前缀图标，支持字符串（内置图标名）或自定义图标节点' }
  ];

  return (
    <div style={{ padding: '20px' }}>
      <h2>Button 组件</h2>
      <p>可定制的按钮组件，支持多种样式和尺寸。</p>
      
      {/* 基本使用示例 */}
      <div style={{ marginBottom: '40px' }}>
        <h3>基本使用</h3>
        <p>展示不同变体和尺寸的按钮。</p>
        
        <h4>变体按钮</h4>
        <div style={{ marginBottom: '20px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <Button variant="primary">Primary Button</Button>
          <Button variant="secondary">Secondary Button</Button>
          <Button variant="danger">Danger Button</Button>
          <Button variant="success">Success Button</Button>
          <Button variant="warning">Warning Button</Button>
        </div>
        
        <h4>尺寸按钮</h4>
        <div style={{ marginBottom: '20px', display: 'flex', gap: '10px', alignItems: 'center' }}>
          <Button variant="primary" size="small">Small Button</Button>
          <Button variant="primary">Medium Button</Button>
          <Button variant="primary" size="large">Large Button</Button>
        </div>
        
        <h4>禁用状态</h4>
        <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
          <Button variant="primary" disabled>Disabled Primary</Button>
          <Button variant="secondary" disabled>Disabled Secondary</Button>
        </div>
        
        <h4>带图标按钮</h4>
        <div style={{ marginBottom: '20px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <Button variant="primary" icon="search">{search}</Button>
          <Button variant="secondary" icon="user">{user}</Button>
          <Button variant="danger" icon="delete">{deleteText}</Button>
          <Button variant="success" icon="check">{confirm}</Button>
          <Button variant="warning" icon="exclamation">{warning}</Button>
        </div>
        
        <h4>自定义样式</h4>
        <div style={{ marginBottom: '20px' }}>
          <Button 
            variant="primary" 
            style={{ 
              borderRadius: '20px', 
              padding: '8px 24px',
              fontSize: '16px'
            }}
          >
            Custom Style
          </Button>
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
{`import { Button } from '@zjpcy/simple-design';

// 基本用法
<Button variant="primary">
  Primary Button
</Button>

// 不同尺寸
<Button variant="secondary" size="small">
  Small Button
</Button>
<Button variant="secondary" size="large">
  Large Button
</Button>

// 禁用状态
<Button variant="danger" disabled>
  Disabled Button
</Button>

// 带图标按钮
<Button variant="primary" icon="search">
  搜索
</Button>
<Button variant="success" icon="check">
  确认
</Button>
<Button variant="danger" icon="delete">
  删除
</Button>

// 自定义样式和点击事件
<Button
  variant="success"
  style={{ borderRadius: '20px' }}
  onClick={() => {
    console.log('Button clicked!');
  }}
>
  Custom Button
</Button>`}
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
import Button from '@zjpcy/simple-design/lib/Button';
import '@zjpcy/simple-design/lib/Button/Button.css';

// 方式二：批量引入
import { Button } from '@zjpcy/simple-design';
import '@zjpcy/simple-design/lib/index.css';`}
          </SyntaxHighlighter>
        </div>
      </div>
    </div>
  );
};

export default ButtonExample;