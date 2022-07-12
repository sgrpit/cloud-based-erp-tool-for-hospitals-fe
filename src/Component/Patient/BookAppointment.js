import { FormControl, Grid, InputLabel, makeStyles, MenuItem, Select } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { bookPatientAppointment } from '../../Services/PatientService'
import { fetchDoctorsByDeptId, fetchStaffDetails } from '../../Services/StaffService'
import Controls from '../Controls/Controls'
import { Form, useForm } from '../useForm'
import validator from 'validator'

const initialFValues = {
    patientId: localStorage.getItem("Id"),
    patientName: '',
    mobileNo: '',
    emailId: '',
    appointmentDate: new Date(),
    appointmentTimeSlot: new Date().getTime(),
    departmentId: 0,
    staffId: 0
}

const useStyles = makeStyles(theme => ({
    root: {
        '& .MuiGrid-root': {
            marginLeft: '10%',
            marginRight: '10%'
        }
    },
    gridItem: {
        width: '30%',
    }
}))

export default function BookAppointment(props) {

    const classes = useStyles();
    const {departments, patientDetails, bookAppointment} = props;
    const[staffs, setStaffs] = useState([])

    const Validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('patientName' in fieldValues)
            temp.patientName = fieldValues.patientName ? "" : "Patient Name Required"
        if ('mobileNo' in fieldValues)
            temp.mobileNo = validator.isMobilePhone(fieldValues.mobileNo) ? "" : "Valid Mobile No Required"
        if ('emailId' in fieldValues)
            temp.emailId = validator.isEmail(fieldValues.emailId) ? "" : "Valid Email Id Required"
        if ('departmentsId' in fieldValues)
            temp.departmentsId = fieldValues.departmentsId ? 0 : "Department Required"
        if ('staffId' in fieldValues)
            temp.staffId = fieldValues.staffId ? 0 : "Doctor Required"
        // if ('appointmentDate' in fieldValues)
        //     temp.appointmentDate = fieldValues.appointmentDate > new Date() ? "" : "Date should not be in past"
        
        

        setErrors({
            ...temp
        })
        if (fieldValues == values)
            return Object.values(temp).every(x => x == "")
    };
    
    const {
        values,
        handleInputChange,
        errors,
        resetForm,
        setErrors
    } = useForm(initialFValues)

    //values.patientName = patientDetails && patientDetails.firstName + " " + patientDetails.lastName
    //values.mobileNo = patientDetails && patientDetails.mobileNo
    const handleSubmit = e => {
        e.preventDefault();
        debugger;
        if (Validate()) {
            values.patientId = patientDetails.id;
            //values.appointmentDate = values.undefined;
            bookAppointment(values, resetForm);
        }

        
    }

    const handleDepartmentChange = (e) => {
        debugger;
        handleInputChange(e);
        fetchDoctorsByDeptId(e.target.value).then((res) => {
            if(res.data.succeeded){
                setStaffs(res.data.data);
            }
        })
    }   

    return (
        <>
            <Form onSubmit={handleSubmit}>
            <Grid container className={classes.root}>
                <Grid item sx={12} className={classes.gridItem}>
                    <Controls.Input
                        variant='outlined' name='patientName' label='Patient Name'
                        value={values.patientName} onChange={handleInputChange}
                        error={errors.patientName}
                    />
                </Grid>
                <Grid item sx={6} className={classes.gridItem}>
                    <Controls.Input
                        variant='outlined' name='mobileNo' label='Mobile No'
                        value={values.mobileNo} onChange={handleInputChange}
                        error={errors.mobileNo}
                    />
                </Grid>
                <Grid item sx={6} className={classes.gridItem}>
                    <Controls.Input
                        variant='outlined' name='emailId' label='Email ID'
                        value={values.emailId} onChange={handleInputChange}
                        error={errors.emailId}
                    />
                </Grid>
                <Grid item sx={6} className={classes.gridItem}>
                        <Controls.Select
                            name="departmentId"
                            label="Department"
                            value={values.departmentsId}
                            onChange={handleDepartmentChange}
                            options={departments}
                            error={errors.departmentsId}
                        />
                    </Grid>
                    <Grid item sx={6} className={classes.gridItem}>
                        <FormControl variant="outlined">
                            <InputLabel>Doctor</InputLabel>
                            <Select
                                label="Doctor"
                                name="staffId"
                                value={values.id}
                                onChange={handleInputChange}>
                                <MenuItem value="">None</MenuItem>
                                {
                                    staffs.map(
                                        item => (<MenuItem key={item.id} value={item.id}>{item.firstName + " " + item.lastName}</MenuItem>)
                                    )
                                }
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item sx={6} className={classes.gridItem} style={{ marginLeft: '6em' }}>
                        <Controls.DatePicker label="Appointment Date"
                            name="appointmentDate"
                            value={values.appointmentDate} onChange={handleInputChange}
                            error={errors.appointmentDate} minDate={new Date()}
                        />
                    </Grid>
                    <Grid item sx={6} className={classes.gridItem} style={{ marginLeft: '6em' }}>
                        <Controls.TimePicker label="Time Slot"
                            name="appointmentTimeSlot" 
                            value={values.appointmentTimeSlot} onChange={handleInputChange}
                        />
                </Grid>
                <Grid item sx={6} className={classes.gridItem}>
                    <div style={{display:'flex', marginLeft:'3.5em', marginTop:'1em'}}>
                        <div>
                            <Controls.Button
                                type="submit"
                                text="Submit" />

                        </div>
                        <div style={{marginLeft:'2em'}}>
                            <Controls.Button
                                text="Reset"
                                color="default"
                                onClick={resetForm}
                            />
                        </div>
                    </div>
                </Grid>
            </Grid>
        </Form>
        </>   
    )
}
