import React, { useState } from 'react';
import { Table, Button, useI18n } from '../../components';
import type { Column } from '../../components/Table';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import CopyToClipboard, { useOnCopy as useCopy } from '../../components/CopyToClipboard';

const CopyToClipboardExample: React.FC = () => {
  const { t } = useI18n();
  const [copyStatus, setCopyStatus] = useState('');

  // API参数列配置
  const apiColumns: Column[] = [
    { dataIndex: 'param', title: t('PARAM_NAME'), width: '150px' },
    { dataIndex: 'type', title: t('TYPE'), width: '300px' },
    { dataIndex: 'default', title: t('DEFAULT_VALUE'), width: '150px' },
    { dataIndex: 'description', title: t('DESCRIPTION'), width: '300px' }
  ];

  // API参数数据源 - CopyToClipboard组件
  const apiDataSource = [
    { param: 'url', type: 'string', default: '-', description: t('COPY_URL_OR_TEXT_CONTENT') },
    { param: 'onCopyStatusChange', type: '(status: "success" | "error") => void', default: '-', description: t('COPY_STATUS_CHANGE_CALLBACK') },
    { param: 'children', type: 'React.ReactNode', default: '-', description: t('CUSTOM_CHILD_ELEMENT') }
  ];

  // API参数数据源 - useCopy钩子
  const useCopyApiDataSource = [
    { param: 'url', type: 'string', default: '-', description: t('COPY_URL_OR_TEXT_CONTENT') },
    { param: 'return', type: 'Promise<void>', default: '-', description: t('COPY_OPERATION_PROMISE') }
  ];

  // 使用useCopy钩子的状态
  const [hookCopyStatus, setHookCopyStatus] = useState('');
  const copyFn = useCopy();

  const handleHookCopy = async () => {
    try {
      await copyFn('https://example.com/use-copy');
      setHookCopyStatus(t('COPY_SUCCESS'));
    } catch (error) {
      setHookCopyStatus(t('COPY_FAILED'));
    }
    setTimeout(() => setHookCopyStatus(''), 2000);
  };

  const handleCopyStatusChange = (status: string) => {
    if (status === 'success') {
      setCopyStatus(t('COPY_SUCCESS'));
    } else {
      setCopyStatus(t('COPY_FAILED'));
    }
    setTimeout(() => setCopyStatus(''), 2000);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>{t('COPYTOCLIPBOARD_COMPONENT')}</h2>
      <p>{t('COPYTOCLIPBOARD_DESCRIPTION')}</p>
      
      {/* 基本使用示例 */}
      <div style={{ marginBottom: '40px' }}>
        <h3>{t('BASIC_USAGE')}</h3>
        <p>{t('DISPLAY_DIFFERENT_STYLES_COPY_BUTTONS')}</p>
        
        <h4>{t('TEXT_LINK_STYLE')}</h4>
        <div style={{ marginBottom: '20px' }}>
          <CopyToClipboard 
            url="https://example.com" 
            onCopyStatusChange={handleCopyStatusChange}
          >
            <span style={{ 
              color: '#1890ff', 
              cursor: 'pointer',
              textDecoration: 'underline'
            }}>
              {t('COPY_LINK')}
            </span>
          </CopyToClipboard>
          {copyStatus && (
            <span style={{ marginLeft: '10px', color: copyStatus.includes(t('SUCCESS')) ? 'green' : 'red' }}>
              {copyStatus}
            </span>
          )}
        </div>
        
        <h4>{t('BUTTON_STYLE')}</h4>
        <div style={{ marginBottom: '20px' }}>
          <CopyToClipboard 
            url="https://example.com/custom" 
            onCopyStatusChange={handleCopyStatusChange}
          >
            <Button variant="primary" size="medium">
              {t('CLICK_TO_COPY_CUSTOM_LINK')}
            </Button>
          </CopyToClipboard>
        </div>
        
        <h4>{t('STYLED_LINK')}</h4>
        <div style={{ marginBottom: '20px' }}>
          <CopyToClipboard 
            url="https://example.com/styled" 
            onCopyStatusChange={handleCopyStatusChange}
          >
            <span style={{ 
              display: 'inline-block',
              padding: '8px 16px', 
              backgroundColor: '#52c41a', 
              color: 'white', 
              borderRadius: '4px',
              cursor: 'pointer',
              userSelect: 'none'
            }}>
              {t('COPY_STYLED_LINK')}
            </span>
          </CopyToClipboard>
        </div>

        <h4>{t('USING_USECOPY_HOOK')}</h4>
        <div style={{ marginBottom: '20px' }}>
          <Button 
            variant="secondary" 
            onClick={handleHookCopy}
          >
            {t('USE_USECOPY_TO_COPY_LINK')}
          </Button>
          {hookCopyStatus && (
            <span style={{ marginLeft: '10px', color: hookCopyStatus.includes(t('SUCCESS')) ? 'green' : 'red' }}>
              {hookCopyStatus}
            </span>
          )}
        </div>
      </div>
      
      {/* API 文档 */}
      <div style={{ marginBottom: '40px', padding: '20px', background: '#fafafa', borderRadius: '8px' }}>
        <h3>{t('API_PARAMETERS')}</h3>
        
        <h4>1. CopyToClipboard {t('COMPONENT')}</h4>
        <Table pagination={false} columns={apiColumns} dataSource={apiDataSource} />
        
        <h4 style={{ marginTop: '20px' }}>2. useCopy {t('HOOK')}</h4>
        <Table pagination={false} columns={apiColumns} dataSource={useCopyApiDataSource} />
      </div>
      
      {/* 代码示例 */}
      <div style={{ marginBottom: '40px' }}>
        <h3>{t('CODE_EXAMPLES')}</h3>
        <SyntaxHighlighter language="tsx" style={vscDarkPlus} customStyle={{ borderRadius: '6px', margin: '0' }}>
{`import { CopyToClipboard } from '@zjpcy/simple-design';

// 文本链接样式
<CopyToClipboard 
  url="https://example.com" 
  onCopyStatusChange={(status) => {
    if (status === 'success') {
      console.log('复制成功！');
    } else {
      console.log('复制失败！');
    }
  }}
>
  <span style={{ 
    color: '#1890ff', 
    cursor: 'pointer',
    textDecoration: 'underline'
  }}>
    复制链接
  </span>
</CopyToClipboard>

// 按钮样式
<CopyToClipboard 
  url="https://example.com/custom" 
  onCopyStatusChange={(status) => {
    console.log('复制状态:', status);
  }}
>
  <Button variant="primary" size="middle">
    点击复制自定义链接
  </Button>
</CopyToClipboard>

// 带样式的链接
<CopyToClipboard 
  url="https://example.com/styled" 
  onCopyStatusChange={(status) => {
    console.log('复制状态:', status);
  }}
>
  <span style={{ 
    display: 'inline-block',
    padding: '8px 16px', 
    backgroundColor: '#52c41a', 
    color: 'white', 
    borderRadius: '4px',
    cursor: 'pointer',
    userSelect: 'none'
  }}>
    复制带样式的链接
  </span>
</CopyToClipboard>

// 使用 useCopy 钩子
import { useCopy } from '@zjpcy/simple-design';

const MyComponent = () => {
  const copyUrl = useCopy();
  const [copyStatus, setCopyStatus] = useState('');

  const handleCopy = async () => {
    try {
      await copyUrl('https://example.com/use-copy');
      setCopyStatus('复制成功！');
    } catch (error) {
      setCopyStatus('复制失败！');
    }
    setTimeout(() => setCopyStatus(''), 2000);
  };

  return (
    <div>
      <Button variant="secondary" onClick={handleCopy}>
        使用 useCopy 复制链接
      </Button>
      {copyStatus && <span style={{ marginLeft: '10px' }}>{copyStatus}</span>}
    </div>
  );
};`}
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
import CopyToClipboard from '@zjpcy/simple-design/lib/CopyToClipboard';
import '@zjpcy/simple-design/lib/CopyToClipboard/CopyToClipboard.css';

// 方式二：批量引入
import { CopyToClipboard } from '@zjpcy/simple-design';
import '@zjpcy/simple-design/lib/index.css';`}
          </SyntaxHighlighter>
        </div>
      </div>
    </div>
  );
};

export default CopyToClipboardExample;