import axios from "axios";
import authHeader from "./auth-header";
import {API_URL} from "../constants/urls";

const deleteUser = (id) => {
    return axios.delete(API_URL + "users/", {
        params: { id }
    }).then()
}

const UserService = {
    deleteUser
}
export default UserService;