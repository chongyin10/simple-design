import React from 'react';
import Typography from '../../components/Typography';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

const TypographyExample: React.FC = () => {
  // 测试文本
  const longText = '这是一段很长的测试文本，用于测试Typography组件的行数限制功能。当文本内容超过指定的行数限制时，应该在末尾显示省略号。这个组件支持自定义宽度和行数限制，可以满足不同的布局需求。';

  return (
    <div style={{ padding: '20px' }}>
      <h2>Typography 组件</h2>
      <p>排版组件，支持自定义宽度和行数限制，超过行数限制时显示省略号。</p>
      
      {/* 基本使用示例 */}
      <div style={{ marginBottom: '40px' }}>
        <h3>基本使用</h3>
        <p>展示Typography组件的基本使用方式。</p>
        
        <div style={{ marginBottom: '20px' }}>
          <h4>默认显示（不限制行数）</h4>
          <Typography style={{ maxWidth: '400px' }}>
            {longText}
          </Typography>
        </div>
        
        <div style={{ marginBottom: '20px' }}>
          <h4>限制1行</h4>
          <Typography width="400px" rows={1}>
            {longText}
          </Typography>
        </div>
        
        <div style={{ marginBottom: '20px' }}>
          <h4>限制2行</h4>
          <Typography width="400px" rows={2}>
            {longText}
          </Typography>
        </div>
        
        <div style={{ marginBottom: '20px' }}>
          <h4>限制3行</h4>
          <Typography width="400px" rows={3}>
            {longText}
          </Typography>
        </div>
        
        <div style={{ marginBottom: '20px' }}>
          <h4>不同宽度</h4>
          <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
            <div>
              <p>宽度200px，限制1行</p>
              <Typography width="200px" rows={1}>
                {longText}
              </Typography>
            </div>
            <div>
              <p>宽度300px，限制2行</p>
              <Typography width="300px" rows={2}>
                {longText}
              </Typography>
            </div>
            <div>
              <p>宽度500px，限制3行</p>
              <Typography width="500px" rows={3}>
                {longText}
              </Typography>
            </div>
          </div>
        </div>
        
        <div style={{ marginBottom: '20px' }}>
          <h4>中英文混合文本（测试换行问题）</h4>
          <Typography width="350px">
            这是一段包含English英文的测试文本，用于测试中英文混合时的换行问题。当文本内容超过容器宽度时，英文应该紧跟在中文后面，而不是单独换行显示。
          </Typography>
        </div>
        
        <div style={{ marginBottom: '20px' }}>
          <h4>中英文混合文本（限制2行）</h4>
          <Typography width="350px" rows={2}>
            这是一段包含English英文的测试文本，用于测试中英文混合时的换行问题。当文本内容超过容器宽度时，英文应该紧跟在中文后面，而不是单独换行显示。
          </Typography>
        </div>
      </div>
      
      {/* API 文档 */}
      <div style={{ marginBottom: '40px', padding: '20px', background: '#fafafa', borderRadius: '8px' }}>
        <h3>API 参数</h3>
        
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#f0f0f0' }}>
              <th style={{ padding: '8px', textAlign: 'left', border: '1px solid #ddd' }}>参数名</th>
              <th style={{ padding: '8px', textAlign: 'left', border: '1px solid #ddd' }}>类型</th>
              <th style={{ padding: '8px', textAlign: 'left', border: '1px solid #ddd' }}>默认值</th>
              <th style={{ padding: '8px', textAlign: 'left', border: '1px solid #ddd' }}>描述</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: '8px', border: '1px solid #ddd' }}>children</td>
              <td style={{ padding: '8px', border: '1px solid #ddd' }}>ReactNode</td>
              <td style={{ padding: '8px', border: '1px solid #ddd' }}>-</td>
              <td style={{ padding: '8px', border: '1px solid #ddd' }}>文本内容</td>
            </tr>
            <tr>
              <td style={{ padding: '8px', border: '1px solid #ddd' }}>width</td>
              <td style={{ padding: '8px', border: '1px solid #ddd' }}>number | string</td>
              <td style={{ padding: '8px', border: '1px solid #ddd' }}>-</td>
              <td style={{ padding: '8px', border: '1px solid #ddd' }}>宽度限制</td>
            </tr>
            <tr>
              <td style={{ padding: '8px', border: '1px solid #ddd' }}>rows</td>
              <td style={{ padding: '8px', border: '1px solid #ddd' }}>number</td>
              <td style={{ padding: '8px', border: '1px solid #ddd' }}>-</td>
              <td style={{ padding: '8px', border: '1px solid #ddd' }}>行数限制</td>
            </tr>
            <tr>
              <td style={{ padding: '8px', border: '1px solid #ddd' }}>style</td>
              <td style={{ padding: '8px', border: '1px solid #ddd' }}>React.CSSProperties</td>
              <td style={{ padding: '8px', border: '1px solid #ddd' }}>-</td>
              <td style={{ padding: '8px', border: '1px solid #ddd' }}>自定义样式</td>
            </tr>
            <tr>
              <td style={{ padding: '8px', border: '1px solid #ddd' }}>className</td>
              <td style={{ padding: '8px', border: '1px solid #ddd' }}>string</td>
              <td style={{ padding: '8px', border: '1px solid #ddd' }}>-</td>
              <td style={{ padding: '8px', border: '1px solid #ddd' }}>自定义类名</td>
            </tr>
          </tbody>
        </table>
      </div>
      
      {/* 代码示例 */}
      <div style={{ marginBottom: '40px' }}>
        <h3>代码示例</h3>
        <SyntaxHighlighter language="tsx" style={vscDarkPlus} customStyle={{ borderRadius: '6px', margin: '0' }}>
{`import Typography from '@zjpcy/simple-design';

// 默认显示（不限制行数）
<Typography width="400px">
  这是一段很长的测试文本...
</Typography>

// 限制1行
<Typography width="400px" rows={1}>
  这是一段很长的测试文本...
</Typography>

// 限制2行
<Typography width="400px" rows={2}>
  这是一段很长的测试文本...
</Typography>

// 限制3行
<Typography width="400px" rows={3}>
  这是一段很长的测试文本...
</Typography>
`}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};

export default TypographyExample;