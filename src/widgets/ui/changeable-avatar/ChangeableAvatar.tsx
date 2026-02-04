import { Box } from "@mantine/core";
import { CssComponent, SimpleAvatar } from "../../../shared";
import { ChangeEvent } from "react";

const css: CssComponent = {
    contentWrap: {
        padding: 0,
        margin: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
    },
    input: {
        height: '100px',
        width: '100px',
        cursor: 'pointer',
        border: 0,
        padding: 0,
        overflow: 'hidden',
        whiteSpace: 'nowrap',

        opacity: 0,
        position: 'absolute',
    }
}

type ChangeableAvatarProps = {
    avatar?: string,
    initials?: string,
    handleAvatarChange: (event: ChangeEvent<HTMLInputElement>) => void,
}

export const ChangeableAvatar = ({
    avatar,
    initials,
    handleAvatarChange,
}: ChangeableAvatarProps) => {
    return (
        <Box style={css.contentWrap}>
            <SimpleAvatar
                link={avatar}
                userName={initials}
                size={'xl'}
            />
            <input
                type="file"
                accept="image/*"
                style={css.input}
                onChange={handleAvatarChange}
            />
        </Box>
    )
}