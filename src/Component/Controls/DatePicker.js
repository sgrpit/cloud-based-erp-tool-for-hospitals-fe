import React from 'react'
import { MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { Grid } from '@material-ui/core';

export default function DatePicker(props) {

    const { name, label, value, onChange } = props
    const convertToDefEventPara = (name, value) => ({
        target: {
            name, value
        }
    })

    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Grid container justifyContent="space-around">
            <KeyboardDatePicker
                margin="normal" variant="outlined"
                name={name}
                label={label}
                format="yyyy-MM-dd"
                value={value}
                onChange={date => onChange(convertToDefEventPara(name, date))}
                KeyboardButtonProps={{
                    'aria-label': 'change date',
                }}
            />
            </Grid>
        </MuiPickersUtilsProvider>
    )
}
