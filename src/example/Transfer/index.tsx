import React, { useState } from 'react';
import Transfer from '../../components/Transfer';
import { TransferItem } from '../../components/Transfer/types';
import Table from '../../components/Table';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

// 复制功能组件
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

// 示例数据
const mockData: TransferItem[] = Array.from({ length: 20 }).map((_, i) => ({
  key: i.toString(),
  title: `选项 ${i + 1}`,
  disabled: i % 4 === 0 && i !== 0,
}));

const TransferExample: React.FC = () => {
  // 基础用法状态
  const [baseTargetKeys, setBaseTargetKeys] = useState<string[]>(['1', '2']);

  // 搜索用法状态
  const [searchTargetKeys, setSearchTargetKeys] = useState<string[]>(['3', '4']);

  // 受控模式状态
  const [controlledTargetKeys, setControlledTargetKeys] = useState<string[]>(['5', '6']);
  const [controlledSelectedKeys, setControlledSelectedKeys] = useState<string[]>(['5', '7']);

  // 单栏选择模式状态
  const [singleSelectedKeys, setSingleSelectedKeys] = useState<string[]>(['1', '3']);

  // 懒加载示例状态
  const [lazyLoadDataSource, setLazyLoadDataSource] = useState<TransferItem[]>(
    Array.from({ length: 10 }).map((_, i) => ({
      key: i.toString(),
      title: `选项 ${i + 1}`,
    }))
  );
  const [lazyLoadTargetKeys, setLazyLoadTargetKeys] = useState<string[]>([]);
  const [lazyLoading, setLazyLoading] = useState(false);

  // 模拟懒加载更多数据
  const handleLazyLoad = (direction: 'left' | 'right') => {
    if (lazyLoading || direction === 'right') return;
    setLazyLoading(true);
    // 模拟异步加载
    setTimeout(() => {
      const currentLength = lazyLoadDataSource.length;
      const newItems = Array.from({ length: 10 }).map((_, i) => ({
        key: (currentLength + i).toString(),
        title: `选项 ${currentLength + i + 1}`,
      }));
      setLazyLoadDataSource((prev) => [...prev, ...newItems]);
      setLazyLoading(false);
    }, 1000);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Transfer 穿梭框</h1>
      <p>双栏穿梭选择框，用于大量数据项的转移和选择。支持双栏穿梭模式和单栏选择模式。</p>

      {/* 单栏选择模式 */}
      <Section title="单栏选择模式">
        <Transfer
          mode="single"
          dataSource={mockData.slice(0, 8)}
          targetKeys={singleSelectedKeys}
          showSearch
          leftTitle="请选择项目"
          onChange={(targetKeys) => {
            setSingleSelectedKeys(targetKeys);
            console.log('【单栏模式】选中项:', targetKeys);
          }}
          onSelectChange={(sourceSelectedKeys, targetSelectedKeys) => {
            console.log('【单栏模式】onSelectChange:', sourceSelectedKeys, targetSelectedKeys);
          }}
        />
        <div style={{ marginTop: '12px', color: '#666' }}>
          <p>当前选中: [{singleSelectedKeys.join(', ')}]</p>
        </div>
        <CopyBlock code={`<Transfer
  mode="single"  // 单栏选择模式
  dataSource={dataSource}
  targetKeys={selectedKeys}
  showSearch
  leftTitle="请选择项目"
  onChange={(targetKeys) => setSelectedKeys(targetKeys)}
/>`} />
      </Section>

      {/* 单栏选择模式 + render */}
      <Section title="单栏选择模式 + render">
        <Transfer
          mode="single"
          dataSource={[
            { key: '1', title: '选项 1', tag: '热门' },
            { key: '2', title: '选项 2', tag: '推荐' },
            { key: '3', title: '选项 3', tag: '新品' },
            { key: '4', title: '选项 4', tag: '默认' },
          ]}
          showSearch
          leftTitle="单栏+render测试"
          onChange={(targetKeys) => {
            console.log('【单栏+render】onChange 选中项:', targetKeys);
          }}
          onSelectChange={(sourceSelectedKeys, targetSelectedKeys) => {
            console.log('【单栏+render】onSelectChange 左侧:', sourceSelectedKeys);
            console.log('【单栏+render】onSelectChange 右侧:', targetSelectedKeys);
          }}
          render={(item) => (
            <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span
                style={{
                  padding: '2px 6px',
                  borderRadius: '4px',
                  fontSize: '10px',
                  background: item.tag === '热门' ? '#ff4d4f' : '#1890ff',
                  color: '#fff',
                }}
              >
                {item.tag}
              </span>
              <span>{item.title}</span>
            </span>
          )}
        />
        <CopyBlock code={`<Transfer
  mode="single"
  dataSource={[...]}
  showSearch
  onChange={(targetKeys) => console.log(targetKeys)}
  onSelectChange={(source, target) => console.log(source, target)}
  render={(item) => (
    <span>
      <span style={{ background: '#1890ff', color: '#fff' }}>
        {item.tag}
      </span>
      {item.title}
    </span>
  )}
/>`} />
        <p style={{ color: '#666', fontSize: '14px', marginTop: '8px' }}>
          此示例测试单栏模式下同时使用 render 时 onSelectChange 是否能正确获取值
        </p>
      </Section>

      {/* 基础用法 */}
      <Section title="基础用法">
        <Transfer
          dataSource={mockData.slice(0, 10)}
          targetKeys={baseTargetKeys}
          onChange={(targetKeys) => {
            setBaseTargetKeys(targetKeys);
            console.log('目标 keys:', targetKeys);
          }}
        />
        <CopyBlock code={`import { Transfer } from '@idp/design';
import { useState } from 'react';

const [targetKeys, setTargetKeys] = useState(['1', '2']);

<Transfer
  dataSource={[
    { key: '0', title: '选项 1' },
    { key: '1', title: '选项 2' },
    // ...
  ]}
  targetKeys={targetKeys}
  onChange={(targetKeys) => setTargetKeys(targetKeys)}
/>`} />
      </Section>

      {/* 带搜索框 */}
      <Section title="带搜索框">
        <Transfer
          dataSource={mockData}
          targetKeys={searchTargetKeys}
          showSearch
          leftTitle="源列表"
          rightTitle="目标列表"
          onChange={(targetKeys, direction, moveKeys) => {
            setSearchTargetKeys(targetKeys);
            console.log('方向:', direction, '移动的 keys:', moveKeys);
          }}
          onSearch={(direction, value) => {
            console.log('搜索方向:', direction, '搜索值:', value);
          }}
        />
        <CopyBlock code={`<Transfer
  dataSource={dataSource}
  targetKeys={targetKeys}
  showSearch
  leftTitle="源列表"
  rightTitle="目标列表"
  onChange={(targetKeys, direction, moveKeys) => {
    console.log('方向:', direction, '移动的 keys:', moveKeys);
  }}
  onSearch={(direction, value) => {
    console.log('搜索:', direction, value);
  }}
/>`} />
      </Section>

      {/* 自定义标题和描述 */}
      <Section title="自定义标题和描述">
        <Transfer
          dataSource={mockData.slice(0, 8)}
          defaultTargetKeys={['1']}
          leftTitle={<span style={{ color: '#1890ff' }}>📋 可选项目</span>}
          rightTitle={<span style={{ color: '#52c41a' }}>✅ 已选项目</span>}
          leftDescription="共 7 个可选项目"
          rightDescription="已选择 1 个项目"
        />
        <CopyBlock code={`<Transfer
  dataSource={dataSource}
  leftTitle={<span>📋 可选项目</span>}
  rightTitle={<span>✅ 已选项目</span>}
  leftDescription="共 7 个可选项目"
  rightDescription="已选择 1 个项目"
/>`} />
      </Section>

      {/* 受控模式 */}
      <Section title="受控模式">
        <Transfer
          dataSource={mockData.slice(0, 6)}
          targetKeys={controlledTargetKeys}
          selectedKeys={controlledSelectedKeys}
          onChange={(targetKeys, direction, moveKeys) => {
            setControlledTargetKeys(targetKeys);
            console.log('onChange:', targetKeys, direction, moveKeys);
          }}
          onSelectChange={(sourceSelectedKeys, targetSelectedKeys) => {
            setControlledSelectedKeys([...sourceSelectedKeys, ...targetSelectedKeys]);
            console.log('onSelectChange:', sourceSelectedKeys, targetSelectedKeys);
          }}
        />
        <div style={{ marginTop: '12px', color: '#666' }}>
          <p>当前目标 keys: [{controlledTargetKeys.join(', ')}]</p>
          <p>当前选中 keys: [{controlledSelectedKeys.join(', ')}]</p>
        </div>
        <CopyBlock code={`const [targetKeys, setTargetKeys] = useState(['5', '6']);
const [selectedKeys, setSelectedKeys] = useState(['5', '7']);

<Transfer
  dataSource={dataSource}
  targetKeys={targetKeys}
  selectedKeys={selectedKeys}
  onChange={(targetKeys) => setTargetKeys(targetKeys)}
  onSelectChange={(sourceKeys, targetKeys) => {
    setSelectedKeys([...sourceKeys, ...targetKeys]);
  }}
/>`} />
      </Section>

      {/* 自定义高度和宽度 */}
      <Section title="自定义高度和宽度">
        <Transfer
          dataSource={mockData.slice(0, 10)}
          defaultTargetKeys={['1', '2']}
          listHeight={400}
          listWidth={280}
        />
        <CopyBlock code={`<Transfer
  dataSource={dataSource}
  defaultTargetKeys={['1', '2']}
  listHeight={400}
  listWidth={280}
/>`} />
      </Section>

      {/* 禁用状态 */}
      <Section title="禁用状态">
        <Transfer
          dataSource={mockData.slice(0, 6)}
          defaultTargetKeys={['1', '2']}
          disabled
        />
        <CopyBlock code={`<Transfer
  dataSource={dataSource}
  defaultTargetKeys={['1', '2']}
  disabled
/>`} />
      </Section>

      {/* 自定义渲染 */}
      <Section title="自定义渲染">
        <Transfer
          dataSource={[
            { key: '1', title: '张三', disabled: false },
            { key: '2', title: '李四', disabled: false },
            { key: '3', title: '王五', disabled: false },
            { key: '4', title: '赵六', disabled: true },
          ]}
          defaultTargetKeys={['1']}
          render={(item) => (
            <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: item.disabled ? '#999' : '#52c41a',
                }}
              />
              {item.title}
            </span>
          )}
        />
        <CopyBlock code={`<Transfer
  dataSource={dataSource}
  render={(item) => (
    <span>
      <span style={{
        width: '8px',
        height: '8px',
        borderRadius: '50%',
        background: item.disabled ? '#999' : '#52c41a'
      }} />
      {item.title}
    </span>
  )}
/>`} />
      </Section>

      {/* 自定义渲染（带点击事件查看选中状态） */}
      <Section title="自定义渲染（带点击事件）">
        <Transfer
          dataSource={[
            { key: '1', title: '选项 1', tag: '热门' },
            { key: '2', title: '选项 2', tag: '推荐' },
            { key: '3', title: '选项 3', tag: '新品' },
            { key: '4', title: '选项 4', tag: '默认' },
          ]}
          defaultTargetKeys={['1']}
          onSelectChange={(sourceSelectedKeys, targetSelectedKeys) => {
            console.log('【render示例】左侧选中:', sourceSelectedKeys);
            console.log('【render示例】右侧选中:', targetSelectedKeys);
          }}
          render={(item) => (
            <span
              onClick={(e) => {
                // 阻止事件冒泡，避免触发默认的选择逻辑
                e.stopPropagation();
                console.log('【render示例】点击了项目:', item.title, 'key:', item.key);
              }}
              style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}
            >
              <span
                style={{
                  padding: '2px 6px',
                  borderRadius: '4px',
                  fontSize: '10px',
                  background: item.tag === '热门' ? '#ff4d4f' : item.tag === '推荐' ? '#1890ff' : '#52c41a',
                  color: '#fff',
                }}
              >
                {item.tag}
              </span>
              <span>{item.title}</span>
            </span>
          )}
        />
        <CopyBlock code={`<Transfer
  dataSource={[
    { key: '1', title: '选项 1', tag: '热门' },
    { key: '2', title: '选项 2', tag: '推荐' },
  ]}
  onSelectChange={(sourceSelectedKeys, targetSelectedKeys) => {
    console.log('左侧选中:', sourceSelectedKeys);
    console.log('右侧选中:', targetSelectedKeys);
  }}
  render={(item) => (
    <span
      onClick={(e) => {
        e.stopPropagation();
        console.log('点击了:', item.title, 'key:', item.key);
      }}
    >
      <span style={{ background: '#1890ff', color: '#fff' }}>
        {item.tag}
      </span>
      {item.title}
    </span>
  )}
/>`} />
        <p style={{ color: '#666', fontSize: '14px', marginTop: '8px' }}>
          点击标签时会打印当前点击的项目信息，同时 onSelectChange 会打印两侧选中的 keys
        </p>
      </Section>

      {/* render + filterOption 组合测试 */}
      <Section title="render + filterOption 组合测试">
        <Transfer
          dataSource={[
            { key: '1', title: '张三', dept: '技术部' },
            { key: '2', title: '李四', dept: '产品部' },
            { key: '3', title: '王五', dept: '设计部' },
            { key: '4', title: '赵六', dept: '技术部' },
            { key: '5', title: '钱七', dept: '运营部' },
          ]}
          defaultTargetKeys={['1']}
          showSearch
          filterOption={(inputValue, item) => {
            // 同时搜索 title 和 dept
            const titleMatch = String(item.title).toLowerCase().includes(inputValue.toLowerCase());
            const deptMatch = String(item.dept).toLowerCase().includes(inputValue.toLowerCase());
            return titleMatch || deptMatch;
          }}
          onSelectChange={(sourceSelectedKeys, targetSelectedKeys) => {
            console.log('【render+filterOption】左侧选中:', sourceSelectedKeys);
            console.log('【render+filterOption】右侧选中:', targetSelectedKeys);
          }}
          render={(item) => (
            <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span
                style={{
                  padding: '2px 6px',
                  borderRadius: '4px',
                  fontSize: '10px',
                  background: item.dept === '技术部' ? '#1890ff' : '#52c41a',
                  color: '#fff',
                }}
              >
                {item.dept}
              </span>
              <span>{item.title}</span>
            </span>
          )}
        />
        <CopyBlock code={`<Transfer
  dataSource={[
    { key: '1', title: '张三', dept: '技术部' },
    { key: '2', title: '李四', dept: '产品部' },
  ]}
  showSearch
  filterOption={(inputValue, item) => {
    // 同时搜索 title 和 dept
    const titleMatch = String(item.title).toLowerCase().includes(inputValue.toLowerCase());
    const deptMatch = String(item.dept).toLowerCase().includes(inputValue.toLowerCase());
    return titleMatch || deptMatch;
  }}
  onSelectChange={(sourceSelectedKeys, targetSelectedKeys) => {
    console.log('左侧选中:', sourceSelectedKeys);
    console.log('右侧选中:', targetSelectedKeys);
  }}
  render={(item) => (
    <span>
      <span style={{ background: '#1890ff', color: '#fff' }}>
        {item.dept}
      </span>
      {item.title}
    </span>
  )}
/>`} />
        <p style={{ color: '#666', fontSize: '14px', marginTop: '8px' }}>
          搜索时同时匹配姓名和部门，选择项后会在控制台打印两侧选中的 keys
        </p>
      </Section>

      {/* 自定义字段名称 */}
      <Section title="自定义字段名称">
        <Transfer
          dataSource={[
            { id: '1', name: '张三', disabled: false },
            { id: '2', name: '李四', disabled: false },
            { id: '3', name: '王五', disabled: false },
            { id: '4', name: '赵六', disabled: true },
          ] as any}
          defaultTargetKeys={['1']}
          fieldNames={{
            key: 'id',
            title: 'name'
          }}
        />
        <CopyBlock code={`const customFieldNames = {
  key: 'id',
  title: 'name'
};

const dataSource = [
  { id: '1', name: '张三', disabled: false },
  { id: '2', name: '李四', disabled: false },
  { id: '3', name: '王五', disabled: false },
  { id: '4', name: '赵六', disabled: true },
];

<Transfer
  dataSource={dataSource}
  fieldNames={customFieldNames}
  onChange={(targetKeys) => console.log('选中的 keys:', targetKeys)}
/>`} />
      </Section>

      {/* 自定义 Header */}
      <Section title="自定义 Header">
        <Transfer
          dataSource={mockData.slice(0, 8)}
          defaultTargetKeys={['1']}
          header={({ direction, dataSource, selectedKeys }) => (
            <div style={{
              padding: '12px',
              background: '#f0f5ff',
              borderBottom: '1px solid #d9d9d9',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <span style={{ fontWeight: 500, color: '#1890ff' }}>
                {direction === 'left' ? '📥 待选列表' : '📤 已选列表'}
              </span>
              <span style={{ fontSize: '12px', color: '#666' }}>
                {selectedKeys.length}/{dataSource.length}
              </span>
            </div>
          )}
        />
        <CopyBlock code={`header={({ direction, dataSource, selectedKeys }) => (
  <div>
    {direction === 'left' ? '📥 待选' : '📤 已选'}
    {selectedKeys.length}/{dataSource.length}
  </div>
)}`} />
      </Section>

      {/* 隐藏 Header */}
      <Section title="隐藏 Header">
        <Transfer
          dataSource={mockData.slice(0, 6)}
          defaultTargetKeys={['1', '2']}
          header={() => null}
        />
        <CopyBlock code={`header={() => null}  // 返回 null 隐藏 header`} />
      </Section>

      {/* 自定义 Body */}
      <Section title="自定义 Body">
        <Transfer
          dataSource={mockData.slice(0, 6)}
          defaultTargetKeys={['1']}
          listHeight={200}
          body={({ direction, dataSource, selectedKeys, sourceSelectedKeys, targetSelectedKeys, onSelectChange }) => (
            <div style={{ padding: '8px', height: '100%', overflow: 'auto' }}>
              <div style={{ marginBottom: '8px', fontSize: '12px', color: '#666' }}>
                左侧选中: {sourceSelectedKeys.length} | 右侧选中: {targetSelectedKeys.length}
              </div>
              {dataSource.map(item => {
                const itemKey = item.key as string;
                return (
                  <div
                    key={itemKey}
                    onClick={() => {
                      if (item.disabled) return;
                      const newSelectedKeys = selectedKeys.includes(itemKey)
                        ? selectedKeys.filter(k => k !== itemKey)
                        : [...selectedKeys, itemKey];
                      if (direction === 'left') {
                        onSelectChange(newSelectedKeys, targetSelectedKeys);
                      } else {
                        onSelectChange(sourceSelectedKeys, newSelectedKeys);
                      }
                    }}
                    style={{
                      padding: '8px 12px',
                      margin: '4px 0',
                      borderRadius: '4px',
                      cursor: item.disabled ? 'not-allowed' : 'pointer',
                      background: selectedKeys.includes(itemKey) ? '#e6f7ff' : '#f5f5f5',
                      border: selectedKeys.includes(itemKey) ? '1px solid #1890ff' : '1px solid #d9d9d9',
                    }}
                  >
                    {selectedKeys.includes(itemKey) ? '✅' : '⭕'} {item.title}
                  </div>
                );
              })}
            </div>
          )}
        />
        <CopyBlock code={`body={({ direction, dataSource, selectedKeys, sourceSelectedKeys, targetSelectedKeys, onSelectChange }) => (
  <div>
    <div>左侧选中: {sourceSelectedKeys.length} | 右侧选中: {targetSelectedKeys.length}</div>
    {dataSource.map(item => {
      const newSelectedKeys = selectedKeys.includes(item.key)
        ? selectedKeys.filter(k => k !== item.key)
        : [...selectedKeys, item.key];
      return (
        <div
          key={item.key}
          onClick={() => direction === 'left'
            ? onSelectChange(newSelectedKeys, targetSelectedKeys)
            : onSelectChange(sourceSelectedKeys, newSelectedKeys)
          }
        >
          {item.title}
        </div>
      );
    })}
  </div>
)}`} />
      </Section>

      {/* 自定义搜索区域 */}
      <Section title="自定义搜索区域">
        <Transfer
          dataSource={mockData}
          defaultTargetKeys={['1', '2']}
          showSearch
          leftTitle="源列表"
          rightTitle="目标列表"
          search={() => (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              自定义区域
            </div>
          )}
        />
        <CopyBlock code={`<Transfer
  dataSource={mockData}
  showSearch
  search={({ direction, value, onChange, disabled }) => (
    <div>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        placeholder={\`搜索\${direction}侧...\`}
      />
      {value && <button onClick={() => onChange('')}>清空</button>}
    </div>
  )}
/>`} />
      </Section>

      {/* 自定义字段名 */}
      <Section title="自定义字段名">
        <Transfer
          dataSource={[
            { id: '1', name: '用户 1', disabled: false },
            { id: '2', name: '用户 2', disabled: false },
            { id: '3', name: '用户 3', disabled: true },
            { id: '4', name: '用户 4', disabled: false },
            { id: '5', name: '用户 5', disabled: false },
          ]}
          defaultTargetKeys={['1', '2']}
          showSearch
          leftTitle="用户列表"
          rightTitle="已选用户"
          fieldNames={{ key: 'id', title: 'name' }}
          onChange={(targetKeys) => {
            console.log('目标 keys:', targetKeys);
          }}
        />
        <CopyBlock code={`<Transfer
  dataSource={[
    { id: '1', name: '用户 1' },
    { id: '2', name: '用户 2' },
    { id: '3', name: '用户 3', disabled: true },
    // ...
  ]}
  defaultTargetKeys={['1', '2']}
  showSearch
  fieldNames={{ key: 'id', title: 'name' }}
  onChange={(targetKeys) => console.log(targetKeys)}
/>`} />
      </Section>

      {/* 懒加载示例 */}
      <Section title="懒加载">
        <p style={{ color: '#666', marginBottom: '12px' }}>
          向下滚动左侧面列表到底部，会自动加载更多数据。当前数据总数: {lazyLoadDataSource.length}
        </p>
        <Transfer
          dataSource={lazyLoadDataSource}
          targetKeys={lazyLoadTargetKeys}
          lazyLoad={true}
          lazyLoadThreshold={50}
          loading={lazyLoading}
          onChange={(targetKeys) => setLazyLoadTargetKeys(targetKeys)}
          onLazyLoad={handleLazyLoad}
          listHeight={300}
          leftTitle="源列表（滚动加载更多）"
          rightTitle="目标列表"
        />
        <CopyBlock code={`const [dataSource, setDataSource] = useState([
  { key: '0', title: '选项 1' },
  // ... 初始数据
]);
const [loading, setLoading] = useState(false);

const handleLazyLoad = (direction: 'left' | 'right') => {
  if (loading || direction === 'right') return;
  setLoading(true);
  // 模拟异步加载
  setTimeout(() => {
    const newItems = fetchMoreData();
    setDataSource((prev) => [...prev, ...newItems]);
    setLoading(false);
  }, 1000);
};

<Transfer
  dataSource={dataSource}
  lazyLoad={true}
  lazyLoadThreshold={50}
  loading={loading}
  onLazyLoad={handleLazyLoad}
/>`} />
      </Section>

      {/* API 文档 */}
      <Section title="API">
        <h3>Transfer Props</h3>
        <Table
          dataSource={[
            { param: 'dataSource', type: 'TransferItem[]', default: '[]', description: '数据源' },
            { param: 'targetKeys', type: 'string[]', default: '-', description: '右侧已选中的 key 集合（受控）' },
            { param: 'defaultTargetKeys', type: 'string[]', default: '[]', description: '默认已选中的 key 集合' },
            { param: 'selectedKeys', type: 'string[]', default: '-', description: '当前选中的 key 集合（受控）' },
            { param: 'showSearch', type: 'boolean', default: 'false', description: '是否显示搜索框' },
            { param: 'disabled', type: 'boolean', default: 'false', description: '是否禁用整个组件' },
            { param: 'leftTitle', type: 'ReactNode', default: "'源列表'", description: '左侧标题' },
            { param: 'rightTitle', type: 'ReactNode', default: "'目标列表'", description: '右侧标题' },
            { param: 'leftDescription', type: 'ReactNode', default: '-', description: '左侧描述信息' },
            { param: 'rightDescription', type: 'ReactNode', default: '-', description: '右侧描述信息' },
            { param: 'onChange', type: '(targetKeys, direction, moveKeys) => void', default: '-', description: '选项转移时的回调' },
            { param: 'onSelectChange', type: '(sourceSelectedKeys, targetSelectedKeys) => void', default: '-', description: '选中项改变时的回调' },
            { param: 'onSearch', type: '(direction, value) => void', default: '-', description: '搜索框内容变化时的回调' },
            { param: 'render', type: '(item) => ReactNode', default: '-', description: '自定义渲染每一项' },
            { param: 'listHeight', type: 'number | string', default: '300', description: '列表高度（像素）' },
            { param: 'listWidth', type: 'number | string', default: '200', description: '列表宽度（像素）' },
            { param: 'header', type: '(props) => ReactNode | null', default: '-', description: '自定义 header，返回 null 则不显示' },
            { param: 'search', type: '({ direction, value, onChange, disabled }) => ReactNode', default: '-', description: '自定义搜索区域，传入此函数则替换默认搜索框' },
            { param: 'body', type: '(props) => ReactNode', default: '-', description: '自定义 body 渲染' },
            { param: 'mode', type: "'transfer' | 'single'", default: "'transfer'", description: '模式，transfer 为双栏穿梭模式，single 为单栏选择模式' },
            { param: 'lazyLoad', type: 'boolean', default: 'false', description: '是否开启懒加载，滚动到底部时触发加载' },
            { param: 'lazyLoadThreshold', type: 'number', default: '100', description: '懒加载阈值，距离底部多少像素时触发加载' },
            { param: 'onLazyLoad', type: '(direction) => void', default: '-', description: '懒加载回调，滚动到底部时触发' },
            { param: 'loading', type: 'boolean', default: 'false', description: '是否显示加载状态' },
            { param: 'loadingRender', type: '() => ReactNode', default: '-', description: '自定义 loading 渲染' },
            { param: 'fieldNames', type: 'FieldNames', default: '-', description: '自定义字段名称' },
          ]}
          columns={[
            { title: '属性', dataIndex: 'param', width: '150px' },
            { title: '说明', dataIndex: 'description', width: '300px' },
            { title: '类型', dataIndex: 'type', width: '200px' },
            { title: '默认值', dataIndex: 'default', width: '150px' },
          ]}
          pagination={false}
        />

        <h3>TransferItem</h3>
        <Table
          dataSource={[
            { param: 'key', type: 'string', description: '唯一标识' },
            { param: 'title', type: 'ReactNode', description: '显示标题' },
            { param: 'disabled', type: 'boolean', description: '是否禁用' },
          ]}
          columns={[
            { title: '属性', dataIndex: 'param', width: '150px' },
            { title: '说明', dataIndex: 'description', width: '300px' },
            { title: '类型', dataIndex: 'type', width: '200px' },
          ]}
          pagination={false}
        />

        <h3>FieldNames</h3>
        <Table
          dataSource={[
            { param: 'key', type: 'string', default: '-', description: '唯一标识字段名，默认 \'key\'' },
            { param: 'title', type: 'string', default: '-', description: '显示标题字段名，默认 \'title\'' },
          ]}
          columns={[
            { title: '属性', dataIndex: 'param', width: '150px' },
            { title: '说明', dataIndex: 'description', width: '300px' },
            { title: '类型', dataIndex: 'type', width: '200px' },
            { title: '默认值', dataIndex: 'default', width: '150px' },
          ]}
          pagination={false}
        />
      </Section>
    </div>
  );
};

export default TransferExample;