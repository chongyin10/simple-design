import React, { useState } from 'react';
import { Button, Modal, Flex, Input } from '../../components';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

// 复制功能组件
const CopyBlock: React.FC<{ code: string }> = ({ code }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('复制失败:', err);
    }
  };

  return (
    <div style={{ position: 'relative', marginBottom: '16px' }}>
      <button
        onClick={handleCopy}
        style={{
          position: 'absolute',
          top: '8px',
          right: '8px',
          padding: '4px 8px',
          background: copied ? '#52c41a' : '#1890ff',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '12px',
          zIndex: 1,
        }}
      >
        {copied ? '已复制' : '复制'}
      </button>
      <SyntaxHighlighter language="tsx" style={vscDarkPlus} customStyle={{ margin: 0 }}>
        {code}
      </SyntaxHighlighter>
    </div>
  );
};

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div style={{ marginBottom: '32px' }}>
    <h2 style={{ marginTop: 0, marginBottom: '16px', color: '#333' }}>{title}</h2>
    {children}
  </div>
);

const DemoRow: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <Flex align="center" gap="middle" style={{ marginBottom: '16px' }}>
    <span style={{ minWidth: '120px', fontWeight: 500 }}>{title}:</span>
    {children}
  </Flex>
);

const ModalExample: React.FC = () => {
    const [visible, setVisible] = useState(false);
    const [visible2, setVisible2] = useState(false);
    const [visible3, setVisible3] = useState(false);
    const [visible4, setVisible4] = useState(false);
    const [visible5, setVisible5] = useState(false);
    const [visible6, setVisible6] = useState(false);
    const [visible7, setVisible7] = useState(false);
    const [visible8, setVisible8] = useState(false);
    const [visible9, setVisible9] = useState(false);
    const [visible10, setVisible10] = useState(false);
    const [visible11, setVisible11] = useState(false);
    const [visible12, setVisible12] = useState(false);
    const [visible13, setVisible13] = useState(false);
    const [visible14, setVisible14] = useState(false);
    const [visible15, setVisible15] = useState(false);
    const [visible16, setVisible16] = useState(false);
    const [visible17, setVisible17] = useState(false);
    const [visible18, setVisible18] = useState(false);
    const [visible19, setVisible19] = useState(false);
    const [visible20, setVisible20] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const customContainerRef = React.useRef<HTMLDivElement>(null);

    const handleOk = () => {
        setConfirmLoading(true);
        setTimeout(() => {
            setVisible(false);
            setConfirmLoading(false);
        }, 1000);
    };

    const apiDataSource = [
        { param: 'visible', type: 'boolean', default: '-', description: '控制弹窗显示/隐藏（必填）' },
        { param: 'title', type: 'string', default: "'标题'", description: '弹窗标题' },
        { param: 'width', type: 'number | string', default: '600', description: '弹窗宽度' },
        { param: 'height', type: 'number | string', default: '-', description: '弹窗高度（可选，不设置则内容区域有最小高度300px，设置后以设置的height为准）' },
        { param: 'headerHeight', type: 'number | string', default: '40', description: '顶部区域高度' },
        { param: 'footerHeight', type: 'number | string', default: '60', description: '底部区域高度' },
        { param: 'confirmLoading', type: 'boolean', default: 'false', description: '确认按钮是否显示加载状态' },
        { param: 'direction', type: "'center' | 'top-right' | 'bottom-right' | 'normal'", default: "'normal'", description: '打开和关闭的动画方向' },
        { param: 'top', type: 'number', default: '-', description: '弹窗距离顶部的距离，设置后direction会强制使用normal' },
        { param: 'footer', type: 'null | React.ReactNode', default: 'null', description: '底部内容，为 null 时显示默认按钮，提供值时显示自定义内容' },
        { param: 'onCancel', type: '() => void', default: '-', description: '取消按钮点击回调' },
        { param: 'onOk', type: '() => void', default: '-', description: '确认按钮点击回调' },
        { param: 'children', type: 'React.ReactNode', default: '-', description: '弹窗内容' },
        { param: 'className', type: 'string', default: '-', description: '自定义 CSS 类名' },
        { param: 'style', type: 'React.CSSProperties', default: '-', description: '自定义内联样式' },
        { param: 'getContainer', type: 'HTMLElement | (() => HTMLElement) | false', default: '() => document.body', description: '指定 Modal 挂载的 HTML 节点，false 为挂载在当前 DOM' },
        { param: 'okText', type: 'string', default: "'确认'", description: '确认按钮文本' },
        { param: 'cancelText', type: 'string', default: "'取消'", description: '取消按钮文本' },
        { param: 'maskStyle', type: 'React.CSSProperties', default: '-', description: '自定义遮罩层样式' },
        { param: 'maskClassName', type: 'string', default: '-', description: '自定义遮罩层类名' },
        { param: 'zIndex', type: 'number', default: '1000', description: '遮罩层的z-index值' },
        { param: 'contentClassName', type: 'string', default: '-', description: '内容区域的自定义className' },
        { param: 'contentStyle', type: 'React.CSSProperties', default: '-', description: '内容区域的自定义style，优先级高于默认样式' }
    ];

    return (
        <div style={{ padding: '20px' }}>
            <h1>Modal 对话框</h1>
            <p>模态对话框组件，用于显示重要信息或需要用户确认的操作。</p>

            {/* 基本使用 */}
            <Section title="基本使用">
                <p>点击按钮打开基本弹窗。</p>
                
                <DemoRow title="基本弹窗">
                    <Button variant="primary" onClick={() => setVisible(true)}>
                        打开弹窗
                    </Button>
                </DemoRow>

                <Modal
                    visible={visible}
                    title="基本弹窗"
                    onCancel={() => setVisible(false)}
                    onOk={() => setVisible(false)}
                >
                    <p>这是弹窗的内容区域，可以放置任意内容。</p>
                    <p>弹窗会上下左右居中显示。</p>
                </Modal>
                
                <CopyBlock code={`import { Modal, Button } from '@zjpcy/simple-design';
import { useState } from 'react';

function App() {
    const [visible, setVisible] = useState(false);

    return (
        <>
            <Button onClick={() => setVisible(true)}>
                打开弹窗
            </Button>
            <Modal
                visible={visible}
                title="基本弹窗"
                onCancel={() => setVisible(false)}
                onOk={() => setVisible(false)}
            >
                <p>这是弹窗的内容区域，可以放置任意内容。</p>
                <p>弹窗会上下左右居中显示。</p>
            </Modal>
        </>
    );
}`} />
            </Section>

            <Section title="自定义尺寸">
                <p>可以自定义弹窗的宽度和高度。</p>

                <DemoRow title="小尺寸">
                    <Button variant="primary" onClick={() => setVisible2(true)}>
                        小尺寸弹窗
                    </Button>
                </DemoRow>
                
                <DemoRow title="大尺寸">
                    <Button variant="primary" onClick={() => setVisible3(true)}>
                        大尺寸弹窗
                    </Button>
                </DemoRow>
                
                <DemoRow title="最小高度测试">
                    <Button variant="primary" onClick={() => setVisible19(true)}>
                        最小高度测试
                    </Button>
                </DemoRow>

                <Modal
                    visible={visible2}
                    title="小尺寸弹窗"
                    width={400}
                    onCancel={() => setVisible2(false)}
                    onOk={() => setVisible2(false)}
                >
                    <p>这是小尺寸弹窗，宽度为 400px。</p>
                </Modal>

                <Modal
                    visible={visible3}
                    title="大尺寸弹窗"
                    width={800}
                    height={500}
                    onCancel={() => setVisible3(false)}
                    onOk={() => setVisible3(false)}
                >
                    <p>这是大尺寸弹窗，宽度为 800px，高度为 500px。</p>
                    <p>可以放置更多内容。</p>
                    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '4px', marginTop: '10px' }}>
                        <p>示例内容块...</p>
                        <p>示例内容块...</p>
                        <p>示例内容块...</p>
                    </div>
                </Modal>
                
                <Modal
                    visible={visible19}
                    title="最小高度测试（未设置 height）"
                    width={600}
                    onCancel={() => setVisible19(false)}
                    onOk={() => setVisible19(false)}
                >
                    <p>这个弹窗没有设置 height 参数。</p>
                    <p>根据新的实现，内容区域会有最小高度 300px 的限制。</p>
                    <p>即使内容很少，弹窗也不会小于这个最小高度。</p>
                    <div style={{ padding: '15px', background: '#e6f7ff', borderRadius: '4px', marginTop: '10px' }}>
                        <p>测试内容</p>
                        <p>测试内容</p>
                    </div>
                </Modal>
                
                <CopyBlock code={`// 小尺寸弹窗
<Modal
    visible={visible}
    title="小尺寸弹窗"
    width={400}
    onCancel={() => setVisible(false)}
    onOk={() => setVisible(false)}
>
    <p>这是小尺寸弹窗，宽度为 400px。</p>
</Modal>

// 大尺寸弹窗
<Modal
    visible={visible}
    title="大尺寸弹窗"
    width={800}
    height={500}
    onCancel={() => setVisible(false)}
    onOk={() => setVisible(false)}
>
    <p>这是大尺寸弹窗，宽度为 800px，高度为 500px。</p>
</Modal>`} />
            </Section>

            <Section title="异步确认">
                <p>点击确认按钮后可以进行异步操作，完成后关闭弹窗。</p>

                <DemoRow title="异步操作">
                    <Button variant="primary" onClick={() => setVisible4(true)}>
                        异步确认弹窗
                    </Button>
                </DemoRow>

                <Modal
                    visible={visible4}
                    title="异步确认"
                    confirmLoading={confirmLoading}
                    onCancel={() => !confirmLoading && setVisible4(false)}
                    onOk={handleOk}
                >
                    <p>点击确认按钮后，会模拟 1 秒的异步操作。</p>
                    <p>操作完成后弹窗会自动关闭。</p>
                </Modal>
                
                <CopyBlock code={`const [confirmLoading, setConfirmLoading] = useState(false);

const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
        setVisible(false);
        setConfirmLoading(false);
    }, 1000);
};

<Modal
    visible={visible}
    title="异步确认"
    confirmLoading={confirmLoading}
    onCancel={() => !confirmLoading && setVisible(false)}
    onOk={handleOk}
>
    <p>点击确认按钮后，会模拟 1 秒的异步操作。</p>
    <p>操作完成后弹窗会自动关闭。</p>
</Modal>`} />
            </Section>

            <Section title="高度自适应">
                <p>当未设置height时，内容区域有最小高度300px，高度根据内容自动扩展；当设置height时，以设置的height为准，取消最小高度限制。</p>

                <DemoRow title="自适应高度">
                    <Button variant="primary" onClick={() => setVisible5(true)}>
                        自适应高度
                    </Button>
                </DemoRow>
                
                <DemoRow title="固定高度">
                    <Button variant="primary" onClick={() => setVisible6(true)}>
                        内容滚动示例
                    </Button>
                </DemoRow>

                <Modal
                    visible={visible5}
                    title="自适应高度弹窗"
                    width={600}
                    onCancel={() => setVisible5(false)}
                    onOk={() => setVisible5(false)}
                >
                    <p>这是一个未设置height的弹窗，内容区域有最小高度300px的限制。</p>
                    <p>即使内容很少，弹窗也不会小于这个最小高度。</p>
                    <p>当内容超过最小高度时，弹窗高度会自动扩展以适应内容。</p>
                    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '4px', marginTop: '10px' }}>
                        <h4>测试内容</h4>
                        <p>这是一段测试文本，用于演示内容自适应高度的效果。</p>
                        <p>当内容较少时，弹窗高度会自动收缩；当内容较多时，弹窗高度会自动扩展。</p>
                    </div>
                </Modal>

                <Modal
                    visible={visible6}
                    title="内容滚动弹窗"
                    width={600}
                    height={300}
                    headerHeight={50}
                    footerHeight={50}
                    onCancel={() => setVisible6(false)}
                    onOk={() => setVisible6(false)}
                >
                    <h4>长内容测试</h4>
                    <p>这是一个设置了固定高度的弹窗，内容区域高度会自动计算。</p>
                    <p>当内容超过计算高度时，会自动显示滚动条。</p>
                    <div style={{ padding: '15px', background: '#f5f5f5', borderRadius: '4px', marginTop: '10px' }}>
                        <p>测试行 1</p>
                        <p>测试行 2</p>
                        <p>测试行 3</p>
                        <p>测试行 4</p>
                        <p>测试行 5</p>
                        <p>测试行 6</p>
                        <p>测试行 7</p>
                        <p>测试行 8</p>
                        <p>测试行 9</p>
                        <p>测试行 10</p>
                        <p>测试行 11</p>
                        <p>测试行 12</p>
                        <p>测试行 13</p>
                        <p>测试行 14</p>
                        <p>测试行 15</p>
                        <p>测试行 16</p>
                        <p>测试行 17</p>
                        <p>测试行 18</p>
                        <p>测试行 19</p>
                        <p>测试行 20</p>
                    </div>
                    <p>滚动到底部可以看到确认和关闭按钮。</p>
                </Modal>
                
                <CopyBlock code={`// 自适应高度（不设置 height）
<Modal
    visible={visible}
    title="自适应高度弹窗"
    width={600}
    onCancel={() => setVisible(false)}
    onOk={() => setVisible(false)}
>
    <p>内容区域有最小高度300px的限制。</p>
    <p>即使内容很少，弹窗也不会小于这个最小高度。</p>
    <p>当内容超过最小高度时，弹窗高度会自动扩展以适应内容。</p>
</Modal>

// 固定高度，以设置的height为准
<Modal
    visible={visible}
    title="内容滚动弹窗"
    width={600}
    height={300}
    headerHeight={50}
    footerHeight={50}
    onCancel={() => setVisible(false)}
    onOk={() => setVisible(false)}
>
    <p>设置了height参数，以设置的height为准，取消最小高度限制。</p>
    <p>内容区域高度 = 总高度 - 头部高度 - 底部高度</p>
    <p>这里计算结果为：300 - 50 - 50 = 200px</p>
    <p>当内容超过计算高度时，会自动显示滚动条。</p>
</Modal>`} />
            </Section>

            <Section title="动画方向">
                <p>支持四种动画方向，打开和关闭将使用相同的方向设置。</p>

                <DemoRow title="中心动画">
                    <Button variant="primary" onClick={() => setVisible7(true)}>
                        中心动画
                    </Button>
                </DemoRow>
                
                <DemoRow title="右上角动画">
                    <Button variant="primary" onClick={() => setVisible8(true)}>
                        右上角动画
                    </Button>
                </DemoRow>
                
                <DemoRow title="右下角动画">
                    <Button variant="primary" onClick={() => setVisible9(true)}>
                        右下角动画
                    </Button>
                </DemoRow>
                
                <DemoRow title="正常动画">
                    <Button variant="primary" onClick={() => setVisible10(true)}>
                        正常动画
                    </Button>
                </DemoRow>

                <Modal
                    visible={visible7}
                    title="中心动画"
                    width={500}
                    direction="center"
                    onCancel={() => setVisible7(false)}
                    onOk={() => setVisible7(false)}
                >
                    <p>打开：从中心点放大</p>
                    <p>关闭：从中心点缩小消失</p>
                </Modal>

                <Modal
                    visible={visible8}
                    title="右上角动画"
                    width={500}
                    direction="top-right"
                    onCancel={() => setVisible8(false)}
                    onOk={() => setVisible8(false)}
                >
                    <p>打开：从右上角移动并放大</p>
                    <p>关闭：向右上角移动并缩小消失</p>
                </Modal>

                <Modal
                    visible={visible9}
                    title="右下角动画"
                    width={500}
                    direction="bottom-right"
                    onCancel={() => setVisible9(false)}
                    onOk={() => setVisible9(false)}
                >
                    <p>打开：从右下角移动并放大</p>
                    <p>关闭：向右下角移动并缩小消失</p>
                </Modal>

                <Modal
                    visible={visible10}
                    title="正常动画"
                    width={500}
                    direction="normal"
                    onCancel={() => setVisible10(false)}
                    onOk={() => setVisible10(false)}
                >
                    <p>打开：轻微放大并淡入</p>
                    <p>关闭：轻微缩小并淡出</p>
                </Modal>
                
                <CopyBlock code={`// 中心动画
<Modal
    visible={visible}
    title="中心动画"
    direction="center"
    onCancel={() => setVisible(false)}
    onOk={() => setVisible(false)}
>
    <p>打开：从中心点放大</p>
    <p>关闭：从中心点缩小消失</p>
</Modal>

// 右上角动画
<Modal
    visible={visible}
    title="右上角动画"
    direction="top-right"
    onCancel={() => setVisible(false)}
    onOk={() => setVisible(false)}
>
    <p>打开：从右上角移动并放大</p>
    <p>关闭：向右上角移动并缩小消失</p>
</Modal>

// 右下角动画
<Modal
    visible={visible}
    title="右下角动画"
    direction="bottom-right"
    onCancel={() => setVisible(false)}
    onOk={() => setVisible(false)}
>
    <p>打开：从右下角移动并放大</p>
    <p>关闭：向右下角移动并缩小消失</p>
</Modal>

// 正常动画
<Modal
    visible={visible}
    title="正常动画"
    direction="normal"
    onCancel={() => setVisible(false)}
    onOk={() => setVisible(false)}
>
    <p>打开：轻微放大并淡入</p>
    <p>关闭：轻微缩小并淡出</p>
</Modal>`} />
            </Section>

            <Section title="自定义顶部位置">
                <p>通过 top 参数可以自定义弹窗距离顶部的位置，当同时设置 direction 时，direction 会强制使用默认值 normal。</p>

                <DemoRow title="自定义位置">
                    <Button variant="primary" onClick={() => setVisible11(true)}>
                        自定义顶部位置
                    </Button>
                </DemoRow>
                
                <DemoRow title="top + direction">
                    <Button variant="primary" onClick={() => setVisible12(true)}>
                        top 与 direction 同时使用
                    </Button>
                </DemoRow>

                <Modal
                    visible={visible11}
                    title="自定义顶部位置"
                    width={500}
                    top={100}
                    onCancel={() => setVisible11(false)}
                    onOk={() => setVisible11(false)}
                >
                    <p>此弹窗距离顶部 100px</p>
                    <p>使用 top 参数可以自定义弹窗的垂直位置</p>
                </Modal>

                <Modal
                    visible={visible12}
                    title="top 与 direction 同时使用"
                    width={500}
                    top={200}
                    direction="top-right"
                    onCancel={() => setVisible12(false)}
                    onOk={() => setVisible12(false)}
                >
                    <p>此弹窗距离顶部 200px</p>
                    <p>虽然设置了 direction="top-right"，但由于同时设置了 top 参数，direction 被强制为 normal</p>
                </Modal>
                
                <CopyBlock code={`// 自定义顶部位置
<Modal
    visible={visible}
    title="自定义顶部位置"
    width={500}
    top={100}
    onCancel={() => setVisible(false)}
    onOk={() => setVisible(false)}
>
    <p>此弹窗距离顶部 100px</p>
</Modal>

// top 与 direction 同时使用
<Modal
    visible={visible}
    title="top 与 direction 同时使用"
    width={500}
    top={200}
    direction="top-right"
    onCancel={() => setVisible(false)}
    onOk={() => setVisible(false)}
>
    <p>虽然设置了 direction，但由于同时设置了 top 参数，direction 被强制为 normal</p>
</Modal>`} />
            </Section>

            <Section title="自定义 Footer">
                <p>可以通过 footer 参数自定义底部按钮，footer 为 null 时显示默认按钮，提供值时显示自定义按钮。</p>

                <DemoRow title="自定义按钮">
                    <Button variant="primary" onClick={() => setVisible13(true)}>
                        自定义 Footer
                    </Button>
                </DemoRow>

                <Modal
                    visible={visible13}
                    title="自定义 Footer 弹窗"
                    width={500}
                    onCancel={() => setVisible13(false)}
                    footer={[
                        <Button key="cancel" variant="secondary" onClick={() => setVisible13(false)}>
                            取消
                        </Button>,
                        <Button key="save" variant="primary" onClick={() => setVisible13(false)}>
                            保存
                        </Button>,
                        <Button key="delete" variant="danger" onClick={() => setVisible13(false)}>
                            删除
                        </Button>
                    ]}
                >
                    <p>这是一个自定义 Footer 的弹窗，底部显示了三个按钮：取消、保存和删除。</p>
                    <p>您可以根据需要自定义 footer 的内容和样式。</p>
                </Modal>
                
                <CopyBlock code={`// 自定义 Footer
<Modal
    visible={visible}
    title="自定义 Footer 弹窗"
    width={500}
    onCancel={() => setVisible(false)}
    footer={[
        <Button key="cancel" variant="secondary" onClick={() => setVisible(false)}>
            取消
        </Button>,
        <Button key="save" variant="primary" onClick={() => setVisible(false)}>
            保存
        </Button>,
        <Button key="delete" variant="danger" onClick={() => setVisible(false)}>
            删除
        </Button>
    ]}
>
    <p>这是一个自定义 Footer 的弹窗，底部显示了三个按钮：取消、保存和删除。</p>
    <p>您可以根据需要自定义 footer 的内容和样式。</p>
</Modal>`} />
            </Section>

            <Section title="自定义挂载容器">
                <p>可以通过 getContainer 参数指定 Modal 挂载的 HTML 节点，false 为挂载在当前 DOM。</p>

                <DemoRow title="当前 DOM">
                    <Button variant="primary" onClick={() => setVisible14(true)}>
                        挂载在当前 DOM
                    </Button>
                </DemoRow>
                
                <DemoRow title="自定义容器">
                    <Button variant="primary" onClick={() => setVisible15(true)}>
                        挂载在自定义容器
                    </Button>
                </DemoRow>

                {/* 自定义挂载容器 */}
                <div 
                    ref={customContainerRef} 
                    style={{ 
                        width: '100%', 
                        height: '200px', 
                        border: '2px dashed #4096ff', 
                        borderRadius: '8px', 
                        marginBottom: '20px', 
                        padding: '20px',
                        position: 'relative',
                        overflow: 'hidden'
                    }}
                >
                    <p style={{ color: '#606266', fontSize: '14px' }}>这是一个自定义的挂载容器</p>
                    <p style={{ color: '#606266', fontSize: '14px' }}>点击"挂载在自定义容器"按钮，Modal 将挂载在此处</p>
                </div>

                {/* 挂载在当前 DOM */}
                <Modal
                    visible={visible14}
                    title="挂载在当前 DOM"
                    width={500}
                    getContainer={false}
                    onCancel={() => setVisible14(false)}
                    onOk={() => setVisible14(false)}
                >
                    <p>这个 Modal 被挂载在当前 DOM 中，而不是 document.body。</p>
                    <p>可以通过 getContainer={false} 实现此效果。</p>
                </Modal>

                {/* 挂载在自定义容器 */}
                <Modal
                    visible={visible15}
                    title="挂载在自定义容器"
                    width={400}
                    getContainer={() => customContainerRef.current || document.body}
                    onCancel={() => setVisible15(false)}
                    onOk={() => setVisible15(false)}
                >
                    <p>这个 Modal 被挂载在页面中的自定义容器里。</p>
                    <p>可以通过 getContainer 属性指定挂载的 HTML 节点。</p>
                </Modal>
                
                <CopyBlock code={`// 挂载在当前 DOM
<Modal
    visible={visible}
    title="挂载在当前 DOM"
    width={500}
    getContainer={false}
    onCancel={() => setVisible(false)}
    onOk={() => setVisible(false)}
>
    <p>这个 Modal 被挂载在当前 DOM 中，而不是 document.body。</p>
</Modal>

// 挂载在自定义容器
const customContainerRef = useRef<HTMLDivElement>(null);

<div ref={customContainerRef} style={{ width: '100%', height: '200px' }}>
    这是一个自定义的挂载容器
</div>

<Modal
    visible={visible}
    title="挂载在自定义容器"
    width={400}
    getContainer={() => customContainerRef.current || document.body}
    onCancel={() => setVisible(false)}
    onOk={() => setVisible(false)}
>
    <p>这个 Modal 被挂载在页面中的自定义容器里。</p>
</Modal>`} />
            </Section>

            <Section title="自定义遮罩层">
                <p>可以通过 maskStyle 属性自定义遮罩层的背景色和其他样式。</p>

                <DemoRow title="自定义颜色">
                    <Button variant="primary" onClick={() => setVisible16(true)}>
                        自定义遮罩背景色
                    </Button>
                </DemoRow>

                {/* 自定义遮罩背景色 */}
                <Modal
                    visible={visible16}
                    title="自定义遮罩背景色"
                    width={500}
                    maskStyle={{ backgroundColor: 'rgba(255, 100, 100, 0.7)' }}
                    onCancel={() => setVisible16(false)}
                    onOk={() => setVisible16(false)}
                >
                    <p>这个 Modal 的遮罩层使用了自定义的背景色（半透明的红色）。</p>
                    <p>可以通过 maskStyle 属性设置遮罩层的各种样式，如背景色、透明度等。</p>
                </Modal>
                
                <CopyBlock code={`// 自定义遮罩背景色
<Modal
    visible={visible}
    title="自定义遮罩背景色"
    width={500}
    maskStyle={{ backgroundColor: 'rgba(255, 100, 100, 0.7)' }}
    onCancel={() => setVisible(false)}
    onOk={() => setVisible(false)}
>
    <p>这个 Modal 的遮罩层使用了自定义的背景色（半透明的红色）。</p>
</Modal>`} />
            </Section>

            <Section title="自定义 zIndex">
                <p>可以通过zIndex属性设置遮罩层的层级，默认值为1000。在嵌套Modal的情况下，需要设置不同的zIndex值来确保正确的显示层级。</p>

                <DemoRow title="嵌套弹窗">
                    <Button variant="primary" onClick={() => setVisible17(true)}>
                        打开第一个Modal
                    </Button>
                </DemoRow>

                {/* 第一个Modal，使用默认zIndex(1000) */}
                <Modal
                    visible={visible17}
                    title="第一个Modal (zIndex: 1000)"
                    width={600}
                    onCancel={() => setVisible17(false)}
                    footer={[
                        <Button key="close" variant="secondary" onClick={() => setVisible17(false)}>
                            关闭
                        </Button>,
                        <Button key="open" variant="primary" onClick={() => setVisible18(true)}>
                            打开第二个Modal
                        </Button>
                    ]}
                >
                    <p>这是第一个Modal，使用默认的zIndex值(1000)。</p>
                    <p>点击"打开第二个Modal"按钮，会弹出第二个Modal。</p>
                </Modal>

                {/* 第二个Modal，使用更高的zIndex(1010) */}
                <Modal
                    visible={visible18}
                    title="第二个Modal (zIndex: 1010)"
                    width={500}
                    zIndex={1010}
                    onCancel={() => setVisible18(false)}
                    onOk={() => setVisible18(false)}
                >
                    <p>这是第二个Modal，使用了更高的zIndex值(1010)。</p>
                    <p>由于设置了更高的zIndex，它会显示在第一个Modal的上方。</p>
                </Modal>
                
                <CopyBlock code={`// 第一个Modal，使用默认zIndex(1000)
<Modal
    visible={visible1}
    title="第一个Modal (zIndex: 1000)"
    width={600}
    onCancel={() => setVisible1(false)}
    footer={[
        <Button key="open" onClick={() => setVisible2(true)}>
            打开第二个Modal
        </Button>
    ]}
>
    <p>这是第一个Modal，使用默认的zIndex值(1000)。</p>
</Modal>

// 第二个Modal，使用更高的zIndex(1010)
<Modal
    visible={visible2}
    title="第二个Modal (zIndex: 1010)"
    width={500}
    zIndex={1010}
    onCancel={() => setVisible2(false)}
    onOk={() => setVisible2(false)}
>
    <p>这是第二个Modal，使用了更高的zIndex值(1010)。</p>
    <p>由于设置了更高的zIndex，它会显示在第一个Modal的上方。</p>
</Modal>`} />
            </Section>

            <Section title="状态重置演示">
                <p>Modal 关闭后会销毁内容区域的 DOM 节点，再次打开时会重新挂载子组件，表单状态会自动重置。</p>
                
                <DemoRow title="表单状态重置">
                    <Button variant="primary" onClick={() => setVisible20(true)}>
                        打开表单弹窗
                    </Button>
                </DemoRow>

                <Modal
                    visible={visible20}
                    title="表单状态重置演示"
                    width={500}
                    onCancel={() => setVisible20(false)}
                    onOk={() => setVisible20(false)}
                >
                    <p style={{ marginBottom: '16px', color: '#666' }}>
                        在输入框中输入内容，然后关闭弹窗，再次打开时输入框会恢复默认值。
                    </p>
                    <div style={{ marginBottom: '16px' }}>
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>用户名：</label>
                        <Input value="默认用户名" placeholder="请输入用户名" readOnly />
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>备注：</label>
                        <Input placeholder="请输入备注" />
                    </div>
                </Modal>
                
                <CopyBlock code={`import { Modal, Button, Input } from '@zjpcy/simple-design';
import { useState } from 'react';

function App() {
    const [visible, setVisible] = useState(false);

    return (
        <>
            <Button onClick={() => setVisible(true)}>
                打开表单弹窗
            </Button>
            <Modal
                visible={visible}
                title="表单状态重置演示"
                onCancel={() => setVisible(false)}
                onOk={() => setVisible(false)}
            >
                <Input value="默认用户名" readOnly />
                <Input placeholder="请输入备注" />
            </Modal>
        </>
    );
}
// 注意：Modal 关闭后会销毁内容区域的 DOM 节点
// 再次打开时会重新挂载子组件，表单状态会自动重置`} />
            </Section>

            <Section title="API">
                <h3>Props</h3>
                <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '16px' }}>
                    <thead>
                        <tr style={{ backgroundColor: '#f5f5f5' }}>
                            <th style={{ border: '1px solid #d9d9d9', padding: '8px', textAlign: 'left' }}>属性</th>
                            <th style={{ border: '1px solid #d9d9d9', padding: '8px', textAlign: 'left' }}>说明</th>
                            <th style={{ border: '1px solid #d9d9d9', padding: '8px', textAlign: 'left' }}>类型</th>
                            <th style={{ border: '1px solid #d9d9d9', padding: '8px', textAlign: 'left' }}>默认值</th>
                        </tr>
                    </thead>
                    <tbody>
                        {apiDataSource.map((item, index) => (
                            <tr key={index}>
                                <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>{item.param}</td>
                                <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>{item.description}</td>
                                <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>{item.type}</td>
                                <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>{item.default}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Section>

            <Section title="代码示例">
                <CopyBlock code={`import { Modal, Button } from '@zjpcy/simple-design';
import { useState } from 'react';

function App() {
    const [visible, setVisible] = useState(false);
    const [visible2, setVisible2] = useState(false);
    const [visible3, setVisible3] = useState(false);
    const [visible4, setVisible4] = useState(false);
    const [visible5, setVisible5] = useState(false);

    return (
        <>
            {/* 基本使用 */}
            <Button onClick={() => setVisible(true)}>
                打开弹窗
            </Button>
            <Modal
                visible={visible}
                title="标题"
                onCancel={() => setVisible(false)}
                onOk={() => {
                    console.log('确认');
                    setVisible(false);
                }}
            >
                <p>弹窗内容</p>
                <p>头部右侧有关闭按钮，可以点击关闭弹窗</p>
            </Modal>

            {/* 固定高度，以设置的height为准 */}
            <Button onClick={() => setVisible2(true)}>
                固定高度弹窗
            </Button>
            <Modal
                visible={visible2}
                title="固定高度弹窗"
                height={400}
                headerHeight={60}
                footerHeight={60}
                onCancel={() => setVisible2(false)}
                onOk={() => setVisible2(false)}
            >
                <p>设置了height参数，以设置的height为准，取消最小高度限制。</p>
                <p>内容区域高度 = 总高度 - 头部高度 - 底部高度</p>
                <p>这里计算结果为：400 - 60 - 60 = 280px</p>
                <p>当内容超过计算高度时，会自动显示滚动条</p>
            </Modal>

            {/* 自适应高度，有最小高度限制 */}
            <Button onClick={() => setVisible19(true)}>
                最小高度测试
            </Button>
            <Modal
                visible={visible19}
                title="最小高度测试（未设置 height）"
                width={600}
                onCancel={() => setVisible19(false)}
                onOk={() => setVisible19(false)}
            >
                <p>这个弹窗没有设置 height 参数。</p>
                <p>根据新的实现，内容区域会有最小高度 300px 的限制。</p>
                <p>即使内容很少，弹窗也不会小于这个最小高度。</p>
            </Modal>

            {/* 自定义动画方向 */}
            <Button onClick={() => setVisible3(true)}>
                自定义动画方向
            </Button>
            <Modal
                visible={visible3}
                title="自定义动画方向"
                direction="top-right"
                onCancel={() => setVisible3(false)}
                onOk={() => setVisible3(false)}
            >
                <p>动画方向：右上角</p>
                <p>设置direction属性后，打开和关闭将使用相同的动画方向</p>
            </Modal>

            {/* 自定义顶部位置 */}
            <Button onClick={() => setVisible4(true)}>
                自定义顶部位置
            </Button>
            <Modal
                visible={visible4}
                title="自定义顶部位置"
                width={500}
                top={150}
                onCancel={() => setVisible4(false)}
                onOk={() => setVisible4(false)}
            >
                <p>此弹窗距离顶部 150px</p>
                <p>使用 top 参数可以自定义弹窗的垂直位置</p>
                <p>当同时设置 direction 和 top 参数时，direction 会强制使用 normal</p>
            </Modal>

            {/* 自定义 Footer */}
            <Button onClick={() => setVisible5(true)}>
                自定义 Footer
            </Button>
            <Modal
                visible={visible5}
                title="自定义 Footer"
                width={500}
                onCancel={() => setVisible5(false)}
                footer={[
                    <Button key="cancel" variant="secondary" onClick={() => setVisible5(false)}>
                        取消
                    </Button>,
                    <Button key="save" variant="primary" onClick={() => setVisible5(false)}>
                        保存
                    </Button>,
                    <Button key="delete" variant="danger" onClick={() => setVisible5(false)}>
                        删除
                    </Button>
                ]}
            >
                <p>这是一个自定义 Footer 的弹窗，底部显示了三个按钮：取消、保存和删除。</p>
                <p>footer 为 null 时显示默认按钮，提供值时显示自定义按钮。</p>
            </Modal>
        </>
    );
}`} />
            </Section>

            <Section title="安装和使用">
                <h3>1. 安装依赖</h3>
                <CopyBlock code="npm i @zjpcy/simple-design" />
                
                <h3>2. 引用组件</h3>
                <CopyBlock code={`// 方式一：单独引入
import Modal from '@zjpcy/simple-design/lib/Modal';
import '@zjpcy/simple-design/lib/Modal/Modal.css';

// 方式二：批量引入
import { Modal } from '@zjpcy/simple-design';
import '@zjpcy/simple-design/lib/index.css';`} />
            </Section>
        </div>
    );
};

export default ModalExample;
