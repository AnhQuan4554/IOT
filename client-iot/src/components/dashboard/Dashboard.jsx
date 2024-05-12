import { useEffect, useState } from "react";
import { Box, Grid, Button, Typography } from "@mui/material";
import "../../App.css";

import React from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import fan from "../../img/fan.png";
import Stack from "@mui/material/Stack";
import humidityIcon from "./icon/humidity.svg";
import lightIcon from "./icon/light.svg";
import temperatureIcon from "./icon/temperature.svg";
import lightOffIcon from "./icon/lightOffIcon.svg";
import lightOnIcon from "./icon/lightOnIcon.svg";
import {
  WeatherInforGrid,
  WrapDashboard,
  WrapWeatherInforGrid,
  ImageIcon,
  WeatherInforGridItem,
  DeviceGrid,
  WrapDeviceGrid,
} from "./DasboardStyled";
import { socket } from "./DataSensorSocket";
import ChartDashboard from "./ChartDashboard";

const Dashboard = () => {
  const [isActive, setIsActive] = useState(false);
  const [isGlow, setIsGlow] = useState(false);
  const [isWarning, setIsWarning] = useState(false);
  const [humidity, setHumidity] = useState();
  const [temperature, setTemperature] = useState();
  const [light, setLight] = useState(10);
  const [xData, setXData] = useState([1, 2, 3, 5, 8]);
  const [chartData, setChartData] = useState({
    temperatureChartData: [10, 20, 30, 15, 23],
    humidityChartData: [30, 20, 10, 25, 40],
    lightChartData: [12, 30, 20, 56, 20],
  });
  setInterval(() => {}, 1000);
  const handleFan = () => {
    setIsActive(!isActive);
  };
  const handleLightBulb = () => {
    setIsGlow(!isGlow);
  };
  useEffect(() => {
    const randomValue = Math.floor(Math.random() * 100) + 1;
    const randomValue2 = Math.floor(Math.random() * (50 - -10 + 1)) + -10;

    setHumidity(randomValue);
    setTemperature(randomValue2);
  }, []);

  const getHumidityColor = () => {
    const hue = (humidity / 100) * 120;

    return `hsl(${hue}, 100%, 50%)`;
  };

  const getTemperatureColor = () => {
    const normalizedTemperature = Math.min(Math.max(temperature, -10), 40);
    let gradientColor;

    if (temperature <= 12) {
      gradientColor = `linear-gradient(90deg, #244782, #00d4ff)`;
    } else if (temperature > 12 && temperature <= 20) {
      gradientColor = `linear-gradient(90deg, #00d4ff, #6a6d73)`;
    } else if (temperature > 20 && temperature <= 25) {
      gradientColor = `linear-gradient(90deg, #6a6d73, #ff9500)`;
    } else if (temperature > 25 && temperature < 30) {
      gradientColor = `linear-gradient(90deg, #ff9500, #ff3700)`;
    } else {
      gradientColor = `linear-gradient(90deg, #ff3700, #ff0000)`;
    }

    return gradientColor;
  };
  useEffect(() => {
    if (temperature >= 30) {
      setIsWarning(true);
    }
  }, [temperature]);
  /// handle socket
  useEffect(() => {
    const newChartData = { ...chartData };
    let newXData = [...xData];
    const changeDataFromSocket = async (
      temperatureData,
      humidityData,
      lightData
    ) => {
      await setTemperature(temperatureData);
      await setHumidity(humidityData);
      await setLight(lightData);
      ///

      // delete fist old data
      newChartData.temperatureChartData = [
        ...newChartData.temperatureChartData.slice(1),
        temperatureData,
      ];
      newChartData.humidityChartData = [
        ...newChartData.humidityChartData.slice(1),
        humidityData,
      ];
      newChartData.lightChartData = [
        ...newChartData.lightChartData.slice(1),
        lightData,
      ];
      setChartData(newChartData);
      // set x Data

      newXData = [...newXData.slice(1), newXData[newXData.length - 1] + 1];
      setXData(newXData);
    };
    // no-op if the socket is already connected

    socket.connect();
    socket.on("feLight", (value) => {
      const { temperatureData, humidityData, lightData } = value.data;

      value.data &&
        changeDataFromSocket(temperatureData, humidityData, lightData);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <WrapDashboard className="wrapDashboard">
      <Grid container>
        <WrapWeatherInforGrid xs={12} item rowSpacing={2}>
          <WeatherInforGrid
            className={`temperature ${isWarning ? "warning" : ""}`}
            xs={3.5}
            item
            sx={{ background: getTemperatureColor() }}
          >
            <WeatherInforGridItem xs={12}>
              <Typography variant="h5" fontWeight={600}>
                Temperature
              </Typography>
              <ImageIcon src={temperatureIcon} />
            </WeatherInforGridItem>
            <WeatherInforGridItem xs={12}>
              <Typography variant="h4" fontWeight={600}>
                {temperature && temperature}°C
              </Typography>
            </WeatherInforGridItem>
          </WeatherInforGrid>
          <WeatherInforGrid
            xs={3.5}
            item
            sx={{ backgroundColor: getHumidityColor() }}
          >
            <WeatherInforGridItem xs={12}>
              <Typography variant="h5" fontWeight={600}>
                Humidity
              </Typography>
              <ImageIcon src={humidityIcon} />
            </WeatherInforGridItem>
            <WeatherInforGridItem xs={12}>
              <Typography variant="h4" fontWeight={600}>
                {humidity && humidity} %
              </Typography>
            </WeatherInforGridItem>
          </WeatherInforGrid>
          <WeatherInforGrid xs={3.5} item>
            <WeatherInforGridItem xs={12}>
              <Typography variant="h5" fontWeight={600}>
                Brightness
              </Typography>
              <ImageIcon src={lightIcon} />
            </WeatherInforGridItem>
            <WeatherInforGridItem xs={12}>
              <Typography variant="h4" fontWeight={600}>
                {light && light}
              </Typography>
            </WeatherInforGridItem>
          </WeatherInforGrid>
        </WrapWeatherInforGrid>
        <Grid xs={12} item display={"flex"}>
          <Grid sx={{ border: "1px solid black" }} xs={8} item>
            <ChartDashboard chartData={chartData} xData={xData} />
          </Grid>
          <WrapDeviceGrid sx={{ border: "1px solid black" }} xs={4} item>
            <DeviceGrid xs={12} item>
              <img
                className={`fan-image ${isActive ? "active" : ""}`}
                style={{ maxHeight: "120px" }}
                src={fan}
                alt="fan"
              />

              <Button
                sx={{ background: !isActive && "#ef5350" }}
                onClick={handleFan}
                variant="contained"
              >
                {isActive ? "Off" : "On"}
              </Button>
            </DeviceGrid>
            <DeviceGrid xs={12} item>
              {isGlow ? (
                <img src={lightOnIcon} style={{ width: "120px" }} />
              ) : (
                <img src={lightOffIcon} style={{ width: "120px" }} />
              )}
              <Stack
                direction="row"
                display={"flex"}
                justifyContent={"center"}
                spacing={1}
                alignItems="center"
              >
                <Button
                  sx={{ background: !isGlow && "#ef5350" }}
                  onClick={handleLightBulb}
                  variant="contained"
                >
                  {isGlow ? "Off" : "On"}
                </Button>
              </Stack>
            </DeviceGrid>
          </WrapDeviceGrid>
        </Grid>
      </Grid>
    </WrapDashboard>
  );
};

export default Dashboard;
