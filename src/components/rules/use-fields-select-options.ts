import { FieldPath, useWatch } from "react-hook-form";
import { RulesBuilderFormData } from "../types";
import { useMemo } from "react";
import { useStaticMethods } from "../rule-builder";
import { useRefreshToken } from "../refresh";

export const useFieldsSelectOptions = (
  watchSelectedFieldName: FieldPath<RulesBuilderFormData>
) => {
  const { getValues, control } = useStaticMethods();

  const refreshToken = useRefreshToken();

  const selectedField = useWatch({
    name: watchSelectedFieldName,
    control,
  });

  const fieldNames = useMemo(
    () => {
      return getValues("formFields").map((field) => ({
        label: field.field_name,
        value: field.field_key,
      }));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [getValues, refreshToken]
  );

  const selectedFieldOptions = useMemo(
    () => {
      if (!selectedField) return [];
      const field = getValues("formFields").find(
        (field) => field.field_key === selectedField
      );

      if (!field) return [];

      return field.options.map((option) => ({
        label: option.option_label,
        value: option.option_value,
      }));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [getValues, selectedField, refreshToken]
  );

  return { fieldNames, selectedFieldOptions };
};
