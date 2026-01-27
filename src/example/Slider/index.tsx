import React, { useState } from 'react';
import { Slider, Table } from '../../components';
import type { Column } from '../../components/Table';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

const SliderExample: React.FC = () => {
  const [_basicValue, setBasicValue] = useState(30);
  const [_rangedValue, setRangedValue] = useState(50);
  const [_stepValue, setStepValue] = useState(30);
  const [_markedValue, setMarkedValue] = useState(50);

  const apiColumns: Column[] = [
    { dataIndex: 'param', title: '参数名', width: '150px' },
    { dataIndex: 'type', title: '类型', width: '200px' },
    { dataIndex: 'default', title: '默认值', width: '150px' },
    { dataIndex: 'description', title: '描述', width: '300px' }
  ];

  const apiDataSource = [
    { param: 'min', type: 'number', default: '0', description: '最小值' },
    { param: 'max', type: 'number', default: '100', description: '最大值' },
    { param: 'step', type: 'number', default: '1', description: '步长，取值必须为大于0的数' },
    { param: 'value', type: 'number', default: '-', description: '受控模式下的当前值' },
    { param: 'defaultValue', type: 'number', default: '0', description: '非受控模式下的默认值' },
    { param: 'disabled', type: 'boolean', default: 'false', description: '是否禁用' },
    { param: 'marks', type: 'Record<number, string>', default: '{}', description: '标记点，key为数值，value为显示文本' },
    { param: 'showValue', type: 'boolean', default: 'false', description: '是否显示当前值' },
    { param: 'transitionSpeed', type: 'number', default: '300', description: '滑动动画速度（毫秒）' },
    { param: 'onChange', type: '(value: number) => void', default: '-', description: '值改变时的回调函数' },
    { param: 'onAfterChange', type: '(value: number) => void', default: '-', description: '拖拽结束后的回调函数' },
    { param: 'className', type: 'string', default: '-', description: '自定义 CSS 类名' },
    { param: 'style', type: 'React.CSSProperties', default: '-', description: '自定义样式' }
  ];

  const marks = {
    0: '0°C',
    20: '20°C',
    40: '40°C',
    60: '60°C',
    80: '80°C',
    100: '100°C'
  };

  const customMarks = {
    0: '极低',
    25: '低',
    50: '中',
    75: '高',
    100: '极高'
  };

  const marksWithTooltip = {
    0: '0',
    20: '20',
    40: '40',
    60: '60',
    80: '80',
    100: '100'
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Slider 滑动条组件</h2>
      <p>滑动型输入器，展示当前值和可选范围。当用户需要在数值区间/自定义区间内进行选择时，可为连续或离散值。</p>

      {/* 基本使用 */}
      <div style={{ marginBottom: '40px' }}>
        <h3>基本使用</h3>
        <p>最简单的滑动条，默认范围是 0-100。</p>
        
        <h4>基础滑动条</h4>
        <div style={{ marginBottom: '20px', maxWidth: '400px' }}>
          <Slider onChange={setBasicValue} />
        </div>
        <SyntaxHighlighter language="tsx" style={vscDarkPlus} customStyle={{ borderRadius: '6px', margin: '0', fontSize: '14px', fontFamily: 'monospace' }}>
          {`<Slider onChange={setBasicValue} />`}
        </SyntaxHighlighter>

        <h4>显示当前值</h4>
        <div style={{ marginBottom: '20px', maxWidth: '400px' }}>
          <Slider showValue defaultValue={50} onChange={setBasicValue} />
        </div>
        <SyntaxHighlighter language="tsx" style={vscDarkPlus} customStyle={{ borderRadius: '6px', margin: '0', fontSize: '14px', fontFamily: 'monospace' }}>
          {`<Slider showValue defaultValue={50} onChange={setBasicValue} />`}
        </SyntaxHighlighter>

        <h4>禁用状态</h4>
        <div style={{ marginBottom: '20px', maxWidth: '400px' }}>
          <Slider disabled defaultValue={30} />
        </div>
        <SyntaxHighlighter language="tsx" style={vscDarkPlus} customStyle={{ borderRadius: '6px', margin: '0', fontSize: '14px', fontFamily: 'monospace' }}>
          {`<Slider disabled defaultValue={30} />`}
        </SyntaxHighlighter>
      </div>

      {/* 自定义范围 */}
      <div style={{ marginBottom: '40px' }}>
        <h3>自定义范围</h3>
        <p>通过设置 min 和 max 属性来自定义滑动范围。</p>

        <h4>0-100 范围（默认）</h4>
        <div style={{ marginBottom: '20px', maxWidth: '400px' }}>
          <Slider showValue defaultValue={50} onChange={setRangedValue} />
        </div>
        <SyntaxHighlighter language="tsx" style={vscDarkPlus} customStyle={{ borderRadius: '6px', margin: '0', fontSize: '14px', fontFamily: 'monospace' }}>
          {`<Slider showValue defaultValue={50} onChange={setRangedValue} />`}
        </SyntaxHighlighter>

        <h4>20-80 范围</h4>
        <div style={{ marginBottom: '20px', maxWidth: '400px' }}>
          <Slider showValue min={20} max={80} defaultValue={50} onChange={setRangedValue} />
        </div>
        <SyntaxHighlighter language="tsx" style={vscDarkPlus} customStyle={{ borderRadius: '6px', margin: '0', fontSize: '14px', fontFamily: 'monospace' }}>
          {`<Slider showValue min={20} max={80} defaultValue={50} onChange={setRangedValue} />`}
        </SyntaxHighlighter>

        <h4>0-1 范围（百分比）</h4>
        <div style={{ marginBottom: '20px', maxWidth: '400px' }}>
          <Slider showValue min={0} max={1} step={0.01} defaultValue={0.5} onChange={setRangedValue} />
        </div>
        <SyntaxHighlighter language="tsx" style={vscDarkPlus} customStyle={{ borderRadius: '6px', margin: '0', fontSize: '14px', fontFamily: 'monospace' }}>
          {`<Slider showValue min={0} max={1} step={0.01} defaultValue={0.5} onChange={setRangedValue} />`}
        </SyntaxHighlighter>
      </div>

      {/* 步长控制 */}
      <div style={{ marginBottom: '40px' }}>
        <h3>步长控制</h3>
        <p>通过设置 step 属性来控制每次滑动的最小步长。</p>

        <h4>步长为 10</h4>
        <div style={{ marginBottom: '20px', maxWidth: '400px' }}>
          <Slider showValue step={10} defaultValue={30} onChange={setStepValue} />
        </div>
        <SyntaxHighlighter language="tsx" style={vscDarkPlus} customStyle={{ borderRadius: '6px', margin: '0', fontSize: '14px', fontFamily: 'monospace' }}>
          {`<Slider showValue step={10} defaultValue={30} onChange={setStepValue} />`}
        </SyntaxHighlighter>

        <h4>步长为 20</h4>
        <div style={{ marginBottom: '20px', maxWidth: '400px' }}>
          <Slider showValue step={20} defaultValue={40} onChange={setStepValue} />
        </div>
        <SyntaxHighlighter language="tsx" style={vscDarkPlus} customStyle={{ borderRadius: '6px', margin: '0', fontSize: '14px', fontFamily: 'monospace' }}>
          {`<Slider showValue step={20} defaultValue={40} onChange={setStepValue} />`}
        </SyntaxHighlighter>

        <h4>连续值（步长为 0）</h4>
        <div style={{ marginBottom: '20px', maxWidth: '400px' }}>
          <Slider showValue step={0.01} defaultValue={30.5} onChange={setStepValue} />
        </div>
        <SyntaxHighlighter language="tsx" style={vscDarkPlus} customStyle={{ borderRadius: '6px', margin: '0', fontSize: '14px', fontFamily: 'monospace' }}>
          {`<Slider showValue step={0.01} defaultValue={30.5} onChange={setStepValue} />`}
        </SyntaxHighlighter>
      </div>

      {/* 标记点 */}
      <div style={{ marginBottom: '40px' }}>
        <h3>标记点</h3>
        <p>使用 marks 属性在滑动条上显示标记点。</p>

        <h4>温度选择</h4>
        <div style={{ marginBottom: '20px', maxWidth: '400px' }}>
          <Slider 
            showValue 
            marks={marks} 
            defaultValue={50} 
            onChange={setMarkedValue} 
          />
        </div>
        <SyntaxHighlighter language="tsx" style={vscDarkPlus} customStyle={{ borderRadius: '6px', margin: '0', fontSize: '14px', fontFamily: 'monospace' }}>
          {`const marks = {
  0: '0°C',
  20: '20°C',
  40: '40°C',
  60: '60°C',
  80: '80°C',
  100: '100°C'
};

<Slider showValue marks={marks} defaultValue={50} onChange={setMarkedValue} />`}
        </SyntaxHighlighter>

        <h4>风险等级</h4>
        <div style={{ marginBottom: '20px', maxWidth: '400px' }}>
          <Slider 
            showValue 
            marks={customMarks} 
            defaultValue={50} 
            onChange={setMarkedValue} 
          />
        </div>
        <SyntaxHighlighter language="tsx" style={vscDarkPlus} customStyle={{ borderRadius: '6px', margin: '0', fontSize: '14px', fontFamily: 'monospace' }}>
          {`const customMarks = {
  0: '极低',
  25: '低',
  50: '中',
  75: '高',
  100: '极高'
};

<Slider showValue marks={customMarks} defaultValue={50} onChange={setMarkedValue} />`}
        </SyntaxHighlighter>

        <h4>仅显示部分标记</h4>
        <div style={{ marginBottom: '20px', maxWidth: '400px' }}>
          <Slider 
            showValue 
            marks={marksWithTooltip} 
            step={20} 
            defaultValue={40} 
            onChange={setMarkedValue} 
          />
        </div>
        <SyntaxHighlighter language="tsx" style={vscDarkPlus} customStyle={{ borderRadius: '6px', margin: '0', fontSize: '14px', fontFamily: 'monospace' }}>
          {`const marksWithTooltip = {
  0: '0',
  20: '20',
  40: '40',
  60: '60',
  80: '80',
  100: '100'
};

<Slider showValue marks={marksWithTooltip} step={20} defaultValue={40} onChange={setMarkedValue} />`}
        </SyntaxHighlighter>
      </div>

      {/* 综合示例 */}
      <div style={{ marginBottom: '40px' }}>
        <h3>综合示例</h3>
        <p>组合使用各种属性来创建复杂的滑动条。</p>

        <h4>音量控制</h4>
        <div style={{ marginBottom: '20px', maxWidth: '400px' }}>
          <Slider 
            showValue 
            min={0} 
            max={100} 
            step={5} 
            marks={{
              0: '静音',
              25: '低',
              50: '中',
              75: '高',
              100: '最大'
            }}
            defaultValue={30}
            onChange={(val) => console.log('音量：', val)}
            onAfterChange={(val) => console.log('最终音量：', val)}
          />
        </div>
        <SyntaxHighlighter language="tsx" style={vscDarkPlus} customStyle={{ borderRadius: '6px', margin: '0', fontSize: '14px', fontFamily: 'monospace' }}>
          {`<Slider 
  showValue 
  min={0} 
  max={100} 
  step={5} 
  marks={{
    0: '静音',
    25: '低',
    50: '中',
    75: '高',
    100: '最大'
  }}
  defaultValue={30}
  onChange={(val) => console.log('音量：', val)}
  onAfterChange={(val) => console.log('最终音量：', val)}
/>`}
        </SyntaxHighlighter>

        <h4>评分系统（1-10分）</h4>
        <div style={{ marginBottom: '20px', maxWidth: '400px' }}>
          <Slider 
            showValue 
            min={1} 
            max={10} 
            step={1} 
            marks={{
              1: '1分',
              5: '5分',
              10: '10分'
            }}
            defaultValue={7}
            onChange={(val) => console.log('当前评分：', val)}
          />
        </div>
        <SyntaxHighlighter language="tsx" style={vscDarkPlus} customStyle={{ borderRadius: '6px', margin: '0', fontSize: '14px', fontFamily: 'monospace' }}>
          {`<Slider 
  showValue 
  min={1} 
  max={10} 
  step={1} 
  marks={{
    1: '1分',
    5: '5分',
    10: '10分'
  }}
  defaultValue={7}
  onChange={(val) => console.log('当前评分：', val)}
/>`}
        </SyntaxHighlighter>
      </div>

      {/* 滑动速度控制 */}
      <div style={{ marginBottom: '40px' }}>
        <h3>滑动速度控制</h3>
        <p>通过 transitionSpeed 属性控制滑动动画的速度（毫秒）。</p>

        <h4>快速滑动（100ms）</h4>
        <div style={{ marginBottom: '20px', maxWidth: '400px' }}>
          <Slider 
            showValue 
            transitionSpeed={100}
            defaultValue={30}
            onChange={(val) => console.log('快速滑动值：', val)}
          />
        </div>
        <SyntaxHighlighter language="tsx" style={vscDarkPlus} customStyle={{ borderRadius: '6px', margin: '0', fontSize: '14px', fontFamily: 'monospace' }}>
          {`<Slider 
  showValue 
  transitionSpeed={100}
  defaultValue={30}
  onChange={(val) => console.log('快速滑动值：', val)}
/>`}
        </SyntaxHighlighter>

        <h4>慢速滑动（1000ms）</h4>
        <div style={{ marginBottom: '20px', maxWidth: '400px' }}>
          <Slider 
            showValue 
            transitionSpeed={1000}
            defaultValue={50}
            onChange={(val) => console.log('慢速滑动值：', val)}
          />
        </div>
        <SyntaxHighlighter language="tsx" style={vscDarkPlus} customStyle={{ borderRadius: '6px', margin: '0', fontSize: '14px', fontFamily: 'monospace' }}>
          {`<Slider 
  showValue 
  transitionSpeed={1000}
  defaultValue={50}
  onChange={(val) => console.log('慢速滑动值：', val)}
/>`}
        </SyntaxHighlighter>

        <h4>默认速度（300ms）</h4>
        <div style={{ marginBottom: '20px', maxWidth: '400px' }}>
          <Slider 
            showValue 
            defaultValue={70}
            onChange={(val) => console.log('默认滑动值：', val)}
          />
        </div>
        <SyntaxHighlighter language="tsx" style={vscDarkPlus} customStyle={{ borderRadius: '6px', margin: '0', fontSize: '14px', fontFamily: 'monospace' }}>
          {`<Slider 
  showValue 
  defaultValue={70}
  onChange={(val) => console.log('默认滑动值：', val)}
/>`}
        </SyntaxHighlighter>
      </div>

      {/* API 文档 */}
      <div style={{ marginBottom: '40px' }}>
        <h3>API 文档</h3>
        <p>Slider 组件的属性配置。</p>
        <Table columns={apiColumns} pagination={false} dataSource={apiDataSource} />
      </div>

      {/* 安装和使用说明 */}
      <div style={{ marginBottom: '40px' }}>
        <h3>安装和使用</h3>
        
        <div style={{ marginBottom: '20px' }}>
          <h4>1. 安装依赖</h4>
          <SyntaxHighlighter language="bash" style={vscDarkPlus} customStyle={{ borderRadius: '6px', margin: '0', fontSize: '14px', fontFamily: 'monospace' }}>
            {`yarn add @zjpcy/simple-design`}
          </SyntaxHighlighter>
        </div>
        
        <div>
          <h4>2. 引用组件</h4>
          <SyntaxHighlighter language="tsx" style={vscDarkPlus} customStyle={{ borderRadius: '6px', margin: '0', fontSize: '14px', fontFamily: 'monospace' }}>
            {`// 方式一：单独引入
import Slider from '@zjpcy/simple-design/lib/Slider';
import '@zjpcy/simple-design/lib/Slider/Slider.css';

// 方式二：批量引入
import { Slider } from '@zjpcy/simple-design';
import '@zjpcy/simple-design/lib/index.css';`}
          </SyntaxHighlighter>
        </div>
      </div>

      {/* 使用建议 */}
      <div>
        <h3>使用建议</h3>
        <ul>
          <li><strong>适用场景：</strong>适合用于在一定范围内选择数值的场景，如音量控制、亮度调节、评分等。</li>
          <li><strong>精度选择：</strong>对于精确数值输入，建议结合Input组件使用；对于大致范围选择，使用Slider更合适。</li>
          <li><strong>可访问性：</strong>组件支持键盘操作（方向键、Home、End、PageUp、PageDown），确保无障碍访问。</li>
          <li><strong>视觉反馈：</strong>建议开启showValue属性或提供marks标记点，让用户明确当前选择的值。</li>
        </ul>
      </div>
    </div>
  );
};

export default SliderExample;
