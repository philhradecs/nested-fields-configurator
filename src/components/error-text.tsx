import { Text } from "@mantine/core";
import { get, useFormState } from "react-hook-form";
import { useStaticMethods } from "./rule-builder";

type ErrorTextProps = {
  path: string;
};

export const ErrorText = ({ path }: ErrorTextProps) => {
  const { control } = useStaticMethods();
  const { errors } = useFormState({ control});
  const error = get(errors, path)?.message;

  return error ? (
    <Text color="red" size="xs">
      {error}
    </Text>
  ) : null;
};
