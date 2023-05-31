<script setup>
import { ref, onMounted } from "vue";
import { supabase } from "../lib/supabaseClient";
import { RouterLink, RouterView, useRouter } from "vue-router";
import { useCounterStore } from "../stores/counter";

let errorMsg = ref(null);
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
  getUsers();
  let temp = ref(-2);
  let found = true;
  let user = ref(document.getElementById("user").value);
  for (let i = 0; i < users.value.length; i++ && found == true) {
    if (users.value[i].username == user.value) {
      temp.value = i;
      found = false;
    }
  }

  if (temp.value > -1) {
    store.userarri = temp.value;
    store.carttotal = users.value[store.userarri].carttotal;
    store.currentid = users.value[store.userarri].id;
    store.cart = [];
    let tem = [];
    if (users.value[store.userarri].incart.length > 0)
      for (let i = 0; i < users.value[store.userarri].incart.length; i++) {
        users.value[store.userarri].incart[i].replace("/", "");
        tem.push(JSON.parse(users.value[store.userarri].incart[i]));
      }
    store.cart = tem;
    warn.value = 3;
  } else {
    console.log("weird error");
  }
}

async function login2() {
  let user = ref(document.getElementById("user").value);
  let pass = ref(document.getElementById("pass").value);
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: user.value,
      password: pass.value,
    });
    if (error) throw error;
    login();
  } catch (error) {
    errorMsg.value = `Error: ${error.message}`;
    setTimeout(() => {
      errorMsg.value = null;
    }, 5000);
  }
}

getUsers();
getUsers();
</script>

<template>
  <div id="yes">
    <h1>login to our very cool bookstore</h1>
    <h2>email</h2>
    <input type="text" id="user" />
    <h2>password</h2>
    <input type="text" id="pass" class="pword" />

    <button @click="login2">login yay</button>
    <nav v-if="warn == 0">
      <RouterLink to="/create">Create Account</RouterLink>
    </nav>
    <p v-else-if="warn == 1">wrong password loser</p>
    <nav v-else-if="warn == 2">
      <RouterLink to="/create">username not found, make account</RouterLink>
    </nav>
    <nav v-else-if="warn == 3">
      <RouterLink to="/store"
        >Signed in Successfully! Click here to go to store.</RouterLink
      >
    </nav>
    <p v-else></p>
    <p>{{ errorMsg }}</p>
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

#yes {
  justify-content: center;
  flex-direction: column;
  text-align: center;
}

.pword {
  -webkit-text-security: circle;
}
</style>
