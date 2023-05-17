<script setup>
import { ref, onMounted } from "vue";
import { supabase } from "../lib/supabaseClient";

let users = [];

async function getUsers() {
  const { data } = await supabase.from("users").select();
  users.value = data;
}

function userInsert() {
  getUsers();
  let user = ref(document.getElementById("username").value);
  let pass = ref(document.getElementById("password").value);
  let confirm = ref(document.getElementById("confirm_pword").value);

  if (pass.value == confirm.value) {
    console.log(users.value[0].username);
    for (i = 0; i < users.value.length; ) {
      console.log(users.value[i].username);
    }
    console.log("omg");
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
