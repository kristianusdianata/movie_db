import MovieController from "../Controllers/MovieController.js";
import DetailMovieView from "../Views/DetailMovieView.js";
import Pagination from "../Libraries/Pagination/Pagination.js";
import { wrapper_classes } from "../Libraries/ClassName.js";

export default class MovieView extends MovieController{
    constructor(){
        super();
        this.event = `click`;
        this.wrapper = document.querySelector(`.${wrapper_classes().main}`);
    }

    myEvent(button, callback) {
        button.addEventListener(this.event, callback);
    }

    eventCallback = (imdbid) => {
        /* Set callback untuk memanggil detail movie */
        return () => {
            const detail_movie = new DetailMovieView(imdbid);
            return detail_movie.content();
        }
    }

    view(data) {
        return () => {
            let list_content = ``;

            for(let [index, value] of data.entries()) {
                list_content += `
                    <div class="col-md-3 my-4">
                        <div class="card h-100">
                            <img src="${value.Poster}" class="card-img-top img-fluid">
                            <div class="card-body d-flex flex-column justify-content-end">
                                <h5 class="card-title">${value.Title}</h5>
                                <h6 class="card-subtitle mb-2 text-muted">${value.Year}</h6>
                                <a href="#" class="btn btn-danger modal-detail-movie" data-bs-toggle="modal" data-bs-target="#ModalDetailMovie" data-imdbID="${value.imdbID}">Show Details</a>
                            </div>
                        </div>
                    </div>
                `
            }

            return `
                <div class="row content-container">
                    ${list_content}
                </div>
            `
        }
    }

    /*
        Add event callback yang akan dikirim kedalam pagination
    */
    viewEvent() {
        return () => {
            const entries_list = document.querySelectorAll(`.modal-detail-movie`);
            for(let x = 0; x < entries_list.length; x++) {
                const event_button = this.myEvent(entries_list[x], this.eventCallback(entries_list[x].dataset.imdbid));
            }
        }
    }

    myCallback() {
        return async (keyword) => {
            const response = await this.getAllMoviesByType(keyword);
            
            /* Check jika response memberikan pesan error */
            if(response.hasOwnProperty(`error_msg`)) {
                const { error_msg } = response;
                console.error(error_msg);
                return {
                    content : () => alert(error_msg)
                }
            }

            /* Set response value kedalam callback */
            const { data, total_data } = response;
            return {
                content : this.view(data),
                total_data : total_data,
                event : this.viewEvent()
            }
        }
    }

    content = () => {
        return () => {
            const keyword = this.getKeyword();
            /* Panggil pagination */
            const myPagination = new Pagination(this.wrapper, keyword, this.myCallback());
            return myPagination.create();
        }
    }
}