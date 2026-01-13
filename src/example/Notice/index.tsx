import React, { useState } from 'react';
import { Notice, Button, Table, useI18n } from '../../components';
import type { Column } from '../../components/Table';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import './index.css';

const NoticeExample: React.FC = () => {
    const { t } = useI18n();
    const [showNotice, setShowNotice] = useState(true);
    const [noticeText, setNoticeText] = useState('I can be a React component, multiple React components, or just some text.');
    const [noticeSpeed, setNoticeSpeed] = useState(50);
    const [noticeHeight, setNoticeHeight] = useState(60);
    const [showCloseButton, setShowCloseButton] = useState(false);
    const [floatingTop, setFloatingTop] = useState(false);

    const toggleNotice = () => {
        setShowNotice(!showNotice);
    };

    const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNoticeText(e.target.value);
    };

    const handleSpeedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNoticeSpeed(Number(e.target.value));
    };
    
    const handleHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNoticeHeight(Number(e.target.value));
    };
    
    const handleShowCloseButtonChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setShowCloseButton(e.target.checked);
    };
    
    const handleFloatingTopChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFloatingTop(e.target.checked);
    };

    // API参数列配置
    const apiColumns: Column[] = [
        { dataIndex: 'param', title: t('PARAM_NAME'), width: '150px' },
        { dataIndex: 'type', title: t('TYPE'), width: '400px' },
        { dataIndex: 'default', title: t('DEFAULT_VALUE'), width: '150px' },
        { dataIndex: 'description', title: t('DESCRIPTION'), width: '300px' }
    ];

    // API参数数据源
    const apiDataSource = [
        { param: 'speed', type: 'number', default: '50', description: t('SPEED_DESC') },
        { param: 'height', type: 'number', default: '60', description: t('HEIGHT_DESC') },
        { param: 'styles', type: 'React.CSSProperties', default: '{}', description: t('STYLES_DESC') },
        { param: 'icon', type: 'React.ReactNode | null', default: 'null', description: t('ICON_NOTICE_DESC') },
        { param: 'showCloseButton', type: 'boolean', default: 'false', description: t('SHOW_CLOSE_BUTTON_DESC') },
        { param: 'closeStyle', type: 'React.CSSProperties', default: '{}', description: t('CLOSE_STYLE_DESC') },
        { param: 'floatingTop', type: 'boolean', default: 'false', description: t('FLOATING_TOP_DESC') },
        { param: 'pauseOnHover', type: 'boolean', default: 'true', description: t('PAUSE_ON_HOVER_DESC') }
    ];

    return (
        <div style={{ padding: '20px' }}>
            <h2>Notice {t('COMPONENT')}</h2>
            <p>{t('NOTICE_COMPONENT_DESC')}</p>
            
            <div style={{ marginBottom: '40px' }}>
                <h3>{t('BASIC_USAGE')}</h3>
                <div className="notice-container">
                    {showNotice ? <Notice text={noticeText} speed={noticeSpeed} height={noticeHeight} showCloseButton={showCloseButton} floatingTop={floatingTop} /> : <p>{t('NOTICE_HIDDEN')}</p>}
                </div>
                <div className="controls">
                    <Button onClick={toggleNotice} className="control-btn" variant="primary">
                        {showNotice ? t('HIDE_NOTICE') : t('SHOW_NOTICE')}
                    </Button>
                </div>
            </div>

            <div style={{ marginBottom: '40px' }}>
                <h3>{t('CUSTOM_CONFIGURATION')}</h3>
                <div className="config-controls">
                    <div className="control-group">
                        <label htmlFor="noticeText">{t('NOTICE_TEXT')}:</label>
                        <input
                            id="noticeText"
                            type="text"
                            value={noticeText}
                            onChange={handleTextChange}
                            placeholder={t('ENTER_NOTICE_TEXT')}
                        />
                    </div>
                    <div className="control-group">
                        <label htmlFor="noticeSpeed">{t('SCROLL_SPEED')}:</label>
                        <input
                            id="noticeSpeed"
                            type="range"
                            min="10"
                            max="100"
                            value={noticeSpeed}
                            onChange={handleSpeedChange}
                        />
                        <span className="speed-value">{noticeSpeed}</span>
                    </div>
                    <div className="control-group">
                        <label htmlFor="noticeHeight">{t('NOTICE_BAR_HEIGHT')}:</label>
                        <input
                            id="noticeHeight"
                            type="range"
                            min="30"
                            max="100"
                            value={noticeHeight}
                            onChange={handleHeightChange}
                        />
                        <span className="height-value">{noticeHeight}px</span>
                    </div>
                    <div className="control-group">
                        <label>
                            <input
                                type="checkbox"
                                checked={showCloseButton}
                                onChange={handleShowCloseButtonChange}
                            />
                            {t('SHOW_CLOSE_BUTTON')}
                        </label>
                    </div>
                    <div className="control-group">
                        <label>
                            <input
                                type="checkbox"
                                checked={floatingTop}
                                onChange={handleFloatingTopChange}
                            />
                            {t('FLOAT_TO_TOP')}
                        </label>
                    </div>
                </div>
            </div>

            <div style={{ marginBottom: '40px' }}>
                <h3>{t('FEATURES')}</h3>
                <ul>
                    <li>{t('SEAMLESS_SCROLL')}</li>
                    <li>{t('CONFIGURABLE_SPEED')}</li>
                    <li>{t('CUSTOM_NOTICE_TEXT')}</li>
                    <li>{t('CUSTOM_HEIGHT')}</li>
                    <li>{t('OPTIONAL_CLOSE_BUTTON')}</li>
                    <li>{t('FLOATING_TOP_FUNCTION')}</li>
                    <li>{t('TYPESCRIPT_SUPPORT')}</li>
                </ul>
            </div>

            <div style={{ marginBottom: '40px' }}>
                <h3>{t('USAGE_SCENARIOS')}</h3>
                <ul>
                    <li>{t('WEBSITE_ANNOUNCEMENT')}</li>
                    <li>{t('SYSTEM_NOTIFICATION')}</li>
                    <li>{t('PROMOTION_INFO')}</li>
                    <li>{t('IMPORTANT_REMINDER')}</li>
                </ul>
            </div>

            {/* API 文档 */}
            <div style={{ marginBottom: '40px', padding: '20px', background: '#fafafa', borderRadius: '8px' }}>
                <h3>{t('API_PARAMETERS')}</h3>
                <Table pagination={false} columns={apiColumns} dataSource={apiDataSource} />
            </div>

            {/* 代码示例 */}
            <div style={{ marginBottom: '40px' }}>
                <h3>{t('CODE_EXAMPLES')}</h3>
                <SyntaxHighlighter language="tsx" style={vscDarkPlus} customStyle={{ borderRadius: '6px', margin: '0', fontSize: '14px', fontFamily: 'monospace' }}>
{`import { Notice } from '@zjpcy/simple-design';

// 基本用法
<Notice text="这是一条公告信息" />

// 自定义速度和高度
<Notice
  text="自定义速度和高度的公告"
  speed={70}
  height={80}
/>

// 带图标的公告
<Notice
  text="带图标的公告"
  icon={<span>📢</span>}
/>

// 带关闭按钮
<Notice
  text="可关闭的公告"
  showCloseButton={true}
/>

// 固定在顶部
<Notice
  text="固定在顶部的公告"
  floatingTop={true}
/>

// 数组形式的文本
<Notice
  text={[
    "第一条公告信息",
    "第二条公告信息",
    "第三条公告信息"
  ]}
/>

// 自定义样式
<Notice
  text="自定义样式的公告"
  styles={{ backgroundColor: '#f0f0f0', color: '#333' }}
/>

// 带React元素的文本
<Notice
  text={
    <>
      这是一条带 <strong>加粗</strong> 和 <a href="#">链接</a> 的公告
    </>
  }
/>`}
                </SyntaxHighlighter>
            </div>

            {/* 在其他项目中引用示例 */}
            <div>
                <h3>{t('USAGE_IN_OTHER_PROJECTS')}</h3>
                <div style={{ margin: '15px 0' }}>
                    <h4>1. {t('INSTALLATION')}</h4>
                    <SyntaxHighlighter language="bash" style={vscDarkPlus} customStyle={{ borderRadius: '6px', margin: '0', fontSize: '14px', fontFamily: 'monospace' }}>
{`npm i @zjpcy/simple-design`}
                    </SyntaxHighlighter>
                </div>
                <div>
                    <h4>2. {t('REFERENCE_COMPONENT')}</h4>
                    <SyntaxHighlighter language="tsx" style={vscDarkPlus} customStyle={{ borderRadius: '6px', margin: '0', fontSize: '14px', fontFamily: 'monospace' }}>
{`// 方式一：单独引入
import Notice from '@zjpcy/simple-design/lib/Notice/Notice';
import '@zjpcy/simple-design/lib/Notice/Notice.css';

// 方式二：批量引入
import { Notice } from '@zjpcy/simple-design';
import '@zjpcy/simple-design/lib/index.css';`}
                    </SyntaxHighlighter>
                </div>
            </div>
        </div>
    );
};

export default NoticeExample;