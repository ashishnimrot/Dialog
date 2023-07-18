import React, { useState } from "react";
import { CDialogForm, CFieldProps } from "./CDialogForm/CDialogForm";
import { z } from "zod";

interface MyForm {
  name: string;
  description: string;
}

const initialForm: MyForm = {
  name: "",
  description: ""
};

export const schema = z.object({
  name: z.string().nonempty({ message: "Name is required" }),
  email: z.string().email({ message: "Invalid email format" }),
  description: z.string().nonempty({ message: "Description is required" })
});

const App = () => {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(initialForm);

  const config: CFieldProps[] = [
    {
      field: "name",
      label: "Name",
      description: "Enter your name"
    },
    {
      field: "email",
      label: "Email",
      description: "Enter your email"
    },
    {
      field: "description",
      label: "Description",
      description: "Enter a description"
    }
  ];

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = (newForm: MyForm) => {
    console.log({ newForm });
    setForm(newForm);
    setOpen(false);
  };

  return (
    <div>
      <button onClick={() => setOpen(true)}>Open Dialog</button>
      <CDialogForm<MyForm>
        config={config}
        tObject={form}
        open={open}
        close={handleClose}
        saveTObject={handleSave}
        schema={schema}
      />
    </div>
  );
};

export default App;
