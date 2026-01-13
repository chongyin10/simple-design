import React, { useState } from 'react';
import { Button, Modal, Table, useI18n } from '../../components';
import type { Column } from '../../components/Table';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

const ModalExample: React.FC = () => {
    const { t } = useI18n();
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
        { dataIndex: 'param', title: t('PARAM_NAME'), width: '150px' },
        { dataIndex: 'type', title: t('TYPE'), width: '300px' },
        { dataIndex: 'default', title: t('DEFAULT_VALUE'), width: '150px' },
        { dataIndex: 'description', title: t('DESCRIPTION'), width: '300px' }
    ];

    const apiDataSource = [
        { param: 'visible', type: 'boolean', default: '-', description: t('MODAL_VISIBLE_DESC') },
        { param: 'title', type: 'string', default: "'标题'", description: t('MODAL_TITLE_DESC') },
        { param: 'width', type: 'number | string', default: '600', description: t('MODAL_WIDTH_DESC') },
        { param: 'height', type: 'number | string', default: '300', description: t('MODAL_HEIGHT_DESC') },
        { param: 'headerHeight', type: 'number | string', default: '40', description: t('MODAL_HEADER_HEIGHT_DESC') },
        { param: 'footerHeight', type: 'number | string', default: '60', description: t('MODAL_FOOTER_HEIGHT_DESC') },
        { param: 'confirmLoading', type: 'boolean', default: 'false', description: t('MODAL_CONFIRM_LOADING_DESC') },
        { param: 'direction', type: "'center' | 'top-right' | 'bottom-right' | 'normal'", default: "'normal'", description: t('MODAL_DIRECTION_DESC') },
        { param: 'top', type: 'number', default: '-', description: t('MODAL_TOP_DESC') },
        { param: 'footer', type: 'null | React.ReactNode', default: 'null', description: t('MODAL_FOOTER_DESC') },
        { param: 'onCancel', type: '() => void', default: '-', description: t('MODAL_ON_CANCEL_DESC') },
        { param: 'onOk', type: '() => void', default: '-', description: t('MODAL_ON_OK_DESC') },
        { param: 'children', type: 'React.ReactNode', default: '-', description: t('MODAL_CHILDREN_DESC') },
        { param: 'className', type: 'string', default: '-', description: t('CLASS_NAME_DESC') },
        { param: 'style', type: 'React.CSSProperties', default: '-', description: t('STYLE_DESC') },
        { param: 'getContainer', type: 'HTMLElement | (() => HTMLElement) | false', default: '() => document.body', description: t('MODAL_GET_CONTAINER_DESC') },
        { param: 'okText', type: 'string', default: "'确认'", description: t('MODAL_OK_TEXT_DESC') },
        { param: 'cancelText', type: 'string', default: "'取消'", description: t('MODAL_CANCEL_TEXT_DESC') },
        { param: 'maskStyle', type: 'React.CSSProperties', default: '-', description: t('MODAL_MASK_STYLE_DESC') },
        { param: 'maskClassName', type: 'string', default: '-', description: t('MODAL_MASK_CLASS_NAME_DESC') },
        { param: 'zIndex', type: 'number', default: '1000', description: t('MODAL_Z_INDEX_DESC') }
    ];

    return (
        <div style={{ padding: '20px' }}>
            <h2>Modal {t('COMPONENT')}</h2>
            <p>{t('MODAL_COMPONENT_DESC')}</p>

            <div style={{ marginBottom: '40px' }}>
                <h3>{t('BASIC_USAGE')}</h3>
                <p>{t('CLICK_BUTTON_OPEN_BASIC_MODAL')}</p>

                <div style={{ marginBottom: '20px' }}>
                    <Button variant="primary" onClick={() => setVisible(true)}>
                        {t('OPEN_BASIC_MODAL')}
                    </Button>
                </div>

                <Modal
                    visible={visible}
                    title={t('BASIC_MODAL')}
                    onCancel={() => setVisible(false)}
                    onOk={() => setVisible(false)}
                >
                    <p>{t('MODAL_CONTENT_AREA')}</p>
                    <p>{t('MODAL_CENTERED')}</p>
                </Modal>
            </div>

            <div style={{ marginBottom: '40px' }}>
                <h3>{t('CUSTOM_SIZE')}</h3>
                <p>{t('CAN_CUSTOMIZE_MODAL_WIDTH_HEIGHT')}</p>

                <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
                    <Button variant="primary" onClick={() => setVisible2(true)}>
                        {t('SMALL_SIZE_MODAL')}
                    </Button>
                    <Button variant="primary" onClick={() => setVisible3(true)}>
                        {t('LARGE_SIZE_MODAL')}
                    </Button>
                </div>

                <Modal
                    visible={visible2}
                    title={t('SMALL_SIZE_MODAL')}
                    width={400}
                    onCancel={() => setVisible2(false)}
                    onOk={() => setVisible2(false)}
                >
                    <p>{t('SMALL_SIZE_MODAL_CONTENT')}</p>
                </Modal>

                <Modal
                    visible={visible3}
                    title={t('LARGE_SIZE_MODAL')}
                    width={800}
                    height={500}
                    onCancel={() => setVisible3(false)}
                    onOk={() => setVisible3(false)}
                >
                    <p>{t('LARGE_SIZE_MODAL_CONTENT')}</p>
                    <p>{t('CAN_PLACE_MORE_CONTENT')}</p>
                    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '4px', marginTop: '10px' }}>
                        <p>示例内容块...</p>
                        <p>示例内容块...</p>
                        <p>示例内容块...</p>
                    </div>
                </Modal>
            </div>

            <div style={{ marginBottom: '40px' }}>
                <h3>{t('ASYNC_CONFIRMATION')}</h3>
                <p>{t('CLICK_CONFIRM_TO_PERFORM_ASYNC_OPERATION')}</p>

                <div style={{ marginBottom: '20px' }}>
                    <Button variant="primary" onClick={() => setVisible4(true)}>
                        {t('ASYNC_CONFIRMATION_MODAL')}
                    </Button>
                </div>

                <Modal
                    visible={visible4}
                    title={t('ASYNC_CONFIRMATION')}
                    confirmLoading={confirmLoading}
                    onCancel={() => !confirmLoading && setVisible4(false)}
                    onOk={handleOk}
                >
                    <p>{t('AFTER_CLICK_CONFIRM_BUTTON')}</p>
                    <p>{t('MODAL_WILL_AUTOMATICALLY_CLOSE_AFTER_OPERATION_COMPLETE')}</p>
                </Modal>
            </div>

            <div style={{ marginBottom: '40px' }}>
                <h3>{t('CONTENT_HEIGHT_AUTO_ADJUSTMENT')}</h3>
                <p>{t('WHEN_HEIGHT_NOT_SET_CONTENT_AREA_ADAPTS')}</p>

                <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
                    <Button variant="primary" onClick={() => setVisible5(true)}>
                        {t('AUTO_ADJUST_HEIGHT')}
                    </Button>
                    <Button variant="primary" onClick={() => setVisible6(true)}>
                        {t('CONTENT_SCROLL_EXAMPLE')}
                    </Button>
                </div>

                <Modal
                    visible={visible5}
                    title={t('AUTO_ADJUST_HEIGHT_MODAL')}
                    width={600}
                    onCancel={() => setVisible5(false)}
                    onOk={() => setVisible5(false)}
                >
                    <p>{t('THIS_IS_A_MODAL_WITHOUT_HEIGHT_SET')}</p>
                    <p>{t('YOU_CAN_ADD_MORE_CONTENT_TO_TEST_ADAPTIVE_EFFECT')}</p>
                    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '4px', marginTop: '10px' }}>
                        <h4>测试内容</h4>
                        <p>这是一段测试文本，用于演示内容自适应高度的效果。</p>
                        <p>当内容较少时，弹窗高度会自动收缩；当内容较多时，弹窗高度会自动扩展。</p>
                    </div>
                </Modal>

                <Modal
                    visible={visible6}
                    title={t('CONTENT_SCROLL_MODAL')}
                    width={600}
                    height={300}
                    headerHeight={50}
                    footerHeight={50}
                    onCancel={() => setVisible6(false)}
                    onOk={() => setVisible6(false)}
                >
                    <h4>{t('LONG_CONTENT_TEST')}</h4>
                    <p>{t('THIS_IS_A_MODAL_WITH_FIXED_HEIGHT')}</p>
                    <p>{t('WHEN_CONTENT_EXCEEDS_CALCULATED_HEIGHT')}</p>
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
                <h3>{t('ANIMATION_DIRECTION_DEMONSTRATION')}</h3>
                <p>{t('SUPPORT_FOUR_ANIMATION_DIRECTIONS')}</p>

                <div style={{ marginBottom: '20px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                    <Button variant="primary" onClick={() => setVisible7(true)}>
                        {t('CENTER_ANIMATION')}
                    </Button>
                    <Button variant="primary" onClick={() => setVisible8(true)}>
                        {t('TOP_RIGHT_ANIMATION')}
                    </Button>
                    <Button variant="primary" onClick={() => setVisible9(true)}>
                        {t('BOTTOM_RIGHT_ANIMATION')}
                    </Button>
                    <Button variant="primary" onClick={() => setVisible10(true)}>
                        {t('NORMAL_ANIMATION')}
                    </Button>
                </div>

                <Modal
                    visible={visible7}
                    title={t('CENTER_ANIMATION')}
                    width={500}
                    direction="center"
                    onCancel={() => setVisible7(false)}
                    onOk={() => setVisible7(false)}
                >
                    <p>{t('OPEN_FROM_CENTER_POINT_ENLARGE')}</p>
                    <p>{t('CLOSE_FROM_CENTER_POINT_SHRINK')}</p>
                </Modal>

                <Modal
                    visible={visible8}
                    title={t('TOP_RIGHT_ANIMATION')}
                    width={500}
                    direction="top-right"
                    onCancel={() => setVisible8(false)}
                    onOk={() => setVisible8(false)}
                >
                    <p>{t('OPEN_FROM_TOP_RIGHT_MOVE_AND_ENLARGE')}</p>
                    <p>{t('CLOSE_TO_TOP_RIGHT_MOVE_AND_SHRINK')}</p>
                </Modal>

                <Modal
                    visible={visible9}
                    title={t('BOTTOM_RIGHT_ANIMATION')}
                    width={500}
                    direction="bottom-right"
                    onCancel={() => setVisible9(false)}
                    onOk={() => setVisible9(false)}
                >
                    <p>{t('OPEN_FROM_BOTTOM_RIGHT_MOVE_AND_ENLARGE')}</p>
                    <p>{t('CLOSE_TO_BOTTOM_RIGHT_MOVE_AND_SHRINK')}</p>
                </Modal>

                <Modal
                    visible={visible10}
                    title={t('NORMAL_ANIMATION')}
                    width={500}
                    direction="normal"
                    onCancel={() => setVisible10(false)}
                    onOk={() => setVisible10(false)}
                >
                    <p>{t('OPEN_SLIGHTLY_ENLARGE_AND_FADE_IN')}</p>
                    <p>{t('CLOSE_SLIGHTLY_SHRINK_AND_FADE_OUT')}</p>
                </Modal>
            </div>

            <div style={{ marginBottom: '40px' }}>
                <h3>{t('CUSTOM_TOP_POSITION')}</h3>
                <p>{t('THROUGH_TOP_PARAM_CUSTOMIZE_MODAL_DISTANCE_FROM_TOP')}</p>

                <div style={{ marginBottom: '20px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                    <Button variant="primary" onClick={() => setVisible11(true)}>
                        {t('CUSTOM_TOP_POSITION')}
                    </Button>
                    <Button variant="primary" onClick={() => setVisible12(true)}>
                        {t('USE_TOP_AND_DIRECTION_SIMULTANEOUSLY')}
                    </Button>
                </div>

                <Modal
                    visible={visible11}
                    title={t('CUSTOM_TOP_POSITION')}
                    width={500}
                    top={100}
                    onCancel={() => setVisible11(false)}
                    onOk={() => setVisible11(false)}
                >
                    <p>{t('THIS_MODAL_IS_100PX_FROM_TOP')}</p>
                    <p>{t('USE_TOP_PARAM_TO_CUSTOMIZE_MODAL_VERTICAL_POSITION')}</p>
                </Modal>

                <Modal
                    visible={visible12}
                    title={t('USE_TOP_AND_DIRECTION_SIMULTANEOUSLY')}
                    width={500}
                    top={200}
                    direction="top-right"
                    onCancel={() => setVisible12(false)}
                    onOk={() => setVisible12(false)}
                >
                    <p>{t('THIS_MODAL_IS_200PX_FROM_TOP')}</p>
                    <p>{t('ALTHOUGH_DIRECTION_TOP_RIGHT_SET_BUT_DUE_TO_TOP_PARAM')}</p>
                </Modal>
            </div>

            <div style={{ marginBottom: '40px' }}>
                <h3>{t('CUSTOM_FOOTER')}</h3>
                <p>{t('CAN_CUSTOMIZE_BOTTOM_BUTTONS_THROUGH_FOOTER_PARAM')}</p>

                <div style={{ marginBottom: '20px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                    <Button variant="primary" onClick={() => setVisible13(true)}>
                        {t('CUSTOM_FOOTER')}
                    </Button>
                </div>

                <Modal
                    visible={visible13}
                    title={t('CUSTOM_FOOTER_MODAL')}
                    width={500}
                    onCancel={() => setVisible13(false)}
                    footer={[
                        <Button key="cancel" variant="secondary" onClick={() => setVisible13(false)}>
                            {t('CANCEL')}
                        </Button>,
                        <Button key="save" variant="primary" onClick={() => setVisible13(false)}>
                            {t('SAVE')}
                        </Button>,
                        <Button key="delete" variant="danger" onClick={() => setVisible13(false)}>
                            {t('DELETE')}
                        </Button>
                    ]}
                >
                    <p>{t('THIS_IS_A_MODAL_WITH_CUSTOM_FOOTER')}</p>
                    <p>{t('YOU_CAN_CUSTOMIZE_FOOTER_CONTENT_AND_STYLE')}</p>
                </Modal>
            </div>

            <div style={{ marginBottom: '40px' }}>
                <h3>{t('CUSTOM_MOUNT_CONTAINER')}</h3>
                <p>{t('CAN_SPECIFY_MODAL_MOUNT_HTML_NODE_THROUGH_GET_CONTAINER_PARAM')}</p>

                <div style={{ marginBottom: '20px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                    <Button variant="primary" onClick={() => setVisible14(true)}>
                        {t('MOUNT_IN_CURRENT_DOM')}
                    </Button>
                    <Button variant="primary" onClick={() => setVisible15(true)}>
                        {t('MOUNT_IN_CUSTOM_CONTAINER')}
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
                    <p style={{ color: '#606266', fontSize: '14px' }}>{t('THIS_IS_A_CUSTOM_MOUNT_CONTAINER')}</p>
                    <p style={{ color: '#606266', fontSize: '14px' }}>{t('CLICK_MOUNT_IN_CUSTOM_CONTAINER_BUTTON')}</p>
                </div>

                {/* 挂载在当前 DOM */}
                <Modal
                    visible={visible14}
                    title={t('MOUNT_IN_CURRENT_DOM')}
                    width={500}
                    getContainer={false}
                    onCancel={() => setVisible14(false)}
                    onOk={() => setVisible14(false)}
                >
                    <p>{t('THIS_MODAL_IS_MOUNTED_IN_CURRENT_DOM')}</p>
                    <p>{t('CAN_ACHIEVE_THIS_EFFECT_THROUGH_GET_CONTAINER_FALSE')}</p>
                </Modal>

                {/* 挂载在自定义容器 */}
                <Modal
                    visible={visible15}
                    title={t('MOUNT_IN_CUSTOM_CONTAINER')}
                    width={400}
                    getContainer={() => customContainerRef.current || document.body}
                    onCancel={() => setVisible15(false)}
                    onOk={() => setVisible15(false)}
                >
                    <p>{t('THIS_MODAL_IS_MOUNTED_IN_CUSTOM_CONTAINER')}</p>
                    <p>{t('CAN_SPECIFY_MOUNTED_HTML_NODE_THROUGH_GET_CONTAINER_PROPERTY')}</p>
                </Modal>
            </div>

            <div style={{ marginBottom: '40px' }}>
                <h3>{t('CUSTOM_MASK_BACKGROUND_COLOR')}</h3>
                <p>{t('CAN_CUSTOMIZE_MASK_BACKGROUND_COLOR_AND_OTHER_STYLES')}</p>

                <div style={{ marginBottom: '20px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                    <Button variant="primary" onClick={() => setVisible16(true)}>
                        {t('CUSTOM_MASK_BACKGROUND_COLOR')}
                    </Button>
                </div>

                {/* 自定义遮罩背景色 */}
                <Modal
                    visible={visible16}
                    title={t('CUSTOM_MASK_BACKGROUND_COLOR')}
                    width={500}
                    maskStyle={{ backgroundColor: 'rgba(255, 100, 100, 0.7)' }}
                    onCancel={() => setVisible16(false)}
                    onOk={() => setVisible16(false)}
                >
                    <p>{t('THIS_MODAL_MASK_USES_CUSTOM_BACKGROUND_COLOR')}</p>
                    <p>{t('CAN_SET_VARIOUS_STYLES_OF_MASK_THROUGH_MASK_STYLE_PROPERTY')}</p>
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
                <h3>{t('CUSTOM_ZINDEX')}</h3>
                <p>{t('CAN_SET_MASK_LAYER_LEVEL_THROUGH_ZINDEX_PROPERTY')}</p>

                <div style={{ marginBottom: '20px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                    <Button variant="primary" onClick={() => setVisible17(true)}>
                        {t('OPEN_FIRST_MODAL')}
                    </Button>
                </div>

                {/* 第一个Modal，使用默认zIndex(1000) */}
                <Modal
                    visible={visible17}
                    title={t('FIRST_MODAL_ZINDEX_1000')}
                    width={600}
                    onCancel={() => setVisible17(false)}
                    footer={[
                        <Button key="close" variant="secondary" onClick={() => setVisible17(false)}>
                            {t('CLOSE')}
                        </Button>,
                        <Button key="open" variant="primary" onClick={() => setVisible18(true)}>
                            {t('OPEN_SECOND_MODAL')}
                        </Button>
                    ]}
                >
                    <p>{t('THIS_IS_THE_FIRST_MODAL_USING_DEFAULT_ZINDEX_1000')}</p>
                    <p>{t('CLICK_OPEN_SECOND_MODAL_BUTTON_TO_POP_UP_SECOND_MODAL')}</p>
                </Modal>

                {/* 第二个Modal，使用更高的zIndex(1010) */}
                <Modal
                    visible={visible18}
                    title={t('SECOND_MODAL_ZINDEX_1010')}
                    width={500}
                    zIndex={1010}
                    onCancel={() => setVisible18(false)}
                    onOk={() => setVisible18(false)}
                >
                    <p>{t('THIS_IS_THE_SECOND_MODAL_USING_HIGHER_ZINDEX_1010')}</p>
                    <p>{t('DUE_TO_HIGHER_ZINDEX_IT_WILL_DISPLAY_ABOVE_FIRST_MODAL')}</p>
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
                <h3>{t('API_PARAMETERS')}</h3>
                <Table pagination={false} columns={apiColumns} dataSource={apiDataSource} />
            </div>

            <div style={{ marginBottom: '40px' }}>
                <h3>{t('CODE_EXAMPLES')}</h3>
                <SyntaxHighlighter language="tsx" style={vscDarkPlus} customStyle={{ borderRadius: '6px', margin: '0' }}>
{`import { Modal } from '@zjpcy/simple-design';
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
                        {`npm i @zjpcy/simple-design`}
                    </SyntaxHighlighter>
                </div>
                <div>
                    <h4>2. 引用组件</h4>
                    <SyntaxHighlighter language="tsx" style={vscDarkPlus} customStyle={{ borderRadius: '6px', margin: '0', fontSize: '14px', fontFamily: 'monospace' }}>
{`// 方式一：单独引入
import Modal from '@zjpcy/simple-design/lib/Modal';
import '@zjpcy/simple-design/lib/Modal/Modal.css';

// 方式二：批量引入
import { Modal } from '@zjpcy/simple-design';
import '@zjpcy/simple-design/lib/index.css';`}
                    </SyntaxHighlighter>
                </div>
            </div>
        </div>
    );
};

export default ModalExample;
