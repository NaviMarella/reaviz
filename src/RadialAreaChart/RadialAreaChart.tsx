import React, { Fragment, ReactElement, FC, useCallback } from 'react';
import {
  ChartShallowDataShape,
  ChartInternalShallowDataShape,
  buildShallowChartData
} from '../common/data';
import { scaleTime } from 'd3-scale';
import { getYDomain, getXDomain } from '../common/utils/domains';
import {
  ChartProps,
  ChartContainer,
  ChartContainerChildProps
} from '../common/containers';
import { CloneElement } from '../common/utils/children';
import { RadialAreaSeries, RadialAreaSeriesProps } from './RadialAreaSeries';
import { RadialAxis, RadialAxisProps } from '../common/Axis/RadialAxis';
import { getRadialYScale } from '../common/scales/radial';

export interface RadialAreaChartProps extends ChartProps {
  /**
   * Data the chart will receive to render.
   */
  data: ChartShallowDataShape[];

  /**
   * The series component that renders the area components.
   */
  series: ReactElement<RadialAreaSeriesProps, typeof RadialAreaSeries>;

  /**
   * The radial axis component for the chart.
   */
  innerRadius: number;

  /**
   * The inner radius for the chart center.
   */
  axis: ReactElement<RadialAxisProps, typeof RadialAxis> | null;
}

export const RadialAreaChart: FC<RadialAreaChartProps> = ({
  id,
  width,
  height,
  className,
  data,
  innerRadius = 80,
  series = <RadialAreaSeries />,
  axis = <RadialAxis />,
  margins = 75
}) => {
  const getScales = useCallback((
    (
      preData: ChartShallowDataShape[],
      outerRadius: number,
      innerRadius: number
    ) => {
      const d = buildShallowChartData(
        preData
      ) as ChartInternalShallowDataShape[];

      const yDomain = getYDomain({ data: d, scaled: false });
      const xDomain = getXDomain({ data: d });

      const xScale = scaleTime()
        .range([0, 2 * Math.PI])
        .domain(xDomain);

      const yScale = getRadialYScale(innerRadius, outerRadius, yDomain);

      return {
        yScale,
        xScale,
        result: d
      };
    }
  ), []);

  const renderChart = useCallback((containerProps: ChartContainerChildProps) => {
    const { chartWidth, chartHeight, id } = containerProps;
    const outerRadius = Math.min(chartWidth, chartHeight) / 2;
    const { yScale, xScale, result } = getScales(
      data,
      outerRadius,
      innerRadius
    );

    return (
      <Fragment>
        {axis && (
          <CloneElement<RadialAxisProps>
            element={axis}
            xScale={xScale}
            height={chartHeight}
            width={chartWidth}
            innerRadius={innerRadius}
          />
        )}
        <CloneElement<RadialAreaSeriesProps>
          element={series}
          id={id}
          data={result}
          xScale={xScale}
          yScale={yScale}
          height={chartHeight}
          width={chartWidth}
          outerRadius={outerRadius}
          innerRadius={innerRadius}
        />
      </Fragment>
    );
  }, [data, series, id, innerRadius, axis]);

  return (
    <ChartContainer
      id={id}
      width={width}
      height={height}
      margins={margins}
      xAxisVisible={false}
      yAxisVisible={false}
      center={true}
      className={className}
    >
      {renderChart}
    </ChartContainer>
  );
}
