<script setup>
import { ref, onMounted } from "vue";
import { supabase } from "../lib/supabaseClient";
import { RouterLink, RouterView } from "vue-router";
import { useCounterStore } from "../stores/counter";

let users = [];
const books = ref([]);
let warn = ref(0);
const store = useCounterStore();

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
  let temp = ref(-2);
  let found = true;
  let user = ref(document.getElementById("user").value);
  let pass = ref(document.getElementById("pass").value);
  for (let i = 0; i < users.value.length; i++ && found == true) {
    if (users.value[i].username == user.value) {
      temp.value = i;
      found = false;
      
    }
  }
  if (temp.value > -1) {
    if (users.value[temp.value].password == pass.value && pass != "") {
      store.userarri = temp.value;
      store.carttotal = users.value[store.userarri].carttotal;
      store.currentid = users.value[store.userarri].id;
      let tem = []
      if(users.value[store.userarri].incart.length > 0)
      for (let i = 0; i < users.value[store.userarri].incart.length; i++) {
        users.value[store.userarri].incart[i].replace('/','')
       tem.push(JSON.parse(users.value[store.userarri].incart[i])) 
      } else {

      }
      store.cart = tem
      console.log(store.cart)
    } else {
      warn.value = 1;
    }
  } else {
    warn.value = 2;
  }
}
getUsers();
</script>

<template>
  <div>
    <h1>login to our very cool bookstore</h1>
    <h2>username</h2>
    <input type="text" id="user" />
    <h2>password</h2>
    <input type="text" id="pass" />

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
