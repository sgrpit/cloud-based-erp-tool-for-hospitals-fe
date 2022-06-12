import api from '../Api/api'

export const getPatientDetailsByUHID = (patientUHID) => {
    return api.get('/Patient/PatientUHID/' + patientUHID);
}

export const bookPatientAppointment = (patientAppointment) => {
    return api.post('/Patient/ScheduleAppointment', patientAppointment);
}

export const getAppointmentsByPatientId = (patientId) => {
    debugger;
    return api.get('/Patient/GetAppointmentByPatientId/' + patientId);
}

export const PatientRegistration = (patient) => {
    return api.post('/Patient/PatientRegistration', patient);
}

export const UpdatePatientDetails = (patient) => {
    return api.put('/Patient/UpdatePatientDetails', patient);
}

export const AddPatientPrescription = (patientPrescription) => {
    return api.post('/Patient/AddPrescription', patientPrescription);
}

export const PatientAdmission = (patientAdmission) => {
    return api.post('/Patient/PatientAdmission', patientAdmission);
} 

export const PatientDischarge = (patientDischarge) => {
    return api.post('/Patient/PatientDischarge', patientDischarge);
} 

export const GetPrescriptionHistoryByPatientId = (patientId) => {
    return api.get('/Patient/PrescriptionHistoryByPatientId/' + patientId);
}

export const GetIPDPatientsDetails = () => {
    return api.get('/Patient/GetIPDPatientDetails');
}

export const GetIPDPatientDetailsByPatientUHID = (patientUHID) => {
    return api.get('/Patient/GetIPDPatientDetailsByPatientUHID/' + patientUHID);
}

export const GetHospitalizationByPatientId = (patientId) => {
    return api.get('/Patient/GetHospitalizationByPatientId/' + patientId);
}