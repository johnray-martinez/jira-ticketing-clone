import { useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import {
  TextField,
  InputAdornment,
  IconButton,
  StandardTextFieldProps,
} from "@mui/material";

interface PasswordFieldProps extends StandardTextFieldProps {
  id: string;
  label: string;
  name: string;
}

const PasswordField = ({
  id,
  label,
  name,
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
      variant="standard"
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
