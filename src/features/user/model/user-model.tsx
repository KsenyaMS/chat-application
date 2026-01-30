import { UserInfo, userService } from "../../../api"
import { getUserFIO, getUserInitials } from "../../../shared";
import { UserModel } from "./user-model.types";

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

export const fetchUserList = async (userId: string) => {
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

    return list.filter(item => item.id !== userId);
}