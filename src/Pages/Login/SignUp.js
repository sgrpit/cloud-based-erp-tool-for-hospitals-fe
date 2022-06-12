import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Controls from '../../Component/Controls/Controls';
import { useForm } from '../../Component/useForm';
import { PatientRegistration } from '../../Services/PatientService';
import Notification from '../../Component/Common/Notification';
import { CircularProgress } from '@material-ui/core';
import { indigo } from "@material-ui/core/colors";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  fabProgress: {
      color: indigo[500],
      position: "absolute",
      top: "50%",
      left: "50%",
      zIndex: 1
    }
}));

const initialValues = {
  firstName: '',
  lastName: '',
  mobileNo: '',
  emailId: '',
  password: '',
}

export default function SignUp() {
  const classes = useStyles();
  const [patient, setPatient] = useState({})
  const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })
  const [isLoading, setIsLoading] = useState(false)

  const Validate = (fieldValues = values) => {
    let temp = { ...errors }
    if ('firstName' in fieldValues)
      temp.firstName = fieldValues.firstName ? "" : "Required"
    if ('lastName' in fieldValues)
      temp.lastName = fieldValues.lastName ? "" : "Required"
      if ('mobileNo' in fieldValues)
      temp.mobileNo = fieldValues.mobileNo ? "" : "Required"
      if ('emailId' in fieldValues)
      temp.emailId = fieldValues.emailId ? "" : "Required"
      if ('password' in fieldValues)
      temp.password = fieldValues.password ? "" : "Required"
    setErrors({
      ...temp
    })
    if (fieldValues === values)
      return Object.values(temp).every(x => x === "")
  }




  const {
    values,
    handleInputChange,
    resetForm,
    errors,
    setErrors
  } = useForm(initialValues, false, Validate)

  const handleSubmit = e => {
    e.preventDefault();
    if(Validate()){
      setIsLoading(true)
    PatientRegistration(values).then((res) => {
      if (res.data.succeeded) {
        setIsLoading(false)
        setNotify({
          isOpen: true,
          message: 'Updated Successfully',
          type: 'success'
        })
        resetForm();
        
      }
      else {
        setIsLoading(false)
        setNotify({ 
          isOpen: true,
          message: res.data.message,
          type: 'error'
        })        
      }
    }, (error) => {
      setIsLoading(false)
        setNotify({ 
          isOpen: true,
          message: "Network error. Please try again after some time",
          type: 'error'
        })
    })}
  }


  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
      {isLoading && 
                    <CircularProgress size={68} className={classes.fabProgress} />
               }
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Controls.Input
                name="firstName"
                label="First Name" value={values.firstName}
                onChange={handleInputChange} error={errors.firstName}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controls.Input
                name="lastName"
                label="Last Name" value={values.lastName}
                onChange={handleInputChange} error={errors.lastName}
              />
            </Grid>
            <Grid item xs={12}>
              <Controls.Input style={{ width: '100%' }}
                name="mobileNo"
                label="Mobile No" value={values.mobileNo}
                onChange={handleInputChange} error={errors.mobileNo}
              />
            </Grid>
            <Grid item xs={12}>
              <Controls.Input style={{ width: '100%' }}
                name="emailId"
                label="Email Id" value={values.emailId}
                onChange={handleInputChange} error={errors.emailId}
              />
            </Grid>
            <Grid item xs={12}>
              <Controls.Input style={{ width: '100%' }}
                name="password"
                label="Password" value={values.password} type="password"
                onChange={handleInputChange} error={errors.password}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
      <Notification
                    notify={notify}
                    setNotify={setNotify}
            />
    </Container>
  );
}