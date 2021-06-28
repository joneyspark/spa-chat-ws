<template>
  <div class="container">
    <h1>Chat Room</h1>
    <hr />

    <div class="row">
      <div class="col-8">
        <div class="card card-default">
          <div class="card-header">
            <div class="card-body p-0">
              <ul
                class="list-unstyled"
                style="height: 300px; overflow-y:scroll"
              >
                <li
                  class="p-2"
                  v-for="(message, index) in messages"
                  :key="index"
                >
                  <strong>{{ message.user.name }}: </strong>
                  {{ message.message }}
                </li>
              </ul>
            </div>
          </div>
          <input
            @keyup.enter="sendMessage"
            v-model="newMessage"
            type="text"
            name="message"
            placeholder="Enter your message..."
            class="form-control"
          />
        </div>
        <span class="text-muted">user is typing</span>
      </div>
      <div class="col-4">
        <div class="card card-default">
          <div class="card-header">
            <div class="card-body">
              <ul>
                <li class="py-2">JOney</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Request from "../apis/Request";
import User from "../apis/User";
export default {
  data() {
    return {
      messages: [],
      newMessage: "",
      user: null,
    };
  },
  async mounted() {
    await User.auth().then((response) => {
      this.user = response.data;
    });
    console.log(this.user.id);
  },
  created() {
    this.fetchMessages();
    window.Echo.join("chat").listen("MessageSent", (event) => {
      this.messages.push(event.message);
    });
  },
  methods: {
    fetchMessages() {
      Request.GET_REQ("messages").then((response) => {
        this.messages = response.data;
      });
    },
    sendMessage() {
      this.messages.push({
        user: this.user,
        message: this.newMessage,
      });
      const data = {
        user: this.user.id,
        message: this.newMessage,
      };
      Request.POST_REQ(data, "messages");

      this.newMessage = "";
    },
  },
};
</script>
