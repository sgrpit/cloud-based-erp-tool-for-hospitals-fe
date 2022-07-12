import React from 'react'
import {
  AppBar,
  Toolbar,
  CssBaseline,
  Typography,
  makeStyles,
  IconButton,
  Menu,
  MenuItem,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { withRouter } from 'react-router-dom';
import { AccountCircle, HistoryRounded } from '@material-ui/icons';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  navlinks: {
    marginLeft: theme.spacing(1),
    display: "flex",
  },
  
  logo: {
    flexGrow: "1",
    cursor: "pointer",
  },
  link: {
    textDecoration: "none",
    color: "white",
    fontSize: "em",
    marginLeft: theme.spacing(5),
    "&:hover": {
      color: "yellow",
      borderBottom: "1px solid white",
    },
  },
}));


export function Navbar() {
  const classes = useStyles();
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const history = useHistory();

  const handleChange = (event) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = e => {
    localStorage.clear();
    window.location.href = '/';
    setAnchorEl(null);

  }

  const handleProfileEdit = e => {
    if(localStorage.getItem("Staff")){
      history.push('/EditStaff');
    }
    else{
      history.push('/EditPatient');
    }
    
    setAnchorEl(null);
  }
  
  // if(!localStorage.get["Id"]){
  //   window.location.href('/')
  // }

  return (
    <>
      {localStorage.getItem("RoleId") === "1" && (
        <div style={{textAlign:'left', width:'80%'}}>
          <Link to="/AdminDashboard" className={classes.link}>
            Dashboard
          </Link>
          <Link to="/Staff" className={classes.link}>
            Manage Staff
          </Link>
          <Link to="/ManagePatient" className={classes.link}>
            Manage Patient
          </Link>
          <Link to="/AdmitPatient" className={classes.link}>
            Patient Admission
          </Link>
          <Link to="/Discharge" className={classes.link}>
            Patient Discharge
          </Link>
          <Link to="/department" className={classes.link}>
            Manage Department
          </Link>
        </div>
      )}
      {localStorage.getItem("RoleId") === "2" && (
        <div style={{width:'80%', textAlign:'left'}}  >
          <Link to="/AdminDashboard" className={classes.link}>
            Doctor Dashboard
          </Link>
          <Link to="/opd" className={classes.link}>
            OPD Patients
          </Link>
          <Link to="/ipd" className={classes.link}>
            IPD Patient
          </Link>
          <Link to="/OPDAppointmentsHistory" className={classes.link}>
            OPD History
          </Link>
        </div>
      )}
      {localStorage.getItem("RoleId") === "3" && (
        <div style={{width:'80%', textAlign:'left'}}  >
          <Link to="/AdminDashboard" className={classes.link}>
            Dashboard
          </Link>
          <Link to="/View Appointment" className={classes.link}>
            View Appointments
          </Link>
          <Link to="/IPD Patient Details" className={classes.link}>
            IPD Patient
          </Link>
        </div>
      )}
      {localStorage.getItem("RoleId") === "4" && (
        <div style={{width:'80%', textAlign:'left'}}  >
          <Link to="/AdminDashboard" className={classes.link}>
            Doctor Dashboard
          </Link>
          <Link to="/View Appointment" className={classes.link}>
            View Appointments
          </Link>
          <Link to="/IPD Patient Details" className={classes.link}>
            IPD Patient
          </Link>
        </div>
      )}
      {localStorage.getItem("RoleId") === "0" && (
        <div style={{width:'80%', textAlign:'left'}}  >
          <Link to="/AdminDashboard" className={classes.link}>
            Dashboard
          </Link>
          <Link to="/BookMyAppointment" className={classes.link}>
            Book My Appointments
          </Link>
          <Link to="/MyAppointments" className={classes.link}>
            My Appointments
          </Link>
          <Link to="/HealthRecords" className={classes.link}>
            Health Records
          </Link>
          <Link to="/Hospitalization" className={classes.link}>
            Hospitalization
          </Link>
        </div>
      )}
      {localStorage.getItem("Id") && (
        <div>
          <IconButton className={classes.menuButton}
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
          <AccountCircle />
          </IconButton>
          <Menu
            
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={open}
            onClose={handleClose}
          >
            <MenuItem onClick={handleProfileEdit} >Edit Profile</MenuItem>
            <MenuItem onClick={handleLogout} >Log Out</MenuItem>
          </Menu>
        </div>
      )}

    </>
  )
}

export default withRouter(Navbar)
