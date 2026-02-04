import { Avatar } from "@mantine/core"

type SimpleAvatarProps = {
    link?: string,
    userName?: string,
    color?: string,
    size?: string | number,
}

export const SimpleAvatar = ({
    link,
    userName,
    color,
    size
}: SimpleAvatarProps) => {
    return <>
        {link &&
            <Avatar
                src={link}
                alt="it's me"
                color={color}
                size={size && size}
            />
        }

        {!!userName && !link &&
            <Avatar
                color={color}
                radius="xl"
                size={size && size}
            >
                {userName}
            </Avatar>
        }

        {!link && !userName &&
            <Avatar
                radius="xl"
                color={color}
                size={size && size}
            />
        }
    </>
}