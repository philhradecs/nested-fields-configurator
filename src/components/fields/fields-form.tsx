import { Box, Divider } from "@mantine/core";
import { EditOptionsForm } from "../options/options-form";
import { RulesForm } from "../rules/rules-form";

type ConfigureFormFieldProps = {
  fieldIdx: number;
};
export const FieldsForm = ({ fieldIdx }: ConfigureFormFieldProps) => {
  return (
    <Box>
      <Divider mb="lg" opacity={0.7} />
      <EditOptionsForm fieldIdx={fieldIdx} />
      <Box mt="xl">
        <RulesForm fieldIdx={fieldIdx} />
      </Box>
    </Box>
  );
};
