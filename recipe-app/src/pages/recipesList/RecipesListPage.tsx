import { Grid, Typography } from "@mui/material";
import { ErrorMessage, Loader, RecipesList } from "./components";
import { useGetRecipes } from "./data";

export const RecipesListPage = () => {
  const { recipes, isLoading, error, loadRecipes } = useGetRecipes();

  return (
    <Grid container direction="row" justifyContent="center" rowSpacing={2}>
      <Grid item xs={8}>
        <Typography fontWeight="bold" align="center" marginY="50px">
          {"Recipes App"}
        </Typography>
      </Grid>

      {isLoading && (
        <Grid item xs={8}>
          <Loader />
        </Grid>
      )}

      {error && (
        <Grid item xs={8}>
          <ErrorMessage />
        </Grid>
      )}

      {!isLoading && !error && (
        <RecipesList recipes={recipes} loadRecipes={loadRecipes} />
      )}
    </Grid>
  );
};
