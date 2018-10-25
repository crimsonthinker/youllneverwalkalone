import React from 'react';
import { XYPlot, XAxis, YAxis, VerticalGridLines, HorizontalGridLines, LineSeries } from 'react-vis';

const Chart = (props) => {
    const dataAgg = props.data;
    return (
        <XYPlot
            width={300}
            height={300}>
            <VerticalGridLines />
            <HorizontalGridLines />
            <XAxis />
            <YAxis />
            <LineSeries
                data={dataAgg} />
        </XYPlot>
    );
}
export default Chart;