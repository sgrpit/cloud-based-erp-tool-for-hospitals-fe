import { makeStyles, Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import React from 'react'
import { fDateTime } from '../../utils/formatTime';

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


export default function HospitlazationBreakupSummary(props) {
    const { breakupSummary } = props;
    const classes = useStyles();
    return (
        <>
            <Table className={classes.table}>
                <TableHead>
                    <TableRow>
                        <TableCell>Sr. No</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Type</TableCell>
                        <TableCell>Charges</TableCell>
                        <TableCell>Date</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        breakupSummary ? breakupSummary.map(item => (
                            <TableRow Key={item.id}>
                                <TableCell>{item.id}</TableCell>
                                <TableCell>{item.treatmentName}</TableCell>
                                <TableCell>{item.treatmentType}</TableCell>
                                <TableCell>{item.treatmentAmount}</TableCell>
                                <TableCell>{fDateTime(item.treatmentDate)}</TableCell>
                            </TableRow>
                        ))
                        : (<TableRow>
                            <TableCell>No Records Found..!</TableCell>
                        </TableRow>)
                    }
                </TableBody>
            </Table>
        </>
    )
}
