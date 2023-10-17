import axios from "axios";
import authHeader from "./auth-header";
import {TRANSACTION_URL} from "../constants/urls";

const saveTransaction = async (senderUserBankId, receiverUserBankId, transactionValue) => {
    return await axios.post(TRANSACTION_URL,
        { senderUserBankId, receiverUserBankId, transactionValue },
        { headers: authHeader() })
        .catch(error => error.response)
}

const getTransactions = async () => {
    const transactions = await axios.get(TRANSACTION_URL, { headers: authHeader() })
    return transactions.data
}

const TransactionService = {
    saveTransaction,
    getTransactions
}
export default TransactionService;