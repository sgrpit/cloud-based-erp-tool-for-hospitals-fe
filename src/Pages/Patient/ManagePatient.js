import React, { useEffect, useState } from 'react'
import PageHeader from '../../Component/Common/PageHeader'
import PeopleOutlineTwoToneIcon from '@material-ui/icons/PeopleOutlineTwoTone';
import { makeStyles, Paper, TableBody, TableCell, TableRow } from '@material-ui/core';
import { getActiveElement } from '@testing-library/user-event/dist/utils';
import { deletePatientDetails, getAllPatients, UpdatePatientDetails } from '../../Services/PatientService';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import Controls from '../../Component/Controls/Controls';
import useTable from '../../Component/useTable';
import { deleteDepartmentDetails, fetchDepartments } from '../../Services/DepartmentService';
import { delteStaffDetails } from '../../Services/StaffService';
import Popup from '../../Component/Common/Popup';
import EditPatient from '../../Component/Patient/EditPatient';
import ConfirmDialog from '../../Component/Common/ConfirmDialog';
import Notification from '../../Component/Common/Notification';


const useStyles = makeStyles(theme => ({
    pageContent: {
        margin: theme.spacing(3),
        padding: theme.spacing(3)
    },
    newButton: {
        position: 'absolute',
        right: '10px'
    }
}))

const headCells = [
    { id: 'patientUHID', label: 'Patient UHID' },
    { id: 'patientName', label: 'Patient Name' },
    { id: 'mobileNo', label: 'Mobile Number' },
    { id: 'emailId', label: 'Email ID' },
    
    { id: 'actions', label: 'Actions', disableSorting: true }
]

export default function ManagePatient() {
    const classes = useStyles();
    const [patientDetails, setPatientDetails] = useState([])
    const [patientForEdit, setPatientForEdit] = useState(null)
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' })
    const [openPopup, setOpenPopup] = useState(false)
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })


    useEffect(() => {
        getAllPatients().then((res) =>{
            setPatientDetails(res.data.data);
        },
        (error) => {
            
        })
    }, [])

    const {
        TblContainer,
        TblHead,
    } = useTable(patientDetails, headCells);

    const openInPopup = item => {
        //debugger;
        setPatientForEdit(item)
        setOpenPopup(true)
    }
    const addOrEditPatient = (patient, resetForm) => {
        UpdatePatientDetails(patient).then((res) => {
            if(res.data.succeeded){
                setNotify({
                    isOpen: true,
                    message: 'Updated Successfully',
                    type: 'success'
                })
                setOpenPopup(false);
                getAllPatients().then((res) => setPatientDetails(res.data.data));
            }
            else{
                setNotify({
                    isOpen: true,
                    message: 'An error occurred while saving staff details',
                    type: 'error'
                })

            }
        })
    }
    const onDelete = item => {
        setConfirmDialog({
            ...confirmDialog,
            isOpen: false
        })
        deletePatientDetails(item).then((res) => {
            if(res.data.succeeded){
                getAllPatients().then((res) =>{
                    setPatientDetails(res.data.data);
                    setNotify({
                        isOpen: true,
                        message: 'Deleted Successfully',
                        type: 'success'
                    })
                },
                (error) => {
                    
                })
            }
        })
    }

    return (
        <>
            <PageHeader
                title="Patient"
                subTitle="Manage Patient Details"
                icon={<PeopleOutlineTwoToneIcon fontSize="large" />}
            />
            <Paper>
            <TblContainer>
                    <TblHead />
                    <TableBody>
                    {
                        patientDetails && patientDetails.map(item =>
                        (
                            <TableRow key={item.id}>
                                <TableCell>{item.patientUHID}</TableCell>
                                <TableCell>{item.firstName + " " + item.middleName + " " + item.lastName}</TableCell>
                                <TableCell>{item.mobileNo}</TableCell>
                                <TableCell>{item.emailID}</TableCell>
                                {/* <TableCell>{item.departments.departmentName}</TableCell> */}
                                <TableCell style={{ display: 'flex', margin: '5px' }}>
                                    <Controls.ActionButton color='primary'
                                        onClick={() => { openInPopup(item) }}  
                                        >
                                        <EditOutlinedIcon fontSize="small" />
                                    </Controls.ActionButton>
                                    <Controls.ActionButton color='secondary'
                                        onClick={() => {
                                            setConfirmDialog({
                                                isOpen: true,
                                                title: 'Are you sure to delete this record?',
                                                subTitle: "You can't undo this operation",
                                                onConfirm: () => { onDelete(item.id) }
                                            })
                                        }} 
                                        >
                                        <DeleteOutlinedIcon fontSize="small" />
                                    </Controls.ActionButton>                                   
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </TblContainer>
            </Paper>
            <Popup
                title="Add or Edit Departments" openPopup={openPopup} setOpenPopup={setOpenPopup} >
                <EditPatient
                    patientForEdit={patientForEdit} 
                    addOrEditPatient={addOrEditPatient}
                 />
                
            </Popup>
            <ConfirmDialog
                confirmDialog={confirmDialog}
                setConfirmDialog={setConfirmDialog}
            />
            <Notification
                    notify={notify}
                    setNotify={setNotify}
            />

        </>
    )
}
