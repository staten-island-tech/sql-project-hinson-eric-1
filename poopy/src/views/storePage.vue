<script setup>
import { ref, onMounted } from "vue";
import { supabase } from "../lib/supabaseClient";
import { RouterLink, RouterView } from "vue-router";
import book from "../components/book.vue";
import { useCounterStore } from "../stores/counter";

let users = [];
const books = ref([]);
const store = useCounterStore();
let total = ref(store.carttotal);
console.log(store.carttotal);
async function getBooks() {
  const { data } = await supabase.from("books").select();
  books.value = data;
}
async function getUsers() {
  const { data } = await supabase.from("users").select();
  users.value = data;
}
async function updateUsers(price) {
  getUsers();
  const { data } = await supabase
    .from(users)
    .update({ username: users.value[store.userarri].username })
    .eq("id", 1);
}

getBooks();
</script>

<template>
  <div>
    <h3>total cart value: {{ total }}</h3>
    <div class="wrapper">
      <div v-for="book in books" id="susdiv1">
        <book>
          <template #title>{{ book.name }} by {{ book.author }}</template>
          <template #img> <img v-bind:src="book.image" /></template>
          <template #price>{{ book.price }} dollars</template>
          <template #button>
            <button
              @click="
                (store.carttotal = book.price + store.carttotal),
                  (total = store.carttotal)
              "
            >
              buy this item
            </button>
            <button>remove from cart</button>
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
