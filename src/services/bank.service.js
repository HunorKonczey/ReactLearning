import axios from "axios";
import authHeader from "./auth-header";
import { BANK_URL, USER_BANK_URL } from "../constants/urls";

const deleteBank = (id) => {
    return axios.delete(BANK_URL, {
        params: { id },
        headers: authHeader()
    }).then()
}

const getBanks = async () => {
    const banks = await axios.get(BANK_URL, { headers: authHeader() })
    return banks.data
}

const getUserBanks = async () => {
    const userBanks = await axios.get(USER_BANK_URL, { headers: authHeader() })
    return userBanks.data
}

const getUserBanksWithAmounts = async () => {
    const userBanks = await axios.get(USER_BANK_URL + "amounts", { headers: authHeader() })
    return userBanks.data
}

const getUserBanksWithoutLoggedUser = async () => {
    const userBanks = await axios.get(USER_BANK_URL + "others", { headers: authHeader() })
    return userBanks.data
}

const addBank = async (bankName, foundationDate) => {
    const bank = await axios.post(BANK_URL,
        { bankName, foundationDate },
        { headers: authHeader() })
        .then()
    return bank.data
}

const addUserBank = async (bankId) => {
    const userBank = await axios.post(USER_BANK_URL, null,
        {
            params: { bankId },
            headers: authHeader()
        })
        .then()
    return userBank.data
}

const deleteUserBank = async (bankId) => {
    await axios.delete(USER_BANK_URL,{
        params: { bankId },
        headers: authHeader()
    }).then()
}

const addAmount = async (userBankId, amount) => {
    await axios.post(USER_BANK_URL + "amount",
        { userBankId, amount },
        { headers: authHeader() })
}

const BankService = {
    deleteBank,
    getBanks,
    getUserBanks,
    getUserBanksWithAmounts,
    getUserBanksWithoutLoggedUser,
    addBank,
    addUserBank,
    deleteUserBank,
    addAmount
}
export default BankService;