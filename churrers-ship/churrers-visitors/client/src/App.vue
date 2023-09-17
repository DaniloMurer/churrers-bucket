<script>
import { ref, onBeforeMount } from 'vue'
let items = [];

export default {
  data() {
    return {
      visitors: [],
      countries: [],
      cities: []
    }
  },
  created() {
    fetch('https://hutils.loxal.net/whois').then(data => {
      return data.json();
    }).then(json => {
      const data = {
        country: json.country,
        countryIso: json.countryIso,
        city: json.city,
        timeZone: json.timeZone,
        timestamp: new Date().toISOString()
      }

      fetch('https://api.visitors.churrer.ch', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data),
      });
    })
    fetch('https://api.visitors.churrer.ch').then(data => {
      return data.json();
    }).then( json => {
      this.visitors = json.visitors
    });
    fetch('https://api.visitors.churrer.ch/countries').then(data => {
      return data.json();
    }).then(json => {
      this.countries = json.countries;
    });
    fetch('https://api.visitors.churrer.ch/cities').then(data => {
      return data.json();
    }).then(json => {
      this.cities = json.cities;
    })
  }
}
</script>

<template>
  <main style="width: 100%; height: 100%">
    <div class="container-xxl" style="width: 100rem">
      <div class="text-center">
        <h1>Visitor Dashboard</h1>
      </div>
      <br>
      <div class="row">
        <div class="col">
          <h2 class="text-secondary">Last 10 Visitors</h2>
          <div class="card" v-for="item in this.visitors" :key="item.id" style="margin: 1rem 0 1rem 0">
            <div class="card-body" style="width: 15rem; height: 8rem">
              <h5 class="card-title">{{item.countryIso}}</h5>
              <h5 class="card-subtitle mb-2 text-body-secondary">{{item.country}}</h5>
              <p>{{item.city}} {{new Date(item.timestamp).toLocaleString()}}</p>
            </div>
          </div>
        </div>
        <div class="col">
          <h2 class="text-secondary">Countries</h2>
          <div class="card" v-for="item in this.countries" :key="item" style="margin: 1rem 0 1rem 0">
            <div class="card-body" style="width: 10rem; height: 3rem">
              <h5 class="card-title">{{item}}</h5>
            </div>
          </div>
        </div>
        <div class="col">
          <h2 class="text-secondary">Cities</h2>
          <div class="card" v-for="item in this.cities" :key="item" style="margin: 1rem 0 1rem 0">
            <div class="card-body" style="width: 10rem; height: 3rem">
              <h5 class="card-title">{{item}}</h5>
            </div>
          </div>
        </div>
      </div>
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
