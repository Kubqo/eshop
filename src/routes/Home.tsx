import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";

import usePageTitle from "../hooks/usePageTitle";
import theme from "../utils/theme";

const HomePage = () => {
  usePageTitle("Domov");
  console.log(theme.breakpoints.down("md"));

  return (
    <Box
      sx={{
        height: "85%",
        maxWidth: "100%",
        overflowY: "hidden",
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        padding: "1%",
      }}
    >
      <Box
        sx={{
          backgroundColor: theme.palette.primary.main,
          width: "60%",
          height: "40%",
          position: "absolute",
          border: "10px solid white",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
          alignItems: "center",
          padding: 10,
        }}
      >
        <Typography variant="h1" sx={{ margin: 2, color: "white" }}>
          Vitajte v eshope!
        </Typography>
        <Button
          component={Link}
          to="/ponuka"
          sx={{
            border: "5px solid white",
            display: "flex",
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.secondary.main,
          }}
          variant="contained"
        >
          Prejsť na produkty
        </Button>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          padding: "1%",
          [theme.breakpoints.down("sm")]: {
            flexDirection: "column",
          },
          [theme.breakpoints.down("lg")]: {
            "&>:nth-child(3)": {
              display: "none",
            },
          },
          [theme.breakpoints.down("sm")]: {
            "&>:nth-child(2)": {
              display: "none",
            },
          },
        }}
      >
        {Array.from(Array(3).keys()).map((idx) => (
          <Box
            sx={{
              [theme.breakpoints.up("lg")]: {
                maxWidth: "32%",
              },
              [theme.breakpoints.down("lg")]: {
                maxWidth: "42%",
              },
              [theme.breakpoints.down("sm")]: {
                maxWidth: "100%",
              },
            }}
          >
            <img
              style={{ maxWidth: "100%" }}
              src={`grid/${idx + 1}.jpg`}
              alt=""
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default HomePage;
