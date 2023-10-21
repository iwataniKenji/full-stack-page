import { createContext, ReactNode, useState } from "react";

type List = {
  data: any[];
  total: number;
};

type ListContext = {
  list: List;
  setList: (value: List) => void;
  listFilter: string;
  setListFilter: (value: string) => void;
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;
};

type ListContextProviderProps = {
  children: ReactNode;
};

export const ListContext = createContext({} as ListContext);

export function ListContextProvider(props: ListContextProviderProps) {
  const [list, setList] = useState<List>({
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
