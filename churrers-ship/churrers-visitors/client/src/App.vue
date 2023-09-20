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
  <router-view>
  </router-view>
</template>

<style scoped>
body {
  width: 100%;
  height: 100%;
  margin: 0;
}
</style>
