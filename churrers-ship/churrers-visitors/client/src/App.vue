<script>
import { ref, onBeforeMount } from 'vue'
let items = [];

export default {
  data() {
    return {
      visitors: []
    }
  },
  created() {
    const getStuff = async () => {
      const response = await fetch('https://hutils.loxal.net/whois');
      const json = await response.json();
      console.log(json);
      const data = {
        country: json.country,
        countryIso: json.countryIso,
        city: json.city,
        postalCode: json.postalCode,
        subdivisionIso: json.subdivisionIso,
        timeZone: json.timeZone,
        ip: json.ip,
        timestamp: new Date().toISOString()
      }

      fetch('https://api.visitors.churrer.ch', {
          method: 'POST',
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(data),
      }).then(data => {
        return data.json();
      }).then(data => {
        console.log(data)
      });  
    }
    getStuff();
    fetch('https://api.visitors.churrer.ch').then(data => {
        return data.json();
      }).then( json => {
        console.log(json)
        this.visitors = json.visitors
      });
  }
}
</script>

<template>
  <main>
    <h1>Visitor Dashboard</h1>
    <br>
    <div class="card" v-for="item in this.visitors" :key="item.id" style="margin: 1rem 0 1rem 0">
      <div class="card-body" style="width: 20rem; height: 8rem">
        <h5 class="card-title">{{item.countryIso}}</h5>
        <h5 class="card-subtitle mb-2 text-body-secondary">{{item.country}}</h5>
        <p>{{item.city}} {{new Date(item.timestamp).toLocaleString()}}</p>
      </div>
    </div>
  </main>
</template>

<style scoped>

</style>
