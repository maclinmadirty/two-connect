import React, { useState, useEffect } from "react";

import {useSelector, useDispatch} from "react-redux"

import Form from "../../components/form/Form";
import Template from "../../components/template/Template";
import { setTemplate } from "../../features/template/templateSlice";
import { FormField } from "../../models/field.model";
import { ITemplate } from "../../models/template.model";
import { RootState } from "../../store/store";

// interface Props {
//   field: FieldInput;
//   onInputChange: (value: string | number) => void;
// }

const Main = () => {
  const dispatch = useDispatch();

  const {template} = useSelector((state: RootState) => ({
    template: state.template.template
  }))

  const [formLocal, setFormLocal] = useState<FormField[]>([]);

  useEffect(() => {
    const localTemplate = localStorage.getItem("template");
    const localForm = localStorage.getItem("form");
    if (localTemplate) {
      // setTemplateState(JSON.parse(localTemplate));
      dispatch(setTemplate(JSON.parse(localTemplate) as ITemplate));
    }

    if (localForm) {
      setFormLocal(JSON.parse(localForm));
    }
  }, [dispatch]);

  const handleSaveTemplate = () => {
    localStorage.setItem("template", JSON.stringify(template));
  };

  return (
    <>
      <Template
      templateState={template} handleSaveTemplate={handleSaveTemplate}
      />
      <Form templateState={template} formLocal={formLocal}  handleSaveTemplate={handleSaveTemplate}/>
    </>
  );
};

export default Main;
