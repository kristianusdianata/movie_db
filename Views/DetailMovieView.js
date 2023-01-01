import DetailMovieController from "../Controllers/DetailMovieController.js";
import { wrapper_classes } from "../Libraries/ClassName.js";
import { loading } from "../Libraries/Handler.js";

export default class DetailMovieView extends DetailMovieController{
    constructor(imdbID){
        super();
        this.imdbID = imdbID;
        this.wrapper = document.querySelector(`.${wrapper_classes().modal}`);
        this.wrapper.innerHTML = loading();
    }

    view(data) {
        return `
            <div class="container-fluid">
                <div class="row">
                    <div class="col-md-3">
                        <img src="${data.Poster}" alt="" class="img-fluid">
                    </div>

                    <div class="col">
                        <ul class="list-group">
                            <li class="list-group-item">${data.Title}</li>
                            <li class="list-group-item"><strong>Director : </strong> ${data.Director}</li>
                            <li class="list-group-item"><strong>Actors : </strong> ${data.Actors}</li>
                            <li class="list-group-item"><strong>Writer : </strong> ${data.Writer}</li>
                            <li class="list-group-item"><strong>Plot : </strong> ${data.Plot}</li>
                        </ul>
                    </div>
                </div>
            </div>`
    }

    async content() {
        const response = await this.getDetailMovie(this.imdbID);

        /* Check jika response memberikan pesan error */
        if(response.hasOwnProperty(`error_msg`)) {
            const { error_msg } = response;
            console.error(error_msg);
            alert(error_msg);
            this.wrapper.innerHTML = ``;
            return;
        }

        /* tampilkan view */
        return this.wrapper.innerHTML = this.view(response);
    }
}