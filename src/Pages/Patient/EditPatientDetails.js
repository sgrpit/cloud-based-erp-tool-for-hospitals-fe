import React, { useEffect, useState } from 'react'
import Notification from '../../Component/Common/Notification'
import PageHeader from '../../Component/Common/PageHeader'
import EditPatient from '../../Component/Patient/EditPatient'
import PeopleOutlineTwoToneIcon from '@material-ui/icons/PeopleOutlineTwoTone';
import { getPatientDetailsByUHID, UpdatePatientDetails } from '../../Services/PatientService';

export default function EditPatientDetails() {
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })
    const [patient, setPatient] = useState([])

    useEffect(() => {
        getPatientDetailsByUHID(localStorage.getItem("PatientUHID")).then((res) => {
            setPatient(res.data.data);
        })
    }, [])

    const addOrEditPatient = (patient) => {
        UpdatePatientDetails(patient).then((res) => {
            if(res.data.succeeded){
                setNotify({
                    isOpen: true,
                    message: 'Updated Successfully',
                    type: 'success'
                })
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

    return (
        <>
            <PageHeader
                title="Edit Profile"
                subTitle="Edit Profile"
                icon={<PeopleOutlineTwoToneIcon fontSize="large" />}
            />

            {/* <Popup title="Add Staff" openPopup={openPopup} setOpenPopup={setOpenPopup} > */}
            <EditPatient
                patientForEdit={patient}
                addOrEditPatient={addOrEditPatient}
            >

            </EditPatient>
            {/* </Popup> */}
            <Notification
                notify={notify}
                setNotify={setNotify}
            />
        </>
    )
}
