<script setup>
import { RouterLink, RouterView } from "vue-router";
import HelloWorld from "./components/HelloWorld.vue";
</script>

<template>
  <header>
<div class='yes'>
  <div>
    <img
    alt="Vue logo"
    class="logo"
    src="https://logos-download.com/wp-content/uploads/2021/01/Barnes__Noble_Logo-1536x1430.png"
    width="350"
    height="300"
  />
  </div>



  <HelloWorld msg="Boble and Narnse" />


</div>

    <RouterView />
  </header>


</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}



@media (min-width: 1200px) {

}

.yes {
  display: flex;
  justify-content: center;
  margin-top: 40px;
  margin: 50px;
  justify-content: center;
  flex-direction: column;
  text-align: center;
}
</style>
