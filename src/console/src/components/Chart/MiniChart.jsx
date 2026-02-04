import { Tiny } from '@ant-design/plots';
import React from 'react';
import './index.less'
const MiniChart = ({name, percent, all, unit, allocated}) => {
  const config = {
    percent: !Boolean(percent)? 0.000001 : percent,
    width: 120,
    height: 120,
    color: ['#bac4d1','#0066ff'],
    annotations: [
      {
        type: 'text',
        style: {
          text: `${Math.round(percent * 100) / 100}  \n 已分配率`, 
          x: '50%',
          y: '50%',
          textAlign: 'center',
          fontSize: 16,
          fontStyle: 'bold',
        },
      },
    ],
  };

  return <div className='minichart'>
    <div className='name'>{name}</div>
    <Tiny.Ring {...config} />
    <div className='info'>
      <span className='title'>总量：</span><span>{all} {unit}</span>
    </div>
    <div className='info'>
      <span className='title'>已分配：</span><span>{allocated} {unit}</span>
    </div>
  </div>
};

export default MiniChart