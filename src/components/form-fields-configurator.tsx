import { Button, Container, Divider, Grid, Title } from "@mantine/core";

import testFormFields from "../data/test-data.json";
import { AddFormField } from "./form-field/add-field";
import { FormFieldsAccordion } from "./form-fields-accordion";
import { FormFieldConfiguratorData } from "./types";
import { useForm, useFieldArray, FormProvider } from "react-hook-form";
import { KeyboardEvent } from "react";

export const FormFieldsConfigurator = () => {
  const formMethods = useForm<FormFieldConfiguratorData>({
    defaultValues: { formFields: testFormFields }
  });
  const { handleSubmit, control } = formMethods;

  const { fields, append } = useFieldArray({
    name: "formFields",
    control
  });

  const onSubmit = (data: FormFieldConfiguratorData) => {
    console.log(data);
    window.alert(JSON.stringify(data, null, 2));
  };

  return (
    <Container my={40} size="lg">
      <FormProvider {...formMethods}>
        <form>
          <Grid gutter={80} onKeyDown={preventEnterKeySubmission}>
            <Grid.Col sm={8}>
              <Title order={2} size="h1" mb="lg">
                Builder
              </Title>
              <FormFieldsAccordion formFields={fields} />
            </Grid.Col>
            <Grid.Col sm={4}>
              <Title order={2} size="h1" mb="lg">
                Library
              </Title>
              <AddFormField append={append} />
              <Divider my="xl" />
              <Button
                type="button"
                fullWidth
                size="md"
                mt="xl"
                color="green"
                onClick={handleSubmit(onSubmit)}
              >
                Done
              </Button>
            </Grid.Col>
          </Grid>
        </form>
      </FormProvider>
    </Container>
  );
};

const preventEnterKeySubmission = (e: KeyboardEvent<any>) => {
  const target = e.target as HTMLInputElement | HTMLTextAreaElement;
  console.log(e.key);
  if (e.key === "Enter" && !["TEXTAREA"].includes(target.tagName)) {
    e.preventDefault();
  }
};
