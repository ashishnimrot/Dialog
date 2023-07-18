import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  TextField,
  Grid
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { useMutation } from "react-query";
import { DialogTitleStyled, ButtonStyled } from "./ConnectionDialog.styles";
import {
  ConnectionPayload,
  ConnectionResponse,
  saveConnection
} from "./ConnectionDialog.util";
import { ConnectionForm } from "./ConnectionDialog.types";

export const ConnectionDialog = () => {
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<ConnectionForm>();
  const mutation = useMutation<ConnectionResponse, Error, ConnectionPayload>(
    saveConnection
  );

  const onSubmit = (data: ConnectionForm) => {
    mutation.mutate({ connection: data });
  };

  return (
    <Dialog open={true}>
      <DialogTitleStyled>Connection Name</DialogTitleStyled>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container gap={2}>
            <Controller
              name="name"
              control={control}
              rules={{ required: "Name is required" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  error={Boolean(errors.name)}
                  helperText={errors.name?.message}
                  label="Connection Name"
                  fullWidth
                />
              )}
            />
            <Controller
              name="description"
              control={control}
              rules={{ required: "Description is required" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  error={Boolean(errors.description)}
                  helperText={errors.description?.message}
                  label="Connection Description"
                  multiline
                  fullWidth
                />
              )}
            />
          </Grid>
          <DialogActions>
            <ButtonStyled type="submit">Connect</ButtonStyled>
            <ButtonStyled>Cancel</ButtonStyled>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};
