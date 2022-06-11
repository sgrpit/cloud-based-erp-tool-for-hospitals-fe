import api from '../Api/api'


export const fetchDepartments = () => {
    return api.get('/Admin/RoomType');
}