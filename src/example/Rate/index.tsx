import React, { useState } from 'react';
import { Rate, Flex, CopyToClipboard } from '../../components';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

// 代码块组件
const CodeBlock: React.FC<{ code: string; language?: string }> = ({ code, language = 'tsx' }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = (status: string) => {
    if (status === 'success') {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div style={{ position: 'relative', marginTop: '16px' }}>
      <div className="code-header">
        <CopyToClipboard url={code} onCopyStatusChange={handleCopy}>
          <button className="copy-button">
            {copied ? '已复制' : '复制'}
          </button>
        </CopyToClipboard>
      </div>
      <SyntaxHighlighter language={language} style={vscDarkPlus}>
        {code}
      </SyntaxHighlighter>
    </div>
  );
};

const RateExample: React.FC = () => {
  const [value1, setValue1] = useState(0);
  const [value2, setValue2] = useState(2.5);
  const [value3, _] = useState(3);
  const [value4, setValue4] = useState(4);
  const [value5, setValue5] = useState(3.5);

  const code1 = `import React, { useState } from 'react';
import { Rate } from '../components';

const App = () => {
  const [value, setValue] = useState(0);

  return (
    <Rate
      value={value}
      onChange={(newValue) => setValue(newValue)}
    />
  );
};`;

  const code2 = `import React, { useState } from 'react';
import { Rate } from '../components';

const App = () => {
  const [value, setValue] = useState(2.5);

  return (
    <Rate
      value={value}
      allowHalf={true}
      onChange={(newValue) => setValue(newValue)}
    />
  );
};`;

  const code3 = `import React, { useState } from 'react';
import { Rate } from '../components';

const App = () => {
  const [value, setValue] = useState(3);

  return (
    <Rate
      value={value}
      disabled={true}
    />
  );
};`;

  const code4 = `import React, { useState } from 'react';
import { Rate } from '../components';

const App = () => {
  const [value, setValue] = useState(4);

  return (
    <Rate
      value={value}
      color="#ff6b6b"
      onChange={(newValue) => setValue(newValue)}
    />
  );
};`;

  const code5 = `import React, { useState } from 'react';
import { Rate } from '../components';

const App = () => {
  const [value, setValue] = useState(3.5);

  return (
    <Rate
      value={value}
      count={10}
      allowHalf={true}
      size={32}
      onChange={(newValue) => setValue(newValue)}
    />
  );
};`;

  return (
    <div style={{ padding: '20px' }}>
      <h1>Rate 评分组件</h1>

      <section>
        <h2>基础用法</h2>
        <p>点击星星进行评分，支持整数评分。</p>
        <div style={{ margin: '20px 0' }}>
          <Flex gap="20px" align="center">
            <Rate value={value1} onChange={setValue1} />
            <span>当前评分: {value1}</span>
          </Flex>
        </div>
        <CodeBlock code={code1} />
      </section>

      <section style={{ marginTop: '40px' }}>
        <h2>半星评分</h2>
        <p>支持半颗星的评分，通过 allowHalf 属性启用。</p>
        <div style={{ margin: '20px 0' }}>
          <Flex gap="20px" align="center">
            <Rate value={value2} allowHalf onChange={setValue2} />
            <span>当前评分: {value2}</span>
          </Flex>
        </div>
        <CodeBlock code={code2} />
      </section>

      <section style={{ marginTop: '40px' }}>
        <h2>只读模式</h2>
        <p>禁用状态的评分组件，不可交互。</p>
        <div style={{ margin: '20px 0' }}>
          <Flex gap="20px" align="center">
            <Rate value={value3} disabled />
            <span>当前评分: {value3}</span>
          </Flex>
        </div>
        <CodeBlock code={code3} />
      </section>

      <section style={{ marginTop: '40px' }}>
        <h2>自定义颜色</h2>
        <p>可以通过 color 属性自定义星星的颜色。</p>
        <div style={{ margin: '20px 0' }}>
          <Flex gap="20px" align="center">
            <Rate value={value4} color="#ff6b6b" onChange={setValue4} />
            <span>当前评分: {value4}</span>
          </Flex>
        </div>
        <CodeBlock code={code4} />
      </section>

      <section style={{ marginTop: '40px' }}>
        <h2>自定义星星数量和大小</h2>
        <p>通过 count 属性设置星星总数，size 属性设置星星大小。</p>
        <div style={{ margin: '20px 0' }}>
          <Flex gap="20px" align="center">
            <Rate value={value5} count={10} allowHalf size={32} onChange={setValue5} />
            <span>当前评分: {value5}</span>
          </Flex>
        </div>
        <CodeBlock code={code5} />
      </section>

      <section style={{ marginTop: '40px' }}>
        <h2>API 文档</h2>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
          <thead>
            <tr style={{ background: '#f5f5f5' }}>
              <th style={{ padding: '12px', textAlign: 'left', border: '1px solid #ddd' }}>参数</th>
              <th style={{ padding: '12px', textAlign: 'left', border: '1px solid #ddd' }}>说明</th>
              <th style={{ padding: '12px', textAlign: 'left', border: '1px solid #ddd' }}>类型</th>
              <th style={{ padding: '12px', textAlign: 'left', border: '1px solid #ddd' }}>默认值</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: '12px', border: '1px solid #ddd' }}>value</td>
              <td style={{ padding: '12px', border: '1px solid #ddd' }}>当前评分值</td>
              <td style={{ padding: '12px', border: '1px solid #ddd' }}>number</td>
              <td style={{ padding: '12px', border: '1px solid #ddd' }}>0</td>
            </tr>
            <tr>
              <td style={{ padding: '12px', border: '1px solid #ddd' }}>count</td>
              <td style={{ padding: '12px', border: '1px solid #ddd' }}>星星总数</td>
              <td style={{ padding: '12px', border: '1px solid #ddd' }}>number</td>
              <td style={{ padding: '12px', border: '1px solid #ddd' }}>5</td>
            </tr>
            <tr>
              <td style={{ padding: '12px', border: '1px solid #ddd' }}>allowHalf</td>
              <td style={{ padding: '12px', border: '1px solid #ddd' }}>是否允许半星</td>
              <td style={{ padding: '12px', border: '1px solid #ddd' }}>boolean</td>
              <td style={{ padding: '12px', border: '1px solid #ddd' }}>true</td>
            </tr>
            <tr>
              <td style={{ padding: '12px', border: '1px solid #ddd' }}>disabled</td>
              <td style={{ padding: '12px', border: '1px solid #ddd' }}>是否只读</td>
              <td style={{ padding: '12px', border: '1px solid #ddd' }}>boolean</td>
              <td style={{ padding: '12px', border: '1px solid #ddd' }}>false</td>
            </tr>
            <tr>
              <td style={{ padding: '12px', border: '1px solid #ddd' }}>color</td>
              <td style={{ padding: '12px', border: '1px solid #ddd' }}>自定义颜色</td>
              <td style={{ padding: '12px', border: '1px solid #ddd' }}>string</td>
              <td style={{ padding: '12px', border: '1px solid #ddd' }}>#1677ff</td>
            </tr>
            <tr>
              <td style={{ padding: '12px', border: '1px solid #ddd' }}>size</td>
              <td style={{ padding: '12px', border: '1px solid #ddd' }}>星星大小</td>
              <td style={{ padding: '12px', border: '1px solid #ddd' }}>number</td>
              <td style={{ padding: '12px', border: '1px solid #ddd' }}>24</td>
            </tr>
            <tr>
              <td style={{ padding: '12px', border: '1px solid #ddd' }}>onChange</td>
              <td style={{ padding: '12px', border: '1px solid #ddd' }}>评分变化回调</td>
              <td style={{ padding: '12px', border: '1px solid #ddd' }}>(value: number) =&gt; void</td>
              <td style={{ padding: '12px', border: '1px solid #ddd' }}>-</td>
            </tr>
            <tr>
              <td style={{ padding: '12px', border: '1px solid #ddd' }}>className</td>
              <td style={{ padding: '12px', border: '1px solid #ddd' }}>自定义类名</td>
              <td style={{ padding: '12px', border: '1px solid #ddd' }}>string</td>
              <td style={{ padding: '12px', border: '1px solid #ddd' }}>-</td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default RateExample;
