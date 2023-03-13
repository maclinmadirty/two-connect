import React, { useState, useEffect } from "react";
import { startCase } from "lodash";

import Button from "@mui/material/Button";

import InputBox from "../shared/input-box/InputBox";

import { ITemplate } from "../../models/template.model";
import { FieldInput } from "../../models/field.model";

interface Props {
  templateState: ITemplate;
  setTemplateState: React.Dispatch<React.SetStateAction<ITemplate>>;
}

const Template = ({ templateState, setTemplateState }: Props) => {
  // const [templateState, setTemplateState] = useState<ITemplate>({
  //   noOfForms: 0,
  //   noOfInputs: 0,
  //   noOfSelects: 0,
  //   noOfConditionals: 0,
  // });

  const handleInputChange = (field: FieldInput) => {
    setTemplateState((prevState) => {
      return {
        ...prevState,
        [field.name]: +field.value,
      };
    });
  };

  const generateField = (key: string): FieldInput => {
    const label = startCase(key);
    const value = templateState[key as keyof ITemplate] as number;
    return new FieldInput(key, label, key, "number", value);
  };

  const handleSaveClick = () => {
    localStorage.setItem("template", JSON.stringify(templateState));
  };

  return (
    <>
      <div style={{ marginBottom: "8px" }}>
        {Object.keys(templateState).map((o: string) => (
          <InputBox
            key={o}
            field={generateField(o)}
            onInputChange={handleInputChange}
          />
        ))}
      </div>
      <div>
        <Button variant="contained" onClick={handleSaveClick}>
          Save Template
        </Button>
      </div>
    </>
  );
};

export default Template;
