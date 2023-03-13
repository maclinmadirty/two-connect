export interface ITemplate {
  noOfForms?: number;
  noOfInputs: number;
  noOfSelects: number;
  noOfConditionals: number;
}

export type TemplateFieldsOnly = Omit<ITemplate, "noOfForms">;
