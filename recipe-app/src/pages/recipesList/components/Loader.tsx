import { CircularProgress, Grid } from "@mui/material";

export const Loader = () => {
  return (
    <Grid
      container
      justifyContent={"center"}
      alignItems="center"
      height={"100%"}
    >
      <CircularProgress />
    </Grid>
  );
};
