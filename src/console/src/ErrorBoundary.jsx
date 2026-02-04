import React, { Component } from 'react';
import { Result } from 'antd';

class ErrorBoundary extends Component {

    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        // 更新状态允许渲染错误界面
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        // 你可以在这里将错误信息发送到一个错误跟踪服务
        console.error('@@@@', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return <Result
                status="404"
                title="404"
                subTitle={'对不起，你访问的页面不存在或出现问题'}
            />;
        }
        return this.props.children;
    }
}

export default ErrorBoundary;