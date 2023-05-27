<script setup>
import { nextTick, ref, onMounted } from "vue";
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

async function update() {
  store.update = !store.update;
  await nextTick();
  store.update = !store.update;
}

async function removeItem(x) {
  let temp = store.cart.indexOf(x);
  store.cart.splice(temp, 1);
  carttotal.value = store.carttotal
  carttotal.value = carttotal.value - x.price;
  store.carttotal = carttotal.value;
  updateCart();
  const { error } = await supabase
    .from("users")
    .update({ incart: store.cart })
    .eq("id", store.currentid);
  const { error2 } = await supabase
    .from("users")
    .update({ carttotal: store.carttotal })
    .eq("id", store.currentid);
  update();
}

updateCart();
</script>
<template>
  <h1 v-if="store.update2">Cart Total: {{ store.carttotal }}</h1>
  <div class = "wrap">
    <div v-for="book in books">
      <h2>{{ book.name }} -> ${{ book.price }}</h2>
      <img v-bind:src="book.pic" class="images" />
      <button @click="removeItem(book)">remove from cart</button>
    </div> </div>

</template>
<style scoped>
h1 {
  text-align: center;
}
.images {
  width: 100px;
  length: 140px;
}

.wrap {
  display: flex;
  text-align: center;
  justify-content: space-between;

}
</style>
