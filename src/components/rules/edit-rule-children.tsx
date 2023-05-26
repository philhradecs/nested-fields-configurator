import {
  Box,
  Button,
  Group,
  Paper,
  Stack,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { useFieldArray } from "react-hook-form";
import { EditRule } from "./edit-rule";
import { IconPlus } from "@tabler/icons-react";
import { RemoveButton } from "../remove-button";
import { useStaticMethods } from "../rule-builder";
import { useRefreshRuleOptions } from "../refresh";

type EditRuleChildrenProps = {
  path: string;
};

export const EditRuleChildren = ({ path }: EditRuleChildrenProps) => {
  const { control } = useStaticMethods();

  const refreshRuleOptions = useRefreshRuleOptions();

  const { fields, append, remove } = useFieldArray({
    name: `${path}.children` as "formFields.0.rules",
    control,
  });

  const theme = useMantineTheme();

  return (
    <Box>
      <Stack>
        {fields.map((child, index) => (
          <Paper
            withBorder
            p="sm"
            bg={theme.fn.rgba(theme.fn.themeColor("grape"), 0.03)}
            sx={{ flex: 1 }}
            key={child.id}
          >
            <Group mb="sm">
              <Text weight="bold">and</Text>
              <RemoveButton
                onClick={() => {
                  remove(index);
                  refreshRuleOptions();
                }}
              />
            </Group>
            <Stack>
              <EditRule path={`${path}.children.${index}`} />
              <EditRuleChildren path={`${path}.children.${index}`} />
            </Stack>
          </Paper>
        ))}
      </Stack>
      <Group position="right" mt="sm">
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
