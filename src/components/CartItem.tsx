import { Box } from "@mui/material";
import { Tree } from "../common/types";

type Props = {
  item: Tree;
};

const CartItem = ({ item }: Props) => {
  return (
    <Box>
      {item.name} | {item.price}
    </Box>
  );
};

export default CartItem;
