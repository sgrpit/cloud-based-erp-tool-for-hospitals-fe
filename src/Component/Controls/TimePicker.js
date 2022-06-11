import React from 'react'
import { MuiPickersUtilsProvider, KeyboardTimePicker } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { Grid } from '@material-ui/core';

export default function TimePicker(props) {

    const { name, label, value, onChange } = props
    const convertToDefEventPara = (name, value) => ({
        target: {
            name, value
        }
    })

    return (
        
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container justifyContent="space-around">
                <KeyboardTimePicker
                    margin="normal"
                    id="time-picker"
                    label="Time picker"
                    value={value}
                    onChange={time => onChange(convertToDefEventPara(name, time))}
                    KeyboardButtonProps={{
                        'aria-label': 'change time',
                    }}
                />

            </Grid>
        </MuiPickersUtilsProvider>
    )
}
