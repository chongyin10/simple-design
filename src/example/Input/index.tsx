import React, { useState } from 'react';
import { Input, Flex } from '../../components';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

// 复制功能组件
const CopyBlock: React.FC<{ code: string }> = ({ code }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('复制失败:', err);
    }
  };

  return (
    <div style={{ position: 'relative', marginBottom: '16px' }}>
      <button
        onClick={handleCopy}
        style={{
          position: 'absolute',
          top: '8px',
          right: '8px',
          padding: '4px 8px',
          background: copied ? '#52c41a' : '#1890ff',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '12px',
          zIndex: 1,
        }}
      >
        {copied ? '已复制' : '复制'}
      </button>
      <SyntaxHighlighter language="tsx" style={vscDarkPlus} customStyle={{ margin: 0 }}>
        {code}
      </SyntaxHighlighter>
    </div>
  );
};

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div style={{ marginBottom: '32px' }}>
    <h2 style={{ marginTop: 0, marginBottom: '16px', color: '#333' }}>{title}</h2>
    {children}
  </div>
);

const DemoRow: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <Flex align="center" gap="middle" style={{ marginBottom: '16px' }}>
    <span style={{ minWidth: '120px', fontWeight: 500 }}>{title}:</span>
    {children}
  </Flex>
);

const InputExample: React.FC = () => {
  const [textValue, setTextValue] = useState('');
  const [searchValue, setSearchValue] = useState('');

  return (
    <div style={{ padding: '20px' }}>
      <h1>Input 输入框</h1>
      <p>用于接收用户输入的基础表单组件，支持文本、数字和搜索等多种类型。</p>

      {/* 基础用法 */}
      <Section title="基础用法">
        <DemoRow title="文本输入">
          <Input
            placeholder="请输入文本"
            value={textValue}
            onChange={(e) => setTextValue(e.target.value)}
            width="300px"
          />
          <span>值: {textValue}</span>
        </DemoRow>
        <CopyBlock code={`import { Input } from '@idp/design';
import { useState } from 'react';

const Demo = () => {
  const [value, setValue] = useState('');

  return (
    <Input
      placeholder="请输入文本"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      width="300px"
    />
  );
};`} />
      </Section>

      {/* 尺寸 */}
      <Section title="尺寸">
        <DemoRow title="默认宽度">
          <Input placeholder="默认宽度" />
        </DemoRow>
        <DemoRow title="固定宽度">
          <Input placeholder="宽度 200px" width="200px" />
        </DemoRow>
        <DemoRow title="百分比宽度">
          <Input placeholder="宽度 50%" width="50%" />
        </DemoRow>
        <CopyBlock code={`<Input placeholder="默认宽度" />
<Input placeholder="宽度 200px" width="200px" />
<Input placeholder="宽度 50%" width="50%" />`} />
      </Section>

      {/* 状态 */}
      <Section title="状态">
        <DemoRow title="禁用状态">
          <Input placeholder="禁用状态" disabled width="200px" />
        </DemoRow>
        <DemoRow title="只读状态">
          <Input placeholder="只读状态" readOnly value="只读内容" width="200px" />
        </DemoRow>
        <CopyBlock code={`<Input placeholder="禁用状态" disabled />
<Input placeholder="只读状态" readOnly value="只读内容" />`} />
      </Section>

      {/* 前缀后缀 */}
      <Section title="前缀后缀">
        <DemoRow title="图标前缀">
          <Input placeholder="用户名" prefix="user" width="300px" />
        </DemoRow>
        <DemoRow title="图标后缀">
          <Input placeholder="密码" suffix="close" width="300px" />
        </DemoRow>
        <DemoRow title="前后缀组合">
          <Input placeholder="搜索" prefix="search" suffix="close" width="300px" />
        </DemoRow>
        <DemoRow title="自定义前缀">
          <Input placeholder="金额" prefix={<span style={{ color: '#f5222d' }}>¥</span>} width="300px" />
        </DemoRow>
        <DemoRow title="自定义后缀">
          <Input placeholder="百分比" suffix={<span style={{ color: '#52c41a' }}>%</span>} width="300px" />
        </DemoRow>
        <CopyBlock code={`// 图标前缀
<Input placeholder="用户名" prefix="user" />

// 图标后缀
<Input placeholder="密码" suffix="close" />

// 前后缀组合
<Input placeholder="搜索" prefix="search" suffix="close" />

// 自定义前缀
<Input placeholder="金额" prefix={<span style={{ color: '#f5222d' }}>¥</span>} />

// 自定义后缀
<Input placeholder="百分比" suffix={<span style={{ color: '#52c41a' }}>%</span>} />`} />
      </Section>

      {/* 清除按钮 */}
      <Section title="清除按钮">
        <DemoRow title="基本用法">
          <Input
            placeholder="请输入内容"
            value={textValue}
            onChange={(e) => setTextValue(e.target.value)}
            clear
            width="300px"
          />
        </DemoRow>
        <DemoRow title="带前缀">
          <Input
            placeholder="带前缀的清除按钮"
            prefix="user"
            value={textValue}
            onChange={(e) => setTextValue(e.target.value)}
            clear
            width="300px"
          />
        </DemoRow>
        <DemoRow title="禁用状态">
          <Input placeholder="禁用状态" defaultValue="禁用内容" disabled clear width="300px" />
        </DemoRow>
        <CopyBlock code={`// 基本用法
<Input
  placeholder="请输入内容"
  value={value}
  onChange={(e) => setValue(e.target.value)}
  clear
/>

// 带前缀
<Input placeholder="带前缀" prefix="user" clear />

// 禁用状态
<Input placeholder="禁用状态" defaultValue="禁用内容" disabled clear />`} />
      </Section>

      {/* 提示信息 */}
      <Section title="提示信息">
        <DemoRow title="基本用法">
          <Input placeholder="请输入用户名" extra="用户名长度6-20个字符" width="300px" />
        </DemoRow>
        <DemoRow title="带前后缀">
          <Input placeholder="请输入金额" prefix="¥" suffix="元" extra="支持小数点后两位" width="300px" />
        </DemoRow>
        <CopyBlock code={`<Input placeholder="请输入用户名" extra="用户名长度6-20个字符" />

<Input placeholder="请输入金额" prefix="¥" suffix="元" extra="支持小数点后两位" />`} />
      </Section>

      {/* 标签 */}
      <Section title="标签">
        <DemoRow title="基本用法">
          <Input label="用户名" placeholder="请输入用户名" width="300px" />
        </DemoRow>
        <DemoRow title="自定义间距">
          <Input label="邮箱" labelGap={20} placeholder="请输入邮箱" width="300px" />
        </DemoRow>
        <DemoRow title="自定义样式">
          <Input
            label="手机号"
            labelGap={12}
            labelStyle={{ color: '#1890ff', fontWeight: 'bold' }}
            placeholder="请输入手机号"
            width="300px"
          />
        </DemoRow>
        <DemoRow title="自定义类名">
          <Input
            label="地址"
            labelGap={8}
            labelClassName="custom-label"
            placeholder="请输入地址"
            width="300px"
          />
        </DemoRow>
        <DemoRow title="带前后缀">
          <Input label="金额" prefix="¥" suffix="元" placeholder="请输入金额" width="300px" />
        </DemoRow>
        <DemoRow title="带清除按钮">
          <Input
            label="备注"
            labelGap={10}
            placeholder="请输入备注"
            clear
            width="300px"
            value={textValue}
            onChange={(e) => setTextValue(e.target.value)}
          />
        </DemoRow>
        <CopyBlock code={`// 基本用法
<Input label="用户名" placeholder="请输入用户名" />

// 自定义间距
<Input label="邮箱" labelGap={20} placeholder="请输入邮箱" />

// 自定义样式
<Input
  label="手机号"
  labelGap={12}
  labelStyle={{ color: '#1890ff', fontWeight: 'bold' }}
  placeholder="请输入手机号"
/>

// 自定义类名
<Input
  label="地址"
  labelGap={8}
  labelClassName="custom-label"
  placeholder="请输入地址"
/>

// 带前后缀
<Input label="金额" prefix="¥" suffix="元" placeholder="请输入金额" />

// 带清除按钮
<Input
  label="备注"
  labelGap={10}
  placeholder="请输入备注"
  clear
  value={value}
  onChange={(e) => setValue(e.target.value)}
/>`} />
      </Section>

      {/* 键盘事件 */}
      <Section title="键盘事件">
        <DemoRow title="回车事件">
          <Input
            placeholder="按下 Enter 键"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                alert('Enter 键被按下');
              }
            }}
            width="300px"
          />
        </DemoRow>
        <CopyBlock code={`<Input
  placeholder="按下 Enter 键"
  onKeyDown={(e) => {
    if (e.key === 'Enter') {
      alert('Enter 键被按下');
    }
  }}
/>`} />
      </Section>

      {/* 搜索输入框 */}
      <Section title="搜索输入框">
        <DemoRow title="基础搜索">
          <Input.Search
            placeholder="请输入搜索内容"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onSearch={() => alert(`搜索: ${searchValue}`)}
            width="300px"
          />
        </DemoRow>
        <DemoRow title="带清除按钮">
          <Input.Search
            placeholder="使用统一清除按钮"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onSearch={() => alert(`搜索: ${searchValue}`)}
            clear
            width="300px"
          />
        </DemoRow>
        <CopyBlock code={`import { Input } from '@idp/design';

// 基础搜索
<Input.Search
  placeholder="请输入搜索内容"
  value={searchValue}
  onChange={(e) => setSearchValue(e.target.value)}
  onSearch={() => console.log('搜索:', searchValue)}
/>

// 带清除按钮
<Input.Search
  placeholder="使用统一清除按钮"
  value={searchValue}
  onChange={(e) => setSearchValue(e.target.value)}
  onSearch={() => console.log('搜索:', searchValue)}
  clear
/>`} />
      </Section>

      {/* 数字输入框 */}
      <Section title="数字输入框">
        <DemoRow title="正浮点数">
          <Input.Number placeholder="正浮点数" nType="positive-float" width="200px" />
        </DemoRow>
        <DemoRow title="正整数">
          <Input.Number placeholder="正整数" nType="positive-integer" width="200px" />
        </DemoRow>
        <DemoRow title="整数">
          <Input.Number placeholder="整数" nType="integer" width="200px" />
        </DemoRow>
        <DemoRow title="带前后缀">
          <Input.Number placeholder="金额" nType="positive-float" prefix="¥" suffix="元" width="200px" />
        </DemoRow>
        <DemoRow title="带清除按钮">
          <Input.Number placeholder="带清除按钮" nType="positive-float" clear width="200px" />
        </DemoRow>
        <DemoRow title="自定义错误消息">
          <Input.Number placeholder="正整数" nType="positive-integer" errorMessage="请输入有效的正整数" width="200px" />
        </DemoRow>
        <DemoRow title="带提示信息">
          <Input.Number placeholder="正整数" nType="positive-integer" extra="请输入大于0的整数" width="200px" />
        </DemoRow>
        <CopyBlock code={`// 正浮点数
<Input.Number placeholder="正浮点数" nType="positive-float" />

// 正整数
<Input.Number placeholder="正整数" nType="positive-integer" />

// 整数
<Input.Number placeholder="整数" nType="integer" />

// 带前后缀
<Input.Number placeholder="金额" nType="positive-float" prefix="¥" suffix="元" />

// 带清除按钮
<Input.Number placeholder="带清除按钮" nType="positive-float" clear />

// 自定义错误消息
<Input.Number placeholder="正整数" nType="positive-integer" errorMessage="请输入有效的正整数" />

// 带提示信息
<Input.Number placeholder="正整数" nType="positive-integer" extra="请输入大于0的整数" />`} />
      </Section>

      {/* API 文档 */}
      <Section title="API">
        <h3>Input Props</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '24px' }}>
          <thead>
            <tr style={{ backgroundColor: '#f5f5f5' }}>
              <th style={{ border: '1px solid #d9d9d9', padding: '8px', textAlign: 'left' }}>属性</th>
              <th style={{ border: '1px solid #d9d9d9', padding: '8px', textAlign: 'left' }}>说明</th>
              <th style={{ border: '1px solid #d9d9d9', padding: '8px', textAlign: 'left' }}>类型</th>
              <th style={{ border: '1px solid #d9d9d9', padding: '8px', textAlign: 'left' }}>默认值</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>type</td>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>输入框类型</td>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>'text'</td>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>'text'</td>
            </tr>
            <tr>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>placeholder</td>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>占位符文本</td>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>string</td>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>-</td>
            </tr>
            <tr>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>value</td>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>输入值</td>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>string</td>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>-</td>
            </tr>
            <tr>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>width</td>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>自定义宽度</td>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>string | number</td>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>-</td>
            </tr>
            <tr>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>disabled</td>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>是否禁用</td>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>boolean</td>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>false</td>
            </tr>
            <tr>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>readOnly</td>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>是否只读</td>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>boolean</td>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>false</td>
            </tr>
            <tr>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>prefix</td>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>输入框前缀</td>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>string | React.ReactNode</td>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>-</td>
            </tr>
            <tr>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>suffix</td>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>输入框后缀</td>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>string | React.ReactNode</td>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>-</td>
            </tr>
            <tr>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>clear</td>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>是否显示清除按钮</td>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>boolean</td>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>false</td>
            </tr>
            <tr>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>extra</td>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>提示信息</td>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>string | React.ReactNode</td>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>-</td>
            </tr>
            <tr>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>label</td>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>标签文案，显示在输入框前面</td>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>string | React.ReactNode</td>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>-</td>
            </tr>
            <tr>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>labelGap</td>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>标签到输入框的距离</td>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>string | number</td>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>8</td>
            </tr>
            <tr>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>labelClassName</td>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>标签的CSS类名</td>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>string</td>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>-</td>
            </tr>
            <tr>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>labelStyle</td>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>标签的样式</td>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>React.CSSProperties</td>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>-</td>
            </tr>
            <tr>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>onChange</td>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>输入变化事件</td>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>{`(e: React.ChangeEvent) => void`}</td>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>-</td>
            </tr>
            <tr>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>onBlur</td>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>失去焦点事件</td>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>{`(e: React.FocusEvent) => void`}</td>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>-</td>
            </tr>
            <tr>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>onFocus</td>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>获取焦点事件</td>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>{`(e: React.FocusEvent) => void`}</td>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>-</td>
            </tr>
            <tr>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>onKeyDown</td>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>键盘按下事件</td>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>{`(e: React.KeyboardEvent) => void`}</td>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>-</td>
            </tr>
          </tbody>
        </table>

        <h3>Input.Search Props</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '24px' }}>
          <thead>
            <tr style={{ backgroundColor: '#f5f5f5' }}>
              <th style={{ border: '1px solid #d9d9d9', padding: '8px', textAlign: 'left' }}>属性</th>
              <th style={{ border: '1px solid #d9d9d9', padding: '8px', textAlign: 'left' }}>说明</th>
              <th style={{ border: '1px solid #d9d9d9', padding: '8px', textAlign: 'left' }}>类型</th>
              <th style={{ border: '1px solid #d9d9d9', padding: '8px', textAlign: 'left' }}>默认值</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>onSearch</td>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>搜索事件</td>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>{`() => void`}</td>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>-</td>
            </tr>
            <tr>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>onClear</td>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>清除事件</td>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>{`() => void`}</td>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>-</td>
            </tr>
          </tbody>
        </table>

        <h3>Input.Number Props</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#f5f5f5' }}>
              <th style={{ border: '1px solid #d9d9d9', padding: '8px', textAlign: 'left' }}>属性</th>
              <th style={{ border: '1px solid #d9d9d9', padding: '8px', textAlign: 'left' }}>说明</th>
              <th style={{ border: '1px solid #d9d9d9', padding: '8px', textAlign: 'left' }}>类型</th>
              <th style={{ border: '1px solid #d9d9d9', padding: '8px', textAlign: 'left' }}>默认值</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>nType</td>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>数字类型验证</td>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>'positive-float' | 'negative-float' | 'positive-integer' | 'negative-integer' | 'integer' | 'negative' | 'positive'</td>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>-</td>
            </tr>
            <tr>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>errorMessage</td>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>自定义错误消息</td>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>string</td>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>-</td>
            </tr>
          </tbody>
        </table>
      </Section>
    </div>
  );
};

export default InputExample;
