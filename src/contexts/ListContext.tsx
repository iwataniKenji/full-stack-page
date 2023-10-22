import { createContext, ReactNode, useState } from "react";

type ListProps = {
  data: any[];
  total: number;
};

type PaginationProps = {
  skip: number;
  take: number;
};

type ListContextProps = {
  list: ListProps;
  setList: (value: ListProps) => void;
  listFilter: string;
  setListFilter: (value: string) => void;
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;
  pagination: PaginationProps;
  setPagination: (value: PaginationProps) => void;
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
  const [pagination, setPagination] = useState<PaginationProps>({
    skip: 0,
    take: 10,
  });

  const value = {
    list,
    setList,
    listFilter,
    setListFilter,
    isLoading,
    setIsLoading,
    pagination,
    setPagination,
  };

  return (
    <ListContext.Provider value={value}>{props.children}</ListContext.Provider>
  );
}
