import React, { Component } from 'react';
import { ChartShallowDataShape } from '../common/data';
import { Heatmap, HeatmapProps } from './Heatmap';
import moment from 'moment';
import {
  LinearXAxis,
  LinearYAxis,
  LinearYAxisTickSeries,
  LinearXAxisTickSeries,
  LinearYAxisTickLabel,
  LinearXAxisTickLabel
} from '../common/Axis';
import { memoize } from 'lodash-es';
import { HeatmapSeries, HeatmapCell } from './HeatmapSeries';
import { ChartTooltip } from '../common/TooltipArea';
import { formatValue } from '../common/utils/formatting';
import { buildDataScales, CalendarView } from './calendarUtils';

const weekDays = moment.weekdaysShort();

export interface CalendarHeatmapProps extends Omit<HeatmapProps, 'data'> {
  data: ChartShallowDataShape[];
  height: number;
  width: number;
  view: CalendarView;
}

export class CalendarHeatmap extends Component<CalendarHeatmapProps> {
  static defaultProps: Partial<CalendarHeatmapProps> = {
    view: 'year',
    series: (
      <HeatmapSeries
        padding={0.3}
        emptyColor={'transparent'}
        cell={
          <HeatmapCell
            tooltip={
              <ChartTooltip
                content={d =>
                  `${formatValue(d.metadata.meta.date)} ∙ ${formatValue(
                    d.metadata.value
                  )}`
                }
              />
            }
          />
        }
      />
    )
  };

  getDataDomains = memoize(
    (rawData: ChartShallowDataShape[], view: CalendarView) =>
      buildDataScales(rawData, view)
  );

  render() {
    const { data: rawData, view, ...rest } = this.props;
    const { data, yDomain, xDomain, start } = this.getDataDomains(
      rawData,
      view
    );

    // For month, only pass 1 tick value
    const xTickValues = view === 'year' ? null : [1];

    // Get the yAxis label formatting based on view type
    const yAxisLabelFormat = view === 'year' ? d => weekDays[d] : () => null;

    // Format the xAxis label for the start + n week
    const xAxisLabelFormat = d =>
      start
        .clone()
        .add(d, 'weeks')
        .format('MMMM');

    return (
      <Heatmap
        {...rest}
        data={data}
        yAxis={
          <LinearYAxis
            type="category"
            axisLine={null}
            domain={yDomain}
            tickSeries={
              <LinearYAxisTickSeries
                tickSize={20}
                line={null}
                label={
                  <LinearYAxisTickLabel padding={5} format={yAxisLabelFormat} />
                }
              />
            }
          />
        }
        xAxis={
          <LinearXAxis
            type="category"
            axisLine={null}
            domain={xDomain}
            tickSeries={
              <LinearXAxisTickSeries
                line={null}
                tickValues={xTickValues}
                label={
                  <LinearXAxisTickLabel
                    padding={5}
                    align="end"
                    format={xAxisLabelFormat}
                  />
                }
              />
            }
          />
        }
      />
    );
  }
}