import React, { useMemo } from 'react';
import { useSelector } from "react-redux";
import { notification } from 'antd';
import { getProjectInfo } from '../../store/modules/globalSlice';
import { historyOpenProject } from '../../utils/cookie';

function MyModel() {

    const proInfo = useSelector(getProjectInfo);
    const openPro = historyOpenProject;

    const openNotification = () => {
        notification.open({
            message: '提示',
            description: '请先创建项目',
            onClick: () => { },
        });
    };

    const toPoject = useMemo(() => {
        if (openPro) {
            history.pushState({}, null, `/studio/modelwarenhouse/myModel?projectId=${openPro}`);
        } else {
            if (proInfo && proInfo.length > 0) {
                history.pushState({}, null, `/studio/modelwarenhouse/myModel?projectId=${proInfo[0]['id']}`);
            } else {
                history.pushState({}, null, `/console/overview`);
                openNotification();
            }
        }
    }, []);

    return (
        <>
            {toPoject}
        </>
    )
}

export default MyModel;
