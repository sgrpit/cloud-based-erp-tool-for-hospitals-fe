import React, { useState, useEffect } from 'react'
import PageHeader from '../../Component/Common/PageHeader'
import PeopleOutlineTwoToneIcon from '@material-ui/icons/PeopleOutlineTwoTone'
import { Container, Grid, Paper } from '@material-ui/core'
import Controls from '../../Component/Controls/Controls'
import { getPatientDetailsByUHID } from '../../Services/PatientService'
import AdmitForm from './AdmitForm'
import { fetchStaffDetails } from '../../Services/StaffService'
import { getStaffDetailsByRoleID } from '../../Services/DoctorService'
import Notification from '../../Component/Common/Notification'

export default function AdmitPatient() {
    const [patientUHID, setPatientUHID] = useState([]);
    const [patientDetails, setPatientDetails] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })

    const handleInputChange = e => {
        setPatientUHID(e.target.value)
    }

    useEffect(() => {
        getStaffDetailsByRoleID(2).then((res) => {
            if(res.data.succeeded){
                setDoctors(res.data.data);
            }
        })
    }, [])
    
    
    
    const handleSearch = e => {
        debugger;
        getPatientDetailsByUHID(patientUHID).then((res) => {
            if(res.data.succeeded){
                setPatientDetails(res.data.data);
            }
            else{
                setPatientDetails([]);
            }
            
        })
    }


    return (
        <>
            <PageHeader title="Patient Admission" subTitle="Admission and Management Of IPD Patient"
                icon={<PeopleOutlineTwoToneIcon fontSize="small" />}
            />
            <Paper>
                <Container>
                    <Grid container >
                        <Grid item xs={6} sm={3}>
                            <Controls.Input name="PatientUHID" value={patientUHID} label="Patient UHID" onChange={handleInputChange}  />
                        </Grid>
                        <Grid item xs={6} sm={1}>
                            <Controls.Button type="Button" text="Search" onClick={handleSearch} />
                        </Grid>                        
                    </Grid>
                </Container>
            </Paper>

            <></>
            {/* {patientDetails ?? <AdmitForm patientDetails={patientDetails} />} */}
            <AdmitForm patientDetails={patientDetails} doctors={doctors} />
            <Notification
                    notify={notify}
                    setNotify={setNotify}
            />
        </>
    )
}
