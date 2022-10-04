import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { Recipe } from "../types";


const BASE_URL = 'http://localhost:8000/api/recipe'

export interface TGetRecipesApi {
    recipes: Recipe[],
    isLoading: boolean,
    error: AxiosError | boolean,
    loadRecipes: () => void
}


export const useGetRecipes = (): TGetRecipesApi => {

    const [isLoading, setLoading] = useState(false);
    const [recipes, setRecipes] = useState([]);
    const [error, setError] = useState(false);


    const loadRecipes = () => {
        setLoading(true);

        axios.get(`${BASE_URL}/recipes/`).then(({ data }) => {
            setRecipes(data);
        }).catch((err) => {
            setError(err);
        }).finally(() => { setLoading(false) });
    }

    useEffect(() => {
        console.log("asdsa")
        loadRecipes();
    }, [])

    return { recipes, isLoading, error, loadRecipes }

}