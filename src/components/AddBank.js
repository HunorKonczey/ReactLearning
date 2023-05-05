import * as React from 'react'
import {useRef, useState} from "react"
import {Alert, Container, Grid, Snackbar, TextField} from "@mui/material"
import Button from "@mui/material/Button"
import DateFnsUtils from '@date-io/date-fns'
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers"
import BankService from "../services/bank.service";
import dateFormat from "dateformat";

const AddBank = () => {
    const [bankName, setBankName] = useState("")
    const [foundationDate, setFoundationDate] = useState(Date())
    const [showSnackBar, setShowSnackBar] = useState(false)

    const form = useRef();

    const handleAddBank = async (e) => {
        e.preventDefault()
        const bank = await BankService.addBank(bankName, dateFormat(foundationDate, "yyyy-mm-dd"))
        setBankName("")
        setFoundationDate(Date())

        if (bank) {
            handleOpenSnackBar()
        }
    }

    const handleOpenSnackBar = () => {
        setShowSnackBar(true)
    }

    const handleCloseSnackBar = () => {
        setShowSnackBar(false)
    }

    const onChangeBankName = (e) => {
        const bankName = e.target.value;
        setBankName(bankName)
    }

    const onChangeFoundationDate = (date) => {
        setFoundationDate(date)
    }

    return (
        <div>
            <h1>Add new bank</h1>
            <Container component="form" onSubmit={handleAddBank} ref={form}>
                <Grid>
                    <Grid style={{margin: 10}}>
                        <TextField label="Bank name" value={bankName} variant="outlined" type="text" required
                                   onChange={onChangeBankName}/>
                    </Grid>
                    <Grid style={{margin: 10}}>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <DatePicker
                                label="Foundation date"
                                inputVariant="outlined"
                                value={foundationDate}
                                onChange={onChangeFoundationDate}
                                openTo="year"
                                format="yyyy-MM-dd"
                            />
                        </MuiPickersUtilsProvider>
                    </Grid>
                    <Grid style={{margin: 10}}>
                        <Button type="submit" variant="contained">
                            Save bank
                        </Button>
                    </Grid>
                </Grid>

                <Snackbar open={showSnackBar} autoHideDuration={6000} onClose={handleCloseSnackBar}>
                    <Alert onClose={handleCloseSnackBar} severity="success" sx={{ width: '100%' }}>
                        New bank added successful!!
                    </Alert>
                </Snackbar>
            </Container>
        </div>
    )
}

export default AddBank