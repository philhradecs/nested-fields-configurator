import { Button, Stack, Text } from "@mantine/core";
import { FormFieldConfiguratorData } from "../types";
import { useFieldArray, useFormContext } from "react-hook-form";
import { EditOption } from "./edit-option";
import { IconPlus } from "@tabler/icons-react";

type FieldOptionFormProps = {
  index: number;
};

export const EditOptionsForm = ({ index }: FieldOptionFormProps) => {
  const { control } = useFormContext<FormFieldConfiguratorData>();
  const { fields, remove, append } = useFieldArray({
    name: `formFields.${index}.options`,
    control
  });

  return (
    <Stack spacing="lg">
      <Text weight="bold">Options</Text>
      <Stack>
        {fields.map((option, index) => (
          <EditOption
            option={option}
            index={index}
            remove={() => remove(index)}
            prefix={`formFields.${index}.options.${index}`}
            key={option.id}
          />
        ))}
      </Stack>

      <Button
        ml="auto"
        size="sm"
        leftIcon={<IconPlus size={16} />}
        onClick={() => append({ option_label: "", option_value: "" })}
      >
        Add Option
      </Button>
    </Stack>
  );
};
