import { Button, useMantineColorScheme, useMantineTheme } from "@mantine/core"
import { CssComponent } from "../../model";

const css: CssComponent = {
    linkButton: {
        background: 'rgba(0, 0, 0, 0)',
        border: 'none',
        padding: 0,
        margin: 0,
    },
}

type LinkButtonProps = {
    handleClick: () => void,
    name: string,
}

export const LinkButton = ({ handleClick, name }: LinkButtonProps) => {
    const mantineTheme = useMantineTheme();
    const { colorScheme } = useMantineColorScheme();

    return (
        <Button
            onClick={handleClick}
            style={{
                ...css.linkButton,
                color: mantineTheme.colors.textColor[colorScheme],
            }}
        >
            {name}
        </Button>
    )
}