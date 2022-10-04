import { Card, CardContent, Chip, Grid, Stack, styled, Typography } from "@mui/material";
import { Recipe } from "../types";


type TProps = {
    recipes: Recipe[]
}

const RecipeCard = styled(Card)({
    padding: '8px',
})

export const RecipesList = ({ recipes }: TProps) => {
    return (
        <>
            {recipes.map(({ name, description, ingredients }) => (
                <Grid item xs={8}>
                    <RecipeCard>
                        <CardContent>
                            <Typography variant="h5" component="div" marginBottom={'8px'}>
                                {name}
                            </Typography>

                            <Typography color='text.secondary' component="div" marginBottom={'8px'}>
                                {description}
                            </Typography>

                            {ingredients.length > 0 &&
                                <>
                                    <Typography color={'text.secondary'} fontWeight='bold' marginBottom={'8px'}>{'Ingredients:'}</Typography>
                                    <Stack direction="row" spacing={1}>
                                        {ingredients.map(ingredient => (
                                            <Chip label={ingredient.name} />
                                        ))}
                                    </Stack>
                                </>
                            }

                        </CardContent>
                    </RecipeCard>
                </Grid>
            ))}
        </>
    )
}
