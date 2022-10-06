import axios, { AxiosError, AxiosPromise } from "axios";
import { useState } from "react";
import { BASE_URL } from "../constants";
import { Recipe } from "../types";

type TEditRecipeProps = {
  id: number;
  data: Recipe;
};

type TCreateRecipeProps = {
  data: Recipe;
};

type TDeleteRecipeProps = {
  id: number;
};

type TRecipesApi = {
  recipes: Recipe[];
  isLoading: boolean;
  error: AxiosError | boolean;
  loadRecipes: () => void;
  createRecipe: (arg0: TCreateRecipeProps) => AxiosPromise;
  editRecipe: (arg0: TEditRecipeProps) => AxiosPromise;
  deleteRecipe: (arg0: TDeleteRecipeProps) => AxiosPromise;
};

export const useRecipesApi = (): TRecipesApi => {
  const [isLoading, setLoading] = useState(false);
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState(false);

  const loadRecipes = () => {
    setLoading(true);

    axios
      .get(`${BASE_URL}/recipes/`)
      .then(({ data }) => {
        setRecipes(data);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const editRecipe = ({ id, data }: TEditRecipeProps) => {
    return axios.patch(`${BASE_URL}/recipes/${id}/`, data);
  };

  const createRecipe = ({ data }: TCreateRecipeProps) => {
    return axios.post(`${BASE_URL}/recipes/`, data);
  };

  const deleteRecipe = ({ id }: TDeleteRecipeProps) => {
    return axios.delete(`${BASE_URL}/recipes/${id}/`);
  };

  return {
    recipes,
    isLoading,
    error,
    loadRecipes,
    editRecipe,
    createRecipe,
    deleteRecipe,
  };
};
