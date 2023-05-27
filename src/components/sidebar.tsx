import { Title, Tabs } from "@mantine/core";
import { UseFieldArrayAppend } from "react-hook-form";
import { Evaluate } from "./evaluate";
import { AddField } from "./fields/add-field";
import { TabTitle } from "./tab-title";
import { RulesBuilderFormData } from "./types";
import { FormSubmitButton } from "./form-submit-button";

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
        <AddField append={append} />
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
