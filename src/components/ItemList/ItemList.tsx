import {IListItem} from "../../types.ts";
import {Item} from "../Item/Item.tsx";

interface IProps {
    items: IListItem[]
    onItemClick: (item: IListItem) => void;
}

export const ItemList = ({items, onItemClick}: IProps) => {
    return (
        <ul>
            {items.map((item, index) => (
                <li key={`${index}-${item.id}`}>
                    <Item item={item} onClick={onItemClick}/>
                </li>
            ))}
        </ul>
    )
}