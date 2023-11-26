import axios from "axios";
import { UseQueryOptions, useQuery } from "react-query";

export const useLists = (
  querySettings:
    | Omit<UseQueryOptions<any, unknown, any, "lists">, "queryKey" | "queryFn">
    | undefined
) => {
  const lists = useQuery(
    "lists",
    async () => {
      const res = await axios(`${process.env.REACT_APP_API_URL}/list`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
      return res.data;
    },
    querySettings
  );
  return lists;
};

export const useList = (
  listId: string,
  querySettings:
    | Omit<
        UseQueryOptions<any, unknown, any, ["list", string]>,
        "queryKey" | "queryFn"
      >
    | undefined
) => {
  const list = useQuery(
    ["list", listId],
    async ({ queryKey }) => {
      const [, listId] = queryKey;

      const res = await axios(
        `${process.env.REACT_APP_API_URL}/list/${listId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
      return res.data;
    },
    {
      ...querySettings,
    }
  );
  return list;
};
