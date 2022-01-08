import React, { useEffect, useState } from "react";
import { gitHubApi } from "../api";
import RepoItem from "../Components/RepoItem";
import SearchForm from "../Components/SearchForm";
import useDebounce from "../hoc/useDebounce";
import { IReposInfo } from "../interfaces";

interface IUserProps {
  login: string
}

interface IUserInfo {
  login: string,
  avatar_url: string,
  location: string,
  email: string,
  created_at: string,
  followers: number,
  following: number,
  bio?: string,
}

const User: React.FC<IUserProps> = ({ login }) => {
  const [user, setUser] = useState<IUserInfo | undefined>(undefined);
  const [repos, setRepos] = useState<IReposInfo[]>([]);
  const [isLoaded, setLoaded] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const debouncedSearchTerm = useDebounce(searchValue, 500);

  useEffect(() => {
      gitHubApi.getUser(login)
      .then((result) => {
        setUser(result);
        setLoaded(true);
      });
  }, [login]);

  useEffect(() => {
      gitHubApi.getRepos(login)
      .then((result) => {
        setRepos(result);
      });
  }, [login, debouncedSearchTerm]);

  const filteredRepos = repos && repos.filter(item => {
    return item.name.toLowerCase().startsWith(debouncedSearchTerm.trim().toLowerCase());
  })

  return (
    <div className="wrapper">
      <div className="user">
        <h2 className="user__title">Github Searcher</h2>
        {isLoaded ? (
          <div className="user-inner">
            <div className="user-info">
              <img src={user!.avatar_url} alt="" className="user-info__img" />
              <div className="user-info__main">
                <div className="user-info__name">
                  <span className="user__subtitle">Login: </span>
                  {user!.login}
                </div>
                {user!.location && (
                  <div className="user-info__location">
                    <span className="user__subtitle">Location: </span>
                    {user!.location}
                  </div>
                )}
                {user!.email && (
                  <div className="user-info__mail">
                    <span className="user__subtitle">Email: </span>
                    {user!.email}
                  </div>
                )}
                <div className="user-info__joindate">
                  <span className="user__subtitle">Join Date: </span>
                  {user!.created_at}
                </div>
                <div className="user-info__followers">
                  {" "}
                  <span className="user__subtitle">Followers: </span>{" "}
                  {user!.followers}
                </div>
                <div className="user-info__following">
                  <span className="user__subtitle">Following: </span>
                  {user!.following}
                </div>
              </div>
            </div>
            {user?.bio && (
              <div className="user-bio">
                <span className="user__subtitle">Bio: </span>
                {user?.bio}
              </div>
            )}
            <SearchForm setSearchValue={setSearchValue}  searchText="Repos" />
            {filteredRepos[0] && filteredRepos.map((item, index) => {
                return (
                  <RepoItem
                    key={index}
                    {...item}
                  />
                );
            })}
          </div>
        ) : (
          <p className="loading">Загрузка...</p>
        )}
      </div>
    </div>
  );
}

export default User;
