import * as React from 'react';
import {useEffect, useState} from "react";
import BankService from "../services/bank.service";
import {List, ListItem, ListItemText} from "@mui/material";
import Box from "@mui/material/Box";

const Banks = () => {
    const [banks, setBanks] = useState([])

    async function fetchBank() {
        const banks = await BankService.getBanks();
        setBanks(banks)
    }

    useEffect(() => {
        fetchBank()
    }, [])

    return (
        <Box>
            <List>
                {banks.map((bank, i) => {
                    const itemName = `${bank.name} (${bank.foundationDate})`
                    return (
                        <ListItem key={i}>
                            <ListItemText id={bank.id} primary={itemName}></ListItemText>
                        </ListItem>
                    )
                })}
            </List>
        </Box>
    )
}

export default Banks
