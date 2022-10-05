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
import { useRecipesApi } from "../data";
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
  const [isAddRecipeModalOpen, setAddRecipeModalOpen] = useState(false);
  const [editableRecipe, setEditableRecipe] = useState({});

  const { editRecipe, createRecipe, deleteRecipe } = useRecipesApi();

  const handleEditRecipe = (recipe: Recipe) => {
    setEditModalOpen(true);
    setEditableRecipe(recipe);
  };

  const handleDeleteRecipe = (id: number) => {
    deleteRecipe({ id }).then(() => {
      loadRecipes();
    });
  };

  const compareRecipesForSort = (recipe1: Recipe, recipe2: Recipe) =>
    recipe1.id - recipe2.id;

  return (
    <>
      <Grid item xs={8} textAlign="right">
        <Button onClick={() => setAddRecipeModalOpen(true)}>
          {"Add New Recipe"}
        </Button>
      </Grid>

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
              <Button
                color="error"
                onClick={() => handleDeleteRecipe(recipe.id)}
              >
                {"Delete"}
              </Button>
            </CardActions>
          </RecipeCard>
        </Grid>
      ))}
      {/* Reusing the same modal for edit and create */}
      <EditRecipeModal
        title={"Edit Recipe"}
        initialData={editableRecipe}
        isOpen={isEditModalOpen}
        onClose={() => setEditModalOpen(false)}
        onSuccess={(newRecipe) => {
          editRecipe({
            id: newRecipe.id,
            data: newRecipe,
          }).then(() => {
            loadRecipes();
            setEditModalOpen(false);
          });
        }}
      />
      <EditRecipeModal
        initialData={{}}
        title={"Add New Recipe"}
        isOpen={isAddRecipeModalOpen}
        onClose={() => setAddRecipeModalOpen(false)}
        onSuccess={(newRecipe) => {
          createRecipe({
            data: newRecipe,
          }).then(() => {
            loadRecipes();
            setAddRecipeModalOpen(false);
          });
        }}
      />
    </>
  );
};
