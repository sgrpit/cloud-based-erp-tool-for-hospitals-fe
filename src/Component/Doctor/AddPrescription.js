import { Container, FormLabel, Grid, makeStyles, Paper, TableBody } from '@material-ui/core'
import { ControlCamera } from '@material-ui/icons'
import React, { useState } from 'react'
import AddDeleteTableRows from '../AddDeleteTableRows'
import PageHeader from '../Common/PageHeader'
import Popup from '../Common/Popup'
import Controls from '../Controls/Controls'
import PrescriptionHistory from '../Patient/PrescriptionHistory'
import TableRows from '../TableRows'
import { Form, useForm } from '../useForm'

var tableRowIndex = 0;
const useStyle = makeStyles(theme => ({
    ".MuiFormControlLabel-root": {
        width: "2em"
    }
}))


export default function AddPrescription(props) {
    const classes = useStyle();
    const {patientForTreatment, addOrEditPrescription} = props    

    return (
        <>
            {/* <Controls.Button name="viewPreviousPrescription"   text="Previous Prescription History" type="button" />
            <Controls.Button name="viewPreviousPrescription"  text="Previous Prescription History" type="button" /> */}
            <AddDeleteTableRows addOrEditPrescription={addOrEditPrescription} patientForTreatment={patientForTreatment}></AddDeleteTableRows>
            
            
        </>
    )
}
