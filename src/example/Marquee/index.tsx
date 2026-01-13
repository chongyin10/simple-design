import React from 'react';
import Marquee from '../../components/Marquee';
import { Table, useI18n } from '../../components';
import type { Column } from '../../components/Table';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

const MarqueeExample: React.FC = () => {
    const { t } = useI18n();
    // API参数列配置
    const apiColumns: Column[] = [
        { dataIndex: 'param', title: t('PARAM_NAME'), width: '150px' },
        { dataIndex: 'type', title: t('TYPE'), width: '250px' },
        { dataIndex: 'default', title: t('DEFAULT_VALUE'), width: '200px' },
        { dataIndex: 'description', title: t('DESCRIPTION'), width: '300px' }
    ];

    // API参数数据源
    const apiDataSource = [
        { param: 'announcement', type: 'string | string[]', default: '-', description: t('ANNOUNCEMENT_TEXT') },
        { param: 'height', type: 'number', default: '40', description: t('ANNOUNCEMENT_HEIGHT') },
        { param: 'speed', type: 'number', default: '50', description: t('SCROLL_SPEED') },
        { param: 'backgroundColor', type: 'string', default: 'linear-gradient(to right, #e8eaf6 0%, #f5f5f5 50%, #e8eaf6 100%)', description: t('ANNOUNCEMENT_BACKGROUND') },
        { param: 'visible', type: 'boolean', default: 'true', description: t('DISPLAY_ANNOUNCEMENT') },
        { param: 'fixed', type: 'boolean', default: 'false', description: t('FIXED_POSITION') },
        { param: 'fixedTop', type: 'number', default: '0', description: t('FIXED_DISTANCE') },
        { param: 'isIcon', type: 'boolean', default: 'true', description: t('DISPLAY_ICON') },
        { param: 'onClose', type: '() => void', default: '-', description: t('CLOSE_BUTTON_CALLBACK') }
    ];

    return (
        <div style={{ padding: '20px' }}>
            <h2>{t('MARQUEE_COMPONENT')}</h2>
            <p>{t('MARQUEE_DESCRIPTION')}</p>

            <div style={{ marginBottom: '40px' }}>
                <h3>{t('DEFAULT_CONFIGURATION')}</h3>
                <p>{t('DEFAULT_CONFIG_DESC')}</p>
                <Marquee announcement={t('DEFAULT_ANNOUNCEMENT')} />
            </div>

            <div style={{ marginBottom: '40px' }}>
                <h3>{t('CUSTOM_HEIGHT')}</h3>
                <p>{t('HEIGHT_60PX')}</p>
                <Marquee
                    announcement={t('CUSTOM_HEIGHT_ANNOUNCEMENT')}
                    height={60}
                />
            </div>

            <div style={{ marginBottom: '40px' }}>
                <h3>{t('CUSTOM_SPEED')}</h3>
                <p>{t('SLOW_SPEED')}</p>
                <Marquee
                    announcement={t('SLOW_SPEED_ANNOUNCEMENT')}
                    speed={20}
                />

                <p style={{ marginTop: '20px' }}>{t('FAST_SPEED')}</p>
                <Marquee
                    announcement={t('FAST_SPEED_ANNOUNCEMENT')}
                    speed={100}
                />
            </div>

            <div style={{ marginBottom: '40px' }}>
                <h3>{t('CUSTOM_BACKGROUND')}</h3>
                <p>{t('CUSTOM_GRADIENT_BACKGROUND')}</p>
                <Marquee
                    announcement={[t('GRADIENT_BACKGROUND_ANNOUNCEMENT_1'), t('GRADIENT_BACKGROUND_ANNOUNCEMENT_2')]}
                    backgroundColor="linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)"
                />
            </div>

            <div style={{ marginBottom: '40px' }}>
                <h3>{t('COMPREHENSIVE_CUSTOM')}</h3>
                <p>{t('COMPREHENSIVE_CUSTOM_DESC')}</p>
                <Marquee
                    announcement={t('COMPREHENSIVE_ANNOUNCEMENT')}
                    height={50}
                    speed={75}
                    backgroundColor="linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)"
                />
            </div>

            <div style={{ marginBottom: '40px' }}>
                <h3>{t('FIXED_TOP')}</h3>
                <p>{t('FIXED_TOP_DESC')}</p>
                <Marquee
                    announcement={t('FIXED_TOP_ANNOUNCEMENT')}
                    fixed={true}
                />
            </div>

            <div style={{ marginBottom: '40px' }}>
                <h3>{t('CLOSE_CALLBACK')}</h3>
                <p>{t('CLOSE_CALLBACK_DESC')}</p>
                <Marquee
                    announcement={t('CLOSE_CALLBACK_ANNOUNCEMENT')}
                    onClose={() => alert(t('ANNOUNCEMENT_CLOSED'))}
                />
            </div>

            <div style={{ marginBottom: '40px' }}>
                <h3>{t('FULL_FUNCTIONALITY')}</h3>
                <p>{t('FULL_FUNCTIONALITY_DESC')}</p>
                <Marquee
                    announcement={t('FULL_FUNCTIONALITY_ANNOUNCEMENT')}
                    height={50}
                    speed={60}
                    fixed={true}
                    fixedTop={60}
                    backgroundColor="linear-gradient(to right, #e8eaf6 0%, #f5f5f5 50%, #e8eaf6 100%)"
                    onClose={() => console.log(t('ANNOUNCEMENT_CLOSED'))}
                />
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
{`import { Marquee } from '@zjpcy/simple-design';

// 基本用法
<Marquee announcement="这是一条公告信息" />

// 数组形式的公告
<Marquee
  announcement={[
    "第一条公告",
    "第二条公告",
    "第三条公告"
  ]}
/>

// 自定义高度和速度
<Marquee
  announcement="自定义高度和速度"
  height={60}
  speed={80}
/>

// 自定义背景色
<Marquee
  announcement="自定义背景色"
  backgroundColor="#f5f5f5"
/>

// 渐变背景
<Marquee
  announcement="渐变背景"
  backgroundColor="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
/>

// 固定在顶部
<Marquee
  announcement="固定在顶部"
  fixed={true}
  fixedTop={0}
/>

// 不显示图标
<Marquee
  announcement="不显示图标的公告"
  isIcon={false}
/>

// 带关闭回调
<Marquee
  announcement="带关闭回调的公告"
  onClose={() => {
    console.log('公告已关闭');
  }}
/>

// 综合配置
<Marquee
  announcement={["第一条综合配置", "第二条综合配置"]}
  height={50}
  speed={60}
  backgroundColor="linear-gradient(to right, #e8eaf6 0%, #f5f5f5 50%, #e8eaf6 100%)"
  fixed={true}
  fixedTop={60}
  onClose={() => console.log('关闭回调')}
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
import Marquee from '@zjpcy/simple-design/lib/Marquee';
import '@zjpcy/simple-design/lib/Marquee/index.css';

// 方式二：批量引入
import { Marquee } from '@zjpcy/simple-design';
import '@zjpcy/simple-design/lib/index.css';`}
                    </SyntaxHighlighter>
                </div>
            </div>
        </div>
    );
};

export default MarqueeExample;