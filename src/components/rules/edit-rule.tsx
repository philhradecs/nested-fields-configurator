import { Group, Select, ActionIcon, Loader } from "@mantine/core";
import { IconReload } from "@tabler/icons-react";
import { Controller } from "react-hook-form";
import { useFieldsSelectOptions } from "./use-fields-select-options";
import { memo, useTransition } from "react";

type RuleFieldSelectProps = {
  path: string;
};

export const EditRule = memo(({ path }: RuleFieldSelectProps) => {
  const {
    fieldSelectOptions,
    selectedFieldOptions,
    refresh
  } = useFieldsSelectOptions({ selectedFieldName: `${path}.rule_field_key` });

  const [isPending, startTransition] = useTransition();

  return (
    <Group>
      <Controller
        name={`${path}.rule_field_key`}
        render={({ field }) => (
          <Select
            placeholder="Select Field"
            rightSection={
              isPending ? (
                <Loader color="blue.4" size={14} />
              ) : (
                <ActionIcon variant="subtle" onClick={refresh} color="gray">
                  <IconReload size={14} />
                </ActionIcon>
              )
            }
            data={fieldSelectOptions}
            sx={{ flex: 1 }}
            {...field}
            onChange={value => startTransition(() => field.onChange(value))}
          />
        )}
      />
      <Controller
        name={`${path}.rule_value`}
        render={({ field }) => (
          <Select
            placeholder="Select Option"
            rightSection={
              isPending ? (
                <Loader color="blue.4" size={14} />
              ) : (
                <ActionIcon variant="subtle" onClick={refresh} color="gray">
                  <IconReload size={14} />
                </ActionIcon>
              )
            }
            data={selectedFieldOptions}
            sx={{ flex: 1 }}
            {...field}
            onChange={value => startTransition(() => field.onChange(value))}
          />
        )}
      />
    </Group>
  );
});
