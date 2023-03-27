import { useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import {
  TextField,
  InputAdornment,
  IconButton,
  TextFieldProps,
} from "@mui/material";

type PasswordFieldProps = {
  id: string;
  label: string;
  name: string;
  variant: string;
} & TextFieldProps;

const PasswordField = ({
  id,
  label,
  name,
  variant = "outlined",
  ...attributes
}: PasswordFieldProps) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <TextField
      id={id}
      label={label}
      name={name}
      variant={variant}
      fullWidth
      type={isPasswordVisible ? "text" : "password"}
      {...attributes}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={togglePasswordVisibility}>
              {isPasswordVisible ? <VisibilityOffIcon /> : <VisibilityIcon />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default PasswordField;
