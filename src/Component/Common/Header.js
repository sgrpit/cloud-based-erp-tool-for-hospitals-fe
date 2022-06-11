import React from 'react'
import { AppBar, makeStyles, Toolbar } from '@material-ui/core'
import logo from '../../assets/logo.jpg';
import Theme from '../ui/Theme';
import Navbar from './Navbar';


const appMenuItems = [
  {
    name: "Admin",
    link: "/Admin"
  },
  {
    name: "Patient",
    link: "/patient"
  },
  {
    name: "Doctors",
    link: "/Doctors"
  }

]

const useStyles = makeStyles(theme => ({
  toolBarMargin: {
    ...theme.mixins.toolbar
  },
  logo: {
    height: "5.5em"
  }

}))

export default function Header() {
  const classes = useStyles();
  return (
    <AppBar position='static'>
        <Toolbar disableGutters>
          <img src={logo} alt='Kloud-Klinic' className={classes.logo} />
          <Navbar />
        </Toolbar>
    </AppBar>
  )
}
