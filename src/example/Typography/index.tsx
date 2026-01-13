import React from 'react';
import Typography from '../../components/Typography';
import { useI18n } from '../../components';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

const TypographyExample: React.FC = () => {
  const { t } = useI18n();
  // 测试文本
  const longText = t('TYPOGRAPHY_LONG_TEXT');

  return (
    <div style={{ padding: '20px' }}>
      <h2>{t('TYPOGRAPHY_COMPONENT')}</h2>
      <p>{t('TYPOGRAPHY_DESCRIPTION')}</p>
      
      {/* 基本使用示例 */}
      <div style={{ marginBottom: '40px' }}>
        <h3>{t('BASIC_USAGE')}</h3>
        <p>{t('SHOW_BASIC_USAGE_TYPOGRAPHY')}</p>
        
        <div style={{ marginBottom: '20px' }}>
          <h4>{t('DEFAULT_DISPLAY_NO_ROW_LIMIT')}</h4>
          <Typography style={{ maxWidth: '400px' }}>
            {longText}
          </Typography>
        </div>
        
        <div style={{ marginBottom: '20px' }}>
          <h4>{t('LIMIT_1_ROW')}</h4>
          <Typography width="400px" rows={1}>
            {longText}
          </Typography>
        </div>
        
        <div style={{ marginBottom: '20px' }}>
          <h4>{t('LIMIT_2_ROWS')}</h4>
          <Typography width="400px" rows={2}>
            {longText}
          </Typography>
        </div>
        
        <div style={{ marginBottom: '20px' }}>
          <h4>{t('LIMIT_3_ROWS')}</h4>
          <Typography width="400px" rows={3}>
            {longText}
          </Typography>
        </div>
        
        <div style={{ marginBottom: '20px' }}>
          <h4>{t('DIFFERENT_WIDTHS')}</h4>
          <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
            <div>
              <p>{t('WIDTH_200PX_LIMIT_1_ROW')}</p>
              <Typography width="200px" rows={1}>
                {longText}
              </Typography>
            </div>
            <div>
              <p>{t('WIDTH_300PX_LIMIT_2_ROWS')}</p>
              <Typography width="300px" rows={2}>
                {longText}
              </Typography>
            </div>
            <div>
              <p>{t('WIDTH_500PX_LIMIT_3_ROWS')}</p>
              <Typography width="500px" rows={3}>
                {longText}
              </Typography>
            </div>
          </div>
        </div>
        
        <div style={{ marginBottom: '20px' }}>
          <h4>{t('MIXED_TEXT_WRAPPING')}</h4>
          <Typography width="350px">
            {t('MIXED_TEXT_CONTENT')}
          </Typography>
        </div>
        
        <div style={{ marginBottom: '20px' }}>
          <h4>{t('MIXED_TEXT_LIMIT_2_ROWS')}</h4>
          <Typography width="350px" rows={2}>
            {t('MIXED_TEXT_CONTENT')}
          </Typography>
        </div>
      </div>
      
      {/* API 文档 */}
      <div style={{ marginBottom: '40px', padding: '20px', background: '#fafafa', borderRadius: '8px' }}>
        <h3>{t('API_PARAMETERS')}</h3>
        
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#f0f0f0' }}>
              <th style={{ padding: '8px', textAlign: 'left', border: '1px solid #ddd' }}>{t('PARAM_NAME')}</th>
              <th style={{ padding: '8px', textAlign: 'left', border: '1px solid #ddd' }}>{t('TYPE')}</th>
              <th style={{ padding: '8px', textAlign: 'left', border: '1px solid #ddd' }}>{t('DEFAULT_VALUE')}</th>
              <th style={{ padding: '8px', textAlign: 'left', border: '1px solid #ddd' }}>{t('DESCRIPTION')}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: '8px', border: '1px solid #ddd' }}>children</td>
              <td style={{ padding: '8px', border: '1px solid #ddd' }}>ReactNode</td>
              <td style={{ padding: '8px', border: '1px solid #ddd' }}>-</td>
              <td style={{ padding: '8px', border: '1px solid #ddd' }}>{t('TYPOGRAPHY_CHILDREN_DESC')}</td>
            </tr>
            <tr>
              <td style={{ padding: '8px', border: '1px solid #ddd' }}>width</td>
              <td style={{ padding: '8px', border: '1px solid #ddd' }}>number | string</td>
              <td style={{ padding: '8px', border: '1px solid #ddd' }}>-</td>
              <td style={{ padding: '8px', border: '1px solid #ddd' }}>{t('TYPOGRAPHY_WIDTH_DESC')}</td>
            </tr>
            <tr>
              <td style={{ padding: '8px', border: '1px solid #ddd' }}>rows</td>
              <td style={{ padding: '8px', border: '1px solid #ddd' }}>number</td>
              <td style={{ padding: '8px', border: '1px solid #ddd' }}>-</td>
              <td style={{ padding: '8px', border: '1px solid #ddd' }}>{t('TYPOGRAPHY_ROWS_DESC')}</td>
            </tr>
            <tr>
              <td style={{ padding: '8px', border: '1px solid #ddd' }}>style</td>
              <td style={{ padding: '8px', border: '1px solid #ddd' }}>React.CSSProperties</td>
              <td style={{ padding: '8px', border: '1px solid #ddd' }}>-</td>
              <td style={{ padding: '8px', border: '1px solid #ddd' }}>{t('TYPOGRAPHY_STYLE_DESC')}</td>
            </tr>
            <tr>
              <td style={{ padding: '8px', border: '1px solid #ddd' }}>className</td>
              <td style={{ padding: '8px', border: '1px solid #ddd' }}>string</td>
              <td style={{ padding: '8px', border: '1px solid #ddd' }}>-</td>
              <td style={{ padding: '8px', border: '1px solid #ddd' }}>{t('TYPOGRAPHY_CLASSNAME_DESC')}</td>
            </tr>
          </tbody>
        </table>
      </div>
      
      {/* 代码示例 */}
      <div style={{ marginBottom: '40px' }}>
        <h3>{t('CODE_EXAMPLES')}</h3>
        <SyntaxHighlighter language="tsx" style={vscDarkPlus} customStyle={{ borderRadius: '6px', margin: '0' }}>
{`import Typography from '@zjpcy/simple-design';

// 默认显示（不限制行数）
<Typography width="400px">
  ${t('TYPOGRAPHY_LONG_TEXT')}
</Typography>

// 限制1行
<Typography width="400px" rows={1}>
  ${t('TYPOGRAPHY_LONG_TEXT')}
</Typography>

// 限制2行
<Typography width="400px" rows={2}>
  ${t('TYPOGRAPHY_LONG_TEXT')}
</Typography>

// 限制3行
<Typography width="400px" rows={3}>
  ${t('TYPOGRAPHY_LONG_TEXT')}
</Typography>
`}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};

export default TypographyExample;