import React, { useState } from 'react';
import { Navigation, Flex } from '../../components';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

const NavigationExample: React.FC = () => {
    const [selectedKey, setSelectedKey] = useState('button');
    const [collapsed, setCollapsed] = useState(false);

    // 基础导航数据
    const basicNavigationItems = [
        { key: 'intro', name: '简介', description: '组件库介绍', icon: '📖' },
        { key: 'install', name: '安装', description: '安装指南', icon: '📦' },
        { key: 'button', name: 'Button', description: '按钮组件', icon: '🔘' },
        { key: 'input', name: 'Input', description: '输入框组件', icon: '🔤' },
        { key: 'modal', name: 'Modal', description: '弹窗组件', icon: '🪟' },
        { key: 'table', name: 'Table', description: '表格组件', icon: '📊' },
    ];

    // 多级菜单数据
    const multiLevelNavigationItems = [
        {
            key: 'basic',
            name: '基础组件',
            description: '基础UI组件',
            icon: '🧱',
            childrens: [
                { key: 'button', name: 'Button', description: '按钮组件', icon: '🔘' },
                { key: 'input', name: 'Input', description: '输入框组件', icon: '🔤' },
                { 
                    key: 'icon', name: 'Icon', description: '图标组件', icon: '🖼️', childrens: [
                        {
                            key: 'icon-1', name: 'Icon-1', description: '图标组件-1', icon: '🏠' 
                        }
                    ] 
                },
            ]
        },
        {
            key: 'layout',
            name: '布局组件',
            description: '布局相关组件',
            icon: '📐',
            childrens: [
                { key: 'flex', name: 'Flex', description: 'Flex布局', icon: '🧱' },
                { key: 'grid', name: 'Grid', description: '网格布局', icon: '🔲' },
                { key: 'space', name: 'Space', description: '间距组件', icon: '⚫' },
            ]
        },
        {
            key: 'feedback',
            name: '反馈组件',
            description: '用户反馈组件',
            icon: '💬',
            childrens: [
                { key: 'modal', name: 'Modal', description: '弹窗组件', icon: '🪟' },
                { key: 'message', name: 'Message', description: '消息提示', icon: '💬' },
                { key: 'notification', name: 'Notification', description: '通知组件', icon: '🔔' },
            ]
        },
        { key: 'api', name: 'API 参考', description: 'API文档', icon: '📋' },
    ];

    // 禁用项数据
    const disabledNavigationItems = [
        { key: 'intro', name: '简介', description: '组件库介绍', icon: '📖' },
        { key: 'install', name: '安装', description: '安装指南', icon: '📦' },
        { key: 'button', name: 'Button', description: '按钮组件', icon: '🔘', disabled: true },
        { key: 'input', name: 'Input', description: '输入框组件', icon: '🔤' },
        { key: 'modal', name: 'Modal', description: '弹窗组件', icon: '🪟', disabled: true },
    ];

    // API参数数据源
    const apiDataSource = [
        { param: 'items', type: 'NavigationItem[]', default: '-', description: '导航项数组，支持多级嵌套结构' },
        { param: 'selectedKey', type: 'string', default: '-', description: '当前选中的导航项key' },
        { param: 'collapsed', type: 'boolean', default: 'false', description: '导航栏是否处于收缩状态（仅垂直模式生效）' },
        { param: 'defaultOpenKeys', type: 'string[]', default: '[]', description: '默认展开的子菜单key数组' },
        { param: 'mode', type: 'NavigationMode', default: 'vertical', description: '导航模式：vertical | horizontal' },
        { param: 'closeOnOutsideClick', type: 'boolean', default: 'true', description: '点击外部区域时是否自动收起（仅水平模式生效）' },
        { param: 'onChange', type: '(item: NavigationItem, key: string) => void', default: '-', description: '导航项点击回调函数' },
        { param: 'onCollapseChange', type: '(collapsed: boolean) => void', default: '-', description: '收缩状态变化回调函数' },
        { param: 'width', type: 'number', default: '280', description: '导航栏展开时的宽度（仅垂直模式生效）' },
        { param: 'collapsedWidth', type: 'number', default: '48', description: '导航栏收缩时的宽度（仅垂直模式生效）' },
        { param: 'animationDuration', type: 'number', default: '300', description: '收缩动画持续时间（毫秒）' },
    ];

    const handleItemClick = (item: any, key: string) => {
        setSelectedKey(key);
        console.log('导航项点击:', item, key);
    };

    const handleCollapseChange = (isCollapsed: boolean) => {
        setCollapsed(isCollapsed);
        console.log('导航栏收缩状态:', isCollapsed);
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1>Navigation 导航组件</h1>
            <p>Navigation 组件提供了一套完整的导航菜单系统，支持多级菜单、收缩动画、自定义样式等功能。</p>

            {/* 基础用法示例 */}
            <div style={{ marginBottom: '40px' }}>
                <h2>基础用法</h2>
                <p>基础的单级导航菜单，支持图标、标题和描述。</p>
                
                <Flex direction="row" gap={40}>
                    <div style={{ border: '1px solid #e1e1e1', borderRadius: '8px', padding: '16px', width: 'auto' }}>
                        <Navigation
                            items={basicNavigationItems}
                            selectedKey={selectedKey}
                            collapsed={collapsed}
                            onChange={handleItemClick}
                            onCollapseChange={handleCollapseChange}
                            width={240}
                            collapsedWidth={48}
                        />
                    </div>
                    <div style={{ flex: 1 }}>
                        <SyntaxHighlighter language="tsx" style={vscDarkPlus} customStyle={{ borderRadius: '6px', margin: '0', fontSize: '14px', fontFamily: 'monospace' }}>
{`<Navigation
  items={basicNavigationItems}
  selectedKey={selectedKey}
  collapsed={collapsed}
  onChange={handleItemClick}
  onCollapseChange={handleCollapseChange}
  width={240}
  collapsedWidth={48}
/>`}
                        </SyntaxHighlighter>
                    </div>
                </Flex>
            </div>

            {/* 多级菜单示例 */}
            <div style={{ marginBottom: '40px' }}>
                <h2>多级菜单</h2>
                <p>支持多级嵌套的导航菜单，点击父级菜单可以展开/收起子菜单。</p>
                
                <Flex direction="row" gap={40}>
                    <div style={{ border: '1px solid #e1e1e1', borderRadius: '8px', padding: '16px', width: 'auto' }}>
                        <Navigation
                            items={multiLevelNavigationItems}
                            selectedKey={selectedKey}
                            collapsed={collapsed}
                            onChange={handleItemClick}
                            onCollapseChange={handleCollapseChange}
                            defaultOpenKeys={['basic']}
                            width={280}
                            collapsedWidth={48}
                        />
                    </div>
                    <div style={{ flex: 1 }}>
                        <SyntaxHighlighter language="tsx" style={vscDarkPlus} customStyle={{ borderRadius: '6px', margin: '0', fontSize: '14px', fontFamily: 'monospace' }}>
{`const multiLevelNavigationItems = [
  {
    key: 'basic',
    name: '基础组件',
    description: '基础UI组件',
    icon: '🧱',
    childrens: [
      { key: 'button', name: 'Button', description: '按钮组件', icon: '🔘' },
      { key: 'input', name: 'Input', description: '输入框组件', icon: '🔤' },
    ]
  }
];

<Navigation
  items={multiLevelNavigationItems}
  selectedKey={selectedKey}
  collapsed={collapsed}
  defaultOpenKeys={['basic']}
  onChange={handleItemClick}
  onCollapseChange={handleCollapseChange}
/>`}
                        </SyntaxHighlighter>
                    </div>
                </Flex>
            </div>

            {/* 水平导航示例 */}
            <div style={{ marginBottom: '40px' }}>
                <h2>水平导航</h2>
                <p>顶部水平布局，点击一级菜单在下方弹出二级菜单。</p>
                
                <Flex direction="row" gap={40}>
                    <div style={{ border: '1px solid #e1e1e1', borderRadius: '8px', padding: '16px', width: '100%' }}>
                        <Navigation
                            items={multiLevelNavigationItems}
                            selectedKey={selectedKey}
                            onChange={handleItemClick}
                            mode="horizontal"
                            closeOnOutsideClick={true}
                        />
                    </div>
                    <div style={{ flex: 1 }}>
                        <SyntaxHighlighter language="tsx" style={vscDarkPlus} customStyle={{ borderRadius: '6px', margin: '0', fontSize: '14px', fontFamily: 'monospace' }}>
{`<Navigation
  items={multiLevelNavigationItems}
  selectedKey={selectedKey}
  onChange={handleItemClick}
  mode="horizontal"
  closeOnOutsideClick={true}
/>`}
                        </SyntaxHighlighter>
                    </div>
                </Flex>
            </div>

            {/* 禁用状态示例 */}
            <div style={{ marginBottom: '40px' }}>
                <h2>禁用状态</h2>
                <p>支持禁用某些导航项，禁用的项不可点击。</p>
                
                <Flex direction="row" gap={40}>
                    <div style={{ border: '1px solid #e1e1e1', borderRadius: '8px', padding: '16px', width: 'auto' }}>
                        <Navigation
                            items={disabledNavigationItems}
                            selectedKey={selectedKey}
                            collapsed={collapsed}
                            onChange={handleItemClick}
                            onCollapseChange={handleCollapseChange}
                            width={240}
                            collapsedWidth={48}
                        />
                    </div>
                    <div style={{ flex: 1 }}>
                        <SyntaxHighlighter language="tsx" style={vscDarkPlus} customStyle={{ borderRadius: '6px', margin: '0', fontSize: '14px', fontFamily: 'monospace' }}>
{`const disabledNavigationItems = [
  { key: 'button', name: 'Button', description: '按钮组件', icon: '🔘', disabled: true },
  { key: 'modal', name: 'Modal', description: '弹窗组件', icon: '🪟', disabled: true }
];

<Navigation
  items={disabledNavigationItems}
  selectedKey={selectedKey}
  collapsed={collapsed}
  onChange={handleItemClick}
  onCollapseChange={handleCollapseChange}
/>`}
                        </SyntaxHighlighter>
                    </div>
                </Flex>
            </div>

            {/* 收缩动画示例 */}
            <div style={{ marginBottom: '40px' }}>
                <h2>收缩动画</h2>
                <p>支持平滑的收缩动画效果，可以自定义动画时长。</p>
                
                <Flex direction="row" gap={40}>
                    <div style={{ border: '1px solid #e1e1e1', borderRadius: '8px', padding: '16px', width: 'auto' }}>
                        <Navigation
                            items={basicNavigationItems}
                            selectedKey={selectedKey}
                            collapsed={true}
                            onChange={handleItemClick}
                            onCollapseChange={handleCollapseChange}
                            width={280}
                            collapsedWidth={48}
                            animationDuration={500}
                        />
                    </div>
                    <div style={{ flex: 1 }}>
                        <SyntaxHighlighter language="tsx" style={vscDarkPlus} customStyle={{ borderRadius: '6px', margin: '0', fontSize: '14px', fontFamily: 'monospace' }}>
{`<Navigation
  items={basicNavigationItems}
  selectedKey={selectedKey}
  collapsed={true}
  onChange={handleItemClick}
  onCollapseChange={handleCollapseChange}
  animationDuration={500}
/>`}
                        </SyntaxHighlighter>
                    </div>
                </Flex>
            </div>

            {/* API 文档 */}
            <div style={{ marginBottom: '40px' }}>
                <h2>API 文档</h2>
                <p>Navigation 组件的完整 API 文档。</p>
                
                <div style={{ overflow: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
                        <thead>
                            <tr style={{ backgroundColor: '#f5f5f5' }}>
                                <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>参数</th>
                                <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>类型</th>
                                <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>默认值</th>
                                <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>说明</th>
                            </tr>
                        </thead>
                        <tbody>
                            {apiDataSource.map((api, index) => (
                                <tr key={index} style={{ backgroundColor: index % 2 === 0 ? '#fff' : '#f9f9f9' }}>
                                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>{api.param}</td>
                                    <td style={{ border: '1px solid #ddd', padding: '8px', fontFamily: 'monospace' }}>{api.type}</td>
                                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>{api.default}</td>
                                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>{api.description}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* 使用说明 */}
            <div style={{ marginBottom: '40px' }}>
                <h2>使用说明</h2>
                <p>Navigation 组件提供了丰富的配置选项，可以满足各种导航需求：</p>
                
                <ul style={{ lineHeight: '1.6' }}>
                    <li><strong>多级菜单</strong>：通过 childrens 属性支持无限级嵌套</li>
                    <li><strong>收缩动画</strong>：支持平滑的宽度变化动画，可自定义时长</li>
                    <li><strong>禁用状态</strong>：通过 disabled 属性禁用特定导航项</li>
                    <li><strong>自定义样式</strong>：支持 className 和 style 属性自定义样式</li>
                    <li><strong>响应式设计</strong>：在移动端自动适配为侧边抽屉模式</li>
                    <li><strong>Tooltip 提示</strong>：收缩状态下鼠标悬停显示完整标题</li>
                </ul>
            </div>
        </div>
    );
};

export default NavigationExample;