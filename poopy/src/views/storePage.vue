<script setup>
import { nextTick, ref, onMounted } from "vue";
import { supabase } from "../lib/supabaseClient";
import { RouterLink, RouterView } from "vue-router";
import book from "../components/book.vue";
import { useCounterStore } from "../stores/counter";
import userCart from "../components/userCart.vue";

let users = [];
const books = ref([]);
const store = useCounterStore();
let total = ref(store.carttotal);
let showcart = ref(true);
async function getBooks() {
  const { data } = await supabase.from("books").select();
  books.value = data;
}
async function getUsers() {
  const { data } = await supabase.from("users").select();
  users.value = data;
}

async function update() {
  store.update2 = !store.update2;
  await nextTick();
  store.update2 = !store.update2;
}

async function clearUserCart() {
  const { error } = await supabase
    .from("users")
    .update({ incart: [] })
    .eq("id", store.currentid);
  updatePrices();
}

async function updateUsers(name, price, pic) {
  getUsers();
  update();
  store.cart.splice(0, 0, { name: name, price: price, pic: pic });
  const { error } = await supabase
    .from("users")
    .update({ incart: store.cart })
    .eq("id", store.currentid);
  let sum = 0;
  store.cart.forEach((element) => (sum = element.price + sum));
  store.carttotal = sum;
  total.value = store.carttotal;
  const { error2 } = await supabase
    .from("users")
    .update({ carttotal: store.carttotal })
    .eq("id", store.currentid);
}

getUsers();
getBooks();
</script>

<template>
  <div>
    <h3 v-if="store.update">total cart value: {{ store.carttotal }}</h3>
    <button v-if="showcart" @click="showcart = !showcart">show cart</button>
    <div v-else>
      <button @click="showcart = !showcart">close cart</button>
      <userCart></userCart>
    </div>
    <div class="wrapper">
      <div v-for="book in books" id="susdiv1">
        <book>
          <template #title>{{ book.name }} by {{ book.author }}</template>
          <template #img> <img v-bind:src="book.image" /></template>
          <template #price>{{ book.price }} dollars</template>
          <template #button>
            <button @click="updateUsers(book.name, book.price, book.image)">
              buy this item
            </button>
          </template>
        </book>
      </div>
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  display: flex;
  justify-content: center;
  align-content: horizontal;
  flex-wrap: wrap;
  margin: 20px;
  width: 200px;
}

div {
  display: flex;
  justify-content: center;
  align-content: horizontal;
  flex-wrap: wrap;
  margin: 20px;
}

img {
  height: 250px;
  width: 200px;
}

h3 {
  text-align: center;
  font-size: 30px;
}
p {
  text-align: center;
}
</style>
