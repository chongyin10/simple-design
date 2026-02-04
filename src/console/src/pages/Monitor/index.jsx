import { useState, useRef } from "react";
import Resource from "./resource";
import Task from './task';

import './index.less';

export default function Monitor() {

    const [action, setAction] = useState('');
    const monitorRef = useRef();

    return (
        <div id='monitor' ref={monitorRef} style={{ height: 'calc(100vh - 40px)', backgroundColor: '#fff', padding: '24px 32px', overflowX: 'hidden' }}>
            <div className="team_monitor_resource">
                <div className="team_monitor_title">资源监控</div>
                <Resource action={action} />
            </div>
            <div className="team_monitor_runTask">
                <Task />
            </div>
        </div>
    )
}