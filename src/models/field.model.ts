export class FormField {
  inputFields: FieldInput[] = [];
  selectFields: FieldSelect[] = [];
  conditionalFields: FieldConditional[] = [];
  constructor(public formId: string, public formName: string) {}
  addInputFields = (fields: FieldInput[]): void => {
    this.inputFields = fields;
  };
  addSelectFields = (fields: FieldSelect[]): void => {
    this.selectFields = fields;
  };
  addConditionalFields = (fields: FieldConditional[]): void => {
    this.conditionalFields = fields;
  };
}

class Field {
  public type: FieldType = "input";
  constructor(
    public id: string,
    public label: string,
    public name: string,
    public value: string | number
  ) {}
}

export class FieldInput extends Field {
  public type: FieldType = "input";
  constructor(
    public id: string,
    public label: string,
    public name: string,
    public inputType: InputType,
    public value: string | number
  ) {
    super(id, label, name, value);
  }
}

export class FieldSelect extends Field {
  public type: FieldType = "select";
  constructor(
    public id: string,
    public label: string,
    public name: string,
    public value: string | number,
    public options: FieldOption[]
  ) {
    super(id, label, name, value);
  }
}

export interface FieldOption {
  id: string;
  label: string;
  value: string | number;
}

export class FieldConditional extends Field {
  public type: FieldType = "conditional";
  constructor(
    public id: string,
    public label: string,
    public name: string,
    public value: ConditionalFieldType,
    public options: FieldOption[],
    public inputField: FieldInput,
    public selectField: FieldSelect
  ) {
    super(id, label, name, value);
  }
}

export type FieldType = "input" | "select" | "conditional";
export type ConditionalFieldType = "input" | "select" | "none";
type InputType = "text" | "number";
