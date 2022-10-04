import { useGetRecipes } from "./data";

export const RecipesList = () => {
    const { recipes, isLoading: getRecipesLoading, error: getRecipesError } = useGetRecipes();
    console.log(recipes)
    return (
        <div>{recipes.map(({ name, description }) => (
            <div>
                <span>{name}</span>
                <span>{description}</span>
            </div>
        ))}</div>
    )
};