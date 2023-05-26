import { Group, Select } from "@mantine/core";
import { Controller, get } from "react-hook-form";
import { useFieldsSelectOptions } from "./use-fields-select-options";
import { useStaticMethods } from "../rule-builder";

type RuleFieldSelectProps = {
  path: string;
};

export const EditRule = ({ path }: RuleFieldSelectProps) => {
  const { control } = useStaticMethods();

  const castedPath = path as `formFields.${number}.rules.${number}`;

  const { fieldNames, selectedFieldOptions } = useFieldsSelectOptions(
    `${castedPath}.rule_field_key`
  );

  return (
    <Group>
      <Controller
        control={control}
        name={`${castedPath}.rule_field_key`}
        rules={{
          validate: (value) =>
            value && fieldNames.some((d) => d.value === value),
        }}
        render={({ field, formState: { errors } }) => (
          <Select
            error={!!get(errors, field.name)}
            placeholder="Select Field"
            data={fieldNames}
            sx={{ flex: 1 }}
            {...field}
          />
        )}
      />
      <Controller
        control={control}
        name={`${castedPath}.rule_value`}
        rules={{
          validate: (value) =>
            value && selectedFieldOptions.some((d) => d.value === value),
        }}
        render={({ field, formState: { errors } }) => (
          <Select
            error={!!get(errors, field.name)}
            placeholder="Select Option"
            data={selectedFieldOptions}
            sx={{ flex: 1 }}
            {...field}
          />
        )}
      />
    </Group>
  );
};
