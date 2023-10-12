import { createContext, ReactNode, useState } from "react";

type List = {
  data: any[];
  total: number;
};

type ListStatus = {
  errorMessage?: string;
  isLoading: boolean;
};

type ListContext = {
  list: List;
  setList: (value: List) => void;
  listFilter: string;
  setListFilter: (value: string) => void;
  listStatus: ListStatus;
  setListStatus: (value: ListStatus) => void;
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
  const [listStatus, setListStatus] = useState<ListStatus>({
    errorMessage: undefined,
    isLoading: false,
  });

  const value = {
    list,
    setList,
    listFilter,
    setListFilter,
    listStatus,
    setListStatus,
  };

  return (
    <ListContext.Provider value={value}>{props.children}</ListContext.Provider>
  );
}
