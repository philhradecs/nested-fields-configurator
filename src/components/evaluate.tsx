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
  useMantineTheme,
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

  const defaultJson = JSON.stringify(
    Object.fromEntries(
      evaluationFields.map((field: Field, idx) => [
        field.field_key,
        `option_${idx + 1}`,
      ])
    ),
    null,
    2
  );

  const [fieldDataJson, setFieldDataJson] = useState<string>(defaultJson);

  const results = useMemo<boolean[] | null>(() => {
    const evaluationRules =
      evaluationFields.find((field: Field) => field.field_key === selectedField)
        ?.rules || [];
    try {
      const parsedData = JSON.parse(fieldDataJson);
      return evaluateRules(parsedData, evaluationRules);
    } catch (e) {
      return null;
    }
  }, [evaluationFields, fieldDataJson, selectedField]);

  const hasMatches = results && results.filter(Boolean).length > 0;

  const fieldOptions = evaluationFields.map((field: Field) => ({
    value: field.field_key,
    label: `${field.field_name} Rules`,
  }));

  const theme = useMantineTheme();

  return (
    <Box>
      <Group position="right">
        <Button
          ml="auto"
          mb='xs'
          variant="subtle"
          size="xs"
          compact
          onClick={() => setFieldDataJson(defaultJson)}
        >
          Get default data
        </Button>
      </Group>
      <JsonInput

        validationError={results ? null : "Invalid JSON"}
        styles={{
          input: {
            background: hasMatches
              ? theme.fn.rgba(theme.fn.themeColor("teal"), 0.25)
              : theme.fn.rgba(theme.fn.themeColor("pink"), 0.25),
          },
        }}
        size="lg"
        autosize
        minRows={8}
        value={fieldDataJson}
        onChange={setFieldDataJson}
      />
      <Select
        mt="md"
        size="lg"
        value={selectedField}
        onChange={setSelectedField}
        data={fieldOptions}
        placeholder="Select field"
      />
      {results && (
        <Box mt={32}>
          <EvaluationResults results={results} />
        </Box>
      )}
    </Box>
  );
};

type EvaluationResultsProps = {
  results: boolean[];
};
const EvaluationResults = ({ results }: EvaluationResultsProps) => {
  return (
    <Stack>
      <Group>
        <Title order={3}>Matching Rules</Title>
        <Text weight="normal" size="xl">
          {results.filter(Boolean).length} / {results.length}
        </Text>
      </Group>
      <Group>
        {results.map((match, idx) => (
          <Badge
            key={idx}
            variant="filled"
            radius="sm"
            size="lg"
            color={match ? "teal.9" : "pink.9"}
          >
            Rule {idx + 1}
          </Badge>
        ))}
      </Group>
    </Stack>
  );
};
