import React from 'react';
import './../../node_modules/react-vis/dist/style.css'
import { XYPlot, XAxis, YAxis, VerticalGridLines, HorizontalGridLines, LineMarkSeries } from 'react-vis';

const Chart = (props) => {
    const DATA = [];
    var i = 0;
    var limit = props.data.date.length - 1;
    while (i < 15) {
        let tmp = {
            x: Date.parse(props.data.date[limit - i]),
            y0: parseFloat(props.data.temp[limit - i]),
            y1: parseFloat(props.data.humid[limit - i]),
            y2: parseInt(props.data.soil_humid[limit - i]),
            y3: parseFloat(props.data.light[limit - i])
        }
        DATA.push(tmp);
        i = i + 1;
    }
    const data_temp_map = DATA.map(el => ({ x: el.x, y: el.y0 }));
    const data_humid_map = DATA.map(el => ({ x: el.x, y: el.y1 }));
    const data_soil_humid_map = DATA.map(el => ({ x: el.x, y: el.y2 }));
    const data_light_map = DATA.map(el => ({ x: el.x, y: el.y3 }));
    return (
        <div>
            <h4>Nhiệt độ môi trường trồng cây theo thời gian</h4>
            <XYPlot
                xDomain={[DATA[0].x - 2000 * 15, DATA[0].x]}
                yDomain={[0, 40]}
                xType="time"
                width={1000}
                height={300}>
                <VerticalGridLines />
                <HorizontalGridLines />
                <XAxis title="Thời gian" />
                <YAxis title="Độ C" />
                <LineMarkSeries data={data_temp_map} lineStyle={{ stroke: 'blue' }} LineColor='white' markStyle={{ stroke: 'green' }} />
            </XYPlot>

            <h4>Độ ẩm không khi theo thời gian</h4>
            <XYPlot
                xDomain={[DATA[0].x - 2000 * 15, DATA[0].x]}
                yDomain={[0, 100]}
                xType="time"
                width={1000}
                height={300}>
                <VerticalGridLines />
                <HorizontalGridLines />
                <XAxis title="Thời gian" />
                <YAxis title="Phần trăm" />
                <LineMarkSeries data={data_humid_map} lineStyle={{ stroke: 'violet' }} LineColor='white' markStyle={{ stroke: 'orange' }} />
            </XYPlot>

            <h4>Độ ẩm đất theo thời gian</h4>
            <XYPlot
                xDomain={[DATA[0].x - 2000 * 15, DATA[0].x]}
                yDomain={[0, 1024]}
                xType="time"
                width={1000}
                height={300}>
                <VerticalGridLines />
                <HorizontalGridLines />
                <XAxis title="Thời gian" />
                <YAxis title="Phần trăm" />
                <LineMarkSeries data={data_soil_humid_map} lineStyle={{ stroke: 'yellow' }} LineColor='white' markStyle={{ stroke: 'red' }} />
            </XYPlot>

            <h4>Cường độ chiếu sáng cây trồng theo thời gian</h4>
            <XYPlot
                xDomain={[DATA[0].x - 2000 * 15, DATA[0].x]}
                yDomain={[0, 50000]}
                xType="time"
                width={1000}
                height={300}>
                <VerticalGridLines />
                <HorizontalGridLines />
                <XAxis title="Thời gian" />
                <YAxis title="Lux" />
                <LineMarkSeries data={data_light_map} lineStyle={{ stroke: 'green' }} LineColor='white' markStyle={{ stroke: 'violet' }} />
            </XYPlot>

        </div>

    );
}
export default Chart;