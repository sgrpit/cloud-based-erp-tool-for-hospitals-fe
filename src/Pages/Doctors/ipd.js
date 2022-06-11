import React from 'react'
import PageHeader from '../../Component/Common/PageHeader'
import PeopleOutlineTwoToneIcon from '@material-ui/icons/PeopleOutlineTwoTone';
import ViewIPDPatient from '../../Component/Doctor/ViewIPDPatient';

export default function ipd() {
  return (
    <>
    <PageHeader title="Doctors Dashboard" subTitle="Manage Appointments"
        icon={<PeopleOutlineTwoToneIcon fontSize="large" />} />
    
    <ViewIPDPatient />
    {/* <AddPrescription /> */}
    {/* <AddDeleteTableRows /> */}

</>
  )
}
