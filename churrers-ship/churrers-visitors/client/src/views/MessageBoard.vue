<script>
export default {
  data() {
    return {
      messages: [],
      currentMessage: "",
      messagesLength: "",
      messagesAmount: 20
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
      fetch(`https://api.visitors.churrer.ch/messages?length=${this.messagesAmount}`).then(data => {
        return data.json();
      }).then( json => {
        this.messages = json.messages;
      });
    },
    onMessagesAmountChange: function() {
      this.fetchMessages();
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
        <h6 class="text-secondary">Per default the last 20 messages are shown</h6>
        <h6 class="text-secondary">Use "<img style="width: 1.5rem;" src="../assets/windows.jpg"/> + . " for Emojis</h6>
      </div>
      <br>
      <div class="flex-container-row" style="width: 90%">
        <input placeholder="Hello world!" class="form-control" v-model="this.currentMessage" type="text" @keydown.enter="this.onSubmitMessage()" style="width: 80%"/>
        <select v-model="this.messagesAmount" @change="onMessagesAmountChange" class="form-select" style="width: 19.5%; margin-left: 0.5%;">
          <option selected>20</option>
          <option value="30">30</option>
          <option value="40">40</option>
          <option value="50">50</option>
        </select>
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
.flex-container-row {
  display: flex;
  /*flex-direction: column;*/
  flex-flow: row wrap;
  justify-content: center;
  align-items: center;
}
</style>
