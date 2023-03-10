import axios from "axios";
import authHeader from "./auth-header";
import {API_URL} from "../constants/urls";

const deleteBank = (id) => {
    return axios.delete(API_URL + "banks/", {
        params: { id },
        headers: authHeader()
    }).then()
}

const getBanks = async () => {
    const banks = await axios.get(API_URL + "banks/", {headers: authHeader()})
    return banks.data
}

const BankService = {
    deleteBank,
    getBanks
}
export default BankService;