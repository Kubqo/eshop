import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Sizes } from "../common/enums";

type Props = {
  setSize: React.Dispatch<React.SetStateAction<Sizes>>;
  size: Sizes;
};

const SizesSelect = ({ size, setSize }: Props) => {
  const handleChange = (event: SelectChangeEvent) => {
    setSize(event.target.value as Sizes);
  };

  return (
    <Box sx={{ width: 300, mt: 5 }}>
      <FormControl fullWidth>
        <InputLabel>Veľkosť</InputLabel>
        <Select value={size} label="Veľkosť" onChange={handleChange}>
          <MenuItem value={Sizes.SMALL}>Malý</MenuItem>
          <MenuItem value={Sizes.MEDIUM}>Stredný</MenuItem>
          <MenuItem value={Sizes.BIG}>Veľký</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default SizesSelect;
