import { Button, Stack, Text } from "@mantine/core";
import { RulesBuilderFormData } from "../types";
import { useFieldArray, useFormContext } from "react-hook-form";
import { EditOption } from "./edit-option";
import { IconPlus } from "@tabler/icons-react";

type FieldOptionFormProps = {
  index: number;
};

export const EditOptionsForm = ({ index }: FieldOptionFormProps) => {
  const path = `formFields.${index}.options` as const;
  const { control } = useFormContext<RulesBuilderFormData>();
  const { fields, remove, append } = useFieldArray({
    name: path,
    control
  });

  return (
    <Stack spacing="lg">
      <Text weight="bold">Options</Text>
      <Stack>
        {fields.map((option, optionIdx) => (
          <EditOption
            option={option}
            index={optionIdx}
            remove={() => remove(optionIdx)}
            path={`${path}.${optionIdx}`}
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
