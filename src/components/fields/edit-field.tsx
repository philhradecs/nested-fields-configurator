import { ActionIcon, Button, Group, Text, TextInput } from "@mantine/core";
import { IconPencil } from "@tabler/icons-react";
import { useState } from "react";
import { useWatch, useForm, useFormContext, FieldPath } from "react-hook-form";
import { FieldConfiguratorData } from "../types";
import { RemoveButton } from "../remove-button";

type EditFieldProps = {
  path: FieldPath<FieldConfiguratorData>;
  remove: () => void;
};

export const EditField = ({ path, remove }: EditFieldProps) => {
  const [editMode, setEditMode] = useState(false);
  const { setValue } = useFormContext<FieldConfiguratorData>();
  const label = useWatch({ name: path });
  const { register, handleSubmit } = useForm({
    defaultValues: { name: label }
  });

  return (
    <Group mih={36} align="center" display="inline-flex">
      {editMode ? (
        <TextInput
          autoFocus
          placeholder="Required"
          {...register("name", { required: true })}
          onClick={event => event.stopPropagation()}
        />
      ) : (
        <Text weight="bold" size="lg">
          {label}
        </Text>
      )}
      {editMode ? (
        <Button
          size="xs"
          onClick={event => {
            event.stopPropagation();
            handleSubmit(data => {
              setEditMode(false);
              setValue(path, data.name);
            })();
          }}
        >
          Save
        </Button>
      ) : (
        <Group spacing="xs">
          <ActionIcon
            size="md"
            color="indigo.6"
            onClick={event => {
              event.stopPropagation();
              setEditMode(true);
            }}
          >
            <IconPencil size={16} />
          </ActionIcon>
          <RemoveButton
            onClick={event => {
              event.stopPropagation();
              remove();
            }}
          />
        </Group>
      )}
    </Group>
  );
};
