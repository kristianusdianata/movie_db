import { wrapper_classes } from "../Libraries/ClassName.js";

export default class NavbarView {
    constructor(menu) {
        this.menu = menu;
        this.event = `click`;
        this.wrapper = document.querySelector(`.${wrapper_classes().navbar}`);
    }

    myEvent(button, callback) {
        button.addEventListener(this.event, callback);
    }

    myCallback() {
        const prev_active_tab = document.querySelector(`.nav-link.active`);
        const reset_active = prev_active_tab.classList.remove(`active`);

        const new_active_tab = this.classList.add(`active`); // set new active tab
        const update_header_title = document.querySelector(`#tag-search h1`).innerHTML = `Search ${this.innerText}`; // update header title

        const content_wrapper = document.querySelector(`.${wrapper_classes().main}`);
        const reset_content = content_wrapper.innerHTML = ``;
    }

    content() {
        for(let [index, menu] of this.menu.entries()) {
            const active = index == 0 ? ` active` : ``;
            const child = document.createElement(`a`);
            child.setAttribute(`id`, `${menu.toLowerCase()}`);
            child.setAttribute(`class`, `nav-link${active}`);
            child.setAttribute(`href`, `#`);
            child.setAttribute(`data-type`, `${menu.toLowerCase()}`);
            child.innerText = `${menu.charAt(0).toUpperCase()}${menu.slice(1)}`;

            this.wrapper.appendChild(child);
            const navbar_event = this.myEvent(document.getElementById(`${menu.toLowerCase()}`), this.myCallback);
        }
    }
}