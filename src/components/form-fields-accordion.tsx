import { Accordion, Box } from "@mantine/core";
import { FieldsForm } from "./form-field/fields-form";

import { atom } from "jotai";
import { EditFormFieldName } from "./form-field/edit-field-name";
import { Field } from "./types";

export const formFieldDataAtom = atom<Field[]>([]);

type BuilderAccordionProps = {
  formFields: Field[];
};

export const FormFieldsAccordion = ({ formFields }: BuilderAccordionProps) => {
  return (
    <Box>
      <Accordion variant="separated">
        {formFields.map((field, idx) => (
          <Accordion.Item value={field.field_key} key={field.field_key}>
            <Accordion.Control>
              <EditFormFieldName index={idx} />
            </Accordion.Control>
            <Accordion.Panel>
              <FieldsForm index={idx} />
            </Accordion.Panel>
          </Accordion.Item>
        ))}
      </Accordion>
    </Box>
  );
};


