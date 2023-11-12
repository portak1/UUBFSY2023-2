import React, { createContext, useContext, ReactNode, useState } from "react";
import { User } from "../types/User";

interface UserContextProps {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>({
    id: "8d168ae2-766a-11ee-b962-0242ac120002",
    name: "Jan Port",
    email: "honzaport@seznam.cz",
  });

  const login = (newUser: User) => {
    setUser(newUser);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
