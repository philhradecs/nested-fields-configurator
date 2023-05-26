import { Group, Text, TextInput } from "@mantine/core";
import { FieldOption } from "../types";
import {
  UseFieldArrayRemove,
  get,
  useFormState,
  useWatch,
} from "react-hook-form";
import { RemoveButton } from "../remove-button";
import { useStaticMethods } from "../rule-builder";
import { useRefreshRuleOptions } from "../refresh";
import { MouseEvent, useCallback, useEffect } from "react";

type EditOptionProps = {
  option: FieldOption;
  fieldIdx: number;
  optionIdx: number;
  remove?: UseFieldArrayRemove;
};
export const EditOption = ({
  fieldIdx,
  optionIdx,
  remove,
}: EditOptionProps) => {
  const { register, control, trigger } = useStaticMethods();

  const refreshRuleOptions = useRefreshRuleOptions();

  const options = useWatch({ control, name: `formFields.${fieldIdx}.options` });

  const triggerOptions = useCallback(() => {
    options.forEach((_, idx) => {
      if (idx !== optionIdx) {
        trigger(`formFields.${fieldIdx}.options.${idx}.option_value`);
      }
    });
  }, [fieldIdx, optionIdx, options, trigger]);

  const registerOptionLabel = register(
    `formFields.${fieldIdx}.options.${optionIdx}.option_label`,
    {
      required: true,
      onBlur: (event) => {
        if (!!event.target.value) {
          refreshRuleOptions();
        }
      },
    }
  );
  const registerOptionValue = register(
    `formFields.${fieldIdx}.options.${optionIdx}.option_value`,
    {
      onBlur: (event) => {
        if (!!event.target.value) {
          refreshRuleOptions();
        }
        triggerOptions();
      },
      required: true,
      validate: (value) => {
        if (options.filter((d) => d.option_value === value).length > 1) {
          return "Duplicate value";
        }
        return true;
      },
    }
  );

  const { errors } = useFormState({
    control,
    name: [registerOptionLabel.name, registerOptionValue.name],
  });

  return (
    <Group>
      <Text color="dimmed">{optionIdx + 1}</Text>
      <TextInput
        error={!!get(errors, registerOptionLabel.name)}
        placeholder="Label"
        sx={{ flex: 1 }}
        {...registerOptionLabel}
      />
      <TextInput
        error={!!get(errors, registerOptionValue.name)}
        placeholder="Value"
        sx={{ flex: 1 }}
        {...registerOptionValue}
      />
      <RemoveButton
        disabled={!remove}
        onClick={() => {
          if (remove) {
            remove(optionIdx);
            refreshRuleOptions();
          }
        }}
      />
    </Group>
  );
};
