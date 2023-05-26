import { Box, Container, Grid, Title } from "@mantine/core";

import testFormFields from "../data/test-data.json";
import { FieldsAccordion } from "./fields/fields-accordion";
import { RulesBuilderFormData } from "./types";
import { useForm, useFieldArray, UseFormReturn } from "react-hook-form";
import { Sidebar } from "./sidebar";
import { createContext, useContext, useEffect } from "react";

type StaticMethods = Pick<
  UseFormReturn<RulesBuilderFormData>,
  "control" | "getValues" | "register" | "setValue" | "trigger"
>;

const StaticMethodsContext = createContext<StaticMethods>({} as StaticMethods);
export const useStaticMethods = () => useContext(StaticMethodsContext);

export const RuleBuilder = () => {
  const {
    control,
    getValues,
    register,
    setValue,
    trigger,
    watch,
    handleSubmit,
  } = useForm<RulesBuilderFormData>({
    defaultValues: { formFields: testFormFields },
    mode: "onBlur",
  });

  const { fields, append, remove } = useFieldArray({
    name: "formFields",
    control,
  });

  const onSubmit = (data: RulesBuilderFormData) => {
    console.log("Success!", data);
  };

  useEffect(() => {
    const subscription = watch((_, change) => {
      change.type && console.log(change.type, change.name);
    });
    return subscription.unsubscribe;
  }, [watch]);

  return (
    <Container my={40} size="xl">
      <StaticMethodsContext.Provider
        value={{ control, register, getValues, setValue, trigger }}
      >
        <form>
          <Grid gutter={120}>
            <Grid.Col sm={7}>
              <Title order={1} mb="lg">
                Rule Builder
              </Title>
              <FieldsAccordion formFields={fields} remove={remove} />
            </Grid.Col>

            <Grid.Col sm={5}>
              <Box pos="sticky" top={40}>
                <Sidebar
                  append={append}
                  onSubmit={handleSubmit(onSubmit, (error) =>
                    console.warn("Errors!", error)
                  )}
                />
              </Box>
            </Grid.Col>
          </Grid>
        </form>
      </StaticMethodsContext.Provider>
    </Container>
  );
};
