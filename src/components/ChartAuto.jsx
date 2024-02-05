import React, { useState, useEffect } from "react";
import { LineChart } from "@mui/x-charts/LineChart";
const ChartAuto = () => {
  const [dataX, setDataX] = useState([1, 2, 3, 4, 5, 6, 7]);
  const [dataY, setDataY] = useState([1, 10, 30, 55, 70, 90, 50]);
  const sampleY = [150];
  useEffect(() => {
    const intervalId = setInterval(() => {
      // Sao chép dữ liệu hiện tại sang mảng mới
      const newDataX = [...dataX];
      const newDataY = [...dataY];

      // Xóa phần tử đầu tiên
      newDataX.shift();
      newDataY.shift();

      // Thêm phần tử mới vào cuối
      const lastXValue = newDataX[newDataX.length - 1] + 1;
      const lastYValue =
        newDataY[newDataY.length - 1] + Math.floor(Math.random() * 20) - 4;

      newDataX.push(lastXValue);
      newDataY.push(lastYValue);

      // Cập nhật state
      setDataX(newDataX);
      setDataY(newDataY);
    }, 300000);

    // Xóa interval khi component unmount
    return () => clearInterval(intervalId);
  }, [dataX, dataY]);
  return (
    <div>
      {" "}
      <LineChart
        xAxis={[{ data: dataX }]}
        yAxis={[
          { id: "linearAxis", scaleType: "linear" },
          { id: "logAxis", scaleType: "log" },
        ]}
        series={[
          { yAxisKey: "linearAxis", data: sampleY, label: "point" },
          { yAxisKey: "linearAxis", data: dataY, label: "linear" },
        ]}
        leftAxis="linearAxis"
        rightAxis="linearAxis"
        height={400}
      />
    </div>
  );
};

export default ChartAuto;
