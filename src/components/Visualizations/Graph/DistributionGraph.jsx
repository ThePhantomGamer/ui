import React from 'react';
import PropTypes from 'prop-types';
import strings from 'lang';
import {
  XAxis,
  YAxis,
  Tooltip,
  Bar,
  Line,
  ComposedChart,
  CartesianGrid,
  Label,
} from 'recharts';
import { StyledTooltip } from './Styled';

const DistributionTooltipContent = ({ payload, array }) => {
  const data = (payload[0] || {}).payload;
  const total = array.length ? array[array.length - 1].cumulative_sum : 0;
  return (<StyledTooltip>
    <div>{data && data.bin_name}</div>
    <div>{data && data.count} {strings.th_players}</div>
    <div>{data && (data.cumulative_sum / total * 100).toFixed(2)} {strings.th_percentile}</div>
  </StyledTooltip>);
};
DistributionTooltipContent.propTypes = {
  payload: PropTypes.arrayOf({}),
  array: PropTypes.arrayOf({}),
};

const DistributionGraph = ({
  data,
}) => {
  const mmr = data && data.mmr && data.mmr.rows;
  if (mmr) {
    return (<ComposedChart
      width={1200}
      height={600}
      data={mmr}
      margin={{
        top: 5, right: 30, left: 30, bottom: 5,
      }}
    >
      <XAxis dataKey="bin_name" interval={4}>
        <Label value="" position="insideTopRight" />
      </XAxis>
      <YAxis yAxisId="left" orientation="left" stroke="#1393f9" />
      <YAxis yAxisId="right" orientation="right" stroke="#ff4c4c" />
      <CartesianGrid
        stroke="#505050"
        strokeWidth={1}
        opacity={0.5}
      />

      <Tooltip content={<DistributionTooltipContent array={mmr} />} />
      <Bar
        dataKey="count"
        yAxisId="left"
        fill="#1393f9"
      />
      <Line
        dataKey="cumulative_sum"
        yAxisId="right"
        stroke="#ff4c4c"
      />
    </ComposedChart>
    );
  }
  return null;
};

DistributionGraph.propTypes = {
  data: PropTypes.arrayOf(),
};

export default DistributionGraph;
