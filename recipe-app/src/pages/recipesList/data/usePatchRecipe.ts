import axios, { AxiosPromise } from "axios";
import { BASE_URL } from "../constants";
import { Recipe } from "../types";

type TEditRecipeProps = {
  id: number;
  data: Recipe;
};
export interface TPatchRecipesApi {
  editRecipe: (arg0: TEditRecipeProps) => AxiosPromise;
}

export const usePatchRecipe = (): TPatchRecipesApi => {

  const editRecipe = ({ id, data }: TEditRecipeProps) => {
    return axios
      .patch(`${BASE_URL}/recipes/${id}/`, data)
  };

  return { editRecipe };
};
