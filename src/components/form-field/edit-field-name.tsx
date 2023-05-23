import { ActionIcon, Button, Group, Text, TextInput } from "@mantine/core";
import { IconPencil } from "@tabler/icons-react";
import { useState } from "react";
import { useWatch, useForm, useFormContext } from "react-hook-form";
import { FormFieldConfiguratorData } from "../types";

type EditFormFieldNameProps = {
  index: number;
};

export const EditFormFieldName = ({ index }: EditFormFieldNameProps) => {
  const [editMode, setEditMode] = useState(false);
  const { setValue } = useFormContext<FormFieldConfiguratorData>();
  const name = `formFields.${index}.field_name` as const;
  const label = useWatch({ name });
  const { register, handleSubmit } = useForm({
    defaultValues: { name: label },
  });

  return (
    <Group
      mih={36}
      align="center"
      display="inline-flex"
      onKeyDown={(event) => event.stopPropagation()}
    >
      {editMode ? (
        <TextInput
          autoFocus
          placeholder="Required"
          {...register("name", { required: true })}
          onClick={(event) => event.stopPropagation()}
        />
      ) : (
        <Text weight="bold" size="lg">
          {label}
        </Text>
      )}
      {editMode ? (
        <Button
          size="sm"
          onClick={(event) => {
            event.stopPropagation();
            handleSubmit((data) => {
              setEditMode(false);
              setValue(name, data.name);
            })();
          }}
        >
          Save
        </Button>
      ) : (
        <ActionIcon
          size="md"
          color="indigo.6"
          onClick={(event) => {
            event.stopPropagation();
            setEditMode(true);
          }}
        >
          <IconPencil size={16} />
        </ActionIcon>
      )}
    </Group>
  );
};
