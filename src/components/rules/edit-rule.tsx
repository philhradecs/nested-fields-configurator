import { Group, Select, ActionIcon } from "@mantine/core";
import { IconReload } from "@tabler/icons-react";
import { Controller,  useFormContext } from "react-hook-form";
import { useFieldsSelectOptions } from "./use-fields-select-options";

type RuleFieldSelectProps = {
  path: string
};

export const EditRule = ({ path }: RuleFieldSelectProps) => {
  const { control } = useFormContext();

  const { fieldSelectOptions, selectedFieldOptions, refresh } =
    useFieldsSelectOptions({ selectedFieldName: `${path}.rule_field_key` });

  return (
    <Group>
      <Controller
        name={`${path}.rule_field_key`}
        control={control}
        render={({ field }) => (
          <Select
            placeholder="Select Field"
            rightSection={
              <ActionIcon variant="subtle" onClick={refresh} color="teal">
                <IconReload size={14} />
              </ActionIcon>
            }
            data={fieldSelectOptions}
            sx={{ flex: 1 }}
            {...field}
          />
        )}
      />
      <Controller
        name={`${path}.rule_value`}
        control={control}
        render={({ field }) => (
          <Select
            placeholder="Select Option"
            rightSection={
              <ActionIcon variant="subtle" onClick={refresh} color="teal">
                <IconReload size={14} />
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
