import React from "react";

import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import {SelectChangeEvent} from "@mui/material";

import {CurrencyType} from "../../../types/currency";

type ArrayType = {
  currency: CurrencyType;
};


interface TypeSelectMui {
  selectValue?: CurrencyType;
  handleChangeSelect: (event: SelectChangeEvent<CurrencyType>) => void;
  minWidth: string;
  name: string;
  array: ArrayType[];
}

const SelectMui: React.FC<TypeSelectMui> = (props) => {
  const {selectValue, handleChangeSelect, minWidth, name, array} = props;
  return (
    <Box sx={{minWidth}}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{name}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selectValue}
          label="age"
          onChange={handleChangeSelect}
        >
          {array &&
            array.map((country) => (
              <MenuItem key={country.currency} value={country.currency}>
                <img src={`./${country.currency}.svg`} alt="Иконка"/>
                {country.currency}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default SelectMui;
