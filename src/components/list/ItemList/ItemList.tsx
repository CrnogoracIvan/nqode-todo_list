import {IListItem} from "../../../types.ts";
import {Item} from "../Item/Item.tsx";

interface IProps {
    items: IListItem[]
    onItemClick: (item: IListItem) => void;
    selectedItem: IListItem | undefined;
}

export const ItemList = ({items, onItemClick, selectedItem}: IProps) => {
    return (
        <ul>
            {items.map((item, index) => (
                <li key={`${index}-${item.id}`}>
                    <Item item={item} onClick={onItemClick} selectedItemId={selectedItem?.id}/>
                </li>
            ))}
        </ul>
    )
}