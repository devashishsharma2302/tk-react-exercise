import { act, render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BASE_URL } from "./constants";
import { RecipesListPage } from "./RecipesListPage";
const axios = require("axios");

const dummyRecipes = [
  {
    id: 1,
    name: "TestRecipe_1",
    description: "Some description",
    ingredients: [{ name: "TestIngredient_1" }, { name: "TestIngredient_2" }],
  },
  {
    id: 2,
    name: "TestRecipe_2",
    description: "Some description",
    ingredients: [{ name: "TestIngredient_3" }, { name: "TestIngredient_4" }],
  },
  {
    id: 3,
    name: "TestRecipe_3",
    description: "Some description",
    ingredients: [],
  },
];

jest.mock("axios");

describe("Test Recipes List Page", () => {
  beforeEach(() => {
    // Mock axios get
    axios.get.mockImplementation(() => {
      return Promise.resolve({ data: dummyRecipes });
    });
    axios.delete.mockImplementation(() => {
      return Promise.resolve({});
    });
  });

  it("should render recipes list page and display the dummy recipes", async () => {
    render(<RecipesListPage />);
    const recipeCards = await screen.findAllByTestId("recipe-card");
    expect(recipeCards).toHaveLength(3);
  });

  it("should display recipes in order by ids", async () => {
    render(<RecipesListPage />);
    const recipeCards = await screen.findAllByTestId("recipe-card");

    recipeCards.forEach((recipe, index) => {
      expect(recipe).toHaveTextContent(`TestRecipe_${index + 1}`);
    });
  });

  it("should call delete api on clicking delete on recipe card", async () => {
    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      render(<RecipesListPage />);
    });
    const recipeCard = screen.getByTestId("1");
    expect(recipeCard).toBeInTheDocument();
    const deleteButton = recipeCard && within(recipeCard).getByText(/Delete/);

    await act(async () => {
        deleteButton && userEvent.click(deleteButton);
    })

    expect(axios.delete).toBeCalledTimes(1);

    expect(axios.delete).toBeCalledWith(`${BASE_URL}/recipes/1/`);

    expect(axios.get).toBeCalledTimes(2);
  });
});
