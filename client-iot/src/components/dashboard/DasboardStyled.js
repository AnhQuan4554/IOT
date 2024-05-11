import { styled } from "@mui/material/styles";
import { Box, Accordion, Drawer, Grid, Typography } from "@mui/material";

export const TypographyMui = styled("Typography")({
  color: "red",
});

export const WrapDashboard = styled(Box)(() => ({
  background: "white",
  color: "#000",
}));
export const WrapWeatherInforGrid = styled(Grid)(() => ({
  display: "flex",
  justifyContent: "space-around",
  marginBottom: "30px",
}));
export const WeatherInforGrid = styled(Grid)(() => ({
  border: "1px solid black",
  padding: "10px",
  borderRadius: "10px",
  boxShadow:
    "rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset, rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px",
}));
export const ImageIcon = styled("img")(() => ({
  height: "50px",
  width: "50px",
  marginTop: "10px",
}));
export const WeatherInforGridItem = styled(Grid)(() => ({
  textAlign: "center",
  justifyContent: "space-around",
  marginBottom: "20px",
}));
export const WrapDeviceGrid = styled(Grid)(() => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
}));
export const DeviceGrid = styled(Grid)(() => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-around",
  width: "100%",
}));
