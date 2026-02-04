require('../public-path');
import React from "react"
import { createRoot } from 'react-dom/client';
import App from "./pages/App"
import "antd/dist/antd.less"
import "minireset.css"
import { Provider } from "react-redux"
import { store } from "./store"
import { ConfigProvider } from "antd"
import zhCN from 'antd/lib/locale/zh_CN';
import enUS from 'antd/lib/locale/en_US';
import moment from 'moment';
import 'moment/locale/zh-cn';
import cookie from "react-cookies"
import StyleGeneral from "./StyleGeneral";
import Theme from "./Theme";

import './global.less';

ConfigProvider.config({
    theme: {
        primaryColor: "#25b864",
    },
})

moment.locale('zh-cn');

let root = null;

function render(props) {
    const { container } = props;
    const containerDom = container ? container.querySelector('#root') : document.querySelector('#root');
    root = createRoot(containerDom);

    root.render(
        <ConfigProvider locale={cookie.load('locale') === 'enUS' ? enUS : zhCN}>
            <Provider store={store}>
                <StyleGeneral>
                    <App />
                </StyleGeneral>
            </Provider>
        </ConfigProvider>
    );
}

if (!window.__POWERED_BY_QIANKUN__) {
    try {
        const globalConfig = require('../../main/static/config.json');
        window.globalConfig = globalConfig;
    } catch (error) { }
    render({});
}

export async function bootstrap() { }

export async function mount(props) {
    render(props);
}

export async function unmount(props) {
    const { container } = props;
    root.unmount(container ? container.querySelector('#root') : document.querySelector('#root'));
}
