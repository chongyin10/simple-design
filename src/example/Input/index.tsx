import React, { useState } from 'react';
import { Input, Table } from '../../components';
import type { Column } from '../../components/Table';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

const InputExample: React.FC = () => {
  const [textValue, setTextValue] = useState('');
  const [searchValue, setSearchValue] = useState('');

  // API参数列配置
  const apiColumns: Column[] = [
    { dataIndex: 'param', title: '参数名', width: '150px' },
    { dataIndex: 'type', title: '类型', width: '300px' },
    { dataIndex: 'default', title: '默认值', width: '150px' },
    { dataIndex: 'description', title: '描述', width: '300px' }
  ];

  // 通用API参数数据源
  const commonApiDataSource = [
    { param: 'type', type: "'text'", default: 'text', description: '输入框类型' },
    { param: 'placeholder', type: 'string', default: '-', description: '占位符文本' },
    { param: 'width', type: 'string | number', default: '-', description: '自定义宽度' },
    { param: 'value', type: 'string', default: '-', description: '输入值' },
    { param: 'onChange', type: '(e: React.ChangeEvent<HTMLInputElement>) => void', default: '-', description: '输入变化事件' },
    { param: 'onBlur', type: '(e: React.FocusEvent<HTMLInputElement>) => void', default: '-', description: '失去焦点事件' },
    { param: 'onFocus', type: '(e: React.FocusEvent<HTMLInputElement>) => void', default: '-', description: '获取焦点事件' },
    { param: 'onKeyDown', type: '(e: React.KeyboardEvent<HTMLInputElement>) => void', default: '-', description: '键盘按下事件' },
    { param: 'disabled', type: 'boolean', default: 'false', description: '是否禁用' },
    { param: 'readOnly', type: 'boolean', default: 'false', description: '是否只读' },
    { param: 'className', type: 'string', default: '-', description: '自定义 CSS 类名' },
    { param: 'style', type: 'React.CSSProperties', default: '-', description: '自定义内联样式' },
    { param: 'prefix', type: 'string | React.ReactNode', default: '-', description: '输入框前缀' },
    { param: 'suffix', type: 'string | React.ReactNode', default: '-', description: '输入框后缀' },
    { param: 'clear', type: 'boolean', default: 'false', description: '是否显示清除按钮，当输入框有值且获得焦点时显示' }
  ];

  // Number组件API参数数据源
  const numberApiDataSource = [
    { param: 'nType', type: 'NumberType', default: '-', description: '数字类型验证，可选值：positive-float, negative-float, positive-integer, negative-integer, integer, negative, positive' },
    { param: 'errorMessage', type: 'string', default: '-', description: '自定义错误消息' }
  ];

  // Search组件API参数数据源
  const searchApiDataSource = [
    { param: 'onSearch', type: '() => void', default: '-', description: '搜索事件，点击搜索图标或按下回车触发' },
    { param: 'onClear', type: '() => void', default: '-', description: '清除事件，点击清除图标触发' }
  ];

  return (
    <div style={{ padding: '20px' }}>
      <h2>Input 组件</h2>
      <p>用于接收用户输入的组件，支持文本和数字类型，以及自定义宽度和占位符。</p>
      
      {/* 基本使用示例 */}
      <div style={{ marginBottom: '40px' }}>
        <h3>基本使用</h3>
        <p>展示不同类型和配置的输入框。</p>
        
        <h4>文本输入框</h4>
        <div style={{ marginBottom: '20px' }}>
          <Input 
            placeholder="请输入文本" 
            value={textValue} 
            onChange={(e) => setTextValue(e.target.value)} 
            style={{ marginRight: '10px' }}
          />
          <span>当前值: {textValue}</span>
        </div>
        
        <h4>自定义宽度</h4>
        <div style={{ marginBottom: '20px' }}>
          <Input 
            placeholder="宽度200px" 
            width="200px" 
            style={{ marginRight: '20px' }}
          />
          <Input 
            placeholder="宽度50%" 
            width="50%" 
          />
        </div>
        
        <h4>禁用和只读</h4>
        <div style={{ marginBottom: '20px' }}>
          <Input 
            placeholder="禁用状态" 
            disabled 
            style={{ marginRight: '20px' }}
          />
          <Input 
            placeholder="只读状态" 
            readOnly 
            value="只读内容"
          />
        </div>

        <h4>键盘事件</h4>
        <div style={{ marginBottom: '20px' }}>
          <Input 
            placeholder="按下Enter键触发事件" 
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                alert('Enter键被按下');
              }
            }} 
            width="300px"
            style={{ marginRight: '10px' }}
          />
          <span>尝试在输入框中按下Enter键</span>
        </div>

        <h4>带前缀后缀输入框</h4>
        <div style={{ marginBottom: '20px' }}>
          <p>所有输入框的前缀后缀间距保持一致，无论使用图标还是自定义React节点</p>
          
          <h5>前缀图标与自定义前缀对比</h5>
          <div style={{ marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Input 
              placeholder="用户名" 
              prefix="user" 
              width="300px"
            />
            <Input 
              placeholder="金额" 
              prefix={<span style={{ color: '#f5222d' }}>¥</span>} 
              width="300px"
            />
          </div>
          
          <h5>后缀图标与自定义后缀对比</h5>
          <div style={{ marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Input 
              placeholder="密码" 
              suffix="close" 
              width="300px"
            />
            <Input 
              placeholder="百分比" 
              suffix={<span style={{ color: '#52c41a' }}>%</span>} 
              width="300px"
            />
          </div>
          
          <h5>前后缀组合</h5>
          <div style={{ marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Input 
              placeholder="搜索" 
              prefix="search" 
              suffix="close" 
              width="300px"
            />
            <Input 
              placeholder="折扣" 
              prefix={<span style={{ color: '#f5222d' }}>¥</span>} 
              suffix={<span style={{ color: '#52c41a' }}>%</span>} 
              width="300px"
            />
          </div>
        </div>

        <h4>带清除按钮输入框</h4>
        <div style={{ marginBottom: '20px' }}>
          <p>当输入框有值且获得焦点时，显示清除按钮</p>
          
          <h5>基本用法</h5>
          <div style={{ marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Input 
              placeholder="请输入内容" 
              value={textValue} 
              onChange={(e) => setTextValue(e.target.value)} 
              clear 
              width="300px"
            />
            <span>当前值: {textValue}</span>
          </div>
          
          <h5>带前后缀的清除按钮</h5>
          <div style={{ marginBottom: '10px', display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            <Input 
              placeholder="带前缀" 
              prefix="user" 
              value={textValue} 
              onChange={(e) => setTextValue(e.target.value)} 
              clear 
              width="300px"
            />
            <Input 
              placeholder="带后缀图标" 
              suffix="close" 
              value={textValue} 
              onChange={(e) => setTextValue(e.target.value)} 
              clear 
              width="300px"
            />
            <Input 
              placeholder="带前后缀" 
              prefix="search" 
              suffix="close" 
              value={textValue} 
              onChange={(e) => setTextValue(e.target.value)} 
              clear 
              width="300px"
            />
          </div>
          
          <h5>自定义后缀节点</h5>
          <div style={{ marginBottom: '10px' }}>
            <Input 
              placeholder="金额" 
              suffix={<span style={{ color: '#52c41a' }}>元</span>} 
              value={textValue} 
              onChange={(e) => setTextValue(e.target.value)} 
              clear 
              width="300px"
            />
          </div>
          
          <h5>禁用和只读状态</h5>
          <div style={{ marginBottom: '10px', display: 'flex', gap: '10px' }}>
            <Input 
              placeholder="禁用状态" 
              value="禁用内容" 
              disabled 
              clear 
              width="300px"
            />
            <Input 
              placeholder="只读状态" 
              value="只读内容" 
              readOnly 
              clear 
              width="300px"
            />
          </div>
        </div>

        <h4>搜索输入框</h4>
        <div style={{ marginBottom: '20px' }}>
          <div style={{ marginBottom: '10px' }}>
            <h5>默认搜索输入框</h5>
            <Input.Search
              placeholder="请输入搜索内容"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onSearch={() => alert(`搜索: ${searchValue}`)}
              onClear={() => setSearchValue('')}
              width="300px"
              style={{ marginRight: '10px' }}
            />
            <span>当前搜索值: {searchValue}</span>
          </div>
          
          <div style={{ marginBottom: '10px' }}>
            <h5>使用clear属性的搜索输入框</h5>
            <Input.Search
              placeholder="使用统一清除按钮"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onSearch={() => alert(`搜索: ${searchValue}`)}
              clear
              width="300px"
            />
          </div>
        </div>
        
        <h4>数字输入框（NumberInput）</h4>
        <div style={{ marginBottom: '20px' }}>
          <p>带类型验证的数字输入框，支持多种数字类型验证</p>
          
          <h5>不同类型验证</h5>
          <div style={{ marginBottom: '20px', display: 'flex', flexWrap: 'wrap', gap: '15px' }}>
            <div style={{ width: '300px' }}>
              <Input.Number
                placeholder="正浮点数"
                nType="positive-float"
                width="100%"
                style={{ marginBottom: '5px' }}
              />
              <span style={{ fontSize: '12px', color: '#909399' }}>nType="positive-float"</span>
            </div>
            
            <div style={{ width: '300px' }}>
              <Input.Number
                placeholder="负浮点数"
                nType="negative-float"
                width="100%"
                style={{ marginBottom: '5px' }}
              />
              <span style={{ fontSize: '12px', color: '#909399' }}>nType="negative-float"</span>
            </div>
            
            <div style={{ width: '300px' }}>
              <Input.Number
                placeholder="正整数"
                nType="positive-integer"
                width="100%"
                style={{ marginBottom: '5px' }}
              />
              <span style={{ fontSize: '12px', color: '#909399' }}>nType="positive-integer"</span>
            </div>
            
            <div style={{ width: '300px' }}>
              <Input.Number
                placeholder="负整数"
                nType="negative-integer"
                width="100%"
                style={{ marginBottom: '5px' }}
              />
              <span style={{ fontSize: '12px', color: '#909399' }}>nType="negative-integer"</span>
            </div>
            
            <div style={{ width: '300px' }}>
              <Input.Number
                placeholder="整数"
                nType="integer"
                width="100%"
                style={{ marginBottom: '5px' }}
              />
              <span style={{ fontSize: '12px', color: '#909399' }}>nType="integer"</span>
            </div>
            
            <div style={{ width: '300px' }}>
              <Input.Number
                placeholder="负数"
                nType="negative"
                width="100%"
                style={{ marginBottom: '5px' }}
              />
              <span style={{ fontSize: '12px', color: '#909399' }}>nType="negative"</span>
            </div>
            
            <div style={{ width: '300px' }}>
              <Input.Number
                placeholder="正数"
                nType="positive"
                width="100%"
                style={{ marginBottom: '5px' }}
              />
              <span style={{ fontSize: '12px', color: '#909399' }}>nType="positive"</span>
            </div>
          </div>
          
          <h5>带默认值</h5>
          <div style={{ marginBottom: '10px', width: '300px' }}>
            <Input.Number
              placeholder="负整数"
              nType="negative-integer"
              value="-5"
              width="100%"
            />
          </div>
          
          <h5>带前后缀</h5>
          <div style={{ marginBottom: '10px', width: '300px' }}>
            <Input.Number
              placeholder="金额"
              nType="positive-float"
              prefix="¥"
              suffix="元"
              width="100%"
            />
          </div>
          
          <h5>带清除按钮</h5>
          <div style={{ marginBottom: '10px', width: '300px' }}>
            <Input.Number
              placeholder="带清除按钮"
              nType="positive-float"
              clear
              width="100%"
            />
          </div>
          
          <h5>自定义错误消息</h5>
          <div style={{ marginBottom: '10px', width: '300px' }}>
            <Input.Number
              placeholder="正整数"
              nType="positive-integer"
              errorMessage="请输入有效的正整数"
              width="100%"
            />
          </div>
        </div>
      </div>
      
      {/* API 文档 */}
      <div style={{ marginBottom: '40px', padding: '20px', background: '#fafafa', borderRadius: '8px' }}>
        <h3>通用 API 参数</h3>
        <Table pagination={false} columns={apiColumns} dataSource={commonApiDataSource} />
      </div>
      
      <div style={{ marginBottom: '40px', padding: '20px', background: '#fafafa', borderRadius: '8px' }}>
        <h3>Number 组件 API 参数</h3>
        <Table pagination={false} columns={apiColumns} dataSource={numberApiDataSource} />
      </div>
      
      <div style={{ marginBottom: '40px', padding: '20px', background: '#fafafa', borderRadius: '8px' }}>
        <h3>Search 组件 API 参数</h3>
        <Table pagination={false} columns={apiColumns} dataSource={searchApiDataSource} />
      </div>
      
      {/* 代码示例 */}
      <div style={{ marginBottom: '40px' }}>
        <h3>代码示例</h3>
        <SyntaxHighlighter language="tsx" style={vscDarkPlus} customStyle={{ borderRadius: '6px', margin: '0' }}>
{`import { Input } from '@idp-studio/design';

// 基本用法
<Input 
  placeholder="请输入文本" 
  value={textValue} 
  onChange={(e) => setTextValue(e.target.value)} 
/>

// 自定义宽度
<Input 
  placeholder="宽度200px" 
  width="200px" 
/>

// 禁用状态
<Input 
  placeholder="禁用状态" 
  disabled 
/>

// 只读状态
<Input 
  placeholder="只读状态" 
  readOnly 
  value="只读内容"
/>

// 键盘事件
<Input 
  placeholder="按下Enter键触发事件" 
  onKeyDown={(e) => {
    if (e.key === 'Enter') {
      alert('Enter键被按下');
    }
  }} 
  width="300px"
/>

// 带前缀
<Input 
  placeholder="用户名" 
  prefix="user" 
  width="300px"
/>

// 带后缀
<Input 
  placeholder="密码" 
  suffix="close" 
  width="300px"
/>

// 带前后缀
<Input 
  placeholder="搜索" 
  prefix="search" 
  suffix="close" 
  width="300px"
/>

// 自定义前缀（React节点）
<Input 
  placeholder="金额" 
  prefix={<span style={{ color: '#f5222d' }}>¥</span>} 
  width="300px"
/>

// 自定义后缀（React节点）
<Input 
  placeholder="百分比" 
  suffix={<span style={{ color: '#52c41a' }}>%</span>} 
  width="300px"
/>

// 带清除按钮输入框
<Input 
  placeholder="请输入内容" 
  value={textValue} 
  onChange={(e) => setTextValue(e.target.value)} 
  clear 
  width="300px"
/>

// 带前缀的清除按钮
<Input 
  placeholder="带前缀的清除按钮" 
  prefix="user" 
  value={textValue} 
  onChange={(e) => setTextValue(e.target.value)} 
  clear 
  width="300px"
/>

// 带后缀的清除按钮（清除按钮在后缀左边）
<Input 
  placeholder="带后缀的清除按钮" 
  suffix="close" 
  value={textValue} 
  onChange={(e) => setTextValue(e.target.value)} 
  clear 
  width="300px"
/>

// 搜索输入框
<Input.Search
  placeholder="请输入搜索内容"
  value={searchValue}
  onChange={(e) => setSearchValue(e.target.value)}
  onSearch={() => console.log('搜索:', searchValue)}
  onClear={() => setSearchValue('')}
  width="300px"
/>

// 使用clear属性的搜索输入框
<Input.Search
  placeholder="使用统一清除按钮"
  value={searchValue}
  onChange={(e) => setSearchValue(e.target.value)}
  onSearch={() => console.log('搜索:', searchValue)}
  clear
  width="300px"
/>

// 数字输入框（NumberInput）
// 正浮点数
<Input.Number
  placeholder="正浮点数"
  nType="positive-float"
  width="300px"
/>

// 负浮点数
<Input.Number
  placeholder="负浮点数"
  nType="negative-float"
  width="300px"
/>

// 正整数
<Input.Number
  placeholder="正整数"
  nType="positive-integer"
  width="300px"
/>

// 负整数
<Input.Number
  placeholder="负整数"
  nType="negative-integer"
  width="300px"
/>

// 整数
<Input.Number
  placeholder="整数"
  nType="integer"
  width="300px"
/>

// 负数
<Input.Number
  placeholder="负数"
  nType="negative"
  width="300px"
/>

// 正数
<Input.Number
  placeholder="正数"
  nType="positive"
  width="300px"
/>

// 带前后缀的数字输入框
<Input.Number
  placeholder="金额"
  nType="positive-float"
  prefix="¥"
  suffix="元"
  width="300px"
/>

// 带清除按钮
<Input.Number
  placeholder="带清除按钮"
  nType="positive-float"
  clear
  width="300px"
/>

// 自定义错误消息
<Input.Number
  placeholder="正整数"
  nType="positive-integer"
  errorMessage="请输入有效的正整数"
  width="300px"
/>`}
        </SyntaxHighlighter>
      </div>
      
      {/* 在其他项目中引用示例 */}
      <div>
        <h3>在其他项目中引用</h3>
        <div style={{ margin: '15px 0' }}>
          <h4>1. 安装</h4>
          <SyntaxHighlighter language="bash" style={vscDarkPlus} customStyle={{ borderRadius: '6px', margin: '0', fontSize: '14px', fontFamily: 'monospace' }}>
              {`npm install @idp-studio/design`}
          </SyntaxHighlighter>
        </div>
        <div>
          <h4>2. 引用组件</h4>
          <SyntaxHighlighter language="tsx" style={vscDarkPlus} customStyle={{ borderRadius: '6px', margin: '0', fontSize: '14px', fontFamily: 'monospace' }}>
{`// 方式一：单独引入
import Input from '@idp-studio/design/lib/Input';
import '@idp-studio/design/lib/Input/Input.css';

// 方式二：批量引入
import { Input } from '@idp-studio/design';
import '@idp-studio/design/lib/index.css';`}
          </SyntaxHighlighter>
        </div>
      </div>
    </div>
  );
};

export default InputExample;
