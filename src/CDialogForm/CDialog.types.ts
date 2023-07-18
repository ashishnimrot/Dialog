import { ReactElement } from "react";

export interface IData {
  // Define your structure here
}

export type ShowErrorFunc = (field: string) => string | undefined;

export interface CFieldProps {
  field: string;
  isRequired?: boolean;
  options?: any[] | IData[];
  label: string;
  description: string | ReactElement;
  helperText?: any;
  showError?: ShowErrorFunc;
  disabled?: boolean;
}

export interface CDialogFormProps<T> {
  config: CFieldProps[];
  tObject: T;
  open: boolean;
  close: () => void;
  saveTObject: (tObject: T) => void;
}
