import { Button, Container, Grid, Tabs, Title } from "@mantine/core";

import testFormFields from "../data/test-data.json";
import { AddFormField } from "./fields/add-field";
import { FieldsAccordion } from "./fields/fields-accordion";
import { FieldConfiguratorData } from "./types";
import { useForm, useFieldArray, FormProvider } from "react-hook-form";
import { KeyboardEvent } from "react";
import { EvaluateRules } from "./evaluate/evaluate-rules";
import { TabTitle } from "./tab-title";

export const RuleBuilder = () => {
  const formMethods = useForm<FieldConfiguratorData>({
    defaultValues: { formFields: testFormFields }
  });
  const { handleSubmit, control } = formMethods;

  const { fields, append, remove } = useFieldArray({
    name: "formFields",
    control
  });

  const onSubmit = (data: FieldConfiguratorData) => {
    console.log(data);
    window.alert(JSON.stringify(data, null, 2));
  };

  return (
    <Container my={40} size="xl">
      <FormProvider {...formMethods}>
        <form>
          <Grid onKeyDown={preventEnterKeySubmission} gutter={120}>
            <Grid.Col sm={7}>
              <Title order={1} mb="lg">
                Builder
              </Title>
              <FieldsAccordion formFields={fields} remove={remove} />
            </Grid.Col>
            <Grid.Col sm={5}>
              <Tabs
                defaultValue="library"
                variant="default"
                styles={{
                  panel: { paddingTop: 50 }
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
                  <Title order={3} mb="md">
                    Test Rules
                  </Title>
                  <EvaluateRules />
                </Tabs.Panel>
                <Tabs.Panel value="save">
                  <Button
                    mb="xl"
                    size="lg"
                    fullWidth
                    color="green"
                    onClick={handleSubmit(onSubmit)}
                  >
                    Submit
                  </Button>
                </Tabs.Panel>
              </Tabs>
            </Grid.Col>
          </Grid>
        </form>
      </FormProvider>
    </Container>
  );
};

const preventEnterKeySubmission = (e: KeyboardEvent<any>) => {
  const target = e.target as HTMLInputElement | HTMLTextAreaElement;
  if (e.key === "Enter" && !["TEXTAREA"].includes(target.tagName)) {
    e.preventDefault();
  }
};
