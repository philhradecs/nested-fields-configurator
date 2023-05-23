import { ActionIcon, ActionIconProps } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";

import { forwardRef } from "react";
import { createPolymorphicComponent } from "@mantine/core";

const _RemoveButton = forwardRef<HTMLButtonElement, ActionIconProps>(
  ({ children, ...others }, ref) => (
    <ActionIcon color="pink.6" component="button" ref={ref} {...others}>
      <IconTrash stroke={1.5} size={16} />
    </ActionIcon>
  )
);

// createPolymorphicComponent accepts two types: default element and component props// all other props will be added to component type automatically
export const RemoveButton = createPolymorphicComponent<
  "button",
  ActionIconProps
>(_RemoveButton);
