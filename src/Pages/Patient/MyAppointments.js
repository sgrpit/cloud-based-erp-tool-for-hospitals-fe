import React, { useEffect, useState } from 'react'
import PageHeader from '../../Component/Common/PageHeader'
import PeopleOutlineTwoToneIcon from '@material-ui/icons/PeopleOutlineTwoTone';
import ViewAppointment from '../../Component/Doctor/ViewAppointment';
import { getAppointmentsByStaffId } from '../../Services/DoctorService';
import AddPrescription from '../../Component/Doctor/AddPrescription';
import AddDeleteTableRows from '../../Component/AddDeleteTableRows';
import { getAppointmentsByPatientId, GetPrescriptionHistoryByPatientId } from '../../Services/PatientService';
import useTable from '../../Component/useTable';
import { TableBody, TableCell, TableRow } from '@material-ui/core';
import Controls from '../../Component/Controls/Controls';
import Popup from '../../Component/Common/Popup';
import VisibilityTwoToneIcon from '@material-ui/icons/VisibilityTwoTone';
import PrescriptionHistory from '../../Component/Patient/PrescriptionHistory';


const headCells = [
    { id: 'patientUHID', label: 'Patient UHID' },
    { id: 'patientName', label: 'Patient Name' },
    { id: 'consultantName', label: 'Consultant' },
    { id: 'actions', label: 'Actions', disableSorting: true }
]



export default function MyAppointments() {
    const [appointments, setAppointments] = useState([])
    const [openPrescriptionHistoryPopup, setOpenPrescriptionHistoryPopup] = useState(false)
    const [prescriptionHistory, setPrescriptionHistory] = useState(null);

    const {
        TblContainer,
        TblHead,
    } = useTable(appointments, headCells);

    useEffect(() => {
        getAppointmentsByPatientId(localStorage.getItem("Id")).then((res) => {
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

    return (
        <>
            <PageHeader title="My Appointments" subTitle="My Appointments"
                icon={<PeopleOutlineTwoToneIcon fontSize="large" />} />

            <TblContainer>
                <TblHead />
                <TableBody>
                    {
                        appointments && appointments.map(item => (
                            <TableRow key={item.id}>
                                <TableCell>{item.patient.patientUHID}</TableCell>
                                <TableCell>{item.patientName}</TableCell>
                                <TableCell>{item.staff.firstName + " " + item.staff.lastName}</TableCell>
                                <TableCell style={{ display: 'flex', margin: '5px' }}>

                                    <Controls.ActionButton
                                        onClick={() => { openInPrescriptionHistoryPopup(item) }}
                                    ><VisibilityTwoToneIcon fontSize="small" /></Controls.ActionButton>
                                </TableCell>
                            </TableRow>
                        ))
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
