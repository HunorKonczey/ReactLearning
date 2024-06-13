import * as React from 'react';
import { useEffect, useState } from "react";
import BankService from "../services/bank.service";
import {
  Avatar,
  Container,
  Dialog, DialogActions,
  DialogContent, DialogContentText,
  DialogTitle,
  List,
  ListItem,
  ListItemAvatar, ListItemSecondaryAction,
  ListItemText
} from "@mui/material";
import CreditCardIcon from '@mui/icons-material/CreditCard';
import IconButton from "@mui/material/IconButton";
import AddIcon from '@mui/icons-material/Add';
import Paper from '@mui/material/Paper';
import { API_URL } from "../constants/urls";
import AuthService from "../services/auth.service";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from '@mui/icons-material/Edit';
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

const Banks = () => {
  const [banks, setBanks] = useState([])
  const [userBanks, setUserBanks] = useState([])
  const [isAdmin, setIsAdmin] = useState(false)
  const [selectedBank, setSelectedBank] = useState({})
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
  const navigate = useNavigate()

  async function fetchBank() {
    const banks = await BankService.getBanks();
    setBanks(banks)
  }

  async function fetchUserBanks() {
    const userBanks = await BankService.getUserBanks()
    setUserBanks(userBanks)
  }

  const addBank = async (bankId) => {
    const userBank = await BankService.addUserBank(bankId)
    const updatedUserBanks = [...userBanks, userBank]
    setUserBanks(updatedUserBanks)
  }

  const handleDeleteDialogOpen = (bank) => {
    setSelectedBank(bank)
    setOpenDeleteDialog(true)
  }

  const handleDeleteDialogClose = () => {
    setSelectedBank({})
    setOpenDeleteDialog(false)
  }

  const navigateToEditBank = (e, bank) => {
    e.preventDefault()
    navigate('/addBanks', { state: { bank: bank } })
  }

  const deleteBank = async () => {
    const bankId = selectedBank.id
    await BankService.deleteBank(bankId)
    const updatedBanks = [...banks].filter(bank => bank.id !== bankId)
    setBanks(updatedBanks)
    handleDeleteDialogClose()
  }

  useEffect(() => {
    fetchUserBanks()
    fetchBank()
    setIsAdmin(AuthService.isAdmin())
  }, [])

  return (
    <Container sx={{ my: 2 }}>
      <List>
        {banks.map((bank, i) => {
          const itemName = `${bank.name} (${bank.foundationDate})`
          let bankImagePath;
          if (bank.imagePath) {
            bankImagePath = `${API_URL}${bank.imagePath}`
          }
          return <Paper key={i} variant="elevation" elevation={2} sx={{ marginBottom: 2 }}>
            <ListItem>
              <ListItemAvatar>
                {bankImagePath && <Avatar variant="rounded" src={bankImagePath}></Avatar>}
                {!bankImagePath && (
                  <Avatar variant="rounded">
                    <CreditCardIcon/>
                  </Avatar>
                )}
              </ListItemAvatar>
              <ListItemText id={bank.id} primary={itemName}></ListItemText>
              <ListItemSecondaryAction>
                {!userBanks.find(userBanks => userBanks.bank.id === bank.id) && (
                  <IconButton style={{ color: 'blue' }} edge="end" aria-label="add" onClick={() => addBank(bank.id)}>
                    <AddIcon/>
                  </IconButton>
                )}
                {isAdmin && (
                  <IconButton edge="end" aria-label="edit" onClick={(e) => navigateToEditBank(e, bank)}>
                    <EditIcon style={{ color: 'purple' }}/>
                  </IconButton>
                )}
                {isAdmin && (
                  <IconButton style={{ color: 'red' }} edge="end" aria-label="delete"
                              onClick={() => handleDeleteDialogOpen(bank)}>
                    <DeleteIcon/>
                  </IconButton>
                )}
              </ListItemSecondaryAction>
            </ListItem>
          </Paper>
        })}
      </List>

      <Dialog open={openDeleteDialog} onClose={handleDeleteDialogClose}>
        <DialogTitle>Delete user bank</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure to delete this bank: {selectedBank ? selectedBank.name : ''}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteDialogClose}>Disagree</Button>
          <Button onClick={deleteBank} autoFocus>Agree</Button>
        </DialogActions>
      </Dialog>
    </Container>
  )
}

export default Banks
