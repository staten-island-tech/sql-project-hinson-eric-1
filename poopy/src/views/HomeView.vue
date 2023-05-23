<script setup>
import { ref, onMounted } from "vue";
import { supabase } from "../lib/supabaseClient";
import { RouterLink, RouterView } from "vue-router";

let users = [];
const books = ref([]);
let warn = ref(0);

async function getBooks() {
  const { data } = await supabase.from("books").select();
  books.value = data;
}
getBooks();

async function getUsers() {
  const { data } = await supabase.from("users").select();
  users.value = data;
}

async function login() {
  let temp = ref(-2)
  let found = true
  let user = ref(document.getElementById("user").value);
  let pass = ref(document.getElementById("pass").value);
  for (let i = 0; i < users.value.length; i++ && found == true) {
    if (users.value[i].username == user.value) {
      temp.value = i;
      found = false;
    }}
  if (temp.value > -1) {
    if (users.value[temp.value].password == pass.value && pass != "") {
      console.log("success")
    } else {
      warn.value = 1
    }
  } else {
    warn.value = 2
  }
}
getUsers()
</script>

<template>
  <div>
    <h1>login to our very cool bookstore</h1>
    <h2>username</h2>
    <input type="text" id="user"/>
    <h2>password</h2>
    <input type="text" id="pass"/>

    <button @click="login">login yay</button>
    <nav>
      <RouterLink to="/create">Create Account</RouterLink>
    </nav>
    <p v-if="warn == 0"></p>
    <p v-else-if="warn == 1">wrong password loser</p>
    <p v-else-if="warn == 2">username not found, make account</p>
    <p v-else></p>
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
