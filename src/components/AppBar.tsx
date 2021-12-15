import {
  AppBar as AppBarMui,
  Box,
  Button,
  Container,
  Toolbar,
  Typography,
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import useLoggedInUser from "../hooks/useLoggedInUser";
import { signOut } from "../utils/firebase";

import theme from "../utils/theme";

const AppBar = () => {
  const user = useLoggedInUser();

  const location = useLocation();
  console.log(location.pathname);

  return (
    <AppBarMui sx={{ backgroundColor: theme.palette.secondary.dark }}>
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ gap: 2 }}>
          <Typography
            sx={{
              color: theme.palette.primary.main,
              fontFamily: `Logo`,
              fontSize: 30,
            }}
          >
            Šidíková
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Button component={Link} to="/">
            Domov
          </Button>
          {location.pathname !== "/login" && (
            <>
              <Button component={Link} to="/ponuka">
                Ponuka
              </Button>
              <Button component={Link} to="/kontakt">
                Kontakt
              </Button>
            </>
          )}
          {location.pathname === "/login" && user && (
            <>
              <Button>Nahrať nový produkt</Button>
              <Button>Upraviť produkty</Button>
              <Button variant="contained" color="error" onClick={signOut}>
                Odhlásiť sa
              </Button>
            </>
          )}
        </Toolbar>
      </Container>
    </AppBarMui>
  );
};

export default AppBar;
