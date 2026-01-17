import { Menu } from "@mantine/core"
import { ReactElement } from "react";

export type DropdownItem = {
    text: string,
    handleClick: () => void,
    leftIcon?: ReactElement,
    color?: string,
}

export type DropdownListProps = {
    targetButton: ReactElement,
    list: DropdownItem[],
}

export const DropdownList = ({
    targetButton,
    list,
}: DropdownListProps
) => {

    return (
        <Menu
            shadow="md"
            position="bottom-start"
            width={220}
            closeOnClickOutside={true}
            closeOnItemClick={true}
        >
            <Menu.Target>
                {targetButton}
            </Menu.Target>
            <Menu.Dropdown>
                {list.map((item, idx) =>
                    <Menu.Item
                        key={idx}
                        leftSection={item.leftIcon}
                        onClick={item.handleClick}
                        color={item.color}
                    >
                        {item.text}
                    </Menu.Item>
                )}
            </Menu.Dropdown>
        </Menu>
    )
}