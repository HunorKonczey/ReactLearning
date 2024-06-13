import * as React from 'react';
import { useEffect, useState } from "react";
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from "@mui/material";
import TransactionService from "../services/transaction.service";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import { useCustomTheme } from "../context/ThemeContext";

const Transactions = () => {
  const [sentTransactions, setSentTransactions] = useState([])
  const [receivedTransactions, setReceivedTransactions] = useState([])
  const palette = useTheme().palette
  const { isDarkTheme } = useCustomTheme()

  async function fetchTransactions() {
    const transactions = await TransactionService.getTransactions()
    setSentTransactions(transactions.sentTransactions)
    setReceivedTransactions(transactions.receivedTransactions)
  }

  const transactionColor = (transaction) => {
    if (transaction.transactionStatus === 'ACCEPTED') {
      return 'darkgreen'
    } else if (transaction.transactionStatus === 'PENDING') {
      return 'darkorange'
    }
    return 'darkred'
  }

  const tableHeaderColor = () => {
    return isDarkTheme ? palette.primary.dark : palette.primary.light
  }

  const textColor = () => {
    return isDarkTheme ? palette.primary.contrastText : palette.secondary.contrastText
  }

  useEffect(() => {
    fetchTransactions()
  }, [])

  return (
    <TableContainer sx={{ my: 2 }}>
      <Container>
        <Typography sx={{ p: 1 }} variant="h5" component="h4">
          Sent transactions
        </Typography>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow style={{ background: tableHeaderColor() }}>
              <TableCell style={{ color: textColor() }} align="left">Sender bank</TableCell>
              <TableCell style={{ color: textColor() }} align="left">Receiver bank</TableCell>
              <TableCell style={{ color: textColor() }} align="left">Transaction date</TableCell>
              <TableCell style={{ color: textColor() }} align="left">Transaction status</TableCell>
              <TableCell style={{ color: textColor() }} align="left">Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sentTransactions.map(sentTransaction => (
              <TableRow key={sentTransaction.id}>
                <TableCell style={{ color: textColor() }} align="left">
                  {`${sentTransaction.senderUserBank.user.name} (${sentTransaction.senderUserBank.bank.name})`}
                </TableCell>
                <TableCell style={{ color: textColor() }} align="left">
                  {`${sentTransaction.receiverUserBank.user.name} (${sentTransaction.receiverUserBank.bank.name})`}
                </TableCell>
                <TableCell style={{ color: textColor() }} align="left">{sentTransaction.transactionDate}</TableCell>
                <TableCell align="left" style={{ color: transactionColor(sentTransaction) }}>
                  {sentTransaction.transactionStatus}
                </TableCell>
                <TableCell align="left"
                           style={{ color: 'darkred' }}>{sentTransaction.transactionValue}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Container>

      <Container style={{ marginTop: 10 }}>
        <Typography sx={{ p: 1 }} variant="h5" component="h5">
          Received transactions
        </Typography>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow style={{ background: tableHeaderColor() }}>
              <TableCell style={{ color: textColor() }} align="left">Receiver bank</TableCell>
              <TableCell style={{ color: textColor() }} align="left">Sender bank</TableCell>
              <TableCell style={{ color: textColor() }} align="left">Transaction date</TableCell>
              <TableCell style={{ color: textColor() }} align="left">Transaction status</TableCell>
              <TableCell style={{ color: textColor() }} align="left">Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {receivedTransactions.map(receivedTransaction => (
              <TableRow key={receivedTransaction.id}>
                <TableCell style={{ color: textColor() }} align="left">
                  {`${receivedTransaction.receiverUserBank.user.name} (${receivedTransaction.receiverUserBank.bank.name})`}
                </TableCell>
                <TableCell style={{ color: textColor() }} align="left">
                  {`${receivedTransaction.senderUserBank.user.name} (${receivedTransaction.senderUserBank.bank.name})`}
                </TableCell>
                <TableCell style={{ color: textColor() }} align="left">{receivedTransaction.transactionDate}</TableCell>
                <TableCell align="left" style={{ color: transactionColor(receivedTransaction) }}>
                  {receivedTransaction.transactionStatus}
                </TableCell>
                <TableCell align="left"
                           style={{ color: 'darkgreen' }}>{receivedTransaction.transactionValue}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Container>
    </TableContainer>
  )
}

export default Transactions
