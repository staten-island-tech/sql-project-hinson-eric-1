<script setup>
import { ref, onMounted } from "vue";
import { supabase } from "../lib/supabaseClient";

let users = [];
let success = ref(false);
let failure = ref(false);

async function getUsers() {
  const { data } = await supabase.from("users").select();
  users.value = data;
}

async function userInsert() {
  getUsers();
  let user = ref(document.getElementById("username").value);
  let pass = ref(document.getElementById("password").value);
  let confirm = ref(document.getElementById("confirm_pword").value);

  if (pass.value == confirm.value) {
    let make = true;
    for (let i = 0; i < users.value.length; i++) {
      if (users.value[i].username == user.value) {
        make = false;
        failure = !failure;
      }
    }
    if (make) {
      const { error } = await supabase
        .from("users")
        .insert({ username: `${user.value}`, password: `${pass.value}` });
      success = !success;
    }
  }
}
getUsers();
</script>
<template>
  <div>
    <h1>create an account!!!!</h1>
    <h2>username</h2>
    <input type="text" id="username" />
    <h2>password</h2>
    <input type="text" id="password" />
    <h2>confirm password</h2>
    <input type="text" id="confirm_pword" />
    <button @click="userInsert">make</button>
    <p v-if="success">account made succesfully!!</p>
    <p v-if="failure">username taken already :(</p>
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
