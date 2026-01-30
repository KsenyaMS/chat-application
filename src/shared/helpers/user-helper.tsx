import { UserInfo } from "../../api";

export const getUserInitials = (user: UserInfo) => {
    const parts = [];

    if (user.firstName) {
        parts.push(user.firstName[0]);
    }

    if (user.lastName) {
        parts.push(user.lastName[0]);
    }

    return parts.join('').trim();
}

export const getUserFIO = (user: UserInfo): string => {
    const parts = [];

    if (user.firstName) {
        parts.push(user.firstName + ' ');
    }

    if (user.lastName) {
        parts.push(user.lastName);
    }

    return parts.join('').trim();
}