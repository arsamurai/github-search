import React from 'react'
import { IReposInfo } from '../interfaces';

const RepoItem: React.FC<IReposInfo> = ({name, forks, watchers, html_url}) => {
    
    return (
        <a href={html_url} target="_blank" rel="noreferrer" className="repo-item">
            <div className="repo-item__name">{name}</div>
            <div className="repo-item__info">
            <div className="repo-item__info-item"><span className="repo-item__info-title">Forks: </span> <span className="repo-item__info-value">{forks}</span></div>
            <div className="repo-item__info-item"><span className="repo-item__info-title">Watchers: </span> <span className="repo-item__info-value">{watchers}</span></div>
            </div>
        </a>
    )
}

export default RepoItem;
