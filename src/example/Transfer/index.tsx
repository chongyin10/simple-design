import React, { useState } from 'react';
import Transfer from '../../components/Transfer';
import { TransferItem } from '../../components/Transfer/types';
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
            console.log('选中项:', targetKeys);
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
          body={({ dataSource, selectedKeys, onSelectChange }) => (
            <div style={{ padding: '8px', height: '100%', overflow: 'auto' }}>
              {dataSource.map(item => (
                <div
                  key={item.key}
                  onClick={() => !item.disabled && onSelectChange(
                    selectedKeys.includes(item.key)
                      ? selectedKeys.filter(k => k !== item.key)
                      : [...selectedKeys, item.key]
                  )}
                  style={{
                    padding: '8px 12px',
                    margin: '4px 0',
                    borderRadius: '4px',
                    cursor: item.disabled ? 'not-allowed' : 'pointer',
                    background: selectedKeys.includes(item.key) ? '#e6f7ff' : '#f5f5f5',
                    border: selectedKeys.includes(item.key) ? '1px solid #1890ff' : '1px solid #d9d9d9',
                  }}
                >
                  {selectedKeys.includes(item.key) ? '✅' : '⭕'} {item.title}
                </div>
              ))}
            </div>
          )}
        />
        <CopyBlock code={`body={({ dataSource, selectedKeys, onSelectChange }) => (
  <div>
    {dataSource.map(item => (
      <div
        key={item.key}
        onClick={() => onSelectChange(
          selectedKeys.includes(item.key)
            ? selectedKeys.filter(k => k !== item.key)
            : [...selectedKeys, item.key]
        )}
      >
        {item.title}
      </div>
    ))}
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
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>dataSource</td>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>数据源</td>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>TransferItem[]</td>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>[]</td>
            </tr>
            <tr>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>targetKeys</td>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>右侧已选中的 key 集合（受控）</td>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>string[]</td>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>-</td>
            </tr>
            <tr>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>defaultTargetKeys</td>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>默认已选中的 key 集合</td>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>string[]</td>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>[]</td>
            </tr>
            <tr>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>selectedKeys</td>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>当前选中的 key 集合（受控）</td>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>string[]</td>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>-</td>
            </tr>
            <tr>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>showSearch</td>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>是否显示搜索框</td>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>boolean</td>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>false</td>
            </tr>
            <tr>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>disabled</td>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>是否禁用整个组件</td>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>boolean</td>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>false</td>
            </tr>
            <tr>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>leftTitle</td>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>左侧标题</td>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>ReactNode</td>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>'源列表'</td>
            </tr>
            <tr>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>rightTitle</td>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>右侧标题</td>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>ReactNode</td>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>'目标列表'</td>
            </tr>
            <tr>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>leftDescription</td>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>左侧描述信息</td>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>ReactNode</td>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>-</td>
            </tr>
            <tr>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>rightDescription</td>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>右侧描述信息</td>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>ReactNode</td>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>-</td>
            </tr>
            <tr>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>onChange</td>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>选项转移时的回调</td>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>{`(targetKeys, direction, moveKeys) => void`}</td>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>-</td>
            </tr>
            <tr>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>onSelectChange</td>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>选中项改变时的回调</td>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>{`(sourceSelectedKeys, targetSelectedKeys) => void`}</td>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>-</td>
            </tr>
            <tr>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>onSearch</td>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>搜索框内容变化时的回调</td>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>{`(direction, value) => void`}</td>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>-</td>
            </tr>
            <tr>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>render</td>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>自定义渲染每一项</td>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>{`(item) => ReactNode`}</td>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>-</td>
            </tr>
            <tr>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>listHeight</td>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>列表高度（像素）</td>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>number | string</td>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>300</td>
            </tr>
            <tr>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>listWidth</td>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>列表宽度（像素）</td>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>number | string</td>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>200</td>
            </tr>
            <tr>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>header</td>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>自定义 header，返回 null 则不显示</td>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>{`(props) => ReactNode | null`}</td>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>-</td>
            </tr>
            <tr>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>search</td>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>自定义搜索区域，传入此函数则替换默认搜索框</td>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>{`({ direction, value, onChange, disabled }) => ReactNode`}</td>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>-</td>
            </tr>
            <tr>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>body</td>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>自定义 body 渲染</td>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>{`(props) => ReactNode`}</td>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>-</td>
            </tr>
            <tr>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>mode</td>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>模式，transfer 为双栏穿梭模式，single 为单栏选择模式</td>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>'transfer' | 'single'</td>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>'transfer'</td>
            </tr>
            <tr>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>lazyLoad</td>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>是否开启懒加载，滚动到底部时触发加载</td>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>boolean</td>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>false</td>
            </tr>
            <tr>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>lazyLoadThreshold</td>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>懒加载阈值，距离底部多少像素时触发加载</td>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>number</td>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>100</td>
            </tr>
            <tr>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>onLazyLoad</td>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>懒加载回调，滚动到底部时触发</td>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>{`(direction) => void`}</td>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>-</td>
            </tr>
            <tr>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>loading</td>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>是否显示加载状态</td>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>boolean</td>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>false</td>
            </tr>
            <tr>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>loadingRender</td>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>自定义 loading 渲染</td>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>{`() => ReactNode`}</td>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>-</td>
            </tr>
          </tbody>
        </table>

        <h3>TransferItem</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '16px' }}>
          <thead>
            <tr style={{ backgroundColor: '#f5f5f5' }}>
              <th style={{ border: '1px solid #d9d9d9', padding: '8px', textAlign: 'left' }}>属性</th>
              <th style={{ border: '1px solid #d9d9d9', padding: '8px', textAlign: 'left' }}>说明</th>
              <th style={{ border: '1px solid #d9d9d9', padding: '8px', textAlign: 'left' }}>类型</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>key</td>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>唯一标识</td>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>string</td>
            </tr>
            <tr>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>title</td>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>显示标题</td>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>ReactNode</td>
            </tr>
            <tr>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>disabled</td>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>是否禁用</td>
              <td style={{ border: '1px solid #d9d9d9', padding: '8px' }}>boolean</td>
            </tr>
          </tbody>
        </table>
      </Section>
    </div>
  );
};

export default TransferExample;