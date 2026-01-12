import React, { useState } from 'react';
import { Radio, Table } from '../../components';
import type { Column } from '../../components/Table';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

const RadioExample: React.FC = () => {
  // API参数列配置
  const apiColumns: Column[] = [
    { dataIndex: 'param', title: '参数名', width: '150px' },
    { dataIndex: 'type', title: '类型', width: '300px' },
    { dataIndex: 'default', title: '默认值', width: '150px' },
    { dataIndex: 'description', title: '描述', width: '300px' }
  ];

  // Radio API参数数据源
  const radioApiDataSource = [
    { param: 'value', type: 'any', default: '-', description: 'Radio的值，用于Group模式下的选中判断' },
    { param: 'checked', type: 'boolean', default: '-', description: '是否选中（受控模式）' },
    { param: 'defaultChecked', type: 'boolean', default: 'false', description: '默认是否选中（非受控模式）' },
    { param: 'onChange', type: '(checked: boolean, value: any) => void', default: '-', description: '变化时的回调函数' },
    { param: 'disabled', type: 'boolean', default: 'false', description: '是否禁用' },
    { param: 'size', type: '\'large\' | \'middle\' | \'small\'', default: '-', description: 'Radio的尺寸，优先使用Group传递的size' },
    { param: 'children', type: 'React.ReactNode', default: '-', description: 'Radio的文本内容' },
    { param: 'className', type: 'string', default: '-', description: '自定义CSS类名' },
    { param: 'style', type: 'React.CSSProperties', default: '-', description: '自定义内联样式' }
  ];

  // Radio.Group API参数数据源
  const radioGroupApiDataSource = [
    { param: 'value', type: 'any', default: '-', description: '当前选中的值（受控模式）' },
    { param: 'defaultValue', type: 'any', default: '-', description: '默认选中的值（非受控模式）' },
    { param: 'onChange', type: '(value: any) => void', default: '-', description: '选中值变化时的回调函数' },
    { param: 'disabled', type: 'boolean', default: 'false', description: '是否禁用所有子Radio' },
    { param: 'type', type: '\'button\' | \'radio\'', default: 'radio', description: 'Radio组的类型，\'button\'为按钮样式，\'radio\'为默认样式' },
    { param: 'size', type: '\'large\' | \'middle\' | \'small\'', default: 'middle', description: 'Radio组的尺寸，仅对按钮样式生效' },
    { param: 'children', type: 'React.ReactNode', default: '-', description: '子Radio元素' },
    { param: 'className', type: 'string', default: '-', description: '自定义CSS类名' },
    { param: 'style', type: 'React.CSSProperties', default: '-', description: '自定义内联样式' }
  ];

  // 受控模式示例状态
  const [controlledValue, setControlledValue] = useState<string>('option1');
  const [singleChecked, setSingleChecked] = useState<boolean>(false);

  return (
    <div style={{ padding: '20px' }}>
      <h2>Radio 组件</h2>
      <p>单选框组件，支持单个使用和组模式。</p>
      
      {/* 基本使用示例 */}
      <div style={{ marginBottom: '40px' }}>
        <h3>基本使用</h3>
        <p>展示单选框的基本使用方式。</p>
        
        <h4>单个 Radio</h4>
        <div style={{ marginBottom: '20px' }}>
          <Radio checked={singleChecked} onChange={setSingleChecked}>
            单个 Radio
          </Radio>
        </div>
        
        <h4>Radio 组模式</h4>
        <div style={{ marginBottom: '20px' }}>
          <Radio.Group>
            <Radio value="option1">选项 1</Radio>
            <Radio value="option2">选项 2</Radio>
            <Radio value="option3">选项 3</Radio>
          </Radio.Group>
        </div>
        
        <h4>受控模式 Radio 组</h4>
        <div style={{ marginBottom: '20px' }}>
          <Radio.Group 
            value={controlledValue} 
            onChange={setControlledValue}
          >
            <Radio value="option1">选项 1</Radio>
            <Radio value="option2">选项 2</Radio>
            <Radio value="option3">选项 3</Radio>
          </Radio.Group>
          <div style={{ marginTop: '10px', color: '#666' }}>
            当前选中值: <strong>{controlledValue}</strong>
          </div>
        </div>
        
        <h4>禁用状态</h4>
        <div style={{ marginBottom: '20px' }}>
          <Radio disabled>禁用的单个 Radio</Radio>
          
          <div style={{ marginTop: '10px' }}>
            <Radio.Group disabled>
              <Radio value="option1">禁用的选项 1</Radio>
              <Radio value="option2">禁用的选项 2</Radio>
              <Radio value="option3">禁用的选项 3</Radio>
            </Radio.Group>
          </div>
          
          <div style={{ marginTop: '10px' }}>
            <Radio.Group>
              <Radio value="option1">可用选项 1</Radio>
              <Radio value="option2" disabled>禁用选项 2</Radio>
              <Radio value="option3">可用选项 3</Radio>
            </Radio.Group>
          </div>
        </div>
        
        <h4>不同类型</h4>
        <div style={{ marginBottom: '20px' }}>
          <h5>默认类型（Radio）</h5>
          <div style={{ marginBottom: '10px' }}>
            <Radio.Group type="radio">
              <Radio value="option1">选项 1</Radio>
              <Radio value="option2">选项 2</Radio>
              <Radio value="option3">选项 3</Radio>
            </Radio.Group>
          </div>
          
          <h5>按钮类型</h5>
          <div style={{ marginBottom: '10px' }}>
            <Radio.Group type="button">
              <Radio value="option1">选项 1</Radio>
              <Radio value="option2">选项 2</Radio>
              <Radio value="option3">选项 3</Radio>
            </Radio.Group>
          </div>
        </div>
        
        <h4>按钮类型的不同尺寸</h4>
        <div style={{ marginBottom: '20px' }}>
          <div style={{ marginBottom: '10px' }}>
            <Radio.Group type="button" size="large">
              <Radio value="option1">大尺寸</Radio>
              <Radio value="option2">大尺寸</Radio>
              <Radio value="option3">大尺寸</Radio>
            </Radio.Group>
          </div>
          <div style={{ marginBottom: '10px' }}>
            <Radio.Group type="button" size="middle">
              <Radio value="option1">中尺寸</Radio>
              <Radio value="option2">中尺寸</Radio>
              <Radio value="option3">中尺寸</Radio>
            </Radio.Group>
          </div>
          <div style={{ marginBottom: '10px' }}>
            <Radio.Group type="button" size="small">
              <Radio value="option1">小尺寸</Radio>
              <Radio value="option2">小尺寸</Radio>
              <Radio value="option3">小尺寸</Radio>
            </Radio.Group>
          </div>
        </div>
        
        <h4>自定义宽高的按钮类型</h4>
        <div style={{ marginBottom: '20px' }}>
          <div style={{ marginBottom: '10px' }}>
            <Radio.Group type="button" style={{ width: '300px' }}>
              <Radio value="option1">自定义宽度</Radio>
              <Radio value="option2">自定义宽度</Radio>
            </Radio.Group>
          </div>
          <div style={{ marginBottom: '10px' }}>
            <Radio.Group type="button">
              <Radio value="option1" style={{ width: '100px', height: '50px' }}>宽按钮</Radio>
              <Radio value="option2" style={{ width: '150px', height: '50px' }}>更宽的按钮</Radio>
              <Radio value="option3" style={{ width: '100px', height: '50px' }}>高按钮</Radio>
            </Radio.Group>
          </div>
          <div style={{ marginBottom: '10px' }}>
            <Radio.Group type="button">
              <Radio value="option1" style={{ height: '60px' }}>自定义高度</Radio>
              <Radio value="option2" style={{ height: '60px' }}>自定义高度</Radio>
            </Radio.Group>
          </div>
        </div>
      </div>
      
      {/* API 文档 */}
      <div style={{ marginBottom: '40px', padding: '20px', background: '#fafafa', borderRadius: '8px' }}>
        <h3>API 参数</h3>
        
        <h4>Radio 组件</h4>
        <Table pagination={false} columns={apiColumns} dataSource={radioApiDataSource} />
        
        <h4 style={{ marginTop: '30px' }}>Radio.Group 组件</h4>
        <Table pagination={false} columns={apiColumns} dataSource={radioGroupApiDataSource} />
      </div>
      
      {/* 代码示例 */}
      <div style={{ marginBottom: '40px' }}>
        <h3>代码示例</h3>
        <SyntaxHighlighter language="tsx" style={vscDarkPlus} customStyle={{ borderRadius: '6px', margin: '0' }}>
{`import { Radio } from '@idp-studio/design';
import React, { useState } from 'react';

// 单个 Radio
const SingleRadioExample = () => {
  const [checked, setChecked] = useState(false);
  
  return (
    <Radio checked={checked} onChange={setChecked}>
      单个 Radio
    </Radio>
  );
};

// Radio 组模式
const RadioGroupExample = () => {
  return (
    <Radio.Group>
      <Radio value="option1">选项 1</Radio>
      <Radio value="option2">选项 2</Radio>
      <Radio value="option3">选项 3</Radio>
    </Radio.Group>
  );
};

// 受控模式 Radio 组
const ControlledRadioGroupExample = () => {
  const [value, setValue] = useState<string>('option1');
  
  return (
    <>
      <Radio.Group value={value} onChange={setValue}>
        <Radio value="option1">选项 1</Radio>
        <Radio value="option2">选项 2</Radio>
        <Radio value="option3">选项 3</Radio>
      </Radio.Group>
      <p>当前选中值: {value}</p>
    </>
  );
};

// 禁用状态
const DisabledRadioExample = () => {
  return (
    <>
      {/* 单个禁用 */}
      <Radio disabled>禁用的单个 Radio</Radio>
      
      {/* 整个组禁用 */}
      <Radio.Group disabled>
        <Radio value="option1">禁用的选项 1</Radio>
        <Radio value="option2">禁用的选项 2</Radio>
        <Radio value="option3">禁用的选项 3</Radio>
      </Radio.Group>
      
      {/* 部分禁用 */}
      <Radio.Group>
        <Radio value="option1">可用选项 1</Radio>
        <Radio value="option2" disabled>禁用选项 2</Radio>
        <Radio value="option3">可用选项 3</Radio>
      </Radio.Group>
    </>
  );
};

// 不同类型
const RadioTypeExample = () => {
  return (
    <>
      {/* 默认类型 */}
      <div style={{ marginBottom: '20px' }}>
        <h4>默认类型</h4>
        <Radio.Group type="radio">
          <Radio value="option1">选项 1</Radio>
          <Radio value="option2">选项 2</Radio>
          <Radio value="option3">选项 3</Radio>
        </Radio.Group>
      </div>
      
      {/* 按钮类型 */}
      <div style={{ marginBottom: '20px' }}>
        <h4>按钮类型</h4>
        <Radio.Group type="button">
          <Radio value="option1">选项 1</Radio>
          <Radio value="option2">选项 2</Radio>
          <Radio value="option3">选项 3</Radio>
        </Radio.Group>
      </div>
      
      {/* 按钮类型的不同尺寸 */}
      <div style={{ marginBottom: '20px' }}>
        <h4>按钮类型的不同尺寸</h4>
        <div style={{ marginBottom: '10px' }}>
          <Radio.Group type="button" size="large">
            <Radio value="option1">大尺寸</Radio>
            <Radio value="option2">大尺寸</Radio>
            <Radio value="option3">大尺寸</Radio>
          </Radio.Group>
        </div>
        <div style={{ marginBottom: '10px' }}>
          <Radio.Group type="button" size="middle">
            <Radio value="option1">中尺寸</Radio>
            <Radio value="option2">中尺寸</Radio>
            <Radio value="option3">中尺寸</Radio>
          </Radio.Group>
        </div>
        <div style={{ marginBottom: '10px' }}>
          <Radio.Group type="button" size="small">
            <Radio value="option1">小尺寸</Radio>
            <Radio value="option2">小尺寸</Radio>
            <Radio value="option3">小尺寸</Radio>
          </Radio.Group>
        </div>
      </div>
      
      {/* 按钮类型的自定义宽高 */}
      <div>
        <h4>按钮类型的自定义宽高</h4>
        <div style={{ marginBottom: '10px' }}>
          <Radio.Group type="button" style={{ width: '300px' }}>
            <Radio value="option1">自定义宽度</Radio>
            <Radio value="option2">自定义宽度</Radio>
          </Radio.Group>
        </div>
        <div style={{ marginBottom: '10px' }}>
          <Radio.Group type="button">
            <Radio value="option1" style={{ width: '100px', height: '50px' }}>宽按钮</Radio>
            <Radio value="option2" style={{ width: '150px', height: '50px' }}>更宽的按钮</Radio>
            <Radio value="option3" style={{ width: '100px', height: '50px' }}>高按钮</Radio>
          </Radio.Group>
        </div>
        <div style={{ marginBottom: '10px' }}>
          <Radio.Group type="button">
            <Radio value="option1" style={{ height: '60px' }}>自定义高度</Radio>
            <Radio value="option2" style={{ height: '60px' }}>自定义高度</Radio>
          </Radio.Group>
        </div>
      </div>
    </>
  );
};
`}
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
import Radio from '@idp-studio/design/lib/Radio';
import '@idp-studio/design/lib/Radio/Radio.css';

// 方式二：批量引入
import { Radio } from '@idp-studio/design';
import '@idp-studio/design/lib/index.css';

// 使用示例
const App = () => {
  return (
    <Radio.Group>
      <Radio value="option1">选项 1</Radio>
      <Radio value="option2">选项 2</Radio>
      <Radio value="option3">选项 3</Radio>
    </Radio.Group>
  );
};
`}
          </SyntaxHighlighter>
        </div>
      </div>
    </div>
  );
};

export default RadioExample;