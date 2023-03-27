import { Grid, TextField } from "@mui/material";
import PasswordField from "./PasswordField";

const SignUpForm = () => {
  return (
    <Grid container spacing={2} justifyContent="center">
      <Grid item xs={12} md={6}>
        <TextField
          id="firstName"
          name="firstName"
          label="First Name"
          variant="standard"
          type="text"
          fullWidth
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          id="lastName"
          name="lastName"
          label="Last Name"
          variant="standard"
          type="text"
          fullWidth
        />
      </Grid>

      <Grid item xs={12}>
        <TextField
          id="email"
          name="email"
          type="email"
          label="Email"
          variant="standard"
          fullWidth
        />
      </Grid>

      <Grid item xs={12}>
        <PasswordField
          id="password"
          name="password"
          label="Password"
          variant="standard"
        />
      </Grid>

      <Grid item xs={12}>
        <PasswordField
          id="confirmPassword"
          name="confirmPassword"
          label="Confirm Password"
          variant="standard"
        />
      </Grid>
    </Grid>
  );
};

export default SignUpForm;
