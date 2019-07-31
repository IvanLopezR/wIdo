import MetricsGraphics from 'react-metrics-graphics';
import 'metrics-graphics/dist/metricsgraphics.css';

import React, { Component } from 'react'

export default class Graphic extends Component {
    render() {
        return (
            <div>
                <MetricsGraphics
                    chart_type= 'point'
                    title="Top 10 Users More Travelers"
                    animate_on_load={1}
                    aggregate_rollover
                    // description="This graphic shows a time-series of downloads."
                    data={[{ 'user': 1, 'value': 138 }, { 'user': 2, 'value': 538 }, { 'user': 3, 'value': 338 }, { 'user': 4, 'value': 28 }, { 'user': 5, 'value': 118 }]}
                    width={1200}
                    height={650}
                    // color_accessor="red"
                    x_accessor="user"
                    y_accessor="value"
                    // markers={["he","ha","kj","jk","kjn","kj","kj"]}
                    x_label={["he","ha","kj","jk","kjn","kj","kj"]}
                />
            </div>
        )
    }
}