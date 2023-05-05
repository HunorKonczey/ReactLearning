import {Container, Grid, TextField} from "@mui/material";
import * as React from 'react';
import Button from "@mui/material/Button";
import {useRef, useState} from "react";
import AuthService from "../services/auth.service";
import {useNavigate} from "react-router-dom";

const Login = () => {
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

    const handleLogin = (e) => {
        e.preventDefault()
        AuthService.login(email, password).then(data => {
            if (data.accessToken) {
                navigate("/banks")
                window.location.reload()
            }
        })
    }
    return (
        <div>
            <h1>Login</h1>
            <Container component="form" onSubmit={handleLogin} ref={form}>
                <Grid>
                    <Grid style={{ margin: 10 }}>
                        <TextField label="Email address" value={email} variant="outlined" type="email" required onChange={onChangeEmail} />
                    </Grid>
                    <Grid style={{ margin: 10 }}>
                        <TextField label="Password" value={password} variant="outlined" type="password" required onChange={onChangePassword} />
                    </Grid>
                    <Grid style={{ margin: 10 }}>
                        <Button type="submit" variant="contained">
                            Login
                        </Button>
                    </Grid>
                </Grid>
            </Container>
        </div>
    )
}
 export default Login