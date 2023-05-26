import { Button, Group, Paper, Stack, Text } from "@mantine/core";
import {
  UseFieldArrayRemove,
  useFieldArray,
} from "react-hook-form";
import { EditRuleChildren } from "./edit-rule-children";

import { IconPlus } from "@tabler/icons-react";
import { EditRule } from "./edit-rule";
import { RemoveButton } from "../remove-button";
import { useStaticMethods } from "../rule-builder";

type FieldOptionFormProps = {
  fieldIdx: number;
};

export const RulesForm = ({ fieldIdx }: FieldOptionFormProps) => {
  const { control } = useStaticMethods();

  const path = `formFields.${fieldIdx}.rules` as const;
  const {
    fields: rules,
    remove,
    append,
  } = useFieldArray({
    name: path,
    control,
  });

  const addRule = () =>
    append({ rule_value: "", rule_field_key: "", children: [] });

  return (
    <Stack spacing="lg">
      {rules.length > 0 && (
        <Stack spacing={32}>
          {rules.map((rule, ruleIdx) => (
            <EditNestedRule
              path={`${path}.${ruleIdx}`}
              remove={remove}
              ruleIdx={ruleIdx}
              key={rule.id}
            />
          ))}
        </Stack>
      )}

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
  path: string;
  ruleIdx: number;
  remove: UseFieldArrayRemove;
};

const EditNestedRule = ({ path, ruleIdx, remove }: EditRuleGroupProps) => {
  return (
    <Group>
      <Paper withBorder p="md" sx={{ flex: 1 }}>
        <Group mb="md">
          <Text weight="bold" size="lg">
            Rule {ruleIdx + 1}
          </Text>
          <RemoveButton onClick={() => remove(ruleIdx)} />
        </Group>
        <Stack>
          <EditRule path={path} />
          <EditRuleChildren path={path} />
        </Stack>
      </Paper>
    </Group>
  );
};
