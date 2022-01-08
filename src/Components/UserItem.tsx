import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IUserItem } from "../interfaces";

const UserItem: React.FC<IUserItem> = ({login, avatar_url}) => {
  const [userRepos, setUserRepos] = useState<number>(0);
  const [isLoaded, setLoaded] = useState(false);

  useEffect(() => {
    fetch(`https://api.github.com/users/${login}`)
      .then((res) => res.json())
      .then((result) => {
        setUserRepos(result.public_repos);
        setLoaded(true);
      });
  }, [login]);

  return (
    <Link to={{ pathname: `/user/${login}` }} className="user-item">
      {isLoaded ?
      <>
      <div className="user-item__info">
        <img src={avatar_url} alt="" className="user-item__info-img" />
        <h3 className="user-item__info-login">{login}</h3>
      </div>
      <div className="user-item__repo">
        <span>Repo:</span> 
        <div className="user-item__repo-num">{userRepos}</div>
      </div>
      </> : <p className="loading">Загрузка...</p>}
    </Link>
  );
};

export default UserItem;
