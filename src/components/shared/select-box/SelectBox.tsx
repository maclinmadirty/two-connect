import React, { ChangeEvent } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { FieldSelect } from "../../../models/field.model";

interface Props {
  field: FieldSelect;
  onSelectChange: (field: FieldSelect) => void;
}

const SelectBox = ({ field, onSelectChange }: Props) => {
  const handleSelectChange = (
    event: SelectChangeEvent<unknown>,
    fieldCopy: FieldSelect
  ) => {
    fieldCopy.value = event.target.value as string | number;
    onSelectChange(fieldCopy);
  };

  return (
    <FormControl style={{ marginRight: "8px" }}>
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

export default SelectBox;
