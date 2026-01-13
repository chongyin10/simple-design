import React from 'react';
import { useMessage } from '../../components/Message';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

const MessageExample: React.FC = () => {
  const message = useMessage();

  const handleSuccessClick = () => {
    message.success('操作成功！', 3000);
  };

  const handleWarningClick = () => {
    message.warning('警告：请检查输入！', 4000);
  };

  const handleErrorClick = () => {
    message.error('操作失败，请重试！', 5000);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Message 组件</h2>
      <p>轻量级消息提示框，用于显示成功、警告和错误信息。</p>

      {/* 基本使用示例 */}
      <div style={{ marginBottom: '40px', display: 'block' }}>
        <h3>基本使用</h3>
        <p>点击按钮显示不同类型的消息提示。</p>

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
            显示成功消息
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
            显示警告消息
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
            显示错误消息
          </button>
        </div>
      </div>

      {/* 代码示例 */}
      <div style={{ marginBottom: '40px', display: 'block' }}>
        <h3>代码示例</h3>
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
        <h3>API 参数</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
          <thead>
            <tr style={{ backgroundColor: '#f0f0f0' }}>
              <th style={{ padding: '8px', textAlign: 'left', borderBottom: '1px solid #e0e0e0' }}>参数名</th>
              <th style={{ padding: '8px', textAlign: 'left', borderBottom: '1px solid #e0e0e0' }}>类型</th>
              <th style={{ padding: '8px', textAlign: 'left', borderBottom: '1px solid #e0e0e0' }}>默认值</th>
              <th style={{ padding: '8px', textAlign: 'left', borderBottom: '1px solid #e0e0e0' }}>描述</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: '8px', borderBottom: '1px solid #e0e0e0' }}>type</td>
              <td style={{ padding: '8px', borderBottom: '1px solid #e0e0e0' }}>'success' | 'warning' | 'error'</td>
              <td style={{ padding: '8px', borderBottom: '1px solid #e0e0e0' }}>-</td>
              <td style={{ padding: '8px', borderBottom: '1px solid #e0e0e0' }}>消息类型</td>
            </tr>
            <tr>
              <td style={{ padding: '8px', borderBottom: '1px solid #e0e0e0' }}>content</td>
              <td style={{ padding: '8px', borderBottom: '1px solid #e0e0e0' }}>ReactNode</td>
              <td style={{ padding: '8px', borderBottom: '1px solid #e0e0e0' }}>-</td>
              <td style={{ padding: '8px', borderBottom: '1px solid #e0e0e0' }}>消息内容</td>
            </tr>
            <tr>
              <td style={{ padding: '8px', borderBottom: '1px solid #e0e0e0' }}>duration</td>
              <td style={{ padding: '8px', borderBottom: '1px solid #e0e0e0' }}>number</td>
              <td style={{ padding: '8px', borderBottom: '1px solid #e0e0e0' }}>3000</td>
              <td style={{ padding: '8px', borderBottom: '1px solid #e0e0e0' }}>消息自动关闭时长（毫秒）</td>
            </tr>
            <tr>
              <td style={{ padding: '8px', borderBottom: '1px solid #e0e0e0' }}>className</td>
              <td style={{ padding: '8px', borderBottom: '1px solid #e0e0e0' }}>string</td>
              <td style={{ padding: '8px', borderBottom: '1px solid #e0e0e0' }}>-</td>
              <td style={{ padding: '8px', borderBottom: '1px solid #e0e0e0' }}>自定义类名</td>
            </tr>
            <tr>
              <td style={{ padding: '8px', borderBottom: '1px solid #e0e0e0' }}>style</td>
              <td style={{ padding: '8px', borderBottom: '1px solid #e0e0e0' }}>React.CSSProperties</td>
              <td style={{ padding: '8px', borderBottom: '1px solid #e0e0e0' }}>-</td>
              <td style={{ padding: '8px', borderBottom: '1px solid #e0e0e0' }}>自定义样式</td>
            </tr>
            <tr>
              <td style={{ padding: '8px', borderBottom: '1px solid #e0e0e0' }}>onClose</td>
              <td style={{ padding: '8px', borderBottom: '1px solid #e0e0e0' }}>\(() `${"=>"}` void\)</td>
              <td style={{ padding: '8px', borderBottom: '1px solid #e0e0e0' }}>-</td>
              <td style={{ padding: '8px', borderBottom: '1px solid #e0e0e0' }}>消息关闭回调</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MessageExample;
