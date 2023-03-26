import { useCallback, FormEvent } from "react";
import {
  Grid,
  TextField,
  Typography,
  Button,
  Box,
  Divider,
} from "@mui/material";
import { useSession, signIn, signOut } from "next-auth/react";

import PasswordField from "./PasswordField";
import SignUpFormModal from "./SignUpFormModal";

const LoginForm = () => {
  const { data: session } = useSession();

  const onSubmitHandler = useCallback(async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { email, password } = e.target as typeof e.target & {
      email: HTMLInputElement;
      password: HTMLInputElement;
    };

    signIn("credentials", {
      email: email.value,
      password: password.value,
      redirect: false,
    });
  }, []);

  if (!session) {
    return (
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography
            component="h1"
            variant="h5"
            textAlign="center"
            marginBottom={2}
          >
            We missed you!
          </Typography>
        </Grid>

        <Box component="form" onSubmit={onSubmitHandler}>
          <Grid container spacing={2}>
            <Grid container item>
              <Grid item container justifyContent="space-between">
                <Typography component="h3" variant="subtitle1">
                  Sign in to continue
                </Typography>
                <SignUpFormModal />
              </Grid>

              <TextField
                id="email"
                name="email"
                type="email"
                label="Email"
                variant="outlined"
                fullWidth
              />
            </Grid>

            <Grid item xs={12}>
              <PasswordField
                id="password"
                name="password"
                label="Password"
                variant="outlined"
              />
            </Grid>

            <Grid container item xs={12}>
              <Button type="submit" size="medium" variant="contained" fullWidth>
                Sign in
              </Button>
            </Grid>
          </Grid>
        </Box>

        <Grid item xs={12}>
          <Divider>or</Divider>
        </Grid>
      </Grid>
    );
  }

  return (
    <>
      <h1>LOGGED IN </h1>
      <Button onClick={async () => signOut({ redirect: false })}>
        SIGN OUT
      </Button>
    </>
  );
};

export default LoginForm;
