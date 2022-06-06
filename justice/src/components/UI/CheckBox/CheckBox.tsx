import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import {green} from "@material-ui/core/colors";


interface CheckBoxType {

    checked: boolean,
    onChange: any

}

interface test {
    [key: string]: any
}

const CheckBox: React.FC<CheckBoxType> = (props)  =>{
    const{
        checked,
        onChange
    } = props

    return (
        <Checkbox
            sx={{
          '& .MuiSvgIcon-root': {fontSize: 25},
          '&.Mui-checked': {
            color: green[500],
          },
        }}
            checked={checked}
            onChange={onChange}
            inputProps={{ 'aria-label': 'controlled' }}
        />
    );
}



export default CheckBox;