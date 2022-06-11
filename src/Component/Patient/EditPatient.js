import React, { useEffect } from 'react'
import Controls from '../Controls/Controls'
import { Form, useForm } from '../useForm'
import {Paper, Grid} from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

const useStyle = makeStyles(theme => ({

}))

const initialFValues = {
    id:0,
    firstName:'',
    lastName:'',
    middleName:'',
    mobileNo:'',
    emailId:'',
    address: '',
    city: '',
    zipCode:'',
    gender: '',
    dateOfBirth: new Date(),
    bloodGroup: '',
    
} 

const genderItems = [
    { id: 'male', title: 'Male' },
    { id: 'female', title: 'Female' },
    { id: 'other', title: 'Other' },
]

export default function EditPatient(props) {
    const classes = useStyle();    
    const {addOrEditPatient, patientForEdit} = props
    debugger;
    const Validate = (fieldValues = values) => {
        let temp = {...errors}
        if ('firstName' in fieldValues)
            temp.firstName = fieldValues.firstName ? "" : "First Name Required"
        if ('middleName' in fieldValues)
            temp.middleName = fieldValues.middleName ? "" : "Middle Name Required"
        if ('lastName' in fieldValues)
            temp.lastName = fieldValues.lastName ? "" : "last Name Required"
        if ('mobileNo' in fieldValues)
            temp.mobileNo = fieldValues.mobileNo ? "" : "Mobile No Required"
        if ('zipCode' in fieldValues)
            temp.zipCode = fieldValues.zipCode ? "" : "Zip code Required"
        if ('city' in fieldValues)
            temp.city = fieldValues.city ? "" : "CityRequired"
       
        
        setErrors({
            ...temp
        })
        if (fieldValues == values)
            return Object.values(temp).every(x => x == "")
    };


    const {
        values,
        errors,
        setValues,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(initialFValues)

    useEffect(() => {
        if (patientForEdit != null)
            setValues({
                ...patientForEdit
            })
    }, [patientForEdit])

    const handleSubmit = e => {
        e.preventDefault()
        debugger;
        addOrEditPatient(values, resetForm)
    }

    return (
        <>
            <Paper>
                <Grid container>
                    <Grid item xs={12}>
                        <div className={classes.formWrapper}>
                            <Form onSubmit={handleSubmit}>
                                <Grid container >
                                    <Grid item xs={4} className={classes.gridItem}>
                                        <Controls.Input name='patientUHID' value={values.patientUHID}
                                            label="UHID" onChange={handleInputChange}
                                             inputProps={
                                                    { readOnly: true, } }
                                        />
                                    </Grid>
                                    <Grid item xs={4} className={classes.gridItem}>
                                        <Controls.Input name='firstName' value={values.firstName}
                                            label="First Name" onChange={handleInputChange}
                                            error={errors.firstName}
                                        />
                                    </Grid>
                                    <Grid item xs={4} className={classes.gridItem}>
                                        <Controls.Input name='middleName' value={values.middleName}
                                            label="Middle Name" onChange={handleInputChange}
                                            error={errors.middleName}
                                        />
                                    </Grid>
                                    <Grid item xs={4} className={classes.gridItem}>
                                        <Controls.Input name='lastName' value={values.lastName}
                                            label="Last Name" onChange={handleInputChange}
                                            error={errors.lastName}
                                        />
                                    </Grid>
                                    <Grid item xs={4} className={classes.gridItem}>
                                        <Controls.Input name='mobileNo' value={values.mobileNo}
                                            label="Mobile No" onChange={handleInputChange}
                                            error={errors.mobileNo}
                                        />
                                    </Grid>
                                    <Grid item xs={4} className={classes.gridItem}>
                                        <Controls.Input name='emailId' value={values.emailId}
                                            label="Email Id" onChange={handleInputChange}
                                        />
                                    </Grid>
                                    <Grid item xs={4} className={classes.gridItem}>
                                        <Controls.Input name='address' value={values.address}
                                            label="Address" onChange={handleInputChange}
                                        />
                                    </Grid>
                                    <Grid item xs={4} className={classes.gridItem}>
                                        <Controls.Input name='city' value={values.city}
                                            label="City" onChange={handleInputChange}
                                        />
                                    </Grid>
                                    <Grid item xs={4} className={classes.gridItem}>
                                        <Controls.Input name='zipCode' value={values.zipCode}
                                            label="Zip Code" onChange={handleInputChange}
                                        />
                                    </Grid>
                                    <Grid item xs={4} className={classes.gridItem}>
                                        <Controls.RadioGroup
                                            name="gender"
                                            label="Gender"
                                            value={values.gender}
                                            onChange={handleInputChange}
                                            items={genderItems}
                                        />
                                    </Grid>
                                    <Grid item xs={4} className={classes.gridItem}>
                                        <Controls.DatePicker label="Date Of Birth"
                                            name="dateOfBirth"
                                            value={values.dateOfBirth} onChange={handleInputChange}
                                        />
                                    </Grid>
                                    <Grid item xs={4} className={classes.gridItem}>
                                        <Controls.Input name='bloodGroup' value={values.bloodGroup}
                                            label="Blood Group" onChange={handleInputChange}
                                        />
                                    </Grid>
                                    <Grid item xs={12} style={{ margin: '2em' }} className={classes.gridItem}>
                                        <Controls.Button style={{ marginRight: '2em' }}
                                            type="submit"
                                            text="Submit" />
                                        <Controls.Button style={{ marginLeft: '2em' }}
                                            text="Reset"
                                            color="default"
                                            onChange={resetForm}
                                        />
                                    </Grid>
                                </Grid>
                            </Form>
                        </div>
                    </Grid>
                </Grid>
            </Paper>
        </>
    )
}
