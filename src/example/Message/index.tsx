import React from 'react';
import { useMessage } from '../../components/Message';
import { useI18n } from '../../components';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

const MessageExample: React.FC = () => {
  const message = useMessage();
  const { t } = useI18n();

  const handleSuccessClick = () => {
    message.success(t('OPERATION_SUCCESS'), 3000);
  };

  const handleWarningClick = () => {
    message.warning(t('WARNING_CHECK_INPUT'), 4000);
  };

  const handleErrorClick = () => {
    message.error(t('OPERATION_FAILED_RETRY'), 5000);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Message {t('COMPONENT')}</h2>
      <p>{t('MESSAGE_COMPONENT_DESC')}</p>

      {/* 基本使用示例 */}
      <div style={{ marginBottom: '40px', display: 'block' }}>
        <h3>{t('BASIC_USAGE')}</h3>
        <p>{t('CLICK_BUTTONS_TO_SHOW_MESSAGES')}</p>

        <div style={{ marginBottom: '20px', display: 'flex', gap: '20px', alignItems: 'center', flexWrap: 'wrap' }}>
          <button 
            onClick={handleSuccessClick} 
            style={{ 
              padding: '8px 16px', 
              backgroundColor: '#52c41a', 
              color: '#fff', 
              border: 'none', 
              borderRadius: '4px', 
              cursor: 'pointer' 
            }}
          >
            {t('SHOW_SUCCESS_MESSAGE')}
          </button>
          
          <button 
            onClick={handleWarningClick} 
            style={{ 
              padding: '8px 16px', 
              backgroundColor: '#faad14', 
              color: '#fff', 
              border: 'none', 
              borderRadius: '4px', 
              cursor: 'pointer' 
            }}
          >
            {t('SHOW_WARNING_MESSAGE')}
          </button>
          
          <button 
            onClick={handleErrorClick} 
            style={{ 
              padding: '8px 16px', 
              backgroundColor: '#f5222d', 
              color: '#fff', 
              border: 'none', 
              borderRadius: '4px', 
              cursor: 'pointer' 
            }}
          >
            {t('SHOW_ERROR_MESSAGE')}
          </button>
        </div>
      </div>

      {/* 代码示例 */}
      <div style={{ marginBottom: '40px', display: 'block' }}>
        <h3>{t('CODE_EXAMPLES')}</h3>
        <SyntaxHighlighter language="tsx" style={vscDarkPlus} customStyle={{ borderRadius: '6px', margin: '0' }}>
          {`import { useMessage } from '@zjpcy/simple-design';

const Component = () => {
  const message = useMessage();

  const handleSuccess = () => {
    message.success('操作成功！', 3000);
  };

  const handleWarning = () => {
    message.warning('警告：请检查输入！', 4000);
  };

  const handleError = () => {
    message.error('操作失败，请重试！', 5000);
  };

  return (
    <div>
      <button onClick={handleSuccess}>显示成功消息</button>
      <button onClick={handleWarning}>显示警告消息</button>
      <button onClick={handleError}>显示错误消息</button>
    </div>
  );
};

// 直接使用组件（不推荐，推荐使用 useMessage hook）
import { Message } from '@zjpcy/simple-design';

<Message type="success" content="操作成功！" duration={3000} />`}
        </SyntaxHighlighter>
      </div>

      {/* API 文档 */}
      <div style={{ marginBottom: '40px', padding: '20px', background: '#fafafa', borderRadius: '8px' }}>
        <h3>{t('API_PARAMETERS')}</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
          <thead>
            <tr style={{ backgroundColor: '#f0f0f0' }}>
              <th style={{ padding: '8px', textAlign: 'left', borderBottom: '1px solid #e0e0e0' }}>{t('PARAM_NAME')}</th>
              <th style={{ padding: '8px', textAlign: 'left', borderBottom: '1px solid #e0e0e0' }}>{t('TYPE')}</th>
              <th style={{ padding: '8px', textAlign: 'left', borderBottom: '1px solid #e0e0e0' }}>{t('DEFAULT_VALUE')}</th>
              <th style={{ padding: '8px', textAlign: 'left', borderBottom: '1px solid #e0e0e0' }}>{t('DESCRIPTION')}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: '8px', borderBottom: '1px solid #e0e0e0' }}>type</td>
              <td style={{ padding: '8px', borderBottom: '1px solid #e0e0e0' }}>'success' | 'warning' | 'error'</td>
              <td style={{ padding: '8px', borderBottom: '1px solid #e0e0e0' }}>-</td>
              <td style={{ padding: '8px', borderBottom: '1px solid #e0e0e0' }}>{t('MESSAGE_TYPE')}</td>
            </tr>
            <tr>
              <td style={{ padding: '8px', borderBottom: '1px solid #e0e0e0' }}>content</td>
              <td style={{ padding: '8px', borderBottom: '1px solid #e0e0e0' }}>ReactNode</td>
              <td style={{ padding: '8px', borderBottom: '1px solid #e0e0e0' }}>-</td>
              <td style={{ padding: '8px', borderBottom: '1px solid #e0e0e0' }}>{t('MESSAGE_CONTENT')}</td>
            </tr>
            <tr>
              <td style={{ padding: '8px', borderBottom: '1px solid #e0e0e0' }}>duration</td>
              <td style={{ padding: '8px', borderBottom: '1px solid #e0e0e0' }}>number</td>
              <td style={{ padding: '8px', borderBottom: '1px solid #e0e0e0' }}>3000</td>
              <td style={{ padding: '8px', borderBottom: '1px solid #e0e0e0' }}>{t('MESSAGE_DURATION')}</td>
            </tr>
            <tr>
              <td style={{ padding: '8px', borderBottom: '1px solid #e0e0e0' }}>className</td>
              <td style={{ padding: '8px', borderBottom: '1px solid #e0e0e0' }}>string</td>
              <td style={{ padding: '8px', borderBottom: '1px solid #e0e0e0' }}>-</td>
              <td style={{ padding: '8px', borderBottom: '1px solid #e0e0e0' }}>{t('CLASS_NAME_DESC')}</td>
            </tr>
            <tr>
              <td style={{ padding: '8px', borderBottom: '1px solid #e0e0e0' }}>style</td>
              <td style={{ padding: '8px', borderBottom: '1px solid #e0e0e0' }}>React.CSSProperties</td>
              <td style={{ padding: '8px', borderBottom: '1px solid #e0e0e0' }}>-</td>
              <td style={{ padding: '8px', borderBottom: '1px solid #e0e0e0' }}>{t('STYLE_DESC')}</td>
            </tr>
            <tr>
              <td style={{ padding: '8px', borderBottom: '1px solid #e0e0e0' }}>onClose</td>
              <td style={{ padding: '8px', borderBottom: '1px solid #e0e0e0' }}>() `${"=>"}` void</td>
              <td style={{ padding: '8px', borderBottom: '1px solid #e0e0e0' }}>-</td>
              <td style={{ padding: '8px', borderBottom: '1px solid #e0e0e0' }}>{t('MESSAGE_CLOSE_CALLBACK')}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MessageExample;
