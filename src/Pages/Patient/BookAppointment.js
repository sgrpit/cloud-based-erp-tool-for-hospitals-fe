
import React, { useEffect, useState } from 'react'
import PageHeader from '../../Component/Common/PageHeader'
import { Paper, Container, Toolbar } from '@material-ui/core'
import Controls from '../../Component/Controls/Controls'
import Popup from '../../Component/Common/Popup'
import BookAppointment from '../../Component/Patient/BookAppointment'
import { fetchDepartments, fetchNonAdminDepartments } from '../../Services/DepartmentService'
import { withRouter } from 'react-router-dom'
import PeopleOutlineTwoToneIcon from '@material-ui/icons/PeopleOutlineTwoTone';
import { bookPatientAppointment, getPatientDetailsByUHID } from '../../Services/PatientService'
import Notification from '../../Component/Common/Notification'



export function PatientDashboard() {
    const [departments, setDepatments] = useState([])
    const [patientDetails, setPatientDetails] = useState(null);

    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })
    const [staffs, setStaffs] = useState([])

    useEffect(() => {
        fetchNonAdminDepartments().then((res) => {
            if (res.data.succeeded) {
                setDepatments(res.data.data)
            }
            else {
                setDepatments([])
            }
        })

        getPatientDetailsByUHID(localStorage.getItem('PatientUHID'))
            .then((res) => {
                setPatientDetails(res.data.data);
            },
                (error) => {

                })
    }, [])

    const bookAppointment = (appointment, resetForm) => {
        console.log(appointment);
        debugger;
        bookPatientAppointment(appointment)
            .then((res) => {
                setNotify({
                    isOpen: true,
                    message: 'Appointment Booked Successfully',
                    type: 'success'
                })
            },
            (error) => {
                setNotify({
                    isOpen: true,
                    message: 'An error occurred while booking appointment. Please try after some time',
                    type: 'error'
                })
            })
    }

    return (
        <>
            <PageHeader title="Patient Dashboard" />
            <Paper>
                <Container>
                    <BookAppointment 
                        departments={departments} 
                        patientDetails={patientDetails}
                        bookAppointment={bookAppointment}/>
                </Container>
            </Paper>
            <Notification
                    notify={notify}
                    setNotify={setNotify}
            />
        </>
    )}

export default withRouter(PatientDashboard)
