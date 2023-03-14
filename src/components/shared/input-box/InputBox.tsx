import React, { ChangeEvent } from "react";
import clsx from "clsx";
import TextField from "@mui/material/TextField";
import { FieldInput } from "../../../models/field.model";
import withResize from "../../hoc/withResize";

interface Props {
  field: FieldInput;
  windowInnerWidth: number;
  onInputChange: (field: FieldInput) => void;
}

const InputBox = ({ field, windowInnerWidth, onInputChange }: Props) => {
  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    fieldCopy: FieldInput
  ) => {
    fieldCopy.value = event.target.value;
    onInputChange(fieldCopy);
  };

  return (
    <TextField
      style={{ marginRight: "8px" }}
      id={field.id}
      size={windowInnerWidth < 1025 ? "small" : "medium"}
      label={field.label}
      value={field.value}
      type={field.inputType}
      onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
        handleInputChange(event, field);
      }}
    />
  );
};

export default withResize(InputBox);
