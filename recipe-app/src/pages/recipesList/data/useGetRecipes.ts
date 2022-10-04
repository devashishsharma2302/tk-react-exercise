import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";


const BASE_URL = 'http://localhost:8000/api/recipe'


interface Ingredient {
    name: string
}

interface Recipe {
    name: string,
    description: string,
    id: number,
    ingredients: Ingredient[]
}

interface UseGetRecipesApi {
    recipes: Recipe[],
    isLoading: boolean,
    error: AxiosError | boolean,
    loadRecipes: () => void
}

export const useGetRecipes = (): UseGetRecipesApi => {

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
        loadRecipes();
    }, [])

    return { recipes, isLoading, error, loadRecipes }

}