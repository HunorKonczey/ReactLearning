import { Container, Grid, TextField } from "@mui/material";
import * as React from 'react';
import Button from "@mui/material/Button";
import { useRef, useState } from "react";
import AuthService from "../services/auth.service";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const form = useRef();
  let navigate = useNavigate();

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password)
  }

  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email)
  }

  const onChangeName = (e) => {
    const name = e.target.value;
    setName(name)
  }

  const handleRegister = (e) => {
    e.preventDefault()
    AuthService.register(name, email, password).then(data => {
      if (data.accessToken) {
        navigate("/banks")
        window.location.reload()
      }
    })
  }

  return (
    <div>
      <h1>Register</h1>
      <Container component="form" onSubmit={handleRegister} ref={form}>
        <Grid>
          <Grid style={{ margin: 10 }}>
            <TextField label="Name" value={name} variant="outlined" type="text" required onChange={onChangeName}/>
          </Grid>
          <Grid style={{ margin: 10 }}>
            <TextField label="Email address" value={email} variant="outlined" type="email" required
                       onChange={onChangeEmail}/>
          </Grid>
          <Grid style={{ margin: 10 }}>
            <TextField label="Password" value={password} variant="outlined" type="password" required
                       onChange={onChangePassword}/>
          </Grid>
          <Grid style={{ margin: 10 }}>
            <Button type="submit" variant="contained">
              Sign up
            </Button>
          </Grid>
        </Grid>
      </Container>
    </div>
  )
}
export default Register