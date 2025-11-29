import { ActionIcon } from "@mantine/core"
import { ReactElement } from "react";

type IconButtonProps = {
    variant: string,
    ariaLabel?: string,
    icon: ReactElement,
    onClick: () => void,
}

export const IconButton = ({
    variant,
    icon,
    onClick,
    ariaLabel,
}: IconButtonProps) => {
    return <ActionIcon
        variant={variant}
        aria-label={ariaLabel}
        onClick={onClick}
    >
        {icon}
    </ActionIcon>
}