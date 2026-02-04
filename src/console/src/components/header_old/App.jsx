import { Menu, Space, Modal } from 'antd';
import { AppstoreOutlined } from '@ant-design/icons';
import { lastVisitApp } from './api/areaApi';

const App = () => {
  const appList = [{
    key: 'idp-lm',
    id: 10200,
    name: 'IDP LM',
    desc: '零代码大模型训推平台',
    path: '/lm/dataset',
    // url: 'http://106.75.37.208:8001/lm/modelmanagement',
  }, {
    key: 'idp-studio',
    id: 10100,
    name: 'IDP Studio',
    desc: '面向专业团队的 AI 开发平台',
    path: '/teamSpace',
    // url: 'http://106.75.37.208:8001/team/project',
  }, {
    key: 'ai-gallery',
    id: 10400,
    name: 'AI Gallery',
    desc: '模型\\模型服务\\算力市场',
    url: '/gallery',
  }];

  const children = () => {
    let list = [];
    for (const app of appList) {
      list.push({
        key: app.key,
        label: <div className="app-child">
          <Space size="middle">
            <span>{app.name}</span>
            <span style={{fontSize: '12px'}}>{app.desc}</span>
          </Space>
        </div>,
      });
    }
    return list;
  }

  const menuItem = [{
    key: 'app',
    label: '产品服务',
    icon: <AppstoreOutlined />,
    children: children(),
  }];

  const selectApp = ({ item, key }) => {
    const apps = appList.filter((item) => item.key === key);
    if (apps.length === 0) return;
    const app = apps[0];
    if (app.url) {
      window.location.href = app.url;
    } else {
      lastVisitApp(app.id).then((res) => {
        window.location.href = `${res.data.areaUrl}${app.path}`;
      }).catch((err) => {
        console.log(err);
        Modal.warning({
          content: <>使用 {`${app.name}`} 前请先<a href='/console/instancemanage/calculateinstance' target='_blank'>购买</a>实例</>
        });
      });
    }
  }

  return (
    <Menu
      theme="dark"
      mode="horizontal"
      items={menuItem}
      className="app-menu header-theme-productservice"
      getPopupContainer={(node) => node.parentNode}
      onClick={selectApp}
    />
  );
}

export default App;