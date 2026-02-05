import React, { useState } from 'react';
import { Input, Button } from '../../components';
import Form from '../../components/Form';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

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

const DemoBox: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div style={{ padding: '24px', border: '1px solid #d9d9d9', borderRadius: '4px', marginBottom: '16px' }}>
    {children}
  </div>
);

const FormExample: React.FC = () => {
  const [form] = useState<any>(null);

  const handleHorizontalFinish = (values: any) => {
    console.log('Horizontal form values:', values);
  };

  const handleVerticalFinish = (values: any) => {
    console.log('Vertical form values:', values);
  };

  const handleInlineFinish = (values: any) => {
    console.log('Inline form values:', values);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Form 表单</h1>
      <p>具有数据收集、校验和提交功能的表单。</p>

      <Section title="基础用法">
        <DemoBox>
          <Form
            layout="horizontal"
            labelCol={5}
            wrapperCol={19}
            initialValues={{ username: '', password: '' }}
            onFinish={handleHorizontalFinish}
          >
            <Form.Item
              name="username"
              label="用户名"
              rules={[{ required: true, message: '请输入用户名' }]}
            >
              <Input placeholder="请输入用户名" />
            </Form.Item>
            <Form.Item
              name="password"
              label="密码"
              rules={[
                { required: true, message: '请输入密码' },
                { min: 6, message: '密码至少6位' }
              ]}
            >
              <Input type="password" placeholder="请输入密码" />
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 5, span: 19 }}>
              <Button variant="primary" type="submit">提交</Button>
            </Form.Item>
          </Form>
        </DemoBox>
        <CopyBlock code={`import { Form, Input, Button } from '@idp/design';

const Demo = () => {
  const onFinish = (values) => {
    console.log('表单值:', values);
  };

  return (
    <Form
      layout="horizontal"
      labelCol={5}
      wrapperCol={19}
      initialValues={{ username: '', password: '' }}
      onFinish={onFinish}
    >
      <Form.Item
        name="username"
        label="用户名"
        rules={[{ required: true, message: '请输入用户名' }]}
      >
        <Input placeholder="请输入用户名" />
      </Form.Item>
      <Form.Item
        name="password"
        label="密码"
        rules={[
          { required: true, message: '请输入密码' },
          { min: 6, message: '密码至少6位' }
        ]}
      >
        <Input type="password" placeholder="请输入密码" />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 5, span: 19 }}>
        <Button variant="primary" type="submit">提交</Button>
      </Form.Item>
    </Form>
  );
};`} />
      </Section>

      <Section title="垂直布局">
        <DemoBox>
          <Form
            layout="vertical"
            initialValues={{ email: '', phone: '' }}
            onFinish={handleVerticalFinish}
          >
            <Form.Item
              name="email"
              label="邮箱"
              rules={[
                { required: true, message: '请输入邮箱' },
                { type: 'email', message: '请输入有效的邮箱地址' }
              ]}
            >
              <Input placeholder="请输入邮箱" />
            </Form.Item>
            <Form.Item
              name="phone"
              label="手机号"
              rules={[
                { required: true, message: '请输入手机号' },
                { pattern: /^1[3-9]\d{9}$/, message: '请输入有效的手机号' }
              ]}
            >
              <Input placeholder="请输入手机号" />
            </Form.Item>
            <Form.Item>
              <Button variant="primary" type="submit">提交</Button>
            </Form.Item>
          </Form>
        </DemoBox>
        <CopyBlock code={`import { Form, Input, Button } from '@idp/design';

const Demo = () => {
  const onFinish = (values) => {
    console.log('表单值:', values);
  };

  return (
    <Form
      layout="vertical"
      initialValues={{ email: '', phone: '' }}
      onFinish={onFinish}
    >
      <Form.Item
        name="email"
        label="邮箱"
        rules={[
          { required: true, message: '请输入邮箱' },
          { type: 'email', message: '请输入有效的邮箱地址' }
        ]}
      >
        <Input placeholder="请输入邮箱" />
      </Form.Item>
      <Form.Item
        name="phone"
        label="手机号"
        rules={[
          { required: true, message: '请输入手机号' },
          { pattern: /^1[3-9]\\d{9}$/, message: '请输入有效的手机号' }
        ]}
      >
        <Input placeholder="请输入手机号" />
      </Form.Item>
      <Form.Item>
        <Button variant="primary" type="submit">提交</Button>
      </Form.Item>
    </Form>
  );
};`} />
      </Section>

      <Section title="行内布局">
        <DemoBox>
          <Form
            layout="inline"
            initialValues={{ keyword: '' }}
            onFinish={handleInlineFinish}
          >
            <Form.Item
              name="keyword"
              label="关键词"
              rules={[{ required: true, message: '请输入关键词' }]}
            >
              <Input placeholder="请输入关键词" />
            </Form.Item>
            <Form.Item>
              <Button variant="primary" type="submit">搜索</Button>
            </Form.Item>
          </Form>
        </DemoBox>
        <CopyBlock code={`import { Form, Input, Button } from '@idp/design';

const Demo = () => {
  const onFinish = (values) => {
    console.log('表单值:', values);
  };

  return (
    <Form
      layout="inline"
      initialValues={{ keyword: '' }}
      onFinish={onFinish}
    >
      <Form.Item
        name="keyword"
        label="关键词"
        rules={[{ required: true, message: '请输入关键词' }]}
      >
        <Input placeholder="请输入关键词" />
      </Form.Item>
      <Form.Item>
        <Button variant="primary" type="submit">搜索</Button>
      </Form.Item>
    </Form>
  );
};`} />
      </Section>

      <Section title="表单验证">
        <DemoBox>
          <Form
            layout="horizontal"
            labelCol={5}
            wrapperCol={19}
            initialValues={{
              username: '',
              email: '',
              age: '',
              website: ''
            }}
            onFinish={(values) => console.log('验证通过:', values)}
          >
            <Form.Item
              name="username"
              label="用户名"
              rules={[
                { required: true, message: '请输入用户名' },
                { min: 3, max: 16, message: '用户名长度为3-16位' }
              ]}
            >
              <Input placeholder="3-16位字符" />
            </Form.Item>
            <Form.Item
              name="email"
              label="邮箱"
              rules={[
                { required: true, message: '请输入邮箱' },
                { type: 'email', message: '请输入有效的邮箱地址' }
              ]}
            >
              <Input placeholder="example@email.com" />
            </Form.Item>
            <Form.Item
              name="age"
              label="年龄"
              rules={[
                { required: true, message: '请输入年龄' },
                { type: 'number', message: '请输入有效的数字' }
              ]}
            >
              <Input placeholder="请输入年龄" />
            </Form.Item>
            <Form.Item
              name="website"
              label="网站"
              rules={[
                { required: true, message: '请输入网站地址' },
                { type: 'url', message: '请输入有效的URL地址' }
              ]}
            >
              <Input placeholder="https://example.com" />
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 5, span: 19 }}>
              <Button variant="primary" type="submit">提交</Button>
            </Form.Item>
          </Form>
        </DemoBox>
        <CopyBlock code={`import { Form, Input, Button } from '@idp/design';

const Demo = () => {
  return (
    <Form
      layout="horizontal"
      labelCol={5}
      wrapperCol={19}
      onFinish={(values) => console.log('验证通过:', values)}
    >
      <Form.Item
        name="username"
        label="用户名"
        rules={[
          { required: true, message: '请输入用户名' },
          { min: 3, max: 16, message: '用户名长度为3-16位' }
        ]}
      >
        <Input placeholder="3-16位字符" />
      </Form.Item>
      <Form.Item
        name="email"
        label="邮箱"
        rules={[
          { required: true, message: '请输入邮箱' },
          { type: 'email', message: '请输入有效的邮箱地址' }
        ]}
      >
        <Input placeholder="example@email.com" />
      </Form.Item>
      <Form.Item
        name="age"
        label="年龄"
        rules={[
          { required: true, message: '请输入年龄' },
          { type: 'number', message: '请输入有效的数字' }
        ]}
      >
        <Input placeholder="请输入年龄" />
      </Form.Item>
      <Form.Item
        name="website"
        label="网站"
        rules={[
          { required: true, message: '请输入网站地址' },
          { type: 'url', message: '请输入有效的URL地址' }
        ]}
      >
        <Input placeholder="https://example.com" />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 5, span: 19 }}>
        <Button variant="primary" type="submit">提交</Button>
      </Form.Item>
    </Form>
  );
};`} />
      </Section>

      <Section title="自定义校验">
        <DemoBox>
          <Form
            layout="horizontal"
            labelCol={5}
            wrapperCol={19}
            initialValues={{ password: '', confirmPassword: '' }}
            onFinish={(values) => console.log('验证通过:', values)}
          >
            <Form.Item
              name="password"
              label="密码"
              rules={[
                { required: true, message: '请输入密码' },
                { min: 6, message: '密码至少6位' }
              ]}
            >
              <Input type="password" placeholder="请输入密码" />
            </Form.Item>
            <Form.Item
              name="confirmPassword"
              label="确认密码"
              rules={[
                { required: true, message: '请确认密码' },
                {
                  validator: async (_rule, value) => {
                    const formValues = form?.getFieldsValue() || {};
                    if (value !== formValues.password) {
                      throw new Error('两次输入的密码不一致');
                    }
                  }
                }
              ]}
            >
              <Input type="password" placeholder="请再次输入密码" />
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 5, span: 19 }}>
              <Button variant="primary" type="submit">提交</Button>
            </Form.Item>
          </Form>
        </DemoBox>
        <CopyBlock code={`import { Form, Input, Button } from '@idp/design';

const Demo = () => {
  return (
    <Form
      layout="horizontal"
      labelCol={5}
      wrapperCol={19}
      onFinish={(values) => console.log('验证通过:', values)}
    >
      <Form.Item
        name="password"
        label="密码"
        rules={[
          { required: true, message: '请输入密码' },
          { min: 6, message: '密码至少6位' }
        ]}
      >
        <Input type="password" placeholder="请输入密码" />
      </Form.Item>
      <Form.Item
        name="confirmPassword"
        label="确认密码"
        rules={[
          { required: true, message: '请确认密码' },
          {
            validator: async (_rule, value) => {
              const formValues = form?.getFieldsValue() || {};
              if (value !== formValues.password) {
                throw new Error('两次输入的密码不一致');
              }
            }
          }
        ]}
      >
        <Input type="password" placeholder="请再次输入密码" />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 5, span: 19 }}>
        <Button variant="primary" type="submit">提交</Button>
      </Form.Item>
    </Form>
  );
};`} />
      </Section>

      <Section title="帮助文本">
        <DemoBox>
          <Form
            layout="horizontal"
            labelCol={5}
            wrapperCol={19}
            initialValues={{ username: '', email: '' }}
            onFinish={(values) => console.log('表单值:', values)}
          >
            <Form.Item
              name="username"
              label="用户名"
              help="用户名将用于登录系统"
              rules={[{ required: true, message: '请输入用户名' }]}
            >
              <Input placeholder="请输入用户名" />
            </Form.Item>
            <Form.Item
              name="email"
              label="邮箱"
              extra="我们将向您的邮箱发送验证邮件"
              rules={[{ required: true, message: '请输入邮箱' }]}
            >
              <Input placeholder="请输入邮箱" />
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 5, span: 19 }}>
              <Button variant="primary" type="submit">提交</Button>
            </Form.Item>
          </Form>
        </DemoBox>
        <CopyBlock code={`import { Form, Input, Button } from '@idp/design';

const Demo = () => {
  return (
    <Form
      layout="horizontal"
      labelCol={5}
      wrapperCol={19}
      onFinish={(values) => console.log('表单值:', values)}
    >
      <Form.Item
        name="username"
        label="用户名"
        help="用户名将用于登录系统"
        rules={[{ required: true, message: '请输入用户名' }]}
      >
        <Input placeholder="请输入用户名" />
      </Form.Item>
      <Form.Item
        name="email"
        label="邮箱"
        extra="我们将向您的邮箱发送验证邮件"
        rules={[{ required: true, message: '请输入邮箱' }]}
      >
        <Input placeholder="请输入邮箱" />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 5, span: 19 }}>
        <Button variant="primary" type="submit">提交</Button>
      </Form.Item>
    </Form>
  );
};`} />
      </Section>

      <Section title="API">
        <h3>Form Props</h3>
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
            <tr>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>layout</td>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>表单布局</td>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>'horizontal' | 'vertical' | 'inline'</td>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>'horizontal'</td>
            </tr>
            <tr>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>labelCol</td>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>label 标签布局</td>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>number</td>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>5</td>
            </tr>
            <tr>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>wrapperCol</td>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>需要为输入控件设置布局样式时</td>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>number</td>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>19</td>
            </tr>
            <tr>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>initialValues</td>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>表单默认值</td>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>Record&lt;string, any&gt;</td>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>{}</td>
            </tr>
            <tr>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>onFinish</td>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>提交表单且数据验证成功后回调事件</td>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>(values: Record&lt;string, any&gt;) =&gt; void</td>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>-</td>
            </tr>
            <tr>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>onFinishFailed</td>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>提交表单且数据验证失败后回调事件</td>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>(errorInfo: any) =&gt; void</td>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>-</td>
            </tr>
            <tr>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>colon</td>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>配置 label 的冒号</td>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>boolean</td>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>true</td>
            </tr>
            <tr>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>requiredMark</td>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>必选样式</td>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>boolean | 'optional'</td>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>true</td>
            </tr>
          </tbody>
        </table>

        <h3>Form.Item Props</h3>
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
            <tr>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>name</td>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>字段名</td>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>string</td>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>-</td>
            </tr>
            <tr>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>label</td>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>label 标签的文本</td>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>ReactNode</td>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>-</td>
            </tr>
            <tr>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>required</td>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>是否必填</td>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>boolean</td>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>false</td>
            </tr>
            <tr>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>rules</td>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>校验规则</td>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>Rule[]</td>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>-</td>
            </tr>
            <tr>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>help</td>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>提示信息</td>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>ReactNode</td>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>-</td>
            </tr>
            <tr>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>extra</td>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>额外提示信息</td>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>ReactNode</td>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>-</td>
            </tr>
            <tr>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>validateStatus</td>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>校验状态</td>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>'success' | 'warning' | 'error' | 'validating'</td>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>-</td>
            </tr>
            <tr>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>colon</td>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>配置 label 的冒号</td>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>boolean</td>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>-</td>
            </tr>
            <tr>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>hidden</td>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>是否隐藏</td>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>boolean</td>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>false</td>
            </tr>
          </tbody>
        </table>

        <h3>Rule</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#f5f5f5' }}>
              <th style={{ border: '1px solid #d9d9d9', padding: '8px', textAlign: 'left' }}>属性</th>
              <th style={{ border: '1px solid #d9d9d9', padding: '8px', textAlign: 'left' }}>说明</th>
              <th style={{ border: '1px solid #d9d9d9', padding: '8px', textAlign: 'left' }}>类型</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>required</td>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>是否必填</td>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>boolean</td>
            </tr>
            <tr>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>message</td>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>校验失败提示信息</td>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>string</td>
            </tr>
            <tr>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>pattern</td>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>正则表达式校验</td>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>RegExp</td>
            </tr>
            <tr>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>min</td>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>最小长度</td>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>number</td>
            </tr>
            <tr>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>max</td>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>最大长度</td>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>number</td>
            </tr>
            <tr>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>len</td>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>字段长度</td>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>number</td>
            </tr>
            <tr>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>type</td>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>类型校验</td>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>'string' | 'number' | 'boolean' | 'method' | 'regexp' | 'integer' | 'float' | 'array' | 'object' | 'enum' | 'date' | 'url' | 'hex' | 'email'</td>
            </tr>
            <tr>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>validator</td>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>自定义校验函数</td>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>(rule: Rule, value: any) =&gt; Promise&lt;void&gt; | void</td>
            </tr>
          </tbody>
        </table>
      </Section>
    </div>
  );
};

export default FormExample;
