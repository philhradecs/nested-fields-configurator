import { ActionIcon, Group, Text, TextInput } from "@mantine/core";
import { FieldOption } from "../types";
import { useForm, useFormContext } from "react-hook-form";
import { IconTrash } from "@tabler/icons-react";

type EditOptionProps = {
  option: FieldOption;
  index: number;
  remove: () => void;
  prefix: string;
};
export const EditOption = ({
  option,
  index,
  remove,
  prefix,
}: EditOptionProps) => {
  const { setValue } = useFormContext();
  const { register, handleSubmit } = useForm({ defaultValues: option });

  const registerOptionLabel = register("option_label");
  const registerOptionValue = register("option_value");

  return (
    <Group>
      <Text color="dimmed">{index + 1}</Text>
      <TextInput
        placeholder="Label"
        {...registerOptionLabel}
        onBlur={(event) => {
          registerOptionLabel.onBlur(event);
          handleSubmit((data) => {
            console.log(`${prefix}.option_label`);
            return setValue(`${prefix}.option_label`, data.option_label);
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
            setValue(`${prefix}.option_value`, data.option_label)
          )();
        }}
        sx={{ flex: 1 }}
      />
      <ActionIcon color="pink" onClick={remove}>
        <IconTrash size={16} />
      </ActionIcon>
    </Group>
  );
};
