# Cascader 级联选择框

级联选择框组件，支持多级数据选择。

## 特性

- **垂直/水平布局**：一级菜单为上下级结构关系（垂直下拉），二级及以后的多级菜单为左右平铺关系（水平展开）
- **多级选择**：支持无限层级的数据选择
- **灵活配置**：支持点击展开、悬停展开等多种交互方式
- **可清空**：支持清除已选择的内容
- **禁用支持**：支持禁用整个组件或单个选项
- **尺寸变化**：提供大、中、小三种尺寸
- **任意级别可选**：支持选择任意层级或仅选择最后一级
- **自定义字段名**：支持自定义数据字段名
- **空状态提示**：当数据为空时显示友好的空状态提示
- **宽度高度控制**：支持自定义组件宽度、下拉框宽度和高度
- **样式自定义**：支持下拉框的样式和类名自定义

## 使用示例

### 基础用法

```tsx
import { Cascader } from '@zjpcy/simple-design';

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

  return (
    <Cascader
      options={options}
      value={value}
      onChange={setValue}
      placeholder="请选择所在地区"
    />
  );
}
```

### 设置组件宽度

```tsx
<Cascader
  options={options}
  width={400}
  placeholder="宽度设置为400px"
/>
```

### 设置下拉框宽度

```tsx
<Cascader
  options={options}
  dropdownWidth={500}
  placeholder="下拉框宽度设置为500px"
/>
```

### 设置下拉框高度

```tsx
<Cascader
  options={options}
  dropdownHeight={200}
  placeholder="下拉框高度设置为200px"
/>
```

### 自定义下拉框样式

```tsx
<Cascader
  options={options}
  dropdownStyle={{
    backgroundColor: '#f5f5f5',
    borderRadius: '12px',
    border: '2px solid #ff6b6b'
  }}
  placeholder="自定义下拉框样式"
/>
```

### 任意级别可选

```tsx
<Cascader
  options={options}
  changeOnSelect
  placeholder="可以选择任意级别"
/>
```

### 悬停展开

```tsx
<Cascader
  options={options}
  expandTrigger="hover"
  placeholder="悬停展开"
/>
```

### 自定义字段名

```tsx
<Cascader
  options={options}
  fieldNames={{
    label: 'name',
    value: 'id',
    children: 'subItems'
  }}
  placeholder="自定义字段名"
/>
```

### 空状态

```tsx
// 整个数据为空
<Cascader
  options={[]}
  placeholder="暂无数据"
/>

// 某一级菜单为空
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
        { value: 'item-1', label: '选项1' }
      ]
    }
  ]}
  placeholder="选择一项查看空状态"
/>
```

### 组合使用

```tsx
<Cascader
  options={options}
  width={350}
  dropdownWidth={500}
  dropdownHeight={180}
  dropdownStyle={{
    boxShadow: '0 8px 24px rgba(0,0,0,0.12)'
  }}
  placeholder="组合使用多个参数"
/>
```

## API

### Cascader Props

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| value | 当前选中的值 | `any[]` | `[]` |
| defaultValue | 默认选中的值 | `any[]` | `[]` |
| onChange | 选项改变时的回调 | `(value, selectedOptions) => void` | - |
| options | 可选项数据源 | `CascaderOption[]` | `[]` |
| placeholder | 选择框默认文字 | `string` | `'请选择'` |
| disabled | 是否禁用 | `boolean` | `false` |
| size | 选择框大小 | `'large' \| 'middle' \| 'small'` | `'middle'` |
| allowClear | 是否显示清除按钮 | `boolean` | `true` |
| expandTrigger | 次级菜单的展开方式 | `'click' \| 'hover'` | `'click'` |
| changeOnSelect | 当此项为 true 时，点选每级菜单选项值都会发生变化 | `boolean` | `false` |
| fieldNames | 自定义选项的字段名 | `object` | - |
| width | 组件宽度 | `number \| string` | - |
| dropdownWidth | 下拉框宽度 | `number \| string` | - |
| dropdownHeight | 下拉框高度 | `number \| string` | - |
| dropdownStyle | 下拉框的自定义样式 | `CSSProperties` | - |
| dropdownClassName | 下拉框的自定义类名 | `string` | - |

### CascaderOption

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| value | 选项的值 | `any` | - |
| label | 选项的标签 | `ReactNode` | - |
| disabled | 是否禁用该选项 | `boolean` | `false` |
| children | 子选项 | `CascaderOption[]` | - |

## 布局说明

- **一级菜单**：垂直下拉，直接在选择器下方显示
- **二级及以后菜单**：水平平铺，从左到右依次展开，每一列对应一个层级
- **独立高度**：每个菜单的高度完全独立，不会因为子菜单的高度变化而改变
- **浮动效果**：每一级菜单都紧贴着父级菜单的右侧边框浮动显示

这种布局方式让用户在选择多级数据时更加直观和高效。

## 尺寸控制

Cascader 组件提供了多种方式来控制尺寸：

1. **组件宽度 (width)**：控制整个组件的宽度
2. **下拉框宽度 (dropdownWidth)**：控制下拉菜单容器的宽度
3. **下拉框高度 (dropdownHeight)**：控制下拉菜单的最大高度（超过会显示滚动条）
4. **下拉框样式 (dropdownStyle)**：使用 CSSProperties 对象自定义下拉框的样式
5. **下拉框类名 (dropdownClassName)**：为下拉框添加自定义类名

## 空状态处理

当以下情况时，会自动显示空状态提示：
1. 整个 `options` 为空数组
2. 某个选项的 `children` 为空数组

空状态会使用 `Empty` 组件显示友好的"暂无数据"提示。
