export interface IListItem {
    id: string;
    title: string;
    description: string;
    status: 'ACTIVE' | 'COMPLETED';
}

export type TMenuItem = 'ALL' | 'ACTIVE' | 'COMPLETED';