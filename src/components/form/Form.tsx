import React, { useState, useEffect, ChangeEvent, useMemo } from "react";
import { isEqual, cloneDeep } from "lodash";

import Button from "@mui/material/Button";

import InputBox from "../shared/input-box/InputBox";

import { ITemplate, TemplateFieldsOnly } from "../../models/template.model";
import {
  ConditionalFieldType,
  FieldConditional,
  FieldInput,
  FieldOption,
  FieldSelect,
  FormField,
} from "../../models/field.model";
import SelectBox from "../shared/select-box/SelectBox";
import ConditionalBox from "../shared/conditional-box/ConditionalBox";

interface Props {
  templateState: ITemplate;
  formLocal: FormField[];
}

const Form = ({ templateState, formLocal }: Props) => {
  // const [templateState, setTemplateState] = useState<ITemplate>(
  //   JSON.parse(localStorage.getItem("template") || "")
  // );
  const [formFields, setFormFields] = useState<FormField[]>([]);

  useEffect(() => {
    const noOfForms = templateState.noOfForms;
    const fieldsOnlyTemplate = { ...templateState };
    delete fieldsOnlyTemplate.noOfForms;

    if (noOfForms && noOfForms > 0) {
      let arr = new Array(noOfForms).fill("").map((_, i) => {
        const formId = `form-${i + 1}` as string;
        const formName = `Form ${i + 1}` as string;
        const newForm = new FormField(formId, formName);
        const inputFields = new Array(templateState.noOfInputs)
          .fill("")
          .map((_, i) => {
            const id = `${formId}-input-${i + 1}` as string;
            const label = `Input ${i + 1}` as string;
            return new FieldInput(id, label, id, "text", "");
          });
        const selectFields = new Array(templateState.noOfSelects)
          .fill("")
          .map((_, i) => {
            const id = `${formId}-select-${i + 1}` as string;
            const label = `Select ${i + 1}` as string;
            const options: FieldOption[] = [
              { id: `${id}-option-1`, label: "Option 1", value: "1" },
              { id: `${id}-option-2`, label: "Option 2", value: "2" },
            ];
            return new FieldSelect(id, label, id, options[0].value, options);
          });
        const conditionalFields = new Array(templateState.noOfConditionals)
          .fill("")
          .map((_, i) => {
            const id = `${formId}-conditional-${i + 1}` as string;
            const label = `Conditional ${i + 1}` as string;
            const options = [
              { id: `${id}-option-1`, label: "Input", value: "input" },
              { id: `${id}-option-2`, label: "Select", value: "select" },
              { id: `${id}-option-3`, label: "None", value: "none" },
            ];
            const inputId = `${id}-input` as string;
            const inputLabel = `${label} Input` as string;
            const conditionalInputField = new FieldInput(
              inputId,
              inputLabel,
              inputId,
              "text",
              ""
            );
            const selectId = `${id}-select` as string;
            const selectLabel = `${label} Select` as string;
            const conditionalSelectOptions: FieldOption[] = [
              { id: `${selectId}-option-1`, label: "Option 1", value: "1" },
              { id: `${selectId}-option-2`, label: "Option 2", value: "2" },
            ];

            const conditionalSelectField = new FieldSelect(
              selectId,
              selectLabel,
              selectId,
              conditionalSelectOptions[0].value,
              conditionalSelectOptions
            );
            return new FieldConditional(
              id,
              label,
              id,
              options[0].value as ConditionalFieldType,
              options,
              conditionalInputField,
              conditionalSelectField
            );
          });

        newForm.addInputFields(inputFields);
        newForm.addSelectFields(selectFields);
        newForm.addConditionalFields(conditionalFields);

        return newForm;
      });
      if (arr && arr.length > 0) {
        setFormFields(arr);
      } else {
        setFormFields([]);
      }
    }
  }, [templateState]);

  useEffect(() => {
    if (formLocal && formLocal.length > 0) {
      setFormFields(formLocal);
    } else {
      setFormFields([]);
    }
  }, [formLocal]);

  const formMemo = useMemo(() => {
    const handleInputChange = (field: FieldInput, form: FormField) => {
      const formFieldsCopy = cloneDeep(formFields);
      const formToChange = formFieldsCopy.find((f) => f.formId === form.formId);
      const inputFields = formToChange?.inputFields;
      if (inputFields) {
        const fIndex = inputFields?.findIndex((iF) => iF.id === field.id);
        if (fIndex !== -1) {
          inputFields[fIndex] = field;
        }
      }
      setFormFields(formFieldsCopy);
    };

    const handleSelectChange = (field: FieldSelect, form: FormField) => {
      const formFieldsCopy = cloneDeep(formFields);
      const formToChange = formFieldsCopy.find((f) => f.formId === form.formId);
      const selectFields = formToChange?.selectFields;
      if (selectFields) {
        const fIndex = selectFields?.findIndex((iF) => iF.id === field.id);
        if (fIndex !== -1) {
          selectFields[fIndex] = field;
        }
      }
      setFormFields(formFieldsCopy);
    };

    const handleConditionalChange = (
      field: FieldConditional,
      form: FormField
    ) => {
      const formFieldsCopy = cloneDeep(formFields);
      const formToChange = formFieldsCopy.find((f) => f.formId === form.formId);
      const conditionalFields = formToChange?.conditionalFields;
      if (conditionalFields) {
        const fIndex = conditionalFields?.findIndex((iF) => iF.id === field.id);
        if (fIndex !== -1) {
          conditionalFields[fIndex] = field;
        }
      }
      setFormFields(formFieldsCopy);
    };

    return (
      formFields &&
      formFields.length > 0 &&
      formFields.map((form) => (
        <div key={form.formId} style={{ margin: "8px 0" }}>
          {form.formName}
          <div style={{ margin: "16px 0" }}>
            {form.inputFields &&
              form.inputFields.length > 0 &&
              form.inputFields.map((input) => (
                <InputBox
                  key={input.id}
                  field={input}
                  onInputChange={(f) => handleInputChange(f, form)}
                />
              ))}
          </div>
          <div style={{ margin: "16px 0" }}>
            {form.selectFields &&
              form.selectFields.length > 0 &&
              form.selectFields.map((select) => (
                <SelectBox
                  key={select.id}
                  field={select}
                  onSelectChange={(f) => handleSelectChange(f, form)}
                />
              ))}
          </div>
          <div style={{ margin: "16px 0" }}>
            {form.conditionalFields &&
              form.conditionalFields.length > 0 &&
              form.conditionalFields.map((select) => (
                <ConditionalBox
                  key={select.id}
                  field={select}
                  onConditionalChange={(f) => handleConditionalChange(f, form)}
                />
              ))}
          </div>
        </div>
      ))
    );
  }, [formFields]);

  const handleSaveClick = () => {
    localStorage.setItem("form", JSON.stringify(formFields));
  };

  return (
    <>
      <div>{formMemo}</div>
      {formFields && formFields.length > 0 && (
        <div>
          <Button variant="contained" onClick={handleSaveClick}>
            Save Form
          </Button>
        </div>
      )}
    </>
  );
};

export default Form;
