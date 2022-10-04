import { Ingredient } from "../types";
import { useField } from "react-final-form";
import { Chip, Grid, Typography } from "@mui/material";
import { useState } from "react";

export const EditIngredientsField = () => {
  const ingredientsField = useField<Ingredient[]>("ingredients");

  const ingredients = ingredientsField.input.value || [];

  const handleDelete = (index: number) => {
    ingredientsField.input.onChange([
      ...ingredients.slice(0, index),
      ...ingredients.slice(index + 1),
    ]);
  };

  const handleIngredientAdd = () => {
    newIngredientName &&
      ingredientsField.input.onChange([
        ...ingredients,
        { name: newIngredientName },
      ]);
    setNewIngredientName("");
  };

  const [newIngredientName, setNewIngredientName] = useState("");

  return (
    <>
      <Grid item xs={3}>
        <Typography align="left">{"Ingredients: "}</Typography>
      </Grid>
      <Grid item xs={6} textAlign="left">
        {ingredients.map((ingredient, index) => (
          <Chip
            label={ingredient.name}
            onDelete={() => {
              handleDelete(index);
            }}
          />
        ))}
        <input
          value={newIngredientName}
          onChange={(e) => {
            setNewIngredientName(e.target.value);
          }}
        ></input>
        <button onClick={handleIngredientAdd}>{"Add"}</button>
      </Grid>
    </>
  );
};
