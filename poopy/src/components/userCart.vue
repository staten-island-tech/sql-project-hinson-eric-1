<script setup>
import { ref, onMounted } from "vue";
import { supabase } from "../lib/supabaseClient";
import { RouterLink, RouterView } from "vue-router";
import { useCounterStore } from "../stores/counter";

let carttotal = ref(0);
let books = ref([]);
let store = useCounterStore();

function updateCart() {
  carttotal.value = store.carttotal;
  books.value = store.cart;
}
updateCart();
</script>
<template>
  <h1>Cart Total: {{ carttotal }}</h1>
  <div v-for="book in books">
    <h2>{{ book.name }} -> ${{ book.price }}</h2>
    <img v-bind:src="book.pic" />
    <button>remove from cart</button>
  </div>
</template>
<style>
img {
  width: 200px;
  length: 200px;
}
</style>
