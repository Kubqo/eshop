import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Types } from "../common/enums";

type Props = {
  setType: React.Dispatch<React.SetStateAction<Types>>;
  type: Types;
};

const TypesSelect = ({ type, setType }: Props) => {
  const handleChange = (event: SelectChangeEvent) => {
    setType(event.target.value as Types);
  };

  return (
    <Box sx={{ width: 300, mt: 5 }}>
      <FormControl fullWidth>
        <InputLabel>Typ</InputLabel>
        <Select value={type} label="Typ" onChange={handleChange}>
          <MenuItem value={Types.TREE}>Stromček</MenuItem>
          <MenuItem value={Types.JAWELERY}>Šperk</MenuItem>
          <MenuItem value={Types.OTHER}>Ostatné</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default TypesSelect;
