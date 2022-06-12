
import React, { useEffect, useState } from 'react'
import PageHeader from '../../Component/Common/PageHeader'
import { Paper, Container, Toolbar } from '@material-ui/core'
import Controls from '../../Component/Controls/Controls'
import Popup from '../../Component/Common/Popup'
import BookAppointment from '../../Component/Patient/BookAppointment'
import { fetchDepartments, fetchNonAdminDepartments } from '../../Services/DepartmentService'
import { withRouter } from 'react-router-dom'



export function PatientDashboard() {
  const [openPopup, setOpenPopup] = useState(false)
  const [departments, setDepatments] = useState([])
  const [staffs, setStaffs] = useState([])

  useEffect(() => {
    fetchNonAdminDepartments().then((res) => {
      debugger;
      if(res.data.succeeded){
        setDepatments(res.data.data)
      }
      else{
        setDepatments([])
      }
    })
  }, [])

  const openInPopup = () => {
    setOpenPopup(true);
  }

  return (
    <>
      <PageHeader title="Patient Dashboard" />
      <Container>
        <Toolbar>
          <Controls.Button text="Book Appointment" type='button'
            onClick={() => { openInPopup() }}
          />
        </Toolbar>
      </Container>
      <Popup title="Book Appointment" openPopup={openPopup} setOpenPopup={setOpenPopup}>
        <BookAppointment departments={departments} > </BookAppointment>
      </Popup>


    </>
  )
}

export default withRouter(PatientDashboard)
