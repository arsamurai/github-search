const baseURL = 'https://api.github.com/';

export const gitHubApi = {
    getUsers(debouncedSearchTerm?: string) {
        return fetch(`${baseURL}${debouncedSearchTerm ? `search/users?q=${debouncedSearchTerm}+in:user` : `users`}`)
            .then((res: any) => {return res.json()})
    },
    getUser(login: string) {
        return fetch(`${baseURL}users/${login}`)
        .then((res: any) => {return res.json()})
    },
    getRepos(login: string) {
        return fetch(`${baseURL}users/${login}/repos`)
        .then((res: any) => {return res.json()})
    },
}