import { ActionIcon, ActionIconProps } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";
import { HTMLAttributes } from "react";

export const RemoveButton = (props: ActionIconProps & HTMLAttributes<HTMLButtonElement>) => {
  return (
    <ActionIcon color="pink.6" {...props}>
      <IconTrash stroke={1.5} size={16} />
    </ActionIcon>
  );
};
