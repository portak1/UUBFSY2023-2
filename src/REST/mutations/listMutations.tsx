import { useMutation } from "react-query";
import { List } from "../../common/modules/types/List";

export const useMutateCreateNewList = () => {
  const createNewList = useMutation({
    mutationKey: "createNewList",
    mutationFn: async (newList: any) => {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/list`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify(newList),
      });
      return res.json();
    },
  });
  return createNewList;
};
export const useMutateUpdateList = () => {
  const updateList = useMutation({
    mutationKey: "updateList",
    mutationFn: async (updatedList: List) => {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/list/${updatedList.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify(updatedList),
        }
      );
      return res.json();
    },
  });
  return updateList;
};

export const useMutateDeleteList = () => {
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
