import { FieldRule } from "../components/types";

type FieldData = Record<string, string>;

export const evaluateRules = (
  fieldData: FieldData,
  rules: FieldRule[]
): boolean[] => {
  if (!rules || rules.length === 0) {
    return [];
  }

  const evaluateRule = (rule: FieldRule): boolean => {
    const { rule_field_key, rule_value, children } = rule;
    const field = fieldData[rule_field_key];
    const isValid = field === rule_value;
    if (children && children.length > 0) {
      return isValid && children.every(rule => evaluateRule(rule));
    }
    return isValid;
  };

  return rules.map(evaluateRule);
};
