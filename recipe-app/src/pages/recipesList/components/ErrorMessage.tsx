import { Alert } from "@mui/material";

export const ErrorMessage = () => {
  return (
    <Alert severity="error">
      {"Some error occured while fetching recipes..."}
    </Alert>
  );
};
