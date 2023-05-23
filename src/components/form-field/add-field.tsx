import { Box, Button, TextInput } from "@mantine/core";
import { UseFieldArrayAppend, useForm, useFormContext } from "react-hook-form";
import { FormFieldConfiguratorData } from "../types";
import { IconPlus } from "@tabler/icons-react";

type AddFormFieldProps = {
  append: UseFieldArrayAppend<FormFieldConfiguratorData, "formFields">;
};
export const AddFormField = ({ append }: AddFormFieldProps) => {
  const { getValues } = useFormContext<FormFieldConfiguratorData>();
  const { handleSubmit, register, reset } = useForm({
    defaultValues: { formFieldName: "" },
  });

  const appendDefaultValues = ({
    formFieldName,
  }: {
    formFieldName: string;
  }) => {
    const values = getValues();
    append({
      field_name: formFieldName,
      field_key: `field_${values.formFields.length + 1}`,
      options: [{ option_label: "", option_value: "" }],
      rules: [{ rule_field_key: "", rule_value: "", children: [] }],
    });
    reset({ formFieldName: "" });
  };

  return (
    <Box>
      <TextInput
        placeholder="Enter Field Name"
        {...register("formFieldName")}
      />
      <Button mt="sm" fullWidth onClick={handleSubmit(appendDefaultValues)} leftIcon={<IconPlus size={16}/>}>
        Add Field
      </Button>
    </Box>
  );
};
