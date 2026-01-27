import React from 'react';
import { Rate, Table } from '../../components';
import type { Column } from '../../components/Table';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

const RateExample: React.FC = () => {
  const [value, setValue] = React.useState<string>('0');
  const [halfValue, setHalfValue] = React.useState<string>('0');
  const [chatsValue, setChatsValue] = React.useState<string>('');

  // API参数列配置
  const apiColumns: Column[] = [
    { dataIndex: 'param', title: '参数名', width: '150px' },
    { dataIndex: 'type', title: '类型', width: '200px' },
    { dataIndex: 'default', title: '默认值', width: '150px' },
    { dataIndex: 'description', title: '描述', width: '350px' }
  ];

  // API参数数据源
  const apiDataSource = [
    { param: 'value', type: 'string', default: '0', description: '当前评分值，字符串类型。普通模式为数字字符串（如"3.5"），chats模式为字符拼接（如"ABC"）' },
    { param: 'count', type: 'number', default: '5', description: '星星总数' },
    { param: 'allowHalf', type: 'boolean', default: 'true', description: '是否允许半星' },
    { param: 'disabled', type: 'boolean', default: 'false', description: '是否只读' },
    { param: 'color', type: 'string', default: '#1677ff', description: '自定义颜色' },
    { param: 'onChange', type: 'function', default: '-', description: '评分变化回调，返回值为字符串类型' },
    { param: 'className', type: 'string', default: '-', description: '自定义类名' },
    { param: 'size', type: 'number', default: '24', description: '星星大小' },
    { param: 'chats', type: 'string[]', default: '-', description: '自定义字符数组，优先级最高，只支持整星' }
  ];

  return (
    <div style={{ padding: '20px' }}>
      <h2>Rate 组件</h2>
      <p>评分组件，用于对事物进行评分或评价。</p>
      
      {/* 基本使用示例 */}
      <div style={{ marginBottom: '40px' }}>
        <h3>基本使用</h3>
        <p>展示不同场景下的评分组件。</p>
        
        <h4>基础评分</h4>
        <div style={{ marginBottom: '20px' }}>
          <Rate value={value} onChange={setValue} />
          <span style={{ marginLeft: '10px' }}>{value} 星</span>
        </div>
        <SyntaxHighlighter language="tsx" style={vscDarkPlus} customStyle={{ borderRadius: '6px', margin: '0', fontSize: '14px', fontFamily: 'monospace' }}>
{`import { useState } from 'react';
import { Rate } from '@zjpcy/simple-design';

const [value, setValue] = useState<string>('0');

<Rate value={value} onChange={setValue} />`}
        </SyntaxHighlighter>
        
        <h4>半星评分</h4>
        <div style={{ marginBottom: '20px' }}>
          <Rate value={halfValue} onChange={setHalfValue} allowHalf />
          <span style={{ marginLeft: '10px' }}>{halfValue} 星</span>
        </div>
        <SyntaxHighlighter language="tsx" style={vscDarkPlus} customStyle={{ borderRadius: '6px', margin: '0', fontSize: '14px', fontFamily: 'monospace' }}>
{`const [halfValue, setHalfValue] = useState<string>('0');

<Rate value={halfValue} onChange={setHalfValue} allowHalf />`}
        </SyntaxHighlighter>
        
        <h4>禁用状态</h4>
        <div style={{ marginBottom: '20px' }}>
          <Rate value="3.5" disabled />
          <span style={{ marginLeft: '10px' }}>3.5 星（只读）</span>
        </div>
        <SyntaxHighlighter language="tsx" style={vscDarkPlus} customStyle={{ borderRadius: '6px', margin: '0', fontSize: '14px', fontFamily: 'monospace' }}>
{`<Rate value="3.5" disabled />`}
        </SyntaxHighlighter>
        
        <h4>自定义颜色</h4>
        <div style={{ marginBottom: '20px' }}>
          <Rate value={value} onChange={setValue} color="#ff4d4f" />
          <span style={{ marginLeft: '10px' }}>红色主题</span>
        </div>
        <div style={{ marginBottom: '20px' }}>
          <Rate value={value} onChange={setValue} color="#52c41a" />
          <span style={{ marginLeft: '10px' }}>绿色主题</span>
        </div>
        <div style={{ marginBottom: '20px' }}>
          <Rate value={value} onChange={setValue} color="#faad14" />
          <span style={{ marginLeft: '10px' }}>橙色主题</span>
        </div>
        <SyntaxHighlighter language="tsx" style={vscDarkPlus} customStyle={{ borderRadius: '6px', margin: '0', fontSize: '14px', fontFamily: 'monospace' }}>
{`<Rate value={value} onChange={setValue} color="#ff4d4f" />
<Rate value={value} onChange={setValue} color="#52c41a" />
<Rate value={value} onChange={setValue} color="#faad14" />`}
        </SyntaxHighlighter>
        
        <h4>自定义大小</h4>
        <div style={{ marginBottom: '20px' }}>
          <Rate value={value} onChange={setValue} size={16} />
          <span style={{ marginLeft: '10px' }}>小号 (16px)</span>
        </div>
        <div style={{ marginBottom: '20px' }}>
          <Rate value={value} onChange={setValue} size={24} />
          <span style={{ marginLeft: '10px' }}>中号 (24px)</span>
        </div>
        <div style={{ marginBottom: '20px' }}>
          <Rate value={value} onChange={setValue} size={32} />
          <span style={{ marginLeft: '10px' }}>大号 (32px)</span>
        </div>
        <SyntaxHighlighter language="tsx" style={vscDarkPlus} customStyle={{ borderRadius: '6px', margin: '0', fontSize: '14px', fontFamily: 'monospace' }}>
{`<Rate value={value} onChange={setValue} size={16} />
<Rate value={value} onChange={setValue} size={24} />
<Rate value={value} onChange={setValue} size={32} />`}
        </SyntaxHighlighter>
        
        <h4>自定义字符模式</h4>
        <div style={{ marginBottom: '20px' }}>
          <Rate
            value={chatsValue}
            onChange={setChatsValue}
            chats={['A', 'B', 'C', 'D', 'E']}
          />
          <span style={{ marginLeft: '10px' }}>{chatsValue || '未选择'} (长度: {chatsValue.length} / 5)</span>
        </div>
        <div style={{ marginBottom: '20px' }}>
          <Rate
            value={chatsValue}
            onChange={setChatsValue}
            chats={['1', '2', '3', '4', '5']}
          />
          <span style={{ marginLeft: '10px' }}>{chatsValue || '未选择'} (长度: {chatsValue.length} / 5)</span>
        </div>
        <SyntaxHighlighter language="tsx" style={vscDarkPlus} customStyle={{ borderRadius: '6px', margin: '0', fontSize: '14px', fontFamily: 'monospace' }}>
{`const [chatsValue, setChatsValue] = useState<string>('');

<Rate
  value={chatsValue}
  onChange={setChatsValue}
  chats={['A', 'B', 'C', 'D', 'E']}
/>

<Rate
  value={chatsValue}
  onChange={setChatsValue}
  chats={['1', '2', '3', '4', '5']}
/>`}
        </SyntaxHighlighter>
      </div>

      {/* API 文档 */}
      <div style={{ marginBottom: '40px' }}>
        <h3>API 文档</h3>
        <p>Rate 组件的属性配置。</p>
        
        <h4>Rate Props</h4>
        <Table columns={apiColumns} dataSource={apiDataSource} />
      </div>

      {/* 安装和使用说明 */}
      <div style={{ marginBottom: '40px' }}>
        <h3>安装和使用</h3>
        
        <div style={{ marginBottom: '20px' }}>
          <h4>1. 安装依赖</h4>
          <SyntaxHighlighter language="bash" style={vscDarkPlus} customStyle={{ borderRadius: '6px', margin: '0', fontSize: '14px', fontFamily: 'monospace' }}>
            {`npm i @zjpcy/simple-design`}
          </SyntaxHighlighter>
        </div>
        
        <div>
          <h4>2. 引用组件</h4>
          <SyntaxHighlighter language="tsx" style={vscDarkPlus} customStyle={{ borderRadius: '6px', margin: '0', fontSize: '14px', fontFamily: 'monospace' }}>
{`// 方式一：单独引入
import Rate from '@zjpcy/simple-design/lib/Rate';
import '@zjpcy/simple-design/lib/Rate/Rate.css';

// 方式二：批量引入
import { Rate } from '@zjpcy/simple-design';
import '@zjpcy/simple-design/lib/index.css';`}
          </SyntaxHighlighter>
        </div>
      </div>

      {/* 样式说明 */}
      <div>
        <h3>样式说明</h3>
        <p>评分组件支持多种自定义样式：</p>
        <ul>
          <li>支持自定义颜色，通过 color 属性设置</li>
          <li>支持自定义大小，通过 size 属性设置</li>
          <li>支持自定义字符模式，通过 chats 属性设置字符数组</li>
          <li>支持半星评分，通过 allowHalf 属性控制</li>
          <li>支持禁用状态，通过 disabled 属性控制</li>
        </ul>
      </div>
    </div>
  );
};

export default RateExample;
