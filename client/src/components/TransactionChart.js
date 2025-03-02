import * as React from "react";
import Paper from "@mui/material/Paper";
import { scaleBand } from "@devexpress/dx-chart-core";
import {
  Chart,
  ArgumentAxis,
  ValueAxis,
  BarSeries,
  Tooltip,
} from "@devexpress/dx-react-chart-material-ui";
import {
  Animation,
  ArgumentScale,
  EventTracker,
} from "@devexpress/dx-react-chart";
// Remove the dayjs import since it's not being used

export default function TransactionChart({ data }) {
  if (!data || data.length === 0) {
    return <div>No transactions to display</div>;
  }

  const chartData = data.map((item) => ({
    month: new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    totalExpenses: Number(item.amount),
    category: item.category?.label || 'Uncategorized'
  }));

  return (
    <Paper className="chart-container">
      <Chart data={chartData}>
        <ArgumentScale factory={scaleBand} />
        <ArgumentAxis />
        <ValueAxis />
        <BarSeries
          valueField="totalExpenses"
          argumentField="month"
          color="green"
        />
        <Animation />
        <EventTracker />
        <Tooltip />
      </Chart>
    </Paper>
  );
}