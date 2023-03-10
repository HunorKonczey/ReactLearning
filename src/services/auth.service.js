import axios from 'axios';
import { API_URL } from "../constants/urls";

const USER = 'user';
const register = (name, email, password) => {
    return axios.post(API_URL + "users/register", {
        name,
        email,
        password
    });
};

const login = (email, password) => {
    return axios.post(API_URL + "login", {}, { params: {
            email,
            password
        }
    }).then(response => {
        if (response.data.accessToken) {
            localStorage.setItem(USER, JSON.stringify(response.data))
        }

        return response.data;
    })
}

const logout = () => {
    localStorage.removeItem(USER)
}

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem(USER))
}

const AuthService = {
    register,
    login,
    logout,
    getCurrentUser
};

export default AuthService;