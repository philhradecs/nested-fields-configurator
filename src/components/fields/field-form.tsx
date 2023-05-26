import { Box, Divider } from "@mantine/core";
import { OptionsForm } from "../options/options-form";
import { RulesForm } from "../rules/rules-form";

type ConfigureFormFieldProps = {
  fieldIdx: number;
};
export const FieldForm = ({ fieldIdx }: ConfigureFormFieldProps) => {
  return (
    <Box>
      <Divider mb="lg" opacity={0.7} />
      <OptionsForm fieldIdx={fieldIdx} />
      <Box mt="xl">
        <RulesForm fieldIdx={fieldIdx} />
      </Box>
    </Box>
  );
};
