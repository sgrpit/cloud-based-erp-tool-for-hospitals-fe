import React, { useEffect, useState } from 'react'
import PageHeader from '../../Component/Common/PageHeader'
import PeopleOutlineTwoToneIcon from '@material-ui/icons/PeopleOutlineTwoTone';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import { Paper, makeStyles, TableBody, TableRow, TableCell, Toolbar, InputAdornment } from '@material-ui/core';
import useTable from "../../Component/useTable"
import Controls from "../../Component/Controls/Controls";
import AddIcon from '@material-ui/icons/Add';
// import Popup from "../../components/Popup";
// import CloseIcon from '@material-ui/icons/Close';
// import Notification from "../../components/Notification";
// import ConfirmDialog from "../../components/ConfirmDialog";
import { fetchStaffDetails, saveStaffDetails, updateStaffDetails } from '../../Services/StaffService';
import Popup from '../../Component/Common/Popup';
import ConfirmDialog from '../../Component/Common/ConfirmDialog';
import AddStaff from '../../Component/Staff/AddStaff';
import Notification from '../../Component/Common/Notification';
import { deleteDepartmentDetails, fetchDepartments } from '../../Services/DepartmentService';

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
    { id: 'staffId', label: 'Staff Id' },
    { id: 'staffName', label: 'staffName' },
    { id: 'mobileNo', label: 'Mobile Number' },
    { id: 'emailId', label: 'Email ID' },
    { id: 'department', label: 'Department' },
    { id: 'actions', label: 'Actions', disableSorting: true }
]

export default function StaffDetails() {
    const classes = useStyles();
    const[staffDetail, setStaffDetails] = useState([])
    const [staffForEdit, setStaffForEdit] = useState(null)
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' })
    const [openPopup, setOpenPopup] = useState(false)
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })
    const[departments, setDepartments] = useState([]);



    useEffect(() => {
        fetchStaffDetails().then((res) => {
            setStaffDetails(res.data.data)
        });
        fetchDepartments().then((res) => {
            setDepartments(res.data.data)
        })
    }, [])    
    
    const {
        TblContainer,
        TblHead,
    } = useTable(staffDetail, headCells);

    const openInPopup = item => {
        //debugger;
        setStaffForEdit(item)
        setOpenPopup(true)
    }
    
    const addOrEditStaff = (staff, resetForm) => {
        if(staff.id === 0){
            saveStaffDetails(staff).then((res) => {
                if (res.data.succeeded) {
                    setOpenPopup(false)
                    setNotify({
                        isOpen: true,
                        message: 'Added Successfully',
                        type: 'success'
                    })
                    resetForm();
                    fetchStaffDetails().then((res => setStaffDetails(res.data.data)));
                    
                }
                else {
                    setNotify({
                        isOpen: true,
                        message: 'An error occurred while saving staff details',
                        type: 'failed'
                    })
    
                }
            })
        }
        else{
            updateStaffDetails(staff).then((res) => {
                if (res.data.succeeded) {
                    setOpenPopup(false)
                    setNotify({
                        isOpen: true,
                        message: 'Updated Successfully',
                        type: 'success'
                    })
                    resetForm();
                    fetchStaffDetails().then((res => setStaffDetails(res.data.data)));
                    
                }
                else {
                    setNotify({
                        isOpen: true,
                        message: 'An error occurred while saving staff details',
                        type: 'failed'
                    })
    
                }
            })
        }
        
    }


    const onDelete = item => {
        setConfirmDialog({
            ...confirmDialog,
            isOpen: false
        })
        deleteDepartmentDetails(item).then();
        fetchDepartments().then((res) => setDepartments(res.data));
        setNotify({
            isOpen: true,
            message: 'Deleted Successfully',
            type: 'success'
        })
    }

    return (
        <>
            <PageHeader
                title="Staff Management"
                subTitle="Manage Staff Details"
                icon={<PeopleOutlineTwoToneIcon fontSize="large" />}
            />
            <Paper>
                <Toolbar>
                    <Controls.Button
                        text="Add New"
                        variant="outlined"
                        startIcon={<AddIcon />}
                        className={classes.newButton}
                        onClick={() => { setOpenPopup(true); }}
                    />
                </Toolbar>
                <TblContainer>
                    <TblHead />
                    <TableBody>
                    {
                        staffDetail && staffDetail.map(item =>
                        (
                            <TableRow key={item.id}>
                                <TableCell>{item.staffId}</TableCell>
                                <TableCell>{item.firstName + " " + item.middleName + " " + item.lastName}</TableCell>
                                <TableCell>{item.mobileNo}</TableCell>
                                <TableCell>{item.emailId}</TableCell>
                                <TableCell>{item.departments.departmentName}</TableCell>
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
                                                onConfirm: () => { onDelete(item.patientUHID) }
                                            })
                                        }} 
                                        >
                                        <DeleteOutlinedIcon fontSize="small" />
                                    </Controls.ActionButton>
                                    <Controls.ActionButton color='primary' >
                                        <VisibilityOutlinedIcon fontSize="small" />
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
                <AddStaff
                    staffForEdit={staffForEdit}
                    addOrEditStaff={addOrEditStaff} departments={departments}
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
