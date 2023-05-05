import * as React from 'react';
import {useEffect, useState} from "react";
import BankService from "../services/bank.service";
import Box from "@mui/material/Box";
import {
    Alert,
    Container,
    Dialog, DialogActions,
    DialogContent, DialogContentText,
    DialogTitle, MenuItem, Select, Snackbar,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow, TextField
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import SendIcon from '@mui/icons-material/Send';
import Button from "@mui/material/Button";
import TransactionService from "../services/transaction.service";

const UserBanks = () => {
    const [userBanks, setUserBanks] = useState([])
    const [receiverUserBanks, setReceiverUserBanks] = useState([])
    const [openDialog, setOpenDialog] = useState(false)
    const [openTransactionDialog, setOpenTransactionDialog] = useState(false)
    const [selectedBank, setSelectedBank] = useState({})
    const [receiverBank, setReceiverBank] = useState({})
    const [amount, setAmount] = useState(0)
    const [showSnackBar, setShowSnackBar] = useState(false)

    async function fetchUserBanks() {
        const userBanks = await BankService.getUserBanksWithAmounts()
        setUserBanks(userBanks)
    }

    async function fetchReceiverUserBanks() {
        const userBanks = await BankService.getUserBanksWithoutLoggedUser()
        if (userBanks.length) {
            setReceiverBank(userBanks[0])
        }
        setReceiverUserBanks(userBanks)
    }

    const deleteUserBank = async (userBankId) => {
        await BankService.deleteUserBank(userBankId)
        const updatedUserBanks = [...userBanks].filter(bank => bank.userBankId !== userBankId)
        setUserBanks(updatedUserBanks)
    }

    const handleDialogOpen = (bank) => {
        setSelectedBank(bank)
        setOpenDialog(true)
        setAmount(0)
    }

    const handleTransactionDialogOpen = (bank) => {
        setSelectedBank(bank)
        setOpenTransactionDialog(true)
        setAmount(0)
    }

    const handleDialogClose = () => {
        setSelectedBank({})
        setOpenDialog(false)
        setAmount(0)
    }

    const handleTransactionDialogClose = () => {
        setSelectedBank({})
        setOpenTransactionDialog(false)
        setAmount(0)
    }

    const changeAmount = (e) => {
        setAmount(e.target.value)
    }

    const changeSelectValue = (e) => {
        setReceiverBank(e.target.value)
    }

    const sendAmount = async () => {
        await BankService.addAmount(selectedBank.userBankId, amount)
        handleDialogClose()
        await fetchUserBanks()
    }

    const saveTransaction = async () => {
        const error = await TransactionService.saveTransaction(selectedBank.userBankId, receiverBank.id, amount)
        handleTransactionDialogClose()
        if (error) {
            handleOpenSnackBar()
        } else {
            await fetchUserBanks()
        }
    }

    const handleOpenSnackBar = () => {
        setShowSnackBar(true)
    }

    const handleCloseSnackBar = () => {
        setShowSnackBar(false)
    }

    useEffect(() => {
        fetchUserBanks()
        fetchReceiverUserBanks()
    }, [])

    return (
        <TableContainer component={Box}>
            <Container>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">Name</TableCell>
                            <TableCell align="left">Created date</TableCell>
                            <TableCell align="left">Account amount</TableCell>
                            <TableCell align="center">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {userBanks.map(userBank => (
                            <TableRow key={userBank.userBankId}>
                                <TableCell align="left">{userBank.bankName}</TableCell>
                                <TableCell align="left">{userBank.createdDate}</TableCell>
                                <TableCell align="left">{userBank.accountAmount}</TableCell>
                                <TableCell align="center">
                                    <IconButton edge="end" aria-label="add" onClick={() => handleDialogOpen(userBank)}>
                                        <AddIcon />
                                    </IconButton>
                                    <IconButton edge="end" aria-label="send" onClick={() => handleTransactionDialogOpen(userBank)}>
                                        <SendIcon />
                                    </IconButton>
                                    <IconButton edge="end" aria-label="delete" onClick={() => deleteUserBank(userBank.userBankId)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Container>

            <Dialog open={openDialog} onClose={handleDialogClose}>
                <DialogTitle>Add amount</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Add some amount to your bank account ({selectedBank ? selectedBank.bankName : ''})!
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="amount"
                        label="Amount value"
                        type="number"
                        fullWidth
                        variant="standard"
                        value={amount}
                        onChange={(e) => changeAmount(e)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose}>Cancel</Button>
                    <Button onClick={sendAmount}>Send</Button>
                </DialogActions>
            </Dialog>

            <Dialog open={openTransactionDialog} onClose={handleTransactionDialogClose}>
                <DialogTitle>Send amount</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Send amount to another bank!
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="amount"
                        label="Amount value"
                        type="number"
                        fullWidth
                        variant="standard"
                        value={amount}
                        onChange={(e) => changeAmount(e)}
                    />
                    <Select
                        id="receiver_bank"
                        value={receiverBank}
                        label="Receiver bank"
                        displayEmpty
                        onChange={changeSelectValue}
                    >
                        {receiverUserBanks.map(userBank => (
                            <MenuItem key={userBank.bank.id} value={userBank}>
                                {`${userBank.user.name} (${userBank.bank.name})`}
                            </MenuItem>
                        ))}
                    </Select>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleTransactionDialogClose}>Cancel</Button>
                    <Button onClick={saveTransaction}>Send</Button>
                </DialogActions>
            </Dialog>

            <Snackbar open={showSnackBar} autoHideDuration={6000} onClose={handleCloseSnackBar}>
                <Alert onClose={handleCloseSnackBar} severity="warning" sx={{ width: '100%' }}>
                    Not enough amount for this transaction!!
                </Alert>
            </Snackbar>
        </TableContainer>
    )
}

export default UserBanks
