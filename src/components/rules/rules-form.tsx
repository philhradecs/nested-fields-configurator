import { ActionIcon, Button, Group, Paper, Stack, Text } from "@mantine/core";
import { FieldRule, FormFieldConfiguratorData } from "../types";
import { useFieldArray, useFormContext } from "react-hook-form";
import { EditRuleChildren } from "./edit-rule-children";

import { IconPlus, IconTrash } from "@tabler/icons-react";
import { EditRule } from "./edit-rule";

type FieldOptionFormProps = {
  index: number;
};

export const RulesForm = ({ index }: FieldOptionFormProps) => {
  const { control } = useFormContext<FormFieldConfiguratorData>();
  const { fields: rules, remove, append } = useFieldArray({
    name: `formFields.${index}.rules`,
    control
  });

  const addRule = () =>
    append({ rule_value: "", rule_field_key: "", children: [] });

  return (
    <Stack spacing="lg">
      <Text weight="bold">Rules</Text>
      <Stack spacing={32}>
        {rules.map((rule, ruleIdx) => (
          <EditNestedRule
            prefix={`formFields.${index}.rules.${ruleIdx}`}
            removeRule={() => remove(ruleIdx)}
            index={ruleIdx}
            rule={rule}
            key={rule.id}
          />
        ))}
      </Stack>

      <Button
        ml="auto"
        size="sm"
        leftIcon={<IconPlus size={16} />}
        onClick={addRule}
      >
        Add Rule
      </Button>
    </Stack>
  );
};

type EditRuleGroupProps = {
  rule: FieldRule;
  prefix: string;
  index: number;
  removeRule: () => void;
};

const EditNestedRule = ({
  rule,
  prefix,
  index,
  removeRule
}: EditRuleGroupProps) => {
  return (
    <Group>
      <Text color="dimmed">{index + 1}</Text>
      <Paper withBorder p="md" sx={{ flex: 1 }}>
        <EditRule prefix={prefix} rule={rule} />
        <EditRuleChildren prefix={prefix} rule={rule} />
      </Paper>
      <ActionIcon color="pink" onClick={removeRule}>
        <IconTrash size={16} />
      </ActionIcon>
    </Group>
  );
};
