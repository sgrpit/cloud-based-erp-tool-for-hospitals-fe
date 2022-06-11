import api from '../Api/api'


export const fetchDepartments = () => {
    return api.get('/Department');
}

export const upsertDepartmentDetails = (department) => {
    return api.post('/Department', department)
}

export const deleteDepartmentDetails = (departmentId) => {
    debugger;
    return api.delete('/Department?deptId=' + departmentId)
}

//export default fetchDepartments;