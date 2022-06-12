import { Container, Grid, makeStyles, Paper, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@material-ui/core'
import React from 'react'
import { Form } from '../../Component/useForm'
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


export default function DischargeForm(props) {
    const classes = useStyles();
    const {inPatientDetails} = props
    debugger;
    return (
        <Paper>
            <Container>
                <Grid container>
                    <Grid item xs={12}>
                        <div >
                            <Form>
                                <Container>
                                    <Grid container style={{ paddingLeft: '3em' }} >
                                        <Grid item xs={6} sm={6}>
                                            <Typography component={'span'} >
                                                <div style={{ display: 'flex' }}>
                                                    <div><b>Name : &nbsp;</b></div>
                                                    <div><span> {inPatientDetails && (inPatientDetails.patient.firstName  + " " + inPatientDetails.patient.lastName) }</span></div>
                                                </div>
                                                <div><br /></div>
                                                <div style={{ display: 'flex' }}>
                                                    <div><b>Address : </b></div>
                                                    <div><span> {inPatientDetails && inPatientDetails.patient.address + ", " + inPatientDetails.patient.city}</span></div>
                                                </div>
                                            </Typography>

                                        </Grid>
                                        <Grid item xs={6}>
                                            <Typography component={'span'} >
                                                <div style={{ display: 'flex' }}>
                                                    <div><b>Contact No : </b></div>
                                                    <div><span> {inPatientDetails && inPatientDetails.patient.mobileNo}</span></div>
                                                </div>
                                                <div><br /></div>
                                                <div style={{ display: 'flex' }}>
                                                    <div><b>Email Id : </b></div>
                                                    <div><span> {inPatientDetails && inPatientDetails.patient.emailID}</span></div>
                                                </div>
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12}>
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
                                                        inPatientDetails && inPatientDetails.ipdPatientTreatmentSummaries.map(item => (
                                                            <TableRow Key={item.id}>
                                                            <TableCell>{item.id}</TableCell>
                                                                <TableCell>{item.treatmentName}</TableCell>
                                                                <TableCell>{item.treatmentType}</TableCell>
                                                                <TableCell>{item.treatmentAmount}</TableCell>
                                                                <TableCell>{item.treatmentDate}</TableCell>
                                                                
                                                            </TableRow>
                                                        ))
                                                    }
                                                </TableBody>
                                            </Table>
                                        </Grid>
                                    </Grid>
                                </Container>
                                <br /> <br />                                
                            </Form>
                        </div>
                    </Grid>
                </Grid>
            </Container>
        </Paper>
    )
}
