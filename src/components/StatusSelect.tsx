import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Status } from "../common/enums";
import { State } from "../common/types";

type Props = {
  setStatus: React.Dispatch<React.SetStateAction<State>>;
  status: State;
};

const StatusSelect = ({ status, setStatus }: Props) => {
  const handleChange = (event: SelectChangeEvent) => {
    setStatus(event.target.value as State);
  };

  return (
    <Box sx={{ width: 300, mt: 5 }}>
      <FormControl fullWidth>
        <InputLabel>Status</InputLabel>
        <Select value={status} label="Status" onChange={handleChange}>
          <MenuItem value={Status.AVAILABLE}>Dostupný</MenuItem>
          <MenuItem value={Status.SOLD}>Predaný</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default StatusSelect;
