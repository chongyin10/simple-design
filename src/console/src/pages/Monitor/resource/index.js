import React, { useState, useEffect, useMemo } from 'react';
import PieChart from './pieCharts';
import Api from '../../../serviceApi/monitor';
import './pieCharts.less';

let time = null;

export default function Resource(props) {

    const [pieData, setPieData] = useState([])

    useEffect(() => {
        getPieList()
        return () => {
            clearInterval(time);
        }
    }, [])

    const getPieList = async () => {
        const result = await Api.getTeamMonitor().catch(() => clearInterval(time));
        if (result.code >= 20000000 && result.code <= 30000000) {
            setPieData(result.data?.items || []);
        } else {
            setPieData([]);
        }
    }

    const loadChart = useMemo(() => {
        return (
            <>
                {
                    pieData.map((item, index) => (
                        <PieChart key={index} pieContent={item} pieData={pieData} />
                    ))
                }
            </>
        )
    }, [pieData]);

    return (
        <div className='pie-chart'>
            {loadChart}
        </div>
    )
}