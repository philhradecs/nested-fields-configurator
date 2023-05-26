import { Button, Group, Stack, Text } from "@mantine/core";
import { useFieldArray } from "react-hook-form";
import { EditOption } from "./edit-option";
import { IconPlus } from "@tabler/icons-react";
import { useStaticMethods } from "../rule-builder";
import { ErrorText } from "../error-text";

type FieldOptionFormProps = {
  fieldIdx: number;
};

export const OptionsForm = ({ fieldIdx }: FieldOptionFormProps) => {
  const path = `formFields.${fieldIdx}.options` as const;
  const { control } = useStaticMethods();
  const { fields, remove, append } = useFieldArray({
    name: path,
    control,
  });

  return (
    <Stack spacing="lg">
      <Group>
        <Text weight="bold">Options</Text>
        <ErrorText path={`${path}.root`} />
      </Group>
      <Stack>
        {fields.map((option, optionIdx) => (
          <EditOption
            option={option}
            fieldIdx={fieldIdx}
            optionIdx={optionIdx}
            remove={fields.length > 1 ? remove : undefined}
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
