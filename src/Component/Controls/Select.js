import React from 'react'
import { FormControl, InputLabel, Select as MuiSelect, MenuItem, FormHelperText } from '@material-ui/core';


export function Select(props) {

    const { name, label, value,error=null, onChange, options } = props;
    return (
        <FormControl variant="outlined">
            <InputLabel>{label}</InputLabel>
            <MuiSelect
                label={label}
                name={name}
                value={value}
                onChange={onChange}>
                <MenuItem value="">None</MenuItem>
                {
                    options.map(
                        item => (<MenuItem key={item.id} value={item.id}>{item.departmentName}</MenuItem>)
                    )
                }
            </MuiSelect>            
        </FormControl>
    )
}

export function CommonSelect(props) {

    const { name, label, value,error=null, onChange, options } = props;
    return (
        <FormControl variant="outlined">
            <InputLabel>{label}</InputLabel>
            <MuiSelect
                label={label}
                name={name}
                value={value}
                onChange={onChange}               
                {...(error && {error:true,helperText:error})}
                >
                <MenuItem value="">None</MenuItem>
                {
                    options.map(
                        item => (<MenuItem key={item.id} value={item.id}>{item.title}</MenuItem>)
                    )
                }

            </MuiSelect>            
        </FormControl>
    )
}
