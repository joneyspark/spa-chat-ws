import Api from "./Api";
import Csrf from "./Csrf";

export default {
    async GET_REQ(url) {
        await Csrf.getCookie();
        return Api.get(url);
    },
    async POST_REQ(form, url) {
        await Csrf.getCookie();
        return Api.post(url, form);
    },
}