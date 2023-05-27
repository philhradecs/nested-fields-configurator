import { Accordion, useMantineTheme } from "@mantine/core";
import { FieldForm } from "./field-form";

import { EditField } from "./edit-field";
import { Field } from "../types";
import { UseFieldArrayRemove, get, useFormState } from "react-hook-form";
import { useStaticMethods } from "../rule-builder";
import { IconExclamationCircle } from "@tabler/icons-react";

type FieldsAccordionProps = {
  formFields: (Field & { id: string })[];
  remove: UseFieldArrayRemove;
};

export const FieldsAccordion = ({
  formFields,
  remove,
}: FieldsAccordionProps) => {
  const { trigger } = useStaticMethods();

  return (
    <Accordion
      variant="separated"
      onChange={(val) => {
        // trigger form validation on accordion collapse to show error indicators
        if (val === null) {
          setTimeout(trigger, 200)
        }
      }}
    >
      {formFields.map((field, index) => (
        <Accordion.Item value={field.field_key} key={field.id}>
          <AccordionControlWithErrors
            fieldIdx={index}
            remove={formFields.length > 1 ? remove : undefined}
          />
          <Accordion.Panel>
            <FieldForm fieldIdx={index} />
          </Accordion.Panel>
        </Accordion.Item>
      ))}
    </Accordion>
  );
};

type AccordionControlWithErrorsProps = {
  fieldIdx: number;
  remove?: UseFieldArrayRemove;
};

const AccordionControlWithErrors = ({
  fieldIdx,
  remove,
}: AccordionControlWithErrorsProps) => {
  const { control } = useStaticMethods();
  const { errors } = useFormState({ control, name: `formFields.${fieldIdx}` });

  const hasErrors = get(errors, `formFields.${fieldIdx}`);
  const theme = useMantineTheme();

  return (
    <Accordion.Control
      sx={{
        ".mantine-Accordion-chevron": hasErrors ? { transform: "none" } : {},
      }}
      chevron={
        hasErrors ? (
          <IconExclamationCircle size={20} color={theme.colors.red[7]} />
        ) : undefined
      }
    >
      <EditField fieldIdx={fieldIdx} remove={remove} />
    </Accordion.Control>
  );
};
