import React from 'react';
import { storiesOf } from '@storybook/react';
import { RadialAreaChart } from './RadialAreaChart';
import { medDateData } from '../../demo';
import { RadialAreaSeries, RadialArea } from './RadialAreaSeries';
import { number, boolean, object, select } from '@storybook/addon-knobs';
import {
  RadialAxis,
  RadialAxisTickSeries,
  RadialAxisTick,
  RadialAxisTickLabel,
  RadialAxisArcSeries,
  RadialAxisTickLine
} from '../common/Axis';
import { schemes } from '../common/color';

storiesOf('Charts|Area Chart/Radial', module)
  .add(
    'Simple',
    () => {
      const innerRadius = number('Inner Radius', 0.1);
      const animated = boolean('Animated', true);
      const hasGradient = boolean('Gradient', true);
      const autoRotate = boolean('Auto Rotate Labels', true);
      const color = select('Color Scheme', schemes, 'cybertron');
      const gradient = hasGradient ? RadialArea.defaultProps.gradient : null;
      const tickCount = number('Tick Count', 5);
      const arcCount = number('Arc Count', 10);
      const tickPosition = select(
        'Tick Position',
        {
          inside: 'inside',
          outside: 'outside'
        },
        'inside'
      );
      const interpolation = select(
        'Interpolation',
        {
          linear: 'linear',
          smooth: 'smooth'
        },
        'smooth'
      );
      const data = object('Data', medDateData);

      return (
        <RadialAreaChart
          height={450}
          width={450}
          data={data}
          innerRadius={innerRadius}
          series={
            <RadialAreaSeries
              colorScheme={color}
              animated={animated}
              interpolation={interpolation}
              area={<RadialArea gradient={gradient} />}
            />
          }
          axis={
            <RadialAxis
              arcs={<RadialAxisArcSeries count={arcCount} />}
              ticks={
                <RadialAxisTickSeries
                  count={tickCount}
                  tick={
                    <RadialAxisTick
                      line={<RadialAxisTickLine position={tickPosition} />}
                      label={<RadialAxisTickLabel autoRotate={autoRotate} />}
                    />
                  }
                />
              }
            />
          }
        />
      );
    },
    { options: { showPanel: true } }
  )
  .add('Resizable', () => (
    <div style={{ width: '50vw', height: '75vh', border: 'solid 1px red' }}>
      <RadialAreaChart data={medDateData} />
    </div>
  ));

storiesOf('Charts|Line/Radial', module).add(
  'Simple',
  () => {
    const innerRadius = number('Inner Radius', 80);
    const animated = boolean('Animated', true);
    const color = select('Color Scheme', schemes, 'cybertron');
    const autoRotate = boolean('Auto Rotate Labels', true);
    const tickCount = number('Tick Count', 5);
    const tickPosition = select(
      'Tick Position',
      {
        inside: 'inside',
        outside: 'outside'
      },
      'outside'
    );
    const arcCount = number('Arc Count', 10);
    const interpolation = select(
      'Interpolation',
      {
        linear: 'linear',
        smooth: 'smooth'
      },
      'smooth'
    );
    const data = object('Data', medDateData);

    return (
      <RadialAreaChart
        height={450}
        width={450}
        data={data}
        innerRadius={innerRadius}
        series={
          <RadialAreaSeries
            area={null}
            colorScheme={color}
            animated={animated}
            interpolation={interpolation}
          />
        }
        axis={
          <RadialAxis
            arcs={<RadialAxisArcSeries count={arcCount} />}
            ticks={
              <RadialAxisTickSeries
                count={tickCount}
                tick={
                  <RadialAxisTick
                    line={<RadialAxisTickLine position={tickPosition} />}
                    label={<RadialAxisTickLabel autoRotate={autoRotate} />}
                  />
                }
              />
            }
          />
        }
      />
    );
  },
  { options: { showPanel: true } }
);
