import { Grid, makeStyles } from '@material-ui/core'
import React, { useEffect } from 'react'
import Controls from '../Controls/Controls'
import { Form, useForm } from '../useForm'

const useStyles = makeStyles(theme => ({
    root: {
            '& .MuiGrid-root': {
                marginLeft: '10%',
                marginRight: '10%'
        }
    },
    gridItem: {
        width: '60%',
    }
    
}))

const initialFValues = {
    id: 0,
    departmentName: '',    
    departmentDesc: ''    
}


export default function AddDepartments(props) {
    const classes = useStyles();
    const { addOrEditDepartment, deptForEdit } = props

    const Validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('departmentName' in fieldValues)
            temp.departmentName = fieldValues.departmentName ? "" : "Department Name  required."
        if ('departmentDesc' in fieldValues)
            temp.departmentDesc = fieldValues.departmentDesc ? "" : "Department Description required."    
        
        setErrors({
            ...temp
        })

        if (fieldValues == values)
            return Object.values(temp).every(x => x == "")
    }
    
    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(initialFValues, false, Validate)
    
    const handleSubmit = e => {
        e.preventDefault();
        if(Validate()){
            addOrEditDepartment(values, resetForm);
        }
        
    }

    useEffect(() => {
        if(deptForEdit != null){
            setValues({...deptForEdit})
        }
    }, [deptForEdit])

    
    return (
        <Form onSubmit={handleSubmit}>
            <Grid container className={classes.root}>
                <Grid item sx={6} className={classes.gridItem}>
                        <div style={{display:'flex'} }>
                            <div><Controls.Input
                                variant='outlined' name='departmentName' label='Department Name'
                                value={values.departmentName} onChange={handleInputChange}
                                error={errors.departmentName}
                            /></div>
                            <div><Controls.Input
                                variant='outlined' name='departmentDesc' label='Department Description'
                                value={values.departmentDesc} onChange={handleInputChange}
                                error={errors.departmentDesc}
                            /></div>
                        </div>
                </Grid>
               
                <Grid item sx={6} className={classes.gridItem}>
                    <div style={{display:'flex', marginLeft:'5em', marginTop:'1em'}}>
                        <div>
                            <Controls.Button
                                type="submit"
                                text="Submit" />

                        </div>
                        <div style={{marginLeft:'2em'}}>
                            <Controls.Button
                                text="Reset"
                                color="default"
                                onChange={resetForm}
                            />
                        </div>
                    </div>
                </Grid>

            </Grid>
        </Form>
    )
}
