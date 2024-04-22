import TextField, { TextFieldProps } from "@mui/material/TextField";
import { IconButton, InputAdornment } from "@mui/material";
import { useState } from "react";
import EyeOffIcon from "@/icons/closeEye";
import EyeIcon from "@/icons/openEye";
interface CustomInputProps extends Omit<TextFieldProps, "onChange" | "onBlur" | "value"> {
  label?: string;
  placeholder?: string;
  type?: string;
  name?: string;
  value?: any;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  error?: boolean;
  required?: boolean;
  helperText?: string;
  multiline?: boolean;
}

const CustomInput: React.FC<CustomInputProps> = ({
  label,
  placeholder,
  type,
  name,
  value,
  onChange,
  onBlur,
  error,
  helperText,
  multiline,
  required,
}) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleClickShowPassword = (): void => {
    setShowPassword(!showPassword);
  };
  return (
    <TextField
      inputProps={{ style: { fontSize: 15 } }}
      InputLabelProps={{ style: { fontSize: 15 } }}
      required={required}
      label={label}
      placeholder={placeholder}
      type={showPassword ? "text" : type}
      name={name}
      variant="outlined"
      fullWidth
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      error={error}
      helperText={helperText}
      multiline={multiline}
      InputProps={
        type === "password" ? 
          {
            endAdornment: (
              <InputAdornment position="end">
                <IconButton edge="end" onClick={handleClickShowPassword}>
                {showPassword ? <EyeIcon /> : <EyeOffIcon />}
                </IconButton>
              </InputAdornment>
            )
          } 
          : undefined
      }
      
    />
  );
};

export default CustomInput;
