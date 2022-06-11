import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import {useHistory} from 'react-router-dom'
import { validatePatient, validateUser } from '../../Services/LoginSerivce';
import { Form, useForm } from '../../Component/useForm';
import Controls from '../../Component/Controls/Controls';
import Notification from '../../Component/Common/Notification';



function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="#">
                Kloud-Klinic
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
    },
    image: {
        backgroundImage: 'url(https://source.unsplash.com/random)',
        backgroundRepeat: 'no-repeat',
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const initialFValues = {
    isPatient: false,
    userName: '',
    userPassword: ''
}

export default function SignInSide(props) {
    const classes = useStyles();
    const history = useHistory();
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })


    const {
        values,
        setValues,
        handleInputChange
    } = useForm(initialFValues, false)

    const handleLogIn = e => {
        e.preventDefault()
        debugger;
        // alert(values.isPatient);
        // return false;
        // dispatch(login(values.userName, values.userPassword, values.isPatient))
        //     .then(() => {
        //         // if(res.data.succeeded){
        //         //     if(values.isPatient){
        //         //         props.history.push('/Patient')
        //         //     }
        //         //     else{
        //         //         props.history.push('/AdminDashboard')
        //         //     }
        //         // }
        //         // else {
        //         //     setNotify({
        //         //         isOpen: true,
        //         //         message: res.data.message,
        //         //         type: 'error'
        //         //     })
        //         // }
        //         props.history.push('/AdminDashboard')
                
        //         //window.location.reload();
        //     })
        //     .catch(() => {
        //         window.location.reload();
        //     })
        

        if (values.isPatient) {
            validatePatient(values.userName, values.userPassword).then((res => {
                if (res.data.succeeded) {
                    localStorage.setItem("Patient", JSON.stringify(res.data.data));
                    localStorage.setItem("Id", res.data.data.id);
                    localStorage.setItem("RoleId", 0);
                    localStorage.setItem("PatientUHID", res.data.data.patientUHID);
                    localStorage.setItem("PatientName", res.data.data.firstName + " " + res.data.data.lastName);
                    history.push('/Patient')
                }
                else {
                    setNotify({
                        isOpen: true,
                        message: res.data.message,
                        type: 'error'
                    })
                    //setUserAuthenticated(res.data.succeeded)
                }
            }))

        }
        else {
            validateUser(values.userName, values.userPassword).then((res => {
                if (res.data.succeeded) {
                    localStorage.setItem("Staff", JSON.stringify(res.data.data));
                    localStorage.setItem("Id", res.data.data.id);
                    localStorage.setItem("RoleId", res.data.data.userRoleId);
                    localStorage.setItem("StaffId", res.data.data.staffId);
                    localStorage.setItem("StaffName", res.data.data.firstName + " " + res.data.data.lastName);
                    history.push('/AdminDashboard')
                }
                else {
                    setNotify({
                        isOpen: true,
                        message: res.data.message,
                        type: 'error'
                    })
                }

            }))

        }
    }


    return (
        <Grid container component="main" className={classes.root}>
            <CssBaseline />
            <Grid item xs={false} sm={4} md={7} className={classes.image} />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Form className={classes.form} onSubmit={handleLogIn}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={9}>
                            <FormControlLabel
                            control={<Checkbox name="isPatient" value={values.isPatient} color="primary" onChange={handleInputChange}  />}
                            label="I am Patient"
                        />
                            </Grid>
                            <Grid item xs={12}>
                                <Controls.Input style={{width:'70%'}} name="userName" label="User Name"
                                    value={values.userName}
                                    onChange={handleInputChange} />
                            </Grid>
                            <Grid item xs={12}>
                                <Controls.Input style={{width:'70%'}} name="userPassword" label="User Password"
                                    value={values.userPassword}
                                    onChange={handleInputChange} />
                            </Grid>
                            
                        </Grid>
                        <br />
                        <FormControlLabel
                            control={<Checkbox value="rememberMe" color="primary" />}
                            label="Remember Me"
                        />
                        <Controls.Button type="submit" text="Sign In" />
                        
                        <Grid container style={{marginTop:'2em'}}>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="/SignUp" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                        <Box mt={5} style={{marginTop:'2em'}}>
                            <Copyright />
                        </Box>

                    </Form>
                    <Notification
                    notify={notify}
                    setNotify={setNotify}
            />                    
                </div>
            </Grid>
        </Grid>
    );
}