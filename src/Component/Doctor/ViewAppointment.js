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
import { AddPatientPrescription, GetPrescriptionHistoryByPatientId } from '../../Services/PatientService'
import Notification from '../Common/Notification'


const headCells = [
    { id: 'patientId', label: 'Patient Id' },
    { id: 'Patient Name', label: 'Patient Name' },
    { id: 'actions', label: 'Actions', disableSorting: true }
]



export default function ViewAppointment() {
    //const {appointmentDetails} = props
    const[appointments, setAppointments] = useState([])
    const [openPopup, setOpenPopup] = useState(false)
    const [openPrescriptionHistoryPopup, setOpenPrescriptionHistoryPopup] = useState(false)
    const [prescriptionHistory, setPrescriptionHistory] = useState(null);
    const [patientForTreatment, setPatientForTreatment] = useState(null);
    const [addEditPrescription, setAddEditPrescription] = useState(null);
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })

    const {
        TblContainer,
        TblHead,
    } = useTable(appointments, headCells);

    useEffect(() => {
        getAppointmentsByStaffId(localStorage.getItem("Id")).then((res) => {
            setAppointments(res.data.data)
            console.log(appointments);
        });
    }, [])    

    const openInPopup = item => {
        debugger;
        setPatientForTreatment(item)
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
    
    const addOrEditPrescription = item => {
        AddPatientPrescription(item).then((res) => {
            
            if(res.data.succeeded){
                
                getAppointmentsByStaffId(localStorage.getItem("Id")).then((res) => {
                    setAppointments(res.data.data)
                });
                setNotify({
                    isOpen: true,
                    message: 'Added Successfully',
                    type: 'success'
                })
                setOpenPopup(false);
            }
        },
        (error) => {
            setNotify({
                isOpen: true,
                message: 'An error occurred while adding prescription',
                type: 'success'
            })
        })
    }

    return (
        <>
            <TblContainer>
                <TblHead />
                <TableBody>
                    {
                        appointments && appointments.map(item => (
                            <TableRow key={item.id}>
                                <TableCell>{item.patientId}</TableCell>
                                <TableCell>{item.patientName}</TableCell>
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
                    <AddPrescription addOrEditPrescription={addOrEditPrescription} patientForTreatment={patientForTreatment}
                 />                
            </Popup>
            <Popup
                title="View Prescription History" 
                openPopup={openPrescriptionHistoryPopup} 
                setOpenPopup={setOpenPrescriptionHistoryPopup} >
                    <PrescriptionHistory  
                        prescriptionHistory={prescriptionHistory}/>
            </Popup>
            <Notification
                    notify={notify}
                    setNotify={setNotify}
            />
        </>
    )
}
