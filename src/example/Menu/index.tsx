import React, { useState } from 'react';
import { Menu, Icon, Table, Flex } from '../../components';
import type { Column } from '../../components/Table';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

const MenuExample: React.FC = () => {
  // 用于演示受控组件模式的state
  const [controlledSelectedKey, setControlledSelectedKey] = useState('1-1-1');
  // 用于演示折叠模式的state
  const [collapsed, setCollapsed] = useState(false);
  
  // API参数列配置
  const apiColumns: Column[] = [
    { dataIndex: 'param', title: '参数名', width: '150px' },
    { dataIndex: 'type', title: '类型', width: '300px' },
    { dataIndex: 'default', title: '默认值', width: '150px' },
    { dataIndex: 'description', title: '描述', width: '300px' }
  ];

  // API参数数据源
  const apiDataSource = [
    { param: 'mode', type: '"horizontal" | "vertical" | "inline-flex" | "inline-block"', default: '"vertical"', description: '菜单模式，支持水平、垂直和内联三种模式' },
    { param: 'items', type: 'MenuItemProps[]', default: '-', description: '菜单项数组，支持嵌套结构' },
    { param: 'className', type: 'string', default: '-', description: '自定义 CSS 类名' },
    { param: 'style', type: 'React.CSSProperties', default: '-', description: '自定义样式对象' },
    { param: 'selectedKey', type: 'string', default: '-', description: '当前选中的菜单项key，用于受控组件模式' },
    { param: 'collapsed', type: 'boolean', default: 'false', description: '垂直菜单的折叠状态，true为折叠模式，只显示图标或首字符' }
  ];

  // MenuItem类型定义
  const itemApiDataSource = [
    { param: 'key', type: 'string', default: '-', description: '菜单项的唯一标识，支持层级格式如"1-2-1"' },
    { param: 'label', type: 'string', default: '-', description: '菜单项显示文本' },
    { param: 'icon', type: 'React.ReactNode', default: '-', description: '菜单项图标，可选' },
    { param: 'childrens', type: 'MenuItemProps[]', default: '-', description: '子菜单项数组，支持多层嵌套' }
  ];
  
  // Menu额外参数
  const extraApiDataSource = [
    { param: 'onChange', type: '(info: MenuItemProps, key: string) => void', default: '-', description: '菜单项点击回调函数，返回点击的菜单项信息和key值' }
  ];

  // 菜单数据
  const menuItems = [
    {
      key: '1',
      label: '系统管理',
      icon: <Icon type="setting" size={16} />,
      childrens: [
        {
          key: '1-1',
          label: '用户管理',
          icon: <Icon type="user" size={14} />,
          childrens: [
            { key: '1-1-1', label: '用户列表', icon: <Icon type="list" size={12} /> },
            { key: '1-1-2', label: '角色管理', icon: <Icon type="mobile" size={12} /> }
          ]
        },
        {
          key: '1-2',
          label: '权限管理',
          icon: <Icon type="safety" size={14} />,
          childrens: [
            { key: '1-2-1', label: '权限配置', icon: <Icon type="key" size={12} /> },
            { key: '1-2-2', label: '权限分配', icon: <Icon type="share" size={12} /> }
          ]
        }
      ]
    },
    {
      key: '2',
      label: '内容管理',
      icon: <Icon type="fileText" size={16} />,
      childrens: [
        {
          key: '2-1',
          label: '文章管理',
          icon: <Icon type="book" size={14} />,
          childrens: [
            { key: '2-1-1', label: '文章列表', icon: <Icon type="unorderedList" size={12} /> },
            { key: '2-1-2', label: '文章分类', icon: <Icon type="folder" size={12} /> }
          ]
        },
        {
          key: '2-2',
          label: '媒体库',
          icon: <Icon type="picture" size={14} />,
          childrens: [
            { key: '2-2-1', label: '图片管理', icon: <Icon type="image" size={12} /> },
            { key: '2-2-2', label: '文件管理', icon: <Icon type="file" size={12} /> }
          ]
        }
      ]
    }
  ];

  // 内联菜单数据
  const inlineMenuItems = [
    {
      key: '1',
      label: '首页',
      icon: <Icon type="home" size={16} />
    },
    {
      key: '2',
      label: '产品',
      icon: <Icon type="appstore" size={16} />,
      childrens: [
        { key: '2-1', label: '产品列表' },
        { key: '2-2', label: '产品分类' }
      ]
    },
    {
      key: '3',
      label: '关于',
      icon: <Icon type="infoCircle" size={16} />
    }
  ];

  return (
    <div style={{ padding: '20px' }}>
      <h2>Menu 组件</h2>
      <p>菜单导航组件，支持多种模式和交互方式，为页面和功能提供导航。</p>
      
      {/* API 文档 */}
      <div style={{ marginBottom: '40px' }}>
        <h3>API 文档</h3>
        
        <h4>Menu Props</h4>
        <Table columns={apiColumns} dataSource={apiDataSource} />
        
        <h4>MenuItem Props</h4>
        <Table columns={apiColumns} dataSource={itemApiDataSource} />
        
        <h4>事件回调</h4>
        <Table columns={apiColumns} dataSource={extraApiDataSource} />
      </div>

      {/* 垂直菜单示例 */}
      <div style={{ marginBottom: '40px' }}>
        <h3>垂直菜单 (Vertical)</h3>
        <p>适合侧边栏导航的垂直菜单，支持多级嵌套。</p>
        
        <Flex direction="row" gap={40}>
          <div style={{ border: '1px solid #e1e1e1', borderRadius: '8px', padding: '16px', width: 'auto' }}>
            <Menu 
              mode="vertical" 
              items={menuItems} 
              onChange={(info, key) => console.log('菜单项点击:', info, key)} 
            />
          </div>
          <div style={{ flex: 1 }}>
            <SyntaxHighlighter language="tsx" style={vscDarkPlus} customStyle={{ borderRadius: '6px', margin: '0', fontSize: '14px', fontFamily: 'monospace' }}>
{`const menuItems = [
  {
    key: '1',
    label: '系统管理',
    icon: <Icon type="setting" size={16} />,
    childrens: [
      {
        key: '1-1',
        label: '用户管理',
        childrens: [
          { key: '1-1-1', label: '用户列表' }
        ]
      }
    ]
  }
];

<Menu 
  mode="vertical" 
  items={menuItems} 
  onChange={(info, key) => console.log('菜单项点击:', info, key)} 
/>`}
            </SyntaxHighlighter>
          </div>
        </Flex>
      </div>

      {/* 垂直菜单折叠模式示例 */}
      <div style={{ marginBottom: '40px' }}>
        <h3>垂直菜单折叠模式 (Collapsed)</h3>
        <p>垂直菜单支持折叠模式，折叠后只显示图标或首字符，鼠标悬停显示完整标签。</p>
        
        <div style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
            <input 
              type="checkbox" 
              checked={collapsed} 
              onChange={(e) => setCollapsed(e.target.checked)}
              style={{ width: '16px', height: '16px' }}
            />
            <span>折叠模式</span>
          </label>
          <span style={{ color: '#666', fontSize: '14px' }}>
            当前状态: {collapsed ? '已折叠' : '已展开'}
          </span>
        </div>
        
        <Flex direction="row" gap={40}>
          <div style={{ border: '1px solid #e1e1e1', borderRadius: '8px', padding: '16px', width: 'auto' }}>
            <Menu 
              mode="vertical" 
              items={menuItems} 
              collapsed={collapsed}
              onChange={(info, key) => console.log('菜单项点击:', info, key)} 
            />
          </div>
          <div style={{ flex: 1 }}>
            <SyntaxHighlighter language="tsx" style={vscDarkPlus} customStyle={{ borderRadius: '6px', margin: '0', fontSize: '14px', fontFamily: 'monospace' }}>
{`const [collapsed, setCollapsed] = useState(false);

// 折叠开关
<label>
  <input 
    type="checkbox" 
    checked={collapsed} 
    onChange={(e) => setCollapsed(e.target.checked)}
  />
  折叠模式
</label>

<Menu 
  mode="vertical" 
  items={menuItems} 
  collapsed={collapsed}
  onChange={(info, key) => console.log('菜单项点击:', info, key)} 
/>`}
            </SyntaxHighlighter>
          </div>
        </Flex>
      </div>

      {/* 水平菜单示例 */}
      <div style={{ marginBottom: '40px' }}>
        <h3>水平菜单 (Horizontal)</h3>
        <p>适合顶部导航的水平菜单，支持点击触发子菜单。</p>
        
        <div style={{ marginBottom: '20px' }}>
          <div style={{ border: '1px solid #e1e1e1', borderRadius: '8px', padding: '16px' }}>
            <Menu mode="horizontal" items={inlineMenuItems} onChange={(info, key)=> console.log(info, key)}/>
          </div>
        </div>
        <SyntaxHighlighter language="tsx" style={vscDarkPlus} customStyle={{ borderRadius: '6px', margin: '0', fontSize: '14px', fontFamily: 'monospace' }}>
{`<Menu mode="horizontal" items={menuItems} />`}
        </SyntaxHighlighter>
      </div>

      {/* 内联菜单示例 */}
      <div style={{ marginBottom: '40px' }}>
        <h3>内联菜单 (Inline-Flex)</h3>
        <p>水平排列的内联菜单，右侧弹出子菜单。</p>
        
        <div style={{ marginBottom: '20px' }}>
          <div style={{ border: '1px solid #e1e1e1', borderRadius: '8px', padding: '16px' }}>
            <Menu mode="inline-flex" items={inlineMenuItems} />
          </div>
        </div>
        <SyntaxHighlighter language="tsx" style={vscDarkPlus} customStyle={{ borderRadius: '6px', margin: '0', fontSize: '14px', fontFamily: 'monospace' }}>
{`<Menu mode="inline-flex" items={menuItems} />`}
        </SyntaxHighlighter>
      </div>

      {/* inline-block模式示例 */}
      <div style={{ marginBottom: '40px' }}>
        <h3>inline-block模式</h3>
        <p>水平排列的内联块菜单，垂直展开子菜单。</p>
        
        <div style={{ marginBottom: '20px' }}>
          <div style={{ border: '1px solid #e1e1e1', borderRadius: '8px', padding: '16px' }}>
            <Menu mode="inline-block" items={inlineMenuItems} />
          </div>
        </div>
        <SyntaxHighlighter language="tsx" style={vscDarkPlus} customStyle={{ borderRadius: '6px', margin: '0', fontSize: '14px', fontFamily: 'monospace' }}>
{`<Menu mode="inline-block" items={menuItems} />`}
        </SyntaxHighlighter>
      </div>

      {/* selectedKey示例 */}
      <div style={{ marginBottom: '40px' }}>
        <h3>受控组件模式 (selectedKey)</h3>
        <p>使用selectedKey属性控制菜单的选中状态，当选中子项目时会自动展开父级菜单。</p>
        
        <Flex direction="row" gap={40}>
          <div style={{ border: '1px solid #e1e1e1', borderRadius: '8px', padding: '16px', width: 'auto' }}>
            <Menu 
              mode="vertical" 
              items={menuItems} 
              selectedKey={controlledSelectedKey}
              onChange={(info, key) => {
                setControlledSelectedKey(key);
                console.log('菜单项点击:', info, key);
              }} 
            />
          </div>
          <div style={{ flex: 1 }}>
            <SyntaxHighlighter language="tsx" style={vscDarkPlus} customStyle={{ borderRadius: '6px', margin: '0', fontSize: '14px', fontFamily: 'monospace' }}>
{`const [selectedKey, setSelectedKey] = useState('1-1-1');

<Menu 
  mode="vertical" 
  items={menuItems} 
  selectedKey={selectedKey}
  onChange={(info, key) => {
    setSelectedKey(key);
    console.log('菜单项点击:', info, key);
  }} 
/>`}
            </SyntaxHighlighter>
          </div>
        </Flex>
      </div>

      {/* 使用说明 */}
      <div style={{ 
        backgroundColor: '#f8f9fa', 
        border: '1px solid #e9ecef', 
        borderRadius: '8px', 
        padding: '24px',
        marginBottom: '32px' 
      }}>
        <h3>使用说明</h3>
        
        <h4>基本用法</h4>
        <p>Menu组件支持四种模式：vertical（垂直）、horizontal（水平）、inline-flex（内联）、inline-block（内联块）。</p>
        
        <h4>触发方式</h4>
        <ul style={{ lineHeight: '1.8' }}>
          <li><strong>click</strong>：点击触发子菜单</li>
        </ul>



        <h4>模式特点</h4>
        <ul style={{ lineHeight: '1.8' }}>
          <li><strong>vertical</strong>：垂直菜单，适合侧边栏导航，支持折叠模式</li>
          <li><strong>horizontal</strong>：水平菜单，适合顶部导航</li>
          <li><strong>inline-flex</strong>：内联菜单，水平排列，右侧弹出子菜单</li>
          <li><strong>inline-block</strong>：内联块菜单，水平排列，垂直展开子菜单</li>
        </ul>

        <h4>折叠模式特性</h4>
        <ul style={{ lineHeight: '1.8' }}>
          <li><strong>图标优先</strong>：有图标的菜单项显示图标，无图标的显示首字符</li>
          <li><strong>悬停提示</strong>：鼠标悬停时显示完整标签的tooltip</li>
          <li><strong>子菜单隐藏</strong>：折叠模式下隐藏子菜单，点击只触发选中事件</li>
          <li><strong>平滑过渡</strong>：折叠/展开时有平滑的宽度过渡动画</li>
        </ul>

        <h4>代码示例</h4>
        <SyntaxHighlighter language="tsx" style={vscDarkPlus} customStyle={{ borderRadius: '6px', margin: '0', fontSize: '14px', fontFamily: 'monospace' }}>
{`// 垂直菜单
<Menu 
  mode="vertical" 
  items={menuItems} 
  onChange={(info, key) => console.log('菜单项点击:', info, key)} 
/>

// 垂直菜单折叠模式
<Menu 
  mode="vertical" 
  items={menuItems} 
  collapsed={true}
  onChange={(info, key) => console.log('菜单项点击:', info, key)} 
/>

// 水平菜单
<Menu 
  mode="horizontal" 
  items={menuItems} 
  onChange={(info, key) => console.log('菜单项点击:', info, key)} 
/>

// 内联菜单
<Menu 
  mode="inline-flex" 
  items={menuItems} 
  onChange={(info, key) => console.log('菜单项点击:', info, key)} 
/>

// inline-block模式
<Menu 
  mode="inline-block" 
  items={menuItems} 
  onChange={(info, key) => console.log('菜单项点击:', info, key)} 
/>`}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};

export default MenuExample;