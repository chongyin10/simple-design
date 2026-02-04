import { useState, useEffect } from 'react';
import { Pie, G2 } from '@ant-design/plots';

const resourceMap = {
    CPU: { title: 'CPU', unit: '核' },
    MEM: { title: '内存', unit: 'GB' },
    GPU: { title: 'GPU', unit: '颗' },
    DISK: { title: 'DISK', unit: 'GB' }
}

const PieChart = (props) => {

    const { pieContent } = props;
    // const G = G2.getEngine('canvas');

    const [data, setData] = useState([]);

    useEffect(() => {
        initChartsData();
    }, []);

    const initChartsData = () => {
        const data = [];
        let residueResoule = 1;
        Object.keys(pieContent['projectsUsedPercent']).forEach(key => {
            if (Number(pieContent['projectsUsedPercent'][key][0]) > 0) {
                residueResoule = residueResoule - filterValue(pieContent['projectsUsedPercent'][key][0]);
                data.push({ type: pieContent['projectsUsedPercent'][key][1], value: filterValue(pieContent['projectsUsedPercent'][key][0]), color: '#5A96EA' })
            }
        });
        data.push({ type: '剩余资源', value: filterValue(residueResoule), color: '#C6C6C6' });
        setData(data);
    }

    const filterValue = (value) => {
        if (Number(value) >= 1) return 1;
        if (Number(value) <= 0) return 0;
        return value;
    }

    const config = {
        appendPadding: 10,
        data,
        angleField: 'value',
        colorField: 'type',
        color: (data)=> {
            if ( data?.type == '剩余资源') {
                return `#C6C6C6`
            } else {
                return '#5A96EA'
            }
        },
        radius: 0.75,
        innerRadius: 0.6,
        legend: false,
        meta: {
            value: {
                formatter: (v, i) => `${v && (v * 100).toFixed(1)}%`,
            },
        },
        label: {
            type: 'spider',
            labelHeight: 40,
            formatter: (data, mappingData) => {
                const group = new G.Group({});
                group.addShape({
                    type: 'circle',
                    attrs: {
                        x: 0,
                        y: 0,
                        width: 40,
                        height: 50,
                        r: 5,
                        fill: mappingData.color,
                    },
                });
                group.addShape({
                    type: 'text',
                    attrs: {
                        x: 10,
                        y: 8,
                        text: `${data.type}`,
                        fill: '#1890ff',
                    },
                });
                group.addShape({
                    type: 'text',
                    attrs: {
                        x: 0,
                        y: 25,
                        text: `${(data.percent * 100).toFixed(1)}%`,
                        fill: '#1890ff',
                        fontWeight: 700,
                    },
                });
                return group;
            },
        },
        statistic: null
    };

    return (
        <div className='pie-F'>
            <p>{resourceMap[pieContent.category]['title']} 使用率</p>
            <Pie {...config} />
            <p className='p2'>团队{resourceMap[pieContent.category]['title']}总量：{pieContent.localTotal}{resourceMap[pieContent.category]['unit']}</p>
        </div>
    );
};

export default PieChart
