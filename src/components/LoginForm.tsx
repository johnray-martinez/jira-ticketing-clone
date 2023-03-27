import { useCallback, FormEvent, useState, useEffect } from "react";
import { useRouter } from "next/router";
import {
  Grid,
  TextField,
  Typography,
  Button,
  Divider,
  CircularProgress,
} from "@mui/material";
import { getSession, signIn } from "next-auth/react";

import PasswordField from "./PasswordField";
import SignUpFormModal from "./SignUpFormModal";

const LoginForm = () => {
  // HOOKS
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // redirect users that are already logged in
  useEffect(() => {
    getSession().then(session => {
      if (session) {
        router.push("/");
      }
    });
  }, []);

  const onSubmitHandler = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      setIsLoading(true);

      const { email, password } = e.target as typeof e.target & {
        email: HTMLInputElement;
        password: HTMLInputElement;
      };

      try {
        await signIn("credentials", {
          email: email.value,
          password: password.value,
          redirect: false,
        });

        router.replace("/");
      } catch (err) {
        console.error(err);
        setIsLoading(false);
      }
    },
    [router]
  );

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

      <Grid container spacing={2}>
        <Grid item container justifyContent="space-between">
          <Typography component="h3" variant="subtitle1">
            Sign in to continue
          </Typography>
          <SignUpFormModal />
        </Grid>

        <Grid
          container
          item
          xs={12}
          component="form"
          onSubmit={onSubmitHandler}
          spacing={2}
        >
          <Grid item xs={12}>
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
            <Button
              type="submit"
              size="medium"
              variant="contained"
              disabled={isLoading}
              fullWidth
            >
              {isLoading ? <CircularProgress /> : "Sign in"}
            </Button>
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <Divider>or</Divider>
      </Grid>
    </Grid>
  );
};

export default LoginForm;
