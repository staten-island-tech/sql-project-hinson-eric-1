<script setup>
import { ref, onMounted } from "vue";
import { supabase } from "../lib/supabaseClient";
let username = ref("");
let password = ref("");
let confirm_pword = ref("");
function userInsert(username, password, confirm_pword) {
  if ((password.value = confirm_pword.value)) {
  }
}
</script>
<template>
  <div>
    <h1>create an account!!!!</h1>
    <h2>username</h2>
    <input type="text" v-model="username.value" />
    <h2>password</h2>
    <input type="text" v-model="password.value" />
    <h2>confirm password</h2>
    <input type="text" v-model="confirm_pword.value" />
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
