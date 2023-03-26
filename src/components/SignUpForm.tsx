import { useState, ChangeEvent } from "react";

import { Grid, TextField, Typography, Box } from "@mui/material";
import PasswordField from "./PasswordField";

const initialFormData = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUpForm = () => {
  const [formData, setFormData] = useState(initialFormData);

  const formFieldChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  };

  return (
    <Box component="form">
      <Grid container padding={3} spacing={2} justifyContent="center">
        <Grid item xs={12}>
          <Typography variant="h2" align="center">
            Sign Up!
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            id="firstName"
            name="firstName"
            label="First Name"
            variant="standard"
            fullWidth
            onChange={formFieldChangeHandler}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            id="lastName"
            name="lastName"
            label="Last Name"
            variant="standard"
            fullWidth
            onChange={formFieldChangeHandler}
          />
        </Grid>

        <Grid item xs={12}>
          <PasswordField
            id="password"
            name="password"
            label="Password"
            onChange={formFieldChangeHandler}
          />
        </Grid>

        <Grid item xs={12}>
          <PasswordField
            id="confirmPassword"
            name="confirmPassword"
            label="Confirm Password"
            onChange={formFieldChangeHandler}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default SignUpForm;
