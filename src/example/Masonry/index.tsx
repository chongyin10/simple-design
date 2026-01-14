import React, { useState } from 'react';
import { Masonry, Table, Input, Button } from '../../components';
import { MasonryItem } from '../../components/Masonry/types';
import type { Column } from '../../components/Table';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

// Generate random height for demonstration
const getRandomHeight = (min: number = 100, max: number = 300): number => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Generate sample items
const generateItems = (count: number): MasonryItem[] => {
    return Array.from({ length: count }, (_, index) => ({
        key: `item-${index}`,
        content: (
            <div
                style={{
                    height: `${getRandomHeight()}px`,
                    backgroundColor: `hsl(${index * 137.5}, 70%, 60%)`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '20px',
                    fontWeight: 'bold'
                }}
            >
                Item {index + 1}
            </div>
        )
    }));
};

const MasonryExample: React.FC = () => {
    const [items, setItems] = useState<MasonryItem[]>(generateItems(20));
    const [loading, setLoading] = useState(false);

    // Responsive configuration
    const [columnsConfig, setColumnsConfig] = useState<number | { [key: number]: number }>({
        0: 1,
        600: 2,
        900: 3,
        1200: 4
    });

    const [gutterConfig, setGutterConfig] = useState<number | { [key: number]: number }>({
        0: 10,
        600: 15,
        900: 20,
        1200: 25
    });

    // Input values for columns and gutter
    const [columnsInput, setColumnsInput] = useState<string>('3');
    const [gutterInput, setGutterInput] = useState<string>('20');

    // Load more items
    const handleLoadMore = () => {
        setLoading(true);
        setTimeout(() => {
            setItems(prev => [...prev, ...generateItems(10)]);
            setLoading(false);
        }, 1000);
    };

    // Update columns and gutter from input
    const handleUpdateLayout = () => {
        const columns = parseInt(columnsInput, 10);
        const gutter = parseInt(gutterInput, 10);

        if (!isNaN(columns) && columns > 0) {
            setColumnsConfig(columns);
        }

        if (!isNaN(gutter) && gutter >= 0) {
            setGutterConfig(gutter);
        }
    };

    // API参数列配置
    const apiColumns: Column[] = [
        { dataIndex: 'param', title: '参数名', width: '150px' },
        { dataIndex: 'type', title: '类型', width: '300px' },
        { dataIndex: 'default', title: '默认值', width: '150px' },
        { dataIndex: 'description', title: '描述', width: '300px' }
    ];

    // API参数数据源
    const apiDataSource = [
        { param: 'items', type: 'MasonryItem[]', default: '-', description: '瀑布流项目数组' },
        { param: 'columns', type: 'number | { [key: number]: number }', default: '3', description: '列数，支持响应式配置' },
        { param: 'gutter', type: 'number | { [key: number]: number }', default: '20', description: '间距，支持响应式配置' },
        { param: 'className', type: 'string', default: '-', description: '容器自定义 CSS 类名' },
        { param: 'style', type: 'React.CSSProperties', default: '-', description: '容器自定义内联样式' },
        { param: 'classNames', type: '{ container?: string | ((index: number) => string); column?: string | ((index: number) => string); item?: string | ((index: number) => string); }', default: '{}', description: '语义化结构自定义类名' },
        { param: 'styles', type: '{ container?: React.CSSProperties | ((index: number) => React.CSSProperties); column?: React.CSSProperties | ((index: number) => React.CSSProperties); item?: React.CSSProperties | ((index: number) => React.CSSProperties); }', default: '{}', description: '语义化结构自定义样式' },
        { param: 'onLayoutChange', type: '(columns: number, items: MasonryItem[]) => void', default: '-', description: '布局变化回调' }
    ];

    return (
        <div style={{ padding: '20px' }}>
            <h2>Masonry 组件</h2>
            <p>瀑布流布局组件，用于展示不同高度的内容，规则展示不规则高度的图片或卡片。</p>

            {/* 基本使用示例 */}
            <div style={{ marginBottom: '40px' }}>
                <h3>基本使用</h3>
                <p>通过 columns 设置列数，gutter 设置间距。</p>

                <div style={{ marginBottom: '20px', display: 'flex', gap: '15px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
            <label style={{ fontSize: '14px', fontWeight: '500' }}>列数</label>
            <Input.Number
              nType="positive-integer"
              value={columnsInput}
              onChange={(e) => setColumnsInput(e.target.value)}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
            <label style={{ fontSize: '14px', fontWeight: '500' }}>间距</label>
            <Input.Number
              nType="positive-integer"
              value={gutterInput}
              onChange={(e) => setGutterInput(e.target.value)}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', height: '100%', paddingTop: '22px' }}>
            <Button
              onClick={handleUpdateLayout}
              variant="primary"
              size="medium"
            >
              确认更新
            </Button>
          </div>
        </div>

                <div style={{ marginBottom: '30px', padding: '10px', border: '1px solid #eee', borderRadius: '8px' }}>
                    <Masonry
                        items={items.slice(0, 12)}
                        columns={columnsConfig}
                        gutter={gutterConfig}
                    />
                </div>
            </div>

            {/* 响应式配置示例 */}
            <div style={{ marginBottom: '40px' }}>
                <h3>响应式配置</h3>
                <p>使用响应式参数来适配不同屏幕宽度。</p>

                <div style={{ marginBottom: '30px', padding: '10px', border: '1px solid #eee', borderRadius: '8px' }}>
                    <Masonry
                        items={items.slice(0, 15)}
                        columns={columnsConfig}
                        gutter={gutterConfig}
                    />
                </div>

                <div style={{ marginBottom: '20px' }}>
                    <h4>响应式配置说明</h4>
                    <ul>
                        <li>屏幕宽度 &lt; 600px: 1列，间距10px</li>
                        <li>屏幕宽度 &ge; 600px: 2列，间距15px</li>
                        <li>屏幕宽度 &ge; 900px: 3列，间距20px</li>
                        <li>屏幕宽度 &ge; 1200px: 4列，间距25px</li>
                    </ul>
                </div>
            </div>

            {/* 动态更新示例 */}
            <div style={{ marginBottom: '40px' }}>
                <h3>动态更新</h3>
                <p>展示瀑布流动态更新的效果，配合 item.column 固化位置。</p>

                <div style={{ marginBottom: '20px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <Button
            onClick={handleLoadMore}
            variant="success"
            size="medium"
            disabled={loading}
            loading={loading}
          >
            {loading ? 'Loading...' : 'Load More'}
          </Button>
        </div>

                <div style={{ marginBottom: '30px', padding: '10px', border: '1px solid #eee', borderRadius: '8px' }}>
                    <Masonry
                        items={items}
                        columns={columnsConfig}
                        gutter={gutterConfig}
                    />
                </div>
            </div>

            {/* 自定义样式示例 */}
            <div style={{ marginBottom: '40px' }}>
                <h3>自定义样式</h3>
                <p>通过 classNames 和 styles 传入对象/函数自定义语义化结构样式。</p>

                <div style={{ marginBottom: '30px', padding: '10px', border: '1px solid #eee', borderRadius: '8px' }}>
                    <Masonry
                        items={items.slice(0, 10)}
                        columns={2}
                        gutter={15}
                        classNames={{
                            container: 'custom-container',
                            column: (columnIndex) => `custom-column-${columnIndex}`,
                            item: (itemIndex) => `custom-item-${itemIndex}`
                        }}
                        styles={{
                            container: { padding: '15px' },
                            column: (columnIndex) => ({
                                backgroundColor: columnIndex % 2 === 0 ? 'rgba(240, 240, 240, 0.5)' : 'rgba(255, 255, 255, 0.5)'
                            }),
                            item: (itemIndex) => ({
                                borderRadius: itemIndex % 2 === 0 ? '8px' : '12px'
                            })
                        }}
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
                    {`import { Masonry } from '@zjpcy/simple-design';

// 基本用法
<Masonry items={items} columns={3} gutter={20} />

// 响应式配置
<Masonry 
  items={items} 
  columns={{ 0: 1, 600: 2, 900: 3, 1200: 4 }} 
  gutter={{ 0: 10, 600: 15, 900: 20, 1200: 25 }} 
/>

// 固定位置
<Masonry 
  items={[
    ...items,
    { key: 'fixed', column: 1, content: <div style={{ height: '100px', backgroundColor: 'green' }} /> }
  ]} 
/>

// 自定义样式
<Masonry 
  items={items}
  classNames={{
    container: 'my-container',
    column: (columnIndex) => \`my-column-\${columnIndex}\`,
    item: (itemIndex) => \`my-item-\${itemIndex}\`
  }}
  styles={{
    container: { padding: '10px' },
    column: (columnIndex) => ({ backgroundColor: columnIndex % 2 ? '#f0f0f0' : '#fff' }),
    item: (itemIndex) => ({ borderRadius: itemIndex % 2 ? '8px' : '12px' })
  }}
/>`}
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
import Masonry from '@zjpcy/simple-design/lib/Masonry';
import '@zjpcy/simple-design/lib/Masonry/Masonry.css';

// 方式二：批量引入
import { Masonry } from '@zjpcy/simple-design';
import '@zjpcy/simple-design/lib/index.css';`}
                    </SyntaxHighlighter>
                </div>
            </div>
        </div>
    );
};

export default MasonryExample;
