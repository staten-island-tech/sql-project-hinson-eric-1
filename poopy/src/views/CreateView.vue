<script setup>
import { ref, onMounted } from "vue";
import { supabase } from "../lib/supabaseClient";

let users = [];
let success = ref(true);
let failure = ref(true);

async function getUsers() {
  const { data } = await supabase.from("users").select();
  users.value = data;
}

async function userInsert() {
  getUsers();
  let user = (document.getElementById("username").value);
  let pass = (document.getElementById("password").value);
  let confirm = (document.getElementById("confirm_pword").value);

  if (pass.value == confirm.value) {
    let make = true;
    for (let i = 0; i < users.value.length; i++) {
      if (users.value[i].username == user.value) {
        make = false;
        failure = !failure;
      }
    }
    if (make) {
      success = !success;
      const { error } = await supabase
        .from("users")
        .insert({ username: `${user}`, password: `${pass}`, carttotal: 0, incart: [], owned: []  });

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
    <p v-if="success"></p>
    <p v-else>account made succesfully!!</p>
    <p v-if="failure"></p>
    <p v-else>username taken already D:</p>
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
