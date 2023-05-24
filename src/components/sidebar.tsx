import { Title, Tabs, Button } from "@mantine/core";
import { UseFieldArrayAppend, useFormContext } from "react-hook-form";
import { Evaluate } from "./evaluate";
import { AddFormField } from "./fields/add-field";
import { TabTitle } from "./tab-title";
import { RulesBuilderFormData } from "./types";

type SidebarProps = {
  append: UseFieldArrayAppend<RulesBuilderFormData, "formFields">;
};

export const Sidebar = ({ append }: SidebarProps) => {
  const onSubmit = (data: RulesBuilderFormData) => {
    console.log(data);
    window.alert(JSON.stringify(data, null, 2));
  };

  const { handleSubmit } = useFormContext<RulesBuilderFormData>();

  return (
    <Tabs
      defaultValue="library"
      variant="default"
      styles={{
        panel: { paddingTop: 42 }
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
        <Title order={3}>
          Evaluate Rules
        </Title>
        <Evaluate />
      </Tabs.Panel>
      <Tabs.Panel value="save">
        <Button
          size="lg"
          fullWidth
          color="green"
          onClick={handleSubmit(onSubmit)}
        >
          Submit
        </Button>
      </Tabs.Panel>
    </Tabs>
  );
};
