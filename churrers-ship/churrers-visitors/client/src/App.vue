<script>
export default {
  setup() {
    console.log('%c------------WELCOME DEVELOPER. NOTHING FURTHER TO SEE HERE. BUT THANKS FOR STOPPING BY!!------------', 'color: red; font-size: xx-large');
    console.log('%c------------BUT DO YOU LIKE CATS? I REALLY DO LIKE CATS!!! LET\'S TALK ABOUT CATS!!------------', 'color: blue; font-size: x-large');
  }
}
</script>

<template>
  <div id="site-container">
    <router-view>
    </router-view>
  </div>
</template>

<style scoped>
#site-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
