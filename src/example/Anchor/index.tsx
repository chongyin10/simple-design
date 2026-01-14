import React, { useRef } from 'react';
import Anchor from '../../components/Anchor';
import { Table } from '../../components';
import type { Column } from '../../components/Table';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

const AnchorExample: React.FC = () => {

    const mainScrollContainerRef = useRef<HTMLDivElement>(null);
     const scrollContainerRef = useRef<HTMLDivElement>(null);
     const activeRef = useRef<HTMLDivElement>(null);
    // API参数列配置
    const apiColumns: Column[] = [
        { dataIndex: 'param', title: '参数名', width: '150px' },
        { dataIndex: 'type', title: '类型', width: '300px' },
        { dataIndex: 'default', title: '默认值', width: '150px' },
        { dataIndex: 'description', title: '描述', width: '300px' }
    ];

    // API参数数据源
    const apiDataSource = [
        { param: 'children', type: 'React.ReactNode', default: '-', description: '锚点链接列表' },
        { param: 'offsetTop', type: 'number', default: '0', description: '距离顶部的偏移量' },
        { param: 'affix', type: 'boolean', default: 'true', description: '是否固定定位' },
        { param: 'bounds', type: 'number', default: '5', description: '激活锚点的边界范围' },
        { param: 'getContainer', type: '() => HTMLElement', default: 'window.document.documentElement', description: '获取滚动容器' },
        { param: 'onChange', type: '(activeLink: string) => void', default: '-', description: '锚点切换时的回调函数' },
        { param: 'className', type: 'string', default: '-', description: '自定义 CSS 类名' },
        { param: 'style', type: 'React.CSSProperties', default: '-', description: '自定义内联样式' }
    ];

    // Link组件API参数数据源
    const linkApiDataSource = [
        { param: 'href', type: 'string', default: '-', description: '锚点链接' },
        { param: 'title', type: 'string', default: '-', description: '显示文本' },
        { param: 'children', type: 'React.ReactNode', default: '-', description: '子节点' },
        { param: 'className', type: 'string', default: '-', description: '自定义 CSS 类名' },
        { param: 'style', type: 'React.CSSProperties', default: '-', description: '自定义内联样式' }
    ];

    return (
        <div ref={activeRef} id="active-scroll-container" style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
            <h2>Anchor 锚点组件</h2>
            <p>用于在长页面中快速导航到指定位置的锚点组件。</p>

            {/* 基本使用示例 */}
      <div style={{ marginBottom: '40px' }}>
        <h3>基本使用</h3>
        <p>展示锚点组件的基本功能和使用方式。</p>
        
        <div ref={mainScrollContainerRef} id="main-scroll-container" style={{ height: '600px', overflow: 'auto', border: '1px solid #ccc', borderRadius: '4px', padding: '20px', position: 'relative' }}>
          {/* Anchor组件 - 跟随滚动，保持在可视范围内 */}
          <div style={{ width: '250px', backgroundColor: '#f5f5f5', padding: '10px', borderRadius: '4px', position: 'sticky', top: '20px', float: 'right', marginLeft: '20px', zIndex: 10 }}>
            <Anchor 
                getContainer={() => mainScrollContainerRef.current!}
                offsetTop={20} affix={false} 
                onChange={(href: string) => {
                  console.log('当前激活的锚点:', href);
                }}
              >
              <Anchor.Link href="#section1" title="第一章：介绍" />
              <Anchor.Link href="#section2" title="第二章：快速开始" />
              <Anchor.Link href="#section3" title="第三章：核心功能" />
              <Anchor.Link href="#section4" title="第四章：API 文档" />
              <Anchor.Link href="#section5" title="第五章：常见问题" />
            </Anchor>
          </div>
          
          <div style={{ overflow: 'hidden', position: 'relative' }}>
            {/* 内容区域 - 左侧 */}
            <div style={{ float: 'left', width: 'calc(100% - 20px)' }}>
            <section id="section1" style={{ height: '500px', padding: '20px', border: '1px solid #e8e8e8', borderRadius: '4px', marginBottom: '40px' }}>
              <h4>第一章：介绍</h4>
              <p>这是锚点组件的介绍部分。锚点组件用于在长页面中快速导航到指定位置。</p>
              <p>通过点击左侧的锚点链接，可以平滑滚动到对应的内容区域。</p>
              <p>组件支持固定定位、偏移量设置、滚动监听等功能。</p>
            </section>
            
            <section id="section2" style={{ height: '500px', padding: '20px', border: '1px solid #e8e8e8', borderRadius: '4px', marginBottom: '40px' }}>
              <h4>第二章：快速开始</h4>
              <p>这是快速开始部分。在使用锚点组件之前，需要先安装依赖并导入组件。</p>
              <p>锚点组件的使用非常简单，只需在Anchor组件内部添加Anchor.Link子组件即可。</p>
            </section>
            
            <section id="section3" style={{ height: '500px', padding: '20px', border: '1px solid #e8e8e8', borderRadius: '4px', marginBottom: '40px' }}>
              <h4>第三章：核心功能</h4>
              <h5>1. 平滑滚动</h5>
              <p>点击锚点链接时，页面会平滑滚动到对应的内容区域。</p>
              
              <h5>2. 固定定位</h5>
              <p>锚点组件默认固定在页面左侧，方便用户随时访问导航链接。</p>
              
              <h5>3. 激活状态</h5>
              <p>当前滚动到的内容区域对应的锚点链接会高亮显示。</p>
            </section>
            
            <section id="section4" style={{ height: '500px', padding: '20px', border: '1px solid #e8e8e8', borderRadius: '4px', marginBottom: '40px' }}>
              <h4>第四章：API 文档</h4>
              <p>详细的API文档说明请参考下方表格。</p>
            </section>
            
            <section id="section5" style={{ height: '500px', padding: '20px', border: '1px solid #e8e8e8', borderRadius: '4px', marginBottom: '40px' }}>
              <h4>第五章：常见问题</h4>
              <h5>Q: 如何修改锚点组件的样式？</h5>
              <p>A: 可以通过自定义 CSS 或者传入 style 属性来修改组件样式。</p>
              
              <h5>Q: 如何设置锚点的偏移量？</h5>
              <p>A: 可以通过设置 Anchor 组件的 offsetTop 属性来调整锚点的偏移量。</p>
              
              <h5>Q: 如何在滚动容器内使用锚点组件？</h5>
              <p>A: 可以通过 getContainer 属性指定滚动容器。</p>
            </section>
            </div>
          </div>
        </div>
      </div>
      
      {/* 自定义容器示例 */}
      <div style={{ marginBottom: '40px' }}>
        {/* 右浮动锚点示例 */}
        <h3>右浮动锚点</h3>
        <p>展示锚点组件右浮动的效果。</p>
        
        <div ref={scrollContainerRef} id="scroll-container-right" style={{ height: '400px', overflow: 'auto', border: '1px solid #ccc', borderRadius: '4px', padding: '20px' }}>
          <div style={{ overflow: 'hidden' }}>
            {/* 内容区域 - 左侧 */}
            <div style={{ float: 'left', width: 'calc(100% - 270px)' }}>
              <section id="custom-right-section1" style={{ height: '400px', padding: '15px', borderBottom: '1px solid #eee' }}>
                <h4>右浮动示例区域1</h4>
                <p>这是右浮动锚点组件的第一个示例区域。</p>
                <p>锚点组件被放置在右侧，内容区域在左侧。</p>
              </section>
              
              <section id="custom-right-section2" style={{ height: '400px', padding: '15px', borderBottom: '1px solid #eee' }}>
                <h4>右浮动示例区域2</h4>
                <p>这是右浮动锚点组件的第二个示例区域。</p>
                <p>展示了锚点组件在右侧时的滚动导航效果。</p>
              </section>
              
              <section id="custom-right-section3" style={{ height: '400px', padding: '15px' }}>
                <h4>右浮动示例区域3</h4>
                <p>这是右浮动锚点组件的第三个示例区域。</p>
                <p>通过CSS的float: right实现锚点组件的右对齐布局。</p>
              </section>
            </div>
            
            {/* 锚点组件 - 右侧浮动 */}
            <div style={{ float: 'right', width: '250px', marginLeft: '20px', backgroundColor: '#f5f5f5', padding: '10px', borderRadius: '4px' }}>
              <Anchor 
                getContainer={() => scrollContainerRef.current!}
                offsetTop={10}
                affix={false}
                onChange={(href: string) => {
                  console.log('右浮动容器中当前激活的锚点:', href);
                }}
              >
                <Anchor.Link href="#custom-right-section1" title="右浮动区域1" />
                <Anchor.Link href="#custom-right-section2" title="右浮动区域2" />
                <Anchor.Link href="#custom-right-section3" title="右浮动区域3" />
              </Anchor>
            </div>
          </div>
        </div>
      </div>

            {/* API 文档 */}
            <div style={{ marginBottom: '40px', padding: '20px', background: '#fafafa', borderRadius: '8px' }}>
                <h3>API 参数</h3>

                <h4>Anchor 组件</h4>
                <div style={{ marginBottom: '30px' }}>
                    <Table pagination={false} columns={apiColumns} dataSource={apiDataSource} />
                </div>

                <h4>Anchor.Link 组件</h4>
                <Table pagination={false} columns={apiColumns} dataSource={linkApiDataSource} />
            </div>

            {/* 代码示例 */}
            <div style={{ marginBottom: '40px' }}>
                <h3>代码示例</h3>
                <SyntaxHighlighter language="tsx" style={vscDarkPlus} customStyle={{ borderRadius: '6px', margin: '0' }}>
                    {`import { Anchor } from '@zjpcy/simple-design';

// 基本用法 - 使用ref
const containerRef = useRef<HTMLDivElement>(null);

<Anchor 
  getContainer={() => containerRef.current!}
  offsetTop={20} 
  onChange={(href) => {
    console.log('当前激活的锚点:', href);
  }}
>
  <Anchor.Link href="#section1" title="第一章：介绍" />
  <Anchor.Link href="#section2" title="第二章：快速开始" />
  <Anchor.Link href="#section3" title="第三章：核心功能" />
  <Anchor.Link href="#section4" title="第四章：API 文档" />
  <Anchor.Link href="#section5" title="第五章：常见问题" />
</Anchor>

// 自定义容器 - 使用ref
const scrollContainerRef = useRef<HTMLDivElement>(null);

<Anchor 
  getContainer={() => scrollContainerRef.current!}
  offsetTop={100}
>
  <Anchor.Link href="#section1" title="章节一" />
  <Anchor.Link href="#section2" title="章节二" />
</Anchor>

// 非固定定位 - 使用ref
<Anchor 
  getContainer={() => window.document.documentElement}
  affix={false}
>
  <Anchor.Link href="#section1" title="章节一" />
  <Anchor.Link href="#section2" title="章节二" />
</Anchor>`}
                </SyntaxHighlighter>
            </div>

            {/* 在其他项目中引用示例 */}
            <div>
                <h3>在其他项目中引用</h3>
                <div style={{ margin: '15px' }}>
                    <h4>1. 安装</h4>
                    <SyntaxHighlighter language="bash" style={vscDarkPlus} customStyle={{ borderRadius: '6px', margin: '0', fontSize: '14px', fontFamily: 'monospace' }}>
                        {`npm i @zjpcy/simple-design`}
                    </SyntaxHighlighter>
                </div>
                <div style={{ margin: '15px' }}>
                    <h4>2. 引用组件</h4>
                    <SyntaxHighlighter language="tsx" style={vscDarkPlus} customStyle={{ borderRadius: '6px', margin: '0', fontSize: '14px', fontFamily: 'monospace' }}>
                        {`// 方式一：单独引入
import Anchor from '@zjpcy/simple-design/lib/Anchor';
import '@zjpcy/simple-design/lib/Anchor/Anchor.css';

// 方式二：批量引入
import { Anchor } from '@zjpcy/simple-design';
import '@zjpcy/simple-design/lib/index.css';`}
                    </SyntaxHighlighter>
                </div>
            </div>
        </div>
    );
};

export default AnchorExample; 