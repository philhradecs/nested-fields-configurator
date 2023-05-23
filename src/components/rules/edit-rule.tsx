import { Group, Select, ActionIcon, TextInput } from "@mantine/core";
import { IconRefresh } from "@tabler/icons-react";
import { Controller, useForm, useFormContext } from "react-hook-form";
import { FieldRule } from "../types";
import { useFieldsSelectOptions } from "./use-fields-select-options";

type RuleFieldSelectProps = {
  rule: FieldRule;
  prefix: string;
};

export const EditRule = ({ rule, prefix }: RuleFieldSelectProps) => {
  const { setValue } = useFormContext();
  const { control, register, handleSubmit } = useForm({ defaultValues: rule });

  const watchFormFields = true;

  const { selectOptions, refresh } = useFieldsSelectOptions({
    watch: watchFormFields
  });

  const ruleValueRegister = register("rule_value");

  const submitRuleKey = handleSubmit(data =>
    setValue(`${prefix}.rule_field_key`, data.rule_field_key)
  );

  const submitRuleValue = handleSubmit(data =>
    setValue(`${prefix}.rule_field_value`, data.rule_value)
  );

  return (
    <Group>
      <Controller
        name="rule_field_key"
        control={control}
        render={({ field }) => (
          <Select
            rightSection={
              !watchFormFields ? (
                <ActionIcon
                  variant="transparent"
                  onClick={refresh}
                  color="teal"
                >
                  <IconRefresh size={16} />
                </ActionIcon>
              ) : (
                undefined
              )
            }
            data={selectOptions}
            sx={{ flex: 1 }}
            placeholder="Choose field"
            {...field}
            onBlur={() => {
              field.onBlur();
              submitRuleKey();
            }}
          />
        )}
      />
      <TextInput
        {...ruleValueRegister}
        onBlur={event => {
          ruleValueRegister.onBlur(event);
          submitRuleValue();
        }}
        sx={{ flex: 1 }}
        placeholder="Condition"
      />
    </Group>
  );
};
