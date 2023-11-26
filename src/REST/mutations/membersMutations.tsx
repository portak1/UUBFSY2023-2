import { useMutation } from "react-query";
import { User } from "../../common/modules/types/User";

export const useMutateAddNewMember = () => {
  const addNewMember = useMutation({
    mutationKey: "addNewMember",
    mutationFn: async (variables: { newMember: User; listId: string }) => {
      const { newMember, listId } = variables;
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/list/${listId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify(newMember),
        }
      );
      return res.json();
    },
  });
  return addNewMember;
};
export const useDeleteMember = () => {
  const deleteMember = useMutation({
    mutationKey: "deleteMember",
    mutationFn: async (variables: { listId: string; memberId: string }) => {
      const { listId, memberId } = variables;
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/list/${listId}/users/${memberId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
      return res.json();
    },
  });
  return deleteMember;
};
