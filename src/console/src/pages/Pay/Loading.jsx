import React from 'react';
import { Spin } from 'antd';
import intl from "react-intl-universal"
function Loading (){
  return (
    <div className='loding'>
      <Spin size="large" />
      <div className='loding-txt'>{intl.get("PAYING")}...</div>
    </div>
  )
}
export default Loading;
