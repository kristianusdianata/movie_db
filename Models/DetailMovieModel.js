import Connection from "../Connection.js";

export default class DetailMovieModel extends Connection {
    constructor() {
        super();
    }

    async getDetailMovieResponse(source) {
        try{
            const url = `${this.getURL()}${source}`;
            const myResponse = await this.checkPromise(url);
            return myResponse;
        }catch(err) {
            return {
                error_msg : err
            };
        }
    }
}