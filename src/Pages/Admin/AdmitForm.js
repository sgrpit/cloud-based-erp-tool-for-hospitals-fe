import { Box, Container, FormControl, FormControlLabel, FormLabel, MuiCheckbox, Grid, makeStyles, Paper, TextareaAutosize, Typography, Checkbox, InputLabel, Select, MenuItem } from '@material-ui/core'
import { ContactsOutlined, NetworkLockedOutlined } from '@material-ui/icons'
import React, { useState } from 'react'
import Controls from '../../Component/Controls/Controls';
import { Form, useForm } from '../../Component/useForm';
import { validateUser } from '../../Services/LoginSerivce';
import { PatientAdmission } from '../../Services/PatientService';
const useStyles = makeStyles(theme => ({
    root: {
            '& .MuiGrid-root': {
                marginLeft: '1%',
                //marginRight: '1%'
        }
    },
    gridItem: {
        width: '40%',
    },
    formWrapper: {
        marginTop: theme.spacing(5),
        marginBottom: theme.spacing(8),
      },
    
}))

const options = [

    { id: '1', title: 'Super Deluxe ' },
    { id: '2', title: 'Single Deluxe' },
    { id: '3', title: 'Twin Sharing' },
    { id: '4', title: 'General Care' },
    { id: '5', title: 'ICU' },
    { id: '6', title: 'Emergency' },
]

const insuranceCompanies = [
    { id: '1', title: 'National Health Insurance ' },
    { id: '2', title: 'Apollo Munich' },
    { id: '3', title: 'Star Health Services' },
    { id: '4', title: 'New India Health Insurance' },
    { id: '5', title: 'Oriental Health Services' },
    { id: '6', title: 'Paramount Health Services' },
]


const initialFValues = {
    staffId: 0,
    patientId: 0,
    patientUHID: "",
    roomType: "",
    bedNo: "4th Floor - 407",
    isInsured: false,
    //isCashless: false,
    insuranceCompany: "",
    diagnosisDetails: "",
    advancePayment: 0.00,
    admissionDate: new Date(),
    
}

export default function AdmitForm(props) {
    const classes = useStyles();   
    const { patientDetails, doctors } = props
    
    
    debugger;
    const handleSubmit = e => {
        e.preventDefault();
        debugger;
        PatientAdmission(values).then((res) => {
            console.log(res.data.data);
        },
        (error) => {
            alert(error);
        }
        );
    }

    const {
        values,
        handleInputChange
    } = useForm(initialFValues)

    values.patientUHID = patientDetails.patientUHID;
    values.patientId = patientDetails.id
    
    return (
        <>
            <Paper>
                <Container>
                    <Grid container>
                        <Grid item xs={12}>
                            <div className={classes.formWrapper}>
                                <Form onSubmit={handleSubmit}>
                                <Container>
                                    <Grid container style={{paddingLeft:'3em'}} >
                                        <Grid item xs={6} sm={6}>
                                            <Typography component={'span'} >
                                            <div style={{display:'flex'}}>
                                                <div><b>Name : &nbsp;</b></div>
                                                <div><span> { patientDetails.firstName  ? (patientDetails.firstName + " " + patientDetails.lastName) : ""}</span></div>
                                            </div>
                                            <div><br /></div>
                                            <div style={{display:'flex'}}>
                                                <div><b>Address : </b></div>
                                                <div><span> {(patientDetails.address ? patientDetails.address : "")  + " " + (patientDetails.city ? patientDetails.city : "")}</span></div>
                                            </div>
                                            </Typography>
                                            
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Typography component={'span'} >
                                            <div style={{display:'flex'}}>
                                                <div><b>Contact No : </b></div>
                                                <div><span> {patientDetails.mobileNo}</span></div>
                                            </div>
                                            <div><br /></div>
                                            <div style={{display:'flex'}}>
                                                <div><b>Email Id : </b></div>
                                                <div><span> {patientDetails.emailID}</span></div>
                                            </div>
                                            </Typography>                                            
                                        </Grid>
                                    </Grid>
                                    </Container>
                                    <br /> <br /> 
                                    <Container>
                                        <Grid container  >
                                            <Grid item xs={6} sm={4}>
                                                <FormControl variant="outlined">
                                                    <InputLabel>Doctor</InputLabel>
                                                    <Select
                                                        label="Referral Doctor"
                                                        name="staffId"
                                                        value={values.staffId}
                                                        onChange={handleInputChange}>
                                                        <MenuItem value="">None</MenuItem>
                                                        {
                                                            doctors.map(
                                                                item => (<MenuItem key={item.id} value={item.id}>{item.firstName + " " + item.lastName}</MenuItem>)
                                                            )
                                                        }
                                                    </Select>
                                                </FormControl>
                                            </Grid>
                                            <Grid item xs={6} sm={4}>
                                                <Controls.CommonSelect name="roomType" label="Room Type" value={values.roomType} options={options}  onChange={handleInputChange} />
                                            </Grid>
                                            <Grid item xs={6} sm={4}>
                                                <Controls.Input name="bedNo" label="Bed No" value={values.bedNo} inputProps={
                                                    { readOnly: true, }
                                                } /> 
                                            </Grid>
                                            <Grid item xs={6} sm={4}>

                                                <FormControl>
                                                    <FormControlLabel
                                                        control={<Checkbox name="isInsured" value={values.isInsured} color="primary" />}
                                                        label="Are You Insured ?" onChange={handleInputChange}
                                                    />
                                                </FormControl>
                                            </Grid>
                                            {values.isInsured  ? 
                                                <Grid item xs={6} sm={4}>
                                                <Controls.CommonSelect name="insuranceCompany" label="Insurance Provider" value={values.insuranceCompany} options={insuranceCompanies}  onChange={handleInputChange} />
                                             </Grid>
                                                
                                            :
                                            <Grid item xs={6} sm={4}>
                                                    <Controls.Input name="advancePayment" value={values.advancePayment} label="Advance Payment" onChange={handleInputChange} />
                                                </Grid>
                                            }
                                            
                                            <Grid item xs={6} sm={4}>
                                                
                                            </Grid> <br></br>
                                            <Grid item xs={12} sm={12}>
                                                <TextareaAutosize variant="outlined" name="diagnosisDetails" value={values.diagnosisDetails} style={{ width: '93%', height: '5em' }} label="Diagnosis" onChange={handleInputChange} />
                                            </Grid>
                                            <Grid item xs={6} sm={4}>
                                                <Controls.Button type="submit" text="submit" />
                                            </Grid>
                                        </Grid>
                                    </Container>
                                </Form>
                            </div>
                        </Grid>
                    </Grid>
                </Container>
            </Paper>
        </>
    )
}
