import {IDummyUserData, IListItem} from "./types.ts";

export const capitalizeFirstLetter = (str: string) =>
    str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

export const getRandomNumber = (to: number) => {
    return Math.floor(Math.random() * (to));
}

export const localStorageSetList = (list: IListItem[]) => {
    localStorage.setItem("list", JSON.stringify(list));
}

export const localStorageGetList = () => {
    const list = localStorage.getItem("list");
    if (!list) {
        return []
    }
    return JSON.parse(list);
}

export const localStorageSetUser = (user: IDummyUserData) => {
    localStorage.setItem("user", JSON.stringify(user));
}

export const localStorageGetUser = () => {
    const user = localStorage.getItem("user");
    if (!user) {
        return null
    }
    return JSON.parse(user);
}

export const getUserId = () => {
    const user = localStorageGetUser();
    if (!user) {
        return null
    }

    return user.id;
}