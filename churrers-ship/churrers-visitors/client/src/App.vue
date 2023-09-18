<script>
export default {
  data() {
    return {
      visitors: [],
      countries: [],
      cities: [],
      catFact: "",
      dockerContainers: []
    }
  },
  setup() {
    console.log('%c------------WELCOME DEVELOPER. NOTHING FURTHER TO SEE HERE. BUT THANKS FOR STOPPING BY!!------------', 'color: red; font-size: xx-large');
    console.log('%c------------BUT DO YOU LIKE CATS? I REALLY DO LIKE CATS!!! LET\'S TALK ABOUT CATS!!------------', 'color: blue; font-size: x-large');
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
    });
    fetch('https://api.visitors.churrer.ch/docker-containers').then(data => {
      return data.json();
    }).then(json => {
      console.log(json)
      this.dockerContainers = json;
    });
    fetch('https://catfact.ninja/fact?max_length=100').then(data => {
      return data.json();
    }).then(json => {
      this.catFact = json.fact;
    });
  }
}
</script>

<template>
  <main style="width: 100%; height: 100%">
    <div class="container-xxl" style="width: 100rem">
      <div class="text-center" style="margin: 2rem">
        <h1>Visitor Dashboard</h1>
        <h5 class="text-secondary" style="margin: 1.5rem"><img src="./assets/cat.png" style="height: 28px; width: 28px"/><b>Cat fact of the visit:</b> {{ this.catFact }}</h5>
      </div>
      <br>
      <div class="row">
        <div class="text-center">
          <h2 class="text-secondary">Running Containers</h2>
        </div>
        <div class="col" v-for="item in this.dockerContainers" :key="item.Id">
          <div class="card" style="margin: 1rem 0 1rem 0; height: 8rem">
            <div class="card-body" style="width: 20rem; height: 4rem">
              <h5 class="card-title">{{item.Names[0]}}</h5>
              <h5 class="card-subtitle mb-2 text-body-secondary">{{item.State}}</h5>
              <p>{{item.Status}}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <h2 class="text-secondary">Last 10 Visitors</h2>
          <div class="card" v-for="item in this.visitors" :key="item.id" style="margin: 1rem 0 1rem 0; height: 33rem">
            <img v-bind:src="item.icon" alt="fuck" style="width: 100%; height: 100%"/>
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
