import { Group, Paper, Stack, Text } from "@mantine/core";
import { UseFieldArrayRemove } from "react-hook-form";
import { RemoveButton } from "../remove-button";
import { EditRuleChildren } from "./edit-rule-children";
import { EditRuleMain } from "./edit-rule-main";

type EditRuleGroupProps = {
  path: string;
  ruleIdx: number;
  remove: UseFieldArrayRemove;
};

export const EditRule = ({ path, ruleIdx, remove }: EditRuleGroupProps) => {
  return (
    <Group>
      <Paper withBorder p="md" sx={{ flex: 1 }}>
        <Group mb="md">
          <Text weight="bold" size="lg">
            Rule {ruleIdx + 1}
          </Text>
          <RemoveButton onClick={() => remove(ruleIdx)} />
        </Group>
        <Stack>
          <EditRuleMain path={path} />
          <EditRuleChildren path={path} />
        </Stack>
      </Paper>
    </Group>
  );
};
