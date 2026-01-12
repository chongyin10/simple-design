import React, { useState } from 'react';
import { Select, Table, Flex } from '../../components';
import type { Column } from '../../components/Table';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

const SelectExample: React.FC = () => {
  // API参数列配置
  const apiColumns: Column[] = [
    { dataIndex: 'param', title: '参数名', width: '150px' },
    { dataIndex: 'type', title: '类型', width: '300px' },
    { dataIndex: 'default', title: '默认值', width: '150px' },
    { dataIndex: 'description', title: '描述', width: '300px' }
  ];

  // Select API参数数据源
  const selectApiDataSource = [
    { param: 'value', type: 'any', default: '-', description: '当前选中的值' },
    { param: 'defaultValue', type: 'any', default: '-', description: '默认选中的值' },
    { param: 'onChange', type: '(value: any) => void', default: '-', description: '值变化时的回调函数' },
    { param: 'placeholder', type: 'string', default: '请选择', description: '占位符文本' },
    { param: 'disabled', type: 'boolean', default: 'false', description: '是否禁用选择器' },
    { param: 'size', type: "'large' | 'middle' | 'small'", default: 'middle', description: '选择器尺寸，当设置了height时，此参数失效' },
    { param: 'style', type: 'React.CSSProperties', default: '-', description: '自定义内联样式' },
    { param: 'className', type: 'string', default: '-', description: '自定义CSS类名' },
    { param: 'options', type: 'SelectOption[]', default: '-', description: '选项列表' },
    { param: 'children', type: 'React.ReactNode', default: '-', description: '子节点' },
    { param: 'open', type: 'boolean', default: '-', description: '控制下拉菜单是否打开（受控）' },
    { param: 'onOpenChange', type: '(open: boolean) => void', default: '-', description: '下拉菜单开关状态变化时的回调函数' },
    { param: 'width', type: 'number | string', default: '-', description: '选择器宽度，下拉菜单宽度将跟随此值' },
    { param: 'height', type: 'number | string', default: '-', description: '选择器高度，设置后将覆盖size参数' },
    { param: 'dropdownHeight', type: 'number | string', default: '200px', description: '下拉菜单的最大高度' }
  ];

  // Select.Option API参数数据源
  const optionApiDataSource = [
    { param: 'value', type: 'any', default: '-', description: '选项的值' },
    { param: 'children', type: 'React.ReactNode', default: '-', description: '选项的标签文本' },
    { param: 'disabled', type: 'boolean', default: 'false', description: '是否禁用该选项' },
    { param: 'icon', type: 'string', default: '-', description: '选项的图标类型' }
  ];

  // Select.OptGroup API参数数据源
  const optGroupApiDataSource = [
    { param: 'label', type: 'React.ReactNode', default: '-', description: '分组的标签' },
    { param: 'children', type: 'React.ReactNode', default: '-', description: '分组内的选项' }
  ];

  // 示例状态
  const [value1, setValue1] = useState<string>();
  const [value2, setValue2] = useState<string>();
  const [value3, setValue3] = useState<string>('apple');
  const [open, setOpen] = useState(false);

  // 选项数据
  const options = [
    { value: 'apple', label: '苹果', icon: 'user' },
    { value: 'banana', label: '香蕉', icon: 'search' },
    { value: 'orange', label: '橙子', icon: 'plus' },
    { value: 'grape', label: '葡萄', icon: 'minus' },
    { value: 'watermelon', label: '西瓜', icon: 'close' },
    { value: 'apple1', label: '苹果', icon: 'user' },
    { value: 'banana1', label: '香蕉', icon: 'search' },
    { value: 'orange1', label: '橙子', icon: 'plus' },
    { value: 'grape1', label: '葡萄', icon: 'minus' },
    { value: 'watermelon1', label: '西瓜', icon: 'close' }
  ];

  return (
    <div style={{ padding: '20px' }}>
      <h2>Select 组件</h2>
      <p>选择器组件，支持下拉选择、分组选择等功能。</p>
      
      {/* 基本使用示例 */}
      <div style={{ marginBottom: '40px' }}>
        <h3>基本使用</h3>
        <p>展示选择器的基本使用方式。</p>
        
        <Flex direction="column" gap={20} style={{ marginBottom: '20px' }}>
          <div>
            <h4>使用 options 属性</h4>
            <Select
              value={value1}
              onChange={setValue1}
              options={options}
              placeholder="请选择水果"
              style={{ maxWidth: '400px' }}
            />
          </div>
          
          <div>
            <h4>使用 children 方式</h4>
            <Select
              value={value2}
              onChange={setValue2}
              placeholder="请选择水果"
              style={{ maxWidth: '400px' }}
            >
              <Select.Option value="apple">苹果</Select.Option>
              <Select.Option value="banana">香蕉</Select.Option>
              <Select.Option value="orange">橙子</Select.Option>
              <Select.Option value="grape">葡萄</Select.Option>
              <Select.Option value="watermelon">西瓜</Select.Option>
            </Select>
          </div>
        </Flex>
        
        <h4>不同尺寸</h4>
        <Flex direction="column" gap={10} style={{ marginBottom: '20px', maxWidth: '400px' }}>
          <Select
            size="large"
            options={options}
            placeholder="大尺寸"
          />
          <Select
            size="middle"
            options={options}
            placeholder="中尺寸（默认）"
          />
          <Select
            size="small"
            options={options}
            placeholder="小尺寸"
          />
        </Flex>
        
        <h4>禁用状态</h4>
        <Flex direction="column" gap={10} style={{ marginBottom: '20px' }}>
          <Select
            disabled
            options={options}
            placeholder="禁用整个选择器"
            style={{ maxWidth: '400px' }}
          />
          <Select
            options={[
              { value: 'apple', label: '苹果' },
              { value: 'banana', label: '香蕉', disabled: true },
              { value: 'orange', label: '橙子' },
              { value: 'grape', label: '葡萄', disabled: true },
              { value: 'watermelon', label: '西瓜' }
            ]}
            placeholder="禁用部分选项"
            style={{ maxWidth: '400px' }}
          />
        </Flex>
        
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
        
        <h4>带有图标的选项</h4>
        <Flex direction="column" gap={15} style={{ marginBottom: '20px', maxWidth: '400px' }}>
          <div>
            <h5>通过options属性</h5>
            <Select options={options} placeholder="选择带有图标的水果" />
          </div>
          <div>
            <h5>通过children方式</h5>
            <Select placeholder="选择带有图标的水果">
              <Select.Option value="apple" icon="user">苹果</Select.Option>
              <Select.Option value="banana" icon="search">香蕉</Select.Option>
              <Select.Option value="orange" icon="plus">橙子</Select.Option>
              <Select.Option value="grape" icon="minus">葡萄</Select.Option>
            </Select>
          </div>
        </Flex>
        
        <h4>默认值</h4>
        <div style={{ marginBottom: '20px', maxWidth: '400px' }}>
          <Select
            value={value3}
            onChange={setValue3}
            options={options}
            placeholder="请选择水果"
          />
        </div>
        
        <h4>受控open参数</h4>
        <Flex direction="column" gap={10} style={{ marginBottom: '20px', maxWidth: '400px' }}>
          <Flex align="center" gap={10}>
            <button
              onClick={() => setOpen(!open)}
              style={{ padding: '4px 12px' }}
            >
              {open ? '关闭下拉菜单' : '打开下拉菜单'}
            </button>
            <span>当前状态: {open ? '打开' : '关闭'}</span>
          </Flex>
          <Select
            open={open}
            onOpenChange={setOpen}
            options={options}
            placeholder="使用open参数控制"
          />
        </Flex>
        
        <h4>自定义宽高</h4>
        <Flex direction="column" gap={10} style={{ marginBottom: '20px', maxWidth: '500px' }}>
          <div>
            <h5>自定义宽度</h5>
            <Select
              width="300px"
              options={options}
              placeholder="宽度300px"
            />
          </div>
          <div>
            <h5>自定义高度</h5>
            <Select
              height="40px"
              options={options}
              placeholder="高度40px"
            />
          </div>
          <div>
            <h5>同时自定义宽高</h5>
            <Select
              width="250px"
              height="50px"
              options={options}
              placeholder="宽度250px，高度50px"
            />
          </div>
        </Flex>
        
        <h4>自定义下拉菜单高度</h4>
        <Flex direction="column" gap={10} style={{ marginBottom: '20px', maxWidth: '500px' }}>
          <div>
            <h5>下拉菜单高度150px</h5>
            <Select
              options={options}
              placeholder="下拉菜单高度150px"
              dropdownHeight="150px"
              style={{ maxWidth: '400px' }}
            />
          </div>
          <div>
            <h5>下拉菜单高度80px</h5>
            <Select
              options={options}
              placeholder="下拉菜单高度80px"
              dropdownHeight="80px"
              style={{ maxWidth: '400px' }}
            />
          </div>
        </Flex>
        
        <h4>空状态</h4>
        <Flex direction="column" gap={10} style={{ marginBottom: '20px', maxWidth: '500px' }}>
          <div>
            <h5>空options数组</h5>
            <Select
              options={[]}
              placeholder="暂无选项"
              style={{ maxWidth: '400px' }}
            />
          </div>
          <div>
            <h5>无children</h5>
            <Select
              placeholder="暂无选项"
              style={{ maxWidth: '400px' }}
            />
          </div>
        </Flex>
      </div>
      
      {/* API 文档 */}
      <div style={{ marginBottom: '40px', padding: '20px', background: '#fafafa', borderRadius: '8px' }}>
        <h3>API 参数</h3>
        
        <h4>Select 组件</h4>
        <Table pagination={false} columns={apiColumns} dataSource={selectApiDataSource} />
        
        <h4 style={{ marginTop: '30px' }}>Select.Option 组件</h4>
        <Table pagination={false} columns={apiColumns} dataSource={optionApiDataSource} />
        
        <h4 style={{ marginTop: '30px' }}>Select.OptGroup 组件</h4>
        <Table pagination={false} columns={apiColumns} dataSource={optGroupApiDataSource} />
      </div>
      
      {/* 代码示例 */}
      <div style={{ marginBottom: '40px' }}>
        <h3>代码示例</h3>
        <SyntaxHighlighter language="tsx" style={vscDarkPlus} customStyle={{ borderRadius: '6px', margin: '0' }}>
{`import { Select } from '@zjpcy/simple-design';
import React, { useState } from 'react';

// 使用 options 属性
const OptionsExample = () => {
  const [value, setValue] = useState<string>();
  
  const options = [
    { value: 'apple', label: '苹果', icon: 'user' },
    { value: 'banana', label: '香蕉', icon: 'search' },
    { value: 'orange', label: '橙子', icon: 'plus' }
  ];
  
  return (
    <Select
      value={value}
      onChange={setValue}
      options={options}
      placeholder="请选择水果"
    />
  );
};

// 使用 children 方式
const ChildrenExample = () => {
  const [value, setValue] = useState<string>();
  
  return (
    <Select
      value={value}
      onChange={setValue}
      placeholder="请选择水果"
    >
      <Select.Option value="apple">苹果</Select.Option>
      <Select.Option value="banana">香蕉</Select.Option>
      <Select.Option value="orange">橙子</Select.Option>
    </Select>
  );
};

// 不同尺寸
const SizeExample = () => {
  return (
    <>
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
    </>
  );
};

// 禁用状态
const DisabledExample = () => {
  const optionsWithDisabled = [
    { value: 'apple', label: '苹果' },
    { value: 'banana', label: '香蕉', disabled: true },
    { value: 'orange', label: '橙子' },
    { value: 'grape', label: '葡萄', disabled: true },
    { value: 'watermelon', label: '西瓜' }
  ];
  
  return (
    <>
      <div style={{ marginBottom: '10px' }}>
        <Select
          disabled
          options={options}
          placeholder="禁用整个选择器"
        />
      </div>
      <div style={{ marginBottom: '10px' }}>
        <Select
          options={optionsWithDisabled}
          placeholder="禁用部分选项"
        />
      </div>
    </>
  );
};

// 分组选项
const GroupExample = () => {
  return (
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
  );
};

// 带有图标的选项
const IconExample = () => {
  return (
    <>
      {/* 通过options属性 */}
      <Select options={options} placeholder="选择带有图标的水果" />
      
      {/* 通过children方式 */}
      <Select placeholder="选择带有图标的水果">
        <Select.Option value="apple" icon="user">苹果</Select.Option>
        <Select.Option value="banana" icon="search">香蕉</Select.Option>
        <Select.Option value="orange" icon="plus">橙子</Select.Option>
      </Select>
    </>
  );
};

// 默认值
const DefaultValueExample = () => {
  const [value, setValue] = useState<string>('apple');
  
  return (
    <Select
      value={value}
      onChange={setValue}
      options={options}
      placeholder="请选择水果"
    />
  );
};

// 受控open参数
const ControlledOpenExample = () => {
  const [open, setOpen] = useState(false);
  
  return (
    <>
      <button onClick={() => setOpen(!open)}>
        {open ? '关闭下拉菜单' : '打开下拉菜单'}
      </button>
      <Select
        open={open}
        onOpenChange={setOpen}
        options={options}
        placeholder="使用open参数控制"
      />
    </>
  );
};

// 自定义宽高
const CustomSizeExample = () => {
  return (
    <>
      {/* 自定义宽度 */}
      <Select
        width="300px"
        options={options}
        placeholder="宽度300px"
      />
      
      {/* 自定义高度 */}
      <Select
        height="40px"
        options={options}
        placeholder="高度40px"
      />
      
      {/* 同时自定义宽高 */}
      <Select
        width="250px"
        height="50px"
        options={options}
        placeholder="宽度250px，高度50px"
      />
    </>
  );
};

// 自定义下拉菜单高度
const CustomDropdownHeightExample = () => {
  return (
    <>
      {/* 下拉菜单高度150px */}
      <Select
        options={options}
        placeholder="下拉菜单高度150px"
        dropdownHeight="150px"
      />
      
      {/* 下拉菜单高度80px */}
      <Select
        options={options}
        placeholder="下拉菜单高度80px"
        dropdownHeight="80px"
      />
    </>
  );
};

// 空状态
const EmptyStateExample = () => {
  return (
    <>
      {/* 空options数组 */}
      <Select
        options={[]}
        placeholder="暂无选项"
      />
      
      {/* 无children */}
      <Select
        placeholder="暂无选项"
      />
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
import '@zjpcy/simple-design/lib/index.css';

// 使用示例
const App = () => {
  const [value, setValue] = useState<string>();
  
  return (
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
  );
};
`}
          </SyntaxHighlighter>
        </div>
      </div>
    </div>
  );
};

export default SelectExample;