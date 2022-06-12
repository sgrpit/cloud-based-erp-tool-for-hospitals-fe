import React, { useState, useEffect } from "react";
import ThemeProvider from './theme';
import './App.css';
import theme from './Component/ui/Theme'
import { BrowserRouter, Switch, Route, Router } from 'react-router-dom';
import Header from './Component/Common/Header';
import Home from './Pages/Login/Home';
import Department from './Pages/Admin/Department';
import AddStaff from './Pages/Staff/Staff';
import StaffDetails from './Pages/Staff/StaffDetails';
import PatientDashboard from './Pages/Patient/PatientDashboard';
import DoctorDashboard from './Pages/Doctors/DoctorDashboard';
import SignUp from './Pages/Login/SignUp';
import AdmitPatient from './Pages/Admin/AdmitPatient';
import { history } from "./helpers/history";
import AdminDashboard from "./Pages/Admin/AdminDashboard";
import Staff from "./Pages/Staff/Staff";
import EditPatientDetails from "./Pages/Patient/EditPatientDetails";
import { OpacityRounded } from "@material-ui/icons";
import opd from "./Pages/Doctors/opd";
import ipd from "./Pages/Doctors/ipd";
import Discharge from "./Pages/Admin/Discharge";
import MyAppointments from "./Pages/Patient/MyAppointments";
import MyHospitalization from "./Pages/Patient/MyHospitalization";
import HealthRecords from "./Pages/Patient/HealthRecords";
import BookAppointment from "./Pages/Patient/BookAppointment";
import ManagePatient from "./Pages/Patient/ManagePatient";



function App() {


  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <BrowserRouter history={history}>
          <Header />
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/SignUp' component={SignUp} />            
            <Route path='/AdminDashboard' component={AdminDashboard} />
            <Route path='/PatientDashboard' component={PatientDashboard} />
            <Route path='/BookMyAppointment' component={BookAppointment} />
            <Route path='/opd' component={opd} />
            <Route path='/ipd' component={ipd} />
            <Route path="/Doctor" component={DoctorDashboard} />
            <Route path='/AdmitPatient' component={AdmitPatient} />
            <Route path='/Discharge' component={Discharge} />
            <Route path="/department" component={Department} />
            <Route path="/Staff" component={StaffDetails} />
            <Route path="/EditStaff" component={Staff} />
            <Route path="/EditPatient" component={EditPatientDetails} />
            <Route path="/AddStaff" component={AddStaff} />
            <Route path="/MyAppointments" component={MyAppointments} />
            <Route path="/Hospitalization" component={MyHospitalization} />
            <Route path="/HealthRecords" component={HealthRecords} />
            <Route path="/ManagePatient" component={ManagePatient} />
            
          </Switch>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;
