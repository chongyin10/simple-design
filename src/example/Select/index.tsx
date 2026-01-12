import React, { useState } from 'react';
import { Select, Table } from '../../components';
import type { Column } from '../../components/Table';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

const SelectExample: React.FC = () => {
  const [value1, setValue1] = useState<string>();
  const [value2, setValue2] = useState<string>();
  const [value3, setValue3] = useState<string>('apple');

  const options = [
    { value: 'apple', label: '苹果' },
    { value: 'banana', label: '香蕉' },
    { value: 'orange', label: '橙子' },
    { value: 'grape', label: '葡萄' },
    { value: 'watermelon', label: '西瓜' }
  ];

  // API参数列配置
  const apiColumns: Column[] = [
    { dataIndex: 'param', title: '参数名', width: '150px' },
    { dataIndex: 'type', title: '类型', width: '300px' },
    { dataIndex: 'default', title: '默认值', width: '150px' },
    { dataIndex: 'description', title: '描述', width: '300px' }
  ];

  // API参数数据源
  const apiDataSource = [
    { param: 'value', type: 'any', default: '-', description: '当前选中的值' },
    { param: 'defaultValue', type: 'any', default: '-', description: '默认选中的值' },
    { param: 'onChange', type: '(value: any) => void', default: '-', description: '值变化时的回调函数' },
    { param: 'placeholder', type: 'string', default: '请选择', description: '占位符文本' },
    { param: 'disabled', type: 'boolean', default: 'false', description: '是否禁用选择器' },
    { param: 'size', type: "'large' | 'middle' | 'small'", default: 'middle', description: '选择器尺寸' },
    { param: 'style', type: 'React.CSSProperties', default: '-', description: '自定义内联样式' },
    { param: 'className', type: 'string', default: '-', description: '自定义CSS类名' },
    { param: 'options', type: 'SelectOption[]', default: '-', description: '选项列表' },
    { param: 'children', type: 'React.ReactNode', default: '-', description: '子节点' }
  ];

  return (
    <div style={{ padding: '20px' }}>
      <h2>Select 组件</h2>
      <p>基本的选择器组件，可以让用户从预设的选项中选择一个值。</p>

      {/* 基本使用示例 */}
      <div style={{ marginBottom: '40px' }}>
        <h3>基本使用</h3>
        <p>展示不同方式和配置的选择器。</p>

        <h4>使用 options 属性</h4>
        <div style={{ marginBottom: '20px', maxWidth: '400px' }}>
          <Select
            value={value1}
            onChange={setValue1}
            options={options}
            placeholder="请选择水果"
          />
        </div>

        <h4>使用 children 方式</h4>
        <div style={{ marginBottom: '20px', maxWidth: '400px' }}>
          <Select
            value={value2}
            onChange={setValue2}
            placeholder="请选择水果"
          >
            <Select.Option value="apple">苹果</Select.Option>
            <Select.Option value="banana">香蕉</Select.Option>
            <Select.Option value="orange">橙子</Select.Option>
            <Select.Option value="grape">葡萄</Select.Option>
            <Select.Option value="watermelon">西瓜</Select.Option>
          </Select>
        </div>

        <h4>不同尺寸</h4>
        <div style={{ marginBottom: '20px', maxWidth: '400px' }}>
          <div style={{ marginBottom: '10px' }}>
            <Select
              size="large"
              options={options}
              placeholder="大尺寸"
            />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <Select
              size="middle"
              options={options}
              placeholder="中尺寸（默认）"
            />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <Select
              size="small"
              options={options}
              placeholder="小尺寸"
            />
          </div>
        </div>

        <h4>禁用状态</h4>
        <div style={{ marginBottom: '20px' }}>
          <div style={{ marginBottom: '10px', maxWidth: '400px' }}>
            <Select
              disabled
              options={options}
              placeholder="禁用整个选择器"
            />
          </div>
          <div style={{ marginBottom: '10px', maxWidth: '400px' }}>
            <Select
              options={[
                { value: 'apple', label: '苹果' },
                { value: 'banana', label: '香蕉', disabled: true },
                { value: 'orange', label: '橙子' },
                { value: 'grape', label: '葡萄', disabled: true },
                { value: 'watermelon', label: '西瓜' }
              ]}
              placeholder="禁用部分选项"
            />
          </div>
        </div>

        <h4>分组选项</h4>
        <div style={{ marginBottom: '20px', maxWidth: '400px' }}>
          <Select placeholder="请选择水果或蔬菜">
            <Select.OptGroup label="水果">
              <Select.Option value="apple">苹果</Select.Option>
              <Select.Option value="banana">香蕉</Select.Option>
              <Select.Option value="orange">橙子</Select.Option>
            </Select.OptGroup>
            <Select.OptGroup label="蔬菜">
              <Select.Option value="carrot">胡萝卜</Select.Option>
              <Select.Option value="cabbage">白菜</Select.Option>
              <Select.Option value="tomato">西红柿</Select.Option>
            </Select.OptGroup>
          </Select>
        </div>

        <h4>默认值</h4>
        <div style={{ marginBottom: '20px', maxWidth: '400px' }}>
          <Select
            value={value3}
            onChange={setValue3}
            options={options}
            placeholder="请选择水果"
          />
        </div>
      </div>

      {/* API 文档 */}
      <div style={{ marginBottom: '40px', padding: '20px', background: '#fafafa', borderRadius: '8px' }}>
        <h3>API 参数</h3>
        <Table pagination={false} columns={apiColumns} dataSource={apiDataSource} />
      </div>

      {/* 代码示例 */}
      <div style={{ marginBottom: '40px' }}>
        <h3>代码示例</h3>
        <SyntaxHighlighter language="tsx" style={vscDarkPlus} customStyle={{ borderRadius: '6px', margin: '0' }}>
{`import { Select } from '@zjpcy/simple-design';

// 使用 options 属性
<Select
  value={value}
  onChange={setValue}
  options={[
    { value: 'apple', label: '苹果' },
    { value: 'banana', label: '香蕉' },
    { value: 'orange', label: '橙子' }
  ]}
  placeholder="请选择水果"
/>

// 使用 children 方式
<Select value={value} onChange={setValue}>
  <Select.Option value="apple">苹果</Select.Option>
  <Select.Option value="banana">香蕉</Select.Option>
  <Select.Option value="orange">橙子</Select.Option>
</Select>

// 不同尺寸
<Select size="large" options={options} placeholder="大尺寸" />
<Select size="middle" options={options} placeholder="中尺寸" />
<Select size="small" options={options} placeholder="小尺寸" />

// 禁用状态
<Select disabled options={options} placeholder="禁用状态" />

// 分组选项
<Select placeholder="请选择水果或蔬菜">
  <Select.OptGroup label="水果">
    <Select.Option value="apple">苹果</Select.Option>
    <Select.Option value="banana">香蕉</Select.Option>
  </Select.OptGroup>
  <Select.OptGroup label="蔬菜">
    <Select.Option value="carrot">胡萝卜</Select.Option>
    <Select.Option value="cabbage">白菜</Select.Option>
  </Select.OptGroup>
</Select>

// 默认值
<Select
  value="apple"
  onChange={setValue}
  options={options}
  placeholder="请选择水果"
/>
`}
        </SyntaxHighlighter>
      </div>

      {/* 在其他项目中引用示例 */}
      <div>
        <h3>在其他项目中引用</h3>
        <div style={{ margin: '15px 0' }}>
          <h4>1. 安装</h4>
          <SyntaxHighlighter language="bash" style={vscDarkPlus} customStyle={{ borderRadius: '6px', margin: '0', fontSize: '14px', fontFamily: 'monospace' }}>
            {`npm i @zjpcy/simple-design`}
          </SyntaxHighlighter>
        </div>
        <div>
          <h4>2. 引用组件</h4>
          <SyntaxHighlighter language="tsx" style={vscDarkPlus} customStyle={{ borderRadius: '6px', margin: '0', fontSize: '14px', fontFamily: 'monospace' }}>
{`// 方式一：单独引入
import Select from '@zjpcy/simple-design/lib/Select';
import '@zjpcy/simple-design/lib/Select/Select.css';

// 方式二：批量引入
import { Select } from '@zjpcy/simple-design';
import '@zjpcy/simple-design/lib/index.css';`}
          </SyntaxHighlighter>
        </div>
      </div>
    </div>
  );
};

export default SelectExample;
