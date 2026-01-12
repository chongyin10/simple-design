import React from 'react';
import { Empty, Button, Icon, Flex, Table } from '../../components';
import type { Column } from '../../components/Table';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

const EmptyExample: React.FC = () => {
  // API参数列配置
  const apiColumns: Column[] = [
    { dataIndex: 'param', title: '参数名', width: '150px' },
    { dataIndex: 'type', title: '类型', width: '300px' },
    { dataIndex: 'default', title: '默认值', width: '150px' },
    { dataIndex: 'description', title: '描述', width: '300px' }
  ];

  // Empty API参数数据源
  const emptyApiDataSource = [
    { param: 'icon', type: 'ReactNode', default: '-', description: '自定义图标' },
    { param: 'image', type: 'string', default: '-', description: '自定义图片路径' },
    { param: 'description', type: 'ReactNode', default: '暂无数据', description: '空状态描述' },
    { param: 'children', type: 'ReactNode', default: '-', description: '自定义操作区域' },
    { param: 'size', type: "'large' | 'middle' | 'small'", default: 'middle', description: '尺寸' },
    { param: 'style', type: 'React.CSSProperties', default: '-', description: '自定义样式' },
    { param: 'className', type: 'string', default: '-', description: '自定义类名' }
  ];

  return (
    <div style={{ padding: '20px' }}>
      <h2>Empty 空状态</h2>
      <p>空状态组件，用于在数据为空时展示友好的提示信息。</p>
      
      {/* 基本使用示例 */}
      <div style={{ marginBottom: '40px' }}>
        <h3>基本使用</h3>
        <p>展示空状态组件的基本使用方式。</p>
        
        <div style={{ marginBottom: '20px' }}>
          <h4>默认空状态</h4>
          <Empty />
        </div>
        
        <div style={{ marginBottom: '20px' }}>
          <h4>自定义描述</h4>
          <Empty description="暂无内容" />
        </div>
        
        <div style={{ marginBottom: '20px' }}>
          <h4>自定义图标</h4>
          <Empty icon={<Icon type="search" size={48} color="#d9d9d9" />} />
        </div>
        
        <div style={{ marginBottom: '20px' }}>
          <h4>自定义图片</h4>
          <Empty image="https://via.placeholder.com/128" />
        </div>
        
        <div style={{ marginBottom: '20px' }}>
          <h4>带操作按钮</h4>
          <Empty>
            <Button variant="primary">点击加载</Button>
          </Empty>
        </div>
        
        <div style={{ marginBottom: '20px' }}>
          <h4>不同尺寸</h4>
          <Flex justify="space-around">
            <Empty size="large" description="大尺寸" />
            <Empty size="middle" description="中尺寸" />
            <Empty size="small" description="小尺寸" />
          </Flex>
        </div>
        
        <div style={{ marginBottom: '20px' }}>
          <h4>组合用法</h4>
          <Empty
            icon={<Icon type="file-excel" size={48} color="#52c41a" />}
            description="暂无Excel文件"
          >
            <Button variant="primary">上传文件</Button>
            <Button style={{ marginLeft: 8 }}>查看模板</Button>
          </Empty>
        </div>
      </div>
      
      {/* API 文档 */}
      <div style={{ marginBottom: '40px', padding: '20px', background: '#fafafa', borderRadius: '8px' }}>
        <h3>API 参数</h3>
        <Table pagination={false} columns={apiColumns} dataSource={emptyApiDataSource} />
      </div>
      
      {/* 代码示例 */}
      <div style={{ marginBottom: '40px' }}>
        <h3>代码示例</h3>
        <SyntaxHighlighter language="tsx" style={vscDarkPlus} customStyle={{ borderRadius: '6px', margin: '0' }}>
{`import { Empty, Button, Icon } from '@zjpcy/simple-design';
import React from 'react';

// 默认空状态
const DefaultEmpty = () => {
  return <Empty />;
};

// 自定义描述
const CustomDescription = () => {
  return <Empty description="暂无内容" />;
};

// 自定义图标
const CustomIcon = () => {
  return <Empty icon={<Icon type="search" size={48} color="#d9d9d9" />} />;
};

// 自定义图片
const CustomImage = () => {
  return <Empty image="https://via.placeholder.com/128" />;
};

// 带操作按钮
const WithAction = () => {
  return (
    <Empty>
      <Button variant="primary">点击加载</Button>
    </Empty>
  );
};

// 不同尺寸
const DifferentSizes = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-around' }}>
      <Empty size="large" description="大尺寸" />
      <Empty size="middle" description="中尺寸" />
      <Empty size="small" description="小尺寸" />
    </div>
  );
};

// 组合用法
const CombinedUsage = () => {
  return (
    <Empty
      icon={<Icon type="file-excel" size={48} color="#52c41a" />}
      description="暂无Excel文件"
    >
      <Button variant="primary">上传文件</Button>
      <Button style={{ marginLeft: 8 }}>查看模板</Button>
    </Empty>
  );
};
`}
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
import Empty from '@zjpcy/simple-design/lib/Empty';
import '@zjpcy/simple-design/lib/Empty/Empty.css';

// 方式二：批量引入
import { Empty } from '@zjpcy/simple-design';
import '@zjpcy/simple-design/lib/index.css';

// 使用示例
const App = () => {
  return (
    <div>
      {/* 默认空状态 */}
      <Empty />
      
      {/* 带操作按钮的空状态 */}
      <Empty description="暂无数据">
        <Button variant="primary">加载数据</Button>
      </Empty>
    </div>
  );
};
`}
          </SyntaxHighlighter>
        </div>
      </div>
    </div>
  );
};

export default EmptyExample;