<script setup>
import { ref, onMounted } from "vue";
import { supabase } from "../lib/supabaseClient";
import { RouterLink, RouterView } from "vue-router";

const books = ref([]);
async function getBooks() {
  const { data } = await supabase.from("books").select();
  books.value = data;
  console.log(books);
}
</script>

<template>
  <div>
    <h1>login to our very cool bookstore</h1>
    <h2>username</h2>
    <input type="text" />
    <h2>password</h2>
    <input type="text" />

    <button @click="getBooks()">login yay</button>
    <nav>
      <RouterLink to="/create">Create Account</RouterLink>
    </nav>
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
