import React, { ChangeEvent } from "react";
import clsx from "clsx";
import TextField from "@mui/material/TextField";
import { FieldInput } from "../../../models/field.model";

interface Props {
  field: FieldInput;
  onInputChange: (field: FieldInput) => void;
}

const Field = ({ field, onInputChange }: Props) => {
  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    fieldCopy: FieldInput
  ) => {
    fieldCopy.value = event.target.value;
    onInputChange(fieldCopy);
  };

  return (
    <TextField
      id={field.id}
      label={field.label}
      value={field.value}
      type={field.inputType}
      onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
        handleInputChange(event, field);
      }}
    />
  );
};

export default Field;
