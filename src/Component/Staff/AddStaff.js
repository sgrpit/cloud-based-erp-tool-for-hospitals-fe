import React, { useEffect, useState } from 'react'
import Controls from '../Controls/Controls'
import { Form, useForm } from '../useForm'
import { Paper, Grid, CircularProgress } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { AirlineSeatIndividualSuiteSharp } from '@material-ui/icons'
import { indigo } from '@material-ui/core/colors'
import validator from 'validator'

const useStyle = makeStyles(theme => ({

}))

const initialFValues = {
    id: 0,
    firstName: '',
    lastName: '',
    middleName: '',
    mobileNo: '',
    emailId: '',
    address: '',
    city: '',
    zipCode: '',
    gender: '',
    dateOfBirth: new Date(),
    joiningDate: new Date(),
    isPermanent: true,
    departmentsId: 0,
    userRoleId: 0
}

const genderItems = [
    { id: 'male', title: 'Male' },
    { id: 'female', title: 'Female' },
    { id: 'other', title: 'Other' },
]

export default function AddStaff(props) {
    const classes = useStyle();
    const { addOrEditStaff, staffForEdit, departments, roleDetails } = props
    debugger;
    const [isLoading, setIsLoading] = useState(false)
    const Validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('firstName' in fieldValues)
            temp.firstName = fieldValues.firstName ? "" : "First Name Required"
        if ('middleName' in fieldValues)
            temp.middleName = fieldValues.middleName ? "" : "Middle Name Required"
        if ('lastName' in fieldValues)
            temp.lastName = fieldValues.lastName ? "" : "last Name Required"
        if ('mobileNo' in fieldValues)
            temp.mobileNo = validator.isMobilePhone(fieldValues.mobileNo) ? "" : "Valid Mobile No Required"
        if ('emailId' in fieldValues)
            temp.emailId = validator.isEmail(fieldValues.emailId) ? "" : "Valid Email Id Required"
        if ('zipCode' in fieldValues)
            temp.zipCode = fieldValues.zipCode ? "" : "Zip code Required"
        if ('city' in fieldValues)
            temp.city = fieldValues.city ? "" : "CityRequired"
        if ('departmentsId' in fieldValues)
            temp.departmentsId = fieldValues.departmentsId ? 0 : "Department Required"
        
        

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
    } = useForm(initialFValues, false, Validate)

    useEffect(() => {
        if (staffForEdit != null)
            setValues({
                ...staffForEdit
            })
    }, [staffForEdit])

    const handleSubmit = e => {
        e.preventDefault()
        if (Validate()) {
            setIsLoading(true);
            addOrEditStaff(values, resetForm)
            setIsLoading(false)
        }
    }

    return (
        <>
            <Paper>
                {isLoading &&
                    <CircularProgress size={68} style={{ color: indigo[500], position: 'absolute', top: '50%', left: '50%', zIndex: 1 }} />
                }
                <Grid container>
                    <Grid item xs={12}>
                        <div className={classes.formWrapper}>
                            <Form onSubmit={handleSubmit}>
                                <Grid container >
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
                                            label="Email Id" onChange={handleInputChange}   error={errors.emailId}
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
                                        <Controls.DatePicker label="Joining Date"
                                            name="joiningDate"
                                            value={values.joiningDate} onChange={handleInputChange}
                                        />
                                    </Grid>
                                    <Grid item xs={4} className={classes.gridItem}>
                                        <Controls.Select
                                            name="departmentsId"
                                            label="Department"
                                            value={values.departmentsId}
                                            onChange={handleInputChange}
                                            options={departments}
                                            error={errors.departmentsId}
                                        />
                                    </Grid>
                                    <Grid item xs={4} className={classes.gridItem}>
                                        <Controls.CommonSelect
                                            name="userRoleId"
                                            label="User Role"
                                            value={values.userRoleId}
                                            onChange={handleInputChange}
                                            options={roleDetails}
                                            error={errors.userRoleId}
                                        />
                                    </Grid>
                                    <Grid item xs={12} style={{ margin: '2em' }} className={classes.gridItem}>
                                        <Controls.Button style={{ marginRight: '2em' }}
                                            type="submit"
                                            text="Submit" />
                                        <Controls.Button style={{ marginLeft: '2em' }}
                                            text="Reset"
                                            color="default"
                                            onClick={resetForm}
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
