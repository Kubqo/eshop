import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import useLoggedInUser from "../hooks/useLoggedInUser";
import { signOut } from "../utils/firebase";

import theme from "../utils/theme";
import { useState } from "react";

import MenuIcon from "@mui/icons-material/Menu";
import ParkIcon from "@mui/icons-material/Park";
import HomeIcon from "@mui/icons-material/Home";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import LogoutIcon from "@mui/icons-material/Logout";
import Cart from "./Cart";

const menuItems = [
  { label: "Domov", to: "/", icon: HomeIcon },
  { label: "Ponuka", to: "/ponuka", icon: ParkIcon },
  {
    label: "Kontakt",
    to: "/kontakt",
    icon: AlternateEmailIcon,
  },
];

const adminMenuItems = [
  { label: "Nahrať nový produkt", to: "/newProduct", icon: AddIcon },
  { label: "Upraviť produkty", to: "/editProducts", icon: EditIcon },
];

const routes = {
  "/": "Domov",
  "/ponuka": "Ponuka",
  "/kontakt": "Kontakt",
  "/login": "Prihlásenie",
  "/editProducts": "Editovať produkty",
  "/newProduct": "Pridať produkt",
};

type routesType =
  | "/"
  | "/ponuka"
  | "/kontakt"
  | "/login"
  | "/editProducts"
  | "/newProduct";

const AppBar = () => {
  const user = useLoggedInUser();
  const location = useLocation();
  const [state, setState] = useState<boolean>(false);

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setState(open);
    };

  return (
    <>
      <Box
        sx={{
          backgroundColor: theme.palette.primary.main,
          height: 70,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingX: 2,
        }}
      >
        <IconButton onClick={toggleDrawer(true)}>
          <MenuIcon />
        </IconButton>

        <Drawer anchor="left" open={state} onClose={toggleDrawer(false)}>
          <Box
            sx={{ width: 250 }}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
          >
            <List>
              {menuItems.map((menuItem) => (
                <ListItem
                  component={Link}
                  to={menuItem.to}
                  key={menuItem.label}
                >
                  <ListItemIcon>{<menuItem.icon />}</ListItemIcon>
                  <ListItemText primary={menuItem.label} />
                </ListItem>
              ))}

              {user && (
                <>
                  <Divider />
                  {adminMenuItems.map((menuItem) => (
                    <ListItem
                      component={Link}
                      to={menuItem.to}
                      key={menuItem.label}
                    >
                      <ListItemIcon>{<menuItem.icon />}</ListItemIcon>
                      <ListItemText primary={menuItem.label} />
                    </ListItem>
                  ))}
                  <Divider />
                  <ListItem onClick={signOut}>
                    <ListItemIcon>
                      <LogoutIcon />
                    </ListItemIcon>
                    <ListItemText primary={"Odhlásiť sa"} />
                  </ListItem>
                </>
              )}
            </List>
          </Box>
        </Drawer>

        <Typography
          sx={{
            color: theme.palette.primary.light,
            fontFamily: `Logo`,
            fontSize: 30,
          }}
        >
          Šidíková
        </Typography>

        <Cart />
      </Box>
      <Box
        sx={{
          backgroundColor: theme.palette.secondary.main,
          height: 70,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
        }}
      >
        <Typography variant="h5">
          {routes[location.pathname as routesType]}
        </Typography>
      </Box>
    </>
  );
};

export default AppBar;
