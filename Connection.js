export default class Connection {
    constructor() {
        this.url = `http://www.omdbapi.com/?apikey=84ac0344&`;
    }

    getURL() {
        return this.url;
    }

    checkPromise(url) {
        const myConnection = fetch(url);
        return myConnection.then(response => {
            if(!response.ok) throw new Error(response.statusText);
                return response.json();
            }).then(response => {
                if(response.Response === `False`) throw new Error(response.Error);
                return response;
            });
    }
}