import React, { useState, useEffect, useCallback } from 'react';
import { Navigation } from '../components';
import ButtonExample from './Button';
import NoticeExample from './Notice';
import MarqueeExample from './Marquee';
import TableExample from './Table';
import TopExample from './Top';
import IconExample from './Icon';
import DividerExample from './Divider';
import InputExample from './Input';
import NotificationExample from './Notification/index';
import ModalExample from './Modal';
import ColorPickerExample from './ColorPicker';
import CopyToClipboardExample from './CopyToClipboard';
import MessageExample from './Message';
import FlexExample from './Flex';
import VariablesExample from './Variables';
import RadioExample from './Radio';
import SelectExample from './Select';
import EmptyExample from './Empty';
import TypographyExample from './Typography';
import I18nExample from './I18n';
import MasonryExample from './Masonry';
import SpaceExample from './Space';
import AnchorExample from './Anchor';
import BreadcrumbExample from './Breadcrumb';
import DropdownExample from './Dropdown';
import MenuExample from './Menu';
import PaginationExample from './Pagination';
import NavigationExample from './Navigation';
import StepsExample from './Steps';
import SwitchExample from './Switch';
import TabsExample from './Tabs';
import CascaderExample from './Cascader';
import RateExample from './Rate';
import SliderExample from './Slider';
import { MessageProvider } from '../components/Message';
import '../components/variables.css';
import './App.css';

interface ComponentItem {
    key: string;
    name: string;
    description?: string;
}

const App: React.FC = () => {
    // 导航菜单项定义
    const navigationItems = [
        { key: 'intro', name: '简介', description: 'IDP Design 组件库介绍', icon: '📖' },
        { key: 'install', name: '安装', description: '如何安装和引用', icon: '📦' },
        { key: 'button', name: 'Button', description: '按钮组件', icon: '🔘' },
        { key: 'colorpicker', name: 'ColorPicker', description: '颜色选择器组件', icon: '🎨' },
        { key: 'copytoclipboard', name: 'CopyToClipboard', description: '剪贴板复制组件', icon: '📋' },
        { key: 'divider', name: 'Divider', description: '分割线组件', icon: '➖' },
        { key: 'empty', name: 'Empty', description: '空状态组件', icon: '📭' },
        { key: 'flex', name: 'Flex', description: 'Flex布局组件', icon: '🧱' },
        { key: 'icon', name: 'Icon', description: '图标组件', icon: '🖼️' },
        { key: 'input', name: 'Input', description: '输入框组件', icon: '🔤' },
        { key: 'i18n', name: 'I18n', description: '国际化组件', icon: '🌐' },
        { key: 'marquee', name: 'Marquee', description: '跑马灯组件', icon: '📜' },
        { key: 'message', name: 'Message', description: '消息提示组件', icon: '💬' },
        { key: 'modal', name: 'Modal', description: '弹窗组件', icon: '🪟' },
        { key: 'notice', name: 'Notice', description: '公告栏组件', icon: '📢' },
        { key: 'notification', name: 'Notification', description: '通知组件', icon: '🔔' },
        { key: 'radio', name: 'Radio', description: '单选框组件', icon: '🔘' },
        { key: 'select', name: 'Select', description: '选择器组件', icon: '🔽' },
        { key: 'slider', name: 'Slider', description: '滑动条组件', icon: '🎚️' },
        { key: 'table', name: 'Table', description: '表格组件', icon: '📊' },
        { key: 'top', name: 'Top', description: '回到顶部组件', icon: '⬆️' },
        { key: 'typography', name: 'Typography', description: '排版组件', icon: '📝' },
        { key: 'variables', name: 'Variables', description: '自定义组件库主题颜色', icon: '🎨' },
        { key: 'masonry', name: 'Masonry', description: '瀑布流布局组件', icon: '🗂️' },
        { key: 'space', name: 'Space', description: '组件间距设置', icon: '⚫' },
        { key: 'anchor', name: 'Anchor', description: '锚点导航组件', icon: '🔗' },
        { key: 'breadcrumb', name: 'Breadcrumb', description: '面包屑组件', icon: '📁' },
        { key: 'cascader', name: 'Cascader', description: '级联选择器组件', icon: '🔀' },
        { key: 'dropdown', name: 'Dropdown', description: '下拉菜单组件', icon: '🔽' },
        { key: 'menu', name: 'Menu', description: '菜单组件', icon: '🍽️' },
        { key: 'pagination', name: 'Pagination', description: '分页器组件', icon: '📄' },
        { key: 'navigation', name: 'Navigation', description: '导航组件', icon: '🧭' },
    { key: 'rate', name: 'Rate', description: '评分组件', icon: '⭐' },
    { key: 'steps', name: 'Steps', description: '步骤条组件', icon: '📋' },
    { key: 'switch', name: 'Switch', description: '开关组件', icon: '🔛' },
    { key: 'tabs', name: 'Tabs', description: '选项卡组件', icon: '🗂️' },
    { key: 'api', name: 'API 参考', description: '所有组件的 API 文档', icon: '📋' },
    ];

    // 从URL中获取初始选中的组件ID
    const getInitialComponentId = () => {
        const hash = window.location.hash;
        if (hash.startsWith('#/')) {
            const id = hash.slice(2);
            return navigationItems.some(item => item.key === id) ? id : 'button';
        }
        return 'button';
    };

    const [selectedComponent, setSelectedComponent] = useState<string>(getInitialComponentId());
    const [navigationCollapsed, setNavigationCollapsed] = useState(false);

    const components: ComponentItem[] = [
        { key: 'button', name: 'Button', description: '按钮组件' },
        { key: 'colorpicker', name: 'ColorPicker', description: '颜色选择器组件' },
        { key: 'copytoclipboard', name: 'CopyToClipboard', description: '剪贴板复制组件' },
        { key: 'divider', name: 'Divider', description: '分割线组件' },
        { key: 'cascader', name: 'Cascader', description: '级联选择器组件' },
        { key: 'dropdown', name: 'Dropdown', description: '下拉菜单组件' },
        { key: 'menu', name: 'Menu', description: '菜单组件' },
        { key: 'pagination', name: 'Pagination', description: '分页器组件' },
        { key: 'navigation', name: 'Navigation', description: '导航组件' },
    { key: 'rate', name: 'Rate', description: '评分组件' },
    { key: 'steps', name: 'Steps', description: '步骤条组件' },
    { key: 'switch', name: 'Switch', description: '开关组件' },
    { key: 'tabs', name: 'Tabs', description: '选项卡组件' },
    { key: 'empty', name: 'Empty', description: '空状态组件' },
        { key: 'flex', name: 'Flex', description: 'Flex布局组件' },
        { key: 'input', name: 'Input', description: '输入框组件' },
        { key: 'marquee', name: 'Marquee', description: '跑马灯组件' },
        { key: 'message', name: 'Message', description: '消息提示组件' },
        { key: 'modal', name: 'Modal', description: '弹窗组件' },
        { key: 'notice', name: 'Notice', description: '公告栏组件' },
        { key: 'notification', name: 'Notification', description: '通知组件' },
        { key: 'radio', name: 'Radio', description: '单选框组件' },
        { key: 'select', name: 'Select', description: '选择器组件' },
        { key: 'slider', name: 'Slider', description: '滑动条组件' },
        { key: 'table', name: 'Table', description: '表格组件' },
        { key: 'top', name: 'Top', description: '回到顶部组件' },
        { key: 'typography', name: 'Typography', description: '排版组件' },
        { key: 'variables', name: 'Variables', description: '自定义组件库主题颜色' },
    ];

    // 监听URL变化，更新选中的组件
    useEffect(() => {
        const handleHashChange = () => {
            const hash = window.location.hash;
            if (hash.startsWith('#/')) {
                const id = hash.slice(2);
                if (navigationItems.some(item => item.key === id)) {
                    setSelectedComponent(id);
                }
            }
        };

        // 监听hash变化事件
        window.addEventListener('hashchange', handleHashChange);

        // 清理函数
        return () => {
            window.removeEventListener('hashchange', handleHashChange);
        };
    }, []);

    // 处理导航项点击
    const handleNavigationItemClick = useCallback((_: any, key: string) => {
        setSelectedComponent(key);
        window.location.hash = `#/${key}`;
    }, []);

    // 处理导航收缩状态变化
    const handleNavigationCollapseChange = useCallback((collapsed: boolean) => {
        setNavigationCollapsed(collapsed);
    }, []);

    const renderContent = () => {
        switch (selectedComponent) {
            case 'intro':
                return (
                    <div className="content-section">
                        <h2 className="section-title">1. 简介</h2>
                        <p className="section-text">IDP Design 是一个基于 React 的现代化 UI 组件库，提供了一系列简洁、美观、易用的组件，适用于各种 Web 应用开发。</p>
                    </div>
                );
            case 'install':
                return (
                    <div className="content-section">
                        <h2 className="section-title">2. 安装</h2>
                        <p className="section-text">IDP Design 组件库支持多种安装方式，您可以根据实际需求选择适合的安装方法。</p>
                        
                        <h3 className="subsection-title">2.1 从本地文件安装</h3>
                        <p className="section-text">如果您已经获取了 IDP Design 组件库的本地文件，可以通过以下方式安装：</p>
                        
                        <h4 className="subsubsection-title">2.1.1 使用 npm 从本地目录安装</h4>
                        <p className="section-text">将本地组件库目录作为依赖安装到您的项目中：</p>
                        <div className="code-block">
                            npm install /path/to/idp-design
                        </div>
                        
                        <h4 className="subsubsection-title">2.1.2 使用 yarn 从本地目录安装</h4>
                        <p className="section-text">将本地组件库目录作为依赖安装到您的项目中：</p>
                        <div className="code-block">
                            yarn add /path/to/idp-design
                        </div>
                        <p className="section-text">其中 <code>/path/to/idp-design</code> 是您本地 IDP Design 组件库的绝对路径。</p>
                        
                        <h3 className="subsection-title">2.2 从 Git 仓库安装</h3>
                        <p className="section-text">您可以直接从 Git 仓库安装 IDP Design 组件库，支持指定分支或标签：</p>
                        
                        <h4 className="subsubsection-title">2.2.1 安装主分支最新版本</h4>
                        <div className="code-block">
                            npm install git+https://github.com/your-repo/idp-design.git
                        </div>
                        <div className="code-block">
                            yarn add git+https://github.com/your-repo/idp-design.git
                        </div>
                        
                        <h4 className="subsubsection-title">2.2.2 安装指定分支</h4>
                        <div className="code-block">
                            npm install git+https://github.com/your-repo/idp-design.git#branch-name
                        </div>
                        <div className="code-block">
                            yarn add git+https://github.com/your-repo/idp-design.git#branch-name
                        </div>
                        <p className="section-text">将 <code>branch-name</code> 替换为您想要安装的分支名称，例如 <code>dev</code> 或 <code>feature/new-component</code>。</p>
                        
                        <h4 className="subsubsection-title">2.2.3 安装指定标签版本</h4>
                        <div className="code-block">
                            npm install git+https://github.com/your-repo/idp-design.git#v1.0.0
                        </div>
                        <div className="code-block">
                            yarn add git+https://github.com/your-repo/idp-design.git#v1.0.0
                        </div>
                        <p className="section-text">将 <code>v1.0.0</code> 替换为您想要安装的具体版本标签。</p>
                        
                        <h3 className="subsection-title">2.3 更新依赖</h3>
                        <p className="section-text">当 IDP Design 组件库有新版本发布时，您可以通过以下方式更新依赖：</p>
                        
                        <h4 className="subsubsection-title">2.3.1 更新本地安装的依赖</h4>
                        <div className="code-block">
                            npm update idp-design
                        </div>
                        <div className="code-block">
                            yarn upgrade idp-design
                        </div>
                        
                        <h4 className="subsubsection-title">2.3.2 重新安装本地文件依赖</h4>
                        <p className="section-text">如果您使用本地文件安装方式，需要重新安装以获取最新版本：</p>
                        <div className="code-block">
                            npm install /path/to/idp-design --force
                        </div>
                        <div className="code-block">
                            yarn add /path/to/idp-design --force
                        </div>
                        <p className="section-text">使用 <code>--force</code> 参数强制重新安装，确保获取最新的本地文件。</p>
                        
                        <h4 className="subsubsection-title">2.3.3 更新 Git 仓库依赖</h4>
                        <p className="section-text">如果您使用 Git 仓库安装方式，可以通过以下命令更新：</p>
                        <div className="code-block">
                            npm install git+https://github.com/your-repo/idp-design.git#branch-name --force
                        </div>
                        <div className="code-block">
                            yarn add git+https://github.com/your-repo/idp-design.git#branch-name --force
                        </div>
                        <p className="section-text">或者先卸载再重新安装：</p>
                        <div className="code-block">
                            npm uninstall idp-design
npm install git+https://github.com/your-repo/idp-design.git#branch-name
                        </div>
                        <div className="code-block">
                            yarn remove idp-design
yarn add git+https://github.com/your-repo/idp-design.git#branch-name
                        </div>
                    </div>
                );
            case 'button':
                return <ButtonExample />;
            case 'flex':
                return <FlexExample />;
            case 'notice':
                return <NoticeExample />;
            case 'marquee':
                return <MarqueeExample />;
            case 'table':
                return <TableExample />;
            case 'top':
                return <TopExample />;
            case 'icon':
                return <IconExample />;
            case 'divider':
                return <DividerExample />;
            case 'input':
                return <InputExample />;
            case 'i18n':
                return <I18nExample />;
            case 'radio':
                return <RadioExample />;
            case 'select':
                return <SelectExample />;
            case 'slider':
                return <SliderExample />;
            case 'modal':
                return <ModalExample />;
            case 'notification':
                return <NotificationExample />;
            case 'colorpicker':
                return <ColorPickerExample />;
            case 'copytoclipboard':
                return <CopyToClipboardExample />;
            case 'message':
                return <MessageExample />;
            case 'empty':
                return <EmptyExample />;
            case 'typography':
                return <TypographyExample />;
            case 'variables':
                return <VariablesExample />;
            case 'masonry':
                return <MasonryExample />;
            case 'space':
                return <SpaceExample />;
            case 'anchor':
                return <AnchorExample />;
            case 'breadcrumb':
                return <BreadcrumbExample />;
            case 'cascader':
                return <CascaderExample />;
            case 'dropdown':
                return <DropdownExample />;
            case 'menu':
                return <MenuExample />;
            case 'pagination':
                return <PaginationExample />;
            case 'navigation':
                return <NavigationExample />;
            case 'steps':
                return <StepsExample />;
            case 'switch':
                return <SwitchExample />;
            case 'tabs':
                return <TabsExample />;
            case 'rate':
                return <RateExample />;
            default:
                return <ButtonExample />;
        }
    };

    return (
        <MessageProvider>
            <div className="app-container">
                {/* 使用新的Navigation组件 */}
                <Navigation
                    items={navigationItems}
                    selectedKey={selectedComponent}
                    collapsed={navigationCollapsed}
                    onChange={handleNavigationItemClick}
                    onCollapseChange={handleNavigationCollapseChange}
                    width={360}
                    collapsedWidth={48}
                    animationDuration={300}
                />

                {/* 右侧内容区域 */}
                <div className="content-area">
                    {/* 内容头部 */}
                    <div className="content-header">
                        <h1 className="content-title">
                            {components.find(c => c.key === selectedComponent)?.name || 'API 参考'}
                        </h1>
                        <p className="content-subtitle">
                            {components.find(c => c.key === selectedComponent)?.description || '查看组件 API 文档'}
                        </p>
                    </div>

                    {/* 内容主体 */}
                    <div className="content-main">
                        {renderContent()}
                    </div>
                </div>
            </div>
        </MessageProvider>
    );
};

export default App;