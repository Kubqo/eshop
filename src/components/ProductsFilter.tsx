import * as React from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import theme from "../utils/theme";
import { Types } from "../common/enums";

type PropsFilter = {
  filterProducts: Types;
  setFilterProducts: React.Dispatch<React.SetStateAction<Types>>;
};

const ProductsFilter = ({ filterProducts, setFilterProducts }: PropsFilter) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        mt: 2,
        mb: 4,
        "& > *": {
          m: 1,
        },
      }}
    >
      <Button
        sx={{
          mx: 1,
          color: theme.palette.primary.main,
          borderRadius: "25px",
          border: filterProducts === Types.TREE ? "1px solid black" : "",
        }}
        onClick={() => setFilterProducts(Types.TREE)}
      >
        Stromčeky
      </Button>
      <Button
        sx={{
          mx: 1,
          color: theme.palette.primary.main,
          borderRadius: "25px",
          border: filterProducts === Types.JAWELERY ? "1px solid black" : "",
        }}
        onClick={() => setFilterProducts(Types.JAWELERY)}
      >
        Šperky
      </Button>
      <Button
        sx={{
          mx: 1,
          color: theme.palette.primary.main,
          borderRadius: "25px",
          border: filterProducts === Types.OTHER ? "1px solid black" : "",
        }}
        onClick={() => setFilterProducts(Types.OTHER)}
      >
        Ostatné
      </Button>
    </Box>
  );
};
export default ProductsFilter;
