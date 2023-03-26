import { useState, ReactElement, FormEvent, useCallback } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Box,
} from "@mui/material";

type ModalProps = {
  title: string;
  children: ReactElement;
};

const SignUpFormModal = ({ title, children }: ModalProps) => {
  // STATE SETUP
  const [open, setOpen] = useState(false);

  // MODAL HANDLERS
  const handleClickOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  // FORM HANDLERS
  const onSubmitHandler = useCallback((e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // type SignUpFormData = {
    //   firstName: HTMLFormElement,
    //   lastName: HTMLFormElement,
    //   email: HTMLFormElement,
    //   password: HTMLFormElement,
    //   confirmPassword: HTMLFormElement
    // }

    // const {
    //   firstName,
    //   lastName,
    //   email,
    //   password,
    //   confirmPassword
    // } = e.target as typeof e.target & SignUpFormData;

    // if (isPasswordMatching(password.value, confirmPassword.value)) {

    // };
  }, []);

  // FORM VALIDATION
  // const isPasswordMatching = (pass1: string, pass2: string): boolean => {
  //   return pass1 === pass2;
  // }

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Open form dialog
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <Box component="form" onSubmit={onSubmitHandler}>
          <DialogTitle>{title}</DialogTitle>
          <DialogContent>{children}</DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit">Subscribe</Button>
          </DialogActions>
        </Box>
      </Dialog>
    </div>
  );
};

export default SignUpFormModal;
