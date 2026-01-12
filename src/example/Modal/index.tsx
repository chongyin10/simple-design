import React, { useState } from 'react';
import { Button, Modal, Table } from '../../components';
import type { Column } from '../../components/Table';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

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
    const [confirmLoading, setConfirmLoading] = useState(false);
    const customContainerRef = React.useRef<HTMLDivElement>(null);

    const handleOk = () => {
        setConfirmLoading(true);
        setTimeout(() => {
            setVisible(false);
            setConfirmLoading(false);
        }, 1000);
    };

    const apiColumns: Column[] = [
        { dataIndex: 'param', title: '参数名', width: '150px' },
        { dataIndex: 'type', title: '类型', width: '300px' },
        { dataIndex: 'default', title: '默认值', width: '150px' },
        { dataIndex: 'description', title: '描述', width: '300px' }
    ];

    const apiDataSource = [
        { param: 'visible', type: 'boolean', default: '-', description: '控制弹窗显示/隐藏（必填）' },
        { param: 'title', type: 'string', default: "'标题'", description: '弹窗标题' },
        { param: 'width', type: 'number | string', default: '600', description: '弹窗宽度' },
        { param: 'height', type: 'number | string', default: '300', description: '弹窗高度（可选，不设置则自适应）' },
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
        { param: 'zIndex', type: 'number', default: '1000', description: '遮罩层的z-index值' }
    ];

    return (
        <div style={{ padding: '20px' }}>
            <h2>Modal 组件</h2>
            <p>模态对话框组件，用于显示重要信息或需要用户确认的操作。</p>

            <div style={{ marginBottom: '40px' }}>
                <h3>基本使用</h3>
                <p>点击按钮打开基本弹窗。</p>

                <div style={{ marginBottom: '20px' }}>
                    <Button variant="primary" onClick={() => setVisible(true)}>
                        打开基本弹窗
                    </Button>
                </div>

                <Modal
                    visible={visible}
                    title="基本弹窗"
                    onCancel={() => setVisible(false)}
                    onOk={() => setVisible(false)}
                >
                    <p>这是弹窗的内容区域，可以放置任意内容。</p>
                    <p>弹窗会上下左右居中显示。</p>
                </Modal>
            </div>

            <div style={{ marginBottom: '40px' }}>
                <h3>自定义尺寸</h3>
                <p>可以自定义弹窗的宽度和高度。</p>

                <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
                    <Button variant="primary" onClick={() => setVisible2(true)}>
                        小尺寸弹窗
                    </Button>
                    <Button variant="primary" onClick={() => setVisible3(true)}>
                        大尺寸弹窗
                    </Button>
                </div>

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
            </div>

            <div style={{ marginBottom: '40px' }}>
                <h3>异步确认</h3>
                <p>点击确认按钮后可以进行异步操作，完成后关闭弹窗。</p>

                <div style={{ marginBottom: '20px' }}>
                    <Button variant="primary" onClick={() => setVisible4(true)}>
                        异步确认弹窗
                    </Button>
                </div>

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
            </div>

            <div style={{ marginBottom: '40px' }}>
                <h3>内容高度自适应</h3>
                <p>当未设置height时，内容区域高度自适应；当设置height时，内容区域高度自动计算。</p>

                <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
                    <Button variant="primary" onClick={() => setVisible5(true)}>
                        自适应高度
                    </Button>
                    <Button variant="primary" onClick={() => setVisible6(true)}>
                        内容滚动示例
                    </Button>
                </div>

                <Modal
                    visible={visible5}
                    title="自适应高度弹窗"
                    width={600}
                    onCancel={() => setVisible5(false)}
                    onOk={() => setVisible5(false)}
                >
                    <p>这是一个未设置height的弹窗，内容区域高度会根据内容自动调整。</p>
                    <p>你可以添加更多内容来测试自适应效果。</p>
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
            </div>

            <div style={{ marginBottom: '40px' }}>
                <h3>动画方向演示</h3>
                <p>支持四种动画方向，打开和关闭将使用相同的方向设置。</p>

                <div style={{ marginBottom: '20px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                    <Button variant="primary" onClick={() => setVisible7(true)}>
                        中心动画
                    </Button>
                    <Button variant="primary" onClick={() => setVisible8(true)}>
                        右上角动画
                    </Button>
                    <Button variant="primary" onClick={() => setVisible9(true)}>
                        右下角动画
                    </Button>
                    <Button variant="primary" onClick={() => setVisible10(true)}>
                        正常动画
                    </Button>
                </div>

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
            </div>

            <div style={{ marginBottom: '40px' }}>
                <h3>自定义顶部位置</h3>
                <p>通过 top 参数可以自定义弹窗距离顶部的位置，当同时设置 direction 时，direction 会强制使用默认值 normal。</p>

                <div style={{ marginBottom: '20px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                    <Button variant="primary" onClick={() => setVisible11(true)}>
                        自定义顶部位置
                    </Button>
                    <Button variant="primary" onClick={() => setVisible12(true)}>
                        top 与 direction 同时使用
                    </Button>
                </div>

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
            </div>

            <div style={{ marginBottom: '40px' }}>
                <h3>自定义 Footer</h3>
                <p>可以通过 footer 参数自定义底部按钮，footer 为 null 时显示默认按钮，提供值时显示自定义按钮。</p>

                <div style={{ marginBottom: '20px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                    <Button variant="primary" onClick={() => setVisible13(true)}>
                        自定义 Footer
                    </Button>
                </div>

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
            </div>

            <div style={{ marginBottom: '40px' }}>
                <h3>自定义挂载容器</h3>
                <p>可以通过 getContainer 参数指定 Modal 挂载的 HTML 节点，false 为挂载在当前 DOM。</p>

                <div style={{ marginBottom: '20px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                    <Button variant="primary" onClick={() => setVisible14(true)}>
                        挂载在当前 DOM
                    </Button>
                    <Button variant="primary" onClick={() => setVisible15(true)}>
                        挂载在自定义容器
                    </Button>
                </div>

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
            </div>

            <div style={{ marginBottom: '40px' }}>
                <h3>自定义遮罩背景色</h3>
                <p>可以通过 maskStyle 属性自定义遮罩层的背景色和其他样式。</p>

                <div style={{ marginBottom: '20px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                    <Button variant="primary" onClick={() => setVisible16(true)}>
                        自定义遮罩背景色
                    </Button>
                </div>

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
                    <p>示例代码：</p>
                    <pre style={{ backgroundColor: '#f5f7fa', padding: '10px', borderRadius: '4px', overflow: 'auto' }}>
                        {`<Modal
    visible={visible}
    title="自定义遮罩背景色"
    maskStyle={{ backgroundColor: 'rgba(255, 100, 100, 0.7)' }}
    onCancel={() => setVisible(false)}
    onOk={() => setVisible(false)}
>
    {/* 内容 */}
</Modal>`}
                    </pre>
                </Modal>
            </div>

            <div style={{ marginBottom: '40px' }}>
                <h3>自定义zIndex</h3>
                <p>可以通过zIndex属性设置遮罩层的层级，默认值为1000。在嵌套Modal的情况下，需要设置不同的zIndex值来确保正确的显示层级。</p>

                <div style={{ marginBottom: '20px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                    <Button variant="primary" onClick={() => setVisible17(true)}>
                        打开第一个Modal
                    </Button>
                </div>

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
                    <p>示例代码：</p>
                    <pre style={{ backgroundColor: '#f5f7fa', padding: '10px', borderRadius: '4px', overflow: 'auto' }}>
                        {`<Modal
    visible={visible}
    title="第二个Modal"
    zIndex={1010}
    onCancel={() => setVisible(false)}
    onOk={() => setVisible(false)}
>
    {/* 内容 */}
</Modal>`}
                    </pre>
                </Modal>
            </div>

            <div style={{ marginBottom: '40px', padding: '20px', background: '#fafafa', borderRadius: '8px' }}>
                <h3>API 参数</h3>
                <Table pagination={false} columns={apiColumns} dataSource={apiDataSource} />
            </div>

            <div style={{ marginBottom: '40px' }}>
                <h3>代码示例</h3>
                <SyntaxHighlighter language="tsx" style={vscDarkPlus} customStyle={{ borderRadius: '6px', margin: '0' }}>
{`import { Modal } from '@idp-studio/design';
import { useState } from 'react';

function App() {
    const [visible, setVisible] = useState(false);
    const [visible2, setVisible2] = useState(false);
    const [visible3, setVisible3] = useState(false);
    const [visible4, setVisible4] = useState(false);

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

            {/* 固定高度，内容自动计算 */}
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
                <p>内容区域高度 = 总高度 - 头部高度 - 底部高度</p>
                <p>这里计算结果为：400 - 60 - 60 = 280px</p>
                <p>当内容超过计算高度时，会自动显示滚动条</p>
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
}`}
                </SyntaxHighlighter>
            </div>

            <div>
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
import Modal from '@idp-studio/design/lib/Modal';
import '@idp-studio/design/lib/Modal/Modal.css';

// 方式二：批量引入
import { Modal } from '@idp-studio/design';
import '@idp-studio/design/lib/index.css';`}
                    </SyntaxHighlighter>
                </div>
            </div>
        </div>
    );
};

export default ModalExample;
