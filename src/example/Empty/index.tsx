import React from 'react';
import { Empty, Button, Icon, Flex, Table, useI18n } from '../../components';
import type { Column } from '../../components/Table';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

const EmptyExample: React.FC = () => {
  const { t } = useI18n();
  // API参数列配置
  const apiColumns: Column[] = [
    { dataIndex: 'param', title: t('PARAM_NAME'), width: '150px' },
    { dataIndex: 'type', title: t('TYPE'), width: '300px' },
    { dataIndex: 'default', title: t('DEFAULT_VALUE'), width: '150px' },
    { dataIndex: 'description', title: t('DESCRIPTION'), width: '300px' }
  ];

  // Empty API参数数据源
  const emptyApiDataSource = [
    { param: 'icon', type: 'ReactNode', default: '-', description: t('EMPTY_CUSTOM_ICON') },
    { param: 'image', type: 'string', default: '-', description: t('EMPTY_CUSTOM_IMAGE_PATH') },
    { param: 'description', type: 'ReactNode', default: t('EMPTY_DATA'), description: t('EMPTY_STATUS_DESCRIPTION') },
    { param: 'children', type: 'ReactNode', default: '-', description: t('EMPTY_CUSTOM_ACTION_AREA') },
    { param: 'size', type: "'large' | 'middle' | 'small'", default: 'middle', description: t('EMPTY_SIZE') },
    { param: 'style', type: 'React.CSSProperties', default: '-', description: t('EMPTY_CUSTOM_STYLE') },
    { param: 'className', type: 'string', default: '-', description: t('EMPTY_CUSTOM_CLASS_NAME') }
  ];

  return (
    <div style={{ padding: '20px' }}>
      <h2>{t('EMPTY_COMPONENT')}</h2>
      <p>{t('EMPTY_DESCRIPTION')}</p>
      
      {/* 基本使用示例 */}
      <div style={{ marginBottom: '40px' }}>
        <h3>{t('BASIC_USAGE')}</h3>
        <p>展示空状态组件的基本使用方式。</p>
        
        <div style={{ marginBottom: '20px' }}>
          <h4>{t('DEFAULT_EMPTY_STATE')}</h4>
          <Empty />
        </div>
        
        <div style={{ marginBottom: '20px' }}>
          <h4>{t('CUSTOM_DESCRIPTION')}</h4>
          <Empty description={t('EMPTY_DATA')} />
        </div>
        
        <div style={{ marginBottom: '20px' }}>
          <h4>{t('CUSTOM_ICON')}</h4>
          <Empty icon={<Icon type="search" size={48} color="#d9d9d9" />} />
        </div>
        
        <div style={{ marginBottom: '20px' }}>
          <h4>{t('CUSTOM_IMAGE')}</h4>
          <Empty image="https://via.placeholder.com/128" />
        </div>
        
        <div style={{ marginBottom: '20px' }}>
          <h4>{t('WITH_ACTION_BUTTON')}</h4>
          <Empty>
            <Button variant="primary">{t('LOAD_DATA')}</Button>
          </Empty>
        </div>
        
        <div style={{ marginBottom: '20px' }}>
          <h4>{t('DIFFERENT_SIZES')}</h4>
          <Flex justify="space-around">
            <Empty size="large" description={t('LARGE_SIZE')} />
            <Empty size="middle" description={t('MIDDLE_SIZE')} />
            <Empty size="small" description={t('SMALL_SIZE')} />
          </Flex>
        </div>
        
        <div style={{ marginBottom: '20px' }}>
          <h4>{t('COMBINED_USAGE')}</h4>
          <Empty
            icon={<Icon type="file-excel" size={48} color="#52c41a" />}
            description={t('NO_EXCEL_FILE')}
          >
            <Button variant="primary">{t('UPLOAD_FILE')}</Button>
            <Button style={{ marginLeft: 8 }}>{t('VIEW_TEMPLATE')}</Button>
          </Empty>
        </div>
      </div>
      
      {/* API 文档 */}
      <div style={{ marginBottom: '40px', padding: '20px', background: '#fafafa', borderRadius: '8px' }}>
        <h3>{t('API_PARAMETERS')}</h3>
        <Table pagination={false} columns={apiColumns} dataSource={emptyApiDataSource} />
      </div>
      
      {/* 代码示例 */}
      <div style={{ marginBottom: '40px' }}>
        <h3>{t('CODE_EXAMPLES')}</h3>
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
        <h3>{t('USAGE_IN_OTHER_PROJECTS')}</h3>
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