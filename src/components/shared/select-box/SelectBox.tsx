import React, { ChangeEvent } from "react";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { FieldSelect } from "../../../models/field.model";

import withResize from "../../hoc/withResize";

interface Props {
  field: FieldSelect;
  windowInnerWidth: number;
  onSelectChange: (field: FieldSelect) => void;
}

const SelectBox = ({ field, windowInnerWidth, onSelectChange }: Props) => {
  const handleSelectChange = (
    event: SelectChangeEvent<unknown>,
    fieldCopy: FieldSelect
  ) => {
    fieldCopy.value = event.target.value as string | number;
    onSelectChange(fieldCopy);
  };

  return (
    <FormControl
      style={{ marginRight: "8px" }}
      size={windowInnerWidth < 1025 ? "small" : "medium"}
    >
      <InputLabel id={`${field.id}-label`}>{field.label}</InputLabel>
      <Select
        labelId={`${field.id}-label`}
        id={field.id}
        value={field.value}
        label={field.label}
        onChange={(event) => handleSelectChange(event, field)}
      >
        {field.options.map((option) => (
          <MenuItem key={option.id} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default withResize(SelectBox);
