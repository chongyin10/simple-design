import React from 'react';
import { Table, Button, Empty, Icon, Flex } from '../../components';
import type { Column } from '../../components/Table';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

const TableExample: React.FC = () => {
  const basicColumns: Column[] = [
    { dataIndex: 'id', title: 'ID', width: '60px', align: 'center' },
    { dataIndex: 'name', title: '姓名' },
    { dataIndex: 'age', title: '年龄', width: '80px', align: 'center' },
    { dataIndex: 'gender', title: '性别', width: '80px', align: 'center' },
    { dataIndex: 'email', title: '邮箱' }
  ];

  const basicDataSource = [
    { id: 1, name: '张三', age: 25, gender: '男', email: 'zhangsan@example.com' },
    { id: 2, name: '李四', age: 30, gender: '女', email: 'lisi@example.com' },
    { id: 3, name: '王五', age: 28, gender: '男', email: 'wangwu@example.com' },
    { id: 4, name: '赵六', age: 35, gender: '女', email: 'zhaoliu@example.com' },
    { id: 5, name: '孙七', age: 22, gender: '男', email: 'sunqi@example.com' }
  ];

  const userDataSource = [
    { id: 1, name: '张三', age: 25, gender: '男', email: 'zhangsan@example.com', address: '北京市朝阳区' },
    { id: 2, name: '李四', age: 30, gender: '女', email: 'lisi@example.com', address: '上海市浦东新区' },
    { id: 3, name: '王五', age: 28, gender: '男', email: 'wangwu@example.com', address: '广州市天河区' },
    { id: 4, name: '赵六', age: 35, gender: '女', email: 'zhaoliu@example.com', address: '深圳市南山区' },
    { id: 5, name: '孙七', age: 22, gender: '男', email: 'sunqi@example.com', address: '成都市武侯区' }
  ];

  const actionColumns: Column[] = [
    { dataIndex: 'id', title: 'ID', width: '60px', align: 'center' },
    { dataIndex: 'name', title: '姓名' },
    { dataIndex: 'age', title: '年龄', width: '80px', align: 'center' },
    { dataIndex: 'gender', title: '性别', width: '80px', align: 'center' },
    { dataIndex: 'email', title: '邮箱' },
    { dataIndex: 'address', title: '地址' },
    {
      title: '操作',
      width: '120px',
      align: 'center',
      render: () => (
        <Flex align="center" justify="center" gap={8}>
          <Button
            variant="primary"
            size="small"
            style={{ padding: '4px 8px', fontSize: '12px' }}
          >
            编辑
          </Button>
          <Button
            variant="danger"
            size="small"
            style={{ padding: '4px 8px', fontSize: '12px' }}
          >
            删除
          </Button>
        </Flex>
      )
    }
  ];

  const fullOptionColumns: Column[] = [
    { key: 'key1', dataIndex: 'id', title: 'ID', width: '60px', align: 'center' },
    { key: 'key2', dataIndex: 'name', title: '姓名', width: '120px', align: 'left' },
    { key: 'key3', dataIndex: 'age', title: '年龄', width: '80px', align: 'center' },
    {
      key: 'key4',
      dataIndex: 'gender',
      title: '性别',
      width: '80px',
      align: 'center',
      render: (value: string) => value === '男' ? '👨' : '👩'
    },
    {
      key: 'key5',
      title: '状态',
      width: '100px',
      align: 'center',
      render: (_: any, record: any) => record.age > 30 ? '✅' : '🔶'
    }
  ];

  const fullOptionDataSource = [
    { id: 1, name: '张三', age: 25, gender: '男' },
    { id: 2, name: '李四', age: 35, gender: '女' },
    { id: 3, name: '王五', age: 28, gender: '男' }
  ];

  const apiDataSource = [
    { name: 'columns', type: 'Column[]', default: '[]', description: '列配置数组，用于定义表格列' },
    { name: 'dataSource', type: 'any[]', default: '[]', description: '数据源数组，每项对应一行数据' },
    { name: 'bordered', type: 'boolean', default: 'false', description: '是否显示边框' },
    { name: 'scroll', type: '{ x?: number | string; y?: number | string }', default: '{}', description: '滚动配置，x为横向滚动宽度，y为纵向滚动高度' },
    { name: 'rowKey', type: 'string | ((record, index) => string | number)', default: "'key'", description: '行唯一标识，可以是字段名或函数' },
    { name: 'className', type: 'string', default: "''", description: '自定义CSS类名' },
    { name: 'pagination', type: 'PaginationProps | false', default: '-', description: '分页配置，false表示禁用分页' },
    { name: 'empty', type: 'ReactNode', default: '-', description: '自定义空状态组件，当dataSource为空时显示' }
  ];

  const columnApiDataSource = [
    { name: 'key', type: 'string', default: '-', description: '列唯一标识' },
    { name: 'dataIndex', type: 'string', default: '-', description: '对应数据源的字段名' },
    { name: 'title', type: 'React.ReactNode', default: '-', description: '列标题' },
    { name: 'width', type: 'number | string', default: '-', description: '列宽度，支持数值或CSS字符串如"100px"' },
    { name: 'align', type: "'left' | 'center' | 'right'", default: "'left'", description: '文本对齐方式' },
    { name: 'fixed', type: "boolean | 'start' | 'end'", default: '-', description: '固定列位置，start/true为左侧固定，end为右侧固定' },
    { name: 'render', type: '(value, record, index) => React.ReactNode', default: '-', description: '自定义渲染函数，返回单元格内容' }
  ];

  const paginationApiDataSource = [
    { name: 'pageSize', type: 'number', default: '10', description: '每页显示条数' },
    { name: 'total', type: 'number', default: '-', description: '数据总条数' },
    { name: 'current', type: 'number', default: '1', description: '当前页码' },
    { name: 'onChange', type: '(page: number, pageSize: number) => void', default: '-', description: '页码变化回调函数' }
  ];

  return (
    <div style={{ padding: '20px' }}>
      <h2>Table 组件</h2>
      <p>Table 组件用于展示结构化数据，支持固定列、滚动、分页与自定义渲染。</p>

      {/* 基础使用示例 */}
      <div style={{ marginBottom: '40px' }}>
        <h3>基础使用</h3>
        <p>通过 columns 和 dataSource 属性快速生成表格。</p>

        <h4>基础表格</h4>
        <div style={{ marginBottom: '20px' }}>
          <Table columns={basicColumns} dataSource={basicDataSource} />
        </div>

        <h4>带操作列</h4>
        <div style={{ marginBottom: '20px' }}>
          <Table columns={actionColumns} dataSource={userDataSource} />
        </div>

        <h4>固定列</h4>
        <div style={{ marginBottom: '20px' }}>
          <Table
            columns={[
              { dataIndex: 'id', title: 'ID', width: '60px', align: 'center', fixed: 'start' },
              { dataIndex: 'name', title: '姓名', width: '120px' },
              { dataIndex: 'age', title: '年龄', width: '80px', align: 'center' },
              { dataIndex: 'gender', title: '性别', width: '80px', align: 'center' },
              { dataIndex: 'email', title: '邮箱', width: '200px' },
              { dataIndex: 'phone', title: '电话', width: '150px' },
              { dataIndex: 'address', title: '地址', width: '300px' },
              { dataIndex: 'city', title: '城市', width: '120px' },
              { dataIndex: 'country', title: '国家', width: '120px' },
              {
                title: '操作',
                width: '120px',
                align: 'center',
                fixed: 'end',
                render: () => (
                  <Flex align="center" justify="center" gap={8}>
                    <Button variant="primary" size="small" style={{ padding: '4px 8px', fontSize: '12px' }}>编辑</Button>
                    <Button variant="danger" size="small" style={{ padding: '4px 8px', fontSize: '12px' }}>删除</Button>
                  </Flex>
                )
              }
            ]}
            dataSource={[
              { id: 1, name: '张三', age: 25, gender: '男', email: 'zhangsan@example.com', phone: '13800138000', address: '北京市朝阳区建国路88号', city: '北京', country: '中国' },
              { id: 2, name: '李四', age: 30, gender: '女', email: 'lisi@example.com', phone: '13900139000', address: '上海市浦东新区陆家嘴金融中心', city: '上海', country: '中国' },
              { id: 3, name: '王五', age: 28, gender: '男', email: 'wangwu@example.com', phone: '13700137000', address: '广州市天河区天河路385号', city: '广州', country: '中国' },
              { id: 4, name: '赵六', age: 35, gender: '女', email: 'zhaoliu@example.com', phone: '13600136000', address: '深圳市南山区科技园南区', city: '深圳', country: '中国' }
            ]}
            scroll={{ x: '100%' }}
          />
        </div>

        <h4>横向滚动</h4>
        <div style={{ marginBottom: '20px' }}>
          <Table
            columns={[
              { dataIndex: 'id', title: 'ID', width: '60px', align: 'center' },
              { dataIndex: 'name', title: '姓名', width: '120px' },
              { dataIndex: 'email', title: '邮箱', width: '200px' },
              { dataIndex: 'phone', title: '电话', width: '150px' },
              { dataIndex: 'address', title: '地址', width: '300px' },
              { dataIndex: 'city', title: '城市', width: '120px' },
              { dataIndex: 'country', title: '国家', width: '120px' },
              { dataIndex: 'company', title: '公司', width: '200px' },
              { dataIndex: 'department', title: '部门', width: '150px' },
              { dataIndex: 'position', title: '职位', width: '150px' },
              { dataIndex: 'salary', title: '薪资', width: '100px', align: 'right' },
              {
                title: '操作',
                width: '120px',
                align: 'center',
                render: () => (
                  <Button variant="primary" size="small" style={{ padding: '4px 8px', fontSize: '12px' }}>查看</Button>
                )
              }
            ]}
            dataSource={[
              { id: 1, name: '张三', email: 'zhangsan@example.com', phone: '13800138000', address: '北京市朝阳区建国路88号', city: '北京', country: '中国', company: 'IDP Studio', department: '研发部', position: '前端工程师', salary: '25000' },
              { id: 2, name: '李四', email: 'lisi@example.com', phone: '13900139000', address: '上海市浦东新区陆家嘴金融中心', city: '上海', country: '中国', company: 'IDP Studio', department: '产品部', position: '产品经理', salary: '30000' }
            ]}
            scroll={{ x: '1200px' }}
          />
        </div>

        <h4>纵向滚动</h4>
        <div style={{ marginBottom: '20px' }}>
          <Table
            columns={[
              { dataIndex: 'id', title: 'ID', width: '60px', align: 'center' },
              { dataIndex: 'name', title: '姓名', width: '120px' },
              { dataIndex: 'age', title: '年龄', width: '80px', align: 'center' },
              { dataIndex: 'gender', title: '性别', width: '80px', align: 'center' },
              { dataIndex: 'email', title: '邮箱', width: '200px' },
              { dataIndex: 'city', title: '城市', width: '120px' }
            ]}
            dataSource={[
              { id: 1, name: '张三', age: 25, gender: '男', email: 'zhangsan@example.com', city: '北京' },
              { id: 2, name: '李四', age: 30, gender: '女', email: 'lisi@example.com', city: '上海' },
              { id: 3, name: '王五', age: 28, gender: '男', email: 'wangwu@example.com', city: '广州' },
              { id: 4, name: '赵六', age: 35, gender: '女', email: 'zhaoliu@example.com', city: '深圳' },
              { id: 5, name: '孙七', age: 22, gender: '男', email: 'sunqi@example.com', city: '成都' },
              { id: 6, name: '周八', age: 32, gender: '女', email: 'zhouba@example.com', city: '杭州' },
              { id: 7, name: '吴九', age: 29, gender: '男', email: 'wujiu@example.com', city: '南京' },
              { id: 8, name: '郑十', age: 31, gender: '女', email: 'zhengshi@example.com', city: '武汉' },
              { id: 9, name: '钱十一', age: 26, gender: '男', email: 'qianshiyi@example.com', city: '西安' },
              { id: 10, name: '孙十二', age: 27, gender: '女', email: 'sunshier@example.com', city: '重庆' },
              { id: 11, name: '周十三', age: 29, gender: '男', email: 'zhoushisan@example.com', city: '青岛' },
              { id: 12, name: '吴十四', age: 30, gender: '女', email: 'wushisi@example.com', city: '厦门' }
            ]}
            scroll={{ y: 300 }}
          />
        </div>

        <h4>混合滚动</h4>
        <div style={{ marginBottom: '20px' }}>
          <Table
            columns={[
              { dataIndex: 'id', title: 'ID', width: '60px', align: 'center', fixed: 'start' },
              { dataIndex: 'name', title: '姓名', width: '120px', fixed: 'start' },
              { dataIndex: 'age', title: '年龄', width: '80px', align: 'center' },
              { dataIndex: 'gender', title: '性别', width: '80px', align: 'center' },
              { dataIndex: 'email', title: '邮箱', width: '200px' },
              { dataIndex: 'phone', title: '电话', width: '150px' },
              { dataIndex: 'address', title: '地址', width: '300px' },
              { dataIndex: 'city', title: '城市', width: '120px' },
              { dataIndex: 'country', title: '国家', width: '120px' },
              { dataIndex: 'company', title: '公司', width: '200px' },
              { dataIndex: 'department', title: '部门', width: '150px' },
              { dataIndex: 'position', title: '职位', width: '150px' },
              { dataIndex: 'salary', title: '薪资', width: '100px', align: 'right', fixed: 'end' },
              {
                title: '操作',
                width: '120px',
                align: 'center',
                fixed: 'end',
                render: () => (
                  <Flex align="center" justify="center" gap={8}>
                    <Button variant="primary" size="small" style={{ padding: '4px 8px', fontSize: '12px' }}>编辑</Button>
                    <Button variant="danger" size="small" style={{ padding: '4px 8px', fontSize: '12px' }}>删除</Button>
                  </Flex>
                )
              }
            ]}
            dataSource={[
              { id: 1, name: '张三', age: 25, gender: '男', email: 'zhangsan@example.com', phone: '13800138000', address: '北京市朝阳区建国路88号', city: '北京', country: '中国', company: 'IDP Studio', department: '研发部', position: '前端工程师', salary: '25000' },
              { id: 2, name: '李四', age: 30, gender: '女', email: 'lisi@example.com', phone: '13900139000', address: '上海市浦东新区陆家嘴金融中心', city: '上海', country: '中国', company: 'IDP Studio', department: '产品部', position: '产品经理', salary: '30000' },
              { id: 3, name: '王五', age: 28, gender: '男', email: 'wangwu@example.com', phone: '13700137000', address: '广州市天河区天河路385号', city: '广州', country: '中国', company: 'IDP Studio', department: '测试部', position: '测试工程师', salary: '22000' },
              { id: 4, name: '赵六', age: 35, gender: '女', email: 'zhaoliu@example.com', phone: '13600136000', address: '深圳市南山区科技园南区', city: '深圳', country: '中国', company: 'IDP Studio', department: '设计部', position: 'UI设计师', salary: '28000' },
              { id: 5, name: '孙七', age: 22, gender: '男', email: 'sunqi@example.com', phone: '13500135000', address: '成都市武侯区天府大道北段1480号', city: '成都', country: '中国', company: 'IDP Studio', department: '研发部', position: '后端工程师', salary: '24000' },
              { id: 6, name: '周八', age: 32, gender: '女', email: 'zhouba@example.com', phone: '13400134000', address: '杭州市西湖区文三路90号', city: '杭州', country: '中国', company: 'IDP Studio', department: '运维部', position: '运维工程师', salary: '26000' },
              { id: 7, name: '吴九', age: 29, gender: '男', email: 'wujiu@example.com', phone: '13300133000', address: '南京市玄武区中山路18号', city: '南京', country: '中国', company: 'IDP Studio', department: '研发部', position: '前端工程师', salary: '25000' },
              { id: 8, name: '郑十', age: 31, gender: '女', email: 'zhengshi@example.com', phone: '13200132000', address: '武汉市武昌区中南路99号', city: '武汉', country: '中国', company: 'IDP Studio', department: '产品部', position: '产品经理', salary: '31000' }
            ]}
            scroll={{ x: '100%', y: 400 }}
          />
        </div>

        <h4>带边框表格</h4>
        <div style={{ marginBottom: '20px' }}>
          <Table columns={basicColumns} dataSource={basicDataSource} bordered={true} />
        </div>

        <h4>完整参数示例</h4>
        <div style={{ marginBottom: '20px' }}>
          <Table
            columns={fullOptionColumns}
            dataSource={fullOptionDataSource}
            bordered={true}
            rowKey="id"
            className="custom-table-example"
          />
        </div>

        <h4>自定义行键</h4>
        <div style={{ marginBottom: '20px' }}>
          <Table
            columns={basicColumns}
            dataSource={basicDataSource}
            rowKey={(record) => `user-${record.id}`}
          />
        </div>

        <h4>分页功能</h4>
        <div style={{ marginBottom: '20px' }}>
          <Table
            columns={basicColumns}
            dataSource={Array.from({ length: 100 }, (_, i) => ({
              id: i + 1,
              name: `用户${i + 1}`,
              age: 20 + Math.floor(Math.random() * 20),
              gender: Math.random() > 0.5 ? '男' : '女',
              email: `user${i + 1}@example.com`
            }))}
            pagination={{
              total: 100,
              pageSize: 10,
              current: 1,
              onChange: (page, pageSize) => {
                console.log('当前页码:', page, '每页条数:', pageSize);
              }
            }}
          />
        </div>

        <h4>分页功能增强</h4>
        <div style={{ marginBottom: '20px' }}>
          <Table
            columns={basicColumns}
            dataSource={Array.from({ length: 200 }, (_, i) => ({
              id: i + 1,
              name: `用户${i + 1}`,
              age: 20 + Math.floor(Math.random() * 20),
              gender: Math.random() > 0.5 ? '男' : '女',
              email: `user${i + 1}@example.com`
            }))}
            pagination={{
              total: 200,
              pageSize: 15,
              current: 1,
              showSizeChanger: true,
              showQuickJumper: true,
              showTotal: (total: number, range: [number, number]) => `显示 ${range[0]}-${range[1]} 条，共 ${total} 条`,
              onChange: (page, pageSize) => {
                console.log('当前页码:', page, '每页条数:', pageSize);
              }
            }}
          />
        </div>

        <h4>小尺寸分页</h4>
        <div style={{ marginBottom: '20px' }}>
          <Table
            columns={basicColumns}
            dataSource={Array.from({ length: 50 }, (_, i) => ({
              id: i + 1,
              name: `用户${i + 1}`,
              age: 20 + Math.floor(Math.random() * 20),
              gender: Math.random() > 0.5 ? '男' : '女',
              email: `user${i + 1}@example.com`
            }))}
            pagination={{
              total: 50,
              pageSize: 10,
              current: 1,
              size: 'small',
              showSizeChanger: true,
              showQuickJumper: true,
              onChange: (page, pageSize) => {
                console.log('当前页码:', page, '每页条数:', pageSize);
              }
            }}
          />
        </div>

        <h4>不显示分页</h4>
        <div style={{ marginBottom: '20px' }}>
          <Table
            columns={basicColumns}
            dataSource={Array.from({ length: 10 }, (_, i) => ({
              id: i + 1,
              name: `用户${i + 1}`,
              age: 20 + Math.floor(Math.random() * 20),
              gender: Math.random() > 0.5 ? '男' : '女',
              email: `user${i + 1}@example.com`
            }))}
            pagination={false}
          />
        </div>

        <h4>自定义空状态</h4>
        <div style={{ marginBottom: '20px' }}>
          <Table
            columns={basicColumns}
            dataSource={[]}
            empty={
              <div style={{ textAlign: 'center', padding: '40px 20px' }}>
                <Empty
                  icon={<Icon type="search" size={48} color="#d9d9d9" />}
                  description="没有找到相关数据"
                >
                  <Button variant="primary">重新加载</Button>
                </Empty>
              </div>
            }
          />
        </div>
      </div>

      {/* API 文档 */}
      <div style={{ marginBottom: '40px' }}>
        <h3>API 文档</h3>
        <p>Table 组件的属性配置。</p>

        <h4>Table Props</h4>
        <Table
          columns={[
            { dataIndex: 'name', title: '属性名', width: '150px' },
            { dataIndex: 'type', title: '类型', width: '250px' },
            { dataIndex: 'default', title: '默认值', width: '150px' },
            { dataIndex: 'description', title: '描述' }
          ]}
          dataSource={apiDataSource}
        />

        <h4>Column Props</h4>
        <Table
          columns={[
            { dataIndex: 'name', title: '属性名', width: '150px' },
            { dataIndex: 'type', title: '类型', width: '280px' },
            { dataIndex: 'default', title: '默认值', width: '120px' },
            { dataIndex: 'description', title: '描述' }
          ]}
          dataSource={columnApiDataSource}
        />

        <h4>Pagination Props</h4>
        <Table
          columns={[
            { dataIndex: 'name', title: '属性名', width: '150px' },
            { dataIndex: 'type', title: '类型', width: '280px' },
            { dataIndex: 'default', title: '默认值', width: '120px' },
            { dataIndex: 'description', title: '描述' }
          ]}
          dataSource={paginationApiDataSource}
        />
      </div>

      {/* 代码示例 */}
      <div style={{ marginBottom: '40px' }}>
        <h3>代码示例</h3>
        <SyntaxHighlighter language="tsx" style={vscDarkPlus} customStyle={{ borderRadius: '6px', margin: '0', fontSize: '14px', fontFamily: 'monospace' }}>
{`import { Table } from '@zjpcy/simple-design';

// 基础使用
<Table
  columns={[
    { dataIndex: 'id', title: 'ID', width: '60px', align: 'center' },
    { dataIndex: 'name', title: '姓名' },
    { dataIndex: 'age', title: '年龄', width: '80px', align: 'center' }
  ]}
  dataSource={[
    { id: 1, name: '张三', age: 25 },
    { id: 2, name: '李四', age: 30 },
    { id: 3, name: '王五', age: 28 }
  ]}
/>

// 固定列
<Table
  columns={[
    { dataIndex: 'id', title: 'ID', width: '60px', align: 'center', fixed: 'start' },
    { dataIndex: 'name', title: '姓名', width: '120px' },
    { dataIndex: 'age', title: '年龄', width: '80px', align: 'center' },
    {
      title: '操作',
      width: '120px',
      align: 'center',
      fixed: 'end',
      render: () => <Button variant="primary" size="small">查看</Button>
    }
  ]}
  dataSource={[
    { id: 1, name: '张三', age: 25 },
    { id: 2, name: '李四', age: 30 },
    { id: 3, name: '王五', age: 28 }
  ]}
  scroll={{ x: '100%' }}
/>

// 纵向滚动
<Table
  columns={[
    { dataIndex: 'id', title: 'ID', width: '60px', align: 'center' },
    { dataIndex: 'name', title: '姓名', width: '120px' },
    { dataIndex: 'age', title: '年龄', width: '80px', align: 'center' }
  ]}
  dataSource={[]}
  scroll={{ y: 300 }}
/>

// 带边框表格
<Table
  columns={[
    { dataIndex: 'id', title: 'ID', width: '60px', align: 'center' },
    { dataIndex: 'name', title: '姓名' },
    { dataIndex: 'age', title: '年龄', width: '80px', align: 'center' }
  ]}
  dataSource={[
    { id: 1, name: '张三', age: 25 },
    { id: 2, name: '李四', age: 30 },
    { id: 3, name: '王五', age: 28 }
  ]}
  bordered={true}
/>

// 分页功能
<Table
  columns={[
    { dataIndex: 'id', title: 'ID', width: '60px', align: 'center' },
    { dataIndex: 'name', title: '姓名' },
    { dataIndex: 'age', title: '年龄', width: '80px', align: 'center' }
  ]}
  dataSource={[]}
  pagination={{
    total: 100,
    pageSize: 10,
    current: 1,
    onChange: (page, pageSize) => {
      console.log('当前页码:', page, '每页条数:', pageSize);
    }
  }}
/>`}
        </SyntaxHighlighter>
      </div>

      {/* 安装和使用说明 */}
      <div style={{ marginBottom: '40px' }}>
        <h3>安装和使用</h3>

        <div style={{ marginBottom: '20px' }}>
          <h4>1. 安装依赖</h4>
          <SyntaxHighlighter language="bash" style={vscDarkPlus} customStyle={{ borderRadius: '6px', margin: '0', fontSize: '14px', fontFamily: 'monospace' }}>
            {`npm i @zjpcy/simple-design`}
          </SyntaxHighlighter>
        </div>

        <div>
          <h4>2. 引用组件</h4>
          <SyntaxHighlighter language="tsx" style={vscDarkPlus} customStyle={{ borderRadius: '6px', margin: '0', fontSize: '14px', fontFamily: 'monospace' }}>
{`// 方式一：单独引入
import Table from '@zjpcy/simple-design/lib/Table';
import '@zjpcy/simple-design/lib/Table/Table.css';

// 方式二：批量引入
import { Table } from '@zjpcy/simple-design';
import '@zjpcy/simple-design/lib/index.css';`}
          </SyntaxHighlighter>
        </div>
      </div>
    </div>
  );
};

export default TableExample;
