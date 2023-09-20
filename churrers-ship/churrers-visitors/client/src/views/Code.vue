<script>
export default {
  name: "Code",
  data() {
    return {
      imageName: "",
      cmd: ""
    }
  },
  setup() {
    console.log('%c------------WELCOME DEVELOPER. NOTHING FURTHER TO SEE HERE. BUT THANKS FOR STOPPING BY!!------------', 'color: red; font-size: xx-large');
    console.log('%c------------BUT DO YOU LIKE CATS? I REALLY DO LIKE CATS!!! LET\'S TALK ABOUT CATS!!------------', 'color: blue; font-size: x-large');
  },
  created() {},
  methods: {
    onCreateDockerContainer: function() {
      const containerConfig = {
        Image: this.imageName,
        Cmd: this.cmd.split(' ')
      }
      fetch('https://api.visitors.churrer.ch/docker-containers/create', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(containerConfig),
      });
    }
  }
}
</script>

<template>
  <main style="width: 100%; height: 100%">
    <h1>CODE</h1>
    <input class="form-control" v-model="this.imageName" placeholder="Container Image"/>
    <br/>
    <input class="form-control" v-model="this.cmd" placeholder="Container Cmd"/>
    <br>
    <button class="btn-light" type="button" @click="onCreateDockerContainer()">Create Container</button>
  </main>
</template>

<style scoped>
body {
  width: 100%;
  height: 100%;
  margin: 0;
}
</style>
