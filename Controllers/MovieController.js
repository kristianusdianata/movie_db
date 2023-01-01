import MovieModel from "../Models/MovieModel.js";
import {field_classes} from "../Libraries/ClassName.js";

export default class MovieController extends MovieModel{
    constructor() {
        super();
    }

    getKeyword() {
        const keyword_class = field_classes().search;
        const keyword_value = document.querySelector(`.${keyword_class}`).value;
        const keyword_type = document.querySelector(`.nav-link.active`).dataset.type;
        return `type=${keyword_type}&s=${keyword_value}`;
    }

    getAllMoviesByType(keyword) {
        return this.getMovieResponse(keyword);
    }

    getDetailMovie(imdbid) {
        const source = `i=${imdbid}`;
        return this.getDetailMovieResponse(source);
    }
}