import {IDummyDataItem, IDummyUserData} from "../types.ts";

export const mockDummyData: IDummyDataItem[] = [
    {
        "title": "Caramel Latte",
        "description": "Om du gillar latte med en speciell smak kan karamell latte vara det bästa alternativet för att ge dig en upplevelse av den naturliga sötman och krämigheten hos ångad mjölk och karamell.",
        "ingredients": [
            "Espresso",
            "Ångad mjölk",
            "Karamellsirap"
        ],
        "image": "https://images.unsplash.com/photo-1599398054066-846f28917f38?auto=format&fit=crop&q=80&w=1887&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "id": 3
    },
    {
        "title": "Cappuccino",
        "description": "Cappuccino är en latte som är gjord med mer skum än ångad mjölk, ofta med ett strö av kakaopulver eller kanel på toppen. Ibland kan du hitta variationer som använder grädde istället för mjölk eller sådana som tillsätter smakämnen också.",
        "ingredients": [
            "Espresso",
            "Ångad mjölk",
            "Foam"
        ],
        "image": "https://images.unsplash.com/photo-1557006021-b85faa2bc5e2?auto=format&fit=crop&q=80&w=1887&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "id": 4
    },
]

export const mockUsers: IDummyUserData[] = [
    {id: 'user1', name: 'Ivan', password: 'ivan123'},
    {id: 'user2', name: 'Crnogorac', password: 'crnogorac123'},
]