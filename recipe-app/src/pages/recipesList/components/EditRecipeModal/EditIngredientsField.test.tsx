import React from "react";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { EditRecipeModal } from "./EditRecipeModal";

describe("Test Ingredients edit functions", () => {
  it("should delete ingredient at specified index", () => {
    render(
      <EditRecipeModal
        initialData={{
          id: 1,
          name: "TestRecipe_1",
          description: "Some description",
          ingredients: [
            { name: "TestIngredient_1" },
            { name: "TestIngredient_2" },
          ],
        }}
        title={"Edit Recipe"}
        isOpen={true}
        onClose={() => {}}
        onSuccess={() => {}}
      />
    );
    const ingredientChip = screen.getByTestId("TestIngredient_1_0");
    expect(ingredientChip).toBeInTheDocument();
    
    // eslint-disable-next-line testing-library/no-node-access
    const deleteButton = ingredientChip.querySelector(".MuiChip-deleteIcon");

    deleteButton && userEvent.click(deleteButton);

    expect(ingredientChip).not.toBeInTheDocument();
  });
});
