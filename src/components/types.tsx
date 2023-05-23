export type FieldOption = {
  option_label: string;
  option_value: string;
};

export type RuleChild = {
  rule_field_key: string;
  rule_value: string;
  children: RuleChild[];
};

export type FieldRule = {
  rule_field_key: string;
  rule_value: string;
  children: RuleChild[];
};

export type Field = {
  field_key: string;
  field_name: string;
  options: FieldOption[];
  rules: FieldRule[];
};

export type FieldConfiguratorData = { formFields: Field[] };
