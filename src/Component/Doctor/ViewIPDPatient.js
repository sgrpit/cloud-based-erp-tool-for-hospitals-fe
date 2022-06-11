import { Table, TableBody, TableCell, TableRow } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { getAppointmentsByStaffId } from '../../Services/DoctorService'
import { fetchStaffDetails } from '../../Services/StaffService'
import useTable from '../useTable'
import AssignmentTwoToneIcon from '@material-ui/icons/AssignmentTwoTone';
import Controls from '../Controls/Controls'
import Popup from '../Common/Popup'
import AddPrescription from './AddPrescription'
import VisibilityTwoToneIcon from '@material-ui/icons/VisibilityTwoTone';
import PrescriptionHistory from '../Patient/PrescriptionHistory'
import { GetIPDPatientsDetails, GetPrescriptionHistoryByPatientId } from '../../Services/PatientService'


const headCells = [
    { id: 'patientUHID', label: 'Patient UHID' },
    { id: 'patient', label: 'Patient Name' },
    { id: 'staffId', label: 'Consulted By' },
    { id: 'admissionDate', label: 'Admission Date' },
    { id: 'actions', label: 'Actions', disableSorting: true }
]



export default function ViewIPDPatient() {
    const[admittedPateints, setAdmittedPatients] = useState([])
    const [openPopup, setOpenPopup] = useState(false)
    const [openPrescriptionHistoryPopup, setOpenPrescriptionHistoryPopup] = useState(false)
    const [prescriptionHistory, setPrescriptionHistory] = useState(null);
    const [patientDetails, setPatientDetails] = useState(null)

    const {
        TblContainer,
        TblHead,
    } = useTable(admittedPateints, headCells);

    useEffect(() => {
        GetIPDPatientsDetails().then((res) => {
            setAdmittedPatients(res.data.data)
            console.log(admittedPateints);
        });
    }, [])    

    const openInPopup = item => {
        debugger;
        setPatientDetails(item)
        setOpenPopup(true)
    }
    
    const openInPrescriptionHistoryPopup = item => {
        GetPrescriptionHistoryByPatientId(item.patientId).then((res) => {
            setPrescriptionHistory(res.data.data);
        },
        (error) => {

        })
        //setPatientForTreatment(item)
        setOpenPrescriptionHistoryPopup(true)
    }

    return (
        <>
            <TblContainer>
                <TblHead />
                <TableBody>
                    {
                        admittedPateints && admittedPateints.map(item => (
                            <TableRow key={item.id}>
                                <TableCell>{item.patientUHID}</TableCell>
                                <TableCell>{item.patient.firstName + " " + item.patient.lastName}</TableCell>
                                <TableCell>{item.staff.firstName + " " + item.staff.lastName}</TableCell>
                                <TableCell>{item.adminssionDate}</TableCell>
                                <TableCell style={{ display: 'flex', margin: '5px' }}>
                                    <Controls.ActionButton 
                                         onClick={() => { openInPopup(item) }}  
                                    ><AssignmentTwoToneIcon fontSize="small" /></Controls.ActionButton>
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
                title="Add Prescription" 
                openPopup={openPopup} 
                setOpenPopup={setOpenPopup} >
                    <AddPrescription patientForTreatment={patientDetails}
                 />                
            </Popup>
            <Popup
                title="View Prescription History" 
                openPopup={openPrescriptionHistoryPopup} 
                setOpenPopup={setOpenPrescriptionHistoryPopup} >
                    <PrescriptionHistory prescriptionHistory={prescriptionHistory}/>
            </Popup>
        </>
    )
}
