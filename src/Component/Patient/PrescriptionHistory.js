import { makeStyles, Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core'
import React from 'react'
import useTable from '../useTable'

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

export default function PrescriptionHistory(props) {
    const {prescriptionHistory} = props
    const classes = useStyles();
    debugger;
    return (
        <>
            <Table className={classes.table}>
                <TableHead>
                    <TableRow>
                        <TableCell>Prescribed By</TableCell>
                        <TableCell>Appointment Date</TableCell>
                        <TableCell>Drug Name</TableCell>
                        <TableCell>Schedule</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        prescriptionHistory && prescriptionHistory.map(item => (
                            <TableRow key={item.id}>
                                <TableCell>{item.patientAppointment.staff.firstName + " " + item.patientAppointment.staff.firstName} </TableCell>
                                <TableCell>{item.patientAppointment.appointmentDate} </TableCell>
                                <TableCell>{item.drugName} </TableCell>
                                <TableCell>
                                    {(item.isMorning ? "1" : "0") + ' - ' +  (item.isAfternoon ? "1" : "0") + ' - ' + (item.isEvening ? "1" : "0")}
                                </TableCell>

                            </TableRow>
                        ))
                    }
                    <TableRow>
                        <TableCell></TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </>
    )
}
