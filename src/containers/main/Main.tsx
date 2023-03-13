import React, { useState, useEffect } from "react";
import Form from "../../components/form/Form";
import Template from "../../components/template/Template";
import { FormField } from "../../models/field.model";
import { ITemplate } from "../../models/template.model";

// interface Props {
//   field: FieldInput;
//   onInputChange: (value: string | number) => void;
// }

const Main = () => {
  const [templateState, setTemplateState] = useState<ITemplate>({
    noOfForms: 0,
    noOfInputs: 0,
    noOfSelects: 0,
    noOfConditionals: 0,
  });

  const [formLocal, setFormLocal] = useState<FormField[]>([]);

  useEffect(() => {
    const localTemplate = localStorage.getItem("template");
    const localForm = localStorage.getItem("form");
    if (localTemplate) {
      setTemplateState(JSON.parse(localTemplate));
    }

    if (localForm) {
      setFormLocal(JSON.parse(localForm));
    }
  }, []);

  return (
    <>
      <Template
        templateState={templateState}
        setTemplateState={setTemplateState}
      />
      <Form templateState={templateState} formLocal={formLocal} />
    </>
  );
};

export default Main;
