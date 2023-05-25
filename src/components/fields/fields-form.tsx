import { Box, Divider } from "@mantine/core";
import { EditOptionsForm } from "../options/options-form";
import { RulesForm } from "../rules/rules-form";

type ConfigureFormFieldProps = {
  index: number;
};
export const FieldsForm = ({ index }: ConfigureFormFieldProps) => {
  return (
    <Box>
      <Divider mb="lg" opacity={0.7} />
      <EditOptionsForm index={index} />
      <Box mt="xl">
        <RulesForm index={index} />
      </Box>
    </Box>
  );
};
