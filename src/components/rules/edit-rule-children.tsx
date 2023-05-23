import {
  Box,
  Button,
  Group,
  Paper,
  Stack,
  Text,
  useMantineTheme
} from "@mantine/core";
import { useFieldArray, useFormContext } from "react-hook-form";
import { FieldRule, FormFieldConfiguratorData } from "../types";
import { EditRule } from "./edit-rule";
import { IconPlus } from "@tabler/icons-react";

type EditRuleChildrenProps = {
  rule: FieldRule;
  prefix: string;
  remove?: () => void;
};

export const EditRuleChildren = ({
  rule,
  prefix,
  remove: parentRemove
}: EditRuleChildrenProps) => {
  const { control } = useFormContext<FormFieldConfiguratorData>();

  const { fields, append, remove } = useFieldArray({
    name: `${prefix}.children` as "formFields.0.rules",
    control
  });

  const theme = useMantineTheme();

  return (
    <Box>
      <Stack mt="md">
        {fields.map((child, index) => (
          <Paper
            withBorder
            p="sm"
            bg={theme.fn.rgba(theme.fn.themeColor("grape"), 0.025)}
            sx={{ flex: 1 }}
            key={child.id}
          >
            <Box>
              <Text mb="sm" weight="bold">
                and
              </Text>
              <EditRule prefix={`${prefix}.children.${index}`} rule={rule} />
              <EditRuleChildren
                rule={child as any}
                prefix={`${prefix}.children.${index}`}
                remove={() => remove(index)}
              />
            </Box>
          </Paper>
        ))}
      </Stack>
      <Group position="right" mt="lg">
        {parentRemove && (
          <Button variant="light" size="xs" color="pink" onClick={parentRemove}>
            Remove
          </Button>
        )}
        <Button
          variant="light"
          size="xs"
          leftIcon={<IconPlus size={14} />}
          onClick={() =>
            append({ rule_value: "", rule_field_key: "", children: [] })
          }
        >
          Group
        </Button>
      </Group>
    </Box>
  );
};
