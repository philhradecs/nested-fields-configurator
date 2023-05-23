import { useFormContext, useWatch } from "react-hook-form";
import { FormFieldConfiguratorData } from "../types";
import { useState } from "react";

type UseFieldsSelectOptionsProps = {
  watch?: boolean;
};
export const useFieldsSelectOptions = ({
  watch,
}: UseFieldsSelectOptionsProps) => {
  const { getValues, control } = useFormContext<FormFieldConfiguratorData>();

  const [existingFields, setExistingFields] = useState(getValues("formFields"));

  const watchedFields = useWatch({
    control,
    name: 'formFields',
    disabled: !watch,
  })

  const effectiveFields = watch ? watchedFields : existingFields;

  const refresh = () => setExistingFields(getValues("formFields"));

  const selectOptions = effectiveFields.map((field) => ({
    label: field.field_name,
    value: field.field_key,
  }));
  return { selectOptions, refresh };
};
