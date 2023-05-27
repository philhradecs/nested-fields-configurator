import {
  ButtonProps,
  useMantineTheme,
  Box,
  Button,
  Stack,
  Group,
  Text,
} from "@mantine/core";
import { IconCheck } from "@tabler/icons-react";
import { HTMLAttributes } from "react";
import { useFormState } from "react-hook-form";
import { useStaticMethods } from "./rule-builder";

export const FormSubmitButton = (
  props: ButtonProps & HTMLAttributes<HTMLButtonElement>
) => {
  const { control } = useStaticMethods();
  const { isValid, isDirty, isSubmitting } = useFormState({
    control,
  });
  const theme = useMantineTheme();

  return (
    <Box>
      <Button
         size="lg"
        fullWidth
        color="green"
        disabled={!isDirty || !isValid}
        loading={isSubmitting}
        {...props}
      >
        Submit
      </Button>
      {!isDirty && (
        <Stack>
          <Group mt="sm" ml="sm" spacing="xs">
            <IconCheck size={20} color={theme.colors.green[7]} />
            <Text color="green.7">Everything up-to-date</Text>
          </Group>
        </Stack>
      )}
    </Box>
  );
};
