<script setup>
import { ref, onMounted } from "vue";
import { supabase } from "../lib/supabaseClient";
import { RouterLink, RouterView } from "vue-router";
import book from "../components/book.vue";

const books = ref([]);
async function getBooks() {
  const { data } = await supabase.from("books").select();
  books.value = data;
}
getBooks();
</script>

<template>
  <div>
    <h3>total cart value: 0 bucks</h3>
    <div class="wrapper">
      <div v-for="book in books" id="susdiv1">
        <book>
          <template #title>{{ book.name }}</template>
          <template #img> <img v-bind:src="book.image" /></template>
          <template #price>{{ book.price }} dollars</template>
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
