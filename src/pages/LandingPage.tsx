import React, { useEffect, useState } from "react";
import ShoppingList from "../common/modules/components/ItemList";
import { mockDataListItem } from "../common/data/mockData";
import { List } from "../common/modules/types/List";
import { useNavigate } from "react-router-dom";
import { useUser } from "../common/modules/contexts/UserContext";
const LandingPage: React.FC = () => {
  const { user } = useUser();
  const [list, setList] = useState<List>(mockDataListItem);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [navigate, user]);

  return (
    <div className="min-h-full flex items-center ">
      <ShoppingList mockDataListItem={list} setList={setList} />
    </div>
  );
};

export default LandingPage;
