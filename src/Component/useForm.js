import React, { useState } from 'react'
import { makeStyles } from "@material-ui/core";
import { enIE } from 'date-fns/locale';

export function useForm(initialFValues, validateOnChange = false, validate) {
    const [values, setValues] = useState(initialFValues);
    const [errors, setErrors] = useState({});

    const handleInputChange = e => {
        //debugger;
        if (e.target.type === "checkbox") {
            //e.target.value = e.target.checked;
            const { name, checked } = e.target
            setValues({
                ...values,
                [name]: checked
            })
            if (validateOnChange)
                validate({ [name]: checked })
        }
        else{
            const { name, value } = e.target
            setValues({
                ...values,
                [name]: value
            })
            if (validateOnChange)
                validate({ [name]: value })
        }
        //
    }

    const resetForm = () => {
        setValues(initialFValues);
        setErrors({})
    }


    return {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm

    }
}


const useStyles = makeStyles(theme => ({
    root: {
        '& .MuiFormControl-root': {
            width: '80%',
            margin: theme.spacing(1)
        }
    }
}))

export function Form(props) {

    const classes = useStyles();
    const { children, ...other } = props;
    return (
        <form className={classes.root} autoComplete="off" {...other}>
            {props.children}
        </form>
    )
}

