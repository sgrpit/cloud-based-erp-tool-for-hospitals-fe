import { makeStyles, Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import { AlarmSharp, ControlCameraSharp, FlashAutoSharp } from '@material-ui/icons';
import React, { useState } from 'react';
import '../App.css';
import { AddPatientPrescription, getPatientDetailsByUHID } from '../Services/PatientService';
import Notification from './Common/Notification';
import Controls from './Controls/Controls';
import TableRows from './TableRows';
import useTable from './useTable';
var tableRowIndex = 0;

const headCells = [
    { id: 'srNo', label: 'Sr. No' },
    { id: 'medicineType', label: 'Medicine Type' },
    { id: 'medicineName', label: 'Medicine Name' },
    { id: 'consumeSchedule', label: 'Before Food - Morning - Afternoon - Evening' },
    { id: 'actions', label: 'Actions', disableSorting: true }
]

const useStyles = makeStyles(theme => ({
    table: {
        marginTop: theme.spacing(3),
        '& thead th': {
            fontWeight: '600',
            color: theme.palette.primary.main,
            backgroundColor: theme.palette.primary.light,
        },
        '& tbody td': {
            fontWeight: '300',
        },
        '& tbody tr:hover': {
            backgroundColor: '#fffbf2',
            cursor: 'pointer',
        },
    },
}))

function AddDeleteTableRows(props) {
    const classes = useStyles();
    const {patientForTreatment} = props
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })

    const [talbeRows, setRows] = useState([{
        index: 0,
        patientId: 0,
        staffId: 0,
        patientAppointmentId: 0,
        drugType: "",
        drugName: "",
        isBeforeFood: false,
        isMorning: false,
        isAfternoon: false,
        isEvening: false
    }
    ]);

    // Receive data from TableRow 
    const handleChange = data => {
        talbeRows[data.index] = data
    }

    // Add New Table Row
    const addNewRow = () => {
        tableRowIndex = parseFloat(tableRowIndex) + 1
        var updatedRows = [...talbeRows]
        updatedRows[tableRowIndex] = { 
            index: tableRowIndex, patientId: 0, staffId: 0, patientAppointmentId: 0,
            drugType: "", drugName: "", isBeforeFood: false, 
            isMorning: false, isAfternoon: false, isEvening: false }
        setRows(updatedRows)
    }

    // Remove Table row if rows are count is more than 1
    const deleteRow = (index) => {
        if (talbeRows.length > 1) {
            var updatedRows = [...talbeRows]
            var indexToRemove = updatedRows.findIndex(x => x.index == index);
            if (indexToRemove > -1) {
                updatedRows.splice(indexToRemove, 1)
                setRows(updatedRows);
            }
        }
    }

    const handleSubmit = e => {
        e.preventDefault();
        console.log();
        AddPatientPrescription(talbeRows).then((res) => {
            if(res.data.succeeded){
                setNotify({
                    isOpen: true,
                    message: 'Updated Successfully',
                    type: 'success'
                })  
            }
        })
        
    }

    return (
        <div className="customers">
            {/* <TblContainer> */}
            <form onSubmit={handleSubmit}>
            <Table className={classes.table}>
                <TableHead>
                    <TableRow>
                        <TableCell>Sr. No.</TableCell>
                        <TableCell>Medicine Type</TableCell>
                        <TableCell>Medicine Name</TableCell>
                        <TableCell>Before Food - Morning - Afternoon - Evening</TableCell>
                        <TableCell><Controls.Button text="Add" type="button" onClick={addNewRow}/></TableCell>
                    </TableRow>
                </TableHead>
                {/* <TblHead /> */}
                <TableBody>
                    {
                        talbeRows.map((row, index) => {
                            if (row)
                                return (
                                    <TableRows key={index} row={row} 
                                    handleDataChange={handleChange} 
                                    deleteRow={deleteRow} patientDetails={patientForTreatment}></TableRows>
                                )
                        })
                    }
                </TableBody>
            {/* </TblContainer> */}
            </Table>
            <div>
                <Controls.Button type="submit" text="Save" />
            </div>
            </form>
            <Notification
                    notify={notify}
                    setNotify={setNotify}
            />
           
        </div>
    );
}

export default AddDeleteTableRows;