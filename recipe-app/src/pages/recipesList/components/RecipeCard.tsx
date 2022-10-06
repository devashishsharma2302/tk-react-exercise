import {
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import { Recipe } from "../types";

type TProps = {
  recipe: Recipe;
  handleEditRecipe: (recipe: Recipe) => void;
  handleDeleteRecipe: (id: number) => void;
};

const CardContainer = styled(Card)({
  padding: "8px",
});

export const RecipeCard = ({
  recipe,
  handleEditRecipe,
  handleDeleteRecipe,
}: TProps) => {
  return (
    <CardContainer data-testid="recipe-card">
      <CardContent>
        <Typography variant="h5" component="div" marginBottom={"8px"}>
          {recipe.name}
        </Typography>

        <Typography color="text.secondary" component="div" marginBottom={"8px"}>
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
              {recipe.ingredients.map((ingredient, index) => (
                <Chip
                  key={`${ingredient.name}_${index}`}
                  label={ingredient.name}
                />
              ))}
            </Stack>
          </>
        )}
      </CardContent>
      <CardActions>
        <Button onClick={() => handleEditRecipe(recipe)}>{"Edit"}</Button>
        <Button color="error" onClick={() => handleDeleteRecipe(recipe.id)}>
          {"Delete"}
        </Button>
      </CardActions>
    </CardContainer>
  );
};
