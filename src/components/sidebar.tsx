import {
  Title,
  Tabs,
  Button,
  ButtonProps,
  Box,
  Text,
  Group,
  useMantineTheme,
} from "@mantine/core";
import { UseFieldArrayAppend, useFormState } from "react-hook-form";
import { Evaluate } from "./evaluate";
import { AddFormField } from "./fields/add-field";
import { TabTitle } from "./tab-title";
import { RulesBuilderFormData } from "./types";
import { HTMLAttributes } from "react";
import { useStaticMethods } from "./rule-builder";
import { IconCheck, IconExclamationCircle } from "@tabler/icons-react";

type SidebarProps = {
  append: UseFieldArrayAppend<RulesBuilderFormData, "formFields">;
  onSubmit: () => void;
};

export const Sidebar = ({ append, onSubmit }: SidebarProps) => {
  return (
    <Tabs
      defaultValue="library"
      variant="default"
      styles={{
        panel: { paddingTop: 42 },
      }}
    >
      <Tabs.List grow>
        <Tabs.Tab value="library">
          <TabTitle>Library</TabTitle>
        </Tabs.Tab>
        <Tabs.Tab value="evaluate">
          <TabTitle>Evaluate</TabTitle>
        </Tabs.Tab>
        <Tabs.Tab value="save">
          <TabTitle>Save</TabTitle>
        </Tabs.Tab>
      </Tabs.List>
      <Tabs.Panel value="library">
        <Title order={3} mb="md">
          Add Field
        </Title>
        <AddFormField append={append} />
      </Tabs.Panel>
      <Tabs.Panel value="evaluate">
        <Title order={3}>Evaluate Rules</Title>
        <Evaluate />
      </Tabs.Panel>
      <Tabs.Panel value="save">
        <FormSubmitButton onClick={onSubmit} />
      </Tabs.Panel>
    </Tabs>
  );
};

const FormSubmitButton = (
  props: ButtonProps & HTMLAttributes<HTMLButtonElement>
) => {
  const { control } = useStaticMethods();
  const { isValid, isDirty } = useFormState({ control });
  const theme = useMantineTheme();

  return (
    <Box>
      <Button
        size="lg"
        fullWidth
        color="green"
        disabled={!isDirty || !isValid}
        {...props}
      >
        Submit
      </Button>
      {!isDirty && (
        <Group mt='sm' ml='sm' spacing='xs'>
          <IconCheck size={20} color={theme.colors.green[7]} />
          <Text color='green.7'>Everything up-to-date</Text></Group>
        )}
      {!isValid && (
        <Group mt='sm' ml='sm' spacing='xs'>
          <IconExclamationCircle size={20} color={theme.colors.red[7]} />
          <Text color='red.7'>
            Some fields have errors.
          </Text>
        </Group>
      )}
    </Box>
  );
};
