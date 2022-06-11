import React, { useEffect, useState } from 'react'
import PageHeader from '../../Component/Common/PageHeader'
import PeopleOutlineTwoToneIcon from '@material-ui/icons/PeopleOutlineTwoTone';
import ViewAppointment from '../../Component/Doctor/ViewAppointment';
import { getAppointmentsByStaffId } from '../../Services/DoctorService';
import AddPrescription from '../../Component/Doctor/AddPrescription';
import AddDeleteTableRows from '../../Component/AddDeleteTableRows';

export default function opd() {
  return (
    <>
        <PageHeader title="Doctors Dashboard" subTitle="Manage Appointments"
            icon={<PeopleOutlineTwoToneIcon fontSize="large" />} />
        
        <ViewAppointment />
        {/* <AddPrescription /> */}
        {/* <AddDeleteTableRows /> */}

    </>
  )
}
