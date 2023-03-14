import React, { useState, useEffect } from "react";
import { startCase } from "lodash";

import {useSelector, useDispatch} from "react-redux"

import Button from "@mui/material/Button";

import InputBox from "../shared/input-box/InputBox";

import { ITemplate } from "../../models/template.model";
import { FieldInput } from "../../models/field.model";
import { setTemplate } from "../../features/template/templateSlice";

interface Props {
  templateState: ITemplate | null;
}

const Template = ({ templateState }: Props) => {
  const dispatch = useDispatch();
  // const [templateState, setTemplateState] = useState<ITemplate>({
  //   noOfForms: 0,
  //   noOfInputs: 0,
  //   noOfSelects: 0,
  //   noOfConditionals: 0,
  // });

  const handleInputChange = (field: FieldInput) => {
    if (templateState) {
      dispatch(setTemplate({
        ...templateState,
        [field.name]: +field.value
      }))
    };
  };

  const generateField = (key: string): FieldInput => {
    const label = startCase(key);
    const value = templateState ? templateState[key as keyof ITemplate] as number : 0;
    return new FieldInput(key, label, key, "number", value);
  };

  const handleSaveClick = () => {
    console.log(templateState);
    localStorage.setItem("template", JSON.stringify(templateState));
  };

  return (
    <>
      <div style={{ marginBottom: "8px" }}>
        {templateState && Object.keys(templateState).map((o: string) => (
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
