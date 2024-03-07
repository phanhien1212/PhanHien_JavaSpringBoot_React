import httpAxios from "../httpAxios";

function register(formData)
{
    return httpAxios.post(`register`, formData)
}
function login(formData)
{
    return httpAxios.post(`login`, formData)
}
function getById(id)
{
    return httpAxios.get(`user/${id}`)
}

function create(data)
{
    return httpAxios.post(`order/create`,data)
}
const UserService = {
    register:register,
    login:login,
    getById:getById,
    create:create

}
export default UserService;