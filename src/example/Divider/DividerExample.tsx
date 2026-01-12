import React from 'react';
import { Divider, Table } from '../../components';
import type { Column } from '../../components/Table';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

const DividerExample: React.FC = () => {
  // API参数列配置
  const apiColumns: Column[] = [
    { dataIndex: 'param', title: '参数名', width: '150px' },
    { dataIndex: 'type', title: '类型', width: '300px' },
    { dataIndex: 'default', title: '默认值', width: '150px' },
    { dataIndex: 'description', title: '描述', width: '300px' }
  ];

  // API参数数据源
  const apiDataSource = [
    { param: 'orientation', type: "'horizontal' | 'vertical'", default: 'horizontal', description: '分割线方向' },
    { param: 'type', type: "'solid' | 'dashed'", default: 'solid', description: '分割线类型' },
    { param: 'color', type: 'string', default: '#339af0', description: '分割线颜色' },
    { param: 'className', type: 'string', default: '-', description: '自定义 CSS 类名' },
    { param: 'style', type: 'React.CSSProperties', default: '-', description: '自定义内联样式' }
  ];

  return (
    <div style={{ padding: '20px' }}>
      <h2>Divider 组件</h2>
      <p>用于页面内容分割的组件，支持横向和纵向两种方向，以及实线和虚线两种类型。</p>
      
      {/* 基本使用示例 */}
      <div style={{ marginBottom: '40px' }}>
        <h3>基本使用</h3>
        <p>展示不同方向和类型的分割线。</p>
        
        <h4>横向分割线</h4>
        <div style={{ marginBottom: '20px' }}>
          <p>上方是默认的横向分割线</p>
          <Divider />
          <p>下方是默认的横向分割线</p>
        </div>
        
        <h4>纵向分割线</h4>
        <div style={{ display: 'flex', gap: '20px', marginBottom: '20px', alignItems: 'center' }}>
          <div style={{ flex: 1 }}>
            <p>左侧内容</p>
          </div>
          <Divider orientation="vertical" style={{ height: '100px' }} />
          <div style={{ flex: 1 }}>
            <p>右侧内容</p>
          </div>
        </div>
        
        <h4>实线与虚线</h4>
        <div style={{ marginBottom: '20px' }}>
          <p>上方是实线分割线（默认）</p>
          <Divider />
          <p>实线分割线和虚线分割线之间的内容</p>
          <Divider type="dashed" />
          <p>下方是虚线分割线</p>
        </div>
        
        <h4>颜色自定义</h4>
        <div style={{ marginBottom: '20px' }}>
          <p>不同颜色的分割线</p>
          <Divider style={{ margin: '10px 0' }} />
          <Divider color="#ff6b6b" style={{ margin: '10px 0' }} />
          <Divider color="#4ecdc4" style={{ margin: '10px 0' }} />
          <Divider color="#ffe66d" style={{ margin: '10px 0' }} />
        </div>
        
        <h4>组合使用</h4>
        <div style={{ marginBottom: '20px' }}>
          <div style={{ margin: '20px 0' }}>
            <p>横向虚线，自定义颜色</p>
            <Divider type="dashed" color="#95e1d3" />
          </div>
          
          <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
            <div style={{ flex: 1 }}>
              <p>左侧内容</p>
            </div>
            <Divider orientation="vertical" type="dashed" color="#f38181" style={{ height: '80px' }} />
            <div style={{ flex: 1 }}>
              <p>右侧内容</p>
            </div>
          </div>
        </div>
        
        <h4>自定义样式</h4>
        <div style={{ marginBottom: '20px' }}>
          <p>带有自定义样式的分割线</p>
          <Divider style={{ margin: '20px 0', height: '3px', backgroundColor: '#6c5ce7' }} />
          <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
            <div style={{ flex: 1 }}>
              <p>左侧内容</p>
            </div>
            <Divider 
                orientation="vertical" 
                style={{ margin: '0 20px', width: '3px', borderLeftWidth: '3px', borderLeftColor: '#fd79a8' }} 
            />
            <div style={{ flex: 1 }}>
              <p>右侧内容</p>
            </div>
          </div>
        </div>
        
        <h4>带文本的分割线效果</h4>
        <div style={{ marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Divider style={{ flex: 1 }} />
            <span>文本内容</span>
            <Divider style={{ flex: 1 }} />
          </div>
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
{`import { Divider } from '@zjpcy/simple-design';

// 基本用法
<Divider />

// 纵向分割线
<Divider orientation="vertical" style={{ height: '100px' }} />

// 虚线分割线
<Divider type="dashed" />

// 自定义颜色
<Divider color="#ff6b6b" />

// 组合使用
<Divider orientation="vertical" type="dashed" color="#f38181" style={{ height: '80px' }} />

// 自定义样式
<Divider style={{ height: '3px', backgroundColor: '#6c5ce7' }} />

// 带文本的分割线效果
<div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
  <Divider style={{ flex: 1 }} />
  <span>文本内容</span>
  <Divider style={{ flex: 1 }} />
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
import Divider from '@zjpcy/simple-design/lib/Divider';
import '@zjpcy/simple-design/lib/Divider/Divider.css';

// 方式二：批量引入
import { Divider } from '@zjpcy/simple-design';
import '@zjpcy/simple-design/lib/index.css';`}
          </SyntaxHighlighter>
        </div>
      </div>
    </div>
  );
};

export default DividerExample;
