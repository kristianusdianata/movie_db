export default class PaginationData {
    constructor() {
        this.rows_link_page = 5;
        this.rows_per_page = 10;
        this.total_data = 0;
        this.total_page = 0;

        this.current_page = 1;
        this.prev_clicked_page = 1;

        this.source = `page=`;
    }

    getRowsLinkPage() {
        return this.rows_link_page;
    }

    getTotalPage() {
        return this.total_page;
    }

    getPrevClicked() {
        return this.prev_clicked_page;
    }

    getPagingSource() {
        return this.source;
    }

    getCurrPage() {
        return this.current_page;
    }

    getRowsLinkPage() {
        return this.rows_link_page
    }

    setCurrPage(page) {
        this.current_page = page;
    }

    nextPage() {
        this.current_page += 1;
    }

    prevPage() {
        this.current_page -= 1;
    }

    setTotalData(total_data) {
        this.total_data = total_data;
    }

    setTotalPage() {
        this.total_page = Math.ceil(this.total_data / this.rows_per_page);
    }
}