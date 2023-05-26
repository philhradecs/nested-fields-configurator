import { Group, Text, TextInput } from "@mantine/core";
import { FieldOption } from "../types";
import { UseFieldArrayRemove } from "react-hook-form";
import { RemoveButton } from "../remove-button";
import { useStaticMethods } from "../rule-builder";
import { useRefreshRuleOptions } from "../refresh";

type EditOptionProps = {
  option: FieldOption;
  fieldIdx: number;
  optionIdx: number;
  remove: UseFieldArrayRemove;
};
export const EditOption = ({
  fieldIdx,
  optionIdx,
  remove,
}: EditOptionProps) => {
  const { register } = useStaticMethods();

  const refreshRuleOptions = useRefreshRuleOptions();

  const registerOptionLabel = register(
    `formFields.${fieldIdx}.options.${optionIdx}.option_label`
  );
  const registerOptionValue = register(
    `formFields.${fieldIdx}.options.${optionIdx}.option_value`
  );

  return (
    <Group>
      <Text color="dimmed">{optionIdx + 1}</Text>
      <TextInput
        autoFocus
        placeholder="Label"
        {...registerOptionLabel}
        onBlur={(event) => {
          refreshRuleOptions();
          registerOptionLabel.onBlur(event);
        }}
        sx={{ flex: 1 }}
      />
      <TextInput
        placeholder="Value"
        {...registerOptionValue}
        onBlur={(event) => {
          refreshRuleOptions();
          registerOptionLabel.onBlur(event);
        }}
        sx={{ flex: 1 }}
      />
      <RemoveButton
        onClick={() => {
          remove(optionIdx);
          refreshRuleOptions();
        }}
      />
    </Group>
  );
};
