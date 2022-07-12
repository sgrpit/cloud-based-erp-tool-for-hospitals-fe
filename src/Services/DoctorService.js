import api from '../Api/api'

export const getAppointmentsByStaffId = (id) => {
    return api.get('/Patient/GetAppointmentByDoctor/id/' + id);
}

export const getOPDHistoryByStaffId = (id, fromDate, toDate) => {
    return api.get('/Patient/GetOPDHistoryByDoctor/id/' + id + '/' + fromDate + '/' + toDate);
}

export const getStaffDetailsByRoleID = (roleId) => {
    return api.get('/Staff/GetStaffDetailsByRoleId/' + roleId);
}