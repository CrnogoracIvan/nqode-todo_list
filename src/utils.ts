import {IListItem} from "./types.ts";

export const capitalizeFirstLetter = (str: string) =>
    str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

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