import React, { useEffect, useState } from "react";
import { gitHubApi } from "../api";
import SearchForm from "../Components/SearchForm";
import UserItem from "../Components/UserItem";
import useDebounce from "../hoc/useDebounce";
import { IUserItem } from "../interfaces";

const Users: React.FC = () => {
  const [users, setUsers] = useState<IUserItem[]>([]);
  const [isLoaded, setLoaded] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>('');

  const debouncedSearchTerm = useDebounce(searchValue, 500);

  useEffect(() => {
      gitHubApi.getUsers(debouncedSearchTerm)
      .then((result) => {
        setUsers(result.items ? result.items : result);
        setLoaded(true);
      });
  }, [debouncedSearchTerm]);

  return (
    <div className="wrapper">
      <div className="users">
        <h2 className="users__title title">Github Searcher</h2>
        <SearchForm setSearchValue={setSearchValue} searchText="Users" />
        <div className="users__items">
          {isLoaded ? (
              users.map((item, index) => {
              return (
                <UserItem
                  key={index}
                  login={item.login}
                  avatar_url={item.avatar_url}
                />
              );
            })
          ) : (
            <p className="loading">Загрузка...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Users;
