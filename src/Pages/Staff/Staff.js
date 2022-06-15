import React, { useEffect, useState } from 'react'
import PageHeader from '../../Component/Common/PageHeader'
import PeopleOutlineTwoToneIcon from '@material-ui/icons/PeopleOutlineTwoTone';
import { Grid, makeStyles, Paper } from '@material-ui/core';
import Controls from '../../Component/Controls/Controls';
import { Form, useForm } from '../../Component/useForm';
import { fetchDepartments } from '../../Services/DepartmentService';

import { fetchStaffDetails, fetchStaffDetailsById, saveStaffDetails, updateStaffDetails } from '../../Services/StaffService';
import Notification from '../../Component/Common/Notification';
import {useHistory} from 'react-router-dom'
import Popup from '../../Component/Common/Popup';
import AddStaff from '../../Component/Staff/AddStaff';
import { fetchRoles } from '../../Services/AdminServices';

const useStyles = makeStyles(theme => ({
    root: {
            '& .MuiGrid-root': {
                marginLeft: '1%',
                //marginRight: '1%'
        }
    },
    gridItem: {
        width: '40%',
    },
    formWrapper: {
        marginTop: theme.spacing(5),
        marginBottom: theme.spacing(8),
      },
    
}))


const genderItems = [
    { id: 'male', title: 'Male' },
    { id: 'female', title: 'Female' },
    { id: 'other', title: 'Other' },
]

const headCells = [
    { id: 'Id', label: 'Department Id' },
    { id: 'departmentName', label: 'Department Name' },
    { id: 'departmentDesc', label: 'DepartmentDesc' },    
    { id: 'actions', label: 'Actions', disableSorting: true }
]



export default function Staff() {
    const classes = useStyles()
    const[departments, setDepartments] = useState([]);
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })
    const [roles, setRoles] = useState([])
    const [staffForEdit, setStaffForEdit] = useState(null);
    const history = useHistory();
   

    useEffect(() => {
        fetchDepartments().then((res) => {
            setDepartments(res.data.data); 
            console.log(departments);
        })
        fetchStaffDetailsById(localStorage.getItem("Id")).then((res) => {
            debugger;
            setStaffForEdit(res.data.data);
        })
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


    const addOrEditStaff = (staff, resetForm) => {
        debugger;
        updateStaffDetails(staff).then((res) => {
            if (res.data.succeeded) {
                setNotify({
                    isOpen: true,
                    message: 'Updated Successfully',
                    type: 'success'
                })
                resetForm();
                //history.push('/Staff');
            }
            else {
                setNotify({
                    isOpen: true,
                    message: 'An error occurred while saving staff details',
                    type: 'error'
                })

            }
        }, (error) => {
            setNotify({
                isOpen: true,
                message: (error.response.data.message) ? error.response.data.message : "An error occurred. Please try again",
                type: 'error'
            })
        })
    }
    return (
        <>
            <PageHeader 
                title="Edit Profile" 
                subTitle="Edit Profile" 
                icon={<PeopleOutlineTwoToneIcon fontSize="large" />}                
            />
            
            {/* <Popup title="Add Staff" openPopup={openPopup} setOpenPopup={setOpenPopup} > */}
                <AddStaff departments={departments} staffForEdit={staffForEdit}
                    addOrEditStaff={addOrEditStaff} roleDetails={roles}
                    >

                </AddStaff>
            {/* </Popup> */}
            <Notification
                    notify={notify}
                    setNotify={setNotify}
            />
        </>
    )
}
