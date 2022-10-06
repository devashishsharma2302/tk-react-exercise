import { Form, Field } from "react-final-form";
import { Button, Grid, Modal, Paper, styled, Typography } from "@mui/material";
import { EditIngredientsField } from "./EditIngredientsField";
import { Recipe } from "../../types";

type TProps = {
  title: string;
  initialData: Recipe | {};
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (newRecipe: Recipe) => void;
};

const ModalContent = styled(Paper)({
  position: "absolute",
  width: "600px",
  height: "50%",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  margin: "auto",
  textAlign: "center",
  padding: "15px",
});

const SaveButton = styled(Button)({
  position: "absolute",
  bottom: "20px",
  right: "40px",
});

export const EditRecipeModal = ({
  initialData,
  isOpen,
  onClose,
  onSuccess,
  title,
}: TProps) => {
  return (
    <Modal open={isOpen} onClose={onClose}>
      <ModalContent>
        <Typography variant="h4" marginBottom={"20px"}>
          {title}
        </Typography>

        <Form
          initialValues={initialData}
          onSubmit={(newValues) => {
            onSuccess(newValues as Recipe);
          }}
        >
          {({ handleSubmit }) => (
            <>
              <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems={"center"}
                spacing={2}
              >
                <Grid
                  item
                  container
                  direction="row"
                  xs={12}
                  justifyContent="center"
                >
                  <Grid item xs={3}>
                    <Typography align="left">{"Recipe Name: "}</Typography>
                  </Grid>
                  <Grid item xs={6} textAlign="left">
                    <Field
                      name={"name"}
                      component="input"
                      placeholder="Recipe Name"
                    />
                  </Grid>
                </Grid>

                <Grid
                  item
                  container
                  direction="row"
                  xs={12}
                  justifyContent="center"
                >
                  <Grid item xs={3}>
                    <Typography align="left">{"Description: "}</Typography>
                  </Grid>
                  <Grid item xs={6} textAlign="left">
                    <Field
                      name={"description"}
                      component="textarea"
                      placeholder="Description of the recipe"
                    />
                  </Grid>
                </Grid>
                <Grid
                  item
                  container
                  direction="row"
                  xs={12}
                  justifyContent="center"
                >
                  <EditIngredientsField />
                </Grid>
              </Grid>

              <SaveButton variant="contained" onClick={() => handleSubmit()}>
                {"Save"}
              </SaveButton>
            </>
          )}
        </Form>
      </ModalContent>
    </Modal>
  );
};
