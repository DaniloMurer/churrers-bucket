<script>
export default {
  data() {
    return {
      messages: [],
      currentMessage: "",
      messagesLength: ""
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
      fetch('https://api.visitors.churrer.ch/messages?length=20').then(data => {
        return data.json();
      }).then( json => {
        this.messages = json.messages;
      });
    }
  }
}
</script>

<template>
  <main>
    <div class="flex-container" style="width: 100%">
      <div class="text-center" style="margin: 2rem">
        <h1>Message Board - "Talk" to strangers</h1>
        <h5 class="text-secondary">Type message and press 'Enter' key</h5>
        <h6 class="text-secondary">The last 20 messages are shown</h6>
        <h6 class="text-secondary">Use "<img style="width: 1.5rem;" src="../assets/windows.jpg"/> + . " for Emojis</h6>
      </div>
      <br>
      <div style="width: 80%">
        <input placeholder="Hello world!" class="form-control" v-model="this.currentMessage" type="text" @keydown.enter="this.onSubmitMessage()" style="width: 100%"/>
      </div>
      <br>
      <ul class="list-group" style="border: 1rem; width: 90%">
        <li class="list-group-item list-group-item-dark" v-for="item in this.messages"> {{new Date(item.timestamp).toLocaleString()}} - Message: {{ item.message }}</li>
      </ul>
    </div>
  </main>
</template>

<style scoped>
.flex-container {
  display: flex;
  /*flex-direction: column;*/
  flex-flow: column wrap;
  justify-content: center;
  align-items: center;
}
</style>
