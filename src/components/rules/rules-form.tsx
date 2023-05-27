import { Button, Stack } from "@mantine/core";
import { useFieldArray } from "react-hook-form";

import { IconPlus } from "@tabler/icons-react";
import { useStaticMethods } from "../rule-builder";
import { EditRule } from "./edit-rule";

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
            <EditRule
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
