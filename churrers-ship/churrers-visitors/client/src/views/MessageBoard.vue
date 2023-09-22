<script>
export default {
  data() {
    return {
      messages: [],
      currentMessage: ""
    }
  },
  created() {
    this.fetchMessages();
  },
  methods: {
    onSubmitMessage: function () {
      const data = {
        timestamp: new Date().toISOString(),
        message: this.currentMessage
      }
      fetch('https://api.visitors.churrer.ch/messages', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data),
      }).then( d => {
        this.fetchMessages();
      })
    },
    fetchMessages: function() {
      fetch('https://api.visitors.churrer.ch/messages?length=15').then(data => {
        return data.json();
      }).then( json => {
        this.messages = json.messages;
      });
    }
  }
}
</script>

<template>
  <main style="width: 100%; height: 100%">
    <div class="container" style="width: 100rem">
      <div class="text-center" style="margin: 2rem">
        <h1>Message Board</h1>
        <h5 class="text-secondary">Type message and press 'Enter' key</h5>
        <h6 class="text-secondary">The last 15 messages are shown</h6>
      </div>
      <br>
      <div>
        <input placeholder="Hello world!" class="form-control" v-model="this.currentMessage" type="text" @keydown.enter="this.onSubmitMessage()"/>
      </div>
      <br>
      <ul class="list-group" style="border: 1rem">
        <li class="list-group-item list-group-item-dark" v-for="item in this.messages"> {{new Date(item.timestamp).toLocaleString()}} - Message: {{ item.message }}</li>
      </ul>
    </div>
  </main>
</template>

<style scoped>
body {
  width: 100%;
  height: 100%;
  margin: 0;
}
</style>
