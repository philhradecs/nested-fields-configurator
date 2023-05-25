import { FieldPath, useFormContext, useWatch } from "react-hook-form";
import { Field, RulesBuilderFormData } from "../types";
import { useCallback, useEffect, useState } from "react";

export const useFieldsSelectOptions = (watchSelectedFieldName?: string) => {
  const { getValues, control } = useFormContext<RulesBuilderFormData>();

  const selectedField = useWatch({
    name: watchSelectedFieldName as FieldPath<RulesBuilderFormData>,
    control,
    disabled: !watchSelectedFieldName,
  });

  const getFieldSelectOptions = useCallback(
    (fields: Field[]) =>
      fields.map((field) => ({
        label: field.field_name,
        value: field.field_key,
      })),
    []
  );

  const getFieldOptions = useCallback(
    (fieldKey: string | undefined) => (fields: Field[]) => {
      if (!fieldKey) return [];

      const field = fields.find((field) => field.field_key === fieldKey);

      if (!field) return [];

      return field.options.map((option) => ({
        label: option.option_label,
        value: option.option_value,
      }));
    },
    []
  );
  const [fieldNames, setFieldSelectOptions] = useState(() =>
    getFieldSelectOptions(getValues("formFields") || [])
  );
  const [selectedFieldOptions, setSelectedFieldOptions] = useState(() =>
    typeof selectedField === "string"
      ? getFieldOptions(selectedField)(getValues("formFields"))
      : []
  );

  const refresh = useCallback(() => {
    const currentValues = getValues("formFields");
    setFieldSelectOptions(getFieldSelectOptions(currentValues));
    setSelectedFieldOptions(
      typeof selectedField === "string"
        ? getFieldOptions(selectedField)(currentValues)
        : []
    );
  }, [getFieldOptions, getFieldSelectOptions, getValues, selectedField]);

  useEffect(() => {
    if (watchSelectedFieldName) {
      refresh();
    }
  }, [refresh, selectedField, watchSelectedFieldName]);

  return { fieldNames, selectedFieldOptions, refresh };
};
