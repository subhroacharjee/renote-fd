export const API_BASE_PATH = 'http://localhost:8080/api/v1'
const pathURIS = {
    login:`${API_BASE_PATH}/auth/login`,
    fbLogin:`${API_BASE_PATH}/auth/login/firebase`,
    register:`${API_BASE_PATH}/auth/register`,
    fbRegister:`${API_BASE_PATH}/auth/register/firebase`,
    user:`${API_BASE_PATH}/auth/user`,
    notes: `${API_BASE_PATH}/notes`,
    changePassword: `${API_BASE_PATH}/auth/change-password`
};

export default pathURIS