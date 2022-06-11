import api from '../Api/api'

export const validateUser = (userName, password) => {
    //debugger;
    return api.get('/Login/ValidateUser/' + userName + '/' + password)
} 

export const validatePatient = (userName, password) => {
    //debugger;
    return api.get('/Login/ValidatePatient/' + userName + '/' + password)
} 