import { useState, useCallback, ReactElement, FormEvent } from "react";
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
  ctaText: string;
  onSubmitHandler: (e: FormEvent<HTMLFormElement>) => void | Promise<void>;
};

const ModalForm = ({
  title,
  children,
  ctaText,
  onSubmitHandler,
}: ModalProps) => {
  // STATE SETUP
  const [open, setOpen] = useState(false);

  // MODAL HANDLERS
  const handleClickOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <Box>
      <Button variant="text" onClick={handleClickOpen}>
        {ctaText}
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <Box component="form" onSubmit={onSubmitHandler}>
          {title ? <DialogTitle>{title}</DialogTitle> : ""}
          <DialogContent>{children}</DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit">Subscribe</Button>
          </DialogActions>
        </Box>
      </Dialog>
    </Box>
  );
};

export default ModalForm;
