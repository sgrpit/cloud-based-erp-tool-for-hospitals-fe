import api from '../Api/api'

export const getAppointmentsByStaffId = (id) => {
    return api.get('/Patient/GetAppointmentByDoctor/id/' + id);
}

export const getStaffDetailsByRoleID = (roleId) => {
    return api.get('/Staff/GetStaffDetailsByRoleId/' + roleId);
}