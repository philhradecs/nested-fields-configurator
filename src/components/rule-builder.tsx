import { Container, Grid, Title } from "@mantine/core";

import testFormFields from "../data/test-data.json";
import { FieldsAccordion } from "./fields/fields-accordion";
import { RulesBuilderFormData } from "./types";
import { useForm, useFieldArray, FormProvider } from "react-hook-form";
import { Sidebar } from "./sidebar";

export const RuleBuilder = () => {
  const formMethods = useForm<RulesBuilderFormData>({
    defaultValues: { formFields: testFormFields }
  });

  const { fields, append, remove } = useFieldArray({
    name: "formFields",
    control: formMethods.control
  });

  const onSubmit = (data: RulesBuilderFormData) => {
    console.log(data);
    window.alert(JSON.stringify(data, null, 2));
  };

  return (
    <Container my={40} size="xl">
      <FormProvider {...formMethods}>
        <form>
          <Grid gutter={120}>
            <Grid.Col sm={7}>
              <Title order={1} mb="lg">
                Builder
              </Title>
              <FieldsAccordion formFields={fields} remove={remove} />
            </Grid.Col>
            <Grid.Col sm={5}>
              <Sidebar append={append} onSubmit={onSubmit} />
            </Grid.Col>
          </Grid>
        </form>
      </FormProvider>
    </Container>
  );
};
