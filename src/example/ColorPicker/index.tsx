import React, { useState } from 'react';
import { ColorPicker, Flex } from '../../components';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

const ColorPickerExample: React.FC = () => {
  const [basicColor, setBasicColor] = useState('#1890ff');
  const [presetColor, setPresetColor] = useState('#52c41a');
  const [alphaColor, setAlphaColor] = useState('#faad14');
  const [disabledColor, setDisabledColor] = useState('#f5222d');
  const [customStyleColor, setCustomStyleColor] = useState('#fa8c16');
  const [gradientColor, setGradientColor] = useState('linear-gradient(90deg, #1890ff, #52c41a)'); // 渐变色示例

  return (
    <div style={{ padding: '20px' }}>
      <h2>ColorPicker 组件</h2>
      <p>用于选择颜色的组件，支持预设颜色、透明度调整等功能。</p>

      {/* 基本使用示例 */}
      <div style={{ marginBottom: '40px', display: 'block' }}>
        <h3>基本使用</h3>
        <p>点击颜色块打开颜色选择器，选择颜色后触发 onChange 回调。</p>

        <Flex gap={20} align="center" wrap="wrap" style={{ marginBottom: '20px' }}>
          <div>
            <p style={{ marginBottom: '8px', fontSize: '14px', color: '#666' }}>默认触发区域</p>
            <ColorPicker color={basicColor} onChange={setBasicColor} />
            <p style={{ marginTop: '8px', fontSize: '12px', color: '#999' }}>当前颜色: {basicColor}</p>
          </div>
          <div>
            <p style={{ marginBottom: '8px', fontSize: '14px', color: '#666' }}>自定义触发区域</p>
            <ColorPicker color={basicColor} onChange={setBasicColor}>
              <div style={{width: '24px', height: '24px', backgroundColor: basicColor, borderRadius: '4px', border: '1px solid #ddd'}}></div>
            </ColorPicker>
            <p style={{ marginTop: '8px', fontSize: '12px', color: '#999' }}>当前颜色: {basicColor}</p>
          </div>
          <div>
            <p style={{ marginBottom: '8px', fontSize: '14px', color: '#666' }}>实时颜色变化</p>
            <ColorPicker 
              color={basicColor} 
              onChange={setBasicColor} 
              onColorChange={(color) => console.log('实时颜色变化:', color)} 
            />
            <p style={{ marginTop: '8px', fontSize: '12px', color: '#999' }}>当前颜色: {basicColor}</p>
          </div>
        </Flex>
      </div>

      {/* 带透明度示例 */}
      <div style={{ marginBottom: '40px', display: 'block' }}>
        <h3>透明度调整</h3>
        <p>通过 alpha 属性启用透明度调整，支持 RGBA 颜色格式。</p>

        <Flex gap={20} align="flex-start" wrap="wrap" style={{ marginBottom: '20px' }}>
          <div>
            <p style={{ marginBottom: '8px', fontSize: '14px', color: '#666' }}>带透明度</p>
            <ColorPicker
              color={alphaColor}
              onChange={setAlphaColor}
              alpha={true}
            />
            <p style={{ marginTop: '8px', fontSize: '12px', color: '#999' }}>当前颜色: {alphaColor}</p>
          </div>
        </Flex>
      </div>

      {/* 预设颜色示例 */}
      <div style={{ marginBottom: '40px', display: 'block' }}>
        <h3>预设颜色</h3>
        <p>通过 presetColors 属性设置常用的预设颜色，方便快速选择。</p>

        <Flex gap={20} align="flex-start" wrap="wrap" style={{ marginBottom: '20px' }}>
          <div>
            <p style={{ marginBottom: '8px', fontSize: '14px', color: '#666' }}>预设颜色</p>
            <ColorPicker
              color={presetColor}
              onChange={setPresetColor}
              presetColors={[
                '#1890ff', '#52c41a', '#faad14', '#f5222d',
                '#722ed1', '#13c2c2', '#eb2f96', '#fa8c16',
                '#fadb14', '#ff7875', '#ffa39e', '#ffc53d',
                '#9254de', '#13c2c2', '#52c41a', '#fa8c16'
              ]}
            />
            <p style={{ marginTop: '8px', fontSize: '12px', color: '#999' }}>当前颜色: {presetColor}</p>
          </div>
        </Flex>
      </div>

      {/* 禁用状态示例 */}
      <div style={{ marginBottom: '40px', display: 'block' }}>
        <h3>禁用状态</h3>
        <p>通过 disabled 属性禁用颜色选择器，禁用后无法打开选择面板。</p>

        <Flex gap={20} align="center" wrap="wrap" style={{ marginBottom: '20px' }}>
          <div>
            <p style={{ marginBottom: '8px', fontSize: '14px', color: '#666' }}>禁用状态</p>
            <ColorPicker
              color={disabledColor}
              onChange={setDisabledColor}
              disabled
            />
            <p style={{ marginTop: '8px', fontSize: '12px', color: '#999' }}>当前颜色: {disabledColor}</p>
          </div>
        </Flex>
      </div>

      {/* 自定义触发区域示例 */}
      <div style={{ marginBottom: '40px', display: 'block' }}>
        <h3>自定义触发区域</h3>
        <p>通过 children 属性自定义触发颜色选择器的元素，支持任意 React 节点。</p>

        <Flex gap={40} align="flex-start" wrap="wrap" style={{ marginBottom: '20px' }}>
          <div>
            <p style={{ marginBottom: '8px', fontSize: '14px', color: '#666' }}>颜色方块</p>
            <ColorPicker color={basicColor} onChange={setBasicColor}>
              <div style={{width: '32px', height: '32px', backgroundColor: basicColor, borderRadius: '4px', border: '1px solid #ddd', boxShadow: '0 2px 4px rgba(0,0,0,0.1)'}}></div>
            </ColorPicker>
            <p style={{ marginTop: '8px', fontSize: '12px', color: '#999' }}>当前颜色: {basicColor}</p>
          </div>
          <div>
            <p style={{ marginBottom: '8px', fontSize: '14px', color: '#666' }}>颜色文字</p>
            <ColorPicker color={basicColor} onChange={setBasicColor}>
              <span style={{color: basicColor, fontWeight: 'bold', fontSize: '16px'}}>{basicColor}</span>
            </ColorPicker>
            <p style={{ marginTop: '8px', fontSize: '12px', color: '#999' }}>当前颜色: {basicColor}</p>
          </div>
          <div>
            <p style={{ marginBottom: '8px', fontSize: '14px', color: '#666' }}>颜色按钮</p>
            <ColorPicker color={basicColor} onChange={setBasicColor}>
              <button style={{padding: '8px 16px', backgroundColor: basicColor, color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer'}}>
                选择颜色
              </button>
            </ColorPicker>
            <p style={{ marginTop: '8px', fontSize: '12px', color: '#999' }}>当前颜色: {basicColor}</p>
          </div>
        </Flex>
      </div>





      {/* 自定义样式示例 */}
      <div style={{ marginBottom: '40px', display: 'block' }}>
        <h3>自定义样式</h3>
        <p>通过 style 属性自定义颜色选择器的样式。</p>

        <Flex gap={20} align="center" wrap="wrap" style={{ marginBottom: '20px' }}>
          <div>
            <p style={{ marginBottom: '8px', fontSize: '14px', color: '#666' }}>自定义圆角</p>
            <ColorPicker
              color={customStyleColor}
              onChange={setCustomStyleColor}
              style={{
                borderRadius: '50%',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)'
              }}
            />
            <p style={{ marginTop: '8px', fontSize: '12px', color: '#999' }}>当前颜色: {customStyleColor}</p>
          </div>
        </Flex>
      </div>

      {/* 渐变色支持示例 */}
      <div style={{ marginBottom: '40px', display: 'block' }}>
        <h3>渐变色支持</h3>
        <p>通过 gradient 属性启用渐变色支持，支持线性渐变颜色选择。</p>

        <Flex gap={20} align="flex-start" wrap="wrap" style={{ marginBottom: '20px' }}>
          <div>
            <p style={{ marginBottom: '8px', fontSize: '14px', color: '#666' }}>基本渐变色</p>
            <ColorPicker
              color={gradientColor}
              onChange={setGradientColor}
              gradient={true} // 启用渐变色支持
            />
            <p style={{ marginTop: '8px', fontSize: '12px', color: '#999' }}>当前渐变色: {gradientColor}</p>
          </div>
          <div>
            <p style={{ marginBottom: '8px', fontSize: '14px', color: '#666' }}>自定义触发区域</p>
            <ColorPicker
              color={gradientColor}
              onChange={setGradientColor}
              gradient={true}
            >
              <div style={{width: '32px', height: '32px', background: gradientColor, borderRadius: '4px', border: '1px solid #ddd', boxShadow: '0 2px 4px rgba(0,0,0,0.1)'}}></div>
            </ColorPicker>
            <p style={{ marginTop: '8px', fontSize: '12px', color: '#999' }}>当前渐变色: {gradientColor}</p>
          </div>
          <div>
            <p style={{ marginBottom: '8px', fontSize: '14px', color: '#666' }}>带预设颜色</p>
            <ColorPicker
              color={gradientColor}
              onChange={setGradientColor}
              gradient={true}
              presetColors={[
                '#1890ff', '#52c41a', '#faad14', '#f5222d',
                '#722ed1', '#13c2c2', '#eb2f96', '#fa8c16'
              ]}
            >
              <button style={{padding: '8px 16px', background: gradientColor, color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer'}}>
                渐变颜色
              </button>
            </ColorPicker>
            <p style={{ marginTop: '8px', fontSize: '12px', color: '#999' }}>当前渐变色: {gradientColor}</p>
          </div>
        </Flex>
      </div>





      {/* 代码示例 */}
      <div style={{ marginBottom: '40px', display: 'block' }}>
        <h3>代码示例</h3>
        <SyntaxHighlighter language="tsx" style={vscDarkPlus} customStyle={{ borderRadius: '6px', margin: '0' }}>
          {`import { ColorPicker } from '@idp-studio/design';
import { useState } from 'react';

// 基本用法
const [color, setColor] = useState('#1890ff');
<ColorPicker color={color} onChange={setColor} />

// 实时颜色变化
<ColorPicker 
  color={color} 
  onChange={setColor}
  onColorChange={(color) => console.log('实时颜色:', color)}
/>

// 带预设颜色
<ColorPicker 
  color={color} 
  onChange={setColor}
  presetColors={['#1890ff', '#52c41a', '#faad14', '#f5222d']}
/>

// 带透明度
<ColorPicker 
  color={color} 
  onChange={setColor}
  alpha={true}
/>

// 禁用状态
<ColorPicker 
  color={color} 
  onChange={setColor}
  disabled
/>

// 自定义样式
<ColorPicker 
  color={color} 
  onChange={setColor}
  style={{ 
    borderRadius: '50%', 
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)' 
  }}
/>

// 渐变色支持
<ColorPicker 
  color={color} 
  onChange={setColor}
  gradient={true}
/>

// 自定义触发区域
<ColorPicker 
  color={color} 
  onChange={setColor}
>
  <div style={{width: '32px', height: '32px', backgroundColor: color, borderRadius: '4px', border: '1px solid #ddd'}}></div>
</ColorPicker>`}
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
              <td style={{ padding: '8px', borderBottom: '1px solid #e0e0e0' }}>color</td>
              <td style={{ padding: '8px', borderBottom: '1px solid #e0e0e0' }}>string</td>
              <td style={{ padding: '8px', borderBottom: '1px solid #e0e0e0' }}>-</td>
              <td style={{ padding: '8px', borderBottom: '1px solid #e0e0e0' }}>当前颜色值（支持 HEX 格式）</td>
            </tr>
            <tr>
              <td style={{ padding: '8px', borderBottom: '1px solid #e0e0e0' }}>onChange</td>
              <td style={{ padding: '8px', borderBottom: '1px solid #e0e0e0' }}>&#39;(color: string) =&gt; void&#39;</td>
              <td style={{ padding: '8px', borderBottom: '1px solid #e0e0e0' }}>-</td>
              <td style={{ padding: '8px', borderBottom: '1px solid #e0e0e0' }}>确认选择颜色后的回调函数</td>
            </tr>
            <tr>
              <td style={{ padding: '8px', borderBottom: '1px solid #e0e0e0' }}>onColorChange</td>
              <td style={{ padding: '8px', borderBottom: '1px solid #e0e0e0' }}>&#39;(color?: string) =&gt; void&#39;</td>
              <td style={{ padding: '8px', borderBottom: '1px solid #e0e0e0' }}>-</td>
              <td style={{ padding: '8px', borderBottom: '1px solid #e0e0e0' }}>实时颜色变化时的回调函数</td>
            </tr>
            <tr>
              <td style={{ padding: '8px', borderBottom: '1px solid #e0e0e0' }}>disabled</td>
              <td style={{ padding: '8px', borderBottom: '1px solid #e0e0e0' }}>boolean</td>
              <td style={{ padding: '8px', borderBottom: '1px solid #e0e0e0' }}>false</td>
              <td style={{ padding: '8px', borderBottom: '1px solid #e0e0e0' }}>是否禁用</td>
            </tr>
            <tr>
              <td style={{ padding: '8px', borderBottom: '1px solid #e0e0e0' }}>alpha</td>
              <td style={{ padding: '8px', borderBottom: '1px solid #e0e0e0' }}>boolean</td>
              <td style={{ padding: '8px', borderBottom: '1px solid #e0e0e0' }}>false</td>
              <td style={{ padding: '8px', borderBottom: '1px solid #e0e0e0' }}>是否支持透明度</td>
            </tr>
            <tr>
              <td style={{ padding: '8px', borderBottom: '1px solid #e0e0e0' }}>presetColors</td>
              <td style={{ padding: '8px', borderBottom: '1px solid #e0e0e0' }}>string[]</td>
              <td style={{ padding: '8px', borderBottom: '1px solid #e0e0e0' }}>[]</td>
              <td style={{ padding: '8px', borderBottom: '1px solid #e0e0e0' }}>预设颜色数组</td>
            </tr>
            <tr>
              <td style={{ padding: '8px', borderBottom: '1px solid #e0e0e0' }}>style</td>
              <td style={{ padding: '8px', borderBottom: '1px solid #e0e0e0' }}>React.CSSProperties</td>
              <td style={{ padding: '8px', borderBottom: '1px solid #e0e0e0' }}>-</td>
              <td style={{ padding: '8px', borderBottom: '1px solid #e0e0e0' }}>自定义样式</td>
            </tr>
            <tr>
              <td style={{ padding: '8px', borderBottom: '1px solid #e0e0e0' }}>className</td>
              <td style={{ padding: '8px', borderBottom: '1px solid #e0e0e0' }}>string</td>
              <td style={{ padding: '8px', borderBottom: '1px solid #e0e0e0' }}>-</td>
              <td style={{ padding: '8px', borderBottom: '1px solid #e0e0e0' }}>自定义类名</td>
            </tr>
            <tr>
              <td style={{ padding: '8px', borderBottom: '1px solid #e0e0e0' }}>gradient</td>
              <td style={{ padding: '8px', borderBottom: '1px solid #e0e0e0' }}>boolean</td>
              <td style={{ padding: '8px', borderBottom: '1px solid #e0e0e0' }}>false</td>
              <td style={{ padding: '8px', borderBottom: '1px solid #e0e0e0' }}>是否支持渐变色，启用后可选择线性渐变颜色</td>
            </tr>
            <tr>
              <td style={{ padding: '8px', borderBottom: '1px solid #e0e0e0' }}>children</td>
              <td style={{ padding: '8px', borderBottom: '1px solid #e0e0e0' }}>React.ReactNode</td>
              <td style={{ padding: '8px', borderBottom: '1px solid #e0e0e0' }}>-</td>
              <td style={{ padding: '8px', borderBottom: '1px solid #e0e0e0' }}>自定义触发区域，支持任意 React 节点</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* 特性说明 */}
      <div style={{ marginBottom: '40px', display: 'block', background: '#fafafa', padding: '20px', borderRadius: '8px' }}>
        <h3>特性说明</h3>
        <ul style={{ margin: '10px 0 0 20px', padding: 0 }}>
          <li style={{ marginBottom: '8px' }}>🗜 轻量：仅 2.8KB gzipped（比 react-color 轻 13 倍）</li>
          <li style={{ marginBottom: '8px' }}>🌳 支持树摇：仅导入使用的部分</li>
          <li style={{ marginBottom: '8px' }}>🚀 快速：使用 hooks 和函数组件</li>
          <li style={{ marginBottom: '8px' }}>🛡 类型安全：严格的 TypeScript 支持</li>
          <li style={{ marginBottom: '8px' }}>📱 移动端友好：支持触摸设备</li>
          <li style={{ marginBottom: '8px' }}>💬 可访问性：遵循 WAI-ARIA 指南</li>
          <li style={{ marginBottom: '8px' }}>💨 无依赖：不依赖其他库</li>
        </ul>
      </div>

      {/* 在其他项目中引用示例 */}
      <div style={{ display: 'block' }}>
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
import ColorPicker from '@idp-studio/design/lib/ColorPicker';
import '@idp-studio/design/lib/ColorPicker/ColorPicker.css';

// 方式二：批量引入
import { ColorPicker } from '@idp-studio/design';
import '@idp-studio/design/lib/index.css';`}
          </SyntaxHighlighter>
        </div>
      </div>
    </div>
  );
};

export default ColorPickerExample;