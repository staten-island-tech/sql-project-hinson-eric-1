<script setup>
import { ref, onMounted } from "vue";
import { supabase } from "../lib/supabaseClient";
import { RouterLink, RouterView } from "vue-router";
import { useCounterStore } from "../stores/counter";

let store = useCounterStore();

</script>
<template></template>