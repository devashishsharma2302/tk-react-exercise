import {
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  Grid,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { Recipe } from "../types";
import { EditRecipeModal } from "./EditRecipeModal";

type TProps = {
  recipes: Recipe[];
  loadRecipes: () => void;
};

const RecipeCard = styled(Card)({
  padding: "8px",
});

export const RecipesList = ({ recipes, loadRecipes }: TProps) => {
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [editableRecipe, setEditableRecipe] = useState({});

  const handleEditRecipe = (recipe: Recipe) => {
    setEditModalOpen(true);
    setEditableRecipe(recipe);
  };

  const compareRecipesForSort = (recipe1: Recipe, recipe2: Recipe) =>
    recipe1.id - recipe2.id;

  return (
    <>
      {recipes.sort(compareRecipesForSort).map((recipe) => (
        <Grid item xs={8}>
          <RecipeCard>
            <CardContent>
              <Typography variant="h5" component="div" marginBottom={"8px"}>
                {recipe.name}
              </Typography>

              <Typography
                color="text.secondary"
                component="div"
                marginBottom={"8px"}
              >
                {recipe.description}
              </Typography>

              {recipe.ingredients.length > 0 && (
                <>
                  <Typography
                    color={"text.secondary"}
                    fontWeight="bold"
                    marginBottom={"8px"}
                  >
                    {"Ingredients:"}
                  </Typography>
                  <Stack direction="row" spacing={1}>
                    {recipe.ingredients.map((ingredient) => (
                      <Chip label={ingredient.name} />
                    ))}
                  </Stack>
                </>
              )}
            </CardContent>
            <CardActions>
              <Button onClick={() => handleEditRecipe(recipe)}>{"Edit"}</Button>
            </CardActions>
          </RecipeCard>
        </Grid>
      ))}
      <EditRecipeModal
        recipe={editableRecipe}
        isOpen={isEditModalOpen}
        onClose={() => setEditModalOpen(false)}
        onSuccess={loadRecipes}
      />
    </>
  );
};
