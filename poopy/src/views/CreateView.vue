<script setup>
import { ref, onMounted } from "vue";
import { supabase } from "../lib/supabaseClient";

function userInsert() {}
</script>
<template>
  <div>
    <h1>create an account!!!!</h1>
    <h2>username</h2>
    <input type="text" />
    <h2>password</h2>
    <input type="text" />
    <h2>confirm password</h2>
    <input type="text" />
    <button>create!!!!</button>
  </div>
</template>

<style scoped>
h1 {
  margin-bottom: 30px;
  font-size: 40px;
}

input {
  margin-bottom: 10px;
}
</style>
