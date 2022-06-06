import React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


interface TypeSelectMui{
  selectValue: any,
  handleChangeSelect: any,
  minWidth: string,
  name: string,
  array: any
}


const SelectMui:React.FC<TypeSelectMui> = (props) => {
  const {
    selectValue,
    handleChangeSelect,
    minWidth,
    name,
    array
  } = props

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
          {array && array.map((country:any) =>
             <MenuItem
              key={country.currency}
              value={country.currency}>
              <img
                src={`${country.icon}`}
                alt='Иконка'/>
              {country.currency}
            </MenuItem>

          )}
        </Select>
      </FormControl>
    </Box>
  );

};

export default SelectMui;