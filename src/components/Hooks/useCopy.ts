import React from "react";

const copy = async (url: string) => {
    if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(url);
    } else {
        // 降级方案：使用传统execCommand方法
        const textArea = document.createElement('textarea');
        textArea.style.position = 'fixed';
        textArea.style.top = textArea.style.left = '-100vh';
        textArea.style.opacity = '0';
        textArea.value = url;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
    }
}

function useCopy() {
    return React.useCallback(async (url: string) => await copy(url), []);
}

export default useCopy;