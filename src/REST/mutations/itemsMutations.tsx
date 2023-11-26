import { useMutation } from "react-query";
import { Item } from "../../common/modules/types/Item";

export const useMutateDeleteItem = () => {
  const deleteList = useMutation({
    mutationKey: "deleteList",
    mutationFn: async (id: string) => {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/list/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
      return res.json();
    },
  });
  return deleteList;
};

export const useMutationCreateItem = () => {
  const createItem = useMutation({
    mutationKey: "createItem",
    mutationFn: async (newItem: Item) => {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/list`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify(newItem),
      });
      return res.json();
    },
  });
  return createItem;
};

export const useMutationUpdateItem = () => {
  const updateItem = useMutation({
    mutationKey: "updateItem",
    mutationFn: async (updatedItem: Item) => {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/list/${updatedItem.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify(updatedItem),
        }
      );
      return res.json();
    },
  });
  return updateItem;
};
