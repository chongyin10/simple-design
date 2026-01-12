import Marquee from 'react-fast-marquee';
import React from 'react';
import './Notice.css'

interface NoticeProps {
    text?: string | React.ReactNode | React.ReactElement | React.ReactElement[] | (string | React.ReactNode)[];
    speed?: number;
    height?: number;
    styles?: React.CSSProperties;
    icon?: React.ReactNode | null;
    showCloseButton?: boolean;
    closeStyle?: React.CSSProperties; // 关闭按钮的样式
    floatingTop?: boolean;
    pauseOnHover?: boolean;
}

const Notice: React.FC<NoticeProps> = ({ text = "", speed = 50, height = 60,
    icon = null, styles = {}, closeStyle = {}, showCloseButton = false, floatingTop = false, pauseOnHover = true }) => {
    const [visible, setVisible] = React.useState(true);

    if (!text || !visible) return null;

    // 处理text为数组或字符串的不同情况
    const renderTextContent = () => {
        if (Array.isArray(text)) {
            // 当text为数组时，渲染数组中的所有元素
            return (
                <div style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>
                    {text.map((item, index) => (
                        <span key={index} style={{ marginRight: '15px', display: 'inline-block' }}>
                            {icon ? <span style={{ marginRight: '5px' }}>{icon}</span> : null}
                            {item}
                        </span>
                    ))}
                </div>
            );
        } else {
            // 当text为字符串或其他类型时，直接渲染
            return (
                <div style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>
                    <span>
                        {icon ? <span style={{ marginRight: '5px' }}>{icon}</span> : null}
                        {text}
                    </span>
                </div>
            );
        }
    };

    const handleClose = () => {
        setVisible(false);
    };

    return (
        <div className={`idp-notice ${floatingTop ? 'idp-notice-floating' : ''}`} style={{
            height: `${height}px`,
            ...styles
        }}>
            <Marquee pauseOnHover={pauseOnHover} speed={speed} gradient={false}>
                <span style={{ width: '1200px'}}></span>
                {renderTextContent()}
            </Marquee>
            {showCloseButton && (
                <div
                    className="idp-notice-close"
                    style={{ height: `${height}px`, ...closeStyle }}
                    onClick={handleClose}
                >
                    <span style={{ color: 'white', fontSize: '16px', fontWeight: 'bold' }}>×</span>
                </div>
            )}
        </div>
    );
};

export default Notice;