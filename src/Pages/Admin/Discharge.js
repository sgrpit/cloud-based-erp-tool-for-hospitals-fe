import React, { useState } from 'react'
import PageHeader from '../../Component/Common/PageHeader'
import PeopleOutlineTwoToneIcon from '@material-ui/icons/PeopleOutlineTwoTone'
import { Container, Grid, Paper } from '@material-ui/core'
import Controls from '../../Component/Controls/Controls'
import { GetIPDPatientDetailsByPatientUHID } from '../../Services/PatientService'
import DischargeForm from './DischargeForm'

export default function Discharge() {
    const [patientUHID, setPatientUHID] = useState([]);
    const [inPatientDetails, setInPatientDetails] = useState(null);
    const handleInputChange = e => {
        setPatientUHID(e.target.value)
    }
    const handleSearch = e => {
        debugger;
        GetIPDPatientDetailsByPatientUHID(patientUHID).then((res) => {
            setInPatientDetails(res.data.data);
        })
        
    }
    return (
        <>
            <PageHeader title="Patient Discharge" subTitle="Discharge Of IPD Patient"
                icon={<PeopleOutlineTwoToneIcon fontSize="small" />}
            />

            <Paper>
                <Container>
                    <Grid container >
                        <Grid item xs={6} sm={3}>
                            <Controls.Input name="PatientUHID" value={patientUHID} label="Patient UHID" onChange={handleInputChange} />
                        </Grid>
                        <Grid item xs={6} sm={1}>
                            <Controls.Button type="Button" text="Search" onClick={handleSearch} />
                        </Grid>
                    </Grid>
                </Container>
            </Paper>
            <DischargeForm inPatientDetails={inPatientDetails} />
        </>
    )
}
