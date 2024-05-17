import { LineChart } from "@mui/x-charts/LineChart";
import React from "react";

const ChartDashboard = ({ chartData, xData }) => {
  return (
    <div>
      <LineChart
        xAxis={[{ data: xData }]}
        yAxis={[
          { id: "linearAxis", scaleType: "linear" },
          { id: "logAxis", scaleType: "log" },
        ]}
        series={[
          {
            data: chartData.temperatureChartData,
            label: "Temperature",
          },
          {
            data: chartData.humidityChartData,
            label: "Humidity",
          },
          {
            data: chartData.lightChartData,
            label: "Light",
          },
        ]}
        height={300}
        sx={{ width: "100%" }}
        leftAxis="linearAxis"
        rightAxis="linearAxis"
      />
    </div>
  );
};

export default ChartDashboard;
