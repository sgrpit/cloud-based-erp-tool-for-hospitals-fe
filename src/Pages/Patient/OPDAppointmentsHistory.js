import React, { useEffect, useState } from 'react'
import PageHeader from '../../Component/Common/PageHeader'
import PeopleOutlineTwoToneIcon from '@material-ui/icons/PeopleOutlineTwoTone';
import ViewAppointment from '../../Component/Doctor/ViewAppointment';
import { getAppointmentsByStaffId, getOPDHistoryByStaffId } from '../../Services/DoctorService';
import AddPrescription from '../../Component/Doctor/AddPrescription';
import AddDeleteTableRows from '../../Component/AddDeleteTableRows';
import { getAppointmentsByPatientId, GetPrescriptionHistoryByPatientId } from '../../Services/PatientService';
import useTable from '../../Component/useTable';
import { Container, Grid, Paper, TableBody, TableCell, TableRow } from '@material-ui/core';
import Controls from '../../Component/Controls/Controls';
import Popup from '../../Component/Common/Popup';
import VisibilityTwoToneIcon from '@material-ui/icons/VisibilityTwoTone';
import PrescriptionHistory from '../../Component/Patient/PrescriptionHistory';
import { fDate } from '../../utils/formatTime';
import { useForm } from '../../Component/useForm';


const headCells = [
    { id: 'patientUHID', label: 'Patient UHID' },
    { id: 'patientName', label: 'Patient Name' },
    { id: 'consultantName', label: 'Consultant' },
    { id: 'appointmentDate', label: 'Appointment Date' },
    { id: 'actions', label: 'Actions', disableSorting: true }
]

//const from_Date =  
const initialFValues = {
    fromDate: new Date(new Date().setDate(new Date().getDate() - 7)),
    toDate: new Date() 
}


export default function OPDAppointmentsHistory() {
    const [appointments, setAppointments] = useState([])
    const [openPrescriptionHistoryPopup, setOpenPrescriptionHistoryPopup] = useState(false)
    const [prescriptionHistory, setPrescriptionHistory] = useState(null);

    const {
        TblContainer,
        TblHead,
    } = useTable(appointments, headCells);

    const {
        values,
        handleInputChange,
        errors,
        resetForm,
        setErrors
    } = useForm(initialFValues)

    useEffect(() => {
        debugger;
        getOPDHistoryByStaffId(localStorage.getItem("Id"), fDate(values.fromDate) , fDate(values.toDate)).then((res) => {
            debugger;
            setAppointments(res.data.data)
        },
            (error) => {

            })
    }, [])

    const openInPrescriptionHistoryPopup = item => {
        GetPrescriptionHistoryByPatientId(item.patientId).then((res) => {
            setPrescriptionHistory(res.data.data);
        },
            (error) => {

            })
        setOpenPrescriptionHistoryPopup(true)
    }

    const handleClick = e => {
        getOPDHistoryByStaffId(localStorage.getItem("Id"), fDate(values.fromDate) , fDate(values.toDate)).then((res) => {
            setAppointments(res.data.data)
            
        },
        (error) => {

        })
    }

    return (
        <>
            <PageHeader title="My Appointments" subTitle="My Appointments"
                icon={<PeopleOutlineTwoToneIcon fontSize="large" />} />
            <Paper>
                <Container>
                    <Grid container >
                        <Grid item xs={6} sm={3}>
                        <Controls.DatePicker label="From Date"
                            name="fromDate"
                            value={values.fromDate} onChange={handleInputChange}
                             
                        />
                        </Grid>
                        <Grid item xs={6} sm={3}>
                        <Controls.DatePicker label="To Date"
                            name="toDate"
                            value={values.toDate} onChange={handleInputChange}
                           
                        />
                        </Grid>
                        <Grid item xs={6} sm={1}>
                            <Controls.Button type="Button" text="Search" onClick={handleClick} />
                        </Grid>
                    </Grid>
                </Container>
            </Paper>
            <TblContainer>
                <TblHead />
                <TableBody>
                    {
                        appointments ? appointments.map(item => (
                            <TableRow key={item.id}>
                                <TableCell>{item.patient.patientUHID}</TableCell>
                                <TableCell>{item.patientName}</TableCell>
                                <TableCell>{item.staff.firstName + " " + item.staff.lastName}</TableCell>
                                <TableCell>{fDate(item.appointmentDate) }</TableCell>
                                <TableCell style={{ display: 'flex', margin: '5px' }}>

                                    <Controls.ActionButton
                                        onClick={() => { openInPrescriptionHistoryPopup(item) }}
                                    ><VisibilityTwoToneIcon fontSize="small" /></Controls.ActionButton>
                                </TableCell>
                            </TableRow>
                        )) : <TableRow><TableCell>No appointments</TableCell></TableRow>
                       
                         
                    }

                </TableBody>
            </TblContainer>

            <Popup
                title="View Prescription History"
                openPopup={openPrescriptionHistoryPopup}
                setOpenPopup={setOpenPrescriptionHistoryPopup} >
                <PrescriptionHistory prescriptionHistory={prescriptionHistory} />
            </Popup>

        </>
    )
}
