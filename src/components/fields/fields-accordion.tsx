import { Accordion } from "@mantine/core";
import { FieldsForm } from "./fields-form";

import { EditField } from "./edit-field";
import { Field } from "../types";
import { UseFieldArrayRemove } from "react-hook-form";

type FieldsAccordionProps = {
  formFields: (Field & { id: string })[];
  remove: UseFieldArrayRemove;
};

export const FieldsAccordion = ({
  formFields,
  remove
}: FieldsAccordionProps) => {
  return (
    <Accordion variant="separated">
      {formFields.map((field, index) => (
        <Accordion.Item value={field.field_key} key={field.id}>
          <Accordion.Control>
            <EditField index={index} remove={remove} />
          </Accordion.Control>
          <Accordion.Panel>
            <FieldsForm index={index} />
          </Accordion.Panel>
        </Accordion.Item>
      ))}
    </Accordion>
  );
};

