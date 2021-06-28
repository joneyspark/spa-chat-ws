/* eslint-disable prettier/prettier */
import Vue from "vue";
import App from "./App.vue";
import router from "./router";

import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import Echo from "laravel-echo";
import Request from "./apis/Request";

window.Pusher = require("pusher-js");

window.Echo = new Echo({
  broadcaster: "pusher",
  key: process.env.VUE_APP_WEBSOCKETS_KEY,
  wsHost: process.env.VUE_APP_WEBSOCKETS_SERVER,
  wsPort: 6001,
  forceTLS: false,
  disableStats: true,
  enabledTransports: ["ws", "wss"],
  authorizer: (channel, options) => {
    console.log("OPTIONS>>", options);
    return {
      authorize: (socketId, callback) => {
        Request.POST_REQ("/broadcasting/auth", {
          socket_id: socketId,
          channel_name: channel.name,
          withCredentials: true,
        })
          .then((response) => {
            callback(false, response.data);
            console.log("RESPONSE>>", response);
          })
          .catch((error) => {
            callback(true, error);
          });
      },
    };
  },
});

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
