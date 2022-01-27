import { IconButton } from "@mui/material";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import * as React from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import { CartContext } from "../hooks/cartContext";
import { useContext } from "react";
import CartItem from "./CartItem";

const Cart = () => {
  const { cart } = useContext(CartContext);
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div>
      <IconButton aria-describedby={id} onClick={handleClick}>
        <ShoppingCartIcon />
      </IconButton>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        {cart.length === 0 ? (
          <Typography sx={{ p: 2 }}>Cart is empty</Typography>
        ) : (
          cart.map((item) => <CartItem item={item} />)
        )}
      </Popover>
    </div>
  );
};

export default Cart;
