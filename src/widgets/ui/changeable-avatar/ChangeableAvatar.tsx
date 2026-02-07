import { Box } from "@mantine/core";
import { CssComponent, SimpleAvatar } from "../../../shared";
import { ChangeEvent } from "react";
import { UserModel, userModel } from "../../../features";

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
        height: '60px',
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
    userInfo: UserModel,
    handleChange: (userId: string) => Promise<void>,
}

export const ChangeableAvatar = ({
    userInfo,
    handleChange,
}: ChangeableAvatarProps) => {

    const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = async () => {
                try {
                    await userModel.updateUser({ ...userInfo, avatar: reader.result as string });
                    await handleChange(userInfo?.id);
                }
                catch (error) {
                    console.log({ error });
                }
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <Box style={css.contentWrap}>
            <SimpleAvatar
                link={userInfo?.avatar}
                userName={userInfo?.initials}
                size={'lg'}
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