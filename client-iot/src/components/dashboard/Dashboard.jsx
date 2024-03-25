import { useEffect, useState } from "react";
import { Box, Grid, Button } from "@mui/material";
import "../../App.css";

import React from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import fan from "../../img/fan.png";
import Switch from "@mui/material/Switch";
import WbIncandescentRoundedIcon from "@mui/icons-material/WbIncandescentRounded";
import WbIncandescentOutlinedIcon from "@mui/icons-material/WbIncandescentOutlined";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { WeatherInforGrid, WrapDashboard } from "./DasboardStyled";
const Dashboard = () => {
  const [isActive, setIsActive] = useState(false);
  const [isGlow, setIsGlow] = useState(false);
  const [isWarning, setIsWarning] = useState(false);
  const [humidity, setHumidity] = useState();
  const [temperature, setTemperature] = useState();
  const random = Math.floor(Math.random() * 100) + 1;
  // const random2 = Math.floor(Math.random() * (50 - -10 + 1)) + -10;
  const [chartData, setChartData] = useState({
    temperatureData: [10, 20, 30, 15, 23],
    humidityData: [30, 20, 10, 25, 40],
    pressureData: [12, 30, 20, 56, 20],
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
  console.log("is temperature", temperature);
  console.log("is humidity", humidity);
  return (
    <WrapDashboard className="wrapDashboard">
      <Grid container>
        <Grid xs={12} item display={"flex"}>
          <WeatherInforGrid
            className={`temperature ${isWarning ? "warning" : ""}`}
            xs={4}
            item
            sx={{ background: getTemperatureColor() }}
          >
            <Grid sx={{ textAlign: "center" }} xs={12}>
              {temperature && temperature}
            </Grid>
            <Grid sx={{ textAlign: "center" }} xs={12}>
              Nhiệt độ
            </Grid>
          </WeatherInforGrid>
          <WeatherInforGrid
            xs={4}
            item
            sx={{ backgroundColor: getHumidityColor() }}
          >
            <Grid sx={{ textAlign: "center" }} xs={12}>
              {humidity && humidity} %
            </Grid>
            <Grid sx={{ textAlign: "center" }} xs={12}>
              Độ ẩm
            </Grid>
          </WeatherInforGrid>
          <WeatherInforGrid xs={4} item>
            <Grid sx={{ textAlign: "center" }} xs={12}>
              20
            </Grid>
            <Grid sx={{ textAlign: "center" }} xs={12}>
              Km/h
            </Grid>
          </WeatherInforGrid>
        </Grid>
        <Grid xs={12} item display={"flex"}>
          <Grid sx={{ border: "1px solid black" }} xs={8} item>
            <LineChart
              xAxis={[{ data: [1, 2, 3, 5, 8] }]}
              yAxis={[
                { id: "linearAxis", scaleType: "linear" },
                { id: "logAxis", scaleType: "log" },
              ]}
              series={[
                {
                  data: chartData.temperatureData,
                  label: "Temperature",
                },
                {
                  data: chartData.humidityData,
                  label: "Humidity",
                },
                {
                  data: chartData.pressureData,
                  label: "Pressure",
                },
              ]}
              height={300}
              sx={{ width: "100%" }}
              leftAxis="linearAxis"
              rightAxis="linearAxis"
            />
          </Grid>
          <Grid sx={{ border: "1px solid black" }} xs={4} item>
            <Grid
              sx={{ border: "1px solid black", padding: "5px" }}
              xs={12}
              item
            >
              <img
                className={`fan-image ${isActive ? "active" : ""}`}
                style={{ maxHeight: "100px" }}
                src={fan}
                alt="fan"
              />
              <Stack
                direction="row"
                display={"flex"}
                justifyContent={"center"}
                spacing={1}
                alignItems="center"
              >
                <Button
                  sx={{ background: !isActive && "#ef5350" }}
                  onClick={handleFan}
                  variant="contained"
                >
                  {isActive ? "Off" : "On"}
                </Button>
              </Stack>
            </Grid>
            <Grid xs={12} item>
              {isGlow ? (
                <WbIncandescentRoundedIcon
                  sx={{ minWidth: "80px", minHeight: "80px" }}
                />
              ) : (
                <WbIncandescentOutlinedIcon
                  sx={{ minWidth: "80px", minHeight: "80px" }}
                />
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
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </WrapDashboard>
  );
};

export default Dashboard;
