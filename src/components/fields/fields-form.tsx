import { Box, Divider } from "@mantine/core";
import { EditOptionsForm } from "../options/options-form";
import { RulesForm } from "../rules/rules-form";
import { memo } from "react";

type ConfigureFormFieldProps = {
  index: number;
};
export const FieldsForm = memo(({ index }: ConfigureFormFieldProps) => {
  return (
    <Box>
      <Divider mb="lg" opacity={0.7} />
      <EditOptionsForm index={index} />
      <Box mt="xl">
        <RulesForm index={index} />
      </Box>
    </Box>
  );
});
