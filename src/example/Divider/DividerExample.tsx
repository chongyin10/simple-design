import React from 'react';
import { Divider, Table, useI18n } from '../../components';
import type { Column } from '../../components/Table';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

const DividerExample: React.FC = () => {
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
    { param: 'orientation', type: "'horizontal' | 'vertical'", default: 'horizontal', description: t('DIVIDER_ORIENTATION') },
    { param: 'type', type: "'solid' | 'dashed'", default: 'solid', description: t('DIVIDER_TYPE') },
    { param: 'color', type: 'string', default: '#339af0', description: t('DIVIDER_COLOR') },
    { param: 'className', type: 'string', default: '-', description: t('CLASS_NAME_DESC') },
    { param: 'style', type: 'React.CSSProperties', default: '-', description: t('STYLE_DESC') }
  ];

  return (
    <div style={{ padding: '20px' }}>
      <h2>{t('DIVIDER_COMPONENT')}</h2>
      <p>{t('DIVIDER_DESCRIPTION')}</p>
      
      {/* 基本使用示例 */}
      <div style={{ marginBottom: '40px' }}>
        <h3>{t('BASIC_USAGE')}</h3>
        <p>{t('DIVIDER_SHOW_ORIENTATIONS_TYPES')}</p>
        
        <h4>{t('HORIZONTAL_DIVIDER')}</h4>
        <div style={{ marginBottom: '20px' }}>
          <p>{t('ABOVE_DEFAULT_HORIZONTAL')}</p>
          <Divider />
          <p>{t('BELOW_DEFAULT_HORIZONTAL')}</p>
        </div>
        
        <h4>{t('VERTICAL_DIVIDER')}</h4>
        <div style={{ display: 'flex', gap: '20px', marginBottom: '20px', alignItems: 'center' }}>
          <div style={{ flex: 1 }}>
            <p>{t('LEFT_CONTENT')}</p>
          </div>
          <Divider orientation="vertical" style={{ height: '100px' }} />
          <div style={{ flex: 1 }}>
            <p>{t('RIGHT_CONTENT')}</p>
          </div>
        </div>
        
        <h4>{t('SOLID_DASHED')}</h4>
        <div style={{ marginBottom: '20px' }}>
          <p>{t('ABOVE_SOLID_DEFAULT')}</p>
          <Divider />
          <p>{t('CONTENT_BETWEEN_DIVIDERS')}</p>
          <Divider type="dashed" />
          <p>{t('BELOW_DASHED')}</p>
        </div>
        
        <h4>{t('CUSTOM_COLOR')}</h4>
        <div style={{ marginBottom: '20px' }}>
          <p>{t('DIVIDERS_DIFFERENT_COLORS')}</p>
          <Divider style={{ margin: '10px 0' }} />
          <Divider color="#ff6b6b" style={{ margin: '10px 0' }} />
          <Divider color="#4ecdc4" style={{ margin: '10px 0' }} />
          <Divider color="#ffe66d" style={{ margin: '10px 0' }} />
        </div>
        
        <h4>{t('COMBINED_USAGE')}</h4>
        <div style={{ marginBottom: '20px' }}>
          <div style={{ margin: '20px 0' }}>
            <p>{t('HORIZONTAL_DASHED_CUSTOM_COLOR')}</p>
            <Divider type="dashed" color="#95e1d3" />
          </div>
          
          <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
            <div style={{ flex: 1 }}>
              <p>{t('LEFT_CONTENT')}</p>
            </div>
            <Divider orientation="vertical" type="dashed" color="#f38181" style={{ height: '80px' }} />
            <div style={{ flex: 1 }}>
              <p>{t('RIGHT_CONTENT')}</p>
            </div>
          </div>
        </div>
        
        <h4>{t('CUSTOM_STYLE')}</h4>
        <div style={{ marginBottom: '20px' }}>
          <p>{t('DIVIDERS_CUSTOM_STYLE')}</p>
          <Divider style={{ margin: '20px 0', height: '3px', backgroundColor: '#6c5ce7' }} />
          <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
            <div style={{ flex: 1 }}>
              <p>{t('LEFT_CONTENT')}</p>
            </div>
            <Divider 
                orientation="vertical" 
                style={{ margin: '0 20px', width: '3px', borderLeftWidth: '3px', borderLeftColor: '#fd79a8' }} 
            />
            <div style={{ flex: 1 }}>
              <p>{t('RIGHT_CONTENT')}</p>
            </div>
          </div>
        </div>
        
        <h4>{t('DIVIDER_WITH_TEXT')}</h4>
        <div style={{ marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Divider style={{ flex: 1 }} />
            <span>{t('TEXT_CONTENT')}</span>
            <Divider style={{ flex: 1 }} />
          </div>
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
