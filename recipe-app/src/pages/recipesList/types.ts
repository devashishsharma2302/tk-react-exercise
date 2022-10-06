export interface Ingredient {
  name: string;
}

export interface Recipe {
  name: string;
  description: string;
  id: number;
  ingredients: Ingredient[];
}
