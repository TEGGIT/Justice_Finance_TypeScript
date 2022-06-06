import React from 'react';
import Checkbox from '@mui/material/Checkbox';
import {green} from '@mui/material/colors';


const CheckBox = (props) => {

  const {
    checkedMui,
    onChange
     } = props
  return (
    <>
      <Checkbox
        sx={{
          '& .MuiSvgIcon-root': {fontSize: 25},
          color: green[0],
          '&.Mui-checked': {
            color: green[500],
          },
        }}
        checked={checkedMui}
        onChange={onChange}
        inputProps={{'aria-label': 'controlled'}}

      />
    </>
  );
};

export default CheckBox;