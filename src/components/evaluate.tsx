import {
  Badge,
  Box,
  Button,
  Group,
  JsonInput,
  Select,
  Stack,
  Text,
  Title,
  useMantineTheme
} from "@mantine/core";
import { Field, RulesBuilderFormData } from "./types";
import { useFormContext } from "react-hook-form";
import { useMemo, useState } from "react";
import { evaluateRules } from "../util/evaluate-rules";

export const Evaluate = () => {
  const { watch } = useFormContext<RulesBuilderFormData>();
  const evaluationFields = watch("formFields");

  const [selectedField, setSelectedField] = useState<string | null>(
    evaluationFields[0].field_key
  );

  const evaluationRules =
    evaluationFields.find((field: Field) => field.field_key === selectedField)
      ?.rules || [];

  const defaultJson = JSON.stringify(
    Object.fromEntries(
      evaluationFields.map((field: Field, idx) => [
        field.field_key,
        `value_${idx + 1}`
      ])
    ),
    null,
    2
  );

  const [fieldDataJson, setFieldDataJson] = useState<string>(defaultJson);

  const validatedFieldData = useMemo<Record<string, any>>(() => {
    try {
      return JSON.parse(fieldDataJson);
    } catch (e) {
      return null;
    }
  }, [fieldDataJson]);

  const results = validatedFieldData
    ? evaluateRules(validatedFieldData, evaluationRules)
    : [];
  const matches = results.filter(Boolean);

  const fieldOptions = evaluationFields.map((field: Field) => ({
    value: field.field_key,
    label: `${field.field_name} Rules`
  }));

  const theme = useMantineTheme();

  return (
    <Stack>
      <JsonInput
        labelProps={{ display: "block" }}
        label={
          <Group position="apart" sx={{ flex: 1 }}>
            <Text>Field Data</Text>
            <Button
              variant="subtle"
              compact
              size="xs"
              onClick={() => setFieldDataJson(defaultJson)}
            >
              Get default data
            </Button>
          </Group>
        }
        validationError={!validatedFieldData ? "Invalid JSON" : null}
        styles={{
          input: {
            background:
              matches.length > 0
                ? theme.fn.rgba(theme.fn.themeColor("teal"), 0.25)
                : theme.fn.rgba(theme.fn.themeColor("pink"), 0.25)
          }
        }}
        size="lg"
        autosize
        minRows={8}
        value={fieldDataJson}
        onChange={setFieldDataJson}
      />
      <Group spacing="lg">
        <Select
          label="Rules"
          size="lg"
          w="100%"
          value={selectedField}
          onChange={setSelectedField}
          data={fieldOptions}
          placeholder="Select field"
        />
        {validatedFieldData && (
          <Box>
            <Title order={3} mt="md" mb="xs">
              Result
            </Title>
            <Group>
              {results.map((match, idx) => (
                <Badge
                  key={idx}
                  variant="filled"
                  radius="sm"
                  size="xl"
                  color={match ? "teal.9" : "pink.9"}
                >
                  Rule {idx + 1}
                </Badge>
              ))}
            </Group>
          </Box>
        )}
      </Group>
    </Stack>
  );
};
