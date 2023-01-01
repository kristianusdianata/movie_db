import Connection from "../Connection.js";

export default class MovieModel extends Connection {
    constructor() {
        super();
    }

    async getMovieResponse(keyword) {
        try {
            const url = `${this.getURL()}${keyword}`;
            const myResponse = await this.checkPromise(url);
            return {
                data : myResponse.Search,
                total_data : myResponse.totalResults
            }
        }catch(err) {
            return {
                error_msg : err
            };
        }
    }
}