import { Group, Text, TextInput } from "@mantine/core";
import { FieldOption } from "../types";
import { useForm, useFormContext } from "react-hook-form";
import { RemoveButton } from "../remove-button";
import { useTransition } from "react";

type EditOptionProps = {
  option: FieldOption;
  index: number;
  remove: () => void;
  path: string;
};
export const EditOption = ({
  option,
  index,
  remove,
  path,
}: EditOptionProps) => {
  const { setValue } = useFormContext();
  const { register, handleSubmit } = useForm({
    defaultValues: option,
  });

  const startTransition = useTransition()[1];

  const registerOptionLabel = register("option_label");
  const registerOptionValue = register("option_value");

  return (
    <Group>
      <Text color="dimmed">{index + 1}</Text>
      <TextInput
        autoFocus
        placeholder="Label"
        {...registerOptionLabel}
        onBlur={(event) => {
          registerOptionLabel.onBlur(event);
          handleSubmit((data) => {
            startTransition(() =>
              setValue(`${path}.option_label`, data.option_label)
            );
          })();
        }}
        sx={{ flex: 1 }}
      />
      <TextInput
        placeholder="Value"
        {...registerOptionValue}
        onBlur={(event) => {
          registerOptionValue.onBlur(event);
          handleSubmit((data) =>
            startTransition(() =>
              setValue(`${path}.option_value`, data.option_label)
            )
          )();
        }}
        sx={{ flex: 1 }}
      />
      <RemoveButton onClick={remove} />
    </Group>
  );
};
