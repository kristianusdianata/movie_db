import PaginationLink from "./PaginationLink.js";
import { wrapper_classes } from "../ClassName.js";
import {loading} from "../Handler.js";

export default class Pagination extends PaginationLink{
    constructor(wrapper, keyword, callback) {
        super();
        this.wrapper = wrapper;
        this.callback = callback;
        this.keyword = keyword;

        // reset wrapper content
        this.wrapper.innerHTML = ``;

        this.content_wrapper = document.createElement(`div`);
        this.content_wrapper.setAttribute(`class`, `main-content`);
        this.wrapper.appendChild(this.content_wrapper);
    }

    getParentWrapper() {
        return this.wrapper;
    }

    getContentWrapper() {
        return this.content_wrapper;
    }

    getKeyword() {
        return this.keyword;
    }

    getCallback() {
        return this.callback;
    }

    setupPageData({content, total_data, event = ``}) {
        const set_total_data = this.setTotalData(total_data);
        const set_total_page = this.setTotalPage();
        this.content_wrapper.innerHTML = content();
        const content_event = event == `` ? `` : event()
    }

    async create() {
        /* show loading */
        this.content_wrapper.innerHTML = loading();

        const response_callback = await this.callback(this.keyword);

        if(response_callback.hasOwnProperty(`total_data`)) {
            const setup_data = this.setupPageData(response_callback);
            const create_pagination = this.createWrapper();
            return;
        }

        /* Reset content */
        this.wrapper.innerHTML = ``;

        /* Show error notification */
        const { content } = response_callback;
        const error_content = content();
    }
}