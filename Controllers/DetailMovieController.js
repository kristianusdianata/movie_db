import DetailMovieModel from "../Models/DetailMovieModel.js";

export default class DetailMovieController extends DetailMovieModel{
    constructor() {
        super();
    }

    getDetailMovie(imdbid) {
        const source = `i=${imdbid}`;
        return this.getDetailMovieResponse(source);
    }
}