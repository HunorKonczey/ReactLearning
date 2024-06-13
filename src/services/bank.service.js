import axios from "axios";
import authHeader from "./auth-header";
import { BANK_URL, USER_BANK_URL } from "../constants/urls";

const deleteBank = (id) => {
  return axios.get(`${BANK_URL}delete/${id}`, {
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

const addBank = async (bankName, foundationDate, imageFile) => {
  const formData = new FormData()
  formData.append("bankName", bankName)
  formData.append("foundationDate", foundationDate)
  imageFile ?
    formData.append("imageFile", imageFile) :
    formData.append("imageFile", new File([], null))
  const header = authHeader()
  header["Content-Type"] = "multipart/form-data"
  const bank = await axios.post(BANK_URL,
    formData,
    { headers: header })
    .then()
  return bank.data
}

const updateBank = async (id, bankName, foundationDate, imageFile) => {
  const formData = new FormData()
  formData.append("id", id)
  formData.append("bankName", bankName)
  formData.append("foundationDate", foundationDate)
  imageFile ?
    formData.append("imageFile", imageFile) :
    formData.append("imageFile", new File([], null))
  const header = authHeader()
  header["Content-Type"] = "multipart/form-data"
  const bank = await axios.post(BANK_URL + "update",
    formData,
    { headers: header })
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

const deleteUserBank = async (id) => {
  await axios.get(`${USER_BANK_URL}delete/${id}`, {
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
  updateBank,
  addUserBank,
  deleteUserBank,
  addAmount
}
export default BankService;