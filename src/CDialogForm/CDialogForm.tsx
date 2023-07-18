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
import { DialogTitleStyled, ButtonStyled } from "./CDialog.styles";
import { CFieldProps } from "./CDialog.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

interface CDialogFormProps<T> {
  config: CFieldProps[];
  tObject: T;
  open: boolean;
  close: () => void;
  schema: z.ZodSchema<T>; // add this line
  saveTObject: (tObject: T) => Promise<void>; // Modify this to return Promise
}

export function CDialogForm<T>({
  config,
  tObject,
  open,
  close,
  saveTObject,
  schema
}: CDialogFormProps<T>) {
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<T>({
    defaultValues: tObject,
    mode: "onBlur",
    resolver: zodResolver(schema)
  });

  const mutation = useMutation(saveTObject, {
    onSuccess: () => {
      // Close the dialog box or show a success message
      close();
    },
    onError: (error) => {
      // Handle error
      console.log(error);
    }
  });

  const onSubmit = (data: T) => {
    mutation.mutate(data);
  };

  return (
    <Dialog open={open} onClose={close}>
      <DialogTitleStyled>Connection Name</DialogTitleStyled>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container gap={2}>
            {config.map(({ field, isRequired, label, helperText }) => (
              <Controller
                key={field}
                name={field as keyof T}
                control={control}
                rules={{ required: isRequired ? "Required" : undefined }}
                render={({ field: fieldProps }) => (
                  <TextField
                    {...fieldProps}
                    error={Boolean(errors[field])}
                    helperText={errors[field]?.message || helperText}
                    label={label}
                    fullWidth
                  />
                )}
              />
            ))}
          </Grid>
          <DialogActions>
            <ButtonStyled type="submit" disabled={mutation.isLoading}>
              {mutation.isLoading ? "Saving..." : "Connect"}
            </ButtonStyled>
            <ButtonStyled onClick={close}>Cancel</ButtonStyled>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
}
