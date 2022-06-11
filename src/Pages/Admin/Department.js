import { Container, Grid, makeStyles, Paper, TableBody, TableCell, TableRow, Toolbar } from '@material-ui/core'
import React, { useState, useEffect } from 'react'
import PageHeader from '../../Component/Common/PageHeader'
import AccountTreeTwoToneIcon from '@material-ui/icons/AccountTreeTwoTone';
import axios from 'axios';
import useTable from '../../Component/useTable';
import Controls from '../../Component/Controls/Controls';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import AddIcon from '@material-ui/icons/Add'
import Popup from '../../Component/Common/Popup';
import ConfirmDialog from '../../Component/Common/ConfirmDialog';
import AddDepartments from '../../Component/Admin/AddDepartments';
import api from '../../Api/api'
import { deleteDepartmentDetails, fetchDepartments, upsertDepartmentDetails } from '../../Services/DepartmentService'
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
    { id: 'Id', label: 'Department Id' },
    { id: 'departmentName', label: 'Department Name' },
    { id: 'departmentDesc', label: 'DepartmentDesc' },    
    { id: 'actions', label: 'Actions', disableSorting: true }
]

export default function Department() {
    const classes = useStyles();
    const [deptForEdit, setDeptForEdit] = useState(null)
    const[departments, setDepartments] = useState([]);
    const [openPopup, setOpenPopup] = useState(false)
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' })
    
    
    useEffect(() => {
        fetchDepartments().then((res) => {
            setDepartments(res.data.data)
        });
    }, [])

    const {
        TblContainer,
        TblHead        
    } = useTable(departments, headCells);

    const openInPopup = item => {
        debugger;
        setDeptForEdit(item)
        setOpenPopup(true)
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

    const addOrEditDepartment = (department, resetForm) => {
        
        //axios.post("https://localhost:5001/api/Department", department);
        upsertDepartmentDetails(department).then((res) => {
            debugger;
            setOpenPopup(false);
            if (res.data.succeeded) {
                setNotify({
                    isOpen: true,
                    message: 'Updated Successfully',
                    type: 'success'
                })
            }
            else {
                setNotify({
                    isOpen: true,
                    message: 'An error occurred while updating department details',
                    type: 'error'
                })
            }
        }
        );
        resetForm();
        setDeptForEdit(null);
        fetchDepartments().then((res) => setDepartments(res.data.data));
        
    }

    return (
        <>
            <PageHeader
                title="Departments"
                subTitle="Manage Departments Details"
                icon={<AccountTreeTwoToneIcon fontSize="large" />}
            />
            <Paper className={classes.pageContent}>
                <Toolbar>                    
                    <Controls.Button
                        text="Add New"
                        variant="outlined"
                        startIcon={<AddIcon />}
                        className={classes.newButton}
                        onClick={() => { setOpenPopup(true); setDeptForEdit(null); }}
                    />
                </Toolbar>
                <TblContainer>
                    <TblHead />
                    <TableBody>
                        {
                            departments && departments.map(item =>
                            (
                                <TableRow key={item.id}>
                                    <TableCell>{item.id}</TableCell>
                                    <TableCell>{item.departmentName}</TableCell>
                                    <TableCell>{item.departmentDesc}</TableCell>
                                    <TableCell style={{ display: 'flex', margin: '5px' }}>
                                        <Controls.ActionButton color='primary'
                                            onClick={() => { openInPopup(item) }}  >
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
                                            }} >
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
                <AddDepartments
                    deptForEdit={deptForEdit}
                    addOrEditDepartment={addOrEditDepartment}
                 />
                
            </Popup>
            <Notification
                notify={notify}
                setNotify={setNotify}
            />
            <ConfirmDialog
                confirmDialog={confirmDialog}
                setConfirmDialog={setConfirmDialog}
            />
        </>
    )
}
