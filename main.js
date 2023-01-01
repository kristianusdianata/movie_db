import NavbarView from "./Views/NavbarView.js";
import MovieView from "./Views/MovieView.js";
import { button_classes } from "./Libraries/ClassName.js";

const navbar_ = (() => {
    const navbar_menu = [`Movie`, `Series`];
    const navbar_view = new NavbarView(navbar_menu);
    const show_navbar_menu = navbar_view.content();
})();

const myEvent = (button, btn_event, callback) => {
    return button.addEventListener(btn_event, callback);
}

const movie_ = (() => {
    const btn_trigger = document.querySelector(`.${button_classes().search}`);
    const btn_event = `click`;
    const btn_callback = new MovieView();
    const set_event = myEvent(btn_trigger, btn_event, btn_callback.content());
})();