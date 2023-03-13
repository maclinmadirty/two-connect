import React, { useState, ChangeEvent } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import {
  FieldConditional,
  FieldInput,
  ConditionalFieldType,
  FieldSelect,
} from "../../../models/field.model";
import InputBox from "../input-box/InputBox";
import SelectBox from "../select-box/SelectBox";

interface Props {
  field: FieldConditional;
  onConditionalChange: (field: FieldConditional) => void;
}

const ConditionalBox = ({ field, onConditionalChange }: Props) => {
  const handleSelectChange = (
    event: SelectChangeEvent<unknown>,
    fieldCopy: FieldConditional
  ) => {
    fieldCopy.value = event.target.value as ConditionalFieldType;
    onConditionalChange(fieldCopy);
  };

  const handleConditionalInputChange = (
    inputField: FieldInput,
    fieldCopy: FieldConditional
  ) => {
    fieldCopy.inputField = inputField;
    onConditionalChange(fieldCopy);
  };

  const handleConditionalSelectChange = (
    selectField: FieldSelect,
    fieldCopy: FieldConditional
  ) => {
    fieldCopy.selectField = selectField;
    onConditionalChange(fieldCopy);
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "column", maxWidth: "240px" }}
    >
      <FormControl
        style={{ marginRight: "8px", marginBottom: "8px", marginTop: "8px" }}
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
      {field.value === "input" ? (
        <InputBox
          field={field.inputField}
          onInputChange={(f) => handleConditionalInputChange(f, field)}
        />
      ) : field.value === "select" ? (
        <SelectBox
          field={field.selectField}
          onSelectChange={(f) => handleConditionalSelectChange(f, field)}
        />
      ) : null}
    </div>
  );
};

export default ConditionalBox;
