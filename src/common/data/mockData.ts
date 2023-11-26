import { Item } from "../modules/types/Item";
import { List } from "../modules/types/List";

const mockDataItems: Item[] = [
  {
    id: "1",
    name: "Jablko",
    isCompleted: false,
    itemCount: 50,
  },
  {
    id: "2",
    name: "Hruška",
    isCompleted: false,
    itemCount: 50,
  },
  {
    id: "3",
    name: "Švestka",
    isCompleted: false,
    itemCount: 50,
  },
  {
    id: "4",
    name: "Třešeň",
    isCompleted: false,
    itemCount: 50,
  },
  {
    id: "5",
    name: "Višně",
    isCompleted: false,
    itemCount: 50,
  },
  {
    id: "6",
    name: "Meruňka",
    isCompleted: false,
    itemCount: 50,
  },
  {
    id: "7",
    name: "Rajče",
    isCompleted: false,
    itemCount: 50,
  },
  {
    id: "8",
    name: "Okurka",
    isCompleted: false,
    itemCount: 50,
  },
  {
    id: "9",
    name: "Mrkev",
    isCompleted: false,
    itemCount: 50,
  },
  {
    id: "10",
    name: "Cibule",
    isCompleted: true,
    itemCount: 50,
  },
  {
    id: "11",
    name: "Česnek",
    isCompleted: true,
    itemCount: 50,
  },
  {
    id: "12",
    name: "Paprika",
    isCompleted: true,
    itemCount: 50,
  },
  {
    id: "13",
    name: "Růžičková kapusta",
    isCompleted: false,
    itemCount: 50,
  },
  {
    id: "14",
    name: "Kuřecí maso",
    isCompleted: true,
    itemCount: 50,
  },
  {
    id: "15",
    name: "Vepřové maso",
    isCompleted: true,
    itemCount: 50,
  },
];

const mockDataItems2: Item[] = [
  {
    id: "1",
    name: "Jablko",
    isCompleted: false,
    itemCount: 50,
  },
  {
    id: "2",
    name: "Hruška",
    isCompleted: false,
    itemCount: 50,
  },
 
];

export const mockDataLists: List[] = [
  {
    id: "1",
    items: mockDataItems,
    users: [
      {
        isOwner: true,
        user: {
          id: "8d168ae2-766a-11ee-b962-0242ac120002",
          name: "Jan Port",
        },
      },
    ],
    name: "Pondělní nákup",
  },
  {
    id: "2",
    items: mockDataItems2,
    users: [
      {
        isOwner: true,
        user: {
          id: "8d168ae2-766a-11ee-b962-0242ac120002",
          name: "Jan Port",
        },
        
      },{
          isOwner: false,
          user: {
              id: "f2c0838c-766c-11ee-b962-0242ac120002",
              name: "Jan Mráz",
            },
          
        },
    ],
    name: "Úterní nákup",
  },
]

export const mockDataListItem: List = {
  id: "1",
  items: mockDataItems2,
  users: [
    {
      isOwner: true,
      user: {
        id: "8d168ae2-766a-11ee-b962-0242ac120002",
        name: "Jan Port",
      },
      
    },{
        isOwner: false,
        user: {
            id: "f2c0838c-766c-11ee-b962-0242ac120002",
            name: "Jan Mráz",
          },
        
      },
  ],
  name: "Pondělní nákup",
};
