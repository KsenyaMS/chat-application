import { Avatar } from "@mantine/core"

type SimpleAvatarProps = {
    link?: string,
    userName?: string,
    color?: string,
}

export const SimpleAvatar = ({
    link,
    userName,
    color
}: SimpleAvatarProps) => {
    return <>
        {link &&
            <Avatar
                src="avatar.png"
                alt="it's me"
                color={color}
            />
        }

        {!!userName && !link &&
            <Avatar
                color={color}
                radius="xl"
            >
                {userName}
            </Avatar>
        }

        {!link && !userName && <Avatar radius="xl" color={color} />}
    </>
}