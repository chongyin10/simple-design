import React, { useState } from 'react';
import { Cascader, Flex, Table } from '../../components';
import type { Column } from '../../components/Table';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

const CascaderExample: React.FC = () => {
  // 示例数据
  const options = [
    {
      value: 'zhejiang',
      label: '浙江省',
      children: [
        {
          value: 'hangzhou',
          label: '杭州市',
          children: [
            {
              value: 'xihu',
              label: '西湖区'
            },
            {
              value: 'gongshu',
              label: '拱墅区'
            },
            {
              value: 'jianggan',
              label: '江干区'
            },
            {
              value: 'xiaoshan',
              label: '萧山区'
            }
          ]
        },
        {
          value: 'ningbo',
          label: '宁波市',
          children: [
            {
              value: 'haishu',
              label: '海曙区'
            },
            {
              value: 'jiangbei',
              label: '江北区'
            },
            {
              value: 'zhenhai',
              label: '镇海区'
            }
          ]
        },
        {
          value: 'wenzhou',
          label: '温州市',
          children: [
            {
              value: 'lucheng',
              label: '鹿城区'
            },
            {
              value: 'longwan',
              label: '龙湾区'
            }
          ]
        }
      ]
    },
    {
      value: 'jiangsu',
      label: '江苏省',
      children: [
        {
          value: 'nanjing',
          label: '南京市',
          children: [
            {
              value: 'xuanwu',
              label: '玄武区'
            },
            {
              value: 'qinhuai',
              label: '秦淮区'
            },
            {
              value: 'jianye',
              label: '建邺区'
            }
          ]
        },
        {
          value: 'suzhou',
          label: '苏州市',
          children: [
            {
              value: 'gusu',
              label: '姑苏区'
            },
            {
              value: 'wuzhong',
              label: '吴中区'
            },
            {
              value: 'xiangcheng',
              label: '相城区'
            }
          ]
        }
      ]
    },
    {
      value: 'shanghai',
      label: '上海市',
      children: [
        {
          value: 'pudong',
          label: '浦东新区',
          children: [
            {
              value: 'lujiazui',
              label: '陆家嘴街道'
            },
            {
              value: 'tangzhen',
              label: '唐镇'
            }
          ]
        },
        {
          value: 'minhang',
          label: '闵行区',
          children: [
            {
              value: 'xinzhuang',
              label: '莘庄镇'
            },
            {
              value: 'qibao',
              label: '七宝镇'
            }
          ]
        }
      ]
    }
  ];

  const [value, setValue] = useState<any[]>([]);
  const [value2, setValue2] = useState<any[]>([]);
  const [value3, setValue3] = useState<any[]>([]);
  const [value4, setValue4] = useState<any[]>(['zhejiang', 'hangzhou', 'xihu']);
  const [checkboxValue, setCheckboxValue] = useState<any[][]>([]);

  const handleChange = (value: any[], selectedOptions: any[]) => {
    console.log('选中的值:', value);
    console.log('选中的选项:', selectedOptions);
    setValue(value);
  };

  const handleChange2 = (value: any[]) => {
    setValue2(value);
  };

  const handleChange3 = (value: any[]) => {
    setValue3(value);
  };

  const handleChange4 = (value: any[]) => {
    setValue4(value);
  };

  const handleCheckboxChange = (value: any[][], selectedOptions: any[]) => {
    console.log('多选选中的值:', value);
    console.log('多选选中的选项:', selectedOptions);
    console.log('selectedOptions:', selectedOptions);
    setCheckboxValue(value);
  };

  const apiColumns: Column[] = [
    { dataIndex: 'name', title: '属性名', width: '150px' },
    { dataIndex: 'type', title: '类型', width: '200px' },
    { dataIndex: 'default', title: '默认值', width: '120px' },
    { dataIndex: 'description', title: '描述' }
  ];

  const apiDataSource = [
    { name: 'value', type: 'any[]', default: '[]', description: '当前选中的值（多选模式下为多个值路径的数组）' },
    { name: 'defaultValue', type: 'any[]', default: '[]', description: '默认选中的值' },
    { name: 'onChange', type: '(value, selectedOptions) => void', default: '-', description: '选项改变时的回调' },
    { name: 'options', type: 'CascaderOption[]', default: '[]', description: '可选项数据源' },
    { name: 'placeholder', type: 'string', default: '\'请选择\'', description: '选择框默认文字' },
    { name: 'disabled', type: 'boolean', default: 'false', description: '是否禁用' },
    { name: 'size', type: 'large | middle | small', default: '\'middle\'', description: '选择框大小' },
    { name: 'allowClear', type: 'boolean', default: 'true', description: '是否显示清除按钮' },
    { name: 'expandTrigger', type: 'click | hover', default: '\'click\'', description: '次级菜单的展开方式' },
    { name: 'changeOnSelect', type: 'boolean', default: 'false', description: '当此项为 true 时，点选每级菜单选项值都会发生变化' },
    { name: 'fieldNames', type: 'object', default: '-', description: '自定义选项的字段名' },
    { name: 'width', type: 'number | string', default: '-', description: '组件宽度' },
    { name: 'dropdownWidth', type: 'number | string', default: '-', description: '下拉框宽度' },
    { name: 'dropdownHeight', type: 'number | string', default: '-', description: '下拉框高度' },
    { name: 'dropdownStyle', type: 'CSSProperties', default: '-', description: '下拉框样式对象' },
    { name: 'dropdownClassName', type: 'string', default: '-', description: '下拉框的自定义类名' },
    { name: 'placement', type: 'bottomLeft | bottomRight | topLeft | topRight', default: '\'bottomLeft\'', description: '下拉菜单的弹出位置' },
    { name: 'checkbox', type: 'boolean', default: 'false', description: '是否启用多选模式（启用后显示复选框，支持多选）' }
  ];

  const optionColumns: Column[] = [
    { dataIndex: 'name', title: '属性名', width: '150px' },
    { dataIndex: 'type', title: '类型', width: '200px' },
    { dataIndex: 'default', title: '默认值', width: '120px' },
    { dataIndex: 'description', title: '描述' }
  ];

  const optionDataSource = [
    { name: 'value', type: 'any', default: '-', description: '选项的值' },
    { name: 'label', type: 'ReactNode', default: '-', description: '选项的标签' },
    { name: 'disabled', type: 'boolean', default: 'false', description: '是否禁用该选项' },
    { name: 'children', type: 'CascaderOption[]', default: '-', description: '子选项' }
  ];

  return (
    <div style={{ padding: '20px' }}>
      <h1>Cascader 级联选择框</h1>
      <p style={{ color: '#666', marginBottom: '30px' }}>
        一级菜单为上下级结构关系（垂直下拉），二级及以后的多级菜单为左右平铺关系（水平展开）的级联选择器。
      </p>

      {/* 基础用法 */}
      <div style={{ marginBottom: '40px' }}>
        <h3>基础用法</h3>
        <Flex direction="column" gap="middle">
          <div>
            <h4>默认用法</h4>
            <div style={{ marginTop: '16px' }}>
              <Cascader
                options={options}
                value={value}
                onChange={handleChange}
                placeholder="请选择所在地区"
              />
            </div>
            <p style={{ color: '#666', marginTop: '8px' }}>
              当前选中: {value.length > 0 ? value.join(' / ') : '未选择'}
            </p>
          </div>
        </Flex>
      </div>

      {/* 默认值 */}
      <div style={{ marginBottom: '40px' }}>
        <h3>默认值</h3>
        <Flex direction="column" gap="middle">
          <div>
            <h4>设置默认选中项</h4>
            <div style={{ marginTop: '16px' }}>
              <Cascader
                options={options}
                defaultValue={value4}
                onChange={handleChange4}
                placeholder="请选择所在地区"
              />
            </div>
          </div>
        </Flex>
      </div>

      {/* 禁用 */}
      <div style={{ marginBottom: '40px' }}>
        <h3>禁用</h3>
        <Flex direction="column" gap="middle">
          <div>
            <h4>整个组件禁用</h4>
            <div style={{ marginTop: '16px' }}>
              <Cascader
                options={options}
                value={value2}
                onChange={handleChange2}
                disabled
                placeholder="禁用状态"
              />
            </div>
          </div>
          <div>
            <h4>禁用选项</h4>
            <div style={{ marginTop: '16px' }}>
              <Cascader
                options={[
                  {
                    value: 'zhejiang',
                    label: '浙江省',
                    disabled: true,
                    children: [
                      {
                        value: 'hangzhou',
                        label: '杭州市'
                      }
                    ]
                  },
                  {
                    value: 'jiangsu',
                    label: '江苏省',
                    children: [
                      {
                        value: 'nanjing',
                        label: '南京市',
                        disabled: true
                      },
                      {
                        value: 'suzhou',
                        label: '苏州市'
                      }
                    ]
                  }
                ]}
                placeholder="禁用某些选项"
              />
            </div>
          </div>
        </Flex>
      </div>

      {/* 多选模式 */}
      <div style={{ marginBottom: '40px' }}>
        <h3>多选模式</h3>
        <p style={{ color: '#666', marginBottom: '16px' }}>
          通过设置 <code>checkbox</code> 属性为 true，启用多选模式，支持同时选择多个选项
        </p>
        <Flex direction="column" gap="middle">
          <div>
            <h4>基础多选</h4>
            <div style={{ marginTop: '16px' }}>
              <Cascader
                options={options}
                value={checkboxValue}
                onChange={handleCheckboxChange}
                checkbox
                placeholder="请选择多个地区"
              />
            </div>
            <p style={{ color: '#666', marginTop: '8px' }}>
              已选择 {checkboxValue.length} 个选项
            </p>
          </div>
          <div>
            <h4>多选 + 宽度</h4>
            <div style={{ marginTop: '16px' }}>
              <Cascader
                options={options}
                value={checkboxValue}
                onChange={handleCheckboxChange}
                checkbox
                width={300}
                placeholder="多选且限制宽度"
              />
            </div>
          </div>
        </Flex>
      </div>

      {/* 尺寸 */}
      <div style={{ marginBottom: '40px' }}>
        <h3>尺寸</h3>
        <Flex direction="column" gap="middle">
          <div>
            <h4>不同尺寸</h4>
            <Flex gap="middle" style={{ marginTop: '16px' }} align="center">
              <Cascader
                options={options}
                size="large"
                placeholder="大尺寸"
              />
              <Cascader
                options={options}
                size="middle"
                placeholder="中等尺寸"
              />
              <Cascader
                options={options}
                size="small"
                placeholder="小尺寸"
              />
            </Flex>
          </div>
        </Flex>
      </div>

      {/* 可清空 */}
      <div style={{ marginBottom: '40px' }}>
        <h3>可清空</h3>
        <Flex direction="column" gap="middle">
          <div>
            <h4>允许清除</h4>
            <div style={{ marginTop: '16px' }}>
              <Cascader
                options={options}
                value={value3}
                onChange={handleChange3}
                allowClear
                placeholder="可清空的选择器"
              />
            </div>
          </div>
          <div>
            <h4>不允许清除</h4>
            <div style={{ marginTop: '16px' }}>
              <Cascader
                options={options}
                value={value3}
                onChange={handleChange3}
                allowClear={false}
                placeholder="不可清空的选择器"
              />
            </div>
          </div>
        </Flex>
      </div>

      {/* 展开触发方式 */}
      <div style={{ marginBottom: '40px' }}>
        <h3>展开触发方式</h3>
        <Flex direction="column" gap="middle">
          <div>
            <h4>点击展开（默认）</h4>
            <div style={{ marginTop: '16px' }}>
              <Cascader
                options={options}
                expandTrigger="click"
                placeholder="点击展开"
              />
            </div>
          </div>
          <div>
            <h4>悬停展开</h4>
            <div style={{ marginTop: '16px' }}>
              <Cascader
                options={options}
                expandTrigger="hover"
                placeholder="悬停展开"
              />
            </div>
          </div>
        </Flex>
      </div>

      {/* 任意级别可选 */}
      <div style={{ marginBottom: '40px' }}>
        <h3>任意级别可选</h3>
        <Flex direction="column" gap="middle">
          <div>
            <h4>changeOnSelect = true</h4>
            <p style={{ color: '#666', marginBottom: '8px' }}>
              当此项为 true 时，点选每级菜单选项值都会发生变化
            </p>
            <div style={{ marginTop: '16px' }}>
              <Cascader
                options={options}
                changeOnSelect
                placeholder="可以选择任意级别"
              />
            </div>
          </div>
          <div>
            <h4>changeOnSelect = false（默认）</h4>
            <p style={{ color: '#666', marginBottom: '8px' }}>
              只能选择最后一级
            </p>
            <div style={{ marginTop: '16px' }}>
              <Cascader
                options={options}
                changeOnSelect={false}
                placeholder="只能选择最后一级"
              />
            </div>
          </div>
        </Flex>
      </div>

      {/* 自定义字段名 */}
      <div style={{ marginBottom: '40px' }}>
        <h3>自定义字段名</h3>
        <Flex direction="column" gap="middle">
          <div>
            <h4>自定义 label、value、children 字段名</h4>
            <div style={{ marginTop: '16px' }}>
              <Cascader
                options={[
                  {
                    value: '1',
                    label: '浙江省',
                    children: [
                      {
                        value: '1-1',
                        label: '杭州市',
                        children: [
                          { value: '1-1-1', label: '西湖区' },
                          { value: '1-1-2', label: '拱墅区' }
                        ]
                      }
                    ]
                  },
                  {
                    value: '2',
                    label: '江苏省',
                    children: [
                      {
                        value: '2-1',
                        label: '南京市',
                        children: [
                          { value: '2-1-1', label: '玄武区' },
                          { value: '2-1-2', label: '秦淮区' }
                        ]
                      }
                    ]
                  }
                ]}
                fieldNames={{
                  label: 'label',
                  value: 'value',
                  children: 'children'
                }}
                placeholder="自定义字段名"
              />
            </div>
          </div>
        </Flex>
      </div>

      {/* 空状态 */}
      <div style={{ marginBottom: '40px' }}>
        <h3>空状态</h3>
        <Flex direction="column" gap="middle">
          <div>
            <h4>整个数据为空</h4>
            <div style={{ marginTop: '16px' }}>
              <Cascader
                options={[]}
                placeholder="暂无数据"
              />
            </div>
          </div>
          <div>
            <h4>某一级菜单为空</h4>
            <p style={{ color: '#666', marginBottom: '8px' }}>
              当某个选项的子项为空时，该级菜单会显示空状态提示
            </p>
            <div style={{ marginTop: '16px' }}>
              <Cascader
                options={[
                  {
                    value: 'empty',
                    label: '空数据',
                    children: []
                  },
                  {
                    value: 'has-data',
                    label: '有数据',
                    children: [
                      { value: 'item-1', label: '选项1' },
                      { value: 'item-2', label: '选项2' }
                    ]
                  }
                ]}
                placeholder="选择一项查看空状态"
              />
            </div>
          </div>
        </Flex>
      </div>

      {/* 尺寸控制 */}
      <div style={{ marginBottom: '40px' }}>
        <h3>尺寸控制</h3>
        <Flex direction="column" gap="middle">
          <div>
            <h4>设置组件宽度</h4>
            <div style={{ marginTop: '16px' }}>
              <Cascader
                options={options}
                width={400}
                placeholder="宽度设置为400px"
              />
            </div>
          </div>
          <div>
            <h4>设置下拉框宽度</h4>
            <p style={{ color: '#666', marginBottom: '8px' }}>
              下拉框宽度独立于组件宽度设置
            </p>
            <div style={{ marginTop: '16px' }}>
              <Cascader
                options={options}
                dropdownWidth={400}
                placeholder="下拉框宽度设置为400px"
              />
            </div>
          </div>
          <div>
            <h4>设置下拉框高度</h4>
            <p style={{ color: '#666', marginBottom: '8px' }}>
              下拉框超过指定高度时会出现滚动条
            </p>
            <div style={{ marginTop: '16px' }}>
              <Cascader
                options={options}
                dropdownHeight={180}
                placeholder="下拉框高度设置为180px"
              />
            </div>
          </div>
        </Flex>
      </div>

      {/* 弹出位置 */}
      <div style={{ marginBottom: '40px' }}>
        <h3>弹出位置</h3>
        <p style={{ color: '#666', marginBottom: '16px' }}>
          支持 4 个弹出位置：bottomLeft（默认）、bottomRight、topLeft、topRight
        </p>
        <Flex direction="column" gap="middle">
          <div>
            <h4>bottomLeft（默认）</h4>
            <div style={{ marginTop: '16px' }}>
              <Cascader
                options={options}
                placement="bottomLeft"
                placeholder="左下方弹出"
              />
            </div>
          </div>
          <div>
            <h4>bottomRight</h4>
            <div style={{ marginTop: '16px' }}>
              <Cascader
                options={options}
                placement="bottomRight"
                placeholder="右下方弹出"
              />
            </div>
          </div>
          <div>
            <h4>topLeft</h4>
            <div style={{ marginTop: '16px' }}>
              <Cascader
                options={options}
                placement="topLeft"
                placeholder="左上方弹出"
              />
            </div>
          </div>
          <div>
            <h4>topRight</h4>
            <div style={{ marginTop: '16px' }}>
              <Cascader
                options={options}
                placement="topRight"
                placeholder="右上方弹出"
              />
            </div>
          </div>
        </Flex>
      </div>

      {/* 组合使用 */}
      <div style={{ marginBottom: '40px' }}>
        <h3>组合使用</h3>
        <Flex direction="column" gap="middle">
          <div>
            <h4>宽度 + 高度</h4>
            <div style={{ marginTop: '16px' }}>
              <Cascader
                options={options}
                width={350}
                dropdownWidth={500}
                dropdownHeight={180}
                placement="bottomRight"
                placeholder="组合使用多个参数"
              />
            </div>
          </div>
        </Flex>
      </div>

      {/* 尺寸控制 */}
      <div style={{ marginBottom: '40px' }}>
        <h3>尺寸控制</h3>
        <Flex direction="column" gap="middle">
          <div>
            <h4>设置下拉框高度</h4>
            <p style={{ color: '#666', marginBottom: '8px' }}>
              控制下拉菜单的最大高度，超过后显示滚动条
            </p>
            <div style={{ marginTop: '16px' }}>
              <Cascader
                options={options}
                dropdownHeight={200}
                placeholder="下拉框高度设置为200px"
              />
            </div>
          </div>
          <div>
            <h4>自定义下拉框样式</h4>
            <div style={{ marginTop: '16px' }}>
              <Cascader
                options={options}
                dropdownStyle={{
                  backgroundColor: '#f5f5f5',
                  borderRadius: '12px',
                  border: '2px solid #ff6b6b'
                }}
                placeholder="自定义下拉框样式"
              />
            </div>
          </div>
          <div>
            <h4>组合使用</h4>
            <div style={{ marginTop: '16px' }}>
              <Cascader
                options={options}
                width={350}
                dropdownWidth={500}
                dropdownHeight={180}
                placeholder="组合使用多个参数"
              />
            </div>
          </div>
        </Flex>
      </div>

      {/* API 文档 */}
      <div style={{ marginBottom: '40px' }}>
        <h3>API 文档</h3>
        <h3>Cascader Props</h3>
        <Table
          columns={apiColumns}
          dataSource={apiDataSource}
          pagination={false}
        />

        <h3 style={{ marginTop: '32px' }}>CascaderOption</h3>
        <Table
          columns={optionColumns}
          dataSource={optionDataSource}
          pagination={false}
        />
      </div>

      {/* 代码示例 */}
      <div style={{ marginBottom: '40px' }}>
        <h3>代码示例</h3>
        <h3>基础用法</h3>
        <SyntaxHighlighter language="tsx" style={vscDarkPlus}>
{`import { Cascader } from '@zjpcy/simple-design';

const options = [
  {
    value: 'zhejiang',
    label: '浙江省',
    children: [
      {
        value: 'hangzhou',
        label: '杭州市',
        children: [
          { value: 'xihu', label: '西湖区' },
          { value: 'gongshu', label: '拱墅区' }
        ]
      }
    ]
  }
];

function App() {
  const [value, setValue] = useState<any[]>([]);

  const handleChange = (value: any[], selectedOptions: any[]) => {
    console.log('选中的值:', value);
    console.log('选中的选项:', selectedOptions);
    setValue(value);
  };

  return (
    <Cascader
      options={options}
      value={value}
      onChange={handleChange}
      placeholder="请选择所在地区"
    />
  );
}`}
        </SyntaxHighlighter>

        <h3 style={{ marginTop: '24px' }}>任意级别可选</h3>
        <SyntaxHighlighter language="tsx" style={vscDarkPlus}>
{`<Cascader
  options={options}
  changeOnSelect
  placeholder="可以选择任意级别"
/>`}
        </SyntaxHighlighter>

        <h3 style={{ marginTop: '24px' }}>悬停展开</h3>
        <SyntaxHighlighter language="tsx" style={vscDarkPlus}>
{`<Cascader
  options={options}
  expandTrigger="hover"
  placeholder="悬停展开"
/>`}
        </SyntaxHighlighter>

        <h3 style={{ marginTop: '24px' }}>自定义字段名</h3>
        <SyntaxHighlighter language="tsx" style={vscDarkPlus}>
{`<Cascader
  options={options}
  fieldNames={{
    label: 'name',
    value: 'id',
    children: 'subItems'
  }}
  placeholder="自定义字段名"
/>`}
        </SyntaxHighlighter>

        <h3 style={{ marginTop: '24px' }}>多选模式</h3>
        <SyntaxHighlighter language="tsx" style={vscDarkPlus}>
{`const [value, setValue] = useState<any[]>([]);

const handleChange = (value: any[], selectedOptions: any[]) => {
  console.log('选中的值:', value);
  console.log('选中的选项:', selectedOptions);
  setValue(value);
};

<Cascader
  options={options}
  value={value}
  onChange={handleChange}
  checkbox
  placeholder="请选择多个地区"
/>`}
        </SyntaxHighlighter>

        <h3 style={{ marginTop: '24px' }}>弹出位置</h3>
        <SyntaxHighlighter language="tsx" style={vscDarkPlus}>
{`<Cascader
  options={options}
  placement="bottomLeft"
  placeholder="左下方弹出（默认）"
/>

<Cascader
  options={options}
  placement="bottomRight"
  placeholder="右下方弹出"
/>

<Cascader
  options={options}
  placement="topLeft"
  placeholder="左上方弹出"
/>

<Cascader
  options={options}
  placement="topRight"
  placeholder="右上方弹出"
/>`}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};

export default CascaderExample;
