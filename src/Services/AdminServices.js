import api from '../Api/api'


export const fetchRoomTypes = () => {
    return api.get('/Admin/RoomType');
}
export const fetchAvailableBeds = (roomId) => {
    return api.get('/Admin/GetAvailableBed/' + roomId);
}
export const fetchRoles = () => {
    return api.get('/Admin/GetUserRoles');
}