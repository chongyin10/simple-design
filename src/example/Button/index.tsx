import React from 'react';
import { Button, Table, useI18n } from '../../components';
import type { Column } from '../../components/Table';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

const ButtonExample: React.FC = () => {
  const { t } = useI18n();
  // API参数列配置
  const apiColumns: Column[] = [
    { dataIndex: 'param', title: t('PARAM_NAME'), width: '150px' },
    { dataIndex: 'type', title: t('TYPE'), width: '300px' },
    { dataIndex: 'default', title: t('DEFAULT_VALUE'), width: '150px' },
    { dataIndex: 'description', title: t('DESCRIPTION'), width: '300px' }
  ];

  // API参数数据源
  const apiDataSource = [
    { param: 'children', type: 'React.ReactNode', default: '-', description: t('CHILDREN_DESC') },
    { param: 'variant', type: "'primary' | 'secondary' | 'danger' | 'success' | 'warning'", default: 'primary', description: t('VARIANT_DESC') },
    { param: 'size', type: "'small' | 'medium' | 'large'", default: 'medium', description: t('SIZE_DESC') },
    { param: 'disabled', type: 'boolean', default: 'false', description: t('DISABLED_DESC') },
    { param: 'onClick', type: '() => void', default: '-', description: t('ON_CLICK_DESC') },
    { param: 'className', type: 'string', default: '-', description: t('CLASS_NAME_DESC') },
    { param: 'style', type: 'React.CSSProperties', default: '-', description: t('STYLE_DESC') },
    { param: 'icon', type: 'string | React.ReactNode', default: '-', description: t('ICON_DESC') }
  ];

  return (
    <div style={{ padding: '20px' }}>
      <h2>{t('BUTTON_COMPONENT')}</h2>
      <p>{t('BUTTON_DESCRIPTION')}</p>
      
      {/* 基本使用示例 */}
      <div style={{ marginBottom: '40px' }}>
        <h3>{t('BASIC_USAGE')}</h3>
        <p>{t('SHOW_VARIANTS_SIZES')}</p>
        
        <h4>{t('VARIANT_BUTTONS')}</h4>
        <div style={{ marginBottom: '20px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <Button variant="primary">Primary Button</Button>
          <Button variant="secondary">Secondary Button</Button>
          <Button variant="danger">Danger Button</Button>
          <Button variant="success">Success Button</Button>
          <Button variant="warning">Warning Button</Button>
        </div>
        
        <h4>{t('SIZE_BUTTONS')}</h4>
        <div style={{ marginBottom: '20px', display: 'flex', gap: '10px', alignItems: 'center' }}>
          <Button variant="primary" size="small">Small Button</Button>
          <Button variant="primary">Medium Button</Button>
          <Button variant="primary" size="large">Large Button</Button>
        </div>
        
        <h4>{t('DISABLED_STATE')}</h4>
        <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
          <Button variant="primary" disabled>Disabled Primary</Button>
          <Button variant="secondary" disabled>Disabled Secondary</Button>
        </div>
        
        <h4>{t('ICON_BUTTONS')}</h4>
        <div style={{ marginBottom: '20px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <Button variant="primary" icon="search">{t('SEARCH')}</Button>
          <Button variant="secondary" icon="user">{t('USER')}</Button>
          <Button variant="danger" icon="delete">{t('DELETE')}</Button>
          <Button variant="success" icon="check">{t('CONFIRM')}</Button>
          <Button variant="warning" icon="exclamation">{t('WARNING')}</Button>
        </div>
        
        <h4>{t('CUSTOM_STYLE')}</h4>
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
        <h3>{t('API_PARAMETERS')}</h3>
        <Table pagination={false} columns={apiColumns} dataSource={apiDataSource} />
      </div>
      
      {/* 代码示例 */}
      <div style={{ marginBottom: '40px' }}>
        <h3>{t('CODE_EXAMPLES')}</h3>
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
  {t('SEARCH')}
</Button>
<Button variant="success" icon="check">
  {t('CONFIRM')}
</Button>
<Button variant="danger" icon="delete">
  {t('DELETE')}
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
        <h3>{t('USAGE_IN_OTHER_PROJECTS')}</h3>
        <div style={{ margin: '15px 0' }}>
          <h4>1. {t('INSTALLATION')}</h4>
          <SyntaxHighlighter language="bash" style={vscDarkPlus} customStyle={{ borderRadius: '6px', margin: '0', fontSize: '14px', fontFamily: 'monospace' }}>
            {`npm i @zjpcy/simple-design`}
          </SyntaxHighlighter>
        </div>
        <div>
          <h4>2. {t('REFERENCE_COMPONENT')}</h4>
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