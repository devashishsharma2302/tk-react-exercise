import { Button, Grid } from "@mui/material";
import { useState } from "react";
import { useRecipesApi } from "../data";
import { Recipe } from "../types";
import { EditRecipeModal } from "./EditRecipeModal";
import { RecipeCard } from "./RecipeCard";

type TProps = {
  recipes: Recipe[];
  loadRecipes: () => void;
};

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
        <Grid item xs={8} data-testid={recipe.id} key={recipe.id}>
          <RecipeCard
            recipe={recipe}
            handleDeleteRecipe={handleDeleteRecipe}
            handleEditRecipe={handleEditRecipe}
          />
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
