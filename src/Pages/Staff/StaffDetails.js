import React, { useEffect, useState } from 'react'
import PageHeader from '../../Component/Common/PageHeader'
import PeopleOutlineTwoToneIcon from '@material-ui/icons/PeopleOutlineTwoTone';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import { Paper, makeStyles, TableBody, TableRow, TableCell, Toolbar, InputAdornment, CircularProgress } from '@material-ui/core';
import useTable from "../../Component/useTable"
import Controls from "../../Component/Controls/Controls";
import AddIcon from '@material-ui/icons/Add';
import { deleteStaffDetails, delteStaffDetails, fetchStaffDetails, saveStaffDetails, updateStaffDetails } from '../../Services/StaffService';
import Popup from '../../Component/Common/Popup';
import ConfirmDialog from '../../Component/Common/ConfirmDialog';
import AddStaff from '../../Component/Staff/AddStaff';
import Notification from '../../Component/Common/Notification';
import { deleteDepartmentDetails, fetchDepartments } from '../../Services/DepartmentService';
import { fetchRoles } from '../../Services/AdminServices';
import { indigo } from '@material-ui/core/colors';

const useStyles = makeStyles(theme => ({
    pageContent: {
        margin: theme.spacing(3),
        padding: theme.spacing(3)
    },
    newButton: {
        position: 'absolute',
        right: '10px'
    },
    fabProgress: {
        color: indigo[500],
        position: "absolute",
        top: "50%",
        left: "75%",
        zIndex: 1
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
    const [roles, setRoles] = useState([])
    const [isLoading, setIsLoading] = useState(false);


    useEffect(() => {
        fetchStaffDetails().then((res) => {
            setStaffDetails(res.data.data)
        });
        fetchDepartments().then((res) => {
            setDepartments(res.data.data)
        });
        fetchRoles().then((res) => {
            let roleObj = []
            debugger;
            res.data.data.map((item) => {
                let role = {};
                role["id"] = item.id
                role["title"] = item.roleName
                roleObj.push(role)
            });
            debugger;
            setRoles(roleObj);
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
        setIsLoading(true);
        deleteStaffDetails(item).then((res) => {
            if (res.data.succeeded) {
                fetchStaffDetails().then((res) => setStaffDetails(res.data.data));
                setNotify({
                    isOpen: true,
                    message: 'Deleted Successfully',
                    type: 'success'
                })
            }
        });

        setIsLoading(false);
    }

    return (
        <>
            <PageHeader
                title="Staff Management"
                subTitle="Manage Staff Details"
                icon={<PeopleOutlineTwoToneIcon fontSize="large" />}
            />
            
            <Paper>
            {isLoading && 
                    <CircularProgress size={68} className={classes.fabProgress} />
               }
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
                                                onConfirm: () => { onDelete(item.id) }
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
                    staffForEdit={staffForEdit} roleDetails={roles}
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
