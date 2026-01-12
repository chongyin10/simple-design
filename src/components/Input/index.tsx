import React from 'react';
import InputBase, { InputProps } from './InputBase';
import Search from './Search';
import NumberInput, { NumberInputProps } from './Number';

export type { InputProps, NumberInputProps };

// 扩展InputBase组件，添加Search和Number静态属性
type InputComponent = React.FC<InputProps> & {
    Search: typeof Search;
    Number: typeof NumberInput;
};

const Input = InputBase as InputComponent;
Input.Search = Search;
Input.Number = NumberInput;

export { Search, NumberInput };
export default Input;