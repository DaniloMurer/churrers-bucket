<script>
import {shallowRef} from "vue";

export default {
  name: "Code",
  data() {
    return {
      imageName: "",
      cmd: "",
      code: "let a = 10;\nlet b = 20;\nb-a;",
      codeOutput: "",
      options: {
        automaticLayout: true,
        formatOnType: true,
        formatOnPaste: true,
        readOnly: false
      }
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
    },
    onCompileCode: function() {
      this.codeOutput = this.runCodeInStrictMode(this.code);
    },
    runCodeInStrictMode: function(code) {
      // strict mode makes it safer by not injecting the existing context in the code that is to execute
      return eval(`"use strict";${code}`)
    },
    handleMount: function (editor) {
      editor.value = editor;
    },
    formatCode: function() {
      editorRef.value?.getAction('editor.action.formatDocument').run();
    }
  }
}
</script>

<template>
  <main style="width: 90%">
    <div class="flex-container" style="width: 100%">
      <div class="text-center" style="margin-top: 2rem">
        <h2>Run JavaScript Code</h2>
      </div>
      <vue-monaco-editor
          v-model:value="this.code"
          theme="vs-dark"
          @mount="handleMount"
          language="javascript"
          :options="this.options"
          style="width: 100%; height: 20rem; border-radius: 0.5rem"
      />
      <br>
      <button class="btn" type="button" @click="onCompileCode()" style="background-color: gray; align-self: start">Compile</button>
      <br>
      <div v-if="this.codeOutput !== ''" style="align-self: start; width: 100%">
        <p>Output: </p>
        <textarea v-model="this.codeOutput" style="width: 100%; background-color: #1e1e1e; color: white; border-radius: 0.5rem"/>
      </div>
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
