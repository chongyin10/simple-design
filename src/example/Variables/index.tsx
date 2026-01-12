import React, { useState } from 'react';
import { Button, Input, Divider, ColorPicker } from '../../components';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { MessageProvider, useMessage } from '../../components/Message';

interface ColorItem {
  name: string;
  variable: string;
  defaultValue: string;
  currentValue: string;
  description: string;
}

interface ThemeExampleProps {
  messageApi: ReturnType<typeof useMessage>;
}

const ThemeExample: React.FC<ThemeExampleProps> = ({ messageApi }) => {
  // 主题色数组，用于展示和编辑
  const [colors, setColors] = useState<ColorItem[]>([
    {
      name: '主色调',
      variable: '--idp-primary-color',
      defaultValue: '#1890ff',
      currentValue: '#1890ff',
      description: '主要按钮、链接等元素的颜色',
    },
    {
      name: '成功色',
      variable: '--idp-success-color',
      defaultValue: '#52c41a',
      currentValue: '#52c41a',
      description: '成功状态的颜色，如成功按钮、提示等',
    },
    {
      name: '警告色',
      variable: '--idp-warning-color',
      defaultValue: '#faad14',
      currentValue: '#faad14',
      description: '警告状态的颜色，如警告按钮、提示等',
    },
    {
      name: '错误色',
      variable: '--idp-error-color',
      defaultValue: '#f5222d',
      currentValue: '#f5222d',
      description: '错误状态的颜色，如错误按钮、提示等',
    },
  ]);

  // 应用主题颜色
  const applyTheme = () => {
    const root = document.documentElement;
    colors.forEach(color => {
      root.style.setProperty(color.variable, color.currentValue);
      root.style.setProperty(`${color.variable.replace('color', 'hover-color')}`, lightenColor(color.currentValue, 10));
    });
    
    messageApi.success('主题已更新');
  };

  // 重置主题颜色
  const resetTheme = () => {
    const root = document.documentElement;
    const resetColors = colors.map(color => {
      root.style.removeProperty(color.variable);
      root.style.removeProperty(`${color.variable.replace('color', 'hover-color')}`);
      return {
        ...color,
        currentValue: color.defaultValue,
      };
    });
    
    setColors(resetColors);
    
    messageApi.success('主题已重置为默认值');
  };

  // 颜色输入变化处理
  const handleColorChange = (index: number, value: any) => {
    const newColors = [...colors];
    newColors[index].currentValue = value;
    setColors(newColors);
  };

  // 颜色变浅函数
  const lightenColor = (color: string, percent: number) => {
    // 简化的颜色变浅实现，实际项目中可以使用更完善的颜色处理库
    const num = parseInt(color.replace('#', ''), 16);
    const amt = Math.round(2.55 * percent);
    const R = (num >> 16) + amt;
    const G = (num >> 8 & 0x00FF) + amt;
    const B = (num & 0x0000FF) + amt;
    return '#' + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
      (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
      (B < 255 ? B < 1 ? 0 : B : 255)).toString(16).slice(1);
  };

  // 展示各种组件，用于预览主题效果
  const renderPreviewComponents = () => {
    return (
      <div style={{ marginTop: 20, padding: 20, backgroundColor: '#f5f7fa', borderRadius: 8 }}>
        <h4>组件预览</h4>
        <p>修改主题颜色后，下方组件会实时更新：</p>
        
        {/* 按钮预览 */}
        <div style={{ marginBottom: 20 }}>
          <h5>按钮组件</h5>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <Button variant="primary">主要按钮</Button>
            <Button variant="success">成功按钮</Button>
            <Button variant="warning">警告按钮</Button>
            <Button variant="danger">危险按钮</Button>
          </div>
        </div>

        {/* 输入框预览 */}
        <div style={{ marginBottom: 20 }}>
          <h5>输入框组件</h5>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <Input placeholder="普通输入框" />
            <Input placeholder="带有前缀" prefix="🔍" />
            <Input placeholder="带有后缀" suffix="搜索" />
          </div>
        </div>

        {/* 分割线预览 */}
        <div style={{ marginBottom: 20 }}>
          <h5>分割线组件</h5>
          <Divider />
          <Divider />
        </div>

        {/* 模态框预览按钮 */}
        <div style={{ marginBottom: 20 }}>
          <h5>模态框组件</h5>
          <Button variant="primary" onClick={() => messageApi.success('模态框示例已省略，实际使用时会应用主题色')}>
            打开模态框
          </Button>
        </div>

        {/* 消息提示预览 */}
        <div style={{ marginBottom: 20 }}>
          <h5>消息提示组件</h5>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <Button variant="primary" onClick={() => messageApi.success('这是成功消息')}>
              显示成功消息
            </Button>
            <Button variant="warning" onClick={() => messageApi.warning('这是警告消息')}>
              显示警告消息
            </Button>
            <Button variant="danger" onClick={() => messageApi.error('这是错误消息')}>
              显示错误消息
            </Button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>自定义主题</h2>
      <p>通过修改 CSS 变量，可以轻松自定义组件库的主题颜色。</p>

      {/* 主题色配置区域 */}
      <div style={{ margin: '20px 0', padding: '20px', background: '#ffffff', borderRadius: '8px', border: '1px solid #e4e7ed' }}>
        <h3>主题色配置</h3>
        <p>修改下方颜色值，然后点击"应用主题"按钮查看效果：</p>

        {/* 颜色配置表格 */}
        <div style={{ margin: '20px 0' }}>
          {colors.map((color, index) => (
            <div key={index} style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
              <div style={{ width: '80px', fontWeight: 'bold' }}>{color.name}</div>
              <div style={{ width: '200px' }}>
                <Input
                  placeholder={`输入 ${color.variable} 的值`}
                  value={color.currentValue}
                  onChange={(e) => handleColorChange(index, e.target.value)}
                  style={{ marginRight: '8px' }}
                />
              </div>
              <ColorPicker
                color={color.currentValue}
                onChange={(newColor) => handleColorChange(index, newColor)}
                onColorChange={(newColor) => handleColorChange(index, newColor)}
                alpha={false}
                gradient={true} // 启用渐变色支持
                presetColors={[
                  '#1890ff', '#52c41a', '#faad14', '#f5222d', '#722ed1',
                  '#eb2f96', '#fa8c16', '#a0d911', '#13c2c2', '#2f54eb'
                ]}
              >
                <div
                  style={{
                    width: '24px',
                    height: '24px',
                    background: color.currentValue, // 使用background代替backgroundColor，支持渐变色
                    border: '1px solid #e4e7ed',
                    borderRadius: '4px',
                    cursor: 'pointer',
                  }}
                />
              </ColorPicker>
              <div style={{ flex: 1, color: '#606266', fontSize: '14px' }}>
                {color.description}
              </div>
            </div>
          ))}
        </div>

        {/* 操作按钮 */}
        <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
          <Button variant="primary" onClick={applyTheme}>
            应用主题
          </Button>
          <Button variant="secondary" onClick={resetTheme}>
            重置默认值
          </Button>
        </div>
      </div>

      {/* 组件预览区域 */}
      {renderPreviewComponents()}

      {/* 代码示例 */}
      <div style={{ marginTop: '40px' }}>
        <h3>实现原理</h3>
        <p>组件库使用 CSS 变量来定义主题颜色，通过修改这些变量可以轻松切换主题：</p>
        
        <h4>1. CSS 变量定义</h4>
        <SyntaxHighlighter language="css" style={vscDarkPlus} customStyle={{ borderRadius: '6px', margin: '10px 0' }}>
{`:root {
  /* 主色调 - 主要用于强调和突出显示 */
  --idp-primary-color: #1890ff; /* 主色调基础色 - 用于按钮、链接等主要交互元素 */
  --idp-primary-hover-color: #40a9ff; /* 主色调悬停色 - 用于鼠标悬停状态 */
  
  /* 辅助色 - 用于不同状态和场景 */
  --idp-success-color: #52c41a; /* 成功色 - 用于成功状态、确认操作等 */
  --idp-warning-color: #faad14; /* 警告色 - 用于警告提示、需要注意的操作等 */
  --idp-error-color: #f5222d; /* 错误色 - 用于错误提示、危险操作等 */
  --idp-info-color: #1890ff; /* 信息色 - 用于普通信息提示 */
  --idp-secondary-color: #6c757d; /* 次要色 - 用于次要按钮、辅助文本等 */
  
  /* 中性色 - 用于文本、边框、背景等基础元素 */
  --idp-text-color: rgba(0, 0, 0, 0.85); /* 主要文本色 - 用于正文、标题等 */
  --idp-text-color-secondary: rgba(0, 0, 0, 0.65); /* 次要文本色 - 用于副标题、辅助说明等 */
  --idp-text-color-tertiary: rgba(0, 0, 0, 0.45); /*  tertiary文本色 - 用于次要信息、提示文字等 */
  --idp-text-color-light: #bfbfbf; /* 浅色文本 - 用于禁用状态、占位符等 */
  --idp-border-color: #e8e8e8; /* 基础边框色 - 用于容器、分割线等 */
  --idp-border-color-light: #f0f0f0; /* 浅色边框 - 用于次要分割、卡片边框等 */
  --idp-border-color-extra-light: #d9d9d9; /* 超浅色边框 - 用于输入框、表格边框等 */
  --idp-bg-color: #fafafa; /* 基础背景色 - 用于页面背景、容器背景等 */
  --idp-bg-color-light: #f5f5f5; /* 浅色背景 - 用于卡片、组件背景等 */
  --idp-bg-color-white: #fff; /* 白色背景 - 用于主要内容区域、弹窗等 */
  
  /* 阴影效果 - 用于组件的悬浮和层次感 */
  --idp-shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.15); /* 小阴影 - 用于轻微悬浮效果 */
  --idp-shadow-md: 0 4px 12px rgba(0, 0, 0, 0.15); /* 中阴影 - 用于卡片、弹窗等 */
  --idp-shadow-lg: 0 8px 24px rgba(0, 0, 0, 0.15); /* 大阴影 - 用于模态框、下拉菜单等 */
  --idp-shadow-extra-light: 0 2px 8px rgba(0, 0, 0, 0.08); /* 超浅阴影 - 用于轻微凸起效果 */
  
  /* 圆角 - 用于组件的边角处理 */
  --idp-border-radius-sm: 4px; /* 小圆角 - 用于按钮、输入框等小组件 */
  --idp-border-radius-md: 6px; /* 中圆角 - 用于卡片、弹窗等中等组件 */
  --idp-border-radius-lg: 8px; /* 大圆角 - 用于模态框、特殊容器等 */
  
  /* 动画 - 用于过渡和动效 */
  --idp-transition-duration: 0.2s; /* 过渡动画持续时间 - 控制动画快慢 */
  --idp-transition-timing-function: ease-in-out; /* 过渡动画缓动函数 - 控制动画节奏 */
  
  /* 透明度 - 用于元素的显示状态 */
  --idp-opacity-disabled: 0.65; /* 禁用状态透明度 - 用于禁用的按钮、输入框等 */
  
  /* z-index - 用于控制元素的堆叠顺序 */
  --idp-z-index-modal: 1000; /* 模态框层级 - 确保模态框在最上层 */
  --idp-z-index-message: 1050; /* 消息提示层级 - 确保消息提示在模态框之上 */
  --idp-z-index-marquee-fixed: 99999; /* 跑马灯固定层级 - 确保跑马灯始终在最顶层 */
  
  /* Button 组件 - 按钮相关样式变量 */
  --idp-button-primary-bg: var(--idp-primary-color); /* 主要按钮背景色 */
  --idp-button-primary-border: var(--idp-primary-color); /* 主要按钮边框色 */
  --idp-button-primary-hover-bg: var(--idp-primary-hover-color); /* 主要按钮悬停背景色 */
  --idp-button-primary-hover-border: var(--idp-primary-hover-color); /* 主要按钮悬停边框色 */
  --idp-button-primary-active-shadow: 0 4px 8px rgba(24, 144, 255, 0.4); /* 主要按钮激活阴影 */
  
  --idp-button-secondary-bg: var(--idp-secondary-color); /* 次要按钮背景色 */
  --idp-button-secondary-border: var(--idp-secondary-color); /* 次要按钮边框色 */
  --idp-button-secondary-hover-bg: lighten(var(--idp-secondary-color), 10%); /* 次要按钮悬停背景色 */
  --idp-button-secondary-hover-border: lighten(var(--idp-secondary-color), 10%); /* 次要按钮悬停边框色 */
  --idp-button-secondary-active-shadow: 0 4px 8px rgba(108, 117, 125, 0.4); /* 次要按钮激活阴影 */
  
  --idp-button-danger-bg: var(--idp-error-color); /* 危险按钮背景色 */
  --idp-button-danger-border: var(--idp-error-color); /* 危险按钮边框色 */
  --idp-button-danger-hover-bg: #e74c3c; /* 危险按钮悬停背景色 */
  --idp-button-danger-hover-border: #e74c3c; /* 危险按钮悬停边框色 */
  --idp-button-danger-active-shadow: 0 4px 8px rgba(220, 53, 69, 0.4); /* 危险按钮激活阴影 */
  
  --idp-button-success-bg: var(--idp-success-color); /* 成功按钮背景色 */
  --idp-button-success-border: var(--idp-success-color); /* 成功按钮边框色 */
  --idp-button-success-hover-bg: lighten(var(--idp-success-color), 10%); /* 成功按钮悬停背景色 */
  --idp-button-success-hover-border: lighten(var(--idp-success-color), 10%); /* 成功按钮悬停边框色 */
  --idp-button-success-active-shadow: 0 4px 8px rgba(40, 167, 69, 0.4); /* 成功按钮激活阴影 */
  
  --idp-button-warning-bg: var(--idp-warning-color); /* 警告按钮背景色 */
  --idp-button-warning-border: var(--idp-warning-color); /* 警告按钮边框色 */
  --idp-button-warning-hover-bg: lighten(var(--idp-warning-color), 10%); /* 警告按钮悬停背景色 */
  --idp-button-warning-hover-border: lighten(var(--idp-warning-color), 10%); /* 警告按钮悬停边框色 */
  --idp-button-warning-active-shadow: 0 4px 8px rgba(255, 193, 7, 0.4); /* 警告按钮激活阴影 */
  
  --idp-button-text-white: #fff; /* 按钮白色文本色 */
  --idp-button-text-dark: #212529; /* 按钮深色文本色 - 用于浅色背景按钮 */
  --idp-button-height-small: 24px; /* 小尺寸按钮高度 */
  --idp-button-height-medium: 32px; /* 中尺寸按钮高度 */
  --idp-button-height-large: 40px; /* 大尺寸按钮高度 */
  
  /* Icon 组件 - 图标相关样式变量 */
  --idp-icon-fill: #339af0; /* 图标填充色 - 用于默认状态图标 */
  --idp-icon-hover-fill: #1890ff; /* 图标悬停填充色 - 用于鼠标悬停状态图标 */
  
  /* Input 组件 - 输入框相关样式变量 */
  --idp-input-bg: var(--idp-bg-color-white); /* 输入框背景色 */
  --idp-input-border: var(--idp-border-color-extra-light); /* 输入框边框色 */
  --idp-input-border-hover: var(--idp-primary-color); /* 输入框悬停边框色 */
  --idp-input-border-focus: var(--idp-primary-color); /* 输入框聚焦边框色 */
  --idp-input-box-shadow-hover: 0 0 0 2px rgba(51, 154, 240, 0.2); /* 输入框悬停阴影 */
  --idp-input-box-shadow-focus: 0 0 0 2px rgba(51, 154, 240, 0.2); /* 输入框聚焦阴影 */
  --idp-input-text-color: var(--idp-text-color); /* 输入框文本色 */
  --idp-input-placeholder-color: var(--idp-text-color-light); /* 输入框占位符色 */
  --idp-input-suffix-color: #909399; /* 输入框后缀图标色 */
  --idp-input-clear-color: var(--idp-primary-color); /* 输入框清除按钮色 */
  --idp-input-error-border: var(--idp-error-color); /* 输入框错误边框色 */
  --idp-input-error-box-shadow: 0 0 0 2px rgba(245, 34, 45, 0.2); /* 输入框错误阴影 */
  --idp-input-error-text: var(--idp-error-color); /* 输入框错误文本色 */
  --idp-input-disabled-bg: var(--idp-bg-color-light); /* 输入框禁用背景色 */
  --idp-input-disabled-border: var(--idp-border-color-extra-light); /* 输入框禁用边框色 */
  --idp-input-disabled-text: var(--idp-text-color-light); /* 输入框禁用文本色 */
  
  /* Divider 组件 - 分割线相关样式变量 */
  --idp-divider-color: #339af0; /* 分割线颜色 */
  
  /* Marquee 组件 - 跑马灯相关样式变量 */
  --idp-marquee-bg: var(--idp-bg-color-white); /* 跑马灯背景色 */
  --idp-marquee-text-color: #333; /* 跑马灯文本色 */
  --idp-marquee-shadow: var(--idp-shadow-extra-light); /* 跑马灯阴影 */
  
  /* Message 组件 - 消息提示相关样式变量 */
  --idp-message-bg: var(--idp-bg-color-white); /* 消息提示背景色 */
  --idp-message-border-radius: var(--idp-border-radius-sm); /* 消息提示圆角 */
  --idp-message-shadow: var(--idp-shadow-md); /* 消息提示阴影 */
  --idp-message-text-color: #333; /* 消息提示文本色 */
  --idp-message-success-border: #b7eb8f; /* 成功消息边框色 */
  --idp-message-success-text: var(--idp-success-color); /* 成功消息文本色 */
  --idp-message-warning-border: #ffe58f; /* 警告消息边框色 */
  --idp-message-warning-text: var(--idp-warning-color); /* 警告消息文本色 */
  --idp-message-error-border: #ffccc7; /* 错误消息边框色 */
  --idp-message-error-text: var(--idp-error-color); /* 错误消息文本色 */
  
  /* Table 组件 - 表格相关样式变量 */
  --idp-table-bg: var(--idp-bg-color-white); /* 表格背景色 */
  --idp-table-text-color: rgba(0, 0, 0, 0.88); /* 表格文本色 */
  --idp-table-border: var(--idp-border-color-extra-light); /* 表格边框色 */
  --idp-table-border-light: var(--idp-border-color-light); /* 表格浅色边框 */
  --idp-table-header-bg: var(--idp-bg-color); /* 表格表头背景色 */
  --idp-table-header-border: var(--idp-border-color-light); /* 表格表头边框色 */
  --idp-table-body-border: var(--idp-border-color-light); /* 表格表体边框色 */
  --idp-table-row-hover-bg: var(--idp-bg-color); /* 表格行悬停背景色 */
  --idp-table-empty-text-color: rgba(0, 0, 0, 0.25); /* 表格空数据文本色 */
  --idp-table-pagination-border: var(--idp-border-color-light); /* 表格分页器边框色 */
  --idp-table-pagination-text: var(--idp-text-color-secondary); /* 表格分页器文本色 */
  --idp-table-pagination-btn-bg: var(--idp-bg-color-white); /* 表格分页器按钮背景色 */
  --idp-table-pagination-btn-border: var(--idp-border-color-extra-light); /* 表格分页器按钮边框色 */
  --idp-table-pagination-btn-hover-text: #1a2980; /* 表格分页器按钮悬停文本色 */
  --idp-table-pagination-btn-hover-border: #1a2980; /* 表格分页器按钮悬停边框色 */
  --idp-table-pagination-page-active-bg: #1a2980; /* 表格分页器激活页背景色 */
  --idp-table-pagination-page-active-border: #1a2980; /* 表格分页器激活页边框色 */
  --idp-table-pagination-page-active-text: var(--idp-bg-color-white); /* 表格分页器激活页文本色 */
  
  /* Modal 相关 - 模态框样式变量 */
  --idp-modal-mask-bg: rgba(0, 0, 0, 0.5); /* 模态框遮罩背景色 */
  --idp-modal-container-bg: var(--idp-bg-color-white); /* 模态框容器背景色 */
  --idp-modal-header-bg: var(--idp-bg-color); /* 模态框头部背景色 */
  --idp-modal-footer-bg: var(--idp-bg-color); /* 模态框底部背景色 */
}`}
        </SyntaxHighlighter>

        <h4>2. 在组件中使用 CSS 变量</h4>
        <SyntaxHighlighter language="css" style={vscDarkPlus} customStyle={{ borderRadius: '6px', margin: '10px 0' }}>
{`.idp-button--primary {
  background-color: var(--idp-primary-color);
  color: white;
  border-color: var(--idp-primary-color);
  
  &:hover:not(.idp-button--disabled) {
    background-color: var(--idp-primary-hover-color);
    border-color: var(--idp-primary-hover-color);
  }
}`}
        </SyntaxHighlighter>

        <h4>3. 动态修改主题</h4>
        <SyntaxHighlighter language="typescript" style={vscDarkPlus} customStyle={{ borderRadius: '6px', margin: '10px 0' }}>
{`// 动态修改主题色
const changeTheme = (newColor: string) => {
  const root = document.documentElement;
  root.style.setProperty('--idp-primary-color', newColor);
  root.style.setProperty('--idp-primary-hover-color', lightenColor(newColor, 10%));
};`}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};

const VariablesExample: React.FC = () => {
  return (
    <MessageProvider>
      <ThemeExampleConsumer />
    </MessageProvider>
  );
};

// 使用 Message Hook 的组件
const ThemeExampleConsumer: React.FC = () => {
  const messageApi = useMessage();
  return <ThemeExample messageApi={messageApi} />;
};

export default VariablesExample;
