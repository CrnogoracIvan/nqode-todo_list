export interface IListItem {
    id: string;
    title: string;
    description: string;
    dueDate?: string;
    status: 'ACTIVE' | 'COMPLETED';
}

export type TMenuItem = 'ALL' | 'ACTIVE' | 'COMPLETED';