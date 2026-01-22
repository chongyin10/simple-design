import React, { useState } from 'react';
import { Pagination, Table, Flex } from '../../components';
import type { Column } from '../../components/Table';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

const PaginationExample: React.FC = () => {
  // API参数列配置
  const apiColumns: Column[] = [
    { dataIndex: 'param', title: '参数名', width: '150px' },
    { dataIndex: 'type', title: '类型', width: '300px' },
    { dataIndex: 'default', title: '默认值', width: '150px' },
    { dataIndex: 'description', title: '描述', width: '300px' }
  ];

  // API参数数据源
  const apiDataSource = [
    { param: 'total', type: 'number', default: '0', description: '总条目数' },
    { param: 'current', type: 'number', default: '-', description: '当前页码，从1开始' },
    { param: 'pageSize', type: 'number', default: '10', description: '每页显示条数' },
    { param: 'onChange', type: '(page: number, pageSize?: number) => void', default: '-', description: '页码改变时的回调函数' },
    { param: 'pageSizeOptions', type: 'string[]', default: "['10', '20', '50', '100']", description: '每页显示条数选择器的选项' },
    { param: 'showSizeChanger', type: 'boolean', default: 'false', description: '是否显示每页显示条数选择器' },
    { param: 'showQuickJumper', type: 'boolean', default: 'false', description: '是否显示快速跳转输入框' },
    { param: 'showTotal', type: '(total: number, range: [number, number]) => string', default: '-', description: '是否显示总条数' },
    { param: 'size', type: '"small" | "default"', default: '"default"', description: '组件大小' },
    { param: 'align', type: '"flex-start" | "center" | "flex-end"', default: '"flex-start"', description: '分页组件位置对齐方式' },
    { param: 'className', type: 'string', default: '-', description: '自定义CSS类名' },
    { param: 'style', type: 'React.CSSProperties', default: '-', description: '自定义样式' }
  ];

  // 演示数据
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageSize, setCurrentPageSize] = useState(5);
  const totalItems = 50;

  // 生成模拟数据
  const generateData = (page: number, pageSize: number) => {
    const start = (page - 1) * pageSize;
    return Array.from({ length: pageSize }, (_, i) => ({
      key: `${start + i + 1}`,
      name: `用户${start + i + 1}`,
      age: Math.floor(Math.random() * 50) + 20,
      address: `地址${start + i + 1}`
    }));
  };

  const tableData = generateData(currentPage, currentPageSize);

  const tableColumns: Column[] = [
    { dataIndex: 'key', title: 'ID', width: '100px' },
    { dataIndex: 'name', title: '姓名', width: '150px' },
    { dataIndex: 'age', title: '年龄', width: '100px' },
    { dataIndex: 'address', title: '地址', width: '200px' }
  ];

  return (
    <div style={{ padding: '20px' }}>
      <h2>Pagination 组件</h2>
      <p>分页器组件，用于分隔长列表，每次只加载一个页面。</p>
      
      {/* API 文档 */}
      <div style={{ marginBottom: '40px' }}>
        <h3>API 文档</h3>
        <Table columns={apiColumns} dataSource={apiDataSource} />
      </div>

      {/* 基础示例 */}
      <div style={{ marginBottom: '40px' }}>
        <h3>基础分页</h3>
        <p>最简单的分页器，只需要指定总条目数。</p>
        
        <Flex direction="row" gap={40}>
          <div style={{ border: '1px solid #e1e1e1', borderRadius: '8px', padding: '16px', width: 'auto' }}>
            <Pagination 
              total={50} 
              onChange={(page: number, pageSize?: number) => console.log(`页码: ${page}, 每页条数: ${pageSize}`)} 
            />
          </div>
          <div style={{ flex: 1 }}>
            <SyntaxHighlighter language="tsx" style={vscDarkPlus} customStyle={{ borderRadius: '6px', margin: '0', fontSize: '14px', fontFamily: 'monospace' }}>
{`<Pagination 
  total={50} 
  onChange={(page, pageSize) => console.log(\`页码: \${page}, 每页条数: \${pageSize}\`)} 
/>`}
            </SyntaxHighlighter>
          </div>
        </Flex>
      </div>

      {/* 带总数显示示例 */}
      <div style={{ marginBottom: '40px' }}>
        <h3>带总数显示</h3>
        <p>显示当前数据范围和总条数。</p>
        
        <Flex direction="row" gap={40}>
          <div style={{ border: '1px solid #e1e1e1', borderRadius: '8px', padding: '16px', width: 'auto' }}>
            <Pagination 
              total={100}
              showTotal={(total: number, range: [number, number]) => `显示 ${range[0]}-${range[1]} 条，共 ${total} 条`}
              onChange={(page: number, pageSize?: number) => console.log(`页码: ${page}, 每页条数: ${pageSize}`)} 
            />
          </div>
          <div style={{ flex: 1 }}>
            <SyntaxHighlighter language="tsx" style={vscDarkPlus} customStyle={{ borderRadius: '6px', margin: '0', fontSize: '14px', fontFamily: 'monospace' }}>
{`<Pagination 
  total={100}
  showTotal={(total, range) => \`显示 \${range[0]}-\${range[1]} 条，共 \${total} 条\`}
  onChange={(page, pageSize) => console.log(\`页码: \${page}, 每页条数: \${pageSize}\`)} 
/>`}
            </SyntaxHighlighter>
          </div>
        </Flex>
      </div>

      {/* 带页数选择器示例 */}
      <div style={{ marginBottom: '40px' }}>
        <h3>带页数选择器</h3>
        <p>可以选择每页显示的条数。</p>
        
        <Flex direction="row" gap={40}>
          <div style={{ border: '1px solid #e1e1e1', borderRadius: '8px', padding: '16px', width: 'auto' }}>
            <Pagination 
              total={100}
              showSizeChanger={true}
              pageSizeOptions={['5', '10', '20', '50']}
              onChange={(page: number, pageSize?: number) => {
                console.log(`页码: ${page}, 每页条数: ${pageSize}`);
                setCurrentPage(page);
                setCurrentPageSize(pageSize || 5);
              }}
            />
          </div>
          <div style={{ flex: 1 }}>
            <SyntaxHighlighter language="tsx" style={vscDarkPlus} customStyle={{ borderRadius: '6px', margin: '0', fontSize: '14px', fontFamily: 'monospace' }}>
{`<Pagination 
  total={100}
  showSizeChanger={true}
  pageSizeOptions={['5', '10', '20', '50']}
  onChange={(page, pageSize) => {
    console.log(\`页码: \${page}, 每页条数: \${pageSize}\`);
  }}
/>`}
            </SyntaxHighlighter>
          </div>
        </Flex>
      </div>

      {/* 带快速跳转示例 */}
      <div style={{ marginBottom: '40px' }}>
        <h3>带快速跳转</h3>
        <p>可以直接跳转到指定页码。</p>
        
        <Flex direction="row" gap={40}>
          <div style={{ border: '1px solid #e1e1e1', borderRadius: '8px', padding: '16px', width: 'auto' }}>
            <Pagination 
              total={100}
              showQuickJumper={true}
              onChange={(page: number, pageSize?: number) => console.log(`页码: ${page}, 每页条数: ${pageSize}`)} 
            />
          </div>
          <div style={{ flex: 1 }}>
            <SyntaxHighlighter language="tsx" style={vscDarkPlus} customStyle={{ borderRadius: '6px', margin: '0', fontSize: '14px', fontFamily: 'monospace' }}>
{`<Pagination 
  total={100}
  showQuickJumper={true}
  onChange={(page, pageSize) => console.log(\`页码: \${page}, 每页条数: \${pageSize}\`)} 
/>`}
            </SyntaxHighlighter>
          </div>
        </Flex>
      </div>

      {/* 小尺寸示例 */}
      <div style={{ marginBottom: '40px' }}>
        <h3>小尺寸</h3>
        <p>小尺寸的分页器，适用于空间有限的场景。</p>
        
        <Flex direction="row" gap={40}>
          <div style={{ border: '1px solid #e1e1e1', borderRadius: '8px', padding: '16px', width: 'auto' }}>
            <Pagination 
              total={50}
              size="small"
              onChange={(page: number, pageSize?: number) => console.log(`页码: ${page}, 每页条数: ${pageSize}`)} 
            />
          </div>
          <div style={{ flex: 1 }}>
            <SyntaxHighlighter language="tsx" style={vscDarkPlus} customStyle={{ borderRadius: '6px', margin: '0', fontSize: '14px', fontFamily: 'monospace' }}>
{`<Pagination 
  total={50}
  size="small"
  onChange={(page, pageSize) => console.log(\`页码: \${page}, 每页条数: \${pageSize}\`)} 
/>`}
            </SyntaxHighlighter>
          </div>
        </Flex>
      </div>

      {/* 对齐方式示例 */}
      <div style={{ marginBottom: '40px' }}>
        <h3>不同对齐方式</h3>
        <p>使用align属性控制分页组件的水平对齐方式。</p>
        
        <Flex direction="column" gap={20}>
          <div>
            <label>左对齐 (默认): </label>
            <div style={{ marginTop: '8px' }}>
              <Pagination
                total={100}
                current={1}
                pageSize={10}
                align="flex-start"
                onChange={(page: number, pageSize?: number) => console.log(`左对齐页码: ${page}, 每页条数: ${pageSize}`)}
              />
            </div>
          </div>
          <div>
            <label>居中对齐: </label>
            <div style={{ marginTop: '8px' }}>
              <Pagination
                total={100}
                current={1}
                pageSize={10}
                align="center"
                onChange={(page: number, pageSize?: number) => console.log(`居中页码: ${page}, 每页条数: ${pageSize}`)}
              />
            </div>
          </div>
          <div>
            <label>右对齐: </label>
            <div style={{ marginTop: '8px' }}>
              <Pagination
                total={100}
                current={1}
                pageSize={10}
                align="flex-end"
                onChange={(page: number, pageSize?: number) => console.log(`右对齐页码: ${page}, 每页条数: ${pageSize}`)}
              />
            </div>
          </div>
        </Flex>
      </div>

      {/* 完整功能示例 */}
      <div style={{ marginBottom: '40px' }}>
        <h3>完整功能示例</h3>
        <p>结合表格展示分页的实际应用场景。</p>
        
        <div style={{ border: '1px solid #e1e1e1', borderRadius: '8px', padding: '16px' }}>
          <Table columns={tableColumns} dataSource={tableData} />
          <div style={{ marginTop: '16px', textAlign: 'right' }}>
            <Pagination 
              total={totalItems}
              current={currentPage}
              pageSize={currentPageSize}
              showTotal={(total: number, range: [number, number]) => `显示 ${range[0]}-${range[1]} 条，共 ${total} 条`}
              showSizeChanger={true}
              showQuickJumper={true}
              pageSizeOptions={['5', '10', '20']}
              onChange={(page: number, pageSize?: number) => {
                setCurrentPage(page);
                setCurrentPageSize(pageSize || 5);
              }}
            />
          </div>
        </div>
      </div>

      {/* 使用说明 */}
      <div style={{ 
        backgroundColor: '#f8f9fa', 
        border: '1px solid #e9ecef', 
        borderRadius: '8px', 
        padding: '24px',
        marginBottom: '32px' 
      }}>
        <h3>使用说明</h3>
        
        <h4>基本用法</h4>
        <p>分页器组件接受总条目数(total)作为必需参数，可选择性地设置当前页(current)和每页显示条数(pageSize)。</p>
        
        <h4>功能特性</h4>
        <ul style={{ lineHeight: '1.8' }}>
          <li><strong>页码显示</strong>：根据总页数智能显示页码，超过7页时会省略中间部分</li>
          <li><strong>页数选择</strong>：可通过showSizeChanger显示每页条数选择器</li>
          <li><strong>快速跳转</strong>：可通过showQuickJumper显示跳转输入框</li>
          <li><strong>总数显示</strong>：可通过showTotal自定义显示当前数据范围和总数</li>
          <li><strong>响应式设计</strong>：在小屏幕设备上会隐藏高级功能</li>
          <li><strong>对齐方式</strong>：可通过align属性设置分页组件的水平对齐方式（flex-start, center, flex-end）</li>
        </ul>

        <h4>代码示例</h4>
        <SyntaxHighlighter language="tsx" style={vscDarkPlus} customStyle={{ borderRadius: '6px', margin: '0', fontSize: '14px', fontFamily: 'monospace' }}>
{`// 基础用法
<Pagination total={100} />

// 完整功能
<Pagination 
  total={100}
  current={1}
  pageSize={10}
  showTotal={(total, range) => \`显示 \${range[0]}-\${range[1]} 条，共 \${total} 条\`}
  showSizeChanger={true}
  showQuickJumper={true}
  pageSizeOptions={['10', '20', '50']}
  onChange={(page, pageSize) => {
    // 处理页码变化
  }}
/>

// 不同对齐方式
<Pagination 
  total={100}
  current={1}
  pageSize={10}
  align="center"  // 或 "flex-start", "flex-end"
/>`}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};

export default PaginationExample;