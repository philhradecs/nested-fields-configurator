import { useFormContext, useWatch } from "react-hook-form";
import { Field, RulesBuilderFormData } from "../types";
import { useCallback, useEffect, useState } from "react";

type UseFieldsSelectOptionsProps = {
  selectedFieldName: string;
};
export const useFieldsSelectOptions = ({
  selectedFieldName
}: UseFieldsSelectOptionsProps) => {
  const { getValues } = useFormContext<RulesBuilderFormData>();

  const selectedField = useWatch({ name: selectedFieldName });

  const getFieldSelectOptions = useCallback(
    (fields: Field[]) =>
      fields.map(field => ({
        label: field.field_name,
        value: field.field_key
      })),
    []
  );

  const getFieldOptions = useCallback(
    (fieldKey: string | undefined) => (fields: Field[]) => {
      if (!fieldKey) return [];

      const field = fields.find(field => field.field_key === fieldKey);

      if (!field) return [];

      return field.options.map(option => ({
        label: option.option_label,
        value: option.option_value
      }));
    },
    []
  );
  const [fieldSelectOptions, setFieldSelectOptions] = useState(() =>
    getFieldSelectOptions(getValues("formFields") || [])
  );
  const [selectedFieldOptions, setSelectedFieldOptions] = useState(() =>
    getFieldOptions(selectedField)(getValues("formFields") || [])
  );

  const refresh = useCallback(() => {
    const currentValues = getValues("formFields");
    setFieldSelectOptions(getFieldSelectOptions(currentValues));
    setSelectedFieldOptions(
      getFieldOptions(selectedField)(currentValues) || []
    );
  }, [getFieldOptions, getFieldSelectOptions, getValues, selectedField]);

  useEffect(() => {
    return refresh();
  }, [refresh, selectedField]);

  return { fieldSelectOptions, selectedFieldOptions, refresh };
};
