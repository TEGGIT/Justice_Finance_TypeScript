import * as React from 'react';
import Checkbox, {CheckboxProps} from '@mui/material/Checkbox';
import {green} from "@material-ui/core/colors";


const CheckBox: React.FC<CheckboxProps> = (props) => {

    return (
        <Checkbox
            sx={{
                '& .MuiSvgIcon-root': {fontSize: 25},
                '&.Mui-checked': {
                    color: green[500],
                },
            }}
            inputProps={{'aria-label': 'controlled'}}
            {...props}
        />
    );
}


export default CheckBox;