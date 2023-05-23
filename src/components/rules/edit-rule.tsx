import { Group, Select, ActionIcon } from "@mantine/core";
import { IconRefresh } from "@tabler/icons-react";
import { Controller, useFormContext } from "react-hook-form";
import { useFieldsSelectOptions } from "./use-fields-select-options";

type RuleFieldSelectProps = {
  prefix: string;
};

export const EditRule = ({ prefix }: RuleFieldSelectProps) => {
  const { control } = useFormContext();

  const { fieldSelectOptions, selectedFieldOptions, refresh } =
    useFieldsSelectOptions({ selectedFieldName: `${prefix}.rule_field_key` });

  return (
    <Group>
      <Controller
        name={`${prefix}.rule_field_key`}
        control={control}
        render={({ field }) => (
          <Select
            placeholder="Choose field"
            rightSection={
              <ActionIcon variant="transparent" onClick={refresh} color="teal">
                <IconRefresh size={16} />
              </ActionIcon>
            }
            data={fieldSelectOptions}
            sx={{ flex: 1 }}
            {...field}
          />
        )}
      />
      <Controller
        name={`${prefix}.rule_value`}
        control={control}
        render={({ field }) => (
          <Select
            placeholder="Option"
            rightSection={
              <ActionIcon variant="transparent" onClick={refresh} color="teal">
                <IconRefresh size={16} />
              </ActionIcon>
            }
            data={selectedFieldOptions}
            sx={{ flex: 1 }}
            {...field}
          />
        )}
      />
    </Group>
  );
};
