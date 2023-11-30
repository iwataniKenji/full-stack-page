import { createContext, ReactNode, useState } from "react";
import { ListProps } from "../types/ListProps";

type ListContextProps = {
  list: ListProps;
  setList: (value: ListProps) => void;
  listFilter: string;
  setListFilter: (value: string) => void;
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;
};

type ListContextProviderProps = {
  children: ReactNode;
};

export const ListContext = createContext({} as ListContextProps);

export function ListContextProvider(props: ListContextProviderProps) {
  const [list, setList] = useState<ListProps>({
    data: [],
    total: 0,
  });
  const [listFilter, setListFilter] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const value = {
    list,
    setList,
    listFilter,
    setListFilter,
    isLoading,
    setIsLoading,
  };

  return (
    <ListContext.Provider value={value}>{props.children}</ListContext.Provider>
  );
}
