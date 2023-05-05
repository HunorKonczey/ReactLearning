import * as React from 'react';
import {useEffect, useState} from "react";
import BankService from "../services/bank.service";
import {Avatar, Container, List, ListItem, ListItemAvatar, ListItemText} from "@mui/material";
import CreditCardIcon from '@mui/icons-material/CreditCard';
import IconButton from "@mui/material/IconButton";
import AddIcon from '@mui/icons-material/Add';

const Banks = () => {
    const [banks, setBanks] = useState([])
    const [userBanks, setUserBanks] = useState([])

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

    useEffect(() => {
        fetchUserBanks()
        fetchBank()
    }, [])

    return (
        <Container>
            <List>
                {banks.map((bank, i) => {
                    const itemName = `${bank.name} (${bank.foundationDate})`
                    return <ListItem key={i}
                        secondaryAction={
                            (!userBanks.find(userBanks => userBanks.bank.id === bank.id) ?
                                    <IconButton edge="end" aria-label="add" onClick={() => addBank(bank.id)}>
                                        <AddIcon />
                                    </IconButton> : ''
                            )
                        }
                    >
                        <ListItemAvatar>
                            <Avatar>
                                <CreditCardIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText id={bank.id} primary={itemName}></ListItemText>
                    </ListItem>
                })}
            </List>
        </Container>
    )
}

export default Banks
