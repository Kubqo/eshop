import { Box, Typography } from "@mui/material";

import usePageTitle from "../hooks/usePageTitle";

const Contact = () => {
  usePageTitle("Domov");

  return (
    <Box
      sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      <Typography sx={{ mt: 5 }} variant="h6">
        E-mail:
      </Typography>
      <Typography sx={{ mt: 5, ml: 1 }}>
        sidikova.stromceky@gmail.com
      </Typography>
    </Box>
  );
};

export default Contact;
