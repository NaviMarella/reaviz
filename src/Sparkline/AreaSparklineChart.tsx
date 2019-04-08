import React, { Component } from 'react';
import {
  AreaChart,
  AreaChartProps,
  AreaSeries,
  Area,
  Line
} from '../AreaChart';
import { ChartShallowDataShape } from '../common/data';
import { PointSeries } from '../AreaChart';
import {
  LinearYAxisTickSeries,
  LinearYAxis,
  LinearXAxis,
  LinearXAxisTickSeries
} from '../common/Axis/LinearAxis';
import { GradientStop, Gradient } from '../common/Styles';

export interface AreaSparklineChartProps extends AreaChartProps {
  data: ChartShallowDataShape[];
}

export class AreaSparklineChart extends Component<AreaSparklineChartProps, {}> {
  static defaultProps: Partial<AreaSparklineChartProps> = {
    gridlines: null,
    series: (
      <AreaSeries
        symbols={<PointSeries show="hover" />}
        interpolation="smooth"
        markLine={null}
        area={
          <Area
            pattern={true}
            gradient={
              <Gradient
                stops={[
                  <GradientStop offset="10%" stopOpacity={0} />,
                  <GradientStop offset="80%" stopOpacity={1} />
                ]}
              />
            }
          />
        }
        line={<Line strokeWidth={3} />}
      />
    ),
    yAxis: (
      <LinearYAxis
        type="value"
        scaled={true}
        axisLine={null}
        tickSeries={<LinearYAxisTickSeries line={null} label={null} />}
      />
    ),
    xAxis: (
      <LinearXAxis
        type="time"
        scaled={true}
        axisLine={null}
        tickSeries={<LinearXAxisTickSeries line={null} label={null} />}
      />
    )
  };

  render() {
    return <AreaChart {...this.props} />;
  }
}
