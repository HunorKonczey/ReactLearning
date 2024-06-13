import * as React from 'react'
import { useRef, useState } from "react"
import {
  Alert,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Snackbar,
  TextField
} from "@mui/material"
import Button from "@mui/material/Button"
import DateFnsUtils from '@date-io/date-fns'
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers"
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import BankService from "../services/bank.service";
import dateFormat from "dateformat"
import Paper from "@mui/material/Paper"
import Box from "@mui/material/Box"
import { styled } from '@mui/material/styles';
import { useLocation } from "react-router-dom";
import { API_URL } from "../constants/urls";

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const AddBank = (props) => {
  const location = useLocation()
  let bank = null
  let name = ""
  let date = Date()
  let imagePath = null
  if (location && location.state && location.state.bank) {
    bank = location.state.bank
    name = bank.name
    date = bank.foundationDate

    if (bank.imagePath) {
      imagePath = `${API_URL}${bank.imagePath}`
    }
  }

  const [bankName, setBankName] = useState(name)
  const [foundationDate, setFoundationDate] = useState(date)
  const [selectedImage, setSelectedImage] = useState(imagePath)
  const [imageFile, setImageFile] = useState(null)
  const [showSnackBar, setShowSnackBar] = useState(false)
  const [open, setOpen] = useState(false)
  const [selectedBank, setSelectedBank] = useState(bank)

  const form = useRef();

  const handleAddBank = async (e) => {
    e.preventDefault()
    const bank = selectedBank ?
      await BankService.updateBank(selectedBank.id, bankName, dateFormat(foundationDate, "yyyy-mm-dd"), imageFile) :
      await BankService.addBank(bankName, dateFormat(foundationDate, "yyyy-mm-dd"), imageFile)

    setBankName("")
    setFoundationDate(Date())
    setImageFile(null)
    setSelectedImage(null)

    if (bank) {
      handleOpenSnackBar()
    }
    setSelectedBank(null)
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const imageUrl = URL.createObjectURL(file)
      setSelectedImage(imageUrl)
      setImageFile(file)
    }
  }

  const handleClickOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
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
    <Box>
      <Container sx={{ my: 1 }} maxWidth="xs" component="form" onSubmit={handleAddBank} ref={form}>
        <Paper sx={{ p: 1 }} variant="elevation" elevation={2}>
          {!selectedBank && <h1>Add new bank</h1>}
          {selectedBank && <h1>Edit {selectedBank.name} bank</h1>}
          <Grid>
            <Grid style={{ margin: 10 }}>
              <TextField label="Bank name" value={bankName} variant="outlined" type="text" required
                         onChange={onChangeBankName}/>
            </Grid>
            <Grid style={{ margin: 10 }}>
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
            <Grid style={{ margin: 10 }}>
              <Button
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<CloudUploadIcon/>}
              >
                Upload bank image
                <VisuallyHiddenInput type="file" onChange={handleImageChange}/>
              </Button>
            </Grid>
            <Grid style={{ margin: 10 }}>
              <Button variant="outlined" onClick={handleClickOpen}>
                Preview bank image
              </Button>
            </Grid>
            <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
              <DialogTitle>Image Preview</DialogTitle>
              <DialogContent>
                {selectedImage && <img src={selectedImage} alt="Selected" width="100%"/>}
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} color="primary">
                  Close
                </Button>
              </DialogActions>
            </Dialog>
            <Grid style={{ margin: 10 }}>
              <Button type="submit" variant="contained">
                Save bank
              </Button>
            </Grid>
          </Grid>
        </Paper>

        <Snackbar open={showSnackBar} autoHideDuration={6000} onClose={handleCloseSnackBar}>
          <Alert onClose={handleCloseSnackBar} severity="success" sx={{ width: '100%' }}>
            {(selectedBank ? 'Bank updated successful!!' : 'New bank added successful!!')}
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  )
}

export default AddBank