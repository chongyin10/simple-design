# IDP Design 组件库使用指南

## 1. 简介

IDP Design 是一个基于 React 的现代化 UI 组件库，提供了一系列简洁、美观、易用的组件，适用于各种 Web 应用开发。

## 2. 安装

```bash
# 使用 npm 安装
npm i @zjpcy/simple-design

# 使用 yarn 安装
yarn add @zjpcy/simple-design
```

## 3. 组件文档

### 3.1 Button 按钮组件

#### 3.1.1 基本用法

```tsx
import React from 'react';
import { Button } from '@zjpcy/simple-design';

const App: React.FC = () => {
  return (
    <Button onClick={() => console.log('Button clicked')}>
      点击我
    </Button>
  );
};
```

#### 3.1.2 按钮变体

```tsx
import React from 'react';
import { Button } from '@zjpcy/simple-design';

const App: React.FC = () => {
  return (
    <div>
      <Button variant="primary">主要按钮</Button>
      <Button variant="secondary">次要按钮</Button>
      <Button variant="success">成功按钮</Button>
      <Button variant="warning">警告按钮</Button>
      <Button variant="danger">危险按钮</Button>
    </div>
  );
};
```

#### 3.1.3 按钮尺寸

```tsx
import React from 'react';
import { Button } from '@zjpcy/simple-design';

const App: React.FC = () => {
  return (
    <div>
      <Button size="small">小按钮</Button>
      <Button size="medium">中按钮</Button>
      <Button size="large">大按钮</Button>
    </div>
  );
};
```

#### 3.1.4 禁用状态

```tsx
import React from 'react';
import { Button } from '@zjpcy/simple-design';

const App: React.FC = () => {
  return (
    <Button disabled>
      禁用按钮
    </Button>
  );
};
```

#### 3.1.5 自定义样式

```tsx
import React from 'react';
import { Button } from '@zjpcy/simple-design';

const App: React.FC = () => {
  return (
    <Button 
      className="custom-button"
      style={{ borderRadius: '8px' }}
    >
      自定义按钮
    </Button>
  );
};
```

### 3.2 Marquee 公告栏组件

#### 3.2.1 基本用法

```tsx
import React from 'react';
import { Marquee } from '@zjpcy/simple-design';

const App: React.FC = () => {
  return <Marquee />;
};
```

#### 3.2.2 自定义公告内容

```tsx
import React from 'react';
import { Marquee } from '@zjpcy/simple-design';

const App: React.FC = () => {
  const customItems = [
    { id: '1', icon: 'fa-bullhorn', text: '欢迎使用 IDP Design 组件库！' },
    { id: '2', icon: 'fa-gift', text: '注册即送100积分！' },
    { id: '3', icon: 'fa-star', text: '全新会员体系已上线！' },
  ];

  return (
    <Marquee 
      items={customItems}
    />
  );
};
```

#### 3.2.3 自定义滚动速度

```tsx
import React from 'react';
import { Marquee } from '@zjpcy/simple-design';

const App: React.FC = () => {
  return (
    <Marquee 
      speed={50} // 提高滚动速度
    />
  );
};
```

#### 3.2.4 控制选项

```tsx
import React from 'react';
import { Marquee } from '@zjpcy/simple-design';

const App: React.FC = () => {
  return (
    <Marquee 
      showControls={true} // 显示控制按钮
      autoStart={false} // 不自动开始滚动
    />
  );
};
```

#### 3.2.5 关闭事件

```tsx
import React from 'react';
import { Marquee } from '@zjpcy/simple-design';

const App: React.FC = () => {
  const handleClose = () => {
    console.log('公告栏已关闭');
    // 执行关闭后的逻辑
  };

  return (
    <Marquee 
      onClose={handleClose}
    />
  );
};
```

### 3.3 Notification 通知提示组件

#### 3.3.1 基本用法

```tsx
import React from 'react';
import { Notification } from '@zjpcy/simple-design';

const App: React.FC = () => {
  return (
    <Notification 
      message="这是一条通知消息"
    />
  );
};
```

#### 3.3.2 通知类型

```tsx
import React from 'react';
import { Notification } from '@zjpcy/simple-design';

const App: React.FC = () => {
  return (
    <div>
      <Notification message="这是一条信息通知" type="info" />
      <Notification message="操作成功！" type="success" />
      <Notification message="警告：请检查输入" type="warning" />
      <Notification message="错误：操作失败" type="error" />
    </div>
  );
};
```

#### 3.3.3 自定义显示时长

```tsx
import React from 'react';
import { Notification } from '@zjpcy/simple-design';

const App: React.FC = () => {
  return (
    <Notification 
      message="这条通知将显示5秒" 
      duration={5000} // 5秒后自动关闭
    />
  );
};
```

### 3.4 Radio 单选框组件

#### 3.4.1 基本用法

```tsx
import React from 'react';
import { Radio } from '@zjpcy/simple-design';

const App: React.FC = () => {
  return (
    <Radio checked onChange={(checked) => console.log(checked)}>
      单选框
    </Radio>
  );
};
```

#### 3.4.2 组模式

```tsx
import React from 'react';
import { Radio } from '@zjpcy/simple-design';

const App: React.FC = () => {
  return (
    <Radio.Group>
      <Radio value="option1">选项 1</Radio>
      <Radio value="option2">选项 2</Radio>
      <Radio value="option3">选项 3</Radio>
    </Radio.Group>
  );
};
```

#### 3.4.3 不同类型

```tsx
import React from 'react';
import { Radio } from '@zjpcy/simple-design';

const App: React.FC = () => {
  return (
    <div>
      <div style={{ marginBottom: '20px' }}>
        <h4>默认类型</h4>
        <Radio.Group type="radio">
          <Radio value="option1">选项 1</Radio>
          <Radio value="option2">选项 2</Radio>
          <Radio value="option3">选项 3</Radio>
        </Radio.Group>
      </div>
      
      <div>
        <h4>按钮类型</h4>
        <Radio.Group type="button">
          <Radio value="option1">选项 1</Radio>
          <Radio value="option2">选项 2</Radio>
          <Radio value="option3">选项 3</Radio>
        </Radio.Group>
      </div>
    </div>
  );
};
```

#### 3.4.4 不同尺寸（按钮类型）

```tsx
import React from 'react';
import { Radio } from '@zjpcy/simple-design';

const App: React.FC = () => {
  return (
    <div>
      <div style={{ marginBottom: '10px' }}>
        <Radio.Group type="button" size="large">
          <Radio value="option1">大尺寸</Radio>
          <Radio value="option2">大尺寸</Radio>
          <Radio value="option3">大尺寸</Radio>
        </Radio.Group>
      </div>
      <div style={{ marginBottom: '10px' }}>
        <Radio.Group type="button" size="middle">
          <Radio value="option1">中尺寸</Radio>
          <Radio value="option2">中尺寸</Radio>
          <Radio value="option3">中尺寸</Radio>
        </Radio.Group>
      </div>
      <div>
        <Radio.Group type="button" size="small">
          <Radio value="option1">小尺寸</Radio>
          <Radio value="option2">小尺寸</Radio>
          <Radio value="option3">小尺寸</Radio>
        </Radio.Group>
      </div>
    </div>
  );
};
```

#### 3.4.5 禁用状态

```tsx
import React from 'react';
import { Radio } from '@zjpcy/simple-design';

const App: React.FC = () => {
  return (
    <div>
      <div style={{ marginBottom: '20px' }}>
        <Radio disabled>禁用的单个单选框</Radio>
      </div>
      
      <div style={{ marginBottom: '20px' }}>
        <Radio.Group disabled>
          <Radio value="option1">禁用的选项 1</Radio>
          <Radio value="option2">禁用的选项 2</Radio>
        </Radio.Group>
      </div>
      
      <div>
        <Radio.Group type="button">
          <Radio value="option1">可用选项 1</Radio>
          <Radio value="option2" disabled>禁用选项 2</Radio>
          <Radio value="option3">可用选项 3</Radio>
        </Radio.Group>
      </div>
    </div>
  );
};
```

#### 3.4.6 自定义宽高（按钮类型）

```tsx
import React from 'react';
import { Radio } from '@zjpcy/simple-design';

const App: React.FC = () => {
  return (
    <div>
      <div style={{ marginBottom: '10px' }}>
        <Radio.Group type="button" style={{ width: '300px' }}>
          <Radio value="option1">自定义宽度</Radio>
          <Radio value="option2">自定义宽度</Radio>
        </Radio.Group>
      </div>
      
      <div style={{ marginBottom: '10px' }}>
        <Radio.Group type="button">
          <Radio value="option1" style={{ width: '100px', height: '50px' }}>宽按钮</Radio>
          <Radio value="option2" style={{ width: '150px', height: '50px' }}>更宽的按钮</Radio>
          <Radio value="option3" style={{ width: '100px', height: '50px' }}>高按钮</Radio>
        </Radio.Group>
      </div>
      
      <div>
        <Radio.Group type="button">
          <Radio value="option1" style={{ height: '60px' }}>自定义高度</Radio>
          <Radio value="option2" style={{ height: '60px' }}>自定义高度</Radio>
        </Radio.Group>
      </div>
    </div>
  );
};
```

#### 3.4.7 受控模式

```tsx
import React, { useState } from 'react';
import { Radio } from '@zjpcy/simple-design';

const App: React.FC = () => {
  const [value, setValue] = useState<string>('option1');
  
  return (
    <div>
      <Radio.Group 
        value={value} 
        onChange={setValue}
      >
        <Radio value="option1">选项 1</Radio>
        <Radio value="option2">选项 2</Radio>
        <Radio value="option3">选项 3</Radio>
      </Radio.Group>
      <div style={{ marginTop: '10px', color: '#666' }}>
        当前选中值: <strong>{value}</strong>
      </div>
    </div>
  );
};
```

## 4. 组件 API

### 4.1 Button 组件 API

| 属性名 | 类型 | 默认值 | 描述 |
|--------|------|--------|------|
| children | React.ReactNode | - | 按钮内容 |
| variant | 'primary' \| 'secondary' \| 'danger' \| 'success' \| 'warning' | 'primary' | 按钮变体 |
| size | 'small' \| 'medium' \| 'large' | 'medium' | 按钮尺寸 |
| disabled | boolean | false | 是否禁用 |
| onClick | () => void | - | 点击事件回调 |
| className | string | - | 自定义类名 |
| style | React.CSSProperties | - | 自定义样式 |

### 4.2 Marquee 组件 API

| 属性名 | 类型 | 默认值 | 描述 |
|--------|------|--------|------|
| items | MarqueeItem[] | 默认公告数组 | 公告内容数组 |
| speed | number | 30 | 滚动速度 |
| showControls | boolean | true | 是否显示控制按钮 |
| autoStart | boolean | true | 是否自动开始滚动 |
| onClose | () => void | - | 关闭事件回调 |

### 4.3 Notification 组件 API

| 属性名 | 类型 | 默认值 | 描述 |
|--------|------|--------|------|
| message | string | - | 通知消息内容 |
| duration | number | 3000 | 显示时长（毫秒） |
| type | 'info' \| 'success' \| 'warning' \| 'error' | 'info' | 通知类型 |

### 4.4 Radio 组件 API

| 属性名 | 类型 | 默认值 | 描述 |
|--------|------|--------|------|
| value | any | - | Radio的值，用于Group模式下的选中判断 |
| checked | boolean | - | 是否选中（受控模式） |
| defaultChecked | boolean | false | 默认是否选中（非受控模式） |
| onChange | (checked: boolean, value: any) => void | - | 变化时的回调函数 |
| disabled | boolean | false | 是否禁用 |
| size | 'large' \| 'middle' \| 'small' | - | Radio的尺寸，优先使用Group传递的size |
| children | React.ReactNode | - | Radio的文本内容 |
| className | string | - | 自定义CSS类名 |
| style | React.CSSProperties | - | 自定义内联样式 |

### 4.5 Radio.Group 组件 API

| 属性名 | 类型 | 默认值 | 描述 |
|--------|------|--------|------|
| value | any | - | 当前选中的值（受控模式） |
| defaultValue | any | - | 默认选中的值（非受控模式） |
| onChange | (value: any) => void | - | 选中值变化时的回调函数 |
| disabled | boolean | false | 是否禁用所有子Radio |
| type | 'button' \| 'radio' | 'radio' | Radio组的类型，'button'为按钮样式，'radio'为默认样式 |
| size | 'large' \| 'middle' \| 'small' | 'middle' | Radio组的尺寸，仅对按钮样式生效 |
| children | React.ReactNode | - | 子Radio元素 |
| className | string | - | 自定义CSS类名 |
| style | React.CSSProperties | - | 自定义内联样式 |

## 5. 自定义样式

IDP Design 组件库支持通过 CSS 变量和自定义类名进行样式定制。

### 5.1 使用 CSS 变量

```css
/* 在项目的 CSS 文件中 */
:root {
  /* 按钮主色调 */
  --idp-btn-primary-bg: #1890ff;
  --idp-btn-primary-color: #fff;
  
  /* 公告栏背景 */
  --idp-marquee-bg: linear-gradient(90deg, #1a2980, #26d0ce);
  
  /* 通知颜色 */
  --idp-notification-info-bg: #e6f7ff;
  --idp-notification-success-bg: #f6ffed;
  --idp-notification-warning-bg: #fffbe6;
  --idp-notification-error-bg: #fff2f0;
}
```

### 5.2 使用自定义类名

```tsx
<Button className="my-custom-button">自定义按钮</Button>
```

```css
.my-custom-button {
  border-radius: 8px;
  font-weight: bold;
}
```

## 6. 贡献指南

欢迎参与 IDP Design 组件库的开发！

### 6.1 开发环境搭建

```bash
# 克隆仓库
git clone https://github.com/your-repo/@zjpcy/simple-design.git

# 安装依赖
cd @zjpcy/simple-design
npm install

# 启动开发服务器
npm run dev

# 构建组件库
npm run build
```

### 6.2 提交代码

1. 创建分支
2. 开发功能
3. 编写测试
4. 提交代码
5. 创建 Pull Request

## 7. 更新日志

### v1.0.0
- 初始版本
- 包含 Button 组件
- 包含 Marquee 公告栏组件
- 包含 Notification 通知组件

## 8. 许可证

MIT License

## 9. 联系方式

如有问题或建议，请通过以下方式联系我们：

- GitHub Issues: https://github.com/your-repo/@zjpcy/simple-design/issues
- 邮箱: support@idp-studio.com

---

感谢您使用 IDP Design 组件库！