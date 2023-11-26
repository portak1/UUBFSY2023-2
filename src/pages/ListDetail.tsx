import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { List } from "../common/modules/types/List";
import ShoppingList from "../common/modules/components/ItemList";
import clsx from "clsx";
import { useLists } from "../common/modules/contexts/ListsContext";
import { useList } from "../REST/queries/listQueries";

const ListDetail: React.FC = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { getListById, updateList } = useLists();

  const [list, setList] = useState<List>();

  const { refetch } = useList(params.id as string, {
    onSuccess: (data) => {
      setList(data);
      console.log(data);
    },
  });

  useEffect(() => {
    if (!params.id) return;
    refetch();
  }, [getListById, params.id, refetch]);

  if (!list) {
    return (
      <div className="min-h-[80vh] w-full flex flex-col gap-10 items-center text-center justify-center ">
        <h1 className="text-3xl text-red-600 font-bold">
          Požadovaný list neexistuje
        </h1>
        <button
          className={clsx(
            " mx-auto text-sm py-2 text-gray-800 shadow-lg bg-gray-200 px-3 m-5 rounded-lg w-[150px]"
          )}
          onClick={() => {
            navigate("/");
          }}
        >
          Vrátit se na seznam
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-full flex items-center ">
      <ShoppingList
        mockDataListItem={list}
        setList={(listData) => {
          updateList(list.id, listData as List);
          setList(listData);
        }}
      />
    </div>
  );
};

export default ListDetail;
