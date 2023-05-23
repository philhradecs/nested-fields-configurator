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
  return (
    <Group>
      <Text color="dimmed">{index + 1}</Text>
      <TextInput
        {...register("option_label")}
        defaultValue={option.option_label}
        onBlur={handleSubmit((data) =>
          setValue(`${prefix}.option_label`, data.option_label)
        )}
        sx={{ flex: 1 }}
        placeholder="Label"
      />
      <TextInput
        {...register("option_value")}
        defaultValue={option.option_value}
        onBlur={handleSubmit((data) =>
          setValue(`${prefix}.option_value`, data.option_label)
        )}
        sx={{ flex: 1 }}
        placeholder="Value"
      />
      <ActionIcon color="pink" onClick={remove}>
        <IconTrash size={16} />
      </ActionIcon>
    </Group>
  );
};
