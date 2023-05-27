import { Button, Group, TextInput } from "@mantine/core";
import { UseFieldArrayAppend, useForm } from "react-hook-form";
import { RulesBuilderFormData } from "../types";
import { IconPlus } from "@tabler/icons-react";
import { useStaticMethods } from "../rule-builder";
import { useRefreshRuleOptions } from "../refresh";

type AddFieldProps = {
  append: UseFieldArrayAppend<RulesBuilderFormData, "formFields">;
};
export const AddField = ({ append }: AddFieldProps) => {
  const { getValues } = useStaticMethods();
  const { handleSubmit, register, reset } = useForm({
    defaultValues: { formFieldName: "" },
  });

  const refreshRuleOptions = useRefreshRuleOptions();

  const appendDefaultValues = ({
    formFieldName,
  }: {
    formFieldName: string;
  }) => {
    const values = getValues();
    append({
      field_name: formFieldName,
      field_key: `field_${values.formFields.length + 1}`,
      options: [],
      rules: [],
    });
  };

  const handleSave = () => {
    handleSubmit((data) => {
      appendDefaultValues(data);
      reset({ formFieldName: "" });
      refreshRuleOptions();
    })();
  };

  return (
    <Group>
      <TextInput
        size="lg"
        placeholder="Enter Field Name"
        {...register("formFieldName", { required: true })}
      />
      <Button size="lg" onClick={handleSave} leftIcon={<IconPlus size={16} />}>
        Add
      </Button>
    </Group>
  );
};
