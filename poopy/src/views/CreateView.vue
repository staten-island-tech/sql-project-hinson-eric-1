<script setup>
import { ref, onMounted } from "vue";
import { supabase } from "../lib/supabaseClient";
import { RouterLink, RouterView } from "vue-router";

let users = [];
let warn = ref(0);

async function getUsers() {
  const { data } = await supabase.from("users").select();
  users.value = data;
}

async function userInsert() {
  getUsers();
  let user = document.getElementById("username").value;
  let pass = document.getElementById("password").value;
  let confirm = document.getElementById("confirm_pword").value;
  let make = true;

  if (pass == confirm) {
    for (let i = 0; i < users.value.length; i++) {
      if (users.value[i].username == user) {
        console.log("same");
        warn.value = 1;
        make = false;
      }
    }
    if (make) {
      const { error } = await supabase.from("users").insert({
        username: `${user}`,
        carttotal: 0,
        incart: [],
        owned: [],
      });
      warn.value = 2;
      const { data, error2 } = await supabase.auth.admin.createUser({
        email: `${user}`,
        password: `${pass}`,
        options: {
          data: {
            carttotal: 0,
            incart: [],
            owned: [],
          },
        },
      });
      const { data2, error3 } = await supabase.auth.signInWithOtp({
        email: `${user}`,
        options: {
          emailRedirectTo: "http://localhost:3000/",
        },
      });
    }
  } else {
    warn.value = 3;
  }
}

getUsers();
</script>
<template>
  <div id="yes">
    <h1>create an account!!!!</h1>
    <h2>email</h2>
    <input type="text" id="username" />
    <h2>password</h2>
    <input type="text" id="password" class="pword" />
    <h2>confirm password</h2>
    <input type="text" id="confirm_pword" class="pword" />
    <button @click="userInsert">make</button>
    <nav v-if="warn == 0">
      <RouterLink to="/">back to login</RouterLink>
    </nav>
    <p v-else-if="warn == 1">username taken already</p>
    <nav v-else-if="warn == 2">
      <RouterLink to="/">account made succesfully, click to login</RouterLink>
    </nav>
    <p v-else-if="warn == 3">passwords aren't the same</p>
    <p v-else></p>
  </div>
</template>

<style scoped>
.pword {
  -webkit-text-security: circle;
}

h1 {
  margin-bottom: 30px;
  font-size: 40px;
}

#yes {
  justify-content: center;
  flex-direction: column;
  text-align: center;
}
input {
  margin-bottom: 10px;
}
</style>
