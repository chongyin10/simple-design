import React, { Component } from 'react';
import './resource.less';
import ResourcePool from './ResourcePool'

function Resource(props) {
  return (<div className="resource">
    {/* <Dashboard /> */}
    {/* <HistoryMonitor /> */}
    <ResourcePool />
  </div>);
}

export default Resource
