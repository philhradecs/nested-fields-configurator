import { Group, Select, ActionIcon, Loader, SelectProps } from "@mantine/core";
import { IconReload } from "@tabler/icons-react";
import { Controller } from "react-hook-form";
import { useFieldsSelectOptions } from "./use-fields-select-options";
import { forwardRef, useTransition } from "react";

type RuleFieldSelectProps = {
  path: string;
};

export const EditRule = ({ path }: RuleFieldSelectProps) => {
  return (
    <Group>
      <Controller
        name={`${path}.rule_field_key`}
        render={({ field }) => (
          <SelectRuleKey placeholder="Select Field" path={path} {...field} />
        )}
      />
      <Controller
        name={`${path}.rule_value`}
        render={({ field }) => (
          <SelectRuleOption
            placeholder="Select Option"
            path={path}
            {...field}
          />
        )}
      />
    </Group>
  );
};

const SelectRuleKey = forwardRef<
  HTMLInputElement,
  RuleFieldSelectProps & Partial<SelectProps>
>(({ path, onChange, ...props }, ref) => {
  const [isPending, startTransition] = useTransition();
  const { fieldNames, refresh } = useFieldsSelectOptions();

  return (
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
      data={fieldNames}
      sx={{ flex: 1 }}
      {...props}
      ref={ref}
      onChange={(value) => {
        if (onChange) {
          startTransition(() => onChange(value));
        }
      }}
    />
  );
});

const SelectRuleOption = forwardRef<
  HTMLInputElement,
  RuleFieldSelectProps & Partial<SelectProps>
>(({ path, onChange, ...props }, ref) => {
  const [isPending, startTransition] = useTransition();
  const { selectedFieldOptions, refresh } = useFieldsSelectOptions(
    `${path}.rule_field_key`
  );

  return (
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
      {...props}
      ref={ref}
      onChange={(value) => {
        if (onChange) {
          startTransition(() => onChange(value));
        }
      }}
    />
  );
});
