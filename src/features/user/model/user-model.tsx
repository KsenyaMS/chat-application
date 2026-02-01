import { UserInfo, userService } from "../../../api"
import { getUserFIO, getUserInitials } from "../../../shared";
import { UserModel, UserObj } from "./user-model.types";

const transformForWeb = (userList: UserInfo[]): UserModel[] => {
    return userList.map(user => {
        const imageBlob = user?.avatar;
        let link = '';
        if (imageBlob) {
            const reader = new FileReader();
            reader.readAsDataURL(imageBlob);
            reader.onloadend = () => {
                link = reader.result;
            };
        }
        return {
            ...user,
            FIO: getUserFIO(user),
            initials: getUserInitials(user),
            avatar: link,
        }
    })
}

export const fetchAllUserList = async () => {
    try {
        const listFromLocalStorage = localStorage.getItem('userList');
        let list: UserModel[] = [];

        if (listFromLocalStorage) {
            list = JSON.parse(listFromLocalStorage) ?? []
        }
        else {
            const allList = await userService.getUserList();
            list = transformForWeb(allList);
            localStorage.setItem('userList', JSON.stringify(list));
        }

        return list;
    }
    catch (err) {
        console.log({ err });
    }
}

export const fetchUserList = async (userId: string) => {
    try {
        const list = await fetchAllUserList();

        if (!list?.length)
            return [];

        return list.filter(item => item.id !== userId);
    }
    catch (err) {
        console.log({ err });
    }
}

export const fetchUserDict = async () => {
    try {
        const list = await fetchAllUserList();

        if (!list?.length) {
            return undefined;
        }

        const obj: UserObj = {};
        list.forEach(item => {
            obj[item.id] = item;
        })

        return obj;
    }
    catch (err) {
        console.log({ err });

    }
}