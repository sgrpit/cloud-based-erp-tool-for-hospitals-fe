import api from '../Api/api'

export const fetchStaffDetails = () => {
    return api.get('/Staff');
}
export const fetchStaffDetailsById = (id) => {
    return api.get('/Staff/GetStaffDetailsById/' + id);
}

export const fetchDoctorsByDeptId = (deptId) => {
    return api.get('/Staff/deptId/' + deptId);
}

export const saveStaffDetails = (staff) => {
    return api.post('/Staff', staff);
}
export const updateStaffDetails = (staff) => {
    return api.put('/Staff/', staff);
}
export const delteStaffDetails = (id) => {
    return api.put('/Staff?Id' + id);
}