import {IListItem} from "../../types.ts";
import {Item} from "../Item/Item.tsx";

interface IProps {
    items: IListItem[]
}

export const ItemList = ({items}: IProps) => {
    return (
        <ul>
            {items.map(item => (
                <li>
                    <Item itemName={item.title}/>
                </li>
            ))}
        </ul>
    )
}