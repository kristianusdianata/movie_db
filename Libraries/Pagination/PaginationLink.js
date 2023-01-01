import PaginationData from "./PaginationData.js";
import {loading} from "../Handler.js";

export default class PaginationLink extends PaginationData {
    constructor() {
        super();
        this.next = `Next`;
        this.prev = `Previous`;
        this.link_id = `link-`;
        this.active_page = `active`;
        this.link_text = [];
        for(let x = 0; x < this.getRowsLinkPage(); x++) {
            this.link_text.push(x+1);
        }
    }

    createWrapper() {
        const parent_wrapper = this.getParentWrapper();
        const child = document.createElement(`nav`);
        child.setAttribute(`aria-label`, `Page navigation example`);
        // child.setAttribute(`class`, `text-danger`)
        parent_wrapper.appendChild(child);
        const link_content = this.linkContent(child);
    }

    linkContent(wrapper) { 
        const child = document.createElement(`ul`);
        child.setAttribute(`class`, `pagination  justify-content-center`);
        wrapper.appendChild(child);
        const content_data = this.contentData(child);
    }

    contentData(wrapper) {
        const display = this.displayContent();

        if(this.getTotalPage() <=this.getRowsLinkPage() ) {
            for(let x = 0; x < this.getTotalPage(); x++) {
                const link_button = this.content(wrapper, display.main_, this.link_text[x]);
            }
            return;
        }

        const prev_button =  this.content(wrapper, display.prev_, this.prev)

        for(let x = 0; x < this.getRowsLinkPage(); x++) {
            const link_button = this.content(wrapper, display.main_, this.link_text[x]);
        }

        const next_button =  this.content(wrapper, display.next_, this.next);
    }

    displayContent() {
        let prev = `block`;
        let next = `block`;
        const main = `block`;

        if(this.getCurrPage() == 1) {
            prev = `none`;
            next = `block`;
        }

        if(this.getCurrPage() == this.getTotalPage()) {
            prev = `block`;
            next = `none`;
        }

        return {
            prev_ : prev,
            next_ : next,
            main_ : main
        }
    }

    content(wrapper, display, text) {
        const child = document.createElement(`li`);
        child.setAttribute(`class`, `page-item`);
        child.setAttribute(`style`, `display:${display}`);
        const child_content = `<a id="link-${text}" class="page-link${this.getPrevClicked() == text ? ` ${this.active_page}` : ""} text-danger" href="#">${text}</a>`;
        child.innerHTML = child_content;
        wrapper.appendChild(child);

        const event = this.contentEvent(document.getElementById(`link-${text}`));
    }

    contentEvent(button) {
        button.addEventListener(`click`, async (e) => {
            /* start loading */
            this.getContentWrapper().innerHTML = loading();

            if(e.target.id == `${this.link_id}${this.next}`) this.nextPage();
            else if(e.target.id == `${this.link_id}${this.prev}`) this.prevPage();
            else this.setCurrPage(parseInt(e.target.innerText));

            /* update link text and link id */
            const update_button_link = this.updateLinkText();

            const source = `${this.getPagingSource()}${this.getCurrPage()}`;
            const keyword = `${this.getKeyword()}&${source}`;

            const callback = this.getCallback();
            const response_callback = await callback(keyword);
            const setup_data = this.setupPageData(response_callback);

            const check_visible_button = (button, display) => {
                if(button) {
                    const parent_button = button.parentElement;
                    return parent_button.setAttribute(`style`, `display : ${display}`);
                }
            }

            /* set display prev and next button */
            const display =  this.displayContent();
            const prev_button = check_visible_button(document.getElementById(`${this.link_id}${this.prev}`), display.prev_);
            const next_button = check_visible_button(document.getElementById(`${this.link_id}${this.next}`), display.next_);

            /* set active class */
            const prev_active_button = document.getElementById(`${this.link_id}${this.prev_clicked_page}`);
            const remove_active_class = prev_active_button.classList.remove(`${this.active_page}`);
            const set_active_class = document.getElementById(`${this.link_id}${this,this.current_page}`);

            set_active_class.classList.add(`${this.active_page}`);

            /* set new prev_clicked_page value */
            this.prev_clicked_page = this.current_page;
        })
    }

    updateLinkText() {
        const last_link_text = this.link_text.slice(this.link_text.length - 1);
        const first_link_text = this.link_text.slice(0,1)

        /* change link text */
        if(this.getCurrPage() > last_link_text[0]) {
            this.link_text = this.link_text.map(link_page => link_page + 1);
        }

        if(this.getCurrPage() < first_link_text[0]) {
            this.link_text = this.link_text.map(link_page => link_page - 1);
        }
        /* end of change link text */

        /* change link id */
        const link_button = document.querySelectorAll(`.page-link`);
        let x = 0;
        for(let button of link_button) {
            if(button.innerText != this.prev && button.innerText != this.next) {
                button.setAttribute(`id`, `${this.link_id}${this.link_text[x]}`);
                button.innerHTML = this.link_text[x];
                x++;
            }
        }
        /* end of change link id */
    }
}