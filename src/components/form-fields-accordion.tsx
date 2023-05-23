import { Accordion, Box } from "@mantine/core";
import { FieldsForm } from "./field/fields-form";

import { atom } from "jotai";
import { EditField } from "./field/edit-field";
import { Field } from "./types";
import { UseFieldArrayRemove } from "react-hook-form";

export const formFieldDataAtom = atom<Field[]>([]);

type BuilderAccordionProps = {
  formFields: Field[];
  remove: UseFieldArrayRemove;
};

export const FormFieldsAccordion = ({
  formFields,
  remove,
}: BuilderAccordionProps) => {
  return (
    <Box>
      <Accordion variant="separated">
        {formFields.map((field, index) => (
          <Accordion.Item value={field.field_key} key={field.field_key}>
            <Accordion.Control>
              <EditField
                path={`formFields.${index}.field_name`}
                remove={() => remove(index)}
              />
            </Accordion.Control>
            <Accordion.Panel>
              <FieldsForm index={index} />
            </Accordion.Panel>
          </Accordion.Item>
        ))}
      </Accordion>
    </Box>
  );
};
