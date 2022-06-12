import React, { useEffect, useState } from 'react'
import {GetHospitalizationByPatientId} from '../../Services/PatientService'
import { TableBody, TableCell, TableRow } from '@material-ui/core';
import PeopleOutlineTwoToneIcon from '@material-ui/icons/PeopleOutlineTwoTone';
import Controls from '../../Component/Controls/Controls';
import Popup from '../../Component/Common/Popup';
import VisibilityTwoToneIcon from '@material-ui/icons/VisibilityTwoTone';
import PageHeader from '../../Component/Common/PageHeader'
import useTable from '../../Component/useTable';
import HospitlazationBreakupSummary from '../../Component/Patient/HospitlazationBreakupSummary';
import { fDateTime, fDateTimeSuffix } from '../../utils/formatTime';


const headCells = [
    { id: 'patientUHID', label: 'Patient UHID' },
    { id: 'patientName', label: 'Patient Name' },
    { id: 'consultantName', label: 'Consultant' },
    { id: 'admissionDate', label: 'Admission Date' },
    { id: 'dischargeDate', label: 'Discharge Date' },
    { id: 'actions', label: 'Actions', disableSorting: true }
]

export default function MyHospitalization() {
    const [myHospitalization, setMyHospitalization] = useState([])
    const [breakupSummary, setBreakupSummary] = useState(null);
    const [openBreakupSummaryPopup, setOpenBreakupSummaryPopup] = useState(false)
    
    const {
        TblContainer,
        TblHead,
    } = useTable(myHospitalization, headCells);
    useEffect(() => {
        GetHospitalizationByPatientId(localStorage.getItem("Id")).then((res) => {
            setMyHospitalization(res.data.data)
        })
    }, [])

    const openBreakUpSummary = item => {
        setBreakupSummary(item.ipdPatientTreatmentSummaries)
        setOpenBreakupSummaryPopup(true);
    }

    return (
        <>
            <PageHeader title="My Appointments" subTitle="My Appointments"
                icon={<PeopleOutlineTwoToneIcon fontSize="large" />} />

            <TblContainer>
                <TblHead />
                <TableBody>
                    {
                        myHospitalization && myHospitalization.map(item => (
                            <TableRow key={item.id}>
                                <TableCell>{item.patient.patientUHID}</TableCell>
                                <TableCell>{item.patient.firstName + " " + item.patient.lastName}</TableCell>
                                <TableCell>{item.staff.firstName + " " + item.staff.lastName}</TableCell>
                                <TableCell>{fDateTime(item.adminssionDate)}</TableCell>
                                <TableCell>{item.isDischarged ? item.dischargeDate : "Not Discharged"}</TableCell>
                                <TableCell style={{ display: 'flex', margin: '5px' }}>
                                    <Controls.ActionButton
                                        onClick={() => { openBreakUpSummary(item) }}
                                    ><VisibilityTwoToneIcon fontSize="small" /></Controls.ActionButton>
                                </TableCell>
                            </TableRow>
                        ))
                    }

                </TableBody>
            </TblContainer>

            <Popup
                title="View Prescription History"
                openPopup={openBreakupSummaryPopup}
                setOpenPopup={setOpenBreakupSummaryPopup} >
                <HospitlazationBreakupSummary breakupSummary={breakupSummary} />
            </Popup>
        </>
    )
}
