import { useState } from "react";
import { Box, Grid } from "@mui/material";

import React from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import fan from "../../img/fan.png";
import Switch, { SwitchProps } from "@mui/material/Switch";
import WbIncandescentRoundedIcon from "@mui/icons-material/WbIncandescentRounded";
import WbIncandescentOutlinedIcon from "@mui/icons-material/WbIncandescentOutlined";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
const Dashboard = () => {
  const [isActive, setIsActive] = useState(false);
  const [isGlow, setIsGlow] = useState(false);
  const [isWarning, setIsWarning] = useState(false);
  const handleFan = () => {
    // Đảo ngược trạng thái "active" khi ảnh được click
    setIsActive(!isActive);
  };
  const handleLightBulb = () => {
    setIsGlow(!isGlow);
  };

  return (
    <Box className={`wrapDashboard ${isWarning ? "warning" : ""}`}>
      <Grid container>
        <Grid xs={12} item display={"flex"}>
          <Grid xs={4} item sx={{ border: "1px solid black" }}>
            <Grid xs={12}>20 C</Grid>
            <Grid xs={12}>Nhiệt độ</Grid>
          </Grid>
          <Grid xs={4} item sx={{ border: "1px solid black" }}>
            <Grid xs={12}>20 CM</Grid>
            <Grid xs={12}>Độ dài</Grid>
          </Grid>
          <Grid xs={4} item sx={{ border: "1px solid black" }}>
            <Grid xs={12}>20 C</Grid>
            <Grid xs={12}>Nhiệt độ</Grid>
          </Grid>
        </Grid>
        <Grid xs={12} item display={"flex"}>
          <Grid sx={{ border: "1px solid black" }} xs={8} item>
            <LineChart
              xAxis={[{ data: [1, 2, 3, 5, 8, 10, 12] }]}
              series={[
                {
                  data: [2, 4.5, 2, 8.5, 1.5, 5],
                },
                {
                  data: [3, 4.5, 5, 6.5, 6.5, 7],
                },
                {
                  data: [5, 7.5, 8, 1.5, 6.5, 7],
                },
              ]}
              height={300}
              sx={{ width: "100%" }}
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
                <Typography>Off</Typography>
                <Switch
                  onClick={handleFan}
                  inputProps={{ "aria-label": "ant design" }}
                />
                <Typography>On</Typography>
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
                <Typography>Off</Typography>
                <Switch
                  onClick={handleLightBulb}
                  inputProps={{ "aria-label": "ant design" }}
                />
                <Typography>On</Typography>
              </Stack>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
