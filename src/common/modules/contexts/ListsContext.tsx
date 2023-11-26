import { List } from "../types/List";
import { PropsWithChildren, createContext, useContext, useState } from "react";
import { mockDataLists } from "../../data/mockData";
import { useLists as useListQuery } from "../../../REST/queries/listQueries";

interface IListsContext {
  lists: List[];
  setLists: React.Dispatch<React.SetStateAction<List[]>>;
  getListsByUserId: (userId: string) => List[];
  getListById: (listId: string) => List | undefined;
  updateList: (listId: string, updatedData: Partial<List>) => void;
}

const ListsContext = createContext<IListsContext>({
  lists: [],
  setLists: () => {},
  getListsByUserId: () => [],
  getListById: () => undefined,
  updateList: () => {},
});

export const useLists = () => useContext(ListsContext);

export const ListsProvider: React.FC<PropsWithChildren<{}>> = ({
  children,
}) => {
  const [lists, setLists] = useState<List[]>(mockDataLists);
  useListQuery({
    onSuccess: (data) => {
      setLists(data);
    },
  });

  const getListsByUserId = (userId: string) => {
    return lists.filter((list) =>
      list.users.some((user) => user.user.id === userId)
    );
  };

  const getListById = (listId: string) => {
    return lists.find((list) => list.id === listId);
  };

  const updateList = (listId: string, updatedData: Partial<List>) => {
    setLists((currentLists) =>
      currentLists.map((list) =>
        list.id === listId ? { ...list, ...updatedData } : list
      )
    );
  };

  return (
    <ListsContext.Provider
      value={{ lists, setLists, getListsByUserId, getListById, updateList }}
    >
      {children}
    </ListsContext.Provider>
  );
};
